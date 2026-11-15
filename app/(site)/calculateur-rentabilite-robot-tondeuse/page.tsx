/**
 * /calculateur-rentabilite-robot-tondeuse — calculateur ROI robot vs thermique.
 * Slug long volontaire pour ranker sur "calculateur rentabilité robot tondeuse".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { RentabiliteCalculator } from '@/components/tools/RentabiliteCalculator'
import { niche } from '@/niche.config'
import { currentYear } from '@/lib/utils/year'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Calculateur rentabilité robot tondeuse ${year} | Gratuit`,
    description: `Robot tondeuse rentable ou pas ? Calculez en 2 min vos économies de temps, essence et entretien vs une tondeuse thermique. Amortissement sur 5 à 10 ans.`,
    alternates: { canonical: `${SITE_URL}/calculateur-rentabilite-robot-tondeuse` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
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
    <main id="main-content" className="v2">
      <div className="wrap tool">
        <div className="tool-in">
          <PageTitle
            title="Votre robot tondeuse est-il vraiment rentable ?"
            pose="calcul"
            crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Calculateur de rentabilité' }]}
            meta="Calculateur gratuit, sans inscription"
          />
          <p className="lede">
            Calculez en 2 minutes ce que coûte vraiment votre tonte sur les prochaines années : essence, entretien, et surtout votre temps. Comparez avec un robot tondeuse pour voir si l’investissement vaut le coup.
          </p>

          <section className="sec">
            <RentabiliteCalculator />
          </section>

          <section className="prose">
            <h2>Comment on a calculé</h2>
            <ul className="stack">
              <li><strong>Saison</strong> : 7 mois de tonte par an (mars-octobre), 4 tontes par mois.</li>
              <li><strong>Robot</strong> : prix achat + lames (50 €/an) + remplacement batterie (150 € tous les 5 ans) + électricité (~0,80 €/100 m²/mois).</li>
              <li><strong>Tondeuse classique</strong> : essence + vidanges/lames (~80 €/an) + votre temps valorisé.</li>
              <li><strong>Aire géodésique</strong> : utilisez le <Link href="/superficie" className="lnk">calculateur de surface</Link> pour avoir la donnée exacte.</li>
            </ul>
            <p className="small muted">
              Les calculs sont indicatifs. Le coût réel dépend du modèle, de votre tarif électrique, et du prix de l’essence à la pompe.
            </p>
            <p>
              Pour aller plus loin :{' '}
              <Link className="lnk" href="/robot-tondeuse-ou-tondeuse-classique-comparatif">
                Robot vs thermique : guide complet
              </Link>
              {' · '}
              <Link className="lnk" href="/quiz">
                Trouver mon robot avec le quiz
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
