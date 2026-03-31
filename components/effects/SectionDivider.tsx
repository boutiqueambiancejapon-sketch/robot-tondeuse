/**
 * SectionDivider — séparateur éditorial.
 * Variant 'rule'   : filet + label en petites caps, ancré à gauche.
 * Variant 'number' : numéro watermark oversize.
 * Variant 'wave'   : ondulation organique SVG (DA "Terrain & Nature").
 * Server Component.
 */

type SectionDividerProps = {
  variant?: 'rule' | 'number' | 'wave'
  label?: string
  number?: string
  fill?: string
  className?: string
}

export function SectionDivider({
  variant = 'rule',
  label,
  number,
  fill = 'var(--bg-surface)',
  className,
}: SectionDividerProps) {
  if (variant === 'number') {
    return (
      <div
        className={className}
        style={{ position: 'relative', pointerEvents: 'none', userSelect: 'none' }}
        aria-hidden="true"
      >
        <span className="section-watermark">{number ?? '01'}</span>
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{ lineHeight: 0, overflow: 'hidden' }}
      >
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 'clamp(30px, 4vw, 60px)' }}
        >
          <path
            d="M0 30 C360 5, 720 55, 1080 25 S1440 35, 1440 30 L1440 60 L0 60 Z"
            fill={fill}
          />
        </svg>
      </div>
    )
  }

  // variant === 'rule' (défaut)
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-6) 0',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
      <div
        aria-hidden="true"
        style={{
          flex: 1,
          height: '1px',
          background: 'var(--border)',
        }}
      />
    </div>
  )
}
