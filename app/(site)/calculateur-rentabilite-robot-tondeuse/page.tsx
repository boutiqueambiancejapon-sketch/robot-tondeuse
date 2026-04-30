/**
 * /calculateur-rentabilite-robot-tondeuse — calculateur ROI robot vs thermique.
 * Slug long volontaire pour ranker sur "calculateur rentabilité robot tondeuse".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { RentabiliteCalculator } from '@/components/tools/RentabiliteCalculator'
import { niche } from '@/niche.config'
import { currentYear } from '@/lib/utils/year'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Calculateur rentabilité robot tondeuse ${year} | Gratuit`,
    description: `Robot tondeuse rentable ou pas ? Calculez en 2 min vos économies de temps, essence et entretien vs une tondeuse thermique. Amortissement sur 5 à 10 ans.`,
    alternates: { canonical: `${SITE_URL}/calculateur-rentabilite-robot-tondeuse` },
    openGraph: {
      title: `Calculateur rentabilité robot tondeuse ${year}`,
      description: `Calculez vos économies vs tondeuse thermique.`,
      url: `${SITE_URL}/calculateur-rentabilite-robot-tondeuse`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default function RentabilitePage() {
  return (
    <main id="main-content" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ maxWidth: 920, margin: '0 auto', padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
        <p style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)', marginBottom: 'var(--space-3)' }}>
          Outil · {currentYear()}
        </p>
        <h1 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Votre robot tondeuse est-il vraiment <em style={{ color: 'var(--copper)' }}>rentable</em> ?
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 660, lineHeight: 1.6 }}>
          Calculez en 2 minutes ce que coûte vraiment votre tonte sur les prochaines années — essence, entretien, et surtout votre temps. Comparez avec un robot tondeuse pour voir si l&rsquo;investissement vaut le coup.
        </p>
      </header>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-6) var(--space-12)' }}>
        <RentabiliteCalculator />
      </section>

      <section style={{ maxWidth: 920, margin: '0 auto', padding: '0 var(--space-6) var(--space-20)' }}>
        <div style={{ background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, padding: 'var(--space-8)' }}>
          <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(1.6rem, 2.4vw, 2rem)', fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            Comment on a calculé
          </h2>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: 'var(--space-5)' }}>
            <li><strong>Saison</strong> : 7 mois de tonte par an (mars-octobre), 4 tontes par mois.</li>
            <li><strong>Robot</strong> : prix achat + lames (50 €/an) + remplacement batterie (150 € tous les 5 ans) + électricité (~0,80 €/100 m²/mois).</li>
            <li><strong>Tondeuse classique</strong> : essence + vidanges/lames (~80 €/an) + votre temps valorisé.</li>
            <li><strong>Aire géodésique</strong> : utilisez le <Link href="/superficie" style={{ color: 'var(--copper)', textDecoration: 'underline' }}>calculateur de surface</Link> pour avoir la donnée exacte.</li>
          </ul>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 'var(--space-4)' }}>
            Les calculs sont indicatifs. Le coût réel dépend du modèle, de votre tarif électrique, et du prix de l&rsquo;essence à la pompe.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 'var(--space-6)', justifyContent: 'center' }}>
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
            href="/robot-tondeuse-ou-tondeuse-classique-comparatif"
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
            Robot vs thermique : guide complet
          </Link>
        </div>
      </section>
    </main>
  )
}
