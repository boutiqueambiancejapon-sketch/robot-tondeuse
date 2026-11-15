/**
 * /deals — baisses de prix vérifiées (lib/deals.ts).
 * Une baisse ne s'affiche qu'avec un relevé daté. Sans donnée, la page explique la règle et renvoie
 * vers les pages Black Friday et codes promo.
 */
import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PageTitle } from '@/components/v2/PageTitle'
import { Mascotte } from '@/components/v2/Mascotte'
import { DealsGrid } from '@/components/deals/DealsGrid'
import { Faq, type FaqItem } from '@/components/promos/Faq'
import { JsonLd } from '@/components/promos/JsonLd'
import { RegleBaisse } from '@/components/promos/Sections'
import { getVerifiedDeals } from '@/lib/deals'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const TITLE = 'Bons plans robots tondeuses : les baisses de prix vérifiées'
const DESC = 'Les baisses de prix sur les robots tondeuses, affichées seulement avec un relevé daté : prix comparé au plus bas des 30 jours précédents chez le même marchand.'

export const revalidate = 900

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/deals` },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESC, url: `${SITE_URL}/deals`, siteName: niche.siteName, type: 'website' },
}

const FAQ: FaqItem[] = [
  {
    q: 'Comment savoir si une réduction est une vraie promo ?',
    a: 'Comparez le prix affiché au plus bas prix des 30 jours précédents chez le même marchand. La loi impose au marchand d’indiquer ce prix quand il annonce une réduction.',
  },
  {
    q: 'Quand acheter un robot tondeuse au meilleur prix ?',
    a: 'Les baisses les plus nettes de l’année arrivent entre la fin août et novembre : fin de saison, French Days, Prime Day d’automne, puis Black Friday. Le Black Friday ne donne pas toujours le prix le plus bas.',
  },
  {
    q: 'Les liens de cette page sont-ils des liens partenaires ?',
    a: 'Oui pour les liens vers Amazon : le site touche une commission si vous achetez, et le prix que vous payez reste le même. Une commission ne fait entrer aucun robot dans cette page.',
  },
]

const PORTES = [
  { href: '/black-friday-robot-tondeuse', titre: 'Black Friday', texte: 'Les offres confirmées, marque par marque, et la date du dernier contrôle.', ton: 'door--ink' },
  { href: '/code-promo', titre: 'Codes promo et coupons', texte: 'Existe-t-il un code pour votre marque ? La réponse, datée.', ton: 'door--copper' },
]

export default function DealsPage() {
  const deals = getVerifiedDeals()
  return (
    <main id="main-content" className="v2">
      <JsonLd siteUrl={SITE_URL} crumbs={[{ name: 'Accueil', path: '' }, { name: 'Bons plans', path: '/deals' }]} faq={FAQ} />
      <div className="wrap promo-page">
        <PageTitle title="Bons plans : les baisses de prix vérifiées" pose="prix" crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Bons plans' }]} />
        <div className="tldr">
          <p>
            {deals.length === 0
              ? 'Aucune baisse de prix vérifiée à afficher pour le moment.'
              : `${deals.length} baisse${deals.length > 1 ? 's' : ''} de prix vérifiée${deals.length > 1 ? 's' : ''}, avec la date de chaque relevé.`}
          </p>
        </div>

        <div className="stack-lg promo-blocs">
          {deals.length > 0 ? <DealsGrid deals={deals} /> : null}
          <RegleBaisse />
          <div className="stack">
            {PORTES.map((p) => (
              <Link className={`door ${p.ton}`} href={p.href} key={p.href}>
                <Mascotte pose="prix" size={104} />
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
              </Link>
            ))}
          </div>
          <section aria-labelledby="faq-deals">
            <h2 id="faq-deals" className="h-md promo-faq-titre">Questions fréquentes sur les bons plans</h2>
            <Faq items={FAQ} />
          </section>
          <p className="small muted">
            Liens partenaires : les liens vers {niche.defaultStore} portent une étiquette d’affiliation. Le prix que vous payez reste le même.{' '}
            <Link href="/mentions-legales" className="lnk">Mentions légales</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
