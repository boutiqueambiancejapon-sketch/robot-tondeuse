/**
 * /superficie — calculateur de surface du jardin sur carte satellite.
 * Server Component ; la carte Leaflet se charge dans le navigateur (SurfaceMap).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { SurfaceMap } from '@/components/tools/SurfaceMap'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `Calculateur de surface du jardin — ${niche.siteName}` },
    description: `Tracez votre jardin sur la carte satellite, on calcule la surface au m² près. Recommandation de robot tondeuse adapté à votre superficie.`,
    alternates: { canonical: `${SITE_URL}/superficie` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Calculateur de surface du jardin`,
      description: `Tracez votre jardin et trouvez le robot adapté.`,
      url: `${SITE_URL}/superficie`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default function SuperficiePage() {
  return (
    <main id="main-content" className="v2">
      <div className="wrap tool">
        <div className="tool-in">
          <PageTitle
            title="Calculer la surface de votre jardin"
            pose="calcul"
            crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Surface du jardin' }]}
            meta="Outil gratuit, sans inscription"
          />
          <p className="lede">
            Tapez votre adresse, tracez le contour de votre pelouse sur la carte satellite, et obtenez la surface précise au m². On vous recommande ensuite le robot adapté.
          </p>

          <section className="sec">
            <SurfaceMap />
          </section>

          <section className="prose">
            <h2>Quelle marge prendre ?</h2>
            <p>
              {'Prenez '}<strong>20 à 30 % de marge</strong>{' sur la surface que vous tracez. Un robot annoncé 1 000 m² fonctionne mieux sur 700-800 m² réels (passages étroits, formes complexes, zones d’ombre rallongent la couverture).'}
            </p>
            <p>
              {'Le calcul ci-dessus est '}<strong>géodésique</strong>{' (m² réels au sol, prend en compte la courbure terrestre via turf.js).'}
            </p>
            <p>
              Pour un conseil selon la pente et le budget,{' '}
              <Link className="lnk" href="/quiz">
                répondez au quiz
              </Link>
              . Tous les classements sont dans{' '}
              <Link className="lnk" href="/comparatifs">
                les comparatifs
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
