/**
 * /blog — tous les articles (design V2).
 * Titre de page, filtre par rubrique, articles en lignes, pagination.
 * Server Component · ISR 3600s · searchParams: page
 */

import type { Metadata } from 'next'
import { getAllArticles, getCategories } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import { PageTitle } from '@/components/v2/PageTitle'
import { RubriqueChips } from '@/components/v2/listes/RubriqueChips'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

const ARTICLES_PER_PAGE = 8

type SearchParams = Promise<{ page?: string }>

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Blog ${year} — avis et guides | ${niche.siteName}`,
    description:
      `Tous les articles : guides d'achat, comparatifs et conseils.`,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Blog ${year} — avis et guides`,
      description: `Tous les articles ${niche.entities}. Avis honnêtes.`,
      url: `${SITE_URL}/blog`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)

  const allArticles = getAllArticles()
  const categories = getCategories()
  const [featured, ...rest] = allArticles

  const paged = rest.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )
  const totalPages = Math.ceil(rest.length / ARTICLES_PER_PAGE)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main-content" className="v2">
        <div className="wrap lst">
          <PageTitle
            title="Nos articles"
            pose="lecture"
            meta={`${allArticles.length} articles publiés`}
            crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Blog' }]}
          />
          <p className="lede">Comparatifs par marque, guides d’achat et entretien du gazon.</p>
          <RubriqueChips rubriques={categories} />

          {allArticles.length === 0 ? (
            <p className="muted">Premiers articles en cours de rédaction.</p>
          ) : (
            <>
              <ul className="posts">
                {featured && currentPage === 1 ? (
                  <li className="posts-lead">
                    <ArticleCard article={featured} featured />
                  </li>
                ) : null}
                {paged.map((article) => (
                  <li key={`${article.categorie}/${article.slug}`}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
            </>
          )}
        </div>
      </main>
    </>
  )
}
