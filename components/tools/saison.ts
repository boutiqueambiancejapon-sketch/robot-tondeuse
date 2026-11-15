import type { Pose } from '@/lib/mascotte'

export type Saison = Extract<Pose, 'printemps' | 'ete' | 'automne' | 'hiver'>

/** Mascotte de saison d'un mois (0 = janvier) : printemps de mars à mai, été de juin à août, automne en septembre et octobre. */
export function saisonDuMois(mois: number): Saison {
  if (mois >= 2 && mois <= 4) return 'printemps'
  if (mois >= 5 && mois <= 7) return 'ete'
  if (mois === 8 || mois === 9) return 'automne'
  return 'hiver'
}
