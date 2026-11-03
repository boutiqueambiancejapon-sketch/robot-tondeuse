/**
 * lib/og/data.ts — contenu des images de partage, tiré des articles eux-mêmes
 * (format, nombre de modèles cités, prix d'appel des <ProductCTA>, durée de lecture). Rien d'inventé.
 */
import fs from 'node:fs'
import path from 'node:path'
import { niche } from '@/niche.config'
import type { OgHook } from './ShareCard'
import { frNumber, ogHeadline, ogTitle } from './text'

export type OgArticle = { pill: string; title: string; shortTitle: string; hook: OgHook | null; meta: string | null; cover?: string }

type Meta = { slug: string; title: string; categorie: string; readingTimeMin?: number; featureImage?: string; faq?: unknown[] }

const CATEGORY_NAMES: Record<string, string> = {
  astuces: 'Astuces',
  'guide-achat': "Guides d'achat",
  'guides-achat': "Guides d'achat",
  comparatif: 'Comparatifs',
  'entretien-robot': 'Entretien du robot',
  faq: 'Questions fréquentes',
  tuto: 'Tutos',
}

export function categoryName(slug: string): string {
  const brand = niche.categories.find((c) => c.slug === slug)
  if (brand) return brand.label
  return CATEGORY_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
}

export function isBrand(slug: string): boolean {
  return niche.categories.some((c) => c.slug === slug && c.slug !== 'entretien-pelouse')
}

function formatLabel(m: Meta): string {
  const s = m.slug
  if (/-vs-/.test(s) || /quelle-marque|comparatif/.test(s)) return 'Comparatif'
  if (/depannage|ne-charge|panne|probleme|bug|coupe-trouver/.test(s)) return 'Dépannage'
  if (/^comment-|installer|hiverner|reparer|scarifier/.test(s) || m.categorie === 'tuto') return 'Tuto'
  if (m.categorie === 'entretien-pelouse') return 'Pelouse'
  if (/^meilleur|top-\d|^quel-|guide-achat|choisir/.test(s) || /guides?-achat/.test(m.categorie)) return "Guide d'achat"
  return 'Conseils'
}

/** Prix d'appel (borne basse) d'un champ price="1 399-1 599 €". */
function lowPrice(price: string): number | null {
  const m = price.match(/\d[\d\s  ]*/)
  if (!m) return null
  const n = parseInt(m[0].replace(/\D/g, ''), 10)
  return Number.isFinite(n) && n >= 50 ? n : null
}

function products(content: string): { names: string[]; minPrice: number | null } {
  const names = new Set<string>()
  const prices: number[] = []
  for (const m of content.matchAll(/<ProductCTA\b([^>]*)>/g)) {
    const name = m[1].match(/\bname="([^"]+)"/)?.[1]
    const price = m[1].match(/\bprice="([^"]+)"/)?.[1]
    if (name) names.add(name.trim().toLowerCase())
    const p = price ? lowPrice(price) : null
    if (p) prices.push(p)
  }
  return { names: [...names], minPrice: prices.length ? Math.min(...prices) : null }
}

function surface(title: string): string | null {
  const m = title.match(/(\d[\d\s ]*)\s?m(?:²|2)\b/)
  if (!m) return null
  return `${frNumber(parseInt(m[1].replace(/\D/g, ''), 10))} m²`
}

export function articleOg(meta: Meta, content: string): OgArticle {
  const { names, minPrice } = products(content)
  const reading = meta.readingTimeMin ? `${meta.readingTimeMin} min de lecture` : null
  const price = minPrice ? `Prix dès ${frNumber(minPrice)} €` : null
  const isVs = /-vs-/.test(meta.slug)
  const area = surface(meta.title)
  let hook: OgHook | null = null
  let extra: string | null = reading
  if (isVs) {
    hook = { big: '2', small: ['modèles', 'face à face'] }
    extra = price ?? reading
  } else if (names.length >= 3) {
    hook = { big: String(names.length), small: ['modèles', 'comparés'] }
    extra = price ?? reading
  } else if (area) {
    hook = { big: area, small: ['de jardin'] }
  } else if (meta.readingTimeMin) {
    hook = { big: `${meta.readingTimeMin} min`, small: ['de lecture'] }
    extra = meta.faq && meta.faq.length >= 3 ? `FAQ : ${meta.faq.length} questions` : null
  }
  return {
    pill: formatLabel(meta),
    title: ogTitle(meta.title),
    shortTitle: ogHeadline(meta.title, 20),
    hook,
    meta: extra,
    cover: meta.featureImage || undefined,
  }
}

export function countProducts(): number {
  const dir = path.join(process.cwd(), 'content/produits')
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).length : 0
}

