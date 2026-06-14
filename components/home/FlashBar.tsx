'use client'

/**
 * FlashBar — barre d'urgence rouge en haut de la home.
 * Countdown live H:MM:SS · lien vers hub comparatifs.
 * Client Component (countdown nécessite useEffect).
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'

// Cible fixe : 6h14m39s au premier rendu, puis compte à rebours réel
const INITIAL_SECONDS = 6 * 3600 + 14 * 60 + 39

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function Countdown() {
  const [secs, setSecs] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60

  return (
    <span
      style={{
        fontFamily: 'var(--next-font-mono), monospace',
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 800,
        letterSpacing: '0.04em',
      }}
      aria-live="off"
      aria-label={`${pad(h)} heures ${pad(m)} minutes ${pad(s)} secondes`}
    >
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  )
}

export function FlashBar() {
  return (
    <div
      role="banner"
      aria-label="Offres flash du moment"
      style={{
        background: 'var(--deal)',
        color: '#fff',
        position: 'relative',
        zIndex: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '9px clamp(16px, 4vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        {/* Message promo */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 700,
            fontSize: 13.5,
            whiteSpace: 'nowrap',
          }}
        >
          <span aria-hidden="true">🔥</span>
          Offres de printemps — jusqu'à{' '}
          <strong style={{ fontWeight: 900 }}>−35%</strong>
        </span>

        {/* Séparateur */}
        <span aria-hidden="true" style={{ opacity: 0.35, fontSize: 13 }}>·</span>

        {/* Countdown */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ opacity: 0.85 }}>Se termine dans</span>
          <Countdown />
        </span>

        {/* CTA */}
        <Link
          href="/comparatifs"
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: '#fff',
            borderBottom: '1.5px solid rgba(255,255,255,0.55)',
            paddingBottom: 1,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            transition: 'opacity 150ms ease',
          }}
        >
          Voir les deals →
        </Link>
      </div>
    </div>
  )
}
