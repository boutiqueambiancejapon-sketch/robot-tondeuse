/**
 * /comparer/[produit] — comparateur côte à côte.
 * Design V2 : modèles en pastilles, tableau à première colonne figée, phrase de verdict.
 * Server Component — ComparateurSelector isolé en 'use client'.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProduit, PRODUIT_SLUGS } from '@/lib/comparateur'
import { ComparateurSelector } from '@/components/comparer/ComparateurSelector'
import { currentYear } from '@/lib/utils/year'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { Mascotte } from '@/components/v2/Mascotte'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

type Params = Promise<{ produit: string }>

export function generateStaticParams() {
  return PRODUIT_SLUGS.map((produit) => ({ produit }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { produit } = await params
  const data = getProduit(produit)
  if (!data) return {}
  const year = currentYear()
  return {
    title: `Comparateur ${data.label} ${year} — quel modèle choisir ? | ${niche.siteName}`,
    description: data.description,
    alternates: { canonical: `${SITE_URL}/comparer/${produit}` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Comparateur ${data.label} ${year}`,
      description: data.description,
      url: `${SITE_URL}/comparer/${produit}`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

const AUTRES_PRODUITS = PRODUIT_SLUGS.map((slug) => {
  const p = getProduit(slug)
  return { slug, label: p?.label ?? slug }
})

export default async function ComparateurProduitPage({ params }: { params: Params }) {
  const { produit } = await params
  const data = getProduit(produit)
  if (!data) notFound()

  const year = currentYear()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Comparateur', item: `${SITE_URL}/comparer` },
      { '@type': 'ListItem', position: 3, name: data.label, item: `${SITE_URL}/comparer/${produit}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="v2">
        <div className="wrap tool">
          <PageTitle
            title={`Comparateur ${data.label} ${year}`}
            pose="balance"
            crumbs={[{ href: '/', label: 'Accueil' }, { href: '/comparer', label: 'Comparateur' }, { label: data.label }]}
            meta={`${data.modeles.length} modèles · prix indicatifs`}
          />
          <p className="lede">{data.description}</p>

          <nav className="chips" aria-label="Autres marques">
            {AUTRES_PRODUITS.map((p) => (
              <Link
                key={p.slug}
                href={`/comparer/${p.slug}`}
                className={p.slug === produit ? 'chip on' : 'chip'}
                aria-current={p.slug === produit ? 'page' : undefined}
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <section className="sec stack-lg">
            <div className="sec-hd">
              <h2 className="h-lg">Les modèles {data.label} côte à côte</h2>
              <p className="small muted">Touchez deux ou trois modèles. Le meilleur de chaque ligne passe en vert.</p>
            </div>

            <ComparateurSelector modeles={data.modeles} specsLabels={data.specsLabels} />

            <p className="dated">
              Surface, pente, bruit et autonomie annoncés par les fabricants. Prix indicatifs, à vérifier chez le marchand.
              Les liens {niche.defaultStore} sont des liens partenaires : le prix que vous payez reste identique.
            </p>

            <Link className="card door door--copper" href={`/choisir/${produit}`}>
              <Mascotte pose="loupe" size={104} />
              <h3>Vous hésitez encore ?</h3>
              <p>Répondez à 4 questions pour trouver votre modèle.</p>
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
