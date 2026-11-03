/**
 * lib/og/ShareCard.tsx — gabarit commun des images de partage (1200×630), façon miniature :
 * étiquette de format, titre en gros sur 2 lignes, accroche chiffrée, marque, photo à droite.
 * Rendu par next/og : flexbox uniquement, styles en ligne, tout <div> à plusieurs enfants en display:flex.
 */
import type { ReactNode } from 'react'
import { ogFitTitle } from './text'

export const OG_SIZE = { width: 1200, height: 630 } as const
export const PHOTO = { width: 400, height: 550 } as const

export type OgTheme = {
  bg: string
  ink: string
  inkSoft: string
  pillBg: string
  pillInk: string
  hookBg: string
  hookInk: string
  hookBorder: string
  photoBg: string
  display: string
  displayWeight: 800 | 900
  body: string
  /** Coefficient de chasse de la police du titre (1 = grotesque grasse standard). */
  charRatio: number
}

/** `small` : une ligne par élément. */
export type OgHook = { big: string; small: string[] }

export type ShareCardProps = {
  theme: OgTheme
  pill: string
  title: string
  hook?: OgHook | null
  meta?: string | null
  photo: string | null
  fallback: ReactNode
  logo: ReactNode
}

const TEXT_WIDTH = 656

export function ShareCard({ theme: t, pill, title, hook, meta, photo, fallback, logo }: ShareCardProps) {
  const fit = ogFitTitle(title, TEXT_WIDTH, 84, 46, t.charRatio)
  return (
    <div style={{ display: 'flex', width: OG_SIZE.width, height: OG_SIZE.height, background: t.bg, padding: 40, gap: 36 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: TEXT_WIDTH + 28, padding: '14px 0 6px 24px' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ display: 'flex', background: t.pillBg, color: t.pillInk, fontFamily: t.body, fontWeight: 700, fontSize: 28, padding: '10px 24px', borderRadius: 999 }}>
            {pill}
          </span>
        </div>
        <div
          style={{
            display: 'block',
            lineClamp: 2,
            fontFamily: t.display,
            fontWeight: t.displayWeight,
            fontSize: fit.size,
            lineHeight: 1.04,
            letterSpacing: -1.5,
            color: t.ink,
            width: TEXT_WIDTH,
          }}
        >
          {fit.text}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, minHeight: 92 }}>
          {hook ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: t.hookBg, color: t.hookInk, border: `4px solid ${t.hookBorder}`, borderRadius: 18, padding: '8px 22px' }}>
              <span style={{ fontFamily: t.display, fontWeight: t.displayWeight, fontSize: 58, lineHeight: 1.1 }}>{hook.big}</span>
              <div style={{ display: 'flex', flexDirection: 'column', fontFamily: t.body, fontWeight: 700, fontSize: 25, lineHeight: 1.12 }}>
                {hook.small.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          ) : null}
          {meta ? <span style={{ display: 'flex', fontFamily: t.body, fontWeight: 700, fontSize: 26, color: t.inkSoft, maxWidth: hook ? 250 : 600, lineHeight: 1.15 }}>{meta}</span> : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>{logo}</div>
      </div>
      <div style={{ display: 'flex', width: PHOTO.width, height: PHOTO.height, borderRadius: 30, overflow: 'hidden', background: t.photoBg }}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- next/og : next/image indisponible
          <img src={photo} width={PHOTO.width} height={PHOTO.height} alt="" style={{ objectFit: 'cover' }} />
        ) : (
          fallback
        )}
      </div>
    </div>
  )
}
