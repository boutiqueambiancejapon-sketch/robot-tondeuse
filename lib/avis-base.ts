/**
 * lib/avis-base.ts — pages « Avis <modèle> » servies depuis data/robots-tondeuses.json, pour les robots qui n'ont pas
 * d'avis MDX (mission du propriétaire du 28/11/2026, gabarit FICHE PRODUIT). Publiées par lots (data/avis-lots.json).
 * Garde-fou Google (abus de contenu à grande échelle) : une page n'est indexée que si la fiche a au moins
 * 8 caractéristiques sourcées, une note sur 10 et au moins 2 rivaux chiffrés ; sinon noindex.
 * Fonctions pures : la liste des avis MDX existants est passée en paramètre.
 */
import lotsJson from '@/data/avis-lots.json'
import { noteFr, noteObjective } from './note-objective'
import { concurrentsParDefaut, nomRobot, type RobotCatalogue } from './radar'

/** Robot tel que la base le décrit, avec les champs que le radar ne lit pas. */
export type RobotBase = RobotCatalogue & {
  largeur_coupe_cm?: number | null
  hauteur_coupe_mm?: number[] | null
  ip?: string | null
  poids_kg?: number | null
  transmission?: string | null
  zones_max?: number | null
  prix_source?: string | null
  asin?: string | null
  sources?: { url: string; lu_le: string; note?: string }[]
}

export type Lot = { n: number; publie_le: string; ids: string[] }
export const LOTS = (lotsJson as { lots: Lot[] }).lots

export const MIN_CARACTERISTIQUES = 8
export const MAX_PAR_LOT = 10
export const PREFIXE = 'avis-'

export const slugAvis = (id: string) => `${PREFIXE}${id}`

const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })
const GUIDAGE: Record<string, string> = { rtk: 'GPS RTK', lidar: 'LiDAR', vision: 'caméra', fil: 'câble périphérique' }
const CONNEXION: Record<string, string> = { wifi: 'wifi', bluetooth: 'Bluetooth', '4g': '4G' }

export const texteGuidage = (g: string) => g.split('+').map((x) => GUIDAGE[x] ?? x).join(' + ')

/** Caractéristiques publiées, dans l'ordre du tableau. Une valeur absente n'apparaît pas (jamais « 0 »). */
export function caracteristiques(r: RobotBase): { label: string; valeur: string }[] {
  const l: { label: string; valeur: string | null }[] = [
    { label: 'Surface maximale annoncée', valeur: r.surface_m2 ? `${nf.format(r.surface_m2)} m²` : null },
    { label: 'Pente maximale annoncée', valeur: r.pente_pct ? `${r.pente_pct} %` : null },
    { label: 'Guidage', valeur: r.guidage ? texteGuidage(r.guidage) : null },
    { label: 'Câble périphérique', valeur: r.sans_fil === undefined ? null : r.sans_fil ? 'non, sans câble' : 'oui' },
    { label: 'Largeur de coupe', valeur: r.largeur_coupe_cm ? `${nf.format(r.largeur_coupe_cm)} cm` : null },
    { label: 'Hauteur de coupe', valeur: r.hauteur_coupe_mm?.length === 2 ? `${r.hauteur_coupe_mm[0]} à ${r.hauteur_coupe_mm[1]} mm` : null },
    { label: 'Autonomie annoncée', valeur: r.autonomie_min ? `${r.autonomie_min} min` : null },
    { label: 'Bruit annoncé', valeur: r.bruit_db ? `${r.bruit_db} dB(A)` : null },
    { label: 'Roues motrices', valeur: r.transmission ? (r.transmission === '4rm' ? '4 roues motrices' : '2 roues motrices') : null },
    { label: 'Zones de tonte', valeur: r.zones_max ? `${r.zones_max}` : null },
    { label: 'Connexion', valeur: r.connectivite?.length ? r.connectivite.map((c) => CONNEXION[c] ?? c).join(', ') : null },
    { label: 'Indice de protection', valeur: r.ip ?? null },
    { label: 'Poids', valeur: r.poids_kg ? `${nf.format(r.poids_kg)} kg` : null },
  ]
  return l.filter((x): x is { label: string; valeur: string } => Boolean(x.valeur))
}

/** Nombre de caractéristiques sourcées (le guidage compte ; le câble, simple conséquence du guidage, non). */
export const nbSourcees = (r: RobotBase) => (r.sources?.length ? caracteristiques(r).filter((c) => c.label !== 'Câble périphérique').length : 0)

/** Ids de robots publiés dans un lot, dans l'ordre des lots. */
export const idsPublies = (lots: Lot[] = LOTS) => lots.flatMap((l) => l.ids)

export const lotDe = (id: string, lots: Lot[] = LOTS) => lots.find((l) => l.ids.includes(id)) ?? null

/** La page peut-elle être indexée ? Sinon, la raison en clair (écrite dans le journal et en commentaire). */
export function indexable(r: RobotBase, catalogue: RobotBase[]): { ok: boolean; raison: string | null } {
  if (r.arrete) return { ok: false, raison: 'robot arrêté' }
  if (nbSourcees(r) < MIN_CARACTERISTIQUES) return { ok: false, raison: `${nbSourcees(r)} caractéristiques sourcées sur ${MIN_CARACTERISTIQUES}` }
  if (noteObjective(r).note === null) return { ok: false, raison: 'pas de note sur 10 (prix public ou données manquantes)' }
  if (concurrentsParDefaut(r, catalogue).length < 2) return { ok: false, raison: 'moins de 2 rivaux comparables' }
  return { ok: true, raison: null }
}

/** « Avis Automower 435X AWD NERA : 8,1/10, 5 000 m² », 60 signes au plus, sans année. */
export function titreAvis(r: RobotBase): string {
  const note = noteObjective(r).note
  const chiffre = note !== null ? `${noteFr(note)}/10` : r.surface_m2 ? `${nf.format(r.surface_m2)} m²` : 'fiche chiffrée'
  const surface = note !== null && r.surface_m2 ? `, ${nf.format(r.surface_m2)} m²` : ''
  const essais = [`Avis ${nomRobot(r)} : ${chiffre}${surface}`, `Avis ${nomRobot(r)} : ${chiffre}`, `Avis ${r.modele} : ${chiffre}${surface}`, `Avis ${r.modele} : ${chiffre}`]
  return essais.find((t) => t.length <= 60) ?? essais[essais.length - 1].slice(0, 60)
}

export function descriptionAvis(r: RobotBase): string {
  const note = noteObjective(r).note
  const parts = [
    note !== null ? `note ${noteFr(note)}/10 sur la fiche officielle` : 'fiche officielle chiffrée',
    r.surface_m2 ? `${nf.format(r.surface_m2)} m²` : null,
    r.pente_pct ? `${r.pente_pct} % de pente` : null,
    r.prix_eur ? `${nf.format(r.prix_eur)} € prix public` : null,
  ].filter(Boolean)
  return `${nomRobot(r)} : ${parts.join(', ')}. Radar face à ses rivaux, points forts, limites et alternatives, sans essai.`
}

/** Dernière date utile de la page : relevé du prix, lecture des sources ou publication du lot. */
export function dateModif(r: RobotBase, publie: string): string {
  return [publie, r.prix_lu_le ?? '', ...(r.sources ?? []).map((s) => s.lu_le)].filter(Boolean).sort().at(-1) as string
}
