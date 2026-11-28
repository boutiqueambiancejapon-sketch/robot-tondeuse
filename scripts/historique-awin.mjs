// Historique des prix Cdiscount et Fnac (flux Awin), pour la page Deals.
// Chaque relevé ajoute une ligne par produit et par marchand ; on garde 90 jours glissants.
// Ne pas mêler avec historique-prix.json (prix des boutiques des fabricants, relevé à part).

export const JOURS_GARDES = 90

/**
 * @typedef {{ cle: string, marchand: string, prix: number, quand: string }} LigneHistorique
 * @typedef {Record<string, Record<string, { prix: number }>>} Offres
 */

/**
 * Ajoute les prix du relevé à l'historique et retire les lignes de plus de 90 jours.
 * @param {LigneHistorique[]} historique lignes déjà gardées
 * @param {Offres} offres contenu de offres.json (clé produit → marchand → offre)
 * @param {string} quand date et heure du relevé, ISO (ex. 2026-11-28T11:00Z)
 * @returns {LigneHistorique[]}
 */
export function ajouterReleve(historique, offres, quand, jours = JOURS_GARDES) {
  const limite = new Date(new Date(quand).getTime() - jours * 86_400_000).toISOString()
  const nouvelles = []
  for (const [cle, parMarchand] of Object.entries(offres)) {
    for (const [marchand, offre] of Object.entries(parMarchand)) {
      if (offre && typeof offre.prix === 'number' && offre.prix > 0) nouvelles.push({ cle, marchand, prix: offre.prix, quand })
    }
  }
  // Un relevé relancé à la même heure remplace le précédent au lieu de s'ajouter.
  const gardees = historique.filter((l) => l.quand !== quand && new Date(l.quand).toISOString() >= limite)
  return [...gardees, ...nouvelles].sort((a, b) => a.quand.localeCompare(b.quand) || a.cle.localeCompare(b.cle) || a.marchand.localeCompare(b.marchand))
}

/** Une ligne par relevé et par produit : le fichier reste lisible et les changements restent petits. */
export function ecrireHistorique(lignes) {
  return lignes.length ? `[\n${lignes.map((l) => `  ${JSON.stringify(l)}`).join(',\n')}\n]\n` : '[]\n'
}
