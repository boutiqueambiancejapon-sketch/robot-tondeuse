/**
 * /code-promo/[marque] — « Code promo {Marque} : y en a-t-il un en {mois année} ? ».
 * Données : lib/promos.ts. La réponse (code contrôlé ou non, date du contrôle) tient dans la première ligne.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { PROMO_BRANDS, dateFr, getBrandRobots, getPromoBrand, moisAnnee } from '@/lib/promos'
import { Faq } from '@/components/promos/Faq'
import { JsonLd } from '@/components/promos/JsonLd'
import { Alerte } from '@/components/promos/Alerte'
import { RobotsMarque } from '@/components/promos/RobotsMarque'
import { FauxCoupons, QuandBaisse } from '@/components/promos/Sections'
import { faqCodePromo } from '@/components/promos/textes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400
export const dynamicParams = false

type Params = Promise<{ marque: string }>

export function generateStaticParams() {
  return PROMO_BRANDS.map((b) => ({ marque: b.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { marque } = await params
  const brand = getPromoBrand(marque)
  if (!brand) return {}
  const date = dateFr(brand.checkedAt)
  const n = brand.codes.length
  const title = `Code promo ${brand.label} ${moisAnnee(brand.checkedAt)} : coupon et bon de réduction`
  const description = n === 0
    ? `Aucun code promo ${brand.label} vérifié au ${date}. Coupon, bon de réduction : où sont les vraies baisses, le prix des robots ${brand.label} chez les marchands et les faux coupons à écarter.`
    : `${n} code${n > 1 ? 's' : ''} promo ${brand.label} contrôlé${n > 1 ? 's' : ''} au ${date}. Coupon, bon de réduction, prix des robots ${brand.label} chez les marchands.`
  const url = `${SITE_URL}/code-promo/${brand.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { images: DEFAULT_OG_IMAGES, title, description, url, siteName: niche.siteName, type: 'website' },
  }
}

export default async function CodePromoMarquePage({ params }: { params: Params }) {
  const { marque } = await params
  const brand = getPromoBrand(marque)
  if (!brand) notFound()
  const m = brand.label
  const date = dateFr(brand.checkedAt)
  const robots = getBrandRobots(brand)
  const faq = faqCodePromo(m)
  const path = `/code-promo/${brand.slug}`

  return (
    <main id="main-content" className="v2">
      <JsonLd
        siteUrl={SITE_URL}
        crumbs={[{ name: 'Accueil', path: '' }, { name: 'Codes promo', path: '/code-promo' }, { name: m, path }]}
        faq={faq}
      />
      <div className="wrap promo-page">
        <PageTitle
          title={`Code promo ${m} : y en a-t-il un en ${moisAnnee(brand.checkedAt)} ?`}
          pose="prix"
          meta={`Dernier contrôle le ${date}`}
          crumbs={[{ href: '/', label: 'Accueil' }, { href: '/code-promo', label: 'Codes promo' }, { label: m }]}
        />
        <div className="tldr">
          <p>
            {brand.codes.length === 0
              ? `Aucun code promo ${m} vérifié au ${date}.`
              : `${brand.codes.length} code${brand.codes.length > 1 ? 's' : ''} promo ${m} vérifié${brand.codes.length > 1 ? 's' : ''} au ${date}.`}
          </p>
        </div>

        <div className="stack-lg promo-blocs">
          <section className="prose" aria-labelledby="existe">
            <h2 id="existe">Existe-t-il un code promo {m} ?</h2>
            {brand.codes.length === 0 ? (
              <p>
                Nous ne publions un code que s’il vient de la marque ou d’un marchand, et que nous avons pu le saisir dans un panier pour voir le total baisser. Au {date}, nous n’en avons aucun à publier pour {m}. Cette page changera le jour où un code passera ce contrôle, avec sa date et ses conditions.
              </p>
            ) : (
              <ul className="puces">
                {brand.codes.map((c) => (
                  <li key={c.code}>
                    <b>{c.code}</b> : {c.effet}, saisi chez {c.store} le {dateFr(c.verifiedAt)}.
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="prose" aria-labelledby="coupon">
            <h2 id="coupon">Où trouver un coupon ou un bon de réduction {m} valable ?</h2>
            <p>
              Un coupon ou un bon de réduction {m} valable vient de la marque ou d’un marchand : sa boutique en ligne, sa lettre d’information, la fiche du produit. Sur Amazon, il prend la forme d’une case à cocher sur la fiche, sans code à recopier.
            </p>
            <p>
              Faute de code, la réduction se lit sur le prix du jour chez le marchand.{' '}
              {robots.length > 0 ? `Les liens ci-dessous ouvrent la fiche de chaque robot ${m}.` : null}
            </p>
          </section>

          <section aria-labelledby="robots" className="stack">
            <h2 id="robots" className="h-md">Quel est le prix des robots tondeuses {m} ?</h2>
            {robots.length > 0 ? (
              <RobotsMarque robots={robots} />
            ) : (
              <p>
                Nous n’avons pas encore de fiche pour un robot {m}. Les <Link className="lnk" href="/comparatifs">comparatifs</Link> présentent les modèles des autres marques.
              </p>
            )}
            {robots.length > 0 ? (
              <p>
                <Link className="lnk" href={`/black-friday-robot-tondeuse/${brand.slug}`}>Les offres Black Friday {m}</Link>
              </p>
            ) : null}
          </section>

          <FauxCoupons marque={m} />
          <QuandBaisse marque={m} note={brand.note} />

          <section aria-labelledby="faq-titre">
            <h2 id="faq-titre" className="h-md promo-faq-titre">Questions fréquentes sur les codes promo {m}</h2>
            <Faq items={faq} />
          </section>
          <Alerte
            titre={`Être prévenu d’un code promo ${m}`}
            texte={`Inscrivez-vous à la lettre du jardin, un e-mail par mois au plus. Nous y signalons les codes promo et les baisses de prix qui ont passé notre contrôle, ${m} compris.`}
            source={`code-promo-${brand.slug}`}
          />
          <p>
            <Link className="btn btn--ivory btn--full" href="/code-promo">Les codes promo des autres marques</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
