/**
 * Boutons marchands Amazon, Cdiscount et Fnac pour un robot.
 * - Prix relevé : content/offres/offres.json (flux Awin, scripts/offres-awin.mjs, chaque nuit).
 * - Sinon : lien partenaire vers la recherche du modèle chez le marchand, sans prix.
 * Aucun prix n'est affiché sans sa date de relevé.
 */
import offresData from '@/content/offres/offres.json'
import awin from '@/content/offres/awin.json'
import { getProduct, getPrimaryLink } from '@/lib/products'
import { affiliateHref } from '@/lib/utils/affiliate'

import type { Offre } from './offres-format'
export type { Offre } from './offres-format'

type Releve = { prix: number; url: string; date: string }
const RELEVES = offresData as Record<string, { cdiscount?: Releve; fnac?: Releve }>

const SEARCH: Record<'Cdiscount' | 'Fnac', (q: string) => string> = {
  Cdiscount: (q) => `https://www.cdiscount.com/search/10/${encodeURIComponent(q.toLowerCase().replace(/\s+/g, '+'))}.html`,
  Fnac: (q) => `https://www.fnac.com/SearchResult/ResultList.aspx?Search=${encodeURIComponent(q)}`,
}

/** Lien partenaire Awin vers n'importe quelle page du marchand (recherche comprise). */
function awinLink(marchand: 'Cdiscount' | 'Fnac', target: string): string {
  const mid = marchand === 'Cdiscount' ? awin.cdiscount : awin.fnac
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${awin.affid}&ued=${encodeURIComponent(target)}`
}

/** Les trois offres d'un robot, dans l'ordre : prix relevés d'abord (du moins cher au plus cher), puis recherches. */
export function offresPour(nom: string, slug?: string, amazonUrl?: string): Offre[] {
  const releve = slug ? RELEVES[slug] : undefined
  const produit = slug ? getProduct(slug) : null
  const amazonSrc = amazonUrl || produit?.links?.find((l) => l.store.toLowerCase() === 'amazon')?.url
  const amazon: Offre = {
    marchand: 'Amazon',
    url: affiliateHref(amazonSrc ?? (produit ? getPrimaryLink(produit) : `https://www.amazon.fr/s?k=${encodeURIComponent(`robot tondeuse ${nom}`)}`)),
  }
  const autre = (marchand: 'Cdiscount' | 'Fnac', r?: Releve): Offre =>
    r ? { marchand, url: r.url, prix: r.prix, date: r.date } : { marchand, url: awinLink(marchand, SEARCH[marchand](nom)) }
  const list = [amazon, autre('Cdiscount', releve?.cdiscount), autre('Fnac', releve?.fnac)]
  return list.sort((a, b) => (a.prix ?? Infinity) - (b.prix ?? Infinity))
}
