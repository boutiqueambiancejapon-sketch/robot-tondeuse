import 'server-only'
import type { Pool } from 'pg'

// How the site answered over 24 h (Caddy log): requests, server errors, response times of pages
// served to people. Read-only.

export interface Responses {
  requests: number
  errors5xx: number
  median: number | null
  p95: number | null
  slow: { label: string; value: number }[]
}

export const EMPTY_RESPONSES: Responses = { requests: 0, errors5xx: 0, median: null, p95: null, slow: [] }

export async function getResponses(pool: Pool): Promise<Responses> {
  const [totals, slow] = await Promise.all([
    pool.query<{ requests: number; errors: number; median: number | null; p95: number | null }>(
      `SELECT count(*)::int AS requests, count(*) FILTER (WHERE status >= 500)::int AS errors,
              percentile_cont(0.5) WITHIN GROUP (ORDER BY duration_ms) FILTER (WHERE kind = 'human') AS median,
              percentile_cont(0.95) WITHIN GROUP (ORDER BY duration_ms) FILTER (WHERE kind = 'human') AS p95
         FROM analytics.hits WHERE ts >= now() - interval '24 hours'`,
    ),
    pool.query<{ label: string; value: number }>(
      `SELECT path AS label, round(avg(duration_ms))::int AS value FROM analytics.hits
        WHERE kind = 'human' AND ts >= now() - interval '24 hours' AND duration_ms IS NOT NULL GROUP BY 1 HAVING count(*) >= 2 ORDER BY 2 DESC LIMIT 5`,
    ),
  ])
  const t = totals.rows[0]
  return { requests: t?.requests ?? 0, errors5xx: t?.errors ?? 0, median: t?.median ?? null, p95: t?.p95 ?? null, slow: slow.rows }
}
