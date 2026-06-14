/**
 * HomeTopRobots — section "Le podium 2026" Atelier Vert.
 * 3 cartes robots avec photo jardin en contexte + badge + specs + CTA.
 * Server Component — lit les YAML produits depuis content/produits.
 */

import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Product } from '@/lib/products'
import { getPrimaryLink } from '@/lib/products'
import { categoryAccents } from '@/niche.config'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

const TOP_3_SLUGS = [
  'husqvarna-automower-310-mark-ii',
  'mammotion-yuka-mini-2-1000',
  'gardena-sileno-minimo-250',
]

const ROBOT_IMAGES: Record<string, string> = {
  'husqvarna-automower-310-mark-ii': '/images/robots/husqvarna-automower-310-mark-ii-jardin.jpeg',
  'mammotion-yuka-mini-2-1000':      '/images/robots/mammotion-yuka-mini-2-jardin.jpeg',
  'gardena-sileno-minimo-250':       '/images/robots/gardena-sileno-minimo-250-jardin.jpeg',
}

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
    <section
      style={{
        background: 'var(--cream)',
        padding: 'clamp(56px, 7vw, 104px) 0',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(28px, 4vw, 80px)' }}>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 10 }}>
              03 — Le podium 2026
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--ink)' }}>
              Nos 3 robots <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>coups de cœur</em>
            </h2>
          </div>
          <Link
            href="/comparatifs"
            style={{ padding: '12px 22px', border: '1.5px solid var(--border-strong)', borderRadius: 100, color: 'var(--text-primary)', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'background 150ms ease, border-color 150ms ease' }}
            className="top-robots-cta"
          >
            Voir tous les comparatifs →
          </Link>
        </div>

        <div className="top-robots-grid">
          {products.map((p, i) => {
            const accent = accents[p.categorie] ?? 'var(--copper)'
            const buyUrl = getPrimaryLink(p)
            const rankLabels = ['#1 · Notre choix', '#2 · Excellent', '#3 · À considérer']
            const imgSrc = ROBOT_IMAGES[p.slug]

            return (
              <article
                key={p.slug}
                className="top-robot-card"
                style={{ position: 'relative', background: 'var(--ivory)', border: '1px solid var(--line-soft)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)' }}
              >
                {p.badge && (
                  <span style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, padding: '5px 12px', background: 'var(--copper)', color: 'var(--ivory)', fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, letterSpacing: '0.1em', borderRadius: 100, textTransform: 'uppercase', fontWeight: 700 }}>
                    ★ {p.badge}
                  </span>
                )}

                <span
                  style={{ position: 'absolute', top: 14, right: 14, zIndex: 2, padding: '5px 12px', borderRadius: 100, background: i === 0 ? 'var(--forest-deep)' : 'rgba(20,36,26,0.12)', color: i === 0 ? 'var(--ivory)' : 'var(--forest-deep)', fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}
                  aria-label={rankLabels[i]}
                >
                  {rankLabels[i]}
                </span>

                <div
                  style={{ height: 210, position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 14%, transparent) 0%, color-mix(in srgb, ${accent} 5%, transparent) 100%)`, borderBottom: '1px solid var(--line-soft)' }}
                >
                  {imgSrc ? (
                    <Image src={imgSrc} alt={`${p.name} — vue jardin en contexte`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover' }} priority={i === 0} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="150" height="150" viewBox="0 0 160 160" aria-hidden="true">
                        <ellipse cx="80" cy="80" rx="64" ry="50" fill={accent} opacity="0.82" />
                        <ellipse cx="80" cy="74" rx="54" ry="40" fill={accent} opacity="0.5" />
                        <rect x="65" y="52" width="30" height="5" rx="2" fill="var(--copper)" />
                        <circle cx="80" cy="78" r="6" fill="var(--sage-light)" />
                      </svg>
                    </div>
                  )}
                </div>

                <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 10, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
                      {p.categorie}
                    </div>
                    <h3 style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.2 }}>
                      {p.name}
                    </h3>
                    {p.hook && (
                      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.55 }}>
                        {p.hook}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 10, gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 22, fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
                      {p.prix}
                    </span>
                    {/* CTA — AffiliateLink garantit le tag d’affiliation */}
                    {buyUrl && (
                      <AffiliateLink
                        href={buyUrl}
                        className="btn btn-primary"
                        style={{ padding: '10px 18px', background: 'var(--copper)', color: 'var(--ivory)', borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        Meilleur prix →
                      </AffiliateLink>
                    )}
                  </div>

                  <Link href={`/tests/${p.slug}`} style={{ fontSize: 12, color: 'var(--moss)', fontWeight: 600, textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 3, alignSelf: 'flex-start' }}>
                    Lire le test complet →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
