'use client'

/**
 * StickyCTA — pill flottant bas de page.
 * Deux actions : voir les meilleurs prix (copper) + faire le quiz (transparent).
 * Apparaît après 600px de scroll · disparaît quand on remonte.
 * CSS classes de globals.css : sticky-cta-pill, sticky-cta-buy, sticky-cta-quiz, etc.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="sticky-cta-wrap"
      style={{
        position: 'fixed',
        bottom: visible ? 24 : -160,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 55,
        transition: 'bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '95vw',
      }}
      aria-hidden={!visible}
    >
      <div className="sticky-cta-pill">
        {/* Bouton principal — meilleurs prix */}
        <Link href="/comparatifs" className="sticky-cta-buy">
          <div className="sticky-cta-text">
            <span className="sticky-cta-title">Voir les meilleurs prix</span>
            <span className="sticky-cta-sub">6 marques comparées en direct</span>
          </div>
          <span className="sticky-cta-arrow" aria-hidden="true">→</span>
        </Link>

        {/* Séparateur */}
        <div
          aria-hidden="true"
          style={{
            width: 1,
            background: 'rgba(255,255,255,0.10)',
            margin: '6px 0',
          }}
        />

        {/* Bouton secondaire — quiz */}
        <Link href="/quiz" className="sticky-cta-quiz">
          <span className="sticky-cta-dot" aria-hidden="true">
            <span className="sticky-cta-dot-pulse" />
            <span className="sticky-cta-dot-core" />
          </span>
          <div className="sticky-cta-text">
            <span className="sticky-cta-title">Pas sûr ? Faites le quiz</span>
            <span className="sticky-cta-sub">2 min · gratuit</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
