/**
 * HeroSection — above-fold.
 * Topographie terrain + texture herbe + fade-up doux + mots qui tournent + 2 CTAs.
 * DA "Terrain & Nature" — évoque un jardin de nuit premium.
 * Server Component (les enfants clients sont importés inline).
 */

import { TopographyBackground } from '@/components/effects/TopographyBackground'
import { GrassTexture } from '@/components/effects/GrassTexture'
import { RotatingWords } from '@/components/effects/RotatingWords'
import { HeroVisual } from './HeroVisual'
import Link from 'next/link'
import { niche } from '@/niche.config'

export function HeroSection() {
  return (
    <TopographyBackground
      className="hero-terrain"
      intensity="medium"
    >
      <GrassTexture opacity={0.025} />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'var(--space-20) var(--space-6)',
          width: '100%',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div className="hero-grid">
        {/* ── Colonne gauche — texte ── */}
        <div>
        {/* Eyebrow */}
        <p
          className="hero-fade-up"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-1)',
            marginBottom: 'var(--space-5)',
            animationDelay: '0ms',
          }}
        >
          Guides indépendants · Comparatifs honnêtes
        </p>

        {/* H1 — ligne 1 */}
        <h1
          className="hero-fade-up"
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '0.15em',
            animationDelay: '100ms',
          }}
        >
          {niche.heroPrefix}
        </h1>

        {/* H1 — ligne 2 avec mot rotatif */}
        <p
          className="hero-fade-up"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.25em',
            animationDelay: '200ms',
          }}
        >
          <RotatingWords
            words={niche.rotatingWords}
            interval={2600}
            style={{ color: 'var(--accent-1)' }}
          />
          <span className="text-gradient-terrain">{niche.heroSuffix}</span>
        </p>

        {/* Sous-titre */}
        <p
          className="hero-fade-up"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            lineHeight: 1.65,
            marginBottom: 'var(--space-10)',
            animationDelay: '300ms',
          }}
        >
          {niche.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="hero-fade-up"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            alignItems: 'center',
            animationDelay: '400ms',
          }}
        >
          <Link
            href={niche.ctaPrimary.url}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--accent-1)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'opacity 150ms ease, transform 150ms ease',
            }}
            className="btn-primary"
          >
            {niche.ctaPrimary.text}
          </Link>
          <Link
            href={niche.ctaSecondary.url}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontSize: '15px',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'border-color 150ms ease',
            }}
          >
            {niche.ctaSecondary.text}
          </Link>
        </div>
        </div>{/* /colonne gauche */}

        {/* ── Colonne droite — navigation familles ── */}
        <HeroVisual />

        </div>{/* /hero-grid */}
      </div>
    </TopographyBackground>
  )
}
