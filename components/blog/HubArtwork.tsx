/**
 * HubArtwork — illustration SVG unique par hub/article (Atelier Vert).
 *
 * Stratégie : illustration thématique dérivée du slug. 4 compositions de base
 * (jardin / techno / outils / document) avec des variations seed-based pour
 * que chaque slug ait sa propre composition (couleur accent, nombre d'éléments,
 * disposition).
 *
 * Server Component — SVG inline, zéro JS.
 */

type Theme = 'garden' | 'tech' | 'tools' | 'doc' | 'budget' | 'reglement'

const SLUG_THEMES: Record<string, Theme> = {
  // Garden / size
  'robot-tondeuse-petit-jardin': 'garden',
  'robot-tondeuse-500m2': 'garden',
  'robot-tondeuse-1000m2': 'garden',
  'robot-tondeuse-2000m2': 'garden',
  'robot-tondeuse-grande-surface': 'garden',
  'robot-tondeuse-pente': 'garden',
  'robot-tondeuse-terrain-complexe': 'garden',
  'robot-tondeuse-multi-zones': 'garden',
  // Tech
  'robot-tondeuse-sans-fil-peripherique': 'tech',
  'robot-tondeuse-silencieux': 'tech',
  'robot-tondeuse-connecte': 'tech',
  'robot-tondeuse-rtk': 'tech',
  'robot-tondeuse-vision-ia': 'tech',
  // Budget / top
  'robot-tondeuse-pas-cher': 'budget',
  'robot-tondeuse-haut-de-gamme': 'budget',
  'robot-tondeuse-rapport-qualite-prix': 'budget',
  'meilleur-robot-tondeuse-2026': 'budget',
  // Guide
  'comment-choisir-robot-tondeuse': 'doc',
  'robot-tondeuse-vs-thermique': 'doc',
  'quel-robot-tondeuse-pour-mon-jardin': 'doc',
  // Tools / SAV
  'installation-robot-tondeuse': 'tools',
  'entretien-robot-tondeuse': 'tools',
  'hivernage-robot-tondeuse': 'tools',
  'depannage-robot-tondeuse': 'tools',
  // Réglementation
  'horaires-tonte-reglementation': 'reglement',
  'robot-tondeuse-bruit-voisinage': 'reglement',
  'robot-tondeuse-securite-enfants-animaux': 'reglement',
}

// Hash basique → seed déterministe par slug
function hashSlug(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0
  return Math.abs(h)
}

const ACCENT_PALETTE = [
  '#b8623d', // copper
  '#3a5a3d', // moss
  '#243b2a', // forest
  '#8ba88e', // sage
  '#d97742', // copper-bright
]

export type HubArtworkProps = {
  slug: string
  /** Surcouche : "card" pour featured cards, "hero" pour article header. */
  variant?: 'hero' | 'card'
  className?: string
}

export function HubArtwork({ slug, variant = 'card', className }: HubArtworkProps) {
  const theme: Theme = SLUG_THEMES[slug] ?? 'garden'
  const seed = hashSlug(slug)
  const accent = ACCENT_PALETTE[seed % ACCENT_PALETTE.length]
  const variantSeed = (seed >> 3) % 4

  // Aspect ratio : hero 16:6, card 16:9
  const w = 800
  const h = variant === 'hero' ? 300 : 450

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`grass-${slug}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#3a5a3d" />
          <path d="M3 14 L3 9 M7 14 L7 6 M11 14 L11 10" stroke="#5a8a5d" strokeWidth="0.8" />
        </pattern>
        <linearGradient id={`fade-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.0" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Background : pattern grass */}
      <rect width={w} height={h} fill={`url(#grass-${slug})`} />
      <rect width={w} height={h} fill={`url(#fade-${slug})`} />

      {/* Composition thématique */}
      {theme === 'garden' && <GardenComposition w={w} h={h} accent={accent} variant={variantSeed} />}
      {theme === 'tech' && <TechComposition w={w} h={h} accent={accent} variant={variantSeed} />}
      {theme === 'tools' && <ToolsComposition w={w} h={h} accent={accent} variant={variantSeed} />}
      {theme === 'doc' && <DocComposition w={w} h={h} accent={accent} variant={variantSeed} />}
      {theme === 'budget' && <BudgetComposition w={w} h={h} accent={accent} variant={variantSeed} />}
      {theme === 'reglement' && <ReglementComposition w={w} h={h} accent={accent} variant={variantSeed} />}
    </svg>
  )
}

// ─── Compositions ───────────────────────────────────────────────────────

