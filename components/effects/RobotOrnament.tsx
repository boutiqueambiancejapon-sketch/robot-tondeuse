/**
 * RobotOrnament — SVG inline décoratif du robot tondeuse.
 * Pur vectoriel, zéro raster. Utilisé dans le hero comme visuel éditorial.
 * Server Component.
 */

type Props = {
  className?: string
  style?: React.CSSProperties
}

export function RobotOrnament({ className, style }: Props) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="robot-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-1)" />
          <stop offset="50%" stopColor="var(--accent-3)" />
          <stop offset="100%" stopColor="var(--accent-4)" />
        </linearGradient>
        <linearGradient id="robot-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-2)" />
          <stop offset="100%" stopColor="var(--accent-1)" />
        </linearGradient>
        <radialGradient id="robot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo */}
      <circle cx="200" cy="200" r="180" fill="url(#robot-glow)" />

      {/* Grass arcs below */}
      <g stroke="var(--accent-1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <path d="M40 310 Q 60 295 80 310" />
        <path d="M90 320 Q 110 305 130 320" />
        <path d="M140 312 Q 160 297 180 312" />
        <path d="M200 318 Q 220 303 240 318" />
        <path d="M250 312 Q 270 297 290 312" />
        <path d="M300 320 Q 320 305 340 320" />
      </g>

      {/* Shadow ellipse */}
      <ellipse cx="200" cy="300" rx="120" ry="8" fill="var(--accent-4)" opacity="0.15" />

      {/* Body — rounded square */}
      <g>
        <rect
          x="90"
          y="140"
          width="220"
          height="140"
          rx="40"
          fill="var(--bg-surface-2)"
          stroke="url(#robot-body)"
          strokeWidth="2"
        />
        {/* Top bevel */}
        <path
          d="M 130 140 Q 200 110 270 140"
          stroke="url(#robot-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Headlight bar */}
        <rect x="150" y="175" width="100" height="12" rx="6" fill="url(#robot-accent)" opacity="0.85" />
        {/* Eye dots */}
        <circle cx="165" cy="181" r="3" fill="var(--bg-primary)" />
        <circle cx="200" cy="181" r="3" fill="var(--bg-primary)" />
        <circle cx="235" cy="181" r="3" fill="var(--bg-primary)" />
        {/* Sensor scan line */}
        <line x1="155" y1="205" x2="245" y2="205" stroke="var(--accent-1)" strokeWidth="1" opacity="0.5" />
        <line x1="165" y1="220" x2="235" y2="220" stroke="var(--accent-2)" strokeWidth="1" opacity="0.4" />
        {/* Logo mark */}
        <circle cx="200" cy="245" r="8" stroke="var(--accent-1)" strokeWidth="1.5" fill="none" />
        <circle cx="200" cy="245" r="3" fill="var(--accent-1)" />
      </g>

      {/* Wheels */}
      <g fill="var(--bg-primary)" stroke="url(#robot-body)" strokeWidth="2">
        <circle cx="120" cy="285" r="22" />
        <circle cx="280" cy="285" r="22" />
      </g>
      <g fill="var(--accent-4)" opacity="0.3">
        <circle cx="120" cy="285" r="10" />
        <circle cx="280" cy="285" r="10" />
      </g>

      {/* Scan arcs above robot */}
      <g fill="none" stroke="var(--accent-1)" strokeLinecap="round" opacity="0.6">
        <path d="M 110 125 Q 200 85 290 125" strokeWidth="1.5" strokeDasharray="2 4" />
        <path d="M 130 100 Q 200 65 270 100" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
      </g>

      {/* Corner tick marks */}
      <g stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <path d="M30 80 L50 80 M30 80 L30 100" />
        <path d="M370 80 L350 80 M370 80 L370 100" />
        <path d="M30 340 L50 340 M30 340 L30 320" />
        <path d="M370 340 L350 340 M370 340 L370 320" />
      </g>
    </svg>
  )
}
