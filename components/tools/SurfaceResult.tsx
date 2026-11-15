import Link from 'next/link'
import { guidePourSurface, m2Fr } from './guide-surface'

/** Résultat de la mesure : surface tracée, taille de robot à viser (20 à 30 % de marge), puis le guide adapté. */
export function SurfaceResult({ area }: { area: number }) {
  const bas = Math.round(area * 1.2)
  const haut = Math.round(area * 1.3)
  const guide = guidePourSurface(bas)

  return (
    <>
      <div className="dark-card stack-lg" aria-live="polite">
        {area > 0 ? (
          <>
            <ul className="bars">
              <li>
                <div className="row">
                  <span>Surface tracée</span>
                  <b className="num hl">{m2Fr(area)}</b>
                </div>
                <div className="bar">
                  <i style={{ width: `${(area / haut) * 100}%` }} />
                </div>
              </li>
              <li>
                <div className="row">
                  <span>Robot à viser</span>
                  <b className="num">
                    {bas.toLocaleString('fr-FR')} à {m2Fr(haut)}
                  </b>
                </div>
                <div className="bar">
                  <i className="alt" style={{ width: '100%' }} />
                </div>
                <p>Avec 20 à 30 % de marge sur la surface tracée.</p>
              </li>
            </ul>
            <p className="verdict">
              Cherchez un robot annoncé pour au moins <b>{m2Fr(bas)}</b>.
            </p>
          </>
        ) : (
          <p className="verdict">Posez au moins 3 points sur la carte : la surface s’affiche ici.</p>
        )}
      </div>
      <Link className="btn btn--full" href={guide.href}>
        {guide.label}
      </Link>
    </>
  )
}
