import 'server-only'
import type { Pool } from 'pg'
import { sourceOf, type Source } from '@/lib/dashboard/source'
import { HUMAN_VIEW } from './sessions'

// "En direct" view: page views of the last 30 minutes (Caddy log, read every minute by
// qrt-ingest), actions sent by the site (instant), countries right now, the latest hits and
// actions, recent AI robots. Parameterised, read-only. Adapted from Toutou's dashboard-live, via 10minlanguages.com.

export interface LiveEvent {
  ts: string
  name: string
  page: string
  detail: string | null
  device: string | null
  ref: string | null
  country: string | null
  /** Where it came from: engine, AI, network, email, other site, internal navigation or direct. */
  source: Source
}

interface FeedRow extends Omit<LiveEvent, 'ts' | 'source'> {
  ts: Date
  ai: string | null
  utm: string | null
  medium: string | null
  from_path: string | null
}

export interface LiveRow {
  label: string
  value: number
}

export interface LiveData {
  now: string
  /** Last time the log was read: page views can't be newer than this. */
  ingestAt: string | null
  views5: number
  visitors5: number
  perMinute: number[]
  visitorsPerMinute: number[]
  pages: LiveRow[]
  refs: LiveRow[]
  countries: LiveRow[]
  feed: LiveEvent[]
  bots: { ts: string; label: string; kind: string; path: string }[]
}

const LAST5 = `ts >= now() - interval '5 minutes'`
const LAST30 = `ts >= now() - interval '30 minutes'`

function perMinute(rows: { m: number; n: number }[]): number[] {
  const out = Array.from({ length: 30 }, () => 0)
  for (const r of rows) if (r.m >= 0 && r.m < 30) out[29 - r.m] = r.n
  return out
}

export async function getLive(pool: Pool): Promise<LiveData> {
  const q = <T extends object>(sql: string) => pool.query<T>(sql).then((r) => r.rows)
  const [now5, minutes, pages, refs, countries, feed, bots, ingest] = await Promise.all([
    q<{ views: number; visitors: number }>(`SELECT count(*)::int AS views, count(DISTINCT visitor)::int AS visitors FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${LAST5}`),
    q<{ m: number; n: number; v: number }>(
      `SELECT floor(extract(epoch FROM (now() - ts)) / 60)::int AS m, count(*)::int AS n, count(DISTINCT visitor)::int AS v
         FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${LAST30} GROUP BY 1`,
    ),
    q<LiveRow>(`SELECT path AS label, count(*)::int AS value FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${LAST5} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 8`),
    q<LiveRow>(
      `SELECT coalesce(ref_ai, ref_host) AS label, count(*)::int AS value FROM analytics.hits
        WHERE ${HUMAN_VIEW} AND (ref_host IS NOT NULL OR ref_ai IS NOT NULL) AND ${LAST30} GROUP BY 1 ORDER BY 2 DESC LIMIT 6`,
    ),
    q<LiveRow>(`SELECT coalesce(country, '') AS label, count(DISTINCT visitor)::int AS value FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${LAST5} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 8`),
    q<FeedRow>(
      `(SELECT ts, 'pageview' AS name, path AS page, NULL AS detail, device, ref_host AS ref, country,
               ref_ai AS ai, utm_source AS utm, utm_medium AS medium, ref_path AS from_path
          FROM analytics.hits WHERE ${HUMAN_VIEW} ORDER BY ts DESC LIMIT 25)
       UNION ALL
       (SELECT ts, name, page, coalesce(nullif(concat_ws(' · ', props->>'merchant', props->>'place'), ''), props->>'result', props->>'tool', props->>'source'), device, ref_host, country,
               NULL, props->>'utm_source', props->>'utm_medium', props->>'from'
          FROM analytics.events ORDER BY ts DESC LIMIT 25)
       ORDER BY ts DESC LIMIT 25`,
    ),
    q<{ ts: Date; label: string; kind: string; path: string }>(
      `SELECT ts, coalesce(operator, bot, '?') AS label, kind, path FROM analytics.hits WHERE kind LIKE 'ai\\_%' AND ${LAST30} ORDER BY ts DESC LIMIT 12`,
    ),
    q<{ at: Date }>(`SELECT updated_at AS at FROM analytics.ingest_state WHERE source = 'caddy-journal'`),
  ])
  return {
    now: new Date().toISOString(),
    ingestAt: ingest[0]?.at.toISOString() ?? null,
    views5: now5[0]?.views ?? 0,
    visitors5: now5[0]?.visitors ?? 0,
    perMinute: perMinute(minutes),
    visitorsPerMinute: perMinute(minutes.map((r) => ({ m: r.m, n: r.v }))),
    pages,
    refs,
    countries,
    feed: feed.map(({ ai, utm, medium, from_path, ...r }) => ({
      ...r,
      ts: r.ts.toISOString(),
      source: sourceOf({ host: r.ref, ai, utmSource: utm, utmMedium: medium, from: from_path }),
    })),
    bots: bots.map((r) => ({ ...r, ts: r.ts.toISOString() })),
  }
}
