'use client'

/**
 * ComparateurSelector — on touche deux ou trois modèles, le tableau et la phrase de verdict suivent.
 * 'use client' isolé — la page /comparer/[produit] reste Server Component.
 */

import { useState } from 'react'
import type { ModeleComparateur } from '@/lib/comparateur'
import { ComparateurTable } from './ComparateurTable'
import { euros, verdict } from './comparer-logic'

type Props = {
  modeles: ModeleComparateur[]
  specsLabels: Record<string, string>
}

const MAX = 3
const MIN = 2

export function ComparateurSelector({ modeles, specsLabels }: Props) {
  const [selected, setSelected] = useState<number[]>(() => modeles.slice(0, MAX).map((_, i) => i))

  function toggle(index: number) {
    setSelected((prev) => {
      if (prev.includes(index)) return prev.length <= MIN ? prev : prev.filter((i) => i !== index)
      // Au-delà de trois, le plus ancien choix laisse sa place.
      return [...(prev.length >= MAX ? prev.slice(1) : prev), index]
    })
  }

  const choisis = [...selected].sort((a, b) => a - b).map((i) => modeles[i])
  const v = verdict(choisis)

  return (
    <div className="stack-lg">
      <div className="chips chips--wrap" role="group" aria-label="Modèles à comparer">
        {modeles.map((m, i) => (
          <button
            key={m.nom}
            type="button"
            className={selected.includes(i) ? 'chip on' : 'chip'}
            aria-pressed={selected.includes(i)}
            onClick={() => toggle(i)}
          >
            {m.nom}
          </button>
        ))}
      </div>

      <ComparateurTable modeles={choisis} specsLabels={specsLabels} />

      {v ? (
        <div className="tldr" aria-live="polite">
          <p>
            <b>{v.moinsCher.nom}</b> est le moins cher des {choisis.length}, à {euros(v.moinsCher.prix)}.{' '}
            {v.memeSurface ? (
              'Tous annoncent la même surface.'
            ) : v.plusGrand === v.moinsCher ? (
              'Il couvre aussi la plus grande surface.'
            ) : (
              <>
                <b>{v.plusGrand.nom}</b> couvre la plus grande surface
                {v.ecart > 0 ? `, pour ${euros(v.ecart)} de plus.` : '.'}
              </>
            )}
          </p>
        </div>
      ) : null}
    </div>
  )
}
