/**
 * HomeMarques — section consolidée pour toutes les marques.
 * Brand cards avec photo + gradient overlay + dernier article.
 * Server Component.
 */

import Link from 'next/link'
import Image from 'next/image'
import { niche } from '@/niche.config'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'

/** Photo représentative par slug de marque */
const BRAND_IMAGES: Record<string, string> = {
  mammotion: '/images/robots/mammotion-yuka-mini-2-jardin.jpeg',
  husqvarna: '/images/robots/husqvarna-automower-310-mark-ii-jardin.jpeg',
  gardena:   '/images/robots/gardena-sileno-minimo-250-jardin.jpeg',
  worx:      '/images/robots/worx-landroid-vision-m800-jardin.jpeg',
  bosch:     '/images/robots/bosch-indego-jardin.jpeg',
}

export function HomeMarques() {
  const allArticles = getAllArticles()
  const brands = niche.categories.filter((c) => c.slug !== 'entretien-pelouse')

  const brandSlugs = new Set(brands.map((b) => b.slug))
  const featured = allArticles.find((a) => brandSlugs.has(a.categorie))

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

        {/* Grid des cartes marque avec photo */}
        <div className="brands-grid">
          {byBrand.map(({ brand, latest }) => {
            const imgSrc = BRAND_IMAGES[brand.slug]
            return (
              <Link
                key={brand.slug}
                href={`/choisir/${brand.slug}`}
                className="brand-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  background: 'var(--ivory)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  textDecoration: 'none',
                  overflow: 'hidden',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
              >
                {/* Zone image avec gradient overlay */}
                <div
                  style={{
                    height: 150,
                    position: 'relative',
                    overflow: 'hidden',
                    background: `color-mix(in srgb, ${brand.accent} 15%, var(--cream))`,
                    flexShrink: 0,
                  }}
                >
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={`${brand.label} robot tondeuse`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  )}
                  {/* Gradient sombre en bas pour le nom */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, color-mix(in srgb, ${brand.accent} 85%, #000) 0%, transparent 55%)`,
                    }}
                  />
                  {/* Nom de marque en overlay */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      left: 14,
                      color: '#fff',
                      fontFamily: 'var(--next-font-display), Georgia, serif',
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: '-0.015em',
                      lineHeight: 1,
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {brand.label}
                  </span>
                </div>

                {/* Contenu texte */}
                <div
                  style={{
                    padding: 'var(--space-4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    flex: 1,
                  }}
                >
                  {brand.description && (
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                      {brand.description}
                    </p>
                  )}
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
                  <span
                    style={{
                      marginTop: 'auto',
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: 11,
                      color: brand.accent,
                      letterSpacing: '0.06em',
                      fontWeight: 500,
                      paddingTop: 8,
                    }}
                  >
                    Voir tous les robots {brand.label} →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
