'use client'

/**
 * HomeRobotMower — dashboard "MON_JARDIN.LIVE" Atelier Vert.
 * Garden SVG avec patterns uncut/cut, obstacles, base de charge, robot avec
 * pulse ring + stats live (TONDU/TEMPS/BATT./BRUIT).
 * Match exact de content/page-home.jsx HeroVisual.
 */

import { useEffect, useState } from 'react'

// Path du robot dans le jardin (chemin de tonte realiste)
const PATH_POINTS: [number, number][] = []
for (let r = 0; r < 8; r++) {
  const y = 60 + r * 28
  if (r % 2 === 0) {
    for (let c = 0; c < 14; c++) PATH_POINTS.push([50 + c * 24, y])
  } else {
    for (let c = 13; c >= 0; c--) PATH_POINTS.push([50 + c * 24, y])
  }
}

export function HomeRobotMower() {
  const [progress, setProgress] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reduced) {
      setProgress(65)
      return
    }
    let raf = 0
    const tick = () => {
      setProgress((p) => (p + 0.18) % 100)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const total = PATH_POINTS.length
  const idx = Math.floor((progress / 100) * total)
  const robotPos = PATH_POINTS[Math.min(idx, total - 1)]
  const cutPath = PATH_POINTS.slice(0, idx + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`)
    .join(' ')

  const stats = {
    tondu: Math.round(progress),
    temps: Math.round(progress * 0.9),
    batt: Math.max(20, 100 - Math.round(progress * 0.6)),
  }

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        padding: 20,
      }}
    >
      {/* Header window dots + label */}
      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, alignItems: 'center', zIndex: 5 }}>
        <div style={{ display: 'flex', gap: 4 }} aria-hidden="true">
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        </div>
        <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, color: 'var(--sage)', letterSpacing: '0.15em' }}>
          MON_JARDIN.LIVE — 247 m²
        </span>
      </div>

      {/* "EN MARCHE" indicator */}
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 6, zIndex: 5 }}>
        <span aria-hidden="true" className="hero-pulse-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#7fd47f' }} />
        <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, color: '#7fd47f', letterSpacing: '0.1em' }}>
          EN MARCHE
        </span>
      </div>

      {/* Garden SVG */}
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
        <defs>
          <pattern id="lawn-uncut" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#3a5a3d" />
            <path d="M1 6 L1 3 M3 6 L3 2 M5 6 L5 4" stroke="#5a8a5d" strokeWidth="0.5" />
          </pattern>
          <pattern id="lawn-cut" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#5a8a5d" />
          </pattern>
        </defs>

        {/* Garden plot — forme irrégulière */}
        <path
          d="M 30 50 L 380 60 L 390 290 Q 380 310, 350 310 L 60 305 Q 35 305, 30 280 Z"
          fill="url(#lawn-uncut)"
          stroke="#d97742"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.95"
        />

        {/* Cut path */}
        {cutPath && (
          <path
            d={cutPath}
            stroke="url(#lawn-cut)"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        )}

        {/* Arbre */}
        <circle cx="180" cy="170" r="22" fill="#3a5a3d" opacity="0.5" />
        <circle cx="180" cy="170" r="18" fill="#6b4a2a" opacity="0.7" />
        <text x="180" y="208" textAnchor="middle" fontSize="9" fill="#c4d3c0" fontFamily="var(--next-font-mono), monospace">
          arbre
        </text>

        {/* Terrasse */}
        <rect x="280" y="210" width="60" height="40" rx="4" fill="#8a7a6a" opacity="0.6" />
        <text x="310" y="235" textAnchor="middle" fontSize="9" fill="#f5efe1" fontFamily="var(--next-font-mono), monospace">
          terrasse
        </text>

        {/* Base de charge */}
        <g transform="translate(50, 70)">
          <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#b8623d" />
          <rect x="-5" y="-5" width="10" height="10" rx="1" fill="#d97742" />
          <text x="0" y="22" textAnchor="middle" fontSize="9" fill="#c4d3c0" fontFamily="var(--next-font-mono), monospace">
            ⚡ base
          </text>
        </g>

        {/* Robot avec pulse ring SVG natif */}
        {robotPos && (
          <g transform={`translate(${robotPos[0]}, ${robotPos[1]})`}>
            <circle r="20" fill="none" stroke="#d97742" strokeWidth="1" opacity="0.5">
              {!reduced && (
                <>
                  <animate attributeName="r" from="12" to="28" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </>
              )}
            </circle>
            <circle r="11" fill="#1a2e1f" />
            <circle r="9" fill="#b8623d" />
            <circle r="3" fill="#fbf8f0" />
          </g>
        )}
      </svg>

      {/* Live stats footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
        }}
      >
        {[
          { l: 'TONDU', v: `${stats.tondu}%` },
          { l: 'TEMPS', v: `${stats.temps}m` },
          { l: 'BATT.', v: `${stats.batt}%` },
          { l: 'BRUIT', v: '54 dB' },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              flex: 1,
              padding: '8px 10px',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 9,
                color: 'var(--sage)',
                letterSpacing: '0.12em',
              }}
            >
              {s.l}
            </div>
            <div
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--copper-bright)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
