/** Programmes partenaires de Quel Robot Tondeuse, dans l'ordre de préférence. L'étiquette Amazon vient de site.ts. */
import type { Partenaire } from '../types'
import { site } from './site'

export const partenaires: Partenaire[] = [
  { id: 'amazon', nom: 'Amazon', tag: site.affiliateTag, actif: true },
  // Flux Awin (Fnac, Cdiscount…) : scripts/offres-awin.mjs et content/offres/.
  { id: 'awin', nom: 'Awin', actif: true },
]
