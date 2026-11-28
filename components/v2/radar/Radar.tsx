/**
 * Radar — graphe radar à 6 axes d'une fiche robot (tasks/collections-v1.md § 3 bis). SVG pur, sans état :
 * rendu par le serveur, et réutilisé tel quel par RadarChoix quand le visiteur change la comparaison.
 * 1 à 4 tracés : couleur ET motif de trait distincts. Un axe sans donnée n'a pas de point.
 */
import { AXES, type SerieRadar } from '@/lib/radar'
import { RadarTableau } from './RadarTableau'

const C = 180
const R = 112
const ANNEAUX = [2, 4, 6, 8, 10]
/** Motif de trait par tracé (le 1er est plein et rempli). */
export const TRAITS = ['', '7 4', '2 4', '11 4 2 4']

const angle = (i: number) => ((-90 + 60 * i) * Math.PI) / 180
const point = (i: number, note: number) => {
  const r = (note / 10) * R
  return [C + r * Math.cos(angle(i)), C + r * Math.sin(angle(i))] as const
}
const fmt = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

/** Texte lu par les lecteurs d'écran et les moteurs : toutes les notes de tous les tracés. */
export function texteRadar(series: SerieRadar[], total: number): string {
  const parSerie = series.map(
    (s) => `${s.nom} : ${AXES.map((a) => `${a.label.toLowerCase()} ${s.notes[a.cle] === null ? 'sans donnée' : fmt(s.notes[a.cle]!)}`).join(', ')}`,
  )
  return `Notes sur 10, rang parmi les ${total} robots de la base. ${parSerie.join('. ')}.`
}

function Libelle({ i, texte }: { i: number; texte: string }) {
  const x = C + (R + 16) * Math.cos(angle(i))
  const y = C + (R + 16) * Math.sin(angle(i))
  const ancre = Math.abs(x - C) < 4 ? 'middle' : x > C ? 'start' : 'end'
  const lignes = texte === 'Connexion et antivol' ? ['Connexion', 'et antivol'] : [texte]
  const dy = y < C - 20 ? -4 - 14 * (lignes.length - 1) : y > C + 20 ? 14 : 4 - 7 * (lignes.length - 1)
  return (
    <text x={x} y={y + dy} textAnchor={ancre} className="radar__lbl">
      {lignes.map((l, k) => (
        <tspan key={l} x={x} dy={k ? 14 : 0}>
          {l}
        </tspan>
      ))}
    </text>
  )
}

function Trace({ s, rang }: { s: SerieRadar; rang: number }) {
  const pts = AXES.flatMap((a, i) => (s.notes[a.cle] === null ? [] : [point(i, s.notes[a.cle]!)]))
  return (
    <g className={`radar__s radar__s--${rang + 1}`}>
      <polygon
        points={pts.map((p) => p.join(',')).join(' ')}
        strokeDasharray={TRAITS[rang] || undefined}
        fillOpacity={rang === 0 ? 0.16 : 0}
      />
      {pts.map(([x, y]) => (
        <circle key={`${x},${y}`} cx={x} cy={y} r={rang === 0 ? 4 : 3} />
      ))}
    </g>
  )
}

type Props = { series: SerieRadar[]; total: number; /** Boutons « Retirer » de la légende, côté client. */ retirer?: (id: string) => void }

export function Radar({ series, total, retirer }: Props) {
  const hexa = (n: number) => AXES.map((_, i) => point(i, n).join(',')).join(' ')
  return (
    <figure className="radar">
      <svg viewBox="-24 0 408 360" role="img" aria-label={texteRadar(series, total)} className="radar__svg">
        {ANNEAUX.map((n) => (
          <polygon key={n} points={hexa(n)} className="radar__grille" />
        ))}
        {AXES.map((a, i) => {
          const [x, y] = point(i, 10)
          return <line key={a.cle} x1={C} y1={C} x2={x} y2={y} className="radar__grille" />
        })}
        {[...series].reverse().map((s) => (
          <Trace key={s.id} s={s} rang={series.indexOf(s)} />
        ))}
        {AXES.map((a, i) => (
          <Libelle key={a.cle} i={i} texte={a.label} />
        ))}
      </svg>
      <ul className="radar__leg">
        {series.map((s, rang) => (
          <li key={s.id} className={`radar__s--${rang + 1}`}>
            <svg width="30" height="10" aria-hidden="true">
              <line x1="0" y1="5" x2="30" y2="5" strokeDasharray={TRAITS[rang] || undefined} />
            </svg>
            <span>{s.nom}</span>
            {retirer && rang > 0 ? (
              <button type="button" className="radar__x" onClick={() => retirer(s.id)} aria-label={`Retirer ${s.nom}`}>
                Retirer
              </button>
            ) : null}
          </li>
        ))}
      </ul>
      <figcaption className="radar__note">
        Chaque note va de 0 à 10 : c&apos;est le rang du robot parmi les {total} modèles de la base du site, d&apos;après les
        fiches des fabricants. Ce n&apos;est pas un avis. Pour le silence et le prix, plus la note est haute, plus le robot
        est discret ou bon marché. Un axe sans point : le fabricant ne publie pas la valeur.
      </figcaption>
      <RadarTableau series={series} />
    </figure>
  )
}
