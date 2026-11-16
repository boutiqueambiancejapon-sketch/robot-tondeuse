import { COMPARATEURS } from '@/lib/comparateur'
import { offresPour, type Offre } from '@/lib/offres'

// Modèle conseillé par le quiz → fiche produit (content/produits), quand elle existe.
const FICHES: Record<string, string> = {
  'husqvarna automower 415x': 'husqvarna-automower-415x',
  'mammotion luba 2 awd 5000': 'mammotion-luba-2-awd-5000',
  'mammotion yuka mini 2 500': 'mammotion-yuka-mini-2-500',
  'mammotion yuka 1500': 'mammotion-yuka-1500',
  'worx landroid m700': 'worx-landroid-m700-plus-wr167e',
}

/**
 * Offres Amazon, Cdiscount et Fnac de chaque robot que le quiz peut conseiller, calculées côté serveur.
 * Clé : le nom du modèle en minuscules, comme dans `recommend()`.
 */
export function quizMerchantLinks(models: string[] = QUIZ_MODELS): Record<string, Offre[]> {
  const amazon: Record<string, string> = {}
  for (const produit of Object.values(COMPARATEURS)) {
    for (const modele of produit.modeles) {
      if (modele.amazonUrl) amazon[`${produit.id} ${modele.nom}`.toLowerCase()] = modele.amazonUrl
    }
  }
  return Object.fromEntries(models.map((m) => [m.toLowerCase(), offresPour(m, FICHES[m.toLowerCase()], amazon[m.toLowerCase()])]))
}

export const QUIZ_MODELS = [
  'Gardena SILENO city 600',
  'Husqvarna Automower 415X',
  'Husqvarna Automower 435X AWD',
  'Mammotion Luba 2 AWD 3000',
  'Mammotion Luba 2 AWD 5000',
  'Mammotion YUKA Mini 2 500',
  'Mammotion Yuka 1500',
  'Worx Landroid M700',
  'Worx Landroid S300',
]
