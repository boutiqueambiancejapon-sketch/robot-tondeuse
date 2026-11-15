/**
 * lib/deals.ts — baisses de prix vérifiées, affichées sur /deals.
 *
 * Règle : un robot entre dans cette liste le jour où son prix passe sous le plus bas des 30 jours
 * précédents, chez le même marchand. Chaque ligne porte la date du relevé. Sans relevé daté, la liste
 * reste vide et la page explique la règle. Jamais de prix barré, de stock ni de compte à rebours.
 */
export type Deal = {
  /** Slug de la fiche dans content/produits. */
  slug: string
  /** Nom affiché du robot. */
  name: string
  /** Marchand du relevé (ex. « Amazon »). */
  store: string
  /** Lien vers la fiche chez ce marchand (passe par AffiliateLink). */
  url: string
  /** Prix relevé, en euros. */
  price: number
  /** Plus bas prix des 30 jours précédents chez le même marchand, en euros. */
  lowest30d: number
  /** Date du relevé, AAAA-MM-JJ. */
  checkedAt: string
}

export const DEALS: Deal[] = []

/** Ne garde que les vraies baisses : prix relevé sous le plus bas des 30 jours précédents, avec une date. */
export function getVerifiedDeals(): Deal[] {
  return DEALS.filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.checkedAt) && d.price > 0 && d.price < d.lowest30d)
}
