/**
 * AuthorTeaser — encart éditorial asymétrique.
 * DA "Terrain & Nature" — monogramme avec bordure accent
 * et fond texturé terreux, pas de conic-gradient tech.
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
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'var(--space-20) var(--space-6)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
        className="author-teaser-grid"
      >
        {/* Monogramme — cercle avec bordure accent solide */}
        <div
          aria-hidden="true"
          style={{
            width: 'clamp(120px, 18vw, 200px)',
            height: 'clamp(120px, 18vw, 200px)',
            borderRadius: '50%',
            border: '3px solid var(--accent-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
            background: 'var(--bg-surface)',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '45%',
              fontWeight: 800,
              color: 'var(--accent-1)',
              letterSpacing: '0',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {initial}
          </span>
          {/* Subtle leaf/terrain accent inside circle */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.06,
              pointerEvents: 'none',
            }}
          >
            <path
              d="M20 80 C30 50, 50 30, 80 20 C70 50, 50 70, 20 80 Z"
              fill="var(--accent-1)"
            />
          </svg>
        </div>

        {/* Texte */}
        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-1)',
              marginBottom: 'var(--space-3)',
            }}
          >
            L&rsquo;auteur
          </p>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
              fontWeight: 700,
              letterSpacing: '0',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-4)',
              lineHeight: 1.15,
            }}
          >
            {niche.author.name} — {niche.author.title}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: 'var(--space-6)',
            }}
          >
            {niche.author.bio}
          </p>
          {niche.author.slug && (
            <Link
              href={`/auteurs/${niche.author.slug}`}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--accent-1)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}
            >
              En savoir plus →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
