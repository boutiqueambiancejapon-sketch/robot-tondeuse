/**
 * lib/deals-detection.ts — repère les vraies baisses dans l'historique des flux Awin (Cdiscount, Fnac).
 * Calcul seul, sans lecture de fichier : testé dans tests/unit/deals-detection.test.ts.
 *
 * Règle (tasks/deals-v1.md, découpage DL2 du Chef) :
 * - un produit entre si son prix passe sous le plus bas des 30 jours précédents chez le même marchand ;
 * - seulement s'il a au moins 30 jours d'historique avant cette baisse ;
 * - il sort quand le prix remonte, quand il quitte le flux, ou quand la baisse a plus de 30 jours
 *   (ce prix n'est alors plus « le plus bas depuis 30 jours », c'est le prix habituel).
 */

export const JOURS_REFERENCE = 30
const JOUR_MS = 86_400_000

export type LigneHistorique = { cle: string; marchand: string; prix: number; quand: string }

export type BaisseDetectee = {
  cle: string
  marchand: string
  /** Prix du dernier relevé, en euros. */
  prix: number
  /** Plus bas prix des 30 jours qui précèdent la baisse, même marchand. */
  plusBas30j: number
  /** Date et heure du relevé où la baisse est apparue (ISO). */
  depuis: string
  /** Date et heure du dernier relevé (ISO). */
  quand: string
}

const ms = (iso: string): number => new Date(iso).getTime()

/** Regroupe les lignes par produit et par marchand, chaque groupe trié du plus ancien au plus récent. */
function grouper(historique: LigneHistorique[]): Map<string, LigneHistorique[]> {
  const groupes = new Map<string, LigneHistorique[]>()
  for (const l of historique) {
    if (!(l.prix > 0) || Number.isNaN(ms(l.quand))) continue
    const k = `${l.cle}\u0000${l.marchand}`
    const g = groupes.get(k)
    if (g) g.push(l)
    else groupes.set(k, [l])
  }
  for (const g of groupes.values()) g.sort((a, b) => ms(a.quand) - ms(b.quand))
  return groupes
}

/** Baisse d'un seul groupe (produit + marchand), ou null. `dernierReleve` : heure du relevé le plus récent du flux. */
function baisseDuGroupe(lignes: LigneHistorique[], dernierReleve: number): BaisseDetectee | null {
  const derniere = lignes[lignes.length - 1]
  // Absent du dernier relevé : le produit a quitté le flux, il sort.
  if (ms(derniere.quand) !== dernierReleve) return null

  // Début de la baisse : premier relevé de la série au même prix que le dernier.
  let debut = lignes.length - 1
  while (debut > 0 && lignes[debut - 1].prix === derniere.prix) debut -= 1
  const depuis = ms(lignes[debut].quand)
  if (dernierReleve - depuis >= JOURS_REFERENCE * JOUR_MS) return null

  // Au moins 30 jours d'historique avant la baisse.
  const borne = depuis - JOURS_REFERENCE * JOUR_MS
  if (ms(lignes[0].quand) > borne) return null

  const avant = lignes.slice(0, debut).filter((l) => ms(l.quand) >= borne)
  if (avant.length === 0) return null
  const plusBas30j = avant.reduce((min, l) => Math.min(min, l.prix), Infinity)
  if (!(derniere.prix < plusBas30j)) return null

  return { cle: derniere.cle, marchand: derniere.marchand, prix: derniere.prix, plusBas30j, depuis: lignes[debut].quand, quand: derniere.quand }
}

/** Toutes les baisses en cours, la plus récente d'abord. */
export function detecterBaisses(historique: LigneHistorique[]): BaisseDetectee[] {
  // Boucle simple plutôt que Math.max(...) : l'historique peut compter des dizaines de milliers de lignes.
  let dernierReleve = Number.NaN
  for (const l of historique) {
    const t = ms(l.quand)
    if (!Number.isNaN(t) && !(t <= dernierReleve)) dernierReleve = t
  }
  if (Number.isNaN(dernierReleve)) return []
  const baisses: BaisseDetectee[] = []
  for (const lignes of grouper(historique).values()) {
    const b = baisseDuGroupe(lignes, dernierReleve)
    if (b) baisses.push(b)
  }
  return baisses.sort((a, b) => ms(b.depuis) - ms(a.depuis) || a.cle.localeCompare(b.cle))
}
