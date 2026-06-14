/**
 * AuthorTeaser — encart éditorial asymétrique E-E-A-T.
 * Monogramme géant + bio + lien auteur.
 * Server Component.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'

export function AuthorTeaser() {
  if (!niche.author.name) return null

  const initial = niche.author.name.charAt(0).toUpperCase()

  return (
    <section
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--line-soft)',
        padding: 'clamp(48px, 6vw, 88px) 0',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(28px, 4vw, 80px)',
        }}
      >
        <div
          className="author-teaser-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 'clamp(28px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Monogramme */}
          <div
            aria-hidden="true"
            style={{
              width: 'clamp(100px, 14vw, 180px)',
              height: 'clamp(100px, 14vw, 180px)',
              borderRadius: '50%',
              border: '2px solid var(--line-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
              background: 'var(--ivory)',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--next-font-display), sans-serif',
                fontSize: '42%',
                fontWeight: 900,
                fontStyle: 'italic',
                color: 'var(--copper)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {initial}
            </span>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: `conic-gradient(var(--copper) 0deg, transparent 60deg, transparent 360deg)`,
                opacity: 0.5,
                mixBlendMode: 'multiply',
              }}
            />
          </div>

          {/* Texte */}
          <div>
            <p
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--moss)',
                marginBottom: 10,
              }}
            >
              L&rsquo;auteur
            </p>
            <h2
              style={{
                fontSize: 'clamp(22px, 2.5vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--ink)',
                marginBottom: 14,
              }}
            >
              {niche.author.name}
              <span
                style={{
                  fontWeight: 400,
                  color: 'var(--muted)',
                  fontSize: '0.75em',
                  marginLeft: 10,
                }}
              >
                — {niche.author.title}
              </span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--ink-soft)',
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 20,
              }}
            >
              {niche.author.bio}
            </p>
            {niche.author.slug && (
              <Link
                href={`/auteurs/${niche.author.slug}`}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--copper)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  borderBottom: '1.5px solid var(--copper-pale)',
                  paddingBottom: 2,
                }}
              >
                En savoir plus →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