type CompProps = { w: number; h: number; accent: string; variant: number }

function GardenComposition({ w, h, accent, variant }: CompProps) {
  const cx = w / 2
  const cy = h / 2
  // Plot rectangle avec bord copper dashes
  const plotW = w * 0.65
  const plotH = h * 0.65
  const trees = variant + 2 // 2 à 5 arbres
  return (
    <g>
      {/* Plot */}
      <rect x={cx - plotW / 2} y={cy - plotH / 2} width={plotW} height={plotH} rx="20" fill="#5a8a5d" opacity="0.5" stroke={accent} strokeWidth="2" strokeDasharray="6 4" />
      {/* Mowed stripes */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={cx - plotW / 2 + 18}
          y={cy - plotH / 2 + 24 + i * (plotH - 48) / 4}
          width={plotW - 36}
          height={(plotH - 48) / 4 - 6}
          rx="6"
          fill="#8ba88e"
          opacity="0.45"
        />
      ))}
      {/* Trees */}
      {Array.from({ length: trees }).map((_, i) => {
        const tx = cx - plotW / 2 + 60 + ((i * 137 + variant * 53) % (plotW - 120))
        const ty = cy - plotH / 2 + 60 + ((i * 89 + variant * 29) % (plotH - 120))
        return (
          <g key={i}>
            <circle cx={tx} cy={ty} r="22" fill="#243b2a" />
            <circle cx={tx} cy={ty} r="18" fill="#3a5a3d" />
          </g>
        )
      })}
      {/* Robot */}
      <g transform={`translate(${cx}, ${cy + plotH / 2 - 50})`}>
        <circle r="18" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.3" />
        <circle r="14" fill="#1a2e1f" />
        <circle r="10" fill={accent} />
        <circle r="3" fill="#fbf8f0" />
      </g>
    </g>
  )
}

function TechComposition({ w, h, accent, variant }: CompProps) {
  const cx = w / 2
  const cy = h / 2
  return (
    <g>
      {/* Waves emanating */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={50 + i * 35}
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity={0.35 - i * 0.05}
        />
      ))}
      {/* RTK satellites style — 3 small orbiting markers */}
      {[0, 120, 240].map((deg, i) => {
        const r = 130
        const rad = ((deg + variant * 30) * Math.PI) / 180
        const sx = cx + Math.cos(rad) * r
        const sy = cy + Math.sin(rad) * r * 0.6
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={accent} strokeWidth="0.8" opacity="0.4" strokeDasharray="2 3" />
            <circle cx={sx} cy={sy} r="6" fill={accent} />
            <circle cx={sx} cy={sy} r="3" fill="#fbf8f0" />
          </g>
        )
      })}
      {/* Robot center */}
      <g transform={`translate(${cx}, ${cy})`}>
        <rect x="-22" y="-18" width="44" height="36" rx="8" fill="#1a2e1f" />
        <rect x="-16" y="-22" width="32" height="8" rx="4" fill={accent} />
        <circle r="4" fill="#fbf8f0" opacity="0.9" />
      </g>
    </g>
  )
}

function ToolsComposition({ w, h, accent, variant }: CompProps) {
  const cx = w / 2
  const cy = h / 2
  return (
    <g>
      {/* Crossed wrenches */}
      <g transform={`translate(${cx}, ${cy}) rotate(${variant * 15 - 15})`}>
        <rect x="-90" y="-6" width="180" height="12" rx="6" fill={accent} opacity="0.85" transform="rotate(-30)" />
        <circle cx={-90 * Math.cos(-Math.PI / 6)} cy={-90 * Math.sin(-Math.PI / 6)} r="14" fill={accent} />
        <circle cx={-90 * Math.cos(-Math.PI / 6)} cy={-90 * Math.sin(-Math.PI / 6)} r="6" fill="#1a2e1f" />
        <rect x="-90" y="-6" width="180" height="12" rx="6" fill="#1a2e1f" opacity="0.7" transform="rotate(30)" />
        <circle cx={-90 * Math.cos(Math.PI / 6)} cy={90 * Math.sin(Math.PI / 6)} r="14" fill="#1a2e1f" />
        <circle cx={-90 * Math.cos(Math.PI / 6)} cy={90 * Math.sin(Math.PI / 6)} r="6" fill={accent} />
      </g>
      {/* Gear */}
      <g transform={`translate(${cx + 140}, ${cy - 80})`}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180
          return <rect key={i} x="-3" y="-30" width="6" height="10" fill={accent} transform={`rotate(${i * 45})`} />
        })}
        <circle r="22" fill={accent} />
        <circle r="10" fill="#1a2e1f" />
      </g>
    </g>
  )
}

