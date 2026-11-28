/**
 * lib/avis-base-texte.ts — phrases des pages « Avis » de la base (lib/avis-base.ts) : points forts, limites, mauvais choix
 * et questions. Chaque phrase vient d'un chiffre de data/robots-tondeuses.json et de son rang dans la base, jamais d'un essai.
 */
import { noteFr, noteObjective } from './note-objective'
import { AXES, nomRobot, serieRadar } from './radar'
import { texteGuidage, type RobotBase } from './avis-base'

const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })
const dateFr = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/** Pente en % → degrés (45 % ≈ 24°). */
export const degres = (pct: number) => Math.round((Math.atan(pct / 100) * 180) / Math.PI)

export const SEUIL_FORT = 7.5
export const SEUIL_LIMITE = 3.5

export type Ligne = { axe: string; texte: string }

/**
 * Points forts : axes du radar où le robot passe devant au moins 75 % des robots qui publient le chiffre.
 * Limites : axes sous 35 %, puis les chiffres que la marque ne publie pas. Toujours au moins une limite :
 * à défaut, l'axe le plus faible.
 */
export function forcesLimites(r: RobotBase, catalogue: RobotBase[]): { forces: Ligne[]; limites: Ligne[] } {
  const s = serieRadar(r, catalogue)
  const connus = AXES.filter((a) => s.notes[a.cle] !== null)
  const devant = (n: number) => `devant ${Math.round(n * 10)} % des robots de la base qui publient ce chiffre`
  const derriere = (n: number) => `${100 - Math.round(n * 10)} % des robots de la base qui publient ce chiffre font mieux`
  const ligne = (a: (typeof AXES)[number]) => ({ axe: a.label, texte: `${s.valeurs[a.cle]}, ${devant(s.notes[a.cle] as number)}` })
  const ligneFaible = (a: (typeof AXES)[number]) => ({ axe: a.label, texte: `${s.valeurs[a.cle]} ; ${derriere(s.notes[a.cle] as number)}` })
  const forces = connus.filter((a) => (s.notes[a.cle] as number) >= SEUIL_FORT).map(ligne)
  const limites = connus.filter((a) => (s.notes[a.cle] as number) <= SEUIL_LIMITE).map(ligneFaible)
  const manques = AXES.filter((a) => s.notes[a.cle] === null && a.cle !== 'connexion').map((a) => ({
    axe: a.label,
    texte: `chiffre non publié par ${r.marque}, impossible à comparer`,
  }))
  if (!limites.length && connus.length) {
    const pire = [...connus].sort((a, b) => (s.notes[a.cle] as number) - (s.notes[b.cle] as number))[0]
    limites.push(ligneFaible(pire))
  }
  return { forces, limites: [...limites, ...manques] }
}

/** Anti-conseil : pour quel jardin ce robot est un mauvais choix, d'après ses propres chiffres. */
export function mauvaisChoix(r: RobotBase): string[] {
  const l: string[] = []
  if (r.pente_pct) l.push(`un terrain qui dépasse ${r.pente_pct} % de pente (environ ${degres(r.pente_pct)}°), la limite annoncée par ${r.marque}`)
  if (r.surface_m2 && r.surface_m2 >= 1500)
    l.push(`une pelouse de moins de ${nf.format(Math.round(r.surface_m2 / 4 / 100) * 100)} m² : un modèle prévu pour une plus petite surface coûte moins cher`)
  if (r.guidage.includes('rtk') && !r.guidage.includes('lidar'))
    l.push('un jardin couvert d’arbres ou bordé de murs hauts, où le signal satellite du RTK passe mal')
  if (r.guidage === 'fil') l.push('un propriétaire qui ne veut pas enterrer de câble autour de la pelouse')
  return l
}

export type Question = { q: string; a: string }

export function questions(r: RobotBase, rivaux: RobotBase[]): Question[] {
  const nom = nomRobot(r)
  const note = noteObjective(r)
  const q: Question[] = []
  if (r.surface_m2)
    q.push({ q: `Quelle surface le ${nom} peut-il tondre ?`, a: `${r.marque} annonce ${nf.format(r.surface_m2)} m²${r.zones_max ? `, en ${r.zones_max} zones au plus` : ''}. C’est un maximum en conditions favorables : sur un terrain découpé ou en pente, comptez moins.` })
  if (r.pente_pct)
    q.push({ q: `Le ${nom} monte-t-il les pentes ?`, a: `La fiche officielle annonce ${r.pente_pct} %, soit environ ${degres(r.pente_pct)}°. Au-delà, le robot patine ou refuse la zone.` })
  q.push({
    q: `Faut-il poser un câble périphérique pour le ${nom} ?`,
    a: r.guidage === 'fil' ? 'Oui : il suit un câble enterré ou agrafé autour de la pelouse.' : `Non. Il se repère par ${texteGuidage(r.guidage)} ; les bords et les zones interdites se tracent dans l’application.`,
  })
  if (r.bruit_db) q.push({ q: `Le ${nom} est-il bruyant ?`, a: `${r.marque} annonce ${r.bruit_db} dB(A). La plupart des robots de la base annoncent entre 55 et 65 dB(A).` })
  if (r.prix_eur && r.prix_lu_le)
    q.push({ q: `Combien coûte le ${nom} ?`, a: `${nf.format(r.prix_eur)} € prix public de ${r.marque}, lu le ${dateFr(r.prix_lu_le)}. Les marchands le vendent parfois moins cher : les prix relevés sont datés en haut de la page.` })
  if (rivaux.length)
    q.push({
      q: `Quels rivaux comparer au ${nom} ?`,
      a: rivaux
        .map((x) => {
          const n = noteObjective(x).note
          return `${nomRobot(x)} (${n !== null ? `${noteFr(n)}/10` : 'non noté'}${x.prix_eur ? `, ${nf.format(x.prix_eur)} €` : ''})`
        })
        .join(' et ') + ' : même famille de guidage, prix proche.',
    })
  q.push({
    q: `Le site a-t-il essayé le ${nom} ?`,
    a: `Non. La note${note.note !== null ? ` de ${noteFr(note.note)}/10` : ''} est calculée sur la fiche officielle de ${r.marque}, avec le même barème pour chaque robot (confiance ${note.confiance} %).`,
  })
  return q
}
