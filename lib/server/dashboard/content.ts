import 'server-only'
import type { Pool } from 'pg'
import { getAllPosts } from '@/lib/blog'

// Content tab: every post with its publication date, the latest ones, views and AI robot reads over 30 days.

export interface PostLine {
  slug: string
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
}

/** Views are optional: without the database, the list still shows (0 views). */
export async function getContent(pool: Pool | null): Promise<ContentData> {
  const none = new Map<string, number>()
  const [views, ai] = pool ? await Promise.all([postViews(pool, `kind = 'human' AND (status BETWEEN 200 AND 299 OR status = 304)`).catch(() => none), postViews(pool, `kind LIKE 'ai\\_%' AND status < 400`).catch(() => none)]) : [none, none]
  const posts = getAllPosts()
  const now = Date.now()
  const within = (date: string, days: number) => now - new Date(`${date}T00:00:00Z`).getTime() <= days * 86_400_000
  return {
    total: posts.length,
    last7: posts.filter((p) => within(p.date, 7)).length,
    last30: posts.filter((p) => within(p.date, 30)).length,
    posts: posts.map((p) => ({ slug: p.slug, title: p.title, date: p.date, updated: p.updated, views30: views.get(`/blog/${p.slug}`) ?? 0, ai30: ai.get(`/blog/${p.slug}`) ?? 0 })),
  }
}

async function postViews(pool: Pool, where: string): Promise<Map<string, number>> {
  const { rows } = await pool.query<{ path: string; n: number }>(
    `SELECT path, count(*)::int AS n FROM analytics.hits
      WHERE ${where} AND path LIKE '/blog/%' AND ts >= now() - interval '30 days' GROUP BY 1`,
  )
  return new Map(rows.map((r) => [r.path, r.n]))
}
