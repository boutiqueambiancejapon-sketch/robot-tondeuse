import 'server-only'
import type { Pool } from 'pg'
import type { Pair } from '@/lib/dashboard/compare'
import { TZ, type Period } from '@/lib/dashboard/period'
import type { PageCounts, SessionRow } from '@/lib/dashboard/traffic'
import { CLICK_EVENT, QUIZ_EVENT, SIGNUP_EVENT, TOOL_EVENT } from '@/lib/dashboard/events'
import { PDF_PATH_SQL, PROMO_PATH_SQL } from '@/lib/dashboard/page-type'

// Traffic reads. Parameterised, read-only. Sessions are built over the period and the one before:
// page views from Caddy's log (analytics.hits, humans, 2xx/304, no PDF) and actions (analytics.events) that
// share the daily visitor hash. The hash stays on the server, never shown.

// A page view: a person, answered 2xx/304, not a PDF guide (counted apart as a download). /go/ links
// answer 302, so they are never page views either.
export const humanView = (a = ''): string => `${a}kind = 'human' AND (${a}status BETWEEN 200 AND 299 OR ${a}status = 304) AND ${a}path !~* '\\.pdf$'`
/** A PDF guide opened by a person (iPhones fetch a PDF in several 206 parts: count visitor and file once). */
export const PDF_DOWNLOAD = `kind = 'human' AND (status BETWEEN 200 AND 299 OR status = 304) AND ${PDF_PATH_SQL}`
export const HUMAN_VIEW = humanView()

/** $1: the period's length. One row per session holding at least one page view. */
const SESSIONS_SQL = `
  WITH a AS (
    SELECT visitor, ts, 'pageview' AS name, path AS page, ref_host, ref_ai, device, country
      FROM analytics.hits WHERE ${HUMAN_VIEW} AND visitor IS NOT NULL AND ts >= now() - 2 * $1::interval
    UNION ALL
    SELECT visitor, ts, name, page, ref_host, NULL, device, country
      FROM analytics.events WHERE visitor IS NOT NULL AND ts >= now() - 2 * $1::interval
  ), e AS (
    SELECT *, CASE WHEN lag(ts) OVER w IS NULL OR ts - lag(ts) OVER w > interval '30 minutes' THEN 1 ELSE 0 END AS starts
      FROM a WINDOW w AS (PARTITION BY visitor ORDER BY ts)
  ), s AS (
    SELECT *, sum(starts) OVER (PARTITION BY visitor ORDER BY ts) AS sid FROM e
  )
  SELECT visitor,
         min(ts) >= now() - $1::interval AS current,
         extract(epoch FROM max(ts) - min(ts))::int AS seconds,
         count(*) FILTER (WHERE name = 'pageview')::int AS views,
         (array_agg(page ORDER BY ts) FILTER (WHERE name = 'pageview'))[1] AS landing,
         (array_agg(ref_host ORDER BY ts) FILTER (WHERE name = 'pageview'))[1] AS ref,
         (array_agg(ref_ai ORDER BY ts) FILTER (WHERE name = 'pageview'))[1] AS ai,
         (array_agg(device ORDER BY ts) FILTER (WHERE name = 'pageview'))[1] AS device,
         (array_agg(country ORDER BY ts) FILTER (WHERE name = 'pageview'))[1] AS country,
         array_agg(DISTINCT name) AS names
    FROM s
   GROUP BY visitor, sid
  HAVING count(*) FILTER (WHERE name = 'pageview') > 0`

export async function getSessions(pool: Pool, period: Period): Promise<SessionRow[]> {
  return (await pool.query<SessionRow>(SESSIONS_SQL, [period.interval])).rows
}

export async function getSessionCounts(pool: Pool, period: Period): Promise<Pair> {
  const res = await pool.query<{ current: number; previous: number }>(
    `SELECT count(*) FILTER (WHERE current)::int AS current, count(*) FILTER (WHERE NOT current)::int AS previous FROM (${SESSIONS_SQL}) t`,
    [period.interval],
  )
  return res.rows[0] ?? { current: 0, previous: 0 }
}

export interface TrafficTotals {
  views: Pair
  visitors: Pair
  clicks: Pair
  quiz: Pair
  signups: Pair
  tools: Pair
  pdf: Pair
  promo: Pair
  ai: Pair
}

const Z: Pair = { current: 0, previous: 0 }
export const EMPTY_TOTALS: TrafficTotals = { views: Z, visitors: Z, clicks: Z, quiz: Z, signups: Z, tools: Z, pdf: Z, promo: Z, ai: Z }

const pair = (k: string, where: string, what = 'count(*)') =>
  `${what} FILTER (WHERE ${where} AND ts >= now() - $1::interval)::int AS ${k}_c, ${what} FILTER (WHERE ${where} AND ts < now() - $1::interval)::int AS ${k}_p`

