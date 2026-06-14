'use client'

/**
 * HomeRobotMower v2 — dashboard "MON JARDIN LIVE" Atelier Vert.
 *
 * Visuels :
 *  - Texture herbe non-tondue : pattern texte "the the the"
 *  - Bandes de tonte alternées par rangée (stripe A / stripe B)
 *  - Robot avec glow, phare directionnel et pulse ring
 *  - Stat cards copper-bright : Tondu / Temps / Batterie / Bruit
 *
 * Client Component — requestAnimationFrame, prefers-reduced-motion géré.
 */

import { useEffect, useRef, useState } from 'react'

// ── Paramètres jardin ─────────────────────────────────────────────────────
const ROWS = 8
const COLS = 14

// Coordonnées jardin dans le viewBox 400 × 292
const GX = 24   // left
const GY = 24   // top
const GW = 352  // width
const GH = 226  // height
const ROW_H = GH / ROWS
const COL_W = GW / COLS

// Chemin serpentin : [x, y] par cellule
const PATH: [number, number][] = []
for (let r = 0; r < ROWS; r++) {
  const y = GY + ROW_H * r + ROW_H / 2
  if (r % 2 === 0) {
    for (let c = 0; c < COLS; c++) PATH.push([GX + COL_W * c + COL_W / 2, y])
  } else {
    for (let c = COLS - 1; c >= 0; c--) PATH.push([GX + COL_W * c + COL_W / 2, y])
  }
}
const TOTAL = PATH.length

// ── Couleurs bandes ───────────────────────────────────────────────────────
const STRIPE_A = '#537a5a'   // rangée paire  tondue
const STRIPE_B = '#456650'   // rangée impaire tondue

