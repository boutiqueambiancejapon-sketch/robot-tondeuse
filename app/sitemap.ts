import type { MetadataRoute } from 'next'
import { niche } from '@/niche.config'
import { getAllArticles, articleHref, getCategories } from '@/lib/blog'
import { getPiscineArticles } from '@/lib/piscine'
import { PISCINE_DOSSIER } from '@/lib/utils/piscine'
import { PRODUIT_SLUGS } from '@/lib/comparateur'
import { avisBaseIndexables } from '@/lib/server/avis-base'
import { PROMO_BRANDS, PROMOS_CHECKED_AT, getBlackFridayBrands } from '@/lib/promos'

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
  'quel-robot-tondeuse-pour-mon-jardin',
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
    { url: `${SITE_URL}/calendrier-du-gazon`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/fiche-hivernage-robot-tondeuse`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
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

  // ── Avis des robots de la base (/avis-<id>) : seulement les pages indexables (lib/avis-base.ts) ──
  for (const a of avisBaseIndexables()) {
    entries.push({ url: `${SITE_URL}/${a.slug}`, lastModified: new Date(a.modifie), changeFrequency: 'monthly', priority: 0.7 })
  }

  // ── Rubrique « Robots de piscine » : page de rubrique + ses articles (/robot-piscine/<adresse>) ──
  entries.push({ url: `${SITE_URL}/${PISCINE_DOSSIER}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 })
  for (const article of getPiscineArticles()) {
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

  // ── Codes promo et Black Friday : page mère + une page par marque (lib/promos.ts) ──
  const promosCheckedAt = new Date(PROMOS_CHECKED_AT)
  entries.push(
    { url: `${SITE_URL}/code-promo`, lastModified: promosCheckedAt, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/black-friday-robot-tondeuse`, lastModified: promosCheckedAt, changeFrequency: 'weekly', priority: 0.7 },
  )
  for (const brand of PROMO_BRANDS) {
    entries.push({ url: `${SITE_URL}/code-promo/${brand.slug}`, lastModified: new Date(brand.checkedAt), changeFrequency: 'weekly', priority: 0.6 })
  }
  for (const brand of getBlackFridayBrands()) {
    entries.push({ url: `${SITE_URL}/black-friday-robot-tondeuse/${brand.slug}`, lastModified: new Date(brand.checkedAt), changeFrequency: 'weekly', priority: 0.6 })
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
