// Poses de la mascotte (public/images/mascotte) : largeur et hauteur réelles de chaque dessin.
export const MASCOTTES = {
  automne: [640, 600],
  balance: [640, 605],
  boxe: [640, 530],
  calcul: [640, 546],
  ete: [602, 640],
  fete: [640, 542],
  hiver: [640, 631],
  jardinier: [640, 632],
  lecture: [613, 640],
  loupe: [640, 575],
  outils: [640, 526],
  piscine: [640, 552],
  podium: [640, 599],
  printemps: [640, 502],
  prix: [640, 491],
  side: [640, 513],
  top: [640, 540]
} as const

export type Pose = keyof typeof MASCOTTES
