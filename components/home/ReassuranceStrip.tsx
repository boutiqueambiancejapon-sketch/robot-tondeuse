/**
 * ReassuranceStrip — 4 points de confiance éditoriaux.
 * Fond paper · sous PressBand.
 * Server Component.
 */

const ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 L19 6 V11 C19 16 16 19 12 21 C8 19 5 16 5 11 V6 Z" />
        <path d="M9 12 L11 14 L15 9.5" />
      </svg>
    ),
    title: 'Prix comparés',
    sub: 'Mis à jour chaque semaine',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12 L11 14 L15 9.5" />
      </svg>
    ),
    title: '100% indépendant',
    sub: 'Aucun financement des marques',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18 H21" />
        <path d="M7 18 V12 M7 12 C5.5 12 5 10 5.5 9 M7 12 C8.5 12 9 10 8.5 9" />
        <path d="M12 18 V11 M12 11 C10.5 11 10 9 10.5 8 M12 11 C13.5 11 14 9 13.5 8" />
        <path d="M17 18 V12 M17 12 C15.5 12 15 10 15.5 9 M17 12 C18.5 12 19 10 18.5 9" />
      </svg>
    ),
    title: 'Testé sur le terrain',
    sub: '6 semaines minimum par robot',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11 A8 8 0 1 0 19 15" />
        <path d="M20 5 V11 H14" />
      </svg>
    ),
    title: 'MAJ quotidienne',
    sub: 'Prix trackés en temps réel',
  },
]

export function ReassuranceStrip() {
  return (
    <section
      aria-label="Nos engagements"
      style={{
        background: 'var(--paper)',
        padding: '0 0 0',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--line-soft)',
        }}
      >
        {ITEMS.map((item) => (
          <div
            key={item.title}
            style={{
              background: 'var(--ivory)',
              padding: '22px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 42,
                height: 42,
                borderRadius: 11,
                background: 'var(--sage-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--moss)',
              }}
            >
              {item.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--forest-deep)',
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginTop: 3,
                  lineHeight: 1.4,
                }}
              >
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive : 2 cols sur mobile */}
      <style>{`
        @media (max-width: 700px) {
          .reassurance-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .reassurance-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
