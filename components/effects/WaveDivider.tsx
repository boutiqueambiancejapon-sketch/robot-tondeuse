/**
 * WaveDivider — séparateur organique ondulé.
 * SVG wave qui évoque un terrain vallonné.
 * Remplace le diagonal clip-path (signature "10min").
 * Server Component.
 */

type WaveDividerProps = {
  /** Background color of the section BELOW the wave */
  fill?: string
  /** Flip vertically for bottom-of-section usage */
  flip?: boolean
  className?: string
}

export function WaveDivider({
  fill = 'var(--bg-surface)',
  flip = false,
  className,
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        lineHeight: 0,
        overflow: 'hidden',
        transform: flip ? 'rotate(180deg)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: 'clamp(40px, 5vw, 80px)',
        }}
      >
        <path
          d="M0 40 C240 10, 480 65, 720 35 S1200 55, 1440 25 L1440 80 L0 80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
