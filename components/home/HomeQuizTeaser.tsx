/**
 * HomeQuizTeaser — bloc forest-deep signature Atelier Vert.
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
    <section style={{ padding: 'var(--space-24) 0', background: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--space-6)' }}>
        <div
          className="quiz-teaser-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-12)',
            background: 'var(--forest-deep)',
            color: 'var(--ivory)',
            borderRadius: 32,
            padding: 'var(--space-16)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Pitch quiz */}
          <div>
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--copper-bright)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--copper-bright)' }} />
              Outil signature
            </p>
            <h2
              style={{
                fontFamily: 'var(--next-font-display), Georgia, serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                color: 'var(--ivory)',
                margin: '0 0 var(--space-6)',
              }}
            >
              Le quiz qui<br />
              <em style={{ color: 'var(--copper-bright)', fontStyle: 'italic' }}>ne se trompe jamais</em>.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--sage-light)', maxWidth: 460, lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
              7 questions sur votre jardin, votre budget, vos contraintes. Notre algorithme croise les modèles testés et vous sort <em>le</em> robot fait pour vous. C&rsquo;est tout.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
              <Link
                href="/quiz"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 24px',
                  background: 'var(--copper)',
                  color: 'var(--ivory)',
                  borderRadius: 100,
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                  boxShadow: '0 2px 0 0 #8c4a2c, 0 6px 16px rgba(184, 98, 61, 0.4)',
                }}
              >
                Lancer le quiz →
              </Link>
              <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 12, color: 'var(--sage)' }}>
                2 min · 100% gratuit · sans email
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
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
              <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 12, color: 'var(--sage)', letterSpacing: '0.05em' }}>
                +1 200 tests réalisés ce mois-ci
              </div>
            </div>
          </div>

          {/* Preview quiz simulé — entièrement cliquable vers /quiz */}
          <Link
            href="/quiz"
            aria-label="Lancer le quiz"
            className="quiz-teaser-preview"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 20,
              padding: 'var(--space-8)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 420,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 200ms ease, transform 200ms ease',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--sage)', letterSpacing: '0.12em' }}>
                  QUESTION 3 / 7
                </span>
                <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--copper-bright)' }}>
                  43%
                </span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden', marginBottom: 'var(--space-8)' }}>
                <div style={{ width: '43%', height: '100%', background: 'var(--copper)', borderRadius: 100 }} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--next-font-display), Georgia, serif',
                  fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  marginBottom: 'var(--space-6)',
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
                    padding: '14px 16px',
                    background: opt.selected ? 'var(--copper)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${opt.selected ? 'var(--copper)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</div>
                    <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: opt.selected ? 'rgba(255,255,255,0.85)' : 'var(--sage)', marginTop: 2 }}>
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
                    }}
                  >
                    {opt.selected && (
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--ivory)' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Overlay hint au survol : "Cliquer pour lancer →" */}
            <span
              className="quiz-teaser-preview-hint"
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 'var(--space-3)',
                right: 'var(--space-4)',
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
