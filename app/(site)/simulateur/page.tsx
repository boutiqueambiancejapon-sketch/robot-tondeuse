/**
 * /simulateur — Calculateur de surface → recommandation robot.
 * L'utilisateur entre sa surface en m² et ses contraintes,
 * on affiche les robots adaptés avec liens d'achat.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { SurfaceCalculator } from './SurfaceCalculator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export function generateMetadata(): Metadata {
  return {
    title: `Quel robot tondeuse pour votre surface ? | ${niche.siteName}`,
    description:
      'Entrez la surface de votre jardin et découvrez quel robot tondeuse vous convient. Recommandations personnalisées par marque et budget.',
    alternates: { canonical: `${SITE_URL}/simulateur` },
    openGraph: {
      title: 'Quel robot tondeuse pour votre surface ?',
      description: 'Calculateur de surface pour trouver le robot tondeuse adapté à votre jardin.',
      url: `${SITE_URL}/simulateur`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Simulateur',
      item: `${SITE_URL}/simulateur`,
    },
  ],
}

export default function SimulateurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'var(--space-16) var(--space-6) var(--space-12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '0',
              right: 'var(--space-6)',
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(120px, 20vw, 280px)',
              fontWeight: 800,
              color: 'var(--accent-1)',
              opacity: 0.05,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            m²
          </span>

          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
            <ol
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                listStyle: 'none',
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
            >
              <li>
                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>
                Simulateur
              </li>
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)',
            }}
          >
            Quel robot pour votre jardin ?
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            Entrez votre surface en m² et on vous montre les robots tondeuses adaptés, triés par budget.
          </p>
        </section>

        {/* Calculateur */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6) var(--space-24)',
          }}
        >
          <SurfaceCalculator />
        </section>
      </main>
    </>
  )
}
