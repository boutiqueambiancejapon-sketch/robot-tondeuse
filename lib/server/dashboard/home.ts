import 'server-only'
import type { Pool } from 'pg'
import { TZ } from '@/lib/dashboard/period'
import { humanView } from './sessions'

// Home: five figures for today (since midnight, Brussels time), 7 days and 30 days, 
// the ingester's freshness. Page views come from Caddy's log (analytics.hits).

export type WindowKey = 'today' | 'd7' | 'd30'
export type Metric = 'visitors' | 'views' | 'clicks' | 'signups' | 'ai'
export type Summary = Record<Metric, Record<WindowKey, number>>

const ZERO = { today: 0, d7: 0, d30: 0 }
export const EMPTY_SUMMARY: Summary = { visitors: ZERO, views: ZERO, clicks: ZERO, signups: ZERO, ai: ZERO }

const WINDOWS = `
  date_trunc('day', now() AT TIME ZONE '${TZ}') AT TIME ZONE '${TZ}' AS today,
  now() - interval '7 days' AS d7,
  now() - interval '30 days' AS d30`

export async function getSummary(pool: Pool): Promise<Summary> {
  const hits = await pool.query<Record<string, number>>(
    `WITH w AS (SELECT ${WINDOWS})
     SELECT ${(['today', 'd7', 'd30'] as const)
       .map(
         (k) => `count(DISTINCT h.visitor) FILTER (WHERE h.kind = 'human' AND h.ts >= w.${k})::int AS visitors_${k},
                 count(*) FILTER (WHERE h.kind = 'human' AND h.ts >= w.${k})::int AS views_${k},
                 count(*) FILTER (WHERE h.kind LIKE 'ai\\_%' AND h.ts >= w.${k})::int AS ai_${k}`,
       )
       .join(',')}
       FROM w LEFT JOIN analytics.hits h ON h.ts >= w.d30 AND (h.kind <> 'human' OR (${humanView('h.')}))`,
  )
  const events = await pool.query<Record<string, number>>(
    `WITH w AS (SELECT ${WINDOWS})
     SELECT ${(['today', 'd7', 'd30'] as const)
       .map(
         (k) => `count(*) FILTER (WHERE e.name = 'affiliate_click' AND e.ts >= w.${k})::int AS clicks_${k},
                 count(*) FILTER (WHERE e.name = 'newsletter_signup' AND e.ts >= w.${k})::int AS signups_${k}`,
       )
       .join(',')}
       FROM w LEFT JOIN analytics.events e ON e.ts >= w.d30`,
  )
  const row = { ...(hits.rows[0] ?? {}), ...(events.rows[0] ?? {}) }
  const of = (m: Metric) => ({ today: row[`${m}_today`] ?? 0, d7: row[`${m}_d7`] ?? 0, d30: row[`${m}_d30`] ?? 0 })
  return { visitors: of('visitors'), views: of('views'), clicks: of('clicks'), signups: of('signups'), ai: of('ai') }
}

/** Last successful ingestion, or null if it never ran. */
export async function getIngestAt(pool: Pool): Promise<Date | null> {
  const { rows } = await pool.query<{ at: Date }>(`SELECT updated_at AS at FROM analytics.ingest_state WHERE source = 'caddy-journal'`)
  return rows[0]?.at ?? null
}

/** No ingestion for 10 minutes (the timer runs every minute). */
export function ingestStale(at: Date | null, now = new Date()): boolean {
  return !at || now.getTime() - at.getTime() > 10 * 60_000
}
