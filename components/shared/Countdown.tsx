'use client'

import { useEffect, useState } from 'react'

type Props = {
  /** Secondes de départ */
  initialSeconds: number
  /**
   * compact = true  → rendu inline H:MM:SS (pour FlashBar, header deals)
   * compact = false → 3 cellules .countdown-cell avec labels H / M / S
   */
  compact?: boolean
}

function formatTime(totalSecs: number) {
  const s = Math.max(0, totalSecs)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    h: pad(h),
    m: pad(m),
    s: pad(sec),
    inline: `${h}:${pad(m)}:${pad(sec)}`,
  }
}

export function Countdown({ initialSeconds, compact = false }: Props) {
  const [secs, setSecs] = useState(initialSeconds)

  useEffect(() => {
    const id = setInterval(() => setSecs(prev => Math.max(0, prev - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const t = formatTime(secs)

  if (compact) {
    return (
      <span
        aria-live="off"
        aria-label={`${t.h} heures ${t.m} minutes ${t.s} secondes`}
        style={{ fontVariantNumeric: 'tabular-nums', fontFeatureSettings: "'tnum' 1" }}
      >
        {t.inline}
      </span>
    )
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
      aria-live="off"
      aria-label={`${t.h} heures ${t.m} minutes ${t.s} secondes`}
    >
      <span className="countdown-cell" aria-hidden="true">{t.h}</span>
      <span style={{ color: 'var(--muted)', fontWeight: 800, fontSize: 16, lineHeight: 1 }} aria-hidden="true">:</span>
      <span className="countdown-cell" aria-hidden="true">{t.m}</span>
      <span style={{ color: 'var(--muted)', fontWeight: 800, fontSize: 16, lineHeight: 1 }} aria-hidden="true">:</span>
      <span className="countdown-cell" aria-hidden="true">{t.s}</span>
    </div>
  )
}