/** Period and previous period, every action counted (with or without a visitor hash). */
export async function getTotals(pool: Pool, period: Period): Promise<TrafficTotals> {
  const [hits, events] = await Promise.all([
    pool.query<Record<string, number>>(
      `SELECT ${pair('views', HUMAN_VIEW)}, ${pair('visitors', HUMAN_VIEW, 'count(DISTINCT visitor)')}, ${pair('ai', `kind LIKE 'ai\\_%'`)},
              ${pair('pdf', PDF_DOWNLOAD, `count(DISTINCT coalesce(visitor, id::text) || path)`)}, ${pair('promo', `${HUMAN_VIEW} AND ${PROMO_PATH_SQL}`)}
         FROM analytics.hits WHERE ts >= now() - 2 * $1::interval`,
      [period.interval],
    ),
    pool.query<Record<string, number>>(
      `SELECT ${pair('clicks', `name = '${CLICK_EVENT}'`)}, ${pair('quiz', `name = '${QUIZ_EVENT}'`)}, ${pair('signups', `name = '${SIGNUP_EVENT}'`)},
              ${pair('tools', `name = '${TOOL_EVENT}'`)}
         FROM analytics.events WHERE ts >= now() - 2 * $1::interval`,
      [period.interval],
    ),
  ])
  const row = { ...(hits.rows[0] ?? {}), ...(events.rows[0] ?? {}) }
  const get = (k: keyof TrafficTotals): Pair => ({ current: row[`${k}_c`] ?? 0, previous: row[`${k}_p`] ?? 0 })
  const keys = Object.keys(EMPTY_TOTALS) as (keyof TrafficTotals)[]
  return Object.fromEntries(keys.map((k) => [k, get(k)])) as unknown as TrafficTotals
}

export interface Bucket {
  bucket: string
  n: number
}

const SERIES = `generate_series(date_trunc($2, (now() - $1::interval) AT TIME ZONE '${TZ}'), date_trunc($2, now() AT TIME ZONE '${TZ}'), ('1 ' || $2)::interval)`

/** Distinct visitors per hour, day or week (Brussels time). */
export async function getVisitorBuckets(pool: Pool, period: Period): Promise<Bucket[]> {
  const res = await pool.query<Bucket>(
    `WITH b AS (SELECT ${SERIES} AS bucket)
     SELECT to_char(b.bucket, 'YYYY-MM-DD"T"HH24:MI') AS bucket, count(DISTINCT h.visitor)::int AS n
       FROM b LEFT JOIN analytics.hits h
         ON ${humanView('h.')} AND h.ts >= now() - $1::interval
        AND date_trunc($2, h.ts AT TIME ZONE '${TZ}') = b.bucket
      GROUP BY b.bucket ORDER BY b.bucket`,
    [period.interval, period.bucket],
  )
  return res.rows
}

/** Events of one name per bucket (the first, started bucket keeps the bars' sum equal to the total). */
export async function getEventBuckets(pool: Pool, period: Period, name: string): Promise<Bucket[]> {
  const res = await pool.query<Bucket>(
    `WITH b AS (SELECT ${SERIES} AS bucket)
     SELECT to_char(b.bucket, 'YYYY-MM-DD"T"HH24:MI') AS bucket, count(e.id)::int AS n
       FROM b LEFT JOIN analytics.events e
         ON e.name = $3 AND e.ts >= now() - $1::interval AND date_trunc($2, e.ts AT TIME ZONE '${TZ}') = b.bucket
      GROUP BY b.bucket ORDER BY b.bucket`,
    [period.interval, period.bucket, name],
  )
  return res.rows
}

export async function getPageCounts(pool: Pool, period: Period): Promise<PageCounts[]> {
  const res = await pool.query<PageCounts>(
    `WITH v AS (SELECT path AS page, count(*)::int AS views, count(DISTINCT visitor)::int AS visitors FROM analytics.hits
                 WHERE ${HUMAN_VIEW} AND ts >= now() - $1::interval GROUP BY 1),
          e AS (SELECT page, count(*) FILTER (WHERE name = '${CLICK_EVENT}')::int AS clicks,
                       count(*) FILTER (WHERE name = '${SIGNUP_EVENT}')::int AS leads
                  FROM analytics.events WHERE ts >= now() - $1::interval GROUP BY 1)
     SELECT coalesce(v.page, e.page) AS page, coalesce(v.views, 0) AS views, coalesce(v.visitors, 0) AS visitors,
            coalesce(e.clicks, 0) AS clicks, coalesce(e.leads, 0) AS leads
       FROM v FULL JOIN e ON e.page = v.page
      ORDER BY 2 DESC, 4 DESC, 1`,
    [period.interval],
  )
  return res.rows
}
