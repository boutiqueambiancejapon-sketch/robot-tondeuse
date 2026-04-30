/**
 * HomeMarques — section consolidée pour toutes les marques.
 * Featured : article le plus récent (ArticleCard featured avec image).
 * Grid : 1 carte par marque avec accent color + dernier article.
 * Server Component.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'
import { getAllArticles, articleHref } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

export function HomeMarques() {
  const allArticles = getAllArticles()
  const brands = niche.categories.filter((c) => c.slug !== 'entretien-pelouse')

  // Featured : le plus récent toutes marques confondues (parmi les marques affichées)
  const brandSlugs = new Set(brands.map((b) => b.slug))
  const featured = allArticles.find((a) => brandSlugs.has(a.categorie))

  // Pour chaque marque : son dernier article
  const byBrand = brands.map((b) => {
    const latest = allArticles.find((a) => a.categorie === b.slug && a.slug !== featured?.slug)
    return { brand: b, latest }
  })

  return (
    <section style={{ background: 'var(--paper)', padding: 'var(--space-24) 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-10)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 'var(--space-3)' }}>
              06 — Toutes les marques
            </p>
            <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text-primary)', margin: 0 }}>
              Les marques que <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>nous testons</em>.
            </h2>
          </div>
          <Link
            href="/marques"
            style={{
              padding: '12px 22px',
              border: '1px solid var(--border-strong)',
              borderRadius: 100,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
            }}
            className="hub-section-cta"
          >
            Toutes les marques →
          </Link>
        </div>

        {/* Featured article : le plus récent */}
        {featured && (
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <ArticleCard article={featured} featured showCategory />
          </div>
        )}

        {/* Grid des cartes marque */}
        <div className="brands-grid">
          {byBrand.map(({ brand, latest }) => (
            <Link
              key={brand.slug}
              href={`/choisir/${brand.slug}`}
              className="brand-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                padding: 'var(--space-5)',
                background: 'var(--ivory)',
                border: '1px solid var(--border)',
                borderTop: `3px solid ${brand.accent}`,
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'transform 200ms ease, border-color 200ms ease',
              }}
            >
              <div>
                <h3 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 22, fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)', margin: 0 }}>
                  {brand.label}
                </h3>
                {brand.description && (
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                    {brand.description}
                  </p>
                )}
              </div>
              {latest && (
                <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--line-soft)' }}>
                  <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 9, color: brand.accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>
                    Dernier test
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4, margin: 0, fontWeight: 500 }}>
                    {latest.title}
                  </p>
                </div>
              )}
              <span style={{ marginTop: 'auto', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: brand.accent, letterSpacing: '0.06em', fontWeight: 500, paddingTop: 8 }}>
                Voir tous les robots {brand.label} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
