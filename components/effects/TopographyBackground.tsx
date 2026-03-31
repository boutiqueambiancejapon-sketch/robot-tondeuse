/**
 * TopographyBackground — lignes de relief topographiques animées.
 * Évoque le terrain, le jardin, le relief d'une pelouse.
 * SVG inline avec courbes organiques + animation subtile de respiration.
 * Remplace AuroraBackground (signature "10min").
 * Server Component — CSS @keyframes uniquement.
 */

type TopographyBackgroundProps = {
  className?: string
  children?: React.ReactNode
  intensity?: 'subtle' | 'medium' | 'strong'
}

export function TopographyBackground({
  className,
  children,
  intensity = 'medium',
}: TopographyBackgroundProps) {
  const opacityMap = { subtle: 0.04, medium: 0.07, strong: 0.12 }
  const baseOpacity = opacityMap[intensity]

  return (
    <div
      className={className}
      style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden' }}
    >
      {/* Topographic contour lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Layer 1 — large contours */}
        <g
          style={{
            opacity: baseOpacity,
            animation: 'topo-drift-1 25s ease-in-out infinite',
          }}
        >
          <path
            d="M-100 600 C200 520, 400 580, 600 500 S900 420, 1100 480 S1300 540, 1540 460"
            stroke="var(--accent-1)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M-100 540 C180 460, 380 530, 580 440 S880 370, 1080 420 S1280 480, 1540 400"
            stroke="var(--accent-1)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M-100 480 C220 410, 420 470, 620 390 S860 320, 1060 370 S1260 430, 1540 350"
            stroke="var(--accent-1)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 2 — medium contours */}
        <g
          style={{
            opacity: baseOpacity * 0.7,
            animation: 'topo-drift-2 30s ease-in-out infinite',
          }}
        >
          <path
            d="M-100 350 C300 280, 500 340, 700 270 S1000 210, 1200 260 S1400 320, 1540 250"
            stroke="var(--accent-3)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M-100 290 C280 230, 480 280, 680 220 S980 160, 1180 210 S1380 260, 1540 200"
            stroke="var(--accent-3)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M-100 230 C250 180, 460 220, 660 170 S960 120, 1160 160 S1360 210, 1540 150"
            stroke="var(--accent-3)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 3 — fine detail contours */}
        <g
          style={{
            opacity: baseOpacity * 0.5,
            animation: 'topo-drift-3 35s ease-in-out infinite',
          }}
        >
          <path
            d="M-100 700 C150 640, 350 690, 550 630 S850 570, 1050 620 S1250 670, 1540 610"
            stroke="var(--accent-5)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <path
            d="M-100 160 C300 110, 500 150, 700 100 S1000 60, 1200 90 S1400 140, 1540 80"
            stroke="var(--accent-5)"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </g>

        {/* Elevation markers — small circles at contour intersections */}
        <g style={{ opacity: baseOpacity * 0.6 }}>
          <circle cx="400" cy="470" r="3" fill="var(--accent-1)" />
          <circle cx="900" cy="320" r="2.5" fill="var(--accent-3)" />
          <circle cx="1200" cy="260" r="2" fill="var(--accent-5)" />
          <circle cx="600" cy="630" r="2" fill="var(--accent-1)" />
          <circle cx="200" cy="230" r="2.5" fill="var(--accent-3)" />
        </g>
      </svg>

      {/* Radial ambient glow — soft green from bottom, evokes ground */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '10%',
          width: '80%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, var(--accent-1)12 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'topo-glow 20s ease-in-out infinite',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
