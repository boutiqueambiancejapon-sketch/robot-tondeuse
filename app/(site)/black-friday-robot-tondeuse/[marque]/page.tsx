/**
 * /black-friday-robot-tondeuse/[marque] — offres Black Friday d'une marque.
 * Données : lib/promos.ts. Sans offre confirmée, la page l'écrit et liste les robots avec leur prix indicatif.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { BLACK_FRIDAY, dateFr, getBlackFridayBrands, getBrandRobots, getPromoBrand } from '@/lib/promos'
import { Faq } from '@/components/promos/Faq'
import { JsonLd } from '@/components/promos/JsonLd'
import { Alerte } from '@/components/promos/Alerte'
import { Offres } from '@/components/promos/Offres'
import { RobotsMarque } from '@/components/promos/RobotsMarque'
import { QuandBaisse, RegleBaisse } from '@/components/promos/Sections'
import { faqBlackFriday } from '@/components/promos/textes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const BASE = '/black-friday-robot-tondeuse'

export const revalidate = 86400
export const dynamicParams = false

type Params = Promise<{ marque: string }>

export function generateStaticParams() {
  return getBlackFridayBrands().map((b) => ({ marque: b.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { marque } = await params
  const brand = getPromoBrand(marque)
  if (!brand) return {}
  const date = dateFr(brand.checkedAt)
  const n = brand.offers.length
  const title = `Black Friday ${brand.label} ${BLACK_FRIDAY.year} : les offres sur les robots tondeuses`
  const description = n === 0
    ? `Aucune offre Black Friday ${brand.label} confirmée au ${date}. Notre règle pour vérifier une baisse et le prix indicatif des robots tondeuses ${brand.label} chez les marchands.`
    : `${n} offre${n > 1 ? 's' : ''} Black Friday ${brand.label} confirmée${n > 1 ? 's' : ''} au ${date}, comparée${n > 1 ? 's' : ''} au plus bas prix des 30 jours précédents.`
  const url = `${SITE_URL}${BASE}/${brand.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { images: DEFAULT_OG_IMAGES, title, description, url, siteName: niche.siteName, type: 'website' },
  }
}

export default async function BlackFridayMarquePage({ params }: { params: Params }) {
  const { marque } = await params
  const brand = getPromoBrand(marque)
  const robots = brand ? getBrandRobots(brand) : []
  if (!brand || robots.length === 0) notFound()
  const m = brand.label
  const date = dateFr(brand.checkedAt)
  const bf = dateFr(BLACK_FRIDAY.date)
  const faq = faqBlackFriday(bf, dateFr(BLACK_FRIDAY.cyberMonday), m)
  const path = `${BASE}/${brand.slug}`

  return (
    <main id="main-content" className="v2">
      <JsonLd
        siteUrl={SITE_URL}
        crumbs={[{ name: 'Accueil', path: '' }, { name: 'Black Friday', path: BASE }, { name: m, path }]}
        faq={faq}
      />
      <div className="wrap promo-page">
        <PageTitle
          title={`Black Friday ${m} ${BLACK_FRIDAY.year} : quelles offres sur les robots tondeuses ?`}
          pose="prix"
          meta={`Dernier contrôle le ${date}`}
          crumbs={[{ href: '/', label: 'Accueil' }, { href: BASE, label: 'Black Friday' }, { label: m }]}
        />
        <div className="tldr">
          <p>
            {brand.offers.length === 0
              ? `Aucune offre Black Friday ${m} confirmée au ${date}.`
              : `${brand.offers.length} offre${brand.offers.length > 1 ? 's' : ''} Black Friday ${m} confirmée${brand.offers.length > 1 ? 's' : ''} au ${date}.`}
          </p>
        </div>

        <div className="stack-lg promo-blocs">
          <section className="prose" aria-labelledby="offres">
            <h2 id="offres">Y a-t-il une offre Black Friday {m} en ce moment ?</h2>
            {brand.offers.length === 0 ? (
              <p>
                Le Black Friday {BLACK_FRIDAY.year} tombe le vendredi {bf}. Au {date}, nous n’avons confirmé aucune offre sur un robot tondeuse {m}. Les prix ci-dessous sont ceux de nos fiches, sans date de relevé.
              </p>
            ) : (
              <p>Ces offres ont été comparées au plus bas prix des 30 jours précédents, chez le même marchand.</p>
            )}
          </section>
          {brand.offers.length > 0 ? <Offres offers={brand.offers} /> : null}

          <section aria-labelledby="robots" className="stack">
            <h2 id="robots" className="h-md">Quel est le prix des robots tondeuses {m} avant le Black Friday ?</h2>
            <RobotsMarque robots={robots} />
            <p>
              <Link className="lnk" href={`/code-promo/${brand.slug}`}>Code promo {m} : ce qui existe</Link>
            </p>
          </section>

          <RegleBaisse />
          <QuandBaisse marque={m} note={brand.note} />

          <section aria-labelledby="faq-titre">
            <h2 id="faq-titre" className="h-md promo-faq-titre">Questions fréquentes sur le Black Friday {m}</h2>
            <Faq items={faq} />
          </section>
          <Alerte
            titre={`Être prévenu d’une offre ${m} confirmée`}
            texte="Inscrivez-vous à la lettre du jardin, un e-mail par mois au plus. Nous y signalons les baisses de prix qui ont passé notre contrôle."
            source={`black-friday-${brand.slug}`}
          />
          <p>
            <Link className="btn btn--ivory btn--full" href={BASE}>Le Black Friday des autres marques</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
