/**
 * RecentArticles — bento magazine : featured large (2 cols) + sidebar (1 col) + grille.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

export function RecentArticles() {
  const articles = getAllArticles().slice(0, 5)
  if (articles.length === 0) return null

  const [featured, second, ...rest] = articles

  return (
    <section
      style={{
        borderTop: '1px solid var(--line-soft)',
        padding: 'clamp(56px, 7vw, 104px) 0',
        background: 'var(--cream)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(28px, 4vw, 80px)' }}>

        {/* En-tête */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 36,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--moss)',
                marginBottom: 8,
              }}
            >
              Éditorial
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 3vw, 40px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: 'var(--ink)',
              }}
            >
              Derniers articles
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--copper)',
              textDecoration: 'none',
              borderBottom: '1.5px solid var(--copper)',
              paddingBottom: 2,
              whiteSpace: 'nowrap',
            }}
          >
            Tout le blog →
          </Link>
        </div>

        {/* Bento layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: 18,
          }}
          className="recent-articles-bento"
        >
          {/* Featured — 2 cols, 1 row */}
          <div style={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}>
            <ArticleCard article={featured} featured />
          </div>

          {/* Second — 1 col, 1 row — stacked right */}
          {second && (
            <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
              <ArticleCard article={second} />
            </div>
          )}

          {/* Remaining — full 3 cols, row 2 */}
          {rest.length > 0 && (
            <div
              style={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: `repeat(${rest.length}, 1fr)`,
                gap: 18,
              }}
            >
              {rest.map((article) => (
                <ArticleCard key={`${article.categorie}/${article.slug}`} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
