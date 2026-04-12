/**
 * RecentArticles — éditorial. Featured XL + grille.
 * Enveloppé dans FadeIn + Stagger. Header éditorial massif.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export function RecentArticles() {
  const articles = getAllArticles().slice(0, 5)
  if (articles.length === 0) return null

  const [featured, ...rest] = articles

  return (
    <section
      style={{
        position: 'relative',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(var(--space-16), 10vw, var(--space-24)) var(--space-6)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <FadeIn>
          <div className="section-head-editorial">
            <div>
              <span className="pill-accent" style={{ marginBottom: 'var(--space-4)' }}>
                · Éditorial
              </span>
              <h2>
                Derniers articles<br />
                <span style={{ color: 'var(--accent-1)' }}>publiés</span>
              </h2>
            </div>
            <Link
              href="/blog"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent-1)',
                paddingBottom: '4px',
                marginLeft: 'auto',
                alignSelf: 'flex-end',
                whiteSpace: 'nowrap',
              }}
            >
              Tout le blog →
            </Link>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.08}>
          <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
            <StaggerItem>
              <ArticleCard article={featured} featured />
            </StaggerItem>

            {rest.length > 0 && (
              <ul
                role="list"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 'var(--space-6)',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {rest.map((article) => (
                  <StaggerItem as="li" key={`${article.categorie}/${article.slug}`}>
                    <ArticleCard article={article} />
                  </StaggerItem>
                ))}
              </ul>
            )}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
