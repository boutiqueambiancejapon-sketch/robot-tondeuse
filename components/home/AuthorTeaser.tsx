/**
 * AuthorTeaser — encart éditorial DA pro.
 * Monogramme géant avec ring animé, huge number, type éditoriale.
 * Server Component.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'
import { FadeIn } from '@/components/motion/FadeIn'

export function AuthorTeaser() {
  if (!niche.author.name) return null

  const initial = niche.author.name.charAt(0).toUpperCase()

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(var(--space-16), 10vw, var(--space-24)) var(--space-6)',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: 'clamp(12rem, 30vw, 26rem)',
          fontWeight: 700,
          letterSpacing: '-0.08em',
          color: 'color-mix(in srgb, var(--accent-1) 4%, transparent)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap',
        }}
      >
        AUTEUR
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
        className="author-teaser-grid"
      >
        {/* Monogramme */}
        <FadeIn delay={0} duration={0.8}>
          <div
            aria-hidden="true"
            style={{
              position: 'relative',
              width: 'clamp(160px, 22vw, 260px)',
              height: 'clamp(160px, 22vw, 260px)',
              flexShrink: 0,
            }}
          >
            {/* Ring rotating */}
            <div
              className="monogram-ring"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, var(--accent-1) 0deg, transparent 90deg, var(--accent-4) 180deg, transparent 270deg, var(--accent-1) 360deg)`,
                padding: '2px',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))',
              }}
            />
            {/* Inner disc */}
            <div
              style={{
                position: 'absolute',
                inset: '10px',
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: '50%',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {initial}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Texte */}
        <FadeIn delay={0.15} duration={0.8}>
          <div className="rule-vertical">
            <p
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                marginBottom: 'var(--space-4)',
              }}
            >
              · L&rsquo;auteur derrière le site
            </p>
            <h2
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-5)',
                lineHeight: 1,
              }}
            >
              {niche.author.name}, <br />
              <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                {niche.author.title.toLowerCase()}
              </span>
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: 'var(--space-8)',
              }}
            >
              {niche.author.bio}
            </p>
            {niche.author.slug && (
              <Link
                href={`/auteurs/${niche.author.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: '12px 22px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-full)',
                  background: 'color-mix(in srgb, var(--bg-surface) 60%, transparent)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                Tous les articles de {niche.author.name} →
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