function DocComposition({ w, h, accent, variant }: CompProps) {
  const cx = w / 2
  const cy = h / 2
  return (
    <g>
      {/* Open book / document */}
      <rect x={cx - 130} y={cy - 80} width="260" height="160" rx="8" fill="#fbf8f0" stroke={accent} strokeWidth="2" />
      <line x1={cx} y1={cy - 70} x2={cx} y2={cy + 70} stroke={accent} strokeWidth="1.5" opacity="0.5" />
      {/* Lines of text */}
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i}>
          <rect x={cx - 115} y={cy - 60 + i * 24} width={70 + (variant * 12 + i * 7) % 35} height="4" rx="2" fill="#3a5a3d" opacity="0.4" />
          <rect x={cx + 15} y={cy - 60 + i * 24} width={60 + (variant * 11 + i * 9) % 40} height="4" rx="2" fill="#3a5a3d" opacity="0.4" />
        </g>
      ))}
      {/* Bookmark copper */}
      <rect x={cx + 90} y={cy - 80} width="14" height="50" fill={accent} />
      <polygon points={`${cx + 90},${cy - 30} ${cx + 97},${cy - 38} ${cx + 104},${cy - 30}`} fill="#fbf8f0" />
    </g>
  )
}

function BudgetComposition({ w, h, accent, variant }: CompProps) {
  const cx = w / 2
  const cy = h / 2
  return (
    <g>
      {/* Trophy / ribbon for top */}
      <g transform={`translate(${cx}, ${cy})`}>
        {/* Ribbon */}
        <polygon points="-50,-90 50,-90 50,30 0,80 -50,30" fill={accent} />
        <circle r="42" fill="#fbf8f0" stroke={accent} strokeWidth="3" />
        <text textAnchor="middle" y="8" fontFamily="Georgia, serif" fontSize="42" fontWeight="400" fontStyle="italic" fill={accent}>
          {variant === 0 ? '€' : variant === 1 ? '★' : variant === 2 ? '#1' : '✓'}
        </text>
      </g>
      {/* Coin stack */}
      <g transform={`translate(${cx - 180}, ${cy + 40})`}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx="0" cy={-i * 8} rx="28" ry="8" fill={i === 3 ? accent : '#d97742'} stroke="#1a2e1f" strokeWidth="0.8" />
        ))}
      </g>
      <g transform={`translate(${cx + 180}, ${cy + 40})`}>
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx="0" cy={-i * 8} rx="28" ry="8" fill={i === 2 ? accent : '#d97742'} stroke="#1a2e1f" strokeWidth="0.8" />
        ))}
      </g>
    </g>
  )
}

function ReglementComposition({ w, h, accent, variant }: CompProps) {
  const cx = w / 2
  const cy = h / 2
  return (
    <g>
      {/* Clock */}
      <g transform={`translate(${cx - 100}, ${cy})`}>
        <circle r="60" fill="#fbf8f0" stroke={accent} strokeWidth="3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const r1 = 50
          const r2 = 56
          return (
            <line
              key={i}
              x1={Math.cos(a - Math.PI / 2) * r1}
              y1={Math.sin(a - Math.PI / 2) * r1}
              x2={Math.cos(a - Math.PI / 2) * r2}
              y2={Math.sin(a - Math.PI / 2) * r2}
              stroke={accent}
              strokeWidth="2"
            />
          )
        })}
        {/* Hands */}
        <line x1="0" y1="0" x2="0" y2="-32" stroke="#1a2e1f" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="0" x2={20 + variant * 4} y2="-10" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <circle r="4" fill="#1a2e1f" />
      </g>
      {/* Sound waves icon */}
      <g transform={`translate(${cx + 100}, ${cy})`}>
        <rect x="-30" y="-10" width="20" height="20" fill={accent} />
        <polygon points="-10,-22 12,-32 12,32 -10,22" fill={accent} />
        {[18, 30, 42].map((r, i) => (
          <path
            key={i}
            d={`M 16 0 A ${r} ${r} 0 0 1 ${16 + r * 0.4} ${r * 0.8} M 16 0 A ${r} ${r} 0 0 0 ${16 + r * 0.4} ${-r * 0.8}`}
            stroke={accent}
            strokeWidth="2"
            fill="none"
            opacity={0.6 - i * 0.15}
          />
        ))}
      </g>
    </g>
  )
}
