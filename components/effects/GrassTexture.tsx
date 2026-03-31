/**
 * GrassTexture — texture d'herbe subtile via CSS repeating-linear-gradient.
 * Fines lignes verticales vertes qui évoquent des brins d'herbe.
 * Remplace NoiseOverlay (signature "10min").
 * Server Component — zéro JS.
 */

type GrassTextureProps = {
  opacity?: number
  className?: string
}

export function GrassTexture({
  opacity = 0.03,
  className,
}: GrassTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        opacity,
        mixBlendMode: 'overlay',
        background: `
          repeating-linear-gradient(
            85deg,
            var(--accent-1) 0px,
            transparent 1px,
            transparent 8px
          ),
          repeating-linear-gradient(
            95deg,
            var(--accent-3) 0px,
            transparent 1px,
            transparent 12px
          ),
          repeating-linear-gradient(
            88deg,
            var(--accent-5) 0px,
            transparent 0.5px,
            transparent 16px
          )
        `,
      }}
    />
  )
}
