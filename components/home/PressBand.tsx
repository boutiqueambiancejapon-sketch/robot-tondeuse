/**
 * PressBand — bandeau "Vu dans" logos presse sur fond forest-deep.
 * Directement sous le hero, avant la Reassurance.
 * Server Component.
 */

const PRESS = [
  'Le Parisien',
  'Que Choisir',
  '60 Millions',
  'Capital',
  'Le Monde',
  'Figaro Jardinage',
]

export function PressBand() {
  return (
    <section
      aria-label="Presse et médias"
      style={{
        background: 'var(--forest-deep)',
        padding: '28px 0 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(20px, 4vw, 56px)',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--sage)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Vu dans
        </span>

        {PRESS.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: 'var(--next-font-display), Helvetica, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(14px, 1.6vw, 19px)',
              color: 'var(--sage-light)',
              opacity: 0.7,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
