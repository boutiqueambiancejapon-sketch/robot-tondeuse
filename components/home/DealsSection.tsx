import Link from 'next/link'
import { DEALS, FLASH_SECONDS } from '@/lib/deals'
import { Countdown } from '@/components/shared/Countdown'

export function DealsSection() {
  return (
    <section
      style={{
        background: 'var(--cream)',
        padding: 'clamp(56px, 7vw, 104px) 0',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
      }}
      aria-label="Offres flash robot tondeuse"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(28px, 4vw, 80px)' }}>

        {/* ── Header ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 40,
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
                color: 'var(--deal)',
                marginBottom: 10,
              }}
            >
              ⚡ 03 — Ventes flash
            </p>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                color: 'var(--ink)',
              }}
            >
              Meilleures offres <em>du moment</em>
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: 10, fontSize: 14 }}>
              Prix vérifiés quotidiennement · liens affiliés
            </p>
          </div>

          {/* Countdown box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--deal-pale)',
              border: '1.5px solid rgba(210,59,46,0.18)',
              borderRadius: 16,
              padding: '14px 20px',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 22, lineHeight: 1 }}>🔥</span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--deal)',
                  marginBottom: 5,
                }}
              >
                Expire dans
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Countdown initialSeconds={FLASH_SECONDS} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="deals-grid">
          {DEALS.map((deal) => {
            const stockPct = Math.round((deal.stock / 12) * 100)
            const isUrgent = deal.stock <= 4
            return (
              <article
                key={deal.id}
                className="deal-card card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  borderColor: 'var(--line-soft)',
                }}
              >
                {/* Image zone */}
                <div
                  style={{
                    position: 'relative',
                    background: `color-mix(in srgb, ${deal.color} 10%, var(--ivory))`,
                    borderBottom: '1px solid var(--line-soft)',
                    height: 164,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Brand pill */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: deal.color,
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: 100,
                      lineHeight: 1.4,
                    }}
                  >
                    {deal.brand}
                  </span>

                  {/* Discount badge */}
                  <span
                    className="badge-deal lg"
                    style={{ position: 'absolute', top: 12, right: 12 }}
                    aria-label={`Réduction de ${deal.discount} pourcent`}
                  >
                    −{deal.discount}%
                  </span>

                  {/* Robot icon placeholder */}
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: '50%',
                      background: `color-mix(in srgb, ${deal.color} 16%, transparent)`,
                      border: `2px solid color-mix(in srgb, ${deal.color} 35%, transparent)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 34,
                    }}
                    aria-hidden="true"
                  >
                    🤖
                  </div>

                  {/* Flash label */}
                  <span
                    className="badge-flash"
                    style={{ position: 'absolute', bottom: 12, left: 12 }}
                  >
                    ⚡ {deal.label}
                  </span>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: '18px 18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    flex: 1,
                  }}
                >
                  {/* Name + hook */}
                  <div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: 'var(--ink)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        marginBottom: 5,
                      }}
                    >
                      {deal.model}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                      {deal.hook}
                    </p>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--muted)',
                        textDecoration: 'line-through',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {deal.oldPrice} €
                    </span>
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: 'var(--deal)',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                      }}
                    >
                      {deal.price} €
                    </span>
                  </div>

                  {/* Stock */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: isUrgent ? 'var(--deal)' : 'var(--ink-soft)',
                        }}
                      >
                        {isUrgent ? '⚠️ ' : ''}Plus que {deal.stock} en stock
                      </span>
                      <Link
                        href={`/tests/${deal.slug}`}
                        style={{
                          fontSize: 12,
                          color: 'var(--moss)',
                          fontWeight: 600,
                          textDecoration: 'underline',
                          textDecorationStyle: 'dotted',
                          textUnderlineOffset: 3,
                        }}
                      >
                        Voir le test →
                      </Link>
                    </div>
                    <div
                      className="stock-bar"
                      role="meter"
                      aria-valuenow={deal.stock}
                      aria-valuemin={0}
                      aria-valuemax={12}
                      aria-label={`${deal.stock} unités restantes sur 12`}
                    >
                      <span style={{ width: `${stockPct}%` }} />
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={deal.buyUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="btn btn-deal"
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '12px 20px',
                      borderRadius: 100,
                      fontSize: 14,
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                    aria-label={`Voir l'offre ${deal.brand} ${deal.model} sur Amazon`}
                  >
                    Voir l'offre Amazon →
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── Footer note ── */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--muted)',
            marginTop: 28,
            lineHeight: 1.5,
          }}
        >
          ✓ Liens affiliés — nous percevons une commission sans surcoût pour vous
          &nbsp;·&nbsp; Prix mis à jour quotidiennement
        </p>
      </div>
    </section>
  )
}
