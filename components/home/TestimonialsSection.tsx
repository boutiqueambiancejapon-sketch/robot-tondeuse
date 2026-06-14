import { TESTIMONIALS, TESTIMONIALS_STATS } from '@/lib/testimonials'
import { TestimonialCard } from '@/components/shared/TestimonialCard'

function StarsFull({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  return (
    <div
      style={{ display: 'flex', gap: 4, alignItems: 'center' }}
      aria-label={`Note moyenne : ${rating} sur 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full
        const half = !filled && i === full && hasHalf
        return (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill={filled ? 'var(--copper-bright)' : 'none'}
            stroke={filled || half ? 'var(--copper-bright)' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M7 1l1.56 3.16L12 4.76l-2.5 2.44.59 3.44L7 9l-3.09 1.64L4.5 7.2 2 4.76l3.44-.6L7 1z" />
          </svg>
        )
      })}
    </div>
  )
}

export function TestimonialsSection() {
  const { averageRating, totalReviews, recommendRate } = TESTIMONIALS_STATS

  return (
    <section
      style={{
        background: 'var(--forest-deep)',
        padding: 'clamp(56px, 7vw, 104px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Avis de nos lecteurs"
    >
      {/* Watermark décoratif */}
      <span
        className="section-watermark"
        style={{
          position: 'absolute',
          bottom: -40,
          right: -20,
          pointerEvents: 'none',
          color: 'var(--moss)',
        }}
        aria-hidden="true"
      >
        Avis
      </span>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(28px, 4vw, 80px)',
          position: 'relative',
          zIndex: 1,
        }}
      >

        {/* ── Header ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
            marginBottom: 48,
          }}
        >
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
              06 — Ce que vous dites
            </p>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 44px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                color: 'var(--ivory)',
              }}
            >
              Ils ont trouvé <em>leur robot</em>
            </h2>
            <p
              style={{
                color: 'var(--sage-light)',
                marginTop: 12,
                fontSize: 15,
                maxWidth: 460,
                lineHeight: 1.6,
              }}
            >
              Plus de {totalReviews.toLocaleString('fr-FR')} lecteurs ont utilisé nos comparatifs
              pour choisir leur robot tondeuse.
            </p>
          </div>

          {/* Stats pill */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 20,
              padding: '20px 28px',
              flexShrink: 0,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <StarsFull rating={averageRating} />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: 'var(--ivory)',
                  letterSpacing: '-0.02em',
                  marginTop: 6,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {averageRating.toFixed(1)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--sage)', marginTop: 2 }}>
                / 5 · {totalReviews.toLocaleString('fr-FR')} avis
              </div>
            </div>
            <div
              style={{
                width: 1,
                background: 'rgba(255,255,255,0.08)',
                alignSelf: 'stretch',
              }}
              aria-hidden="true"
            />
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: 'var(--copper-bright)',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {recommendRate}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--sage)', marginTop: 2, lineHeight: 1.4 }}>
                recommandent<br />nos conseils
              </div>
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} dark />
          ))}
        </div>

        {/* ── Footer badges ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginTop: 40,
          }}
        >
          {[
            { icon: '🔍', label: 'Testé en conditions réelles' },
            { icon: '📊', label: 'Données mesurées sur le terrain' },
            { icon: '🤝', label: '100% indépendant, sans sponsor' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100,
                padding: '8px 16px',
                fontSize: 13,
                color: 'var(--sage-light)',
                fontWeight: 500,
              }}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
