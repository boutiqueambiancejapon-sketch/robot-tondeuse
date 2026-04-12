/**
 * ArticleTicker — marquee massif en display type.
 * Double ligne défilante avec séparateurs et pastilles colorées.
 * Server Component.
 */

import Link from 'next/link'
import { getAllArticles, CATEGORY_ACCENT, articleHref } from '@/lib/blog'

export function ArticleTicker() {
  const articles = getAllArticles().slice(0, 10)
  if (articles.length < 2) return null

  const items = [...articles, ...articles]

  return (
    <section
      aria-label="Articles récents"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        position: 'relative',
        paddingBlock: 'var(--space-6)',
        background: 'color-mix(in srgb, var(--bg-surface) 40%, transparent)',
      }}
      className="marquee-edge-fade"
    >
      <div
        className="ticker-pro"
        style={{ width: 'max-content' }}
        role="marquee"
        aria-label="Articles récents en défilement"
      >
        {items.map((article, i) => {
          const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
          return (
            <Link
              key={`${article.slug}-${i}`}
              href={articleHref(article)}
              aria-hidden={i >= articles.length}
              tabIndex={i >= articles.length ? -1 : undefined}
              className="ticker-pro-item"
              style={{
                // @ts-expect-error custom CSS var
                '--accent-local': accent,
              }}
            >
              {article.title}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
