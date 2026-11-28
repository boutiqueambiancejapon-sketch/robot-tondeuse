/** Collections d'exemple : un critère chacune (≥ 4 modèles pour ouvrir une page, règle commune). */
import type { CollectionDef } from '../types'

export const collections: CollectionDef[] = [
  { id: 'legers', label: 'Moins de 5 kg', champ: 'poids_kg', max: 5 },
  { id: 'autonomes', label: 'Plus d’une heure d’autonomie', champ: 'autonomie_min', min: 60 },
]
