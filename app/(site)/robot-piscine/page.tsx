/**
 * /robot-piscine — page de la rubrique « Robots de piscine » (design V2, modèle : docs/maquette-v2/piscine.html).
 * Choix par type de bassin, puis les articles de la rubrique (content/articles/robot-piscine/).
 * Aucun modèle, prix ni note écrit ici : la page se remplit avec les articles publiés.
 * Server Component · ISR 3600s.
 */
import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { getPiscineArticles } from '@/lib/piscine'
import { BASSINS, PISCINE_DOSSIER, PISCINE_LABEL } from '@/lib/utils/piscine'
import { articleHref } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Mascotte } from '@/components/v2/Mascotte'
import { PageTitle } from '@/components/v2/PageTitle'
import { BassinPicker } from '@/components/v2/piscine/BassinPicker'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PAGE_URL = `${SITE_URL}/${PISCINE_DOSSIER}`
const TITLE = 'Quel robot pour votre piscine ?'
const DESCRIPTION =
  'Robots de piscine : choisissez d’abord selon votre bassin (hors-sol, enterré, ligne d’eau, sans fil), puis lisez nos classements et nos duels. Aucun robot essayé par nous.'

export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: `Robots de piscine : lequel choisir selon votre bassin | ${niche.siteName}` },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: niche.siteName, type: 'website' },
}

export default function RobotPiscinePage() {
  const articles = getPiscineArticles()
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: PISCINE_LABEL, item: PAGE_URL },
      ],
    },
    ...(articles.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: articles.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: a.title,
              url: `${SITE_URL}${articleHref(a)}`,
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <main id="main-content" className="v2">
        <section className="sec--pool pool-top">
          <div className="wrap">
            <PageTitle title={TITLE} pose="piscine" crumbs={[{ href: '/', label: 'Accueil' }, { label: PISCINE_LABEL }]} />
            <p className="lede">Le choix dépend du bassin avant de dépendre du robot. Commencez par là.</p>
          </div>
          <svg className="wave" viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-40 0H440V14C400 30 360 30 320 14S240 -2 200 14 120 30 80 14 0 -2 -40 14Z" />
          </svg>
        </section>

        <section className="sec pool-body">
          <div className="wrap stack-lg">
            <h2 className="h-lg">Quel type de piscine avez-vous ?</h2>
            <BassinPicker
              bassins={BASSINS}
              items={articles.map((a) => ({
                key: a.slug,
                bassins: a.bassins,
                node: <ArticleCard article={a} showCategory={false} as="h3" />,
              }))}
            />
            <div className="note-box">
              <p>
                <b>Même règle que pour les tondeuses.</b> Nous n’essayons aucun robot de piscine. Chaque article compare les fiches
                des fabricants et des sources publiées, citées dans le texte.
              </p>
            </div>
            <Link className="card door door--lime" href="/comparatifs">
              <Mascotte pose="jardinier" size={104} />
              <h2>Et la pelouse ?</h2>
              <p>Les classements de robots tondeuses, par surface et par budget.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
