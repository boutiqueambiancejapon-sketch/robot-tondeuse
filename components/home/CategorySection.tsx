/**
 * CategorySection — section home par catégorie, version éditoriale DA.
 * Header avec huge number, filet coloré, ScrollReveal sur le carousel.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCarousel } from './ArticleCarousel'
import { categoryAccent } from '@/niche.config'
import { COMPARATEURS } from '@/lib/comparateur'
import { FadeIn } from '@/components/motion/FadeIn'
import { Parallax } from '@/components/motion/Parallax'

type Props = {
  slug: string
  label: string
  index: number
}

export function CategorySection({ slug, label, index }: Props) {
  const accent = categoryAccent(index)
  const articles = getAllArticles().filter((a) => a.categorie === slug).slice(0, 6)
  const hasComparateur = slug in COMPARATEURS
  const number = String(index + 1).padStart(2, '0')

  return (
    <section
      style={{
        position: 'relative',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(var(--space-16), 8vw, var(--space-20)) 0',
        overflow: 'hidden',
      }}
    >
      {/* Huge number in background */}
      <Parallax
        speed={0.4}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-2vw',
          transform: 'translateY(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(14rem, 28vw, 26rem)',
            fontWeight: 700,
            lineHeight: 0.8,
            letterSpacing: '-0.08em',
            color: `color-mix(in srgb, ${accent} 5%, transparent)`,
            userSelect: 'none',
          }}
        >
          {number}
        </div>
      </Parallax>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
        }}
      >
        <FadeIn>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-10)',
            }}
          >
            <div className="rule-vertical" style={{ maxWidth: '720px' }}>
              <div
                style={{
                  fontFamily: 'var(--next-font-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: accent,
                  marginBottom: 'var(--space-3)',
                }}
              >
                {number} — {label.toUpperCase()}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  lineHeight: 0.95,
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                Guides d&rsquo;achat &amp;<br />
                <span style={{ color: accent }}>astuces {label.toLowerCase()}</span>
              </h2>
            </div>

            {hasComparateur && (
              <Link
                href={`/comparer/${slug}`}
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fff',
                  textDecoration: 'none',
                  background: accent,
                  borderRadius: 'var(--radius-full)',
                  padding: '12px 22px',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 10px 30px -10px ${accent}`,
                }}
              >
                Comparer {label} →
              </Link>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.8}>
          {articles.length > 0 ? (
            <ArticleCarousel articles={articles} />
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Nos guides {label.toLowerCase()} arrivent bientôt.
            </p>
          )}
        </FadeIn>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: 'var(--space-6)',
          }}
        >
          <Link
            href={`/blog/${slug}`}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              borderBottom: `1px solid ${accent}`,
              paddingBottom: '4px',
            }}
          >
            Tous les articles {label.toLowerCase()} →
          </Link>
        </div>
      </div>
    </section>
  )
}
