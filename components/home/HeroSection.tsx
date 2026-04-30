/**
 * HeroSection — Atelier Vert : forest-deep gradient + animated robot.
 * Server Component (les enfants client sont importés avec 'use client').
 */

import { AnimatedHeading } from '@/components/effects/AnimatedHeading'
import { HomeRobotMower } from './HomeRobotMower'
import Link from 'next/link'
import { niche } from '@/niche.config'

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, var(--forest-deep) 0%, var(--forest) 100%)',
        color: 'var(--ivory)',
        paddingTop: 96,
        paddingBottom: 80,
        overflow: 'hidden',
        minHeight: 'min(100svh, 760px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Pattern grass ambient */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}
      >
        <defs>
          <pattern id="hero-grass" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M5 22 L5 13 M11 22 L11 8 M17 22 L17 15" stroke="var(--sage-light)" strokeWidth="1" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grass)" />
      </svg>

      <div
        style={{
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Colonne gauche */}
          <div>
            {/* Eyebrow */}
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
                color: 'var(--copper-bright)',
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

            {/* H1 */}
            <AnimatedHeading
              as="h1"
              delay={120}
              duration={900}
              style={{
                fontFamily: 'var(--next-font-display), Georgia, serif',
                fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--ivory)',
                marginBottom: 'var(--space-8)',
              }}
            >
              Le robot qui tond
              <br />
              <em style={{ color: 'var(--copper-bright)', fontStyle: 'italic' }}>vraiment</em>{' '}
              votre jardin.
            </AnimatedHeading>

            {/* Subtitle */}
            <AnimatedHeading
              as="p"
              delay={320}
              duration={700}
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                color: 'var(--sage-light)',
                maxWidth: 540,
                lineHeight: 1.6,
                marginBottom: 'var(--space-10)',
              }}
            >
              On a testé des dizaines de modèles dans la boue, sur des pentes, sous la pluie. Voici ceux qui méritent vraiment leur place dans votre jardin — et nos outils pour trouver le vôtre en 2&nbsp;minutes.
            </AnimatedHeading>

            {/* CTAs */}
            <AnimatedHeading
              as="p"
              delay={480}
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
                  boxShadow: '0 2px 0 0 #8c4a2c, 0 6px 16px rgba(184, 98, 61, 0.4)',
                  transition: 'background 150ms ease, transform 150ms ease',
                }}
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
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--ivory)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontWeight: 500,
                  fontSize: 16,
                  borderRadius: 100,
                  textDecoration: 'none',
                  transition: 'background 150ms ease',
                }}
              >
                {niche.ctaSecondary.text}
              </Link>
            </AnimatedHeading>

            {/* Stats */}
            <AnimatedHeading
              as="p"
              delay={640}
              duration={700}
              style={{
                display: 'flex',
                gap: 'var(--space-8)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid rgba(255,255,255,0.10)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { num: '30+', label: 'Modèles testés' },
                { num: '6', label: 'Marques couvertes' },
                { num: '100%', label: 'Indépendant' },
              ].map((s) => (
                <span key={s.label} style={{ display: 'block' }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--next-font-display), Georgia, serif',
                      fontSize: 38,
                      color: 'var(--ivory)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: 10,
                      color: 'var(--sage)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginTop: 6,
                    }}
                  >
                    {s.label}
                  </span>
                </span>
              ))}
            </AnimatedHeading>
          </div>

          {/* Colonne droite — robot animé */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HomeRobotMower />
          </div>
        </div>
      </div>
    </section>
  )
}
