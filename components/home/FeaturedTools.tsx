/**
 * FeaturedTools — bento pro, cartes avec gradient border + hover glow.
 * Intègre FadeIn/Stagger framer-motion + corner marks + liquid-glass.
 * Server Component.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

type ToolCardProps = {
  href: string
  eyebrow: string
  title: string
  description: string
  cta: string
  accent: string
  large?: boolean
  icon: React.ReactNode
  number: string
}

function ToolCard({ href, eyebrow, title, description, cta, accent, large = false, icon, number }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="tool-card card-lift"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: large ? 'var(--space-10)' : 'var(--space-7)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        minHeight: large ? '360px' : '240px',
        height: '100%',
      }}
    >
      {/* Corner marks */}
      <div className="corner-marks" aria-hidden="true" style={{ color: accent }} />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: `radial-gradient(circle, color-mix(in srgb, ${accent} 35%, transparent) 0%, transparent 70%)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* Number watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-30px',
          right: '-10px',
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: large ? '14rem' : '10rem',
          fontWeight: 700,
          lineHeight: 0.8,
          color: `color-mix(in srgb, ${accent} 6%, transparent)`,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.08em',
        }}
      >
        {number}
      </div>

      {/* Icon */}
      <div
        style={{
          width: large ? '56px' : '42px',
          height: large ? '56px' : '42px',
          color: accent,
          marginBottom: 'var(--space-6)',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {icon}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 'var(--space-3)',
          }}
        >
          {eyebrow}
        </p>
        <h3
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: large ? 'clamp(1.6rem, 2.8vw, 2.4rem)' : '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.1,
            textWrap: 'balance',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: 'var(--space-6)',
            maxWidth: large ? '440px' : 'none',
          }}
        >
          {description}
        </p>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: '13px',
            fontWeight: 700,
            color: accent,
            borderBottom: `1px solid ${accent}`,
            paddingBottom: '4px',
          }}
        >
          {cta} →
        </span>
      </div>
    </Link>
  )
}

const IconCompare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <rect x="2" y="3" width="8" height="18" rx="2" />
    <rect x="14" y="3" width="8" height="18" rx="2" />
    <path d="M10 8h4M10 12h4M10 16h4" />
  </svg>
)

const IconQuiz = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
)

const IconSimulator = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="100%" height="100%">
    <path d="M3 3v18h18" />
    <path d="M7 14l3-3 3 3 5-5" />
    <circle cx="18" cy="9" r="1.5" fill="currentColor" />
  </svg>
)

export function FeaturedTools() {
  const comparatorTitle = niche.comparator.enabled
    ? `Comparez les ${niche.entities} côte à côte`
    : `Découvrez nos ${niche.entities}`

  const quizTitle = niche.quiz.question || `Trouvez votre ${niche.entity} idéal`

  const simulatorTitle = niche.simulator.title || `Calculez votre budget`
  const simulatorDesc = niche.simulator.description || `Simulez le coût réel de votre ${niche.entity}.`

  return (
    <section className="section-pro">
      <FadeIn>
        <div className="section-head-editorial">
          <div>
            <span className="pill-accent" style={{ marginBottom: 'var(--space-4)' }}>
              · Outils interactifs
            </span>
            <h2>
              Décidez en<br />
              <span className="type-mix-hero">connaissance de cause</span>
            </h2>
          </div>
        </div>
      </FadeIn>

      <Stagger staggerDelay={0.1}>
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-5)',
          }}
        >
          <StaggerItem className="bento-featured" style={{ height: '100%' }}>
            <ToolCard
              href="/comparer"
              eyebrow="01 — Comparateur"
              title={comparatorTitle}
              description="Mettez côte à côte specs, prix, surface maximale et navigation. Filtrez par budget et type de jardin."
              cta="Lancer le comparateur"
              accent="var(--accent-1)"
              large
              icon={<IconCompare />}
              number="1"
            />
          </StaggerItem>

          {niche.quiz.enabled && (
            <StaggerItem style={{ height: '100%' }}>
              <ToolCard
                href="/quiz"
                eyebrow="02 — Quiz"
                title={quizTitle}
                description={`Quelques questions pour identifier le ${niche.entity} fait pour vous.`}
                cta="Démarrer"
                accent="var(--accent-2)"
                icon={<IconQuiz />}
                number="2"
              />
            </StaggerItem>
          )}

          {niche.simulator.enabled && (
            <StaggerItem style={{ height: '100%' }}>
              <ToolCard
                href="/simulateur"
                eyebrow="03 — Simulateur"
                title={simulatorTitle}
                description={simulatorDesc}
                cta="Simuler"
                accent="var(--accent-4)"
                icon={<IconSimulator />}
                number="3"
              />
            </StaggerItem>
          )}
        </div>
      </Stagger>
    </section>
  )
}
