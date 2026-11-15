/**
 * /black-friday-robot-tondeuse — page mère des offres Black Friday.
 * Données : lib/promos.ts. Aucune offre inventée : sans offre confirmée, la page l'écrit dès la première ligne.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { BLACK_FRIDAY, PROMOS_CHECKED_AT, dateFr, getBlackFridayBrands, getBrandRobots } from '@/lib/promos'
import { Faq } from '@/components/promos/Faq'
import { JsonLd } from '@/components/promos/JsonLd'
import { Alerte } from '@/components/promos/Alerte'
import { MarquesListe } from '@/components/promos/MarquesListe'
import { Offres } from '@/components/promos/Offres'
import { QuandBaisse, RegleBaisse } from '@/components/promos/Sections'
import { faqBlackFriday } from '@/components/promos/textes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PATH = '/black-friday-robot-tondeuse'
const DATE = dateFr(PROMOS_CHECKED_AT)
const BF = dateFr(BLACK_FRIDAY.date)
const TITLE = `Black Friday robot tondeuse ${BLACK_FRIDAY.year} : les offres vérifiées, marque par marque`
const FAQ = faqBlackFriday(BF, dateFr(BLACK_FRIDAY.cyberMonday))

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const n = getBlackFridayBrands().reduce((t, b) => t + b.offers.length, 0)
  const description = n === 0
    ? `Black Friday robot tondeuse ${BLACK_FRIDAY.year} : aucune offre confirmée au ${DATE}. Notre règle pour vérifier une baisse et le prix indicatif des robots, marque par marque.`
    : `Black Friday robot tondeuse ${BLACK_FRIDAY.year} : ${n} offre${n > 1 ? 's' : ''} confirmée${n > 1 ? 's' : ''} au ${DATE}, comparée${n > 1 ? 's' : ''} au plus bas prix des 30 jours précédents.`
  return {
    title: TITLE,
    description,
    alternates: { canonical: `${SITE_URL}${PATH}` },
    openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description, url: `${SITE_URL}${PATH}`, siteName: niche.siteName, type: 'website' },
  }
}

export default function BlackFridayPage() {
  const brands = getBlackFridayBrands()
  const offers = brands.flatMap((b) => b.offers)
  return (
    <main id="main-content" className="v2">
      <JsonLd siteUrl={SITE_URL} crumbs={[{ name: 'Accueil', path: '' }, { name: 'Black Friday', path: PATH }]} faq={FAQ} />
      <div className="wrap promo-page">
        <PageTitle
          title={`Black Friday robot tondeuse ${BLACK_FRIDAY.year}`}
          pose="prix"
          meta={`Dernier contrôle le ${DATE}`}
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Black Friday' }]}
        />
        <div className="tldr">
          <p>
            {offers.length === 0
              ? `Aucune offre Black Friday confirmée au ${DATE}.`
              : `${offers.length} offre${offers.length > 1 ? 's' : ''} Black Friday confirmée${offers.length > 1 ? 's' : ''} au ${DATE}.`}
          </p>
        </div>

        <div className="stack-lg promo-blocs">
          <section className="prose" aria-labelledby="offres">
            <h2 id="offres">Y a-t-il déjà des offres Black Friday sur les robots tondeuses ?</h2>
            {offers.length === 0 ? (
              <p>
                Le Black Friday {BLACK_FRIDAY.year} tombe le vendredi {BF}. Des marques ont annoncé des remises avant cette date. Nous n’en avons confirmé aucune, faute d’avoir pu comparer leur prix au plus bas des 30 jours précédents chez le même marchand. Les prix relevés dans la presse figurent dans notre{' '}
                <Link className="lnk" href="/robot-tondeuse-black-friday-2026-prix-a-viser">suivi du Black Friday 2026</Link>, avec leur source.
              </p>
            ) : (
              <p>Ces offres ont été comparées au plus bas prix des 30 jours précédents, chez le même marchand.</p>
            )}
          </section>
          {offers.length > 0 ? <Offres offers={offers} /> : null}

          <RegleBaisse />

          <section className="stack" aria-labelledby="marques">
            <div className="prose">
              <h2 id="marques">Quel robot tondeuse surveiller pendant le Black Friday ?</h2>
              <p>
                Chaque marque a sa page, avec ses robots, leur prix indicatif et le lien vers le marchand. Une offre confirmée y apparaît avec la date du relevé.
              </p>
            </div>
            <MarquesListe
              lignes={brands.map((b) => {
                const n = getBrandRobots(b).length
                const etat = b.offers.length === 0 ? 'Aucune offre confirmée' : `${b.offers.length} offre${b.offers.length > 1 ? 's' : ''} confirmée${b.offers.length > 1 ? 's' : ''}`
                return { href: `${PATH}/${b.slug}`, label: b.label, detail: `${etat} · ${n} robot${n > 1 ? 's' : ''}` }
              })}
            />
          </section>

          <QuandBaisse />

          <section aria-labelledby="faq-titre">
            <h2 id="faq-titre" className="h-md promo-faq-titre">Questions fréquentes sur le Black Friday des robots tondeuses</h2>
            <Faq items={FAQ} />
          </section>
          <Alerte
            titre="Être prévenu d’une offre confirmée"
            texte="Inscrivez-vous à la lettre du jardin, un e-mail par mois au plus. Nous y signalons les baisses de prix qui ont passé notre contrôle."
            source="black-friday"
          />
          <p>
            <Link className="btn btn--ivory btn--full" href="/code-promo">Codes promo et coupons par marque</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
