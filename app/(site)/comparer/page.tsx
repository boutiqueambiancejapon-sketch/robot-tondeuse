/**
 * /comparer — Hub de sélection produit.
 * Redirige vers /comparer/[produit] pour chaque famille.
 * Design V2 : titre avec la mascotte « balance », une ligne par marque.
 * Server Component · ISR 86400s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { COMPARATEURS } from '@/lib/comparateur'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { Mascotte } from '@/components/v2/Mascotte'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Comparateur ${year} | ${niche.siteName}`,
    description:
      `Comparez tous les ${niche.entities} côte à côte. Données à jour, liens ${niche.defaultStore} affiliés.`,
    alternates: { canonical: `${SITE_URL}/comparer` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Comparateur ${year}`,
      description: `Tous les comparateurs ${niche.entities} en un endroit.`,
      url: `${SITE_URL}/comparer`,
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
    { '@type': 'ListItem', position: 2, name: 'Comparateur', item: `${SITE_URL}/comparer` },
  ],
}

export default function ComparateurHubPage() {
  const produits = Object.values(COMPARATEURS)
  const total = produits.reduce((n, p) => n + p.modeles.length, 0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="v2">
        <div className="wrap tool">
          <PageTitle
            title="Comparateur"
            pose="balance"
            crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Comparateur' }]}
            meta={`${total} modèles · ${produits.length} marques`}
          />
          <p className="lede">Choisissez une marque pour comparer ses modèles côte à côte.</p>

          <section className="sec stack-lg">
            <ul className="stack">
              {produits.map((p) => (
                <li key={p.id}>
                  <Link className="card mini" href={`/comparer/${p.id}`}>
                    <div>
                      <h2>{p.label}</h2>
                      <p>{p.description}</p>
                    </div>
                    <span className="count">{p.modeles.length} modèles</span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link className="card door door--copper" href="/quiz">
              <Mascotte pose="loupe" size={104} />
              <h3>Trop de choix ?</h3>
              <p>Le quiz vous conseille un robot selon votre jardin.</p>
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
