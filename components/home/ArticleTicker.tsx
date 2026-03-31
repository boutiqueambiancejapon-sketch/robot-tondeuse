/**
 * ArticleTicker — bandeau horizontal statique des articles récents.
 * DA "Terrain & Nature" — scroll natif, pas de marquee automatique.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, CATEGORY_ACCENT, articleHref } from '@/lib/blog'

export function ArticleTicker() {
  const articles = getAllArticles().slice(0, 10)
  if (articles.length < 2) return null

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
        aria-label="Articles récents"
      >
        {articles.map((article) => {
          const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
          const label = CATEGORY_LABELS[article.categorie] ?? article.categorie
          return (
            <Link
              key={article.slug}
              href={articleHref(article)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-6)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                borderRight: '1px solid var(--border)',
                scrollSnapAlign: 'start',
                transition: 'background 150ms ease',
              }}
              className="ticker-item"
            >
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: accent }}>
                {label}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {article.title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
