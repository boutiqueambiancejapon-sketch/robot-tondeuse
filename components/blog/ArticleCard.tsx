/**
 * ArticleCard — carte article style magazine.
 * Fond surface, tag coloré par type, hover glow + lift.
 * Sans images : le type de contenu et la couleur font le travail visuel.
 * Server Component.
 */
import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT, formatDate, articleHref } from '@/lib/blog'

type Props = {
  article: ArticleMeta
  featured?: boolean
  showCategory?: boolean
  index?: number
}

/** Déduit le type d'article à partir du slug et de la catégorie. */
function articleType(article: ArticleMeta): { label: string; icon: string } {
  const s = article.slug
  if (s.startsWith('test-') || s.includes('-avis')) return { label: 'Test', icon: '🔬' }
  if (s.includes('-vs-') || s.includes('comparatif')) return { label: 'Comparatif', icon: '⚖️' }
  if (article.categorie === 'entretien-pelouse') return { label: 'Entretien', icon: '🌱' }
  return { label: 'Guide', icon: '📖' }
}

export function ArticleCard({ article, featured = false, showCategory = true, index }: Props) {
  const accent = CATEGORY_ACCENT[article.categorie] ?? 'var(--accent-1)'
  const label = CATEGORY_LABELS[article.categorie] ?? article.categorie
  const type = articleType(article)

  if (featured) {
    return (
      <Link href={articleHref(article)} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          className="article-card article-card--featured"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: article.featureImage ? '1fr 1fr' : '1fr',
            transition: 'border-color 250ms ease, box-shadow 250ms ease',
          }}
        >
          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse 80% 80% at 10% 20%, color-mix(in srgb, ${accent} 12%, transparent) 0%, transparent 70%)`,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {article.featureImage && (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Image
                src={article.featureImage}
                alt={article.title}
                width={960}
                height={540}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
                }}
              />
            </div>
          )}

          <div style={{ position: 'relative', zIndex: 1, padding: 'var(--space-8) var(--space-8) var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-3)' }}>
            {/* Type + Category pills */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                color: accent, padding: '3px 10px', borderRadius: 'var(--radius-full)',
              }}>
                {type.label}
              </span>
              {showCategory && (
                <span style={{
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', padding: '3px 10px', borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                }}>
                  {label}
                </span>
              )}
            </div>

            <h2
              className="article-card-title"
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                margin: 0,
                textWrap: 'balance',
                transition: 'color 200ms ease',
              }}
            >
              {article.title}
            </h2>

            {article.description && (
              <p style={{
                fontSize: 'clamp(13px, 1.3vw, 15px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '540px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {article.description}
              </p>
            )}

            <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '12px', color: 'var(--text-muted)', alignItems: 'center', marginTop: 'var(--space-2)' }}>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTimeMin} min de lecture</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // ── Standard card ──
  return (
    <Link href={articleHref(article)} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article
        className="article-card"
        style={{
          '--card-accent': accent,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease',
        } as React.CSSProperties}
      >
        {article.featureImage ? (
          <Image
            src={article.featureImage}
            alt={article.title}
            width={480}
            height={270}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            }}
          />
        ) : (
          /* Visual band — colored accent stripe at top */
          <div
            aria-hidden="true"
            style={{
              height: '4px',
              background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 40%, transparent))`,
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            }}
          />
        )}

        <div style={{ padding: 'var(--space-5) var(--space-5) var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {/* Type + Category pills */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '3px',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
              color: accent, padding: '2px 8px', borderRadius: 'var(--radius-full)',
            }}>
              {type.label}
            </span>
            {showCategory && (
              <span style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
              }}>
                {label}
              </span>
            )}
          </div>

          <h2
            className="article-card-title"
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '17px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              flex: 1,
              margin: 0,
              textWrap: 'balance',
              transition: 'color 200ms ease',
            }}
          >
            {article.title}
          </h2>

          {article.description && (
            <p style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {article.description}
            </p>
          )}

          <div style={{
            display: 'flex', gap: 'var(--space-3)', fontSize: '11px', color: 'var(--text-muted)',
            marginTop: 'auto', paddingTop: 'var(--space-3)', alignItems: 'center',
            borderTop: '1px solid var(--border)',
          }}>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} min</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
