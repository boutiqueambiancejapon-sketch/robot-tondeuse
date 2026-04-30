/**
 * /superficie — calculateur de surface du jardin sur carte satellite.
 * Server Component qui importe le calculateur Leaflet en dynamic SSR-disabled.
 */

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { currentYear } from '@/lib/utils/year'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

const SurfaceMap = dynamic(
  () => import('@/components/tools/SurfaceMap').then((m) => m.SurfaceMap),
  { ssr: false, loading: () => <MapPlaceholder /> },
)

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return {
    title: `Calculateur de surface du jardin — ${niche.siteName}`,
    description: `Tracez votre jardin sur la carte satellite, on calcule la surface au m² près. Recommandation de robot tondeuse adapté à votre superficie.`,
    alternates: { canonical: `${SITE_URL}/superficie` },
    openGraph: {
      title: `Calculateur de surface du jardin`,
      description: `Tracez votre jardin et trouvez le robot adapté.`,
      url: `${SITE_URL}/superficie`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

function MapPlaceholder() {
  return (
    <div
      style={{
        height: 'min(70vh, 520px)',
        width: '100%',
        borderRadius: 16,
        border: '1px solid var(--border)',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontFamily: 'var(--next-font-mono), monospace',
        fontSize: 13,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      Chargement de la carte…
    </div>
  )
}

export default function SuperficiePage() {
  return (
    <main id="main-content" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ maxWidth: 920, margin: '0 auto', padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
        <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 'var(--space-3)' }}>
          Outil · {currentYear()}
        </p>
        <h1 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Calculer la <em style={{ color: 'var(--copper)' }}>surface</em> de votre jardin.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.6 }}>
          Tapez votre adresse, tracez le contour de votre pelouse sur la carte satellite, et obtenez la surface précise au m². On vous recommande ensuite le robot adapté.
        </p>
      </header>

      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 var(--space-6) var(--space-12)' }}>
        <SurfaceMap />
      </section>

      <section style={{ maxWidth: 920, margin: '0 auto', padding: '0 var(--space-6) var(--space-20)' }}>
        <div style={{ background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, padding: 'var(--space-8)' }}>
          <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(1.6rem, 2.4vw, 2rem)', fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            Quelle marge prendre ?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            Prenez <strong>20 à 30 % de marge</strong> sur la surface que vous tracez. Un robot annoncé 1 000 m² fonctionne mieux sur 700-800 m² réels (passages étroits, formes complexes, zones d&rsquo;ombre rallongent la couverture).
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            Le calcul ci-dessus est <strong>géodésique</strong> (m² réels au sol, prend en compte la courbure terrestre via turf.js).
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/quiz"
              style={{
                padding: '14px 22px',
                background: 'var(--copper)',
                color: 'var(--ivory)',
                borderRadius: 100,
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Trouver mon robot →
            </Link>
            <Link
              href="/comparatifs"
              style={{
                padding: '14px 22px',
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-strong)',
                borderRadius: 100,
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Voir les comparatifs
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
