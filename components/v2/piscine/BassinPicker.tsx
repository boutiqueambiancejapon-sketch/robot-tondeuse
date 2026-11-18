'use client'

import { useState, type ReactNode } from 'react'
import type { Bassin, BassinKey } from '@/lib/utils/piscine'

type Item = { key: string; bassins: BassinKey[]; node: ReactNode }
type Props = { bassins: Bassin[]; items: Item[] }

/**
 * Choix du type de bassin sur /robot-piscine. Sans choix, tous les articles sont affichés (et lisibles sans JavaScript).
 * Un article sans bassin précis (classement général, avis de marque) reste affiché pour tous les bassins.
 */
export function BassinPicker({ bassins, items }: Props) {
  const [choix, setChoix] = useState<BassinKey | null>(null)
  const actif = bassins.find((b) => b.key === choix)
  const visible = (item: Item) => !choix || item.bassins.length === 0 || item.bassins.includes(choix)
  const count = items.filter(visible).length

  return (
    <>
      <div className="grid2" role="group" aria-label="Type de piscine">
        {bassins.map((b) => (
          <button
            key={b.key}
            type="button"
            className={b.key === choix ? 'tile on' : 'tile'}
            aria-pressed={b.key === choix}
            onClick={() => setChoix(b.key === choix ? null : b.key)}
          >
            <b>{b.label}</b>
            <small>{b.small}</small>
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {actif ? (
          <p className="pool-conseil">
            <b>{actif.label}.</b> {actif.conseil}
          </p>
        ) : null}
      </div>

      <h2 className="h-lg pool-h">{actif ? actif.titre : 'Les articles de la rubrique'}</h2>
      {items.length > 0 ? (
        <ul className="posts">
          {items.map((item) => (
            <li key={item.key} hidden={!visible(item)}>
              {item.node}
            </li>
          ))}
        </ul>
      ) : null}
      {count === 0 ? (
        <p className="pool-vide">
          {items.length === 0
            ? 'La rubrique vient d’ouvrir : aucun article n’est encore publié. Les classements et les duels s’ajouteront ici à mesure qu’ils sont écrits.'
            : 'Aucun article pour ce type de bassin pour l’instant.'}
        </p>
      ) : null}
    </>
  )
}
