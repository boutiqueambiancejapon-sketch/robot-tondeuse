/**
 * /marques — une ligne par marque (design V2) : nom, une phrase, lien vers sa page ou son guide.
 * Aucun logo : nous n'avons pas les droits sur ceux des fabricants.
 * Server Component · ISR 3600s.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { currentYear } from '@/lib/utils/year'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { getAllArticles, articleHref } from '@/lib/blog'
import { PageTitle } from '@/components/v2/PageTitle'

/** Marques sans page dédiée : la ligne renvoie vers le guide de leur gamme, s'il est publié. */
const GUIDES_DE_GAMME = [
  { name: 'Dreame', slug: 'quel-dreame-choisir-2026-guide-gamme' },
  { name: 'Ecovacs', slug: 'quel-ecovacs-goat-choisir-2026-guide-gamme' },
  { name: 'Mova', slug: 'quel-mova-choisir-2026-guide-gamme' },
  { name: 'Segway Navimow', slug: 'quel-segway-navimow-choisir-2026-guide-gamme' },
]
const CHOISIR_UNE_MARQUE = 'quelle-marque-robot-tondeuse-choisir-2026'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 3600

export function generateMetadata(): Metadata {
  const year = currentYear()
  return {
    title: `Toutes les marques de robots tondeuses en ${year}`,
    description: `Avis par marque : Mammotion, Husqvarna, Gardena, Worx, Bosch et plus. Avis indépendants, comparatifs, guides d'achat.`,
    alternates: { canonical: `${SITE_URL}/marques` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `Toutes les marques de robots tondeuses ${year}`,
      description: `Avis indépendants par marque.`,
      url: `${SITE_URL}/marques`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

export default function MarquesHub() {
  const brands = niche.categories.filter((c) => c.slug !== 'entretien-pelouse')
  const articles = getAllArticles()
  const guides = GUIDES_DE_GAMME.flatMap((g) => {
    const article = articles.find((a) => a.slug === g.slug)
    return article ? [{ name: g.name, article }] : []
  })
  const choisir = articles.find((a) => a.slug === CHOISIR_UNE_MARQUE)

  return (
    <main id="main-content" className="v2">
      <div className="wrap lst">
        <PageTitle
          title="Toutes les marques de robots tondeuses"
          pose="loupe"
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Marques' }]}
        />
        <p className="lede">
          De la référence suédoise aux nouveaux acteurs sans fil. Chaque marque a sa page, avec sa gamme, ses comparatifs et ses
          guides d’achat.
        </p>

        <div className="lignes lignes--first">
          {brands.map((b) => (
            <Link className="mini" href={`/choisir/${b.slug}`} key={b.slug}>
              <div>
                <h2>{b.label}</h2>
                {b.description ? <p>{b.description}</p> : null}
              </div>
            </Link>
          ))}
          {guides.map(({ name, article }) => (
            <Link className="mini" href={articleHref(article)} key={article.slug}>
              <div>
                <h2>{name}</h2>
                <p>{article.title}</p>
              </div>
            </Link>
          ))}
        </div>

        {choisir ? (
          <p className="lst-more">
            <Link className="lnk" href={articleHref(choisir)}>
              {choisir.title}
            </Link>
          </p>
        ) : null}
      </div>
    </main>
  )
}
