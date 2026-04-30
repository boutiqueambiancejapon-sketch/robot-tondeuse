/**
 * HomeMethodology — section "On teste pour de vrai" (Atelier Vert).
 * Layout 2 colonnes : pitch méthodologie + score wheel SVG.
 * Server Component — visuel pur.
 */

const STATS = [
  { n: '30+', l: 'modèles testés' },
  { n: '6 sem.', l: 'de test minimum' },
  { n: '0 €', l: 'reçu des marques' },
  { n: '6', l: 'marques couvertes' },
]

const RADAR_AXES = [
  { angle: 0, label: 'Performance', value: 9.2 },
  { angle: 72, label: 'Autonomie', value: 8.8 },
  { angle: 144, label: 'Bruit', value: 9.5 },
  { angle: 216, label: 'App', value: 7.8 },
  { angle: 288, label: 'Prix', value: 8.4 },
]

function polar(angle: number, value: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180
  const r = 90 + (value / 10) * 60
  return [200 + Math.cos(rad) * r, 200 + Math.sin(rad) * r]
}

function labelPos(angle: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180
  return [200 + Math.cos(rad) * 175, 200 + Math.sin(rad) * 175]
}

export function HomeMethodology() {
  const polygonPoints = RADAR_AXES.map((a) => polar(a.angle, a.value).join(',')).join(' ')

  return (
    <section style={{ padding: 'var(--space-24) 0', background: 'var(--paper)' }}>
      <div
        className="methodology-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 var(--space-6)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--moss)',
              marginBottom: 'var(--space-3)',
            }}
          >
            05 — Notre méthode
          </p>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), Georgia, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-7)',
            }}
          >
            On teste pour de vrai.<br />
            <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>Dans la boue.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
            Pas de fiches techniques recyclées. Chaque robot passe 6 semaines minimum dans un vrai jardin (le nôtre, ou celui de notre réseau de testeurs). On note des dizaines de critères, on filme, on documente.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
            {STATS.map((s) => (
              <div key={s.l} style={{ paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--line-soft)' }}>
                <div
                  style={{
                    fontFamily: 'var(--next-font-display), Georgia, serif',
                    fontSize: 40,
                    fontWeight: 400,
                    letterSpacing: '-0.025em',
                    color: 'var(--forest)',
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar chart */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', aspectRatio: '1 / 1', maxWidth: 460, margin: '0 auto', width: '100%' }}>
          <svg viewBox="0 0 400 400" style={{ width: '100%' }} aria-hidden="true">
            <circle cx="200" cy="200" r="150" fill="none" stroke="var(--line-soft)" strokeWidth="2" strokeDasharray="2 4" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="var(--line-soft)" strokeWidth="1" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="var(--line-soft)" strokeWidth="1" />
            <polygon points={polygonPoints} fill="var(--copper)" fillOpacity="0.15" stroke="var(--copper)" strokeWidth="1.5" />
            {RADAR_AXES.map((s) => {
              const [x, y] = polar(s.angle, s.value)
              const [lx, ly] = labelPos(s.angle)
              return (
                <g key={s.label}>
                  <line x1="200" y1="200" x2={x} y2={y} stroke="var(--copper)" strokeWidth="1" opacity="0.4" />
                  <circle cx={x} cy={y} r="5" fill="var(--copper)" />
                  <text x={lx} y={ly} textAnchor="middle" fontFamily="var(--next-font-mono), monospace" fontSize="11" fill="var(--moss)">
                    {s.label}
                  </text>
                  <text x={lx} y={ly + 14} textAnchor="middle" fontFamily="var(--next-font-mono), monospace" fontSize="10" fontWeight="600" fill="var(--copper)">
                    {s.value}/10
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
