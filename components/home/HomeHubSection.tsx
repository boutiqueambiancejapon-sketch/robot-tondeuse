/**
 * HomeHubSection — section générique de la home pour un cluster de hubs.
 * Header + grille de hub cards (HubArtwork + label + description).
 * Server Component.
 */

import Link from 'next/link'
import { HubArtwork } from '@/components/blog/HubArtwork'

export type HubSectionItem = {
  href: string
  label: string
  description?: string
  badge?: string
}

type Props = {
  eyebrow: string
  heading: string
  emHighlight?: string  // mot à mettre en italique copper
  items: HubSectionItem[]
  background?: 'paper' | 'cream' | 'ivory'
  ctaHref?: string
  ctaLabel?: string
  /** "featured" : 1er item en grande carte image+texte, le reste en grille text-only */
  variant?: 'grid' | 'featured'
}

function slugFromHref(href: string): string {
  return href.replace(/^\//, '').replace(/\/$/, '')
}

// ─── Sous-composants cards ──────────────────────────────────────────────

function FullHubCard({ item }: { item: HubSectionItem }) {
  const slug = slugFromHref(item.href)
  return (
    <Link href={item.href} className="hub-section-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', transition: 'transform 200ms ease, box-shadow 200ms ease' }}>
      <div style={{ aspectRatio: '16 / 10', position: 'relative', overflow: 'hidden', background: 'var(--cream)' }}>
        <HubArtwork slug={slug} variant="card" />
        {item.badge && (
          <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--next-font-mono), monospace', fontSize: 9, fontWeight: 500, padding: '3px 8px', borderRadius: 999, background: 'var(--copper)', color: 'var(--ivory)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {item.badge}
          </span>
        )}
      </div>
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 19, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
          {item.label}
        </h3>
        {item.description && (
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            {item.description}
          </p>
        )}
        <span style={{ marginTop: 'auto', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--copper)', letterSpacing: '0.06em', fontWeight: 500, paddingTop: 8 }}>
          Voir le guide →
        </span>
      </div>
    </Link>
  )
}

function FeaturedHubCard({ item }: { item: HubSectionItem }) {
  const slug = slugFromHref(item.href)
  return (
    <Link href={item.href} className="hub-section-card" style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', transition: 'transform 200ms ease, box-shadow 200ms ease', minHeight: 360 }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--cream)' }}>
        <HubArtwork slug={slug} variant="card" />
        {item.badge && (
          <span style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, fontWeight: 500, padding: '4px 10px', borderRadius: 999, background: 'var(--copper)', color: 'var(--ivory)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {item.badge}
          </span>
        )}
      </div>
      <div style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-3)' }}>
        <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)' }}>
          ★ À ne pas manquer
        </span>
        <h3 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
          {item.label}
        </h3>
        {item.description && (
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {item.description}
          </p>
        )}
        <span style={{ marginTop: 'var(--space-2)', fontFamily: 'var(--next-font-mono), monospace', fontSize: 12, color: 'var(--copper)', letterSpacing: '0.08em', fontWeight: 500 }}>
          Lire le guide complet →
        </span>
      </div>
    </Link>
  )
}

function SmallHubCard({ item }: { item: HubSectionItem }) {
  return (
    <Link href={item.href} className="hub-section-card hub-section-card--small" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 6, padding: 'var(--space-5)', background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 12, transition: 'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease' }}>
      {item.badge && (
        <span style={{ alignSelf: 'flex-start', fontFamily: 'var(--next-font-mono), monospace', fontSize: 9, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: 'var(--copper-pale)', color: 'var(--copper)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          {item.badge}
        </span>
      )}
      <h3 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 17, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>
        {item.label}
      </h3>
      {item.description && (
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
          {item.description}
        </p>
      )}
      <span style={{ marginTop: 'auto', fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, color: 'var(--copper)', letterSpacing: '0.08em', fontWeight: 500, paddingTop: 6 }}>
        Voir →
      </span>
    </Link>
  )
}

export function HomeHubSection({
  eyebrow,
  heading,
  emHighlight,
  items,
  background = 'paper',
  ctaHref,
  ctaLabel,
  variant = 'grid',
}: Props) {
  if (items.length === 0) return null
  const [first, ...rest] = items

  const bgVar = background === 'cream' ? 'var(--cream)' : background === 'ivory' ? 'var(--ivory)' : 'var(--paper)'

  // Si le heading contient le mot à highlighter, on le wrappe en em
  const renderedHeading = emHighlight
    ? heading.split(emHighlight).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [part, <em key={i} style={{ color: 'var(--copper)', fontStyle: 'italic' }}>{emHighlight}</em>]
          : [part]
      )
    : heading

  return (
    <section style={{ background: bgVar, padding: 'var(--space-20) 0', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-10)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 'var(--space-3)' }}>
              {eyebrow}
            </p>
            <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text-primary)', margin: 0 }}>
              {renderedHeading}
            </h2>
          </div>
          {ctaHref && ctaLabel && (
            <Link
              href={ctaHref}
              style={{
                padding: '12px 22px',
                border: '1px solid var(--border-strong)',
                borderRadius: 100,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
              }}
              className="hub-section-cta"
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        {variant === 'featured' ? (
          <>
            {/* Featured — 1er item en grande carte image+texte */}
            <FeaturedHubCard item={first} />

            {/* Reste en grille text-only */}
            {rest.length > 0 && (
              <div className="hub-section-grid hub-section-grid--small" style={{ marginTop: 'var(--space-6)' }}>
                {rest.map((item) => (
                  <SmallHubCard key={item.href} item={item} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="hub-section-grid">
            {items.map((item) => (
              <FullHubCard key={item.href} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
