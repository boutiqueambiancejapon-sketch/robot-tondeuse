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
}

function slugFromHref(href: string): string {
  return href.replace(/^\//, '').replace(/\/$/, '')
}

export function HomeHubSection({
  eyebrow,
  heading,
  emHighlight,
  items,
  background = 'paper',
  ctaHref,
  ctaLabel,
}: Props) {
  if (items.length === 0) return null

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

        <div className="hub-section-grid">
          {items.map((item) => {
            const slug = slugFromHref(item.href)
            return (
              <Link key={item.href} href={item.href} className="hub-section-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', transition: 'transform 200ms ease, box-shadow 200ms ease' }}>
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
          })}
        </div>
      </div>
    </section>
  )
}
