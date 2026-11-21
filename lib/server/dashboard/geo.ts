import 'server-only'
import type { Pool } from 'pg'
import type { Period } from '@/lib/dashboard/period'
import type { Row } from './safe'
import { HUMAN_VIEW } from './sessions'

// Countries: visitors (Caddy log) and actions (analytics.events) per country. The country is read
// from the address at the time of the visit (local DB-IP file), the address is not kept.
// Unknown country → empty label, shown as "Inconnu". Recorded since 21 November 2026.

export interface GeoData {
  visitorsTotal: number
  visitors: Row[]
  clicks: Row[]
  leads: Row[]
}

export const EMPTY_GEO: GeoData = { visitorsTotal: 0, visitors: [], clicks: [], leads: [] }

export async function getGeo(pool: Pool, period: Period): Promise<GeoData> {
  const p = [period.interval]
  const byEvent = (names: string) =>
    pool.query<Row>(`SELECT coalesce(country, '') AS label, count(*)::int AS value FROM analytics.events WHERE name IN (${names}) AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`, p)
  const [total, visitors, clicks, leads] = await Promise.all([
    pool.query<{ n: number }>(`SELECT count(DISTINCT visitor)::int AS n FROM analytics.hits WHERE ${HUMAN_VIEW} AND ts >= now() - $1::interval`, p),
    pool.query<Row>(
      `SELECT coalesce(country, '') AS label, count(DISTINCT visitor)::int AS value FROM analytics.hits WHERE ${HUMAN_VIEW} AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 15`,
      p,
    ),
    byEvent(`'preply_click'`),
    byEvent(`'kit_request', 'newsletter_signup', 'account_created'`),
  ])
  return { visitorsTotal: total.rows[0]?.n ?? 0, visitors: visitors.rows, clicks: clicks.rows, leads: leads.rows }
}
