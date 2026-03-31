/**
 * FeaturedTools — grille asymétrique d'outils.
 * DA "Terrain & Nature" — design éditorial sobre :
 * border-top fine, index numéroté, typographie claire.
 * Server Component.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'

type ToolCardProps = {
  href: string
  index: string
  title: string
  description: string
  cta: string
  accent: string
  large?: boolean
  icon: React.ReactNode
}

function ToolCard({ href, index, title, description, cta, accent, large = false, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: large ? 'var(--space-8)' : 'var(--space-6)',
        paddingTop: large ? 'var(--space-6)' : 'var(--space-5)',
        backgroundColor: 'var(--bg-surface)',
        borderTop: `2px solid ${accent}`,
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        position: 'relative',
        minHeight: large ? '300px' : '200px',
        transition: 'background-color 200ms ease',
      }}
      className="tool-card"
    >
      {/* Header : index + icône */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
        <span
          style={{
            fontFamily: 'var(--next-font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {index}
        </span>
        <div
          style={{
            width: large ? '40px' : '32px',
            height: large ? '40px' : '32px',
            color: accent,
            opacity: 0.7,
          }}
        >
          {icon}
        </div>
      </div>

      <div>
        <h3
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: large ? 'clamp(1.2rem, 2vw, 1.6rem)' : 'clamp(0.95rem, 1.8vw, 1.1rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-3)',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-5)',
            maxWidth: large ? '400px' : 'none',
          }}
        >
          {description}
        </p>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: accent,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
        >
          {cta} →
        </span>
      </div>
    </Link>
  )
}

/* SVG icons — inline, zero raster */
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
    <path d="M12 2v20M2 12h20" />
    <circle cx="12" cy="12" r="4" />
    <path d="M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
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
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'var(--space-20) var(--space-6)',
      }}
    >
      {/* En-tête de section */}
      <div style={{ marginBottom: 'var(--space-10)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-1)', marginBottom: 'var(--space-2)' }}>
            Outils interactifs
          </p>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '0',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            Décidez en connaissance<br />de cause
          </h2>
        </div>
        <Link
          href="/blog"
          style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}
        >
          Voir tous les guides →
        </Link>
      </div>

      {/* Grille bento asymétrique */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: 'var(--border)',
        }}
        className="bento-grid"
      >
        {/* Grande cellule Comparateur */}
        <div className="bento-featured">
          <ToolCard
            href="/comparer"
            index="01"
            title={comparatorTitle}
            description={`Comparez côte à côte les specs, prix et usages. Filtres par budget et besoin.`}
            cta="Lancer le comparateur"
            accent="var(--accent-1)"
            large
            icon={<IconCompare />}
          />
        </div>

        {/* Quiz */}
        {niche.quiz.enabled && (
          <ToolCard
            href="/quiz"
            index="02"
            title={quizTitle}
            description={`Quelques questions pour identifier le ${niche.entity} fait pour vous.`}
            cta="Démarrer le quiz"
            accent="var(--accent-2)"
            icon={<IconQuiz />}
          />
        )}

        {/* Simulateur */}
        {niche.simulator.enabled && (
          <ToolCard
            href="/simulateur"
            index="03"
            title={simulatorTitle}
            description={simulatorDesc}
            cta="Simuler"
            accent="var(--accent-3)"
            icon={<IconSimulator />}
          />
        )}
      </div>
    </section>
  )
}
