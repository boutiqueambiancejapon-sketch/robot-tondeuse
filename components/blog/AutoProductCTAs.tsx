'use client'

/**
 * AutoProductCTAs — place un encart produit après le 2e et le 4e H2 du corps de l'article (.prose).
 * Les conteneurs sont créés dans le DOM après montage, puis remplis par un portail.
 * 'use client' isolé.
 */

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ArticleCTA } from '@/lib/article-ctas'
import { ProductPick } from './ProductPick'

type Props = {
  ctas: ArticleCTA[]
}

/** Positions des h2 après lesquels injecter (0-indexed) : après le 2e et le 4e */
const INSERT_AFTER_H2 = [1, 3]

export function AutoProductCTAs({ ctas }: Props) {
  const [targets, setTargets] = useState<HTMLElement[]>([])

  useEffect(() => {
    const prose = document.querySelector('.v2 .prose')
    if (!prose) return

    const h2s = prose.querySelectorAll(':scope > h2')
    const containers: HTMLElement[] = []

    INSERT_AFTER_H2.forEach((idx) => {
      if (idx >= h2s.length) return
      const anchor = h2s[idx + 1] ?? null

      const existingId = `auto-cta-${idx}`
      if (document.getElementById(existingId)) return

      const wrapper = document.createElement('div')
      wrapper.id = existingId
      if (anchor) {
        prose.insertBefore(wrapper, anchor)
      } else {
        prose.appendChild(wrapper)
      }
      containers.push(wrapper)
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect -- conteneurs créés dans le DOM après montage, une seule fois
    setTargets(containers)
  }, [])

  if (targets.length === 0 || ctas.length === 0) return null

  return (
    <>
      {targets.map((el, i) => {
        const cta = ctas[i % ctas.length]
        return createPortal(
          <ProductPick key={i} name={cta.name} price={cta.price} url={cta.url} badge={cta.badge} hook={cta.hook} />,
          el
        )
      })}
    </>
  )
}
