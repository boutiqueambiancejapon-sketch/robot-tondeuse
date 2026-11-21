/**
 * /blog/[categorie] — les articles d'une rubrique (design V2).
 * Titre de page, filtre par rubrique, articles en lignes, pagination.
 * Server Component · ISR 3600s.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllArticles, getCategories, CATEGORY_LABELS } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import { PageTitle } from '@/components/v2/PageTitle'
import { RubriqueChips } from '@/components/v2/listes/RubriqueChips'
import { rubriqueLabel, rubriquePose } from '@/components/v2/listes/rubriques'
import { niche } from '@/niche.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

const ARTICLES_PER_PAGE = 10

type Params = Promise<{ categorie: string }>
type SearchParams = Promise<{ page?: string }>

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map(({ slug }) => ({ categorie: slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorie } = await params
  const label = CATEGORY_LABELS[categorie] ?? categorie
  const year = currentYear()
  return {
    title: { absolute: `${label} — articles et guides ${year} | ${niche.siteName}` },
    description: `Tous les articles ${label} : guides d'achat, comparatifs et conseils.`,
    alternates: { canonical: `${SITE_URL}/blog/${categorie}` },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { categorie } = await params
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page) || 1)

  const all = getAllArticles().filter((a) => a.categorie === categorie)
  if (all.length === 0) notFound()

  const label = CATEGORY_LABELS[categorie] ?? categorie
  const title = rubriqueLabel(categorie)
  const catDescription = niche.categories.find(c => c.slug === categorie)?.description
  const totalPages = Math.ceil(all.length / ARTICLES_PER_PAGE)
  const paged = all.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: label, item: `${SITE_URL}/blog/${categorie}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main-content" className="v2">
        <div className="wrap lst">
          <PageTitle
            title={title}
            pose={rubriquePose(categorie)}
            meta={`${all.length} article${all.length > 1 ? 's' : ''}`}
            crumbs={[{ href: '/', label: 'Accueil' }, { href: '/blog', label: 'Blog' }, { label: title }]}
          />
          {catDescription ? <p className="lede">{catDescription}</p> : null}
          <RubriqueChips rubriques={getCategories()} active={categorie} />

          <ul className="posts">
            {paged.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} showCategory={false} />
              </li>
            ))}
          </ul>
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/blog/${categorie}`} />
        </div>
      </main>
    </>
  )
}
