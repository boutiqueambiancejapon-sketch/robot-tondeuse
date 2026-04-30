'use client'

/**
 * HomeRobotMower — visuel animé du robot qui tond la pelouse en temps réel.
 * SVG 100% client-side, 60fps via requestAnimationFrame.
 * Inspiré du design Atelier Vert (content/page-home.jsx).
 */

import { useEffect, useState } from 'react'

const ROWS = 6
const COLS = 10
const ROBOT_SIZE = 22
const STEP_X = 28
const STEP_Y = 38
const OFFSET_X = 40
const OFFSET_Y = 40

const PATH_POINTS: [number, number][] = []
for (let r = 0; r < ROWS; r++) {
  const y = OFFSET_Y + r * STEP_Y
  if (r % 2 === 0) {
    for (let c = 0; c < COLS; c++) PATH_POINTS.push([OFFSET_X + c * STEP_X, y])
  } else {
    for (let c = COLS - 1; c >= 0; c--) PATH_POINTS.push([OFFSET_X + c * STEP_X, y])
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
      setProgress(60)
      return
    }
    let raf = 0
    const tick = () => {
      setProgress((p) => (p + 0.25) % 100)
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

  const W = OFFSET_X * 2 + (COLS - 1) * STEP_X
  const H = OFFSET_Y * 2 + (ROWS - 1) * STEP_Y

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 460,
        aspectRatio: `${W} / ${H}`,
        margin: '0 auto',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: 'block' }}>
        {/* Pelouse non tondue */}
        <rect x="0" y="0" width={W} height={H} rx="20" fill="#3a5a3d" />
        <pattern id="grass-pattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M3 14 L3 8 M7 14 L7 4 M11 14 L11 9" stroke="#5a8a5d" strokeWidth="1" strokeLinecap="round" />
        </pattern>
        <rect x="0" y="0" width={W} height={H} rx="20" fill="url(#grass-pattern)" opacity="0.7" />

        {/* Pelouse tondue (chemin parcouru) */}
        <path d={cutPath} stroke="#8ba88e" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <path d={cutPath} stroke="#c4d3c0" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

        {/* Robot */}
        {robotPos && (
          <g transform={`translate(${robotPos[0] - ROBOT_SIZE / 2}, ${robotPos[1] - ROBOT_SIZE / 2})`}>
            <rect x="0" y="0" width={ROBOT_SIZE} height={ROBOT_SIZE} rx="5" fill="#1a2e1f" />
            <rect x="3" y="2" width={ROBOT_SIZE - 6} height={6} rx="3" fill="#b8623d" />
            <circle cx="6" cy={ROBOT_SIZE - 3} r="2.5" fill="#b8623d" />
            <circle cx={ROBOT_SIZE - 6} cy={ROBOT_SIZE - 3} r="2.5" fill="#b8623d" />
            <circle cx={ROBOT_SIZE / 2} cy={ROBOT_SIZE / 2 + 1} r="1.5" fill="#fbf8f0" opacity="0.9" />
          </g>
        )}

        {/* Petits arbres décoratifs aux 4 coins */}
        {[
          [12, 12], [W - 12, 12], [12, H - 12], [W - 12, H - 12],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx - 8}, ${cy - 8})`}>
            <circle cx="8" cy="6" r="6" fill="#243b2a" />
            <rect x="7" y="10" width="2" height="4" fill="#3a2820" />
          </g>
        ))}
      </svg>
    </div>
  )
}
