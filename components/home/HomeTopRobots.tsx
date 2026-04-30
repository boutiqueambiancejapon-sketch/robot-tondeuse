/**
 * HomeTopRobots — section "Le podium 2026" Atelier Vert.
 * 3 cartes robots en évidence avec badge + rang + image stylisée + specs + CTA.
 * Server Component — lit les YAML produits depuis content/produits.
 */

import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Product } from '@/lib/products'
import { getPrimaryLink } from '@/lib/products'
import { categoryAccents } from '@/niche.config'

// Top 3 produits mis en avant (slug ordonné — le 1er est notre choix éditorial #1)
const TOP_3_SLUGS = [
  'husqvarna-automower-310-mark-ii',     // La fiabilité Husqvarna (filaire, 1000 m²)
  'mammotion-yuka-mini-2-1000',          // LiDAR entrée de gamme (sans fil, 1000 m²)
  'gardena-sileno-minimo-250',           // Le plus silencieux (filaire, 250 m²)
]

function getProductWithSlug(slug: string): (Product & { slug: string }) | null {
  const filePath = path.join(process.cwd(), 'content/produits', `${slug}.yaml`)
  if (!fs.existsSync(filePath)) return null
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(`---\n${raw}\n---`)
    const product = data as Product
    if (product.active === false) return null
    return { ...product, slug }
  } catch {
    return null
  }
}

export function HomeTopRobots() {
  const products = TOP_3_SLUGS
    .map(getProductWithSlug)
    .filter((p): p is Product & { slug: string } => p !== null)

  if (products.length === 0) return null

  const accents = categoryAccents()

  return (
    <section style={{ background: 'var(--cream)', padding: 'var(--space-24) 0', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--moss)',
                marginBottom: 'var(--space-3)',
              }}
            >
              03 — Le podium 2026
            </p>
            <h2
              style={{
                fontFamily: 'var(--next-font-display), Georgia, serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Nos 3 robots <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>coups de cœur</em>
            </h2>
          </div>
          <Link
            href="/comparatifs"
            style={{
              padding: '12px 22px',
              border: '1px solid var(--border-strong)',
              borderRadius: 100,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'background 150ms ease, border-color 150ms ease',
            }}
            className="top-robots-cta"
          >
            Voir tous les comparatifs →
          </Link>
        </div>

        <div className="top-robots-grid">
          {products.map((p, i) => {
            const accent = accents[p.categorie] ?? 'var(--copper)'
            const buyUrl = getPrimaryLink(p)
            return (
              <article
                key={p.slug}
                className="top-robot-card"
                style={{
                  position: 'relative',
                  background: 'var(--ivory)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
              >
                {p.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 2,
                      padding: '5px 11px',
                      background: 'var(--copper)',
                      color: 'var(--ivory)',
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      borderRadius: 100,
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    ★ {p.badge}
                  </span>
                )}
                <span
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 2,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--forest-deep)',
                    color: 'var(--ivory)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--next-font-display), Georgia, serif',
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                  aria-label={`Position ${i + 1}`}
                >
                  {i + 1}
                </span>

                {/* Visual stylisé */}
                <div
                  style={{
                    height: 220,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 18%, transparent) 0%, color-mix(in srgb, ${accent} 6%, transparent) 100%)`,
                    position: 'relative',
                  }}
                >
                  <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
                    <ellipse cx="80" cy="80" rx="64" ry="50" fill={accent} opacity="0.85" />
                    <ellipse cx="80" cy="74" rx="54" ry="40" fill={accent} opacity="0.55" />
                    <rect x="65" y="52" width="30" height="5" rx="2" fill="var(--copper)" />
                    <circle cx="80" cy="78" r="6" fill="var(--sage-light)" />
                    <text x="80" y="138" textAnchor="middle" fontFamily="var(--next-font-mono), monospace" fontSize="9" letterSpacing="0.12em" fill={accent} opacity="0.7">
                      {p.categorie.toUpperCase()}
                    </text>
                  </svg>
                </div>

                <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>
                      {p.categorie}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--next-font-display), Georgia, serif',
                        fontSize: 'clamp(20px, 2vw, 26px)',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        color: 'var(--text-primary)',
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </h3>
                    {p.hook && (
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
                        {p.hook}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--next-font-mono), monospace',
                        fontSize: 24,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {p.prix}
                    </span>
                    {buyUrl && (
                      <a
                        href={buyUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        style={{
                          padding: '10px 16px',
                          background: 'var(--copper)',
                          color: 'var(--ivory)',
                          borderRadius: 100,
                          fontSize: 13,
                          fontWeight: 500,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 0 0 #8c4a2c',
                        }}
                      >
                        Meilleur prix →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
