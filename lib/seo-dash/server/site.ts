import type { Pool } from 'pg'
import { SITE } from '../config'
import type { Filters } from '../filters'
import { daysOf, type Range, type Ranges } from './range'
import { filterSql, num, Params } from './sql'
import { EV, VIEW } from './views'

// SEO dashboard: the site's own figures (owner excluded): visitors (daily hashes added up), page views (people in
// Caddy's log, see views.ts), partner clicks, estimated customers and revenue (0 while the value is unknown),
// accounts created.

export interface SiteDay {
  day: string
  visitors: number
  views: number
  clicks: number
  clients: number
  revenue: number
  accounts: number
}

export interface SiteTotals {
  visitors: number
  views: number
  clicks: number
  clients: number
  revenue: number
  accounts: number
}

const ZERO: SiteTotals = { visitors: 0, views: 0, clicks: 0, clients: 0, revenue: 0, accounts: 0 }

/** Estimated customers and euros of one partner click (0 while unknown: valueKnown() tells the screens). */
export function clickValue(): { clients: number; revenue: number } {
  return { clients: SITE.partner.clientRate ?? 0, revenue: SITE.partner.valuePerClick ?? 0 }
}

const span = (p: Params, r: Range) =>
  `ts >= (${p.add(r.start)}::date AT TIME ZONE 'Europe/Paris') AND ts < ((${p.add(r.end)}::date + 1) AT TIME ZONE 'Europe/Paris')`
const DAY_SQL = `(ts AT TIME ZONE 'Europe/Paris')::date::text`

export async function siteDaily(pool: Pool, f: Filters, r: Range): Promise<SiteDay[]> {
  const p = new Params()
  const views = pool.query<{ day: string; n: number; v: number }>(
    `SELECT ${DAY_SQL} AS day, count(*)::int AS n, count(DISTINCT visitor)::int AS v FROM analytics.hits
      WHERE ${VIEW()} AND ${span(p, r)}${filterSql(f, p, { pageCol: 'path', deviceCol: 'device', deviceKind: 'hits' })} GROUP BY 1`,
    p.values,
  )
  const q = new Params()
  const events = pool.query<{ day: string; name: string; n: number }>(
    `SELECT ${DAY_SQL} AS day, name, count(*)::int AS n FROM analytics.events
      WHERE name IN (${q.add(SITE.partner.event)}, ${q.add(EV.account)}) AND ${span(q, r)}${filterSql(f, q, { pageCol: 'page', deviceCol: 'device', deviceKind: 'hits' })}
      GROUP BY 1, 2`,
    q.values,
  )
  const by = new Map<string, SiteDay>(daysOf(r).map((day) => [day, { day, ...ZERO }]))
  const v = clickValue()
  for (const x of (await views).rows) {
    const d = by.get(x.day)
    if (!d) continue
    d.views += num(x.n)
    d.visitors += num(x.v)
  }
  for (const x of (await events).rows) {
    const d = by.get(x.day)
    if (!d) continue
    if (x.name === EV.account) d.accounts += num(x.n)
    else {
      d.clicks += num(x.n)
      d.clients += v.clients * num(x.n)
      d.revenue += v.revenue * num(x.n)
    }
  }
  return [...by.values()]
}

export function sumDays(days: SiteDay[]): SiteTotals {
  return days.reduce((a, d) => ({
    visitors: a.visitors + d.visitors,
    views: a.views + d.views,
    clicks: a.clicks + d.clicks,
    clients: a.clients + d.clients,
    revenue: a.revenue + d.revenue,
    accounts: a.accounts + d.accounts,
  }), ZERO)
}

export interface SiteKpis {
  ranges: Ranges
  daily: SiteDay[]
  prevDaily: SiteDay[]
  cur: SiteTotals
  prev: SiteTotals | null
}

export async function siteKpis(pool: Pool, f: Filters, ranges: Ranges): Promise<SiteKpis> {
  const [daily, prevDaily] = await Promise.all([siteDaily(pool, f, ranges.cur), ranges.prev ? siteDaily(pool, f, ranges.prev) : Promise.resolve([])])
  return { ranges, daily, prevDaily, cur: sumDays(daily), prev: ranges.prev && !ranges.partial ? sumDays(prevDaily) : null }
}
