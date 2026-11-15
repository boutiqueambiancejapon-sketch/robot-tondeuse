/** Calcul de rentabilité robot / tondeuse classique. Formules inchangées depuis la version d'avant la V2. */

const TONTES_PAR_MOIS_SAISON = 4
const MOIS_TONTE_PAR_AN = 7

export type Reglages = {
  surface: number
  prixRobot: number
  coutEssenceMois: number
  heuresParTonte: number
  coutHoraire: number
  annees: number
}

export type Rentabilite = {
  coutRobotTotal: number
  coutThermiqueTotal: number
  economie: number
  breakEvenMois: number | null
  tempsTotal: number
  essenceTotal: number
}

export function calculerRentabilite({ surface, prixRobot, coutEssenceMois, heuresParTonte, coutHoraire, annees }: Reglages): Rentabilite {
  // Coût total robot : prix achat + entretien (lames 50€/an) + remplacement batterie (150€ tous les 5 ans)
  const lamesAnnees = 50 * annees
  const batteries = annees >= 5 ? Math.floor(annees / 5) * 150 : 0
  const electricite = (surface / 100) * 4 * MOIS_TONTE_PAR_AN * annees * 0.20 // ~4 kWh par 100 m² par mois × tarif EDF
  const coutRobotTotal = prixRobot + lamesAnnees + batteries + electricite

  // Coût total thermique : essence + entretien (vidange ~50€/an, lame ~30€/an) + temps personnel
  const essenceTotal = coutEssenceMois * MOIS_TONTE_PAR_AN * annees
  const entretienThermique = 80 * annees
  const tempsTotal = heuresParTonte * TONTES_PAR_MOIS_SAISON * MOIS_TONTE_PAR_AN * annees
  const coutTempsTotal = tempsTotal * coutHoraire
  const coutThermiqueTotal = essenceTotal + entretienThermique + coutTempsTotal

  const economie = coutThermiqueTotal - coutRobotTotal
  const breakEvenMois = (() => {
    const robotCoutMensuel = coutRobotTotal / (annees * 12)
    const thermiqueMensuel = coutThermiqueTotal / (annees * 12)
    if (thermiqueMensuel <= robotCoutMensuel) return null
    // simplifié : mois pour amortir l'achat initial du robot via les économies vs thermique
    const economieMensuelle = thermiqueMensuel - robotCoutMensuel
    return Math.ceil(prixRobot / economieMensuelle)
  })()

  return {
    coutRobotTotal: Math.round(coutRobotTotal),
    coutThermiqueTotal: Math.round(coutThermiqueTotal),
    economie: Math.round(economie),
    breakEvenMois,
    tempsTotal: Math.round(tempsTotal),
    essenceTotal: Math.round(essenceTotal),
  }
}
