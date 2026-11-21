import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Pool } from 'pg'
import { articleHref, getAllArticles } from '@/lib/blog'
import offres from '@/content/offres/offres.json'
import { HUMAN_VIEW } from './sessions'

// Content tab: every article (content/articles, content/blog) with its dates, views and AI robot
// reads over 30 days; the robot sheets (content/produits); the last Cdiscount/Fnac price reading
// (content/offres/offres.json, written by qrt-offres.timer, then deployed).

export interface PostLine {
  href: string
  title: string
  date: string
  updated: string
  views30: number
  ai30: number
}

export interface ContentData {
  total: number
  last7: number
  last30: number
  posts: PostLine[]
  products: number
  prices: { robots: number; offers: number; latest: string | null }
}

type Releve = { date?: string }
const RELEVES = offres as Record<string, Record<string, Releve>>

function priceReading(): ContentData['prices'] {
  let n = 0
  let latest: string | null = null
  for (const sellers of Object.values(RELEVES)) {
    for (const r of Object.values(sellers)) {
      n += 1
      if (r.date && (!latest || r.date > latest)) latest = r.date
    }
  }
  return { robots: Object.keys(RELEVES).length, offers: n, latest }
}

async function productCount(): Promise<number> {
  try {
    return (await fs.readdir(path.join(process.cwd(), 'content/produits'))).filter((f) => f.endsWith('.yaml')).length
  } catch {
    return 0
  }
}

const day = (iso: string) => iso.slice(0, 10)

/** Views are optional: without the database, the list still shows (0 views). */
export async function getContent(pool: Pool | null): Promise<ContentData> {
  const none = new Map<string, number>()
  const [views, ai] = pool
    ? await Promise.all([pathCounts(pool, HUMAN_VIEW).catch(() => none), pathCounts(pool, `kind LIKE 'ai\\_%' AND status < 400`).catch(() => none)])
    : [none, none]
  const articles = getAllArticles()
  const now = Date.now()
  const within = (date: string, days: number) => now - new Date(`${day(date)}T00:00:00Z`).getTime() <= days * 86_400_000
  return {
    total: articles.length,
    last7: articles.filter((a) => within(a.publishedAt, 7)).length,
    last30: articles.filter((a) => within(a.publishedAt, 30)).length,
    posts: articles
      .map((a) => {
        const href = articleHref(a)
        return { href, title: a.title, date: day(a.publishedAt), updated: day(a.updatedAt ?? a.publishedAt), views30: views.get(href) ?? 0, ai30: ai.get(href) ?? 0 }
      })
      .sort((x, y) => y.date.localeCompare(x.date)),
    products: await productCount(),
    prices: priceReading(),
  }
}

async function pathCounts(pool: Pool, where: string): Promise<Map<string, number>> {
  const { rows } = await pool.query<{ path: string; n: number }>(
    `SELECT rtrim(path, '/') AS path, count(*)::int AS n FROM analytics.hits WHERE ${where} AND ts >= now() - interval '30 days' GROUP BY 1`,
  )
  return new Map(rows.map((r) => [r.path || '/', r.n]))
}
