'use client'
/**
 * ActionsProduit — favori (gardé dans ce navigateur), alerte de prix et comparer, en boutons discrets sous le prix.
 * L'alerte n'apparaît que si une vraie inscription existe (alerteHref) ; « Comparer » mène au radar de la page.
 */
import { useEffect, useState } from 'react'
import { Bell, Heart, Scale } from 'lucide-react'

const CLE = 'qrt-favoris'

function lire(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(CLE) ?? '[]')
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

type Props = { id: string; comparerHref?: string; alerteHref?: string }

export function ActionsProduit({ id, comparerHref, alerteHref }: Props) {
  const [favori, setFavori] = useState(false)
  useEffect(() => {
    // localStorage n'existe que dans le navigateur : lecture après le premier rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavori(lire().includes(id))
  }, [id])
  const basculer = () => {
    const liste = lire().filter((x) => x !== id)
    if (!favori) liste.push(id)
    localStorage.setItem(CLE, JSON.stringify(liste))
    setFavori(!favori)
  }
  return (
    <div className="g-actions">
      <button type="button" className="g-ghost" aria-pressed={favori} onClick={basculer}>
        <Heart size={17} aria-hidden="true" fill={favori ? 'currentColor' : 'none'} />
        {favori ? 'Dans vos favoris' : 'Favori'}
      </button>
      {alerteHref ? (
        <a className="g-ghost" href={alerteHref}>
          <Bell size={17} aria-hidden="true" />
          Alerte de prix
        </a>
      ) : null}
      {comparerHref ? (
        <a className="g-ghost" href={comparerHref}>
          <Scale size={17} aria-hidden="true" />
          Comparer
        </a>
      ) : null}
    </div>
  )
}
