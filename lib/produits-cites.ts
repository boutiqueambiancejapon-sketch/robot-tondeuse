/**
 * Produits cités dans un article : les encarts <ProductCTA name="…" url="…" price="…" />, dans l'ordre, sans doublon.
 * Sert à la carte « Notre choix » du haut et au tableau des prix (pages d'achat et comparatifs).
 */
import { getProductImageByName } from '@/lib/products'

export type ProduitCite = { name: string; url: string; price?: string; hook?: string; image?: string; badge?: string }

const attr = (tag: string, key: string) => new RegExp(`\\b${key}="([^"]*)"`).exec(tag)?.[1]

export function produitsCites(content: string): ProduitCite[] {
  const seen = new Set<string>()
  const out: ProduitCite[] = []
  for (const m of content.matchAll(/<ProductCTA\b[^>]*\/?>/g)) {
    const name = attr(m[0], 'name')
    const url = attr(m[0], 'url')
    if (!name || !url || seen.has(name.toLowerCase())) continue
    seen.add(name.toLowerCase())
    out.push({ name, url, price: attr(m[0], 'price'), hook: attr(m[0], 'hook'), badge: attr(m[0], 'badge'), image: attr(m[0], 'image') || getProductImageByName(name) })
  }
  return out
}

/** Prix le plus bas d'une fourchette « 449-549 € » (ou d'un prix seul), en euros. */
export function prixBas(price?: string): number | undefined {
  const n = price?.replace(/\s/g, '').match(/\d+(?:[.,]\d+)?/)?.[0]
  return n ? Number(n.replace(',', '.')) : undefined
}
