/**
 * /comparatifs — tous les comparatifs, regroupés par besoin (design V2).
 * Par surface, par budget, par technologie, puis les duels. Renvoi vers le quiz.
 * Server Component · ISR 3600s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { currentYear } from '@/lib/utils/year'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { Mascotte } from '@/components/v2/Mascotte'
import { GroupeLignes } from '@/components/v2/listes/GroupeLignes'
import { getGroupes, countRobots, TOP_HREF } from '@/components/v2/listes/comparatifs-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Comparatifs robots tondeuses ${year} — top sélections, technologie, budget`,
    description: `Tous nos comparatifs : meilleur robot tondeuse ${year}, sans fil périphérique, silencieux, pas cher, haut de gamme. Avis indépendants.`,
    alternates: { canonical: `${SITE_URL}/comparatifs` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Comparatifs robots tondeuses ${year}`,
      description: `Top sélections notées, par technologie et par budget.`,
      url: `${SITE_URL}/comparatifs`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default function ComparatifsHub() {
  const groupes = getGroupes()

  return (
    <main id="main-content" className="v2">
      <div className="wrap lst">
        <PageTitle
          title="Tous les comparatifs robots tondeuses"
          pose="podium"
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Comparatifs' }]}
        />
        <p className="lede">
          {countRobots()} robots comparés sur fiche et sources publiées. Choisissez par surface, par budget ou par technologie, ou
          commencez par{' '}
          <Link className="lnk" href={TOP_HREF}>
            le classement {currentYear()}
          </Link>
          .
        </p>
        <nav aria-label="Aller à un groupe de comparatifs" className="chips">
          {groupes.map((g) => (
            <a className="chip" href={`#${g.id}`} key={g.id}>
              {g.title}
            </a>
          ))}
        </nav>

        {groupes.map((g) => (
          <GroupeLignes groupe={g} key={g.id} />
        ))}

        <Link className="door door--lime lst-door" href="/quiz">
          <Mascotte pose="loupe" size={104} />
          <h2>Vous hésitez encore ?</h2>
          <p>Quelques questions sur votre jardin, et le quiz vous conseille un robot.</p>
        </Link>
      </div>
    </main>
  )
}
