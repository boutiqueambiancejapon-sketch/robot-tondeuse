/**
 * ArticleCarousel — section home : 1er article en featured + grille pour les autres.
 * Server Component.
 */
import type { ArticleMeta } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

type Props = {
  articles: ArticleMeta[]
  showCategory?: boolean
}

export function ArticleCarousel({ articles, showCategory = false }: Props) {
  if (articles.length === 0) return null

  const displayed = articles.slice(0, 5)
  const [first, ...rest] = displayed

  return (
    <div>
      {/* Featured — 1er article avec image (HubArtwork ou featureImage) */}
      <div style={{ marginBottom: rest.length > 0 ? 'var(--space-6)' : 0 }}>
        <ArticleCard article={first} featured showCategory={showCategory} />
      </div>

      {/* Grille du reste — sans image */}
      {rest.length > 0 && (
        <div className="article-grid" role="list" aria-label="Articles">
          {rest.map((article, i) => (
            <div key={`${article.categorie}/${article.slug}`} role="listitem">
              <ArticleCard article={article} showCategory={showCategory} index={i + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
