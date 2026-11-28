/**
 * /code-promo — page mère « Codes promo et coupons robots tondeuses ».
 * Données : lib/promos.ts. Aucun code inventé : sans code contrôlé, la page l'écrit dès la première ligne.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { PROMO_BRANDS, PROMOS_CHECKED_AT, dateFr, getBrandRobots, getPromoBrand } from '@/lib/promos'
import { Faq } from '@/components/promos/Faq'
import { JsonLd } from '@/components/promos/JsonLd'
import { Alerte } from '@/components/promos/Alerte'
import { MarquesListe } from '@/components/promos/MarquesListe'
import { FauxCoupons, QuandBaisse } from '@/components/promos/Sections'
import { faqCodePromo } from '@/components/promos/textes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PATH = '/code-promo'
const DATE = dateFr(PROMOS_CHECKED_AT)
const TOTAL = PROMO_BRANDS.reduce((n, b) => n + b.codes.length, 0)
const TITLE = 'Code promo robot tondeuse : coupons et bons de réduction vérifiés'
const DESC = TOTAL === 0
  ? `Code promo, coupon ou bon de réduction pour un robot tondeuse : aucun code vérifié au ${DATE}. Les ${PROMO_BRANDS.length} marques suivies, les prix chez les marchands et les faux coupons à écarter.`
  : `Code promo, coupon ou bon de réduction pour un robot tondeuse : ${TOTAL} code${TOTAL > 1 ? 's' : ''} contrôlé${TOTAL > 1 ? 's' : ''} au ${DATE}, marque par marque, et les faux coupons à écarter.`
const FAQ = faqCodePromo()

export const revalidate = 86400

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESC, url: `${SITE_URL}${PATH}`, siteName: niche.siteName, type: 'website' },
}

const etat = (slug: string): string => {
  const brand = getPromoBrand(slug)
  const n = brand?.codes.length ?? 0
  const robots = brand ? getBrandRobots(brand).length : 0
  const codes = n === 0 ? 'Aucun code vérifié' : `${n} code${n > 1 ? 's' : ''} vérifié${n > 1 ? 's' : ''}`
  const annonces = brand?.annonces.length ?? 0
  const lus = annonces > 0 ? ` · ${annonces} code${annonces > 1 ? 's' : ''} annoncé${annonces > 1 ? 's' : ''} par la marque` : ''
  return robots > 0 ? `${codes}${lus} · ${robots} robot${robots > 1 ? 's' : ''} avec prix indicatif` : `${codes}${lus}`
}

export default function CodePromoPage() {
  return (
    <main id="main-content" className="v2">
      <JsonLd siteUrl={SITE_URL} crumbs={[{ name: 'Accueil', path: '' }, { name: 'Codes promo', path: PATH }]} faq={FAQ} />
      <div className="wrap promo-page">
        <PageTitle
          title="Codes promo et coupons robots tondeuses"
          pose="prix"
          meta={`Dernier contrôle le ${DATE}`}
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Codes promo' }]}
        />
        <div className="tldr">
          <p>
            {TOTAL === 0
              ? `Aucun code promo vérifié pour un robot tondeuse au ${DATE}, sur les ${PROMO_BRANDS.length} marques que nous suivons.`
              : `${TOTAL} code${TOTAL > 1 ? 's' : ''} promo vérifié${TOTAL > 1 ? 's' : ''} au ${DATE}. Le détail figure sur la page de chaque marque.`}
          </p>
        </div>

        <section className="sec stack-lg" aria-labelledby="existe">
          <div className="prose">
            <h2 id="existe">Existe-t-il un code promo ou un bon de réduction pour un robot tondeuse ?</h2>
            <p>
              Nous ne publions un code, un coupon ou un bon de réduction que s’il vient de la marque ou d’un marchand, et que nous avons pu le saisir dans un panier pour voir le total baisser. {TOTAL === 0 ? `Au ${DATE}, aucun n’a passé ce contrôle.` : `Au ${DATE}, ${TOTAL} l’${TOTAL > 1 ? 'ont' : 'a'} passé.`} Chaque marque a sa page, avec la date du dernier contrôle.
            </p>
          </div>
          <MarquesListe lignes={PROMO_BRANDS.map((b) => ({ href: `${PATH}/${b.slug}`, label: b.label, detail: etat(b.slug) }))} />
        </section>

        <div className="stack-lg promo-blocs">
          <section className="prose" aria-labelledby="vraie-reduction">
            <h2 id="vraie-reduction">Où trouver une vraie réduction sur un robot tondeuse ?</h2>
            <p>
              Faute de code, la réduction se lit sur le prix affiché par le marchand. Chaque page de marque donne le lien vers la fiche de ses robots chez Amazon ou sur le site du vendeur, où figure le prix du jour.
            </p>
            <p>
              Sur Amazon, un coupon est une case à cocher sur la fiche du produit, sans code à recopier. La remise s’applique à l’étape du paiement.
            </p>
            <p>
              Deux autres pages suivent les prix : les <Link className="lnk" href="/deals">baisses vérifiées</Link> et les{' '}
              <Link className="lnk" href="/black-friday-robot-tondeuse">offres du Black Friday</Link>.
            </p>
          </section>
          <FauxCoupons />
          <QuandBaisse />
          <section aria-labelledby="faq-titre">
            <h2 id="faq-titre" className="h-md promo-faq-titre">Questions fréquentes sur les codes promo et les coupons</h2>
            <Faq items={FAQ} />
          </section>
          <Alerte
            titre="Être prévenu quand un code est vérifié"
            texte="Inscrivez-vous à la lettre du jardin, un e-mail par mois au plus. Nous y signalons les codes promo et les baisses de prix qui ont passé notre contrôle."
            source="code-promo"
          />
        </div>
      </div>
    </main>
  )
}
