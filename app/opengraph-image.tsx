import { ImageResponse } from 'next/og'
import { niche } from '@/niche.config'

export const runtime = 'edge'
export const alt = `${niche.siteName} — ${niche.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const year = new Date().getFullYear()
  const domain = niche.domain.toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F6F1E5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #5A7A5A, #A85C3B, #3D5038)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 18,
            color: '#A85C3B',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 28,
            fontWeight: 700,
          }}
        >
          {domain} · {year}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#1F2419',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {niche.tagline}
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 24, color: '#4F5B45', fontWeight: 400 }}>
          Comparateur · Quiz · Simulateur · {niche.dealWord.charAt(0).toUpperCase() + niche.dealWord.slice(1)}
        </div>

        {/* Watermark number */}
        <div
          style={{
            position: 'absolute',
            right: '60px',
            bottom: '40px',
            fontSize: '280px',
            fontWeight: 700,
            color: '#5A7A5A',
            opacity: 0.08,
            lineHeight: 1,
          }}
        >
          10
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
