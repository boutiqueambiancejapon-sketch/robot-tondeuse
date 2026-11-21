import 'server-only'
import { gscQuery, serviceAccount, siteConnected, type GscRow } from './search-console'

// Google search (Search Console, 28 days ending 2 days ago: Google publishes late). Opportunities:
// queries just after page one, well placed but rarely clicked, long questions typed by AI
// assistants. Adapted from Toutou's "Recherche Google".

export type SearchState = 'ok' | 'not-connected' | 'no-key' | 'error'

export interface SearchData {
  state: SearchState
  account: string | null
  start: string
  end: string
  clicks: number
  impressions: number
  position: number | null
  days: { bucket: string; n: number }[]
  queries: GscRow[]
  nearly: GscRow[]
  lowCtr: GscRow[]
  pages: GscRow[]
  long: GscRow[]
  q: string
  results: GscRow[]
}

const day = (d: Date) => d.toISOString().slice(0, 10)
const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export async function getSearch(q = ''): Promise<SearchData> {
  const end = new Date(Date.now() - 2 * 86_400_000)
  const start = new Date(end.getTime() - 27 * 86_400_000)
  const empty: SearchData = { state: 'error', account: null, start: day(start), end: day(end), clicks: 0, impressions: 0, position: null, days: [], queries: [], nearly: [], lowCtr: [], pages: [], long: [], q: q.trim(), results: [] }
  const account = await serviceAccount()
  if (!account) return { ...empty, state: 'no-key' }
  try {
    if (!(await siteConnected())) return { ...empty, state: 'not-connected', account }
    const [allQueries, allPages, pairs, dates] = await Promise.all([
      gscQuery(empty.start, empty.end, ['query'], 1000),
      gscQuery(empty.start, empty.end, ['page'], 500),
      gscQuery(empty.start, empty.end, ['query', 'page'], 5000),
      gscQuery(empty.start, empty.end, ['date'], 40),
    ])
    const needle = fold(q.trim())
    const keep = (l: GscRow) => !needle || l.keys.some((k) => fold(k).includes(needle))
    const queries = allQueries.filter(keep)
    const impressions = allPages.reduce((a, r) => a + r.impressions, 0)
    return {
      ...empty,
      state: 'ok',
      account,
      clicks: allPages.reduce((a, r) => a + r.clicks, 0),
      impressions,
      position: impressions ? allPages.reduce((a, r) => a + r.position * r.impressions, 0) / impressions : null,
      days: dates.map((r) => ({ bucket: r.keys[0] ?? '', n: r.clicks })),
      queries: [...queries].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 25),
      nearly: queries.filter((r) => r.position > 7.5 && r.position <= 20 && r.impressions >= 20).sort((a, b) => b.impressions - a.impressions).slice(0, 25),
      lowCtr: queries.filter((r) => r.position <= 7.5 && r.impressions >= 50 && r.ctr < 0.02).sort((a, b) => b.impressions - a.impressions).slice(0, 15),
      pages: allPages.filter(keep).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 20),
      long: pairs.filter((l) => (l.keys[0] ?? '').split(/\s+/).length >= 8).filter(keep).sort((a, b) => b.impressions - a.impressions).slice(0, 40),
      results: needle ? pairs.filter(keep).sort((a, b) => b.impressions - a.impressions).slice(0, 100) : [],
    }
  } catch (err) {
    console.error('[dashboard] search console', err instanceof Error ? err.message : err)
    return { ...empty, account }
  }
}
