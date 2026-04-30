/**
 * /marques — index hub des marques (placeholder Atelier Vert).
 * Grille des marques avec accent par catégorie.
 * Server Component · ISR 3600s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { currentYear } from '@/lib/utils/year'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Toutes les marques de robots tondeuses testées ${year}`,
    description: `Tests par marque : Mammotion, Husqvarna, Gardena, Worx, Bosch et plus. Avis indépendants, comparatifs, guides d'achat.`,
    alternates: { canonical: `${SITE_URL}/marques` },
    openGraph: {
      title: `Toutes les marques de robots tondeuses ${year}`,
      description: `Tests indépendants par marque.`,
      url: `${SITE_URL}/marques`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default function MarquesHub() {
  const brands = niche.categories.filter((c) => c.slug !== 'entretien-pelouse')

  return (
    <main id="main-content" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ maxWidth: 980, margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-10)' }}>
        <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 'var(--space-4)' }}>
          Toutes les marques · {currentYear()}
        </p>
        <h1 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Toutes les marques que <em style={{ color: 'var(--copper)' }}>nous testons</em>.
        </h1>
        <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.6 }}>
          De la référence suédoise aux nouveaux acteurs sans fil. Choisissez la marque qui vous intéresse pour découvrir nos tests, comparatifs et guides d&rsquo;achat.
        </p>
      </header>

      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 var(--space-6) var(--space-20)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-5)' }}>
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/choisir/${b.slug}`}
              style={{
                display: 'block',
                padding: 'var(--space-6)',
                background: 'var(--ivory)',
                borderTop: `3px solid ${b.accent}`,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'transform 150ms ease, border-color 150ms ease',
              }}
              className="hub-card"
            >
              <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                {b.label}
              </h2>
              {b.description && (
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                  {b.description}
                </p>
              )}
              <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: b.accent, letterSpacing: '0.06em', fontWeight: 500 }}>
                Voir tous les tests →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
