import type { MetadataRoute } from 'next'
import { niche } from '@/niche.config'
import { getAllArticles, articleHref, getCategories } from '@/lib/blog'
import { PRODUIT_SLUGS } from '@/lib/comparateur'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // ── Pages statiques ──────────────────────────────────────────────────
  entries.push(
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/comparer`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/simulateur`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  )

  // ── Catégories blog ──────────────────────────────────────────────────
  for (const cat of getCategories()) {
    entries.push({
      url: `${SITE_URL}/blog/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // ── Articles (standalone + blog) ─────────────────────────────────────
  for (const article of getAllArticles()) {
    entries.push({
      url: `${SITE_URL}${articleHref(article)}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // ── Pages produit : /choisir/[slug] et /comparer/[slug] ─────────────
  for (const slug of PRODUIT_SLUGS) {
    entries.push(
      { url: `${SITE_URL}/choisir/${slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${SITE_URL}/comparer/${slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    )
  }

  // ── Page auteur ──────────────────────────────────────────────────────
  entries.push({
    url: `${SITE_URL}/auteurs/${niche.author.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  })

  return entries
}
