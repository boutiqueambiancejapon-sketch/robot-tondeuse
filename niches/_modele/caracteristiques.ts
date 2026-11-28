/** Caractéristiques publiées des produits d'exemple, dans l'ordre du tableau de la fiche. */
import type { Caracteristique } from '../types'

export const caracteristiques: Caracteristique[] = [
  { id: 'puissance_w', label: 'Puissance', unite: 'W' },
  { id: 'autonomie_min', label: 'Autonomie', unite: 'min' },
  { id: 'poids_kg', label: 'Poids', unite: 'kg' },
  { id: 'bruit_db', label: 'Bruit', unite: 'dB' },
  { id: 'garantie_ans', label: 'Garantie', unite: 'ans' },
]
