/**
 * lib/gabarits.ts — calculs partagés par les gabarits validés le 28/11/2026 (fiche, classement, collection, duel).
 * Maquette : ~/drafts/qrt-gabarits/maquette-validee.html ; règles : tasks/gabarits-affiliation.md.
 * Rien n'est inventé : la note vient du barème public (lib/note-objective.ts), le prix d'un prix public daté.
 * Sans accès aux fichiers : utilisable côté serveur comme côté client.
 */
import { noteObjective } from './note-objective'
import type { RobotCatalogue } from './radar'

export type ResumeChiffre = {
  /** Moyenne des notes sur 10 des robots notés, arrondie au dixième ; null si aucun n'est noté. */
  noteMoyenne: number | null
  /** Nombre de modèles analysés (notés ou non). */
  modeles: number
  /** Nombre de modèles notés. */
  notes: number
  /** Prix médian des prix publics datés ; null si aucun. */
  prixMedian: number | null
  /** Date ISO du relevé de prix le plus récent pris en compte. */
  misAJour: string | null
}

/** Médiane (moyenne des deux valeurs du milieu pour un nombre pair). */
export function mediane(valeurs: number[]): number | null {
  if (!valeurs.length) return null
  const v = [...valeurs].sort((a, b) => a - b)
  const m = Math.floor(v.length / 2)
  return v.length % 2 ? v[m] : Math.round((v[m - 1] + v[m]) / 2)
}

/** Résumé chiffré d'une collection : note moyenne · nombre de modèles · prix médian. Seuls les prix datés comptent. */
export function resumeChiffre(robots: RobotCatalogue[]): ResumeChiffre {
  const notes = robots.map((r) => noteObjective(r).note).filter((n): n is number => n !== null)
  const dates = robots.filter((r) => r.prix_eur && r.prix_lu_le)
  const moyenne = notes.length ? Math.round((notes.reduce((a, n) => a + n, 0) / notes.length) * 10) / 10 : null
  return {
    noteMoyenne: moyenne,
    modeles: robots.length,
    notes: notes.length,
    prixMedian: mediane(dates.map((r) => r.prix_eur as number)),
    misAJour: dates.map((r) => r.prix_lu_le as string).sort().at(-1) ?? null,
  }
}

export type Facette = { id: string; label: string; test: (r: RobotCatalogue) => boolean }
export type FacetteComptee = { id: string; label: string; nombre: number }

/** Nombre de modèles par filtre. Un filtre qui ne garde aucun modèle, ou qui les garde tous, est retiré : il ne trierait rien. */
export function compterFacettes(robots: RobotCatalogue[], facettes: Facette[]): FacetteComptee[] {
  return facettes
    .map((f) => ({ id: f.id, label: f.label, nombre: robots.filter(f.test).length }))
    .filter((f) => f.nombre > 0 && f.nombre < robots.length)
}

/** Identifiants des filtres auxquels répond un robot (attribut data-f des cartes filtrables). */
export const facettesDe = (r: RobotCatalogue, facettes: Facette[]) => facettes.filter((f) => f.test(r)).map((f) => f.id)

/** Filtres de base des collections de robots tondeuses (maquette validée). */
export const FACETTES_ROBOTS: Facette[] = [
  { id: 'pente45', label: 'Pente ≥ 45 %', test: (r) => (r.pente_pct ?? 0) >= 45 },
  { id: 'sansfil', label: 'Sans câble', test: (r) => r.guidage !== 'fil' },
  { id: '4g', label: '4G antivol', test: (r) => (r.connectivite ?? []).includes('4g') || Boolean(r.option_4g) },
  { id: 'moins1000', label: 'Moins de 1 000 €', test: (r) => Boolean(r.prix_eur && r.prix_lu_le && r.prix_eur < 1000) },
]

const nf = new Intl.NumberFormat('fr-FR')
/** « 1 899 € » avec espaces insécables. */
export const euros = (n: number) => `${nf.format(n)} €`
/** « 28/11/2026 » */
export const dateCourte = (iso: string) => iso.slice(0, 10).split('-').reverse().join('/')
