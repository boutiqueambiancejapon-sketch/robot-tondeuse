/**
 * /simulateur — Calculateur de surface → recommandation robot.
 * L'utilisateur entre sa surface en m² et ses contraintes,
 * on affiche les robots adaptés avec liens d'achat.
 */

import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { SurfaceCalculator } from './SurfaceCalculator'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `Quel robot tondeuse pour votre surface ? | ${niche.siteName}` },
    description:
      'Entrez la surface de votre jardin et découvrez quel robot tondeuse vous convient. Recommandations personnalisées par marque et budget.',
    alternates: { canonical: `${SITE_URL}/simulateur` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
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

      <main id="main-content" className="v2">
        <div className="wrap tool">
          <div className="tool-in">
            <PageTitle
              title="Quel robot pour votre jardin ?"
              pose="calcul"
              crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Simulateur' }]}
              meta="Simulateur gratuit, sans inscription"
            />
            <p className="lede">
              Entrez votre surface en m² et on vous montre les robots tondeuses adaptés, triés par budget.
            </p>

            <section className="sec">
              <SurfaceCalculator />
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
