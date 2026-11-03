/**
 * lib/og/site.tsx — direction artistique « Atelier Vert » appliquée aux images de partage :
 * papier crème, encre vert forêt, cuivre pour l'étiquette, Schibsted Grotesk + Hanken Grotesk.
 */
import { niche } from '@/niche.config'
import type { OgFontDef } from './assets'
import type { OgTheme } from './ShareCard'

export const OG_FONTS: OgFontDef[] = [
  { name: 'Schibsted Grotesk', file: 'schibsted-grotesk-latin-900-normal.woff', weight: 900 },
  { name: 'Schibsted Grotesk', file: 'schibsted-grotesk-latin-800-normal.woff', weight: 800 },
  { name: 'Hanken Grotesk', file: 'hanken-grotesk-latin-500-normal.woff', weight: 500 },
  { name: 'Hanken Grotesk', file: 'hanken-grotesk-latin-700-normal.woff', weight: 700 },
]

const C = {
  forestDeep: '#14241a',
  forest: '#1d3526',
  moss: '#3c6b45',
  sageLight: '#d6e2cf',
  sagePale: '#e6efe1',
  paper: '#f6f1e7',
  ivory: '#fffdf7',
  copper: '#c25a32',
  inkSoft: '#3d4a3f',
} as const

export const OG_THEME: OgTheme = {
  bg: C.paper,
  ink: C.forestDeep,
  inkSoft: C.inkSoft,
  pillBg: C.copper,
  pillInk: C.ivory,
  hookBg: C.sagePale,
  hookInk: C.forestDeep,
  hookBorder: C.forestDeep,
  photoBg: C.forest,
  display: 'Schibsted Grotesk',
  displayWeight: 900,
  body: 'Hanken Grotesk',
  charRatio: 1.15,
}

function RobotMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke={C.forestDeep} strokeWidth="2" fill="none" />
      <rect x="11" y="14" width="18" height="13" rx="3" fill={C.forestDeep} />
      <circle cx="15" cy="27" r="2.5" fill={C.copper} />
      <circle cx="25" cy="27" r="2.5" fill={C.copper} />
      <circle cx="20" cy="18" r="1.5" fill={C.sageLight} />
      <path d="M14 10 L14 14 M20 8 L20 14 M26 10 L26 14" stroke={C.copper} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function OgLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <RobotMark size={50} />
      <span style={{ fontFamily: 'Schibsted Grotesk', fontWeight: 800, fontSize: 34, color: C.forestDeep, letterSpacing: -0.5 }}>
        {niche.siteName}
      </span>
    </div>
  )
}

/** Panneau de remplacement quand l'article n'a pas de couverture : pelouse rayée + robot. */
export function OgFallback() {
  const stripes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: C.forest, position: 'relative' }}>
      {stripes.map((i) => (
        <div key={i} style={{ display: 'flex', width: '100%', height: 50, background: i % 2 === 0 ? C.moss : C.forest }} />
      ))}
      <div style={{ display: 'flex', position: 'absolute', top: 155, left: 115, width: 240, height: 240, borderRadius: 240, background: C.paper, alignItems: 'center', justifyContent: 'center' }}>
        <RobotMark size={180} />
      </div>
    </div>
  )
}
