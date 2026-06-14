/**
 * HomeQuizTeaser — bloc signature Atelier Vert.
 * 2 colonnes : pitch quiz (gauche) + preview quiz simulé (droite).
 * Server Component — visuel pur.
 */

import Link from 'next/link'

const PREVIEW_OPTIONS = [
  { label: 'Plat comme une crêpe', sub: '< 10 % inclinaison', selected: false },
  { label: 'Quelques bosses', sub: '10-25 %', selected: true },
  { label: 'Vrai relief', sub: '> 25 %', selected: false },
]

const TESTER_DOTS = ['var(--copper)', 'var(--sage)', 'var(--moss)', 'var(--copper-bright)']

export function HomeQuizTeaser() {
  return (
    <section
      style={{
        padding: 'clamp(40px, 5vw, 72px) 0',
        background: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(28px, 4vw, 80px)' }}>
        <div
          className="quiz-teaser-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 64px)',
            background: 'var(--forest-deep)',
            color: 'var(--ivory)',
            borderRadius: 28,
            padding: 'clamp(32px, 5vw, 64px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle grain overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 28,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 70% 0%, rgba(194,90,50,0.12) 0%, transparent 60%)',
            }}
          />

          {/* ── Left — pitch ── */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--copper-bright)',
                marginBottom: 16,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--copper-bright)',
                }}
              />
              Outil signature
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 46px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                color: 'var(--ivory)',
                marginBottom: 20,
              }}
            >
              Le quiz qui<br />
              <em style={{ color: 'var(--copper-bright)', fontStyle: 'italic' }}>ne se trompe jamais</em>.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--sage-light)',
                maxWidth: 440,
                lineHeight: 1.65,
                marginBottom: 32,
              }}
            >
              7 questions sur votre jardin, votre budget, vos contraintes. Notre algorithme croise
              les modèles testés et vous sort <em>le</em> robot fait pour vous. C&rsquo;est tout.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                marginBottom: 32,
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/quiz"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  background: 'var(--copper)',
                  color: 'var(--ivory)',
                  borderRadius: 100,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Lancer le quiz →
              </Link>
              <span
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: 12,
                  color: 'var(--sage)',
                  letterSpacing: '0.04em',
                }}
              >
                2 min · gratuit · sans email
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div style={{ display: 'flex' }}>
                {TESTER_DOTS.map((bg, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: bg,
                      marginLeft: i > 0 ? -10 : 0,
                      border: '2px solid var(--forest-deep)',
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: 12,
                  color: 'var(--sage)',
                  letterSpacing: '0.04em',
                }}
              >
                +1 200 tests réalisés ce mois-ci
              </span>
            </div>
          </div>

          {/* ── Right — preview quiz ── */}
          <Link
            href="/quiz"
            aria-label="Lancer le quiz"
            className="quiz-teaser-preview"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 20,
              padding: 'clamp(20px, 3vw, 32px)',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 380,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 200ms ease, transform 200ms ease',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: 11,
                    color: 'var(--sage)',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  QUESTION 3 / 7
                </span>
                <span
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: 11,
                    color: 'var(--copper-bright)',
                    fontWeight: 700,
                  }}
                >
                  43%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  overflow: 'hidden',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: '43%',
                    height: '100%',
                    background: 'var(--copper)',
                    borderRadius: 100,
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: 20,
                  color: 'var(--ivory)',
                }}
              >
                Votre jardin a-t-il des pentes&nbsp;?
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PREVIEW_OPTIONS.map((opt) => (
                <div
                  key={opt.label}
                  style={{
                    padding: '13px 16px',
                    background: opt.selected ? 'var(--copper)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${opt.selected ? 'var(--copper)' : 'rgba(255,255,255,0.10)'}`,
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background 150ms ease',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ivory)' }}>
                      {opt.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--next-font-mono), monospace',
                        fontSize: 11,
                        color: opt.selected ? 'rgba(255,255,255,0.8)' : 'var(--sage)',
                        marginTop: 2,
                      }}
                    >
                      {opt.sub}
                    </div>
                  </div>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: `2px solid ${opt.selected ? 'var(--ivory)' : 'rgba(255,255,255,0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {opt.selected && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--ivory)',
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <span
              className="quiz-teaser-preview-hint"
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 14,
                right: 18,
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                color: 'var(--copper-bright)',
                letterSpacing: '0.08em',
                opacity: 0.85,
              }}
            >
              Cliquer pour lancer →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
