/**
 * HomeMethodology — section "On teste pour de vrai" (Atelier Vert V2).
 * Layout 2 colonnes : pitch méthodologie + score wheel SVG.
 * Typographie Schibsted Grotesk 900 — Server Component.
 */

const STATS = [
  { n: '30+', l: 'modèles testés', icon: '🤖' },
  { n: '6 sem.', l: 'de test minimum', icon: '📅' },
  { n: '0 €', l: 'reçu des marques', icon: '🚫' },
  { n: '6', l: 'marques couvertes', icon: '📊' },
]

const RADAR_AXES = [
  { angle: 0,   label: 'Performance', value: 9.2 },
  { angle: 72,  label: 'Autonomie',   value: 8.8 },
  { angle: 144, label: 'Bruit',       value: 9.5 },
  { angle: 216, label: 'App',         value: 7.8 },
  { angle: 288, label: 'Prix',        value: 8.4 },
]

function polar(angle: number, value: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180
  const r = 90 + (value / 10) * 60
  return [200 + Math.cos(rad) * r, 200 + Math.sin(rad) * r]
}

function labelPos(angle: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180
  return [200 + Math.cos(rad) * 178, 200 + Math.sin(rad) * 178]
}

export function HomeMethodology() {
  const polygonPoints = RADAR_AXES.map((a) => polar(a.angle, a.value).join(',')).join(' ')

  return (
    <section
      style={{
        padding: 'clamp(56px, 7vw, 104px) 0',
        background: 'var(--forest-deep)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark décoratif */}
      <span
        className="section-watermark"
        style={{
          position: 'absolute',
          top: -20,
          left: -30,
          pointerEvents: 'none',
          color: 'var(--moss)',
          opacity: 0.07,
        }}
        aria-hidden="true"
      >
        Test
      </span>

      <div
        className="methodology-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(28px, 4vw, 80px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left — copy */}
        <div>
          <p
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginBottom: 12,
            }}
          >
            05 — Notre méthode
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.06,
              color: 'var(--ivory)',
              marginBottom: 20,
            }}
          >
            On teste pour de vrai.<br />
            <em style={{ color: 'var(--copper-bright)', fontStyle: 'italic' }}>Dans la boue.</em>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--sage-light)',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 480,
            }}
          >
            Pas de fiches techniques recyclées. Chaque robot passe 6 semaines minimum dans un vrai jardin (le nôtre, ou celui de notre réseau de testeurs). On note des dizaines de critères, on filme, on documente.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.l}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }} aria-hidden="true">{s.icon}</span>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: 'var(--copper-bright)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: 11,
                    color: 'var(--sage)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — radar chart */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            aspectRatio: '1 / 1',
            maxWidth: 460,
            margin: '0 auto',
            width: '100%',
          }}
        >
          <svg viewBox="0 0 400 400" style={{ width: '100%' }} aria-hidden="true">
            {/* Grid circles */}
            <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {/* Score polygon */}
            <polygon
              points={polygonPoints}
              fill="var(--copper)"
              fillOpacity="0.18"
              stroke="var(--copper-bright)"
              strokeWidth="2"
            />

            {RADAR_AXES.map((s) => {
              const [x, y] = polar(s.angle, s.value)
              const [lx, ly] = labelPos(s.angle)
              return (
                <g key={s.label}>
                  <line
                    x1="200" y1="200"
                    x2={x} y2={y}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />
                  <circle cx={x} cy={y} r="6" fill="var(--copper-bright)" />
                  <circle cx={x} cy={y} r="10" fill="var(--copper-bright)" fillOpacity="0.18" />
                  <text
                    x={lx} y={ly}
                    textAnchor="middle"
                    fontFamily="var(--next-font-mono), monospace"
                    fontSize="11"
                    fill="var(--sage-light)"
                    fontWeight="600"
                  >
                    {s.label}
                  </text>
                  <text
                    x={lx} y={ly + 15}
                    textAnchor="middle"
                    fontFamily="var(--next-font-mono), monospace"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--copper-bright)"
                  >
                    {s.value}/10
                  </text>
                </g>
              )
            })}

            {/* Center label */}
            <text
              x="200" y="196"
              textAnchor="middle"
              fontFamily="var(--next-font-mono), monospace"
              fontSize="10"
              fill="rgba(255,255,255,0.4)"
              letterSpacing="0.12em"
            >
              SCORE
            </text>
            <text
              x="200" y="212"
              textAnchor="middle"
              fontFamily="var(--next-font-display), sans-serif"
              fontSize="22"
              fontWeight="800"
              fill="var(--ivory)"
              letterSpacing="-0.02em"
            >
              8.7
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
