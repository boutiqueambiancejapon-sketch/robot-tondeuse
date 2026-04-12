/**
 * DealsStrip — bandeau de bons plans en marquee + hover glow.
 * Double sens : bandeau dense qui défile horizontalement.
 * Server Component.
 */

import { MarqueeStrip } from '@/components/effects/MarqueeStrip'

type Deal = {
  label: string
  badge: string
  badgeColor?: string
}

const DEALS: Deal[] = [
  { label: 'Mammotion YUKA Mini 2 500 à 699 €', badge: 'Promo', badgeColor: 'var(--accent-1)' },
  { label: 'Gardena SILENO life 750 à 700 €', badge: '-28%', badgeColor: 'var(--accent-3)' },
  { label: 'Worx Landroid Plus WR169E à 424 €', badge: 'Petit prix', badgeColor: 'var(--accent-2)' },
  { label: 'Husqvarna Aspire R4 à 699 €', badge: 'Nouveau', badgeColor: 'var(--accent-1)' },
  { label: 'Mammotion YUKA 2000 à 1385 €', badge: '-23%', badgeColor: 'var(--accent-3)' },
  { label: 'Worx Vision Cloud WR305E à 799 €', badge: 'Sans fil', badgeColor: 'var(--accent-2)' },
  { label: 'Bosch Indego S+ 500 à 559 €', badge: 'Connecté', badgeColor: 'var(--accent-4)' },
  { label: 'Husqvarna Automower 305 à 849 €', badge: 'Stock', badgeColor: 'var(--accent-1)' },
]

function DealChip({ label, badge, badgeColor = 'var(--accent-1)' }: Deal) {
  return (
    <span
      className="deal-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-5)',
        background: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)',
        backdropFilter: 'blur(6px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-full)',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          padding: '3px 10px',
          background: badgeColor,
          color: '#fff',
          borderRadius: 'var(--radius-full)',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {badge}
      </span>
      {label}
    </span>
  )
}

export function DealsStrip() {
  return (
    <section
      aria-label="Bons plans du moment"
      style={{
        position: 'relative',
        paddingBlock: 'var(--space-5)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Label flottant */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-2)',
          left: 'var(--space-6)',
          zIndex: 3,
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      >
        · Live · Bons plans
      </div>
      <div className="marquee-edge-fade" style={{ paddingTop: 'var(--space-4)' }}>
        <MarqueeStrip speed="slow" gap="var(--space-3)">
          {DEALS.map((deal) => (
            <DealChip key={deal.label} {...deal} />
          ))}
        </MarqueeStrip>
      </div>
    </section>
  )
}
