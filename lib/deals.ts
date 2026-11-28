/**
 * lib/deals.ts — baisses de prix vérifiées, affichées sur /deals.
 *
 * Règle : un produit entre dans cette liste le jour où son prix passe sous le plus bas des 30 jours
 * précédents, chez le même marchand, et seulement avec 30 jours d'historique (lib/deals-detection.ts).
 * Source : content/offres/historique-awin.json (un prix par relevé, Cdiscount et Fnac), lien et nom
 * pris dans le dernier relevé (offres.json). Sans historique suffisant, la liste reste vide et la page
 * explique la règle. Jamais de prix barré, de stock ni de compte à rebours.
 */
import historiqueData from '@/content/offres/historique-awin.json'
import offresData from '@/content/offres/offres.json'
import { detecterBaisses, type LigneHistorique } from './deals-detection'

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
  /** Date et heure du relevé (ISO, UTC). */
  checkedAtTime?: string
}

type OffreFlux = { prix?: number; url?: string; nom?: string }
type OffresFlux = Record<string, Record<string, OffreFlux | undefined>>

const MARCHANDS: Record<string, string> = { cdiscount: 'Cdiscount', fnac: 'Fnac' }

/** Baisses de l'historique, gardées seulement si le dernier relevé porte le même prix et un lien. */
export function dealsDepuisHistorique(historique: LigneHistorique[], offres: OffresFlux): Deal[] {
  const deals: Deal[] = []
  for (const b of detecterBaisses(historique)) {
    const offre = offres[b.cle]?.[b.marchand]
    if (!offre?.url || offre.prix !== b.prix) continue
    deals.push({
      slug: b.cle,
      name: offre.nom ?? b.cle,
      store: MARCHANDS[b.marchand] ?? b.marchand,
      url: offre.url,
      price: b.prix,
      lowest30d: b.plusBas30j,
      checkedAt: b.quand.slice(0, 10),
      checkedAtTime: b.quand,
    })
  }
  return deals
}

export const DEALS: Deal[] = dealsDepuisHistorique(historiqueData as LigneHistorique[], offresData as OffresFlux)

/** Ne garde que les vraies baisses : prix relevé sous le plus bas des 30 jours précédents, avec une date. */
export function getVerifiedDeals(): Deal[] {
  return DEALS.filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.checkedAt) && d.price > 0 && d.price < d.lowest30d)
}
