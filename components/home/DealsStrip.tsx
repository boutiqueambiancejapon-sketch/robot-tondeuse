/**
 * DealsStrip — bandeau de deals en défilement continu (MarqueeStrip).
 * Données statiques placeholder — remplacées par ISR + API deals ensuite.
 * Server Component.
 */

import { MarqueeStrip } from '@/components/effects/MarqueeStrip'
import { niche } from '@/niche.config'

type Deal = {
  label: string
  badge: string
  badgeColor?: string
}

// Deals statiques — à remplacer par le CMS quand les vrais deals arrivent
const DEALS: Deal[] = [
  { label: 'Mammotion YUKA Mini 2 500 à 699 €', badge: 'Promo', badgeColor: 'var(--accent-1)' },
  { label: 'Gardena SILENO life 750 à 700 €', badge: '-28%', badgeColor: 'var(--accent-3)' },
  { label: 'Worx Landroid Plus WR169E à 424 €', badge: 'Petit prix', badgeColor: 'var(--accent-2)' },
  { label: 'Husqvarna Aspire R4 à 699 €', badge: 'Nouveau', badgeColor: 'var(--accent-1)' },
  { label: 'Mammotion YUKA 2000 à 1385 €', badge: '-23%', badgeColor: 'var(--accent-3)' },
  { label: 'Worx Vision Cloud WR305E à 799 €', badge: 'Sans fil', badgeColor: 'var(--accent-2)' },
]

function DealChip({ label, badge, badgeColor = 'var(--accent-1)' }: Deal) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-5)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '999px',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          padding: '2px 8px',
          backgroundColor: badgeColor,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.04em',
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
    <section aria-label="Bons plans du moment" style={{ paddingBlock: 'var(--space-4)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <MarqueeStrip speed="slow" gap="var(--space-3)">
        {DEALS.map((deal) => (
          <DealChip key={deal.label} {...deal} />
        ))}
      </MarqueeStrip>
    </section>
  )
}
