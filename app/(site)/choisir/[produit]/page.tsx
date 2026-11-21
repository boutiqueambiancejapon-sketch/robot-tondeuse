/**
 * /choisir/[produit] — "Quel [produit] choisir en {year} ?"
 * Structure : titre V2 + quiz interactif + contenu éditorial + FAQ + auteur.
 * Server Component — QuizEngine isolé en 'use client'.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { ChoisirEditorial } from '@/components/choisir/ChoisirEditorial'
import { currentYear } from '@/lib/utils/year'
import { COMPARATEURS, PRODUIT_SLUGS } from '@/lib/comparateur'
import { getChoisirContent } from '@/lib/choisir-content'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { quizMerchantLinks } from '@/components/quiz/merchant-links'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

type Params = Promise<{ produit: string }>

export function generateStaticParams() {
  return PRODUIT_SLUGS.map((produit) => ({ produit }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { produit } = await params
  const data = COMPARATEURS[produit]
  if (!data) return {}
  const year = currentYear()

  return {
    title: { absolute: `Quel ${data.label} choisir en ${year} ? Guide complet + quiz | ${niche.siteName}` },
    description: `Quel ${data.label} ${niche.entityVerb} en ${year} ? Quiz en 4 questions, comparatif par profil, prix et verdict honnête. Guide mis à jour.`,
    alternates: {
      canonical: `${SITE_URL}/choisir/${produit}`,
    },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Quel ${data.label} choisir en ${year} ?`,
      description: `Quiz en 4 questions, comparatif par profil et verdict honnête pour choisir son ${data.label} en ${year}.`,
      url: `${SITE_URL}/choisir/${produit}`,
      siteName: niche.siteName,
      type: 'article',
    },
  }
}

const PUBLISHED_DATES: Record<string, string> = {
  mammotion: '2026-03-29',
  husqvarna: '2026-03-29',
  gardena: '2026-03-29',
  worx: '2026-03-29',
  bosch: '2026-03-29',
}

export default async function ChoisirPage({ params }: { params: Params }) {
  const { produit } = await params
  const data = COMPARATEURS[produit]
  if (!data) notFound()

  const year = currentYear()
  const editorial = getChoisirContent(produit, year)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `Choisir son ${data.label}`, item: `${SITE_URL}/choisir/${produit}` },
    ],
  }

  return (
    <main id="main-content" className="v2">
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="wrap tool">
        <div className="tool-in">
          <PageTitle
            title={`Quel ${data.label} choisir en ${year}\u00a0?`}
            pose="lecture"
            crumbs={[{ href: '/', label: 'Accueil' }, { label: `Choisir son ${data.label}` }]}
          />
          <p className="lede">{data.description}</p>

          <section className="sec" aria-labelledby="quiz-titre">
            <div className="card card-p">
              <h2 id="quiz-titre" className="h-md">
                Trouvez votre modèle en 4 questions
              </h2>
              <QuizEngine embedded merchantLinks={quizMerchantLinks()} />
            </div>
          </section>

          {/* Contenu éditorial (s'il existe pour cette marque) */}
          {editorial && (
            <ChoisirEditorial
              content={editorial}
              produit={produit}
              publishedAt={PUBLISHED_DATES[produit] ?? '2026-03-24'}
            />
          )}
        </div>
      </div>
    </main>
  )
}
