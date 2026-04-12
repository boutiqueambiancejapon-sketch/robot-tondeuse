'use client'

/**
 * SpotlightCursor — radial highlight qui suit le curseur.
 * À placer en enfant d'un conteneur `position: relative`.
 * Inactif sur touch / reduced-motion (géré via CSS sans state).
 */

import { useEffect, useRef } from 'react'

export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (reduce || !hasHover) return

    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--spot-x', `${x}%`)
      el.style.setProperty('--spot-y', `${y}%`)
      el.style.opacity = '1'
    }

    parent.addEventListener('mousemove', onMove)
    return () => parent.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="spotlight"
      aria-hidden="true"
      style={{ opacity: 0, transition: 'opacity 400ms ease' }}
    />
  )
}
