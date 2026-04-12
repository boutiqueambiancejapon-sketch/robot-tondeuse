/**
 * HeroSection — refonte DA pro (2026-04-12).
 * - Aurora layered + grid ornament + spotlight curseur
 * - Massive type gradient animé
 * - RotatingWordsMotion (framer-motion)
 * - Magnetic CTAs
 * - Watermark display
 * - Robot SVG ornament + parallax
 * - Stats row + marquee ticker en bas
 * Server Component — clients importés inline.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { Parallax } from '@/components/motion/Parallax'
import { RotatingWordsMotion } from '@/components/effects/RotatingWordsMotion'
import { SpotlightCursor } from '@/components/effects/SpotlightCursor'
import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { RobotOrnament } from '@/components/effects/RobotOrnament'

export function HeroSection() {
  return (
    <section className="aurora-advanced hero-advanced" aria-labelledby="hero-title">
      {/* Ornements décoratifs */}
      <div className="grid-ornament" aria-hidden="true" />
      <NoiseOverlay opacity={0.04} />
      <SpotlightCursor />

      {/* Watermark massif en fond */}
      <div className="hero-watermark" aria-hidden="true">
        {niche.entity.split(' ')[0].toUpperCase()}
      </div>

      {/* Contenu */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1320px',
          margin: '0 auto',
          width: '100%',
          padding: '0 var(--space-6)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'var(--space-10)',
        }}
      >
        {/* Eyebrow pill */}
        <FadeIn delay={0} duration={0.5} y={12}>
          <span className="pill-accent">
            Guides indépendants · Comparatifs honnêtes
          </span>
        </FadeIn>

        <div className="hero-advanced-grid">
          {/* Colonne gauche — typographie */}
          <div>
            <h1
              id="hero-title"
              className="type-massive"
              style={{ margin: 0, color: 'var(--text-primary)' }}
            >
              <FadeIn as="span" delay={0.12} duration={0.8} y={30}>
                <span style={{ display: 'block' }}>{niche.heroPrefix}</span>
              </FadeIn>
              <FadeIn as="span" delay={0.28} duration={0.8} y={30}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '0.18em',
                    marginTop: '0.1em',
                  }}
                >
                  <RotatingWordsMotion
                    words={niche.rotatingWords}
                    interval={2800}
                    style={{ color: 'var(--accent-1)' }}
                  />
                </span>
              </FadeIn>
              <FadeIn as="span" delay={0.42} duration={0.8} y={30}>
                <span className="type-mix-hero" style={{ display: 'block' }}>
                  {niche.heroSuffix}
                </span>
              </FadeIn>
            </h1>

            <FadeIn delay={0.6} duration={0.7} y={18}>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  lineHeight: 1.7,
                  marginTop: 'var(--space-8)',
                  marginBottom: 'var(--space-10)',
                }}
              >
                {niche.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.76} duration={0.6} y={14}>
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <MagneticButton
                  href={niche.ctaPrimary.url}
                  strength={0.35}
                  style={{
                    padding: '14px 26px',
                    background: 'linear-gradient(135deg, var(--accent-1), var(--accent-3))',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '15px',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 10px 40px -10px color-mix(in srgb, var(--accent-1) 60%, transparent)',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {niche.ctaPrimary.text}
                  </span>
                </MagneticButton>

                <MagneticButton
                  href={niche.ctaSecondary.url}
                  strength={0.25}
                  style={{
                    padding: '14px 24px',
                    border: '1px solid var(--border-strong)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '15px',
                    borderRadius: 'var(--radius-full)',
                    background: 'color-mix(in srgb, var(--bg-surface) 40%, transparent)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {niche.ctaSecondary.text}
                  </span>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          {/* Colonne droite — Robot SVG + navigation catégories */}
          <div className="hero-visual-wrap">
            <Parallax speed={0.25}>
              <RobotOrnament
                className="robot-glow"
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Parallax>
          </div>
        </div>

        {/* Navigation familles — éditoriale */}
        <FadeIn delay={0.9} duration={0.7} y={20}>
          <nav
            className="hero-families"
            aria-label={`Catégories de ${niche.entities}`}
          >
            <Stagger staggerDelay={0.06}>
              {niche.categories.map((cat, i) => (
                <StaggerItem key={cat.slug} as="div">
                  <Link href={`/comparer/${cat.slug}`} className="hero-family-link">
                    <span className="hero-family-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hero-family-label">{cat.label}</span>
                    <span className="hero-family-arrow" aria-hidden="true">→</span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </nav>
        </FadeIn>
      </div>
    </section>
  )
}
