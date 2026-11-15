import Link from 'next/link'
import { eurosFr, guidePourSurface } from './guide-surface'
import type { Rentabilite } from './rentabilite'

type Props = { result: Rentabilite; annees: number; surface: number }

/** Bloc sombre : les deux coûts en barres, le temps récupéré, la phrase de verdict, puis le guide adapté à la surface. */
export function RentabiliteResult({ result, annees, surface }: Props) {
  const max = Math.max(result.coutRobotTotal, result.coutThermiqueTotal, 1)
  const guide = guidePourSurface(surface)
  const duree = `${annees} an${annees > 1 ? 's' : ''}`

  return (
    <>
      <div className="dark-card stack-lg" aria-live="polite">
        <h2 className="h-md">Sur {duree}</h2>
        <ul className="bars">
          <li>
            <div className="row">
              <span>Robot tondeuse</span>
              <b className="num">{eurosFr(result.coutRobotTotal)}</b>
            </div>
            <div className="bar">
              <i style={{ width: `${(result.coutRobotTotal / max) * 100}%` }} />
            </div>
          </li>
          <li>
            <div className="row">
              <span>Tondeuse classique</span>
              <b className="num">{eurosFr(result.coutThermiqueTotal)}</b>
            </div>
            <div className="bar">
              <i className="alt" style={{ width: `${(result.coutThermiqueTotal / max) * 100}%` }} />
            </div>
            <p>Essence, entretien et votre temps de tonte.</p>
          </li>
          <li>
            <div className="row">
              <span>Heures de tonte récupérées</span>
              <b className="num hl">{result.tempsTotal.toLocaleString('fr-FR')} h</b>
            </div>
            <p>Soit {Math.round(result.tempsTotal / annees)} h par an.</p>
          </li>
          {result.breakEvenMois !== null ? (
            <li>
              <div className="row">
                <span>Le robot s’amortit en</span>
                <b className="num">{result.breakEvenMois} mois</b>
              </div>
            </li>
          ) : null}
        </ul>
        <p className="verdict">
          {result.economie > 0 ? (
            <>
              Sur {duree}, le robot vous fait économiser <b>{eurosFr(result.economie)}</b>.
            </>
          ) : (
            <>
              Sur {duree}, le robot coûte <b>{eurosFr(Math.abs(result.economie))}</b> de plus que la tondeuse classique.
            </>
          )}
        </p>
      </div>
      <Link className="btn btn--full" href={guide.href}>
        {guide.label}
      </Link>
    </>
  )
}