// ── Composant ─────────────────────────────────────────────────────────────
export function HomeRobotMower() {
  const [idx, setIdx] = useState(0)
  const [reduced, setReduced] = useState(false)
  const rafRef  = useRef<number>(0)
  const lastRef = useRef<number>(0)
  const STEP_MS = 52 // ms entre 2 positions (≈ 19 fps d'avance)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      setIdx(Math.floor(TOTAL * 0.53))
      return
    }
    const tick = (now: number) => {
      if (now - lastRef.current >= STEP_MS) {
        lastRef.current = now
        setIdx((i) => (i + 1) % TOTAL)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    const handler = () => {
      if (mq.matches) { setReduced(true); cancelAnimationFrame(rafRef.current) }
    }
    mq.addEventListener('change', handler)
    return () => { cancelAnimationFrame(rafRef.current); mq.removeEventListener('change', handler) }
  }, [])

  // ── Dérivations état ──────────────────────────────────────────────────
  const robotPos   = PATH[idx]
  const currentRow = Math.floor(idx / COLS)
  const colInRow   = idx % COLS
  const goingRight = currentRow % 2 === 0

  const progress = Math.round((idx / TOTAL) * 100)
  const temps    = Math.round(progress * 0.9)
  const batt     = Math.max(20, 100 - Math.round(progress * 0.6))

  // Portion tondue dans la rangée en cours
  const partialW = (colInRow + 1) * COL_W
  const partialX = goingRight ? GX : GX + GW - partialW

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        background: 'rgba(14, 28, 18, 0.75)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        padding: '16px 16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span
            aria-hidden="true"
            style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#7fd47f', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--sage-light)', letterSpacing: '0.05em' }}>
            Mon jardin · 247 m²
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            aria-hidden="true"
            className="hero-pulse-dot"
            style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#7fd47f', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 600, color: '#7fd47f', letterSpacing: '0.10em' }}>
            EN MARCHE
          </span>
        </div>
      </div>

      {/* ── SVG Jardin ──────────────────────────────────────────────── */}
      <div style={{ borderRadius: 12, overflow: 'hidden' }}>
        <svg
          viewBox="0 0 400 292"
          style={{ width: '100%', display: 'block' }}
          aria-label={`Jardin en cours de tonte — ${progress}% tondu`}
          role="img"
        >
          <defs>
            {/* Herbe non-tondue : texte "the" répété */}
            <pattern id="rmt-grass" x="0" y="0" width="60" height="13" patternUnits="userSpaceOnUse">
              <rect width="60" height="13" fill="#2c4a32" />
              <text x="0" y="10" fill="#4a6e50" fontSize="8" fontFamily="'Courier New', Courier, monospace" fontWeight="300" opacity="0.65">
                the the the
              </text>
            </pattern>
            {/* Bandes tondues */}
            <pattern id="rmt-cut-a" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill={STRIPE_A} />
            </pattern>
            <pattern id="rmt-cut-b" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill={STRIPE_B} />
            </pattern>
          </defs>

          {/* Fond global */}
          <rect width="400" height="292" fill="#1a2e1f" />

          {/* Zone jardin — herbe non-tondue */}
          <rect x={GX} y={GY} width={GW} height={GH} fill="url(#rmt-grass)" rx="4" />

          {/* Rangées entièrement tondues */}
          {Array.from({ length: currentRow }, (_, r) => (
            <rect
              key={r}
              x={GX}
              y={GY + r * ROW_H}
              width={GW}
              height={ROW_H}
              fill={r % 2 === 0 ? 'url(#rmt-cut-a)' : 'url(#rmt-cut-b)'}
            />
          ))}

          {/* Rangée en cours — portion déjà tondue */}
          {currentRow < ROWS && (
            <rect
              x={partialX}
              y={GY + currentRow * ROW_H}
              width={partialW}
              height={ROW_H}
              fill={currentRow % 2 === 0 ? 'url(#rmt-cut-a)' : 'url(#rmt-cut-b)'}
            />
          )}

          {/* Bordure jardin (tirets copper) */}
          <rect x={GX} y={GY} width={GW} height={GH} fill="none" stroke="#c25a32" strokeWidth="1.5" strokeDasharray="4 4" rx="4" />

          {/* ── Base de charge ───────────────────────────────────────── */}
          <g transform={`translate(${GX + 10}, ${GY + 10})`}>
            <rect x="-8" y="-7" width="16" height="14" rx="3" fill="#c25a32" />
            <rect x="-5" y="-4" width="10" height="8" rx="1.5" fill="#df6f3e" />
            <text x="0" y="18" textAnchor="middle" fontSize="8" fill="#c4d3c0" fontFamily="'Courier New', Courier, monospace">base</text>
          </g>

          {/* ── Arbre ────────────────────────────────────────────────── */}
          <g>
            <ellipse cx="170" cy="162" rx="22" ry="14" fill="rgba(0,0,0,0.32)" />
            <circle cx="168" cy="155" r="18" fill="#1c3020" />
            <circle cx="168" cy="152" r="14" fill="#2e5234" opacity="0.9" />
            <circle cx="164" cy="148" r="9"  fill="#3a6240" opacity="0.7" />
            <text x="170" y="188" textAnchor="middle" fontSize="8" fill="#c4d3c0" fontFamily="'Courier New', Courier, monospace">arbre</text>
          </g>

          {/* ── Terrasse ─────────────────────────────────────────────── */}
          <g>
            <rect x="284" y="190" width="68" height="50" rx="3" fill="#9a8a78" opacity="0.75" />
            {[204, 218, 232].map((y) => (
              <line key={y} x1="284" y1={y} x2="352" y2={y} stroke="rgba(0,0,0,0.16)" strokeWidth="0.7" />
            ))}
            {[307, 330].map((x) => (
              <line key={x} x1={x} y1="190" x2={x} y2="240" stroke="rgba(0,0,0,0.16)" strokeWidth="0.7" />
            ))}
            <text x="318" y="252" textAnchor="middle" fontSize="8" fill="#c4d3c0" fontFamily="'Courier New', Courier, monospace">terrasse</text>
          </g>

          {/* ── Robot ────────────────────────────────────────────────── */}
          {robotPos && ((): React.ReactNode => {
            const [rx, ry] = robotPos
            const lx = goingRight ? rx + 26 : rx - 26

            return (
              <g key="robot">
                {/* Glow sol */}
                <circle cx={rx} cy={ry} r="20" fill="rgba(0,0,0,0.28)" />
                {/* Cône phare */}
                <polygon
                  points={[
                    `${rx},${ry - 5}`,
                    `${lx},${ry - 13}`,
                    `${lx},${ry + 13}`,
                    `${rx},${ry + 5}`,
                  ].join(' ')}
                  fill="rgba(255,255,255,0.12)"
                />
                {/* Point lumineux */}
                <circle cx={goingRight ? rx + 20 : rx - 20} cy={ry} r="2.5" fill="rgba(255,255,255,0.75)" />
                {/* Corps */}
                <circle cx={rx} cy={ry} r="11" fill="#0e1c12" />
                <circle cx={rx} cy={ry} r="9"  fill="#c25a32" />
                <circle cx={rx} cy={ry} r="3.5" fill="#fbf8f0" />
                {/* Pulse ring */}
                {!reduced && (
                  <circle cx={rx} cy={ry} r="11" fill="none" stroke="#df6f3e" strokeWidth="1" opacity="0.5">
                    <animate attributeName="r"       from="11" to="26" dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0"  dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            )
          })()}
        </svg>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7 }}>
        {([
          { label: 'Tondu',    value: `${progress}%`, bar: progress },
          { label: 'Temps',    value: `${temps} min`  },
          { label: 'Batterie', value: `${batt}%`      },
          { label: 'Bruit',    value: '54 dB'         },
        ] as { label: string; value: string; bar?: number }[]).map((s) => (
          <div
            key={s.label}
            style={{
              padding: '9px 11px',
              background: 'rgba(0,0,0,0.44)',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 9, color: 'var(--sage)',
                letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 3,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 20, fontWeight: 700,
                color: 'var(--copper-bright)',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            {s.bar !== undefined && (
              <div style={{ marginTop: 6, height: 3, background: 'rgba(255,255,255,0.10)', borderRadius: 100 }}>
                <div
                  style={{
                    height: '100%', width: `${s.bar}%`,
                    background: 'var(--copper)', borderRadius: 100,
                    transition: 'width 0.08s linear',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
