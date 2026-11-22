/**
 * Historique des prix relevés chaque jour sur les boutiques officielles (content/offres/historique-prix.json,
 * écrit par scripts/releve-prix.mjs). Sert à comparer un prix au plus bas des 30 jours précédents.
 * Rien n'est affiché par ce module : il ne fait que lire.
 */
import historiqueData from '@/content/offres/historique-prix.json'

export type PrixDuJour = { date: string; slug: string; prix: number; reference?: number; dispo: boolean; page: string }

const HISTORIQUE = (historiqueData as { releves: PrixDuJour[] }).releves

const JOUR_MS = 86_400_000
const versJour = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / JOUR_MS

/**
 * Plus bas prix relevé pour `slug` sur les 30 jours qui précèdent `date` (jour même exclu),
 * avec le nombre de jours relevés. `null` sans aucun relevé dans la période.
 * Une offre ne se confirme que si les 30 jours sont tous relevés : `jours === 30`.
 */
export function plusBas30Jours(slug: string, date: string, releves: PrixDuJour[] = HISTORIQUE) {
  const fin = versJour(date)
  const periode = releves.filter((r) => r.slug === slug && versJour(r.date) < fin && versJour(r.date) >= fin - 30)
  if (!periode.length) return null
  return { prix: Math.min(...periode.map((r) => r.prix)), jours: new Set(periode.map((r) => r.date)).size }
}
