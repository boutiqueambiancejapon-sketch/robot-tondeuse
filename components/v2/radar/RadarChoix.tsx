'use client'
/**
 * RadarChoix — seule partie en JavaScript du radar : ajouter ou retirer un robot (3 au plus, recherche par nom)
 * et lire ?vs=<id>,<id>. Sans JavaScript (Google, IA), c'est le radar rendu par le serveur (children) qui reste.
 */
import { useEffect, useState, type ReactNode } from 'react'
import { lireVs, type SerieRadar } from '@/lib/radar'
import { Radar } from './Radar'

type Props = { principal: SerieRadar; defaut: string[]; toutes: SerieRadar[]; total: number; children: ReactNode }

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function RadarChoix({ principal, defaut, toutes, total, children }: Props) {
  const [monte, setMonte] = useState(false)
  const [ids, setIds] = useState<string[] | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    const vs = lireVs(new URLSearchParams(window.location.search).get('vs'), toutes.map((s) => s.id), principal.id)
    // L'adresse n'existe que dans le navigateur : lecture après le premier rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonte(true)
    if (vs.length) setIds(vs)
  }, [toutes, principal.id])

  const actifs = ids ?? defaut
  const changer = (suivants: string[]) => {
    setIds(suivants)
    const url = new URL(window.location.href)
    url.searchParams.set('vs', suivants.join(','))
    if (!suivants.length) url.searchParams.delete('vs')
    window.history.replaceState(null, '', url)
  }
  const resultats = q.trim()
    ? toutes.filter((s) => s.id !== principal.id && !actifs.includes(s.id) && norm(s.nom).includes(norm(q.trim()))).slice(0, 6)
    : []
  const plein = actifs.length >= 3

  return (
    <>
      {!monte ? (
        children
      ) : (
        <Radar
          series={[principal, ...actifs.map((id) => toutes.find((s) => s.id === id)!)]}
          total={total}
          retirer={(id) => changer(actifs.filter((x) => x !== id))}
        />
      )}
      <div className="radar__ajout field">
        <label htmlFor="radar-q">
          <b>Comparer avec un autre robot</b> <span className="hint">({plein ? '3 au plus, retirez-en un' : `${actifs.length} sur 3`})</span>
        </label>
        <input
          id="radar-q"
          type="search"
          value={q}
          disabled={plein}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nom du robot, par exemple Automower"
          autoComplete="off"
        />
        {resultats.length ? (
          <ul className="radar__res">
            {resultats.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="chip"
                  onClick={() => {
                    changer([...actifs, s.id])
                    setQ('')
                  }}
                >
                  {s.nom}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
}
