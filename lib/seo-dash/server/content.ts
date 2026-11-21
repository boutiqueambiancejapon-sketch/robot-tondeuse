import { articleHref, getAllArticles } from '@/lib/blog'
import { categoryLabels } from '@/niche.config'

// SEO dashboard: published articles (content/articles at the root, content/blog/<rubrique>), read through lib/blog
// (same addresses as the site: date, update, rubrique, title, description). Kept 10 minutes in memory: new articles
// arrive with a deploy. Also loaded by the nightly scripts (scripts/lib/ts-register.mjs resolves "@/").

export interface Publication {
  slug: string
  path: string
  title: string
  description: string
  category: string
  date: string
  updatedAt: string | null
}

let cache: { at: number; list: Publication[] } | null = null
const TTL = 10 * 60_000
const day = (v: string | undefined): string | null => (v && /^\d{4}-\d\d-\d\d/.test(v) ? v.slice(0, 10) : null)
const labels: Record<string, string> = categoryLabels()

export function publications(): Publication[] {
  if (cache && Date.now() - cache.at < TTL) return cache.list
  const list: Publication[] = []
  for (const a of getAllArticles()) {
    const date = day(a.publishedAt)
    if (!date) continue
    list.push({
      slug: a.slug,
      path: articleHref(a),
      title: a.title || a.slug,
      description: a.description,
      category: labels[a.categorie] ?? a.categorie,
      date,
      updatedAt: day(a.updatedAt),
    })
  }
  list.sort((a, b) => (a.date < b.date ? 1 : -1))
  cache = { at: Date.now(), list }
  return list
}
