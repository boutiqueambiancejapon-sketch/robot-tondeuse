'use client'
/**
 * Facettes — filtres d'une collection avec le nombre de modèles de chacun (« 4G antivol 6 »).
 * Les cartes sont rendues par le serveur avec data-f ; le filtre ne fait que les masquer (hidden).
 * Sans JavaScript, toutes les cartes restent visibles.
 */
import { useEffect, useState } from 'react'
import type { FacetteComptee } from '@/lib/gabarits'

type Props = { facettes: FacetteComptee[]; total: number; cible: string }

export function Facettes({ facettes, total, cible }: Props) {
  const [actif, setActif] = useState<string | null>(null)
  useEffect(() => {
    const cartes = document.querySelectorAll<HTMLElement>(`#${cible} [data-f]`)
    cartes.forEach((c) => {
      c.hidden = actif !== null && !(c.dataset.f ?? '').split(' ').includes(actif)
    })
  }, [actif, cible])
  const bouton = (id: string | null, label: string, nombre: number) => (
    <button key={id ?? 'tous'} type="button" aria-pressed={actif === id} className={actif === id ? 'on' : undefined} onClick={() => setActif(id)}>
      {label} <em>{nombre}</em>
    </button>
  )
  return (
    <div className="g-facets" role="group" aria-label="Filtrer les modèles" aria-controls={cible}>
      {bouton(null, 'Tous', total)}
      {facettes.map((f) => bouton(f.id, f.label, f.nombre))}
    </div>
  )
}
