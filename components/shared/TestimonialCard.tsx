import type { Testimonial } from '@/lib/testimonials'

type Props = {
  testimonial: Testimonial
  /** Fond sombre (forest-deep) ou clair */
  dark?: boolean
}

function Stars({ rating, dark }: { rating: number; dark: boolean }) {
  return (
    <div
      style={{ display: 'flex', gap: 3 }}
      aria-label={`Note : ${rating} sur 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? 'var(--copper-bright)' : 'none'}
          stroke={i < rating ? 'var(--copper-bright)' : dark ? 'rgba(255,255,255,0.25)' : 'var(--line)'}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M7 1l1.56 3.16L12 4.76l-2.5 2.44.59 3.44L7 9l-3.09 1.64L4.5 7.2 2 4.76l3.44-.6L7 1z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial: t, dark = true }: Props) {
  const cardBg = dark
    ? 'rgba(255,255,255,0.05)'
    : 'var(--ivory)'
  const cardBorder = dark
    ? '1px solid rgba(255,255,255,0.09)'
    : '1px solid var(--line-soft)'
  const textColor = dark ? 'var(--sage-light)' : 'var(--ink-soft)'
  const nameColor = dark ? 'var(--ivory)' : 'var(--ink)'
  const metaColor = dark ? 'rgba(168,194,164,0.65)' : 'var(--muted)'
  const robotColor = dark ? 'var(--copper-pale)' : 'var(--copper)'

  return (
    <article
      style={{
        background: cardBg,
        border: cardBorder,
        borderRadius: 16,
        padding: '22px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transition: 'transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="testimonial-card"
    >
      {/* Stars + source */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stars rating={t.rating} dark={dark} />
        <span
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: metaColor,
          }}
        >
          {t.source} · {t.date}
        </span>
      </div>

      {/* Quote */}
      <blockquote
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: textColor,
          fontStyle: 'normal',
          flex: 1,
          margin: 0,
        }}
      >
        "{t.text}"
      </blockquote>

      {/* Robot chip */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: robotColor,
          background: dark ? 'rgba(194,90,50,0.12)' : 'var(--copper-pale)',
          padding: '4px 10px',
          borderRadius: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          alignSelf: 'flex-start',
        }}
      >
        <span aria-hidden="true">🤖</span>
        {t.robot}
      </div>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Avatar */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: dark ? 'var(--moss)' : 'var(--sage-pale)',
            color: dark ? 'var(--ivory)' : 'var(--moss)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
            letterSpacing: 0.5,
          }}
          aria-hidden="true"
        >
          {t.initials}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: nameColor }}>
              {t.name}
            </span>
            {t.verified && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: dark ? '#7fd47f' : 'var(--moss)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                }}
                title="Achat vérifié"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4.5" fill={dark ? '#7fd47f' : 'var(--moss)'} />
                  <path d="M3 5l1.5 1.5L7 3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Vérifié
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: metaColor, marginTop: 1 }}>
            {t.location} · {t.surface}
          </div>
        </div>
      </div>
    </article>
  )
}
