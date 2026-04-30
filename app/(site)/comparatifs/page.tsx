/**
 * /comparatifs — index hub des comparatifs (placeholder Atelier Vert).
 * Liste de clusters par axe : top sélections, par technologie, par budget.
 * Server Component · ISR 3600s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { MAIN_MENU } from '@/lib/menu'
import { currentYear } from '@/lib/utils/year'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Comparatifs robots tondeuses ${year} — top sélections, technologie, budget`,
    description: `Tous nos comparatifs : meilleur robot tondeuse ${year}, sans fil périphérique, silencieux, pas cher, haut de gamme. Tests indépendants.`,
    alternates: { canonical: `${SITE_URL}/comparatifs` },
    openGraph: {
      title: `Comparatifs robots tondeuses ${year}`,
      description: `Top sélections testées, par technologie et par budget.`,
      url: `${SITE_URL}/comparatifs`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default function ComparatifsHub() {
  const entry = MAIN_MENU.find((m) => m.id === 'comparatifs')!

  return (
    <main id="main-content" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ maxWidth: 980, margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-10)' }}>
        <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 'var(--space-4)' }}>
          Comparatifs · {currentYear()}
        </p>
        <h1 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Tous les <em style={{ color: 'var(--copper)' }}>comparatifs</em> robots tondeuses.
        </h1>
        <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.6 }}>
          On a testé des dizaines de modèles dans la boue, sur des pentes, sous la pluie. Choisissez l&rsquo;axe qui vous parle&nbsp;: une top sélection, une technologie, un budget.
        </p>
      </header>

      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 var(--space-6) var(--space-20)' }}>
        {entry.columns?.map((col, i) => (
          <div key={i} style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(1.6rem, 2.4vw, 2rem)', fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
              {col.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
              {col.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  style={{
                    display: 'block',
                    padding: 'var(--space-5)',
                    background: 'var(--ivory)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    transition: 'border-color 150ms ease, transform 150ms ease',
                  }}
                  className="hub-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                      {it.label}
                    </span>
                    {it.badge && (
                      <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 9, fontWeight: 500, padding: '2px 6px', borderRadius: 999, background: 'var(--copper-pale)', color: 'var(--copper)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {it.badge}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--copper)', letterSpacing: '0.06em' }}>
                    Voir le comparatif →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
