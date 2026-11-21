import { cleanPath, SITE } from '../config'

// SEO dashboard: addresses of every sitemap (SITE.sitemaps, index files followed), read on the live site, kept one
// hour. Used by "never seen by Google", the nightly audit and URL inspection. Plain module: the scripts load it.

let cache: { at: number; list: SitemapEntry[] } | null = null

export interface SitemapEntry {
  path: string
  lastmod: string | null
}

async function fetchXml(url: string): Promise<string> {
  const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(15_000) })
  if (!res.ok) throw new Error(`plan du site ${res.status}`)
  return res.text()
}

function entries(xml: string): { loc: string; lastmod: string | null }[] {
  const out: { loc: string; lastmod: string | null }[] = []
  for (const m of xml.matchAll(/<(?:url|sitemap)>([\s\S]*?)<\/(?:url|sitemap)>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(m[1] ?? '')?.[1]?.trim()
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(m[1] ?? '')?.[1]?.trim().slice(0, 10) ?? null
    if (loc) out.push({ loc, lastmod })
  }
  return out
}

export async function sitemapEntries(): Promise<SitemapEntry[]> {
  if (cache && Date.now() - cache.at < 3_600_000) return cache.list
  const all: { loc: string; lastmod: string | null }[] = []
  for (const url of SITE.sitemaps) {
    const root = await fetchXml(url)
    const top = entries(root)
    if (/<sitemapindex/.test(root)) all.push(...(await Promise.all(top.map((s) => fetchXml(s.loc).then(entries)))).flat())
    else all.push(...top)
  }
  const seen = new Set<string>()
  const list: SitemapEntry[] = []
  for (const e of all) {
    const path = cleanPath(e.loc).replace(/\/$/, '') || '/'
    if (seen.has(path)) continue
    seen.add(path)
    list.push({ path, lastmod: e.lastmod })
  }
  cache = { at: Date.now(), list }
  return list
}
