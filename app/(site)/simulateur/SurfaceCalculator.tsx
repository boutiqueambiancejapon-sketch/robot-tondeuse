'use client'

/**
 * SurfaceCalculator — une surface et deux contraintes, puis les robots qui conviennent, du moins cher au plus cher.
 * Le filtre et le tri sont ceux d'avant la V2 ; les robots sont dans robots.ts.
 */

import { useState } from 'react'
import Link from 'next/link'
import { guidePourSurface, m2Fr } from '@/components/tools/guide-surface'
import { RobotCard } from './RobotCard'
import { ROBOTS } from './robots'

export function SurfaceCalculator() {
  const [surface, setSurface] = useState('')
  const [pente, setPente] = useState(false)
  const [sansFil, setSansFil] = useState(false)

  const surfaceNum = parseInt(surface, 10)
  const hasInput = !isNaN(surfaceNum) && surfaceNum > 0

  const results = hasInput
    ? ROBOTS
        .filter((r) => r.surfaceMax >= surfaceNum)
        .filter((r) => !sansFil || r.sansFil)
        .filter((r) => !pente || parseInt(r.penteMax) >= 35)
        .sort((a, b) => a.prix - b.prix)
    : []

  const marge = Math.round(surfaceNum * 1.2)
  const avecMarge = results.filter((r) => r.surfaceMax >= marge).length
  const guide = guidePourSurface(hasInput ? surfaceNum : 0)

  return (
    <div className="stack-lg">
      <div className="card card-p stack-lg">
        <div className="field">
          <label htmlFor="surface-input">Surface de pelouse (m²)</label>
          <input
            id="surface-input"
            className="input num"
            type="number"
            inputMode="numeric"
            min="50"
            max="10000"
            step="50"
            placeholder="Par exemple 800"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
          />
        </div>
        <label className="check tool-check">
          <input type="checkbox" checked={pente} onChange={(e) => setPente(e.target.checked)} />
          <span>Terrain en pente</span>
        </label>
        <label className="check tool-check">
          <input type="checkbox" checked={sansFil} onChange={(e) => setSansFil(e.target.checked)} />
          <span>Sans fil uniquement</span>
        </label>
      </div>

      <div className="dark-card stack-lg" aria-live="polite">
        {!hasInput ? (
          <p className="verdict">Entrez votre surface ci-dessus pour voir les robots adaptés.</p>
        ) : results.length === 0 ? (
          <p className="verdict">Aucun robot ne correspond à ces critères. Essayez de décocher les filtres.</p>
        ) : (
          <>
            <ul className="bars">
              <li>
                <div className="row">
                  <span>Votre pelouse</span>
                  <b className="num hl">{m2Fr(surfaceNum)}</b>
                </div>
                <div className="bar">
                  <i style={{ width: `${(surfaceNum / marge) * 100}%` }} />
                </div>
              </li>
              <li>
                <div className="row">
                  <span>Avec 20 % de marge</span>
                  <b className="num">{m2Fr(marge)}</b>
                </div>
                <div className="bar">
                  <i className="alt" style={{ width: '100%' }} />
                </div>
                <p>
                  {avecMarge} robot{avecMarge > 1 ? 's' : ''} sur {results.length} gardent cette marge.
                </p>
              </li>
            </ul>
            <p className="verdict">
              {results.length} robot{results.length > 1 ? 's' : ''} adapté{results.length > 1 ? 's' : ''} pour {m2Fr(surfaceNum)}. Le
              moins cher : <b>{results[0].marque} {results[0].nom}</b>, à {results[0].prix.toLocaleString('fr-FR')} €.
            </p>
          </>
        )}
      </div>

      <Link className="btn btn--full" href={guide.href}>
        {guide.label}
      </Link>

      {!hasInput ? (
        <p className="small muted">
          Vous ne connaissez pas votre surface ? Mesurez-la sur la carte avec notre{' '}
          <Link className="lnk" href="/superficie">
            calculateur de surface
          </Link>{' '}
          ou consultez votre plan cadastral.
        </p>
      ) : null}

      {results.length > 0 ? (
        <section className="stack-lg">
          <h2 className="h-lg">Les robots adaptés, du moins cher au plus cher</h2>
          <ul className="robots">
            {results.map((r) => (
              <RobotCard key={`${r.marque}-${r.nom}`} robot={r} />
            ))}
          </ul>
          <p className="dated">
            Prix indicatifs relevés en mars 2026, à vérifier chez le marchand. Liens partenaires. On recommande de prendre un robot
            avec au moins 20 % de marge sur votre surface réelle.
          </p>
        </section>
      ) : null}
    </div>
  )
}
