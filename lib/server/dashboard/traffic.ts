import 'server-only'
import type { Pool } from 'pg'
import type { Period } from '@/lib/dashboard/period'
import type { Row } from './safe'

// Traffic tab: pages, sources, devices, AI bots, search engines, missing pages (404 seen by
// Google or reached from a link; scanners probing /.env and the like are left out). Read-only,
// parameterised queries; the period arrives as $1::interval.

export interface TrafficData {
  pages: Row[]
  sources: Row[]
  aiReferrals: Row[]
  devices: Row[]
  aiBots: Row[]
  searchBots: Row[]
  notFound: Row[]
}

export const EMPTY_TRAFFIC: TrafficData = { pages: [], sources: [], aiReferrals: [], devices: [], aiBots: [], searchBots: [], notFound: [] }

const HUMAN = `kind = 'human' AND (status BETWEEN 200 AND 299 OR status = 304) AND ts >= now() - $1::interval`

async function rows(pool: Pool, sql: string, period: Period): Promise<Row[]> {
  return (await pool.query<Row>(sql, [period.interval])).rows
}

export async function getTraffic(pool: Pool, period: Period): Promise<TrafficData> {
  const [pages, sources, aiReferrals, devices, aiBots, searchBots, notFound] = await Promise.all([
    rows(pool, `SELECT path AS label, count(*)::int AS value, count(DISTINCT visitor)::int AS extra FROM analytics.hits WHERE ${HUMAN} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 15`, period),
    rows(pool, `SELECT coalesce(ref_host, 'Direct ou inconnu') AS label, count(*)::int AS value FROM analytics.hits WHERE ${HUMAN} GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`, period),
    rows(pool, `SELECT ref_ai AS label, count(*)::int AS value FROM analytics.hits WHERE ${HUMAN} AND ref_ai IS NOT NULL GROUP BY 1 ORDER BY 2 DESC LIMIT 8`, period),
    rows(pool, `SELECT device AS label, count(DISTINCT visitor)::int AS value FROM analytics.hits WHERE ${HUMAN} AND device IS NOT NULL GROUP BY 1 ORDER BY 2 DESC`, period),
    rows(pool, `SELECT bot AS label, count(*)::int AS value FROM analytics.hits WHERE kind LIKE 'ai\\_%' AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 12`, period),
    rows(pool, `SELECT bot AS label, count(*)::int AS value FROM analytics.hits WHERE kind = 'search' AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 8`, period),
    rows(pool, `SELECT path AS label, count(*)::int AS value FROM analytics.hits WHERE status = 404 AND (kind = 'search' OR (kind = 'human' AND ref_host IS NOT NULL)) AND path !~ '^/\\.' AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 8`, period),
  ])
  return { pages, sources, aiReferrals, devices, aiBots, searchBots, notFound }
}
