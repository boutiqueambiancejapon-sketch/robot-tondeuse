import type { Pool } from 'pg'
import { sourceOf } from '@/lib/dashboard/source'
import { VIEW } from './views'

// SEO dashboard, Direct: figures of the moment (people's page views from Caddy's log, read every minute), page views
// per 10-minute slot over 3 hours, and where visits come from over 28 days (same source rule as the live feed).

export interface LiveSummary {
  last30: number
  lastHour: number
  googleShare: number
  aiToday: number
  slots: { label: string; n: number }[]
  sources: { label: string; n: number; share: number }[]
}

const hm = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' })

interface SrcRow {
  ref: string | null
  ai: string | null
  utm: string | null
  medium: string | null
  from_path: string | null
  n: number
}

const SRC = `ref_host AS ref, ref_ai AS ai, utm_source AS utm, utm_medium AS medium, ref_path AS from_path, count(*)::int AS n`

export async function liveSummary(pool: Pool): Promise<LiveSummary> {
  const [now, slots, today, src] = await Promise.all([
    pool.query<{ m30: number; h1: number }>(
      `SELECT count(*) FILTER (WHERE ts >= now() - interval '30 minutes')::int AS m30, count(*)::int AS h1
         FROM analytics.hits WHERE ${VIEW()} AND ts >= now() - interval '1 hour'`,
    ),
    pool.query<{ slot: Date; n: number }>(
      `SELECT to_timestamp(floor(extract(epoch FROM ts) / 600) * 600) AS slot, count(*)::int AS n
         FROM analytics.hits WHERE ${VIEW()} AND ts >= now() - interval '3 hours' GROUP BY 1 ORDER BY 1`,
    ),
    pool.query<SrcRow>(
      `SELECT ${SRC} FROM analytics.hits
        WHERE ${VIEW()} AND ts >= date_trunc('day', now() AT TIME ZONE 'Europe/Paris') AT TIME ZONE 'Europe/Paris' GROUP BY 1, 2, 3, 4, 5`,
    ),
    pool.query<SrcRow>(`SELECT ${SRC} FROM analytics.hits WHERE ${VIEW()} AND ts >= now() - interval '28 days' GROUP BY 1, 2, 3, 4, 5`),
  ])
  // 10-minute slots, empty ones included.
  const start = Math.floor(Date.now() / 600_000) * 600_000 - 17 * 600_000
  const by = new Map(slots.rows.map((r) => [r.slot.getTime(), r.n]))
  const ten = Array.from({ length: 18 }, (_, i) => ({ label: hm.format(new Date(start + i * 600_000)), n: by.get(start + i * 600_000) ?? 0 }))
  const source = (r: SrcRow) => sourceOf({ host: r.ref, ai: r.ai, utmSource: r.utm, utmMedium: r.medium, from: r.from_path })
  let total = 0
  let google = 0
  let ai = 0
  for (const r of today.rows) {
    const s = source(r)
    total += r.n
    if (s.channel === 'google') google += r.n
    if (s.channel === 'ai') ai += r.n
  }
  const agg = new Map<string, number>()
  let all = 0
  for (const r of src.rows) {
    const s = source(r)
    if (s.channel === 'internal') continue
    agg.set(s.label, (agg.get(s.label) ?? 0) + r.n)
    all += r.n
  }
  return {
    last30: now.rows[0]?.m30 ?? 0,
    lastHour: now.rows[0]?.h1 ?? 0,
    googleShare: total ? google / total : 0,
    aiToday: ai,
    slots: ten,
    sources: [...agg].map(([label, n]) => ({ label, n, share: all ? n / all : 0 })).sort((a, b) => b.n - a.n).slice(0, 8),
  }
}
