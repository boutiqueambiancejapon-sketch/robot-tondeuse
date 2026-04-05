/**
 * /blog — hub éditorial principal.
 * Article featured (hero card) + grille 2 colonnes + pills catégories colorées.
 * Server Component · ISR 3600s · searchParams: page
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllArticles, getCategories, CATEGORY_ACCENT } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import { niche } from '@/niche.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

const ARTICLES_PER_PAGE = 8

type SearchParams = Promise<{ page?: string }>

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Blog ${year} — tests et guides | ${niche.siteName}`,
    description:
      `Tous les articles : guides d'achat, comparatifs et conseils.`,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title: `Blog ${year} — tests et guides`,
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

      <main id="main-content">
        {/* ── Hero ── */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-8)' }} className="blog-hero-inner">
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
            <ol style={{ display: 'flex', gap: 'var(--space-2)', listStyle: 'none', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accueil</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'var(--text-secondary)' }}>Blog</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 'var(--space-3)' }}>
            Nos articles
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}>
            Tests terrain, comparatifs par marque et guides d'entretien.
            {' '}<span style={{ color: 'var(--text-muted)' }}>{allArticles.length} articles publiés.</span>
          </p>
        </section>

        {/* ── Category pills ── */}
        <nav aria-label="Filtrer par catégorie" style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{
            maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)',
            display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            paddingBottom: 'var(--space-2)',
          }}>
            <Link
              href="/blog"
              aria-current="page"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 16px', fontSize: '13px', fontWeight: 700,
                color: 'var(--bg-primary)',
                background: 'var(--accent-1)',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'transform 150ms ease',
              }}
            >
              Tous
              <span style={{ fontSize: '11px', opacity: 0.8 }}>{allArticles.length}</span>
            </Link>
            {categories.map(({ slug, label, count }) => {
              const accent = CATEGORY_ACCENT[slug] ?? 'var(--accent-1)'
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="category-pill"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 16px', fontSize: '13px', fontWeight: 600,
                    color: accent,
                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'background 200ms ease, transform 150ms ease',
                  }}
                >
                  {label}
                  <span style={{ fontSize: '11px', opacity: 0.6 }}>{count}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6) var(--space-24)' }}>
          {allArticles.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Premiers articles en cours de rédaction.</p>
          ) : (
            <>
              {/* Article featured — page 1 uniquement */}
              {featured && currentPage === 1 && (
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <ArticleCard article={featured} featured />
                </div>
              )}

              {/* Grille 2 colonnes */}
              {paged.length > 0 && (
                <ul
                  role="list"
                  className="article-grid-2col"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 'var(--space-5)',
                    listStyle: 'none', margin: 0, padding: 0,
                  }}
                >
                  {paged.map((article) => (
                    <li key={`${article.categorie}/${article.slug}`}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              )}

              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
            </>
          )}
        </div>
      </main>
    </>
  )
}
