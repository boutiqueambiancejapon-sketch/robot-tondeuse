/**
 * lib/bareme.ts — barème public de la note sur 100 d'un robot tondeuse (lot 3).
 *
 * La note vient seulement des caractéristiques annoncées par la marque (fiche ou notice) :
 * nous n'essayons pas les robots. Le barème est public : la page qui l'expliquera lira
 * CRITERES, la même source que le calcul. Rien n'est affiché pour l'instant.
 *
 * Règle : s'il manque une caractéristique, on ne note pas (pas de note devinée).
 * Règle : sous SEUIL_PROPOSER_MIEUX, la fiche propose de meilleurs choix au lieu de vendre le robot.
 */

export type Navigation = 'sans-fil-multi' | 'sans-fil-simple' | 'fil-guide' | 'fil-aleatoire'
export type Connexion = '4g' | 'wifi' | 'bluetooth' | 'aucune'

export type Caracteristiques = {
  prix: number // en euros, prix relevé
  surface: number // m², surface maximale annoncée
  pente: number // %, pente maximale annoncée
  bruit: number // dB, niveau sonore annoncé
  navigation: Navigation
  connexion: Connexion
}

type Palier = { points: number; texte: string }
export type Critere = { id: keyof Omit<Caracteristiques, 'prix'> | 'prixParSurface'; titre: string; max: number; paliers: Palier[] }

export const SEUIL_PROPOSER_MIEUX = 55

export const CRITERES: Critere[] = [
  { id: 'navigation', titre: 'Navigation', max: 30, paliers: [
    { points: 30, texte: 'sans fil, deux repères combinés (RTK, caméra ou LiDAR)' },
    { points: 22, texte: 'sans fil, un seul repère (caméra seule)' },
    { points: 14, texte: 'câble périphérique et trajet guidé' },
    { points: 6, texte: 'câble périphérique et trajet au hasard' },
  ] },
  { id: 'prixParSurface', titre: 'Prix pour 100 m² de surface annoncée', max: 25, paliers: [
    { points: 25, texte: '60 € ou moins' },
    { points: 20, texte: '90 € ou moins' },
    { points: 15, texte: '130 € ou moins' },
    { points: 10, texte: '180 € ou moins' },
    { points: 5, texte: 'plus de 180 €' },
  ] },
  { id: 'pente', titre: 'Pente maximale annoncée', max: 15, paliers: [
    { points: 15, texte: '70 % ou plus' },
    { points: 12, texte: '45 % ou plus' },
    { points: 9, texte: '35 % ou plus' },
    { points: 6, texte: '25 % ou plus' },
    { points: 3, texte: 'moins de 25 %' },
  ] },
  { id: 'bruit', titre: 'Bruit annoncé par la marque', max: 15, paliers: [
    { points: 15, texte: '55 dB ou moins' },
    { points: 12, texte: '58 dB ou moins' },
    { points: 9, texte: '60 dB ou moins' },
    { points: 6, texte: '62 dB ou moins' },
    { points: 3, texte: 'plus de 62 dB' },
  ] },
  { id: 'connexion', titre: 'Connexion', max: 15, paliers: [
    { points: 15, texte: '4G (réglage et alerte de vol de partout)' },
    { points: 10, texte: 'Wi-Fi' },
    { points: 4, texte: 'Bluetooth seul (réglage à quelques mètres)' },
    { points: 0, texte: 'aucune' },
  ] },
]

const palier = (seuils: number[], points: number[], v: number, croissant: boolean) => {
  const i = seuils.findIndex((s) => (croissant ? v >= s : v <= s))
  return i === -1 ? points[points.length - 1] : points[i]
}

export type Detail = { id: Critere['id']; points: number; max: number }
export type Resultat = { note: number; details: Detail[]; proposerMieux: boolean }

export function noter(c: Caracteristiques): Resultat {
  const nav = { 'sans-fil-multi': 30, 'sans-fil-simple': 22, 'fil-guide': 14, 'fil-aleatoire': 6 }[c.navigation]
  const prix100 = (c.prix / c.surface) * 100
  const details: Detail[] = [
    { id: 'navigation', points: nav, max: 30 },
    { id: 'prixParSurface', points: palier([60, 90, 130, 180], [25, 20, 15, 10, 5], prix100, false), max: 25 },
    { id: 'pente', points: palier([70, 45, 35, 25], [15, 12, 9, 6, 3], c.pente, true), max: 15 },
    { id: 'bruit', points: palier([55, 58, 60, 62], [15, 12, 9, 6, 3], c.bruit, false), max: 15 },
    { id: 'connexion', points: { '4g': 15, wifi: 10, bluetooth: 4, aucune: 0 }[c.connexion], max: 15 },
  ]
  const note = details.reduce((s, d) => s + d.points, 0)
  return { note, details, proposerMieux: note < SEUIL_PROPOSER_MIEUX }
}

// ─── Lecture des fiches du comparateur (textes du type « 500 m² », « VSLAM + RTK (sans fil) ») ───
const nombre = (s?: string) => {
  const m = s?.replace(/\s/g, '').match(/\d+(?:[.,]\d+)?/)
  return m ? Number(m[0].replace(',', '.')) : null
}

export function lireNavigation(s?: string): Navigation | null {
  if (!s) return null
  const t = s.toLowerCase()
  if (t.includes('sans fil')) {
    const reperes = ['rtk', 'lidar', 'vision', 'vslam', 'caméra', 'camera'].filter((r) => t.includes(r))
    if (reperes.length >= 2) return 'sans-fil-multi'
    return reperes.length ? 'sans-fil-simple' : null
  }
  if (t.includes('fil')) return t.includes('aléatoire') || t.includes('aleatoire') ? 'fil-aleatoire' : 'fil-guide'
  return null
}

export function lireConnexion(s?: string): Connexion | null {
  if (!s) return null
  const t = s.toLowerCase()
  if (t.includes('4g')) return '4g'
  if (t.includes('wifi') || t.includes('wi-fi')) return 'wifi'
  if (t.includes('bluetooth')) return 'bluetooth'
  return null
}

/** Caractéristiques complètes, ou null s'il en manque une (le robot n'est alors pas noté). */
export function lireFiche(prix: number, specs: Record<string, string>): Caracteristiques | null {
  const surface = nombre(specs.surface)
  const pente = nombre(specs.pente)
  const bruit = nombre(specs.bruit)
  const navigation = lireNavigation(specs.navigation)
  const connexion = lireConnexion(specs.connectivite)
  if (!prix || !surface || !pente || !bruit || !navigation || !connexion) return null
  return { prix, surface, pente, bruit, navigation, connexion }
}
