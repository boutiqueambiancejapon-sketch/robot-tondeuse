import type { MetadataRoute } from 'next'
import { niche } from '@/niche.config'
import { getAllArticles, articleHref, getCategories } from '@/lib/blog'
import { PRODUIT_SLUGS } from '@/lib/comparateur'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

/**
 * Slugs des articles-stubs (placeholders ~800-950 B) redirigés 301 vers un article complet.
 * On les exclut du sitemap pour ne pas soumettre des URLs de redirection à Google.
 * La liste miroir des redirects se trouve dans next.config.ts.
 */
const STUB_SLUGS = new Set([
  'robot-tondeuse-pente',
  'robot-tondeuse-rtk',
  'robot-tondeuse-vision-ia',
  'robot-tondeuse-multi-zones',
  'robot-tondeuse-haut-de-gamme',
  'robot-tondeuse-connecte',
  'robot-tondeuse-grande-surface',
  'entretien-robot-tondeuse',
  'robot-tondeuse-rapport-qualite-prix',
  'robot-tondeuse-500m2',
  'installation-robot-tondeuse',
  'robot-tondeuse-bruit-voisinage',
  'depannage-robot-tondeuse',
  'hivernage-robot-tondeuse',
  'robot-tondeuse-pas-cher',
])

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // ── Pages statiques ──────────────────────────────────────────────────
  entries.push(
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    // Hubs cluster (Atelier Vert)
    { url: `${SITE_URL}/comparatifs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/marques`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    // Outils
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/superficie`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/comparer`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/calculateur-rentabilite-robot-tondeuse`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Éditorial
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    // Légal
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

  // ── Articles (standalone + blog) — stubs exclus ──────────────────────
  for (const article of getAllArticles()) {
    if (STUB_SLUGS.has(article.slug)) continue
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
