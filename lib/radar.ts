/**
 * radar.ts — notes du graphe radar des fiches robots (tasks/collections-v1.md § 3 bis).
 * Chaque axe est noté de 0 à 10 par rang centile parmi TOUS les robots du catalogue qui ont une valeur
 * sourcée sur cet axe. Ce n'est pas un avis : seulement une position dans data/robots-tondeuses.json.
 * Un axe sans donnée vaut null (non tracé), jamais 0.
 */

export type RobotCatalogue = {
  id: string
  marque: string
  modele: string
  surface_m2: number | null
  pente_pct: number | null
  guidage: string
  connectivite: string[] | null
  option_4g?: boolean
  bruit_db: number | null
  autonomie_min: number | null
  prix_eur: number | null
  arrete?: boolean
}

export const AXES = [
  { cle: 'surface', label: 'Surface' },
  { cle: 'pente', label: 'Pente' },
  { cle: 'silence', label: 'Silence' },
  { cle: 'autonomie', label: 'Autonomie' },
  { cle: 'connexion', label: 'Connexion et antivol' },
  { cle: 'prix', label: 'Prix' },
] as const

export type AxeCle = (typeof AXES)[number]['cle']
export type NotesRadar = Record<AxeCle, number | null>

export type SerieRadar = {
  id: string
  nom: string
  notes: NotesRadar
  /** Valeur brute lisible de chaque axe (« 3 000 m² »), pour le tableau des valeurs. */
  valeurs: Record<AxeCle, string | null>
}

/** Points de connexion : application (Bluetooth ou wifi) 1, wifi 1, 4G 2 (1 si en option), GPS RTK 1. */
export function pointsConnexion(r: RobotCatalogue): number | null {
  const c = r.connectivite ?? []
  if (c.length === 0) return null
  const app = c.includes('bluetooth') || c.includes('wifi') ? 1 : 0
  const wifi = c.includes('wifi') ? 1 : 0
  const g4 = c.includes('4g') ? 2 : r.option_4g ? 1 : 0
  const gps = r.guidage.includes('rtk') ? 1 : 0
  return app + wifi + g4 + gps
}

type Brut = { valeur: (r: RobotCatalogue) => number | null; inverse: boolean; format: (v: number, r: RobotCatalogue) => string }

const nf = new Intl.NumberFormat('fr-FR')

const BRUTS: Record<AxeCle, Brut> = {
  surface: { valeur: (r) => r.surface_m2, inverse: false, format: (v) => `${nf.format(v)} m²` },
  pente: { valeur: (r) => r.pente_pct, inverse: false, format: (v) => `${v} %` },
  silence: { valeur: (r) => r.bruit_db, inverse: true, format: (v) => `${v} dB` },
  autonomie: { valeur: (r) => r.autonomie_min, inverse: false, format: (v) => `${v} min` },
  connexion: {
    valeur: pointsConnexion,
    inverse: false,
    format: (_v, r) => {
      const c = r.connectivite ?? []
      const parts = [c.includes('wifi') && 'wifi', c.includes('bluetooth') && 'Bluetooth', c.includes('4g') ? '4G' : r.option_4g && '4G en option', r.guidage.includes('rtk') && 'GPS RTK']
      return parts.filter(Boolean).join(', ')
    },
  },
  prix: { valeur: (r) => r.prix_eur, inverse: true, format: (v) => `${nf.format(v)} €` },
}

/** Rang centile de 0 à 10 (une décimale). Égalités : rang moyen. Inverse : la plus petite valeur a 10. */
export function rangCentile(v: number, toutes: number[], inverse = false): number {
  const n = toutes.length
  if (n <= 1) return 5
  const dessous = toutes.filter((x) => (inverse ? x > v : x < v)).length
  const egales = toutes.filter((x) => x === v).length
  return Math.round(((dessous + (egales - 1) / 2) / (n - 1)) * 100) / 10
}

/** « Segway Navimow » + « Navimow i220 » → « Segway Navimow i220 » (pas de mot en double). */
export function nomRobot(r: Pick<RobotCatalogue, 'marque' | 'modele'>): string {
  const mots = r.marque.split(' ')
  const dernier = mots[mots.length - 1].toLowerCase()
  const debut = r.modele.split(' ')[0].toLowerCase()
  return debut === dernier ? [...mots.slice(0, -1), r.modele].join(' ') : `${r.marque} ${r.modele}`
}

export function serieRadar(robot: RobotCatalogue, catalogue: RobotCatalogue[]): SerieRadar {
  const notes = {} as NotesRadar
  const valeurs = {} as SerieRadar['valeurs']
  for (const { cle } of AXES) {
    const b = BRUTS[cle]
    const v = b.valeur(robot)
    const toutes = catalogue.map(b.valeur).filter((x): x is number => x !== null && x !== undefined)
    notes[cle] = v === null || v === undefined ? null : rangCentile(v, toutes, b.inverse)
    valeurs[cle] = v === null || v === undefined ? null : b.format(v, robot)
  }
  return { id: robot.id, nom: nomRobot(robot), notes, valeurs }
}

/** Famille de guidage : fil, LiDAR, RTK ou vision seule. */
export function familleGuidage(g: string): 'fil' | 'lidar' | 'rtk' | 'vision' {
  if (g === 'fil') return 'fil'
  if (g.includes('lidar')) return 'lidar'
  if (g.includes('rtk')) return 'rtk'
  return 'vision'
}

/**
 * Concurrents par défaut : même famille de guidage, autre marque d'abord, prix le plus proche
 * (surface la plus proche si l'un des prix manque). Robots arrêtés exclus.
 */
export function concurrentsParDefaut(robot: RobotCatalogue, catalogue: RobotCatalogue[], nombre = 2): RobotCatalogue[] {
  const fam = familleGuidage(robot.guidage)
  const ecart = (r: RobotCatalogue) =>
    robot.prix_eur !== null && r.prix_eur !== null
      ? Math.abs(r.prix_eur - robot.prix_eur)
      : 1e6 + Math.abs((r.surface_m2 ?? 0) - (robot.surface_m2 ?? 0))
  const rang = (r: RobotCatalogue) => (familleGuidage(r.guidage) === fam ? 0 : 2) + (r.marque === robot.marque ? 1 : 0)
  return catalogue
    .filter((r) => r.id !== robot.id && !r.arrete)
    .sort((a, b) => rang(a) - rang(b) || ecart(a) - ecart(b) || a.id.localeCompare(b.id))
    .slice(0, nombre)
}

/** Lit `?vs=<id>,<id>` : ids connus, sans doublon ni le robot lui-même, 3 au plus. */
export function lireVs(param: string | null, connus: string[], principal: string): string[] {
  if (!param) return []
  const ids = param.split(',').map((s) => s.trim()).filter((id) => id && id !== principal && connus.includes(id))
  return [...new Set(ids)].slice(0, 3)
}
