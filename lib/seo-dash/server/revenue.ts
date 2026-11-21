import type { Pool } from 'pg'
import { SITE, valueKnown } from '../config'
import type { Filters } from '../filters'
import { tsIn } from './crawl'
import { clipStart, daysOf, logRanges, type Ranges } from './range'
import { clickValue } from './site'
import { filterSql, Params } from './sql'
import { VIEW } from './views'

// SEO dashboard, Revenus: per page, visits → partner clicks → estimated customers → euros. QRT: the value of a click
// is unknown (SITE.partner), so the screens show clicks and "€ ?"; clicks are split by merchant (Amazon, Cdiscount,
// Fnac; "brand" below holds that group). The month total takes the real sales copied from
// the control centre when there are some (analytics.revenue_sales, deploy/revenue-sync.sh).

export interface RevenuePage {
  page: string
  visits: number
  clicks: number
  clients: number
  revenue: number
  brands: { brand: string; n: number }[]
}

export interface RevenueData {
  ranges: Ranges
  days: string[]
  byBrandDay: { brand: string; values: number[] }[]
  brands: { brand: string; clicks: number; revenue: number | null }[]
  pages: RevenuePage[]
  clicks: number
  views: number
  sellingVisits: number
  clients: number
  revenue: number
  /** amount null: no sale recorded and no value per click to estimate with. */
  month: { label: string; amount: number | null; real: boolean; note: string }
}

const TOP_BRANDS = 3

export async function revenueData(pool: Pool, f: Filters): Promise<RevenueData> {
  const ranges = clipStart(logRanges(f))
  const days = daysOf(ranges.cur)
  const p = new Params()
  const where = filterSql(f, p, { pageCol: 'page', deviceCol: 'device', deviceKind: 'hits' })
  const span = tsIn(p, ranges.cur)
  const ev = p.add(SITE.partner.event)
  const v = new Params()
  const vSpan = tsIn(v, ranges.cur)
  const vWhere = filterSql(f, v, { pageCol: 'path', deviceCol: 'device', deviceKind: 'hits' })
  const [clicks, views, real] = await Promise.all([
    pool.query<{ day: string; page: string; brand: string; n: number }>(
      `SELECT (ts AT TIME ZONE 'Europe/Paris')::date::text AS day, page, ${SITE.partner.groupSql} AS brand, count(*)::int AS n
         FROM analytics.events WHERE name = ${ev} AND ${span}${where} GROUP BY 1, 2, 3`,
      p.values,
    ),
    pool.query<{ page: string; n: number }>(`SELECT path AS page, count(*)::int AS n FROM analytics.hits WHERE ${VIEW()} AND ${vSpan}${vWhere} GROUP BY 1`, v.values),
    pool.query<{ amount: number | null; sales: number | null }>(
      `SELECT sum(amount)::float AS amount, sum(sales)::int AS sales FROM analytics.revenue_sales
        WHERE project = $1 AND day >= date_trunc('month', now() AT TIME ZONE 'Europe/Paris')::date`,
      [SITE.controlProject],
    ),
  ])
  const idx = new Map(days.map((d, i) => [d, i]))
  const brandTot = new Map<string, number>()
  const byPage = new Map<string, RevenuePage>()
  const viewsBy = new Map(views.rows.map((r) => [r.page, r.n]))
  for (const r of clicks.rows) brandTot.set(r.brand, (brandTot.get(r.brand) ?? 0) + r.n)
  const top = [...brandTot].sort((a, b) => b[1] - a[1]).slice(0, TOP_BRANDS).map(([b]) => b)
  const series = new Map<string, number[]>([...top, 'autres'].map((b) => [b, days.map(() => 0)]))
  let clients = 0
  let revenue = 0
  const v1 = clickValue()
  for (const r of clicks.rows) {
    const i = idx.get(r.day)
    const s = series.get(top.includes(r.brand) ? r.brand : 'autres')
    if (s && i !== undefined) s[i] = (s[i] ?? 0) + r.n
    clients += v1.clients * r.n
    revenue += v1.revenue * r.n
    const pg = byPage.get(r.page) ?? { page: r.page, visits: viewsBy.get(r.page) ?? 0, clicks: 0, clients: 0, revenue: 0, brands: [] }
    pg.clicks += r.n
    pg.clients += v1.clients * r.n
    pg.revenue += v1.revenue * r.n
    const b = pg.brands.find((x) => x.brand === r.brand)
    if (b) b.n += r.n
    else pg.brands.push({ brand: r.brand, n: r.n })
    byPage.set(r.page, pg)
  }
  const pages = [...byPage.values()].sort((a, b) => b.clicks - a.clicks || b.revenue - a.revenue)
  for (const pg of pages) pg.brands.sort((a, b) => b.n - a.n)
  const r0 = real.rows[0]
  const monthLabel = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'Europe/Paris' }).format(new Date())
  const monthEstimate = await monthEstimateOf(pool)
  return {
    ranges,
    days,
    byBrandDay: [...series].map(([brand, values]) => ({ brand, values })),
    brands: [...brandTot].sort((a, b) => b[1] - a[1]).map(([brand, n]) => ({ brand, clicks: n, revenue: valueKnown() ? v1.revenue * n : null })),
    pages,
    clicks: [...brandTot.values()].reduce((a, b) => a + b, 0),
    views: views.rows.reduce((a, r) => a + r.n, 0),
    sellingVisits: pages.slice(0, 10).reduce((a, pg) => a + pg.visits, 0),
    clients,
    revenue,
    month: r0?.amount
      ? { label: monthLabel, amount: r0.amount, real: true, note: `ventes enregistrées (${r0.sales ?? 0}) dans le centre de contrôle` }
      : valueKnown()
        ? { label: monthLabel, amount: monthEstimate, real: false, note: 'estimation (aucune vente enregistrée ce mois-ci)' }
        : { label: monthLabel, amount: null, real: false, note: 'aucune vente enregistrée ce mois-ci, valeur d’un clic inconnue' },
  }
}

async function monthEstimateOf(pool: Pool): Promise<number> {
  const { rows } = await pool.query<{ n: number }>(
    `SELECT count(*)::int AS n FROM analytics.events
      WHERE name = $1 AND ts >= date_trunc('month', now() AT TIME ZONE 'Europe/Paris') AT TIME ZONE 'Europe/Paris'`,
    [SITE.partner.event],
  )
  return (rows[0]?.n ?? 0) * clickValue().revenue
}
