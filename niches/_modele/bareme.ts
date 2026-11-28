/**
 * Barème public d'exemple : 5 critères, 10 points. Chaque palier se lit « à partir de » (sens haut)
 * ou « jusqu'à » (sens bas). Sous 60 % de points connus, pas de note.
 */
import type { Bareme } from '../types'

export const bareme: Bareme = {
  confianceMin: 60,
  criteres: [
    { id: 'puissance', titre: 'Puissance', champ: 'puissance_w', max: 3, sens: 'haut', paliers: [{ des: 500, points: 1 }, { des: 1000, points: 2 }, { des: 1500, points: 3 }] },
    { id: 'autonomie', titre: 'Autonomie', champ: 'autonomie_min', max: 2, sens: 'haut', paliers: [{ des: 30, points: 1 }, { des: 60, points: 2 }] },
    { id: 'poids', titre: 'Poids', champ: 'poids_kg', max: 2, sens: 'bas', paliers: [{ des: 6, points: 1 }, { des: 4, points: 2 }] },
    { id: 'bruit', titre: 'Silence', champ: 'bruit_db', max: 2, sens: 'bas', paliers: [{ des: 75, points: 1 }, { des: 65, points: 2 }] },
    { id: 'garantie', titre: 'Garantie', champ: 'garantie_ans', max: 1, sens: 'haut', paliers: [{ des: 3, points: 1 }] },
  ],
}
