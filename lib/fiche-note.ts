/**
 * lib/fiche-note.ts — tout ce que le haut d'une fiche robot affiche (tasks/collections-v1.md § 3 ter) :
 * note sur 10, rang dans la base, offres datées et « L'essentiel en 30 secondes ».
 * Chaque phrase vient de data/robots-tondeuses.json ou d'un relevé daté, jamais d'un essai.
 */
import historiqueData from '@/content/offres/historique-prix.json'
import { releves as relevesAwin } from './offres-releves'
import { noteFr, noteObjective, rangDansCatalogue, type NoteObjective } from './note-objective'
import { concurrentsParDefaut, nomRobot, type RobotCatalogue } from './radar'

export type OffreDatee = { marchand: string; prix: number; date: string; url: string; dispo: boolean | null }
type PrixDuJour = { date: string; slug: string; prix: number; dispo: boolean; page: string }

const HISTORIQUE = (historiqueData as { releves: PrixDuJour[] }).releves

/** Offres relevées et datées : Cdiscount et Fnac (flux Awin), boutique de la marque (relevé du jour). Moins chère d'abord. */
export function offresDatees(r: RobotCatalogue, historique: PrixDuJour[] = HISTORIQUE): OffreDatee[] {
  const aw = relevesAwin(nomRobot(r), r.id)
  const liste: OffreDatee[] = []
  if (aw?.cdiscount) liste.push({ marchand: 'Cdiscount', prix: aw.cdiscount.prix, date: aw.cdiscount.date, url: aw.cdiscount.url, dispo: null })
  if (aw?.fnac) liste.push({ marchand: 'Fnac', prix: aw.fnac.prix, date: aw.fnac.date, url: aw.fnac.url, dispo: null })
  const marque = historique.filter((h) => h.slug === r.id).sort((a, b) => b.date.localeCompare(a.date))[0]
  if (marque) liste.push({ marchand: `Boutique ${r.marque}`, prix: marque.prix, date: marque.date, url: marque.page, dispo: marque.dispo })
  return liste.filter((o) => o.prix > 0 && o.date).sort((a, b) => a.prix - b.prix)
}

const nf = new Intl.NumberFormat('fr-FR')
export const dateFr = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

type Axe = { cle: string; val: (r: RobotCatalogue) => number | null; plusPetitMieux: boolean; fort: (v: number, n: number, t: number) => string; faible: (v: number, n: number, t: number) => string }

const AXES: Axe[] = [
  { cle: 'surface', val: (r) => r.surface_m2, plusPetitMieux: false, fort: (v, n, t) => `la surface, ${nf.format(v)} m² annoncés\u00a0; ${n} robots sur ${t} annoncent moins`, faible: (v, n, t) => `la surface, ${nf.format(v)} m² annoncés\u00a0; ${n} robots sur ${t} annoncent plus` },
  { cle: 'pente', val: (r) => r.pente_pct, plusPetitMieux: false, fort: (v, n, t) => `la pente, ${v}\u00a0% annoncés\u00a0; ${n} robots sur ${t} annoncent moins`, faible: (v, n, t) => `la pente, ${v}\u00a0% annoncés\u00a0; ${n} robots sur ${t} montent plus raide` },
  { cle: 'autonomie', val: (r) => r.autonomie_min, plusPetitMieux: false, fort: (v, n, t) => `l'autonomie, ${v}\u00a0min annoncées\u00a0; ${n} robots sur ${t} tiennent moins`, faible: (v, n, t) => `l'autonomie, ${v}\u00a0min annoncées\u00a0; ${n} robots sur ${t} tiennent plus longtemps` },
  { cle: 'silence', val: (r) => r.bruit_db, plusPetitMieux: true, fort: (v, n, t) => `le bruit, ${v}\u00a0dB annoncés\u00a0; ${n} robots sur ${t} font plus de bruit`, faible: (v, n, t) => `le bruit, ${v}\u00a0dB annoncés\u00a0; ${n} robots sur ${t} sont plus discrets` },
  { cle: 'prix', val: (r) => r.prix_eur, plusPetitMieux: true, fort: (v, n, t) => `le prix public, ${nf.format(v)}\u00a0€\u00a0; ${n} robots sur ${t} coûtent plus cher`, faible: (v, n, t) => `le prix public, ${nf.format(v)}\u00a0€\u00a0; ${n} robots sur ${t} coûtent moins cher` },
]

/** Pour chaque axe publié : combien de robots font moins bien, combien font mieux, sur combien. */
function positions(r: RobotCatalogue, catalogue: RobotCatalogue[]) {
  return AXES.flatMap((a) => {
    const v = a.val(r)
    if (v === null) return []
    const toutes = catalogue.map(a.val).filter((x): x is number => x !== null)
    const moinsBien = toutes.filter((x) => (a.plusPetitMieux ? x > v : x < v)).length
    const mieux = toutes.filter((x) => (a.plusPetitMieux ? x < v : x > v)).length
    return [{ a, v, moinsBien, mieux, t: toutes.length }]
  })
}

export type FicheNote = {
  robot: RobotCatalogue
  nom: string
  note: NoteObjective
  rang: ReturnType<typeof rangDansCatalogue>
  offres: OffreDatee[]
  essentiel: string[]
}

export function ficheNote(r: RobotCatalogue, catalogue: RobotCatalogue[]): FicheNote {
  const note = noteObjective(r)
  const pos = positions(r, catalogue)
  const fort = [...pos].sort((x, y) => y.moinsBien / y.t - x.moinsBien / x.t)[0]
  const faible = [...pos].sort((x, y) => y.mieux / y.t - x.mieux / x.t)[0]
  const pourQui = [
    `Pour un terrain jusqu'à ${nf.format(r.surface_m2 ?? 0)}\u00a0m²`,
    r.pente_pct ? `et des pentes jusqu'à ${r.pente_pct}\u00a0% annoncées` : null,
    ].filter(Boolean).join(' ') + (r.guidage === 'fil' ? ', avec câble périphérique' : ', sans câble périphérique')
  const alt = concurrentsParDefaut(r, catalogue, 1)[0]
  const altNote = alt ? noteObjective(alt).note : null
  const essentiel = [
    `${pourQui}.`,
    fort ? `Point fort\u00a0: ${fort.a.fort(fort.v, fort.moinsBien, fort.t)}.` : null,
    faible && faible !== fort && faible.mieux > 0 ? `Point faible\u00a0: ${faible.a.faible(faible.v, faible.mieux, faible.t)}.` : null,
    note.manques.length ? `Non publié par ${r.marque}\u00a0: ${note.manques.map((m) => m.replace(/ non publiée?$/, '')).join(', ')}.` : null,
    alt
      ? `Alternative au guidage proche\u00a0: ${nomRobot(alt)}${altNote !== null ? `, ${noteFr(altNote)}/10` : ''}${alt.prix_eur ? `, ${nf.format(alt.prix_eur)} € prix public` : ''}.`
      : null,
  ].filter((s): s is string => Boolean(s))
  return { robot: r, nom: nomRobot(r), note, rang: rangDansCatalogue(r, catalogue), offres: offresDatees(r), essentiel }
}
