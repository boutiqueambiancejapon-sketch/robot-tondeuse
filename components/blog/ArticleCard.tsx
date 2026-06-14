/**
 * ArticleCard — carte article style magazine.
 * Toujours une image : featureImage si fournie, sinon pool déterministe.
 * Server Component.
 */
import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_ACCENT, formatDate, articleHref } from '@/lib/blog'
import { HubArtwork, IMAGE_POOL, hashSlug } from './HubArtwork'

type Props = {
  article: ArticleMeta
  featured?: boolean
  showCategory?: boolean
  index?: number
}

/** Image de pool déterministe par slug */
function poolImage(slug: string): string {
  return IMAGE_POOL[hashSlug(slug) % IMAGE_POOL.length]
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
  const imgSrc = article.featureImage ?? poolImage(article.slug)

  if (featured) {
    return (
      <Link href={articleHref(article)} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          className="article-card article-card--featured"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--ivory)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: 380,
          }}
        >
          {/* Image : featureImage si fournie, sinon HubArtwork (pool) */}
          <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--cream)' }}>
            {article.featureImage ? (
              <Image
                src={article.featureImage}
                alt={article.title}
                width={960}
                height={720}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <HubArtwork slug={article.slug} variant="card" />
            )}
            {/* Halo coloré accent en surimpression */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in srgb, ${accent} 18%, transparent), transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
          </div>

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
                fontFamily: 'var(--next-font-display), Georgia, serif',
                fontSize: 'clamp(24px, 3.2vw, 38px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
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

          {/* Aurora separator */}
          <div
            className="aurora-line"
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent 0%, ${accent} 30%, color-mix(in srgb, ${accent} 50%, var(--accent-2)) 60%, transparent 100%)`,
              backgroundSize: '200% 100%',
              opacity: 0.5,
            }}
          />
        </article>
      </Link>
    )
  }

  // ── Standard card — toujours une image ──
  return (
    <Link href={articleHref(article)} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article
        className="article-card"
        style={{
          '--card-accent': accent,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--ivory)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        } as React.CSSProperties}
      >
        {/* Image — featureImage ou pool déterministe */}
        <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, height: 180 }}>
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Halo accent */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, color-mix(in srgb, ${accent} 30%, transparent) 0%, transparent 50%)`,
              pointerEvents: 'none',
            }}
          />
        </div>

        <div style={{ padding: 'var(--space-4) var(--space-4) var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
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
              fontFamily: 'var(--next-font-display), Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              lineHeight: 1.25,
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
            marginTop: 'auto', paddingTop: 'var(--space-2)', alignItems: 'center',
          }}>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} min</span>
          </div>
        </div>

        {/* Aurora separator */}
        <div
          className="aurora-line"
          aria-hidden="true"
          style={{
            height: '2px',
            background: `linear-gradient(90deg, transparent 0%, ${accent} 30%, color-mix(in srgb, ${accent} 50%, var(--accent-2)) 60%, transparent 100%)`,
            backgroundSize: '200% 100%',
            opacity: 0.5,
          }}
        />
      </article>
    </Link>
  )
}
