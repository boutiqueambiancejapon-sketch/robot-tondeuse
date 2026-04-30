/**
 * HeroSection — above-fold Atelier Vert.
 * Light bg paper, accents copper, typo Instrument Serif italique.
 * Server Component.
 */

import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { AnimatedHeading } from '@/components/effects/AnimatedHeading'
import { RotatingWords } from '@/components/effects/RotatingWords'
import { HeroVisual } from './HeroVisual'
import Link from 'next/link'
import { niche } from '@/niche.config'

export function HeroSection() {
  return (
    <section
      className="hero-aurora"
      style={{
        position: 'relative',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      <NoiseOverlay opacity={0.02} />

      {/* Halo subtil moss en haut-gauche, copper-pale bas-droite */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,90,61,0.10), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,98,61,0.10), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

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
          {/* ── Colonne gauche ── */}
          <div>
            {/* Eyebrow avec dot vert pulsant */}
            <AnimatedHeading
              as="p"
              delay={0}
              duration={600}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--moss)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--copper-bright)',
                }}
              />
              Live 2026 · Mis à jour cette semaine
            </AnimatedHeading>

            {/* H1 — Instrument Serif italique */}
            <AnimatedHeading
              as="h1"
              delay={120}
              duration={900}
              style={{
                fontFamily: 'var(--next-font-display), Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {niche.heroPrefix}{' '}
              <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>
                <RotatingWords words={niche.rotatingWords} interval={2600} />
              </em>
            </AnimatedHeading>

            <AnimatedHeading
              as="h1"
              delay={240}
              duration={900}
              style={{
                fontFamily: 'var(--next-font-display), Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-8)',
              }}
            >
              {niche.heroSuffix}.
            </AnimatedHeading>

            {/* Sous-titre */}
            <AnimatedHeading
              as="p"
              delay={400}
              duration={700}
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'var(--text-secondary)',
                maxWidth: 540,
                lineHeight: 1.6,
                marginBottom: 'var(--space-10)',
              }}
            >
              {niche.subtitle}
            </AnimatedHeading>

            {/* CTAs */}
            <AnimatedHeading
              as="p"
              delay={560}
              duration={600}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center',
                marginBottom: 'var(--space-10)',
              }}
            >
              <Link
                href={niche.ctaPrimary.url}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '16px 26px',
                  background: 'var(--copper)',
                  color: 'var(--ivory)',
                  fontWeight: 500,
                  fontSize: 16,
                  borderRadius: 100,
                  textDecoration: 'none',
                  boxShadow: '0 2px 0 0 #8c4a2c, 0 6px 16px rgba(184, 98, 61, 0.25)',
                  transition: 'background 150ms ease, transform 150ms ease',
                }}
                className="hero-cta-primary"
              >
                {niche.ctaPrimary.text}
              </Link>
              <Link
                href={niche.ctaSecondary.url}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 26px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-strong)',
                  fontWeight: 500,
                  fontSize: 16,
                  borderRadius: 100,
                  textDecoration: 'none',
                  transition: 'background 150ms ease, border-color 150ms ease',
                }}
              >
                {niche.ctaSecondary.text}
              </Link>
            </AnimatedHeading>

            {/* Stats row */}
            <AnimatedHeading
              as="p"
              delay={720}
              duration={700}
              style={{
                display: 'flex',
                gap: 'var(--space-8)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { num: '30+', label: 'Modèles testés' },
                { num: '6', label: 'Marques couvertes' },
                { num: '100%', label: 'Indépendant' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: 'var(--next-font-display), Georgia, serif',
                      fontSize: 32,
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: 10,
                      color: 'var(--moss)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </AnimatedHeading>
          </div>

          {/* ── Colonne droite — navigation familles ── */}
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
