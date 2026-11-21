import 'server-only'
import type { Pool } from 'pg'
import { CLICK_EVENT, MERCHANT_LABELS, QUIZ_EVENT, SIGNUP_EVENT, TOOL_EVENT, TOOL_LABELS } from '@/lib/dashboard/events'
import { PROMO_PATH_SQL } from '@/lib/dashboard/page-type'
import type { Period } from '@/lib/dashboard/period'
import type { Row } from './safe'
import { HUMAN_VIEW, PDF_DOWNLOAD } from './sessions'

// Conversions tab: partner clicks (Amazon, Cdiscount and Fnac through Awin) per merchant, page, place
// on the page and robot; /go/ redirections read in the server log; quiz results and tools; letter
// sign-ups per form; PDF guides opened; promo pages read. Parameterised, read-only.

export interface PageClicks {
  page: string
  clicks: number
  views: number
}

export interface ConversionData {
  total: number
  views: number
  byMerchant: Row[]
  byPage: PageClicks[]
  byPlace: Row[]
  byRobot: Row[]
  redirects: Row[]
  quiz: Row[]
  tools: Row[]
  signups: Row[]
  pdf: Row[]
  promo: Row[]
}

export const EMPTY_CONVERSIONS: ConversionData = { total: 0, views: 0, byMerchant: [], byPage: [], byPlace: [], byRobot: [], redirects: [], quiz: [], tools: [], signups: [], pdf: [], promo: [] }

const PERIOD = `ts >= now() - $1::interval`
const CLICKS = `name = '${CLICK_EVENT}' AND ${PERIOD}`

export async function getConversions(pool: Pool, period: Period): Promise<ConversionData> {
  const q = (sql: string) => pool.query<Row>(sql, [period.interval]).then((r) => r.rows)
  const by = (expr: string, where: string, limit = 12) =>
    q(`SELECT ${expr} AS label, count(*)::int AS value FROM analytics.events WHERE ${where} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT ${limit}`)
  const [totals, byPage, byMerchant, byPlace, byRobot, redirects, quiz, tools, signups, pdf, promo] = await Promise.all([
    pool.query<{ total: number; views: number }>(
      `SELECT (SELECT count(*)::int FROM analytics.events WHERE ${CLICKS}) AS total,
              (SELECT count(*)::int FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${PERIOD}) AS views`,
      [period.interval],
    ),
    pool.query<PageClicks>(
      `WITH c AS (SELECT page, count(*)::int AS clicks FROM analytics.events WHERE ${CLICKS} GROUP BY 1),
            v AS (SELECT path AS page, count(*)::int AS views FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${PERIOD} GROUP BY 1)
       SELECT c.page, c.clicks, coalesce(v.views, 0) AS views FROM c LEFT JOIN v USING (page) ORDER BY c.clicks DESC, c.page LIMIT 20`,
      [period.interval],
    ).then((r) => r.rows),
    by(`coalesce(props->>'merchant', 'autre')`, CLICKS),
    by(`coalesce(props->>'place', 'sans emplacement')`, CLICKS),
    by(`coalesce(props->>'robot', '(robot non précisé)')`, CLICKS, 20),
    q(`SELECT split_part(path, '/', 3) AS label, count(*)::int AS value FROM analytics.hits
        WHERE kind = 'human' AND path ~ '^/go/[^/]+/amazon' AND status = 302 AND ${PERIOD} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 15`),
    by(`coalesce(props->>'result', '?')`, `name = '${QUIZ_EVENT}' AND ${PERIOD}`),
    by(`coalesce(props->>'tool', '?')`, `name = '${TOOL_EVENT}' AND ${PERIOD}`),
    by(`coalesce(props->>'source', 'site')`, `name = '${SIGNUP_EVENT}' AND ${PERIOD}`),
    q(`SELECT regexp_replace(path, '^/guides/', '') AS label, count(DISTINCT coalesce(visitor, id::text))::int AS value FROM analytics.hits
        WHERE ${PDF_DOWNLOAD} AND ${PERIOD} GROUP BY 1 ORDER BY 2 DESC, 1`),
    q(`SELECT path AS label, count(*)::int AS value FROM analytics.hits WHERE ${HUMAN_VIEW} AND ${PROMO_PATH_SQL} AND ${PERIOD} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 15`),
  ])
  return {
    total: totals.rows[0]?.total ?? 0,
    views: totals.rows[0]?.views ?? 0,
    byMerchant: byMerchant.map((r) => ({ ...r, label: MERCHANT_LABELS[r.label] ?? r.label })),
    byPage,
    byPlace,
    byRobot,
    redirects,
    quiz,
    tools: tools.map((r) => ({ ...r, label: TOOL_LABELS[r.label] ?? r.label })),
    signups,
    pdf,
    promo,
  }
}
