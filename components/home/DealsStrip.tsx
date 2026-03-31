/**
 * DealsStrip — bandeau statique de deals en grille horizontale scrollable.
 * DA "Terrain & Nature" — pas de marquee, scroll natif avec snap.
 * Server Component.
 */

import Link from 'next/link'
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
        borderRadius: 'var(--radius-lg)',
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
          borderRadius: 'var(--radius-sm)',
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
    <section aria-label="Bons plans du moment" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          padding: 'var(--space-4) var(--space-6)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Label fixe */}
        <Link
          href="/deals"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            flexShrink: 0,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-2)',
            textDecoration: 'none',
            paddingRight: 'var(--space-4)',
            borderRight: '1px solid var(--border)',
          }}
        >
          {niche.dealWord}
        </Link>
        {DEALS.map((deal) => (
          <span key={deal.label} style={{ scrollSnapAlign: 'start' }}>
            <DealChip {...deal} />
          </span>
        ))}
      </div>
    </section>
  )
}
