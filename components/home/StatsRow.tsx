/**
 * StatsRow — bandeau de chiffres clés au-dessus du hero marquee.
 * CountUp au scroll + FadeIn stagger.
 * Pure typographie, zéro image.
 * Server Component (CountUp client importé inline).
 */

import { CountUp } from '@/components/effects/CountUp'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

const STATS = [
  { value: 30, suffix: '+', label: 'Modèles testés', hint: 'Protocole identique sur terrain' },
  { value: 5, suffix: '', label: 'Marques suivies', hint: 'Mammotion · Husqvarna · Gardena · Worx · Bosch' },
  { value: 2018, suffix: '', label: 'Depuis', hint: `Sept ans d'expérience terrain`, raw: true },
  { value: 0, suffix: '€', label: 'Affilié caché', hint: 'Transparence totale sur les liens' },
]

export function StatsRow() {
  return (
    <section
      aria-label="Chiffres clés"
      style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-6) var(--space-4)',
      }}
    >
      <FadeIn>
        <Stagger as="div" staggerDelay={0.08} className="stats-row">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} as="div" className="stat-cell">
              <div
                style={{
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {stat.raw ? (
                  <span>{stat.value}</span>
                ) : (
                  <CountUp to={stat.value} duration={1400} suffix={stat.suffix} />
                )}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {stat.label}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {stat.hint}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </FadeIn>
    </section>
  )
}
