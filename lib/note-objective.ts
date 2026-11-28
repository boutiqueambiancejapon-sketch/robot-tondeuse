/**
 * lib/note-objective.ts — note sur 10 et indice de confiance d'un robot de data/robots-tondeuses.json
 * (tasks/collections-v1.md § 3 ter). Barème : lib/bareme.ts. Pas de page de méthode (propriétaire, 28/11/2026) :
 * le détail critère par critère est sur chaque fiche.
 *
 * Seulement les caractéristiques publiées par la marque. Un critère sans donnée sourcée est retiré
 * du barème (jamais compté 0) : la note est recalculée sur les critères disponibles et l'indice de
 * confiance dit quelle part du barème est couverte. Aucune note sous 60 % ; aucun badge sous 80 %.
 * Exception : sans prix public, pas de note (le critère du prix pèse 25 points sur 100 ; le retirer
 * donnait 10/10 aux robots dont la marque ne publie pas le prix).
 * Le prix utilisé est le prix public de la marque, daté dans la base (le même que le radar) : la note
 * ne bouge pas avec les promotions du jour.
 */
import { CRITERES, pointsCriteres, SEUIL_PROPOSER_MIEUX, type Caracteristiques, type Connexion, type Navigation } from './bareme'
import type { RobotCatalogue } from './radar'

export const CONFIANCE_MIN_NOTE = 60
export const CONFIANCE_MIN_BADGE = 80

/** « rtk+lidar+vision » → deux repères ou plus. « fil » seul ne dit pas si le trajet est guidé : non noté. */
export function navigationDe(guidage: string): Navigation | null {
  if (guidage === 'fil') return null
  const reperes = guidage.split('+').filter((g) => ['rtk', 'lidar', 'vision'].includes(g))
  if (reperes.length >= 2) return 'sans-fil-multi'
  return reperes.length === 1 ? 'sans-fil-simple' : null
}

/** Connexion incluse d'origine (une 4G vendue en option ne compte pas). */
export function connexionDe(c: string[] | null): Connexion | null {
  if (!c?.length) return null
  if (c.includes('4g')) return '4g'
  if (c.includes('wifi')) return 'wifi'
  return c.includes('bluetooth') ? 'bluetooth' : 'aucune'
}

const MANQUE: Record<string, string> = {
  navigation: 'trajet sur câble non précisé',
  prixParSurface: 'prix public non publié',
  pente: 'pente non publiée',
  bruit: 'bruit non publié',
  connexion: 'connexion non publiée',
}

export type CritereNote = { id: string; titre: string; points: number | null; max: number; texte: string }

export type NoteObjective = {
  /** Note sur 10 à une décimale, ou null sous 60 % de confiance. */
  note: number | null
  /** Part du barème couverte par des données sourcées, en %. */
  confiance: number
  /** Ce qui manque, en clair (« bruit non publié »). */
  manques: string[]
  criteres: CritereNote[]
  proposerMieux: boolean
  badgePossible: boolean
}

export function noteObjective(r: RobotCatalogue): NoteObjective {
  const c: Partial<Caracteristiques> = {
    prix: r.prix_eur ?? undefined,
    surface: r.surface_m2 ?? undefined,
    pente: r.pente_pct ?? undefined,
    bruit: r.bruit_db ?? undefined,
    navigation: navigationDe(r.guidage) ?? undefined,
    connexion: connexionDe(r.connectivite) ?? undefined,
  }
  const pts = pointsCriteres(c)
  const criteres = pts.map((d) => {
    const k = CRITERES.find((x) => x.id === d.id)!
    const texte = d.points === null ? MANQUE[d.id] : (k.paliers.find((p) => p.points === d.points)?.texte ?? '')
    return { id: d.id, titre: k.titre, points: d.points, max: d.max, texte }
  })
  const couverts = criteres.filter((d) => d.points !== null)
  const maxCouvert = couverts.reduce((s, d) => s + d.max, 0)
  const total = criteres.reduce((s, d) => s + d.max, 0)
  const confiance = Math.round((maxCouvert / total) * 100)
  const sur100 = maxCouvert ? (couverts.reduce((s, d) => s + (d.points ?? 0), 0) / maxCouvert) * 100 : 0
  const note = confiance >= CONFIANCE_MIN_NOTE && c.prix ? Math.round(sur100) / 10 : null
  return {
    note,
    confiance,
    manques: criteres.filter((d) => d.points === null).map((d) => MANQUE[d.id]),
    criteres,
    proposerMieux: note !== null && note * 10 < SEUIL_PROPOSER_MIEUX,
    badgePossible: note !== null && confiance >= CONFIANCE_MIN_BADGE,
  }
}

/** Rang du robot parmi les robots notés du catalogue (1 = meilleure note ; ex æquo au même rang). */
export function rangDansCatalogue(r: RobotCatalogue, catalogue: RobotCatalogue[]): { rang: number; notes: number; analyses: number } | null {
  const ici = noteObjective(r).note
  const notes = catalogue.map((x) => noteObjective(x).note).filter((n): n is number => n !== null)
  if (ici === null) return null
  return { rang: notes.filter((n) => n > ici).length + 1, notes: notes.length, analyses: catalogue.length }
}

/** « 7,8 » */
export const noteFr = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
