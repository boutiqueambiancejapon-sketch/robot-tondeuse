/**
 * /calendrier-du-gazon — outil « Calendrier du gazon » (lot 2, étape G4).
 * Contenu sourcé dans lib/content/calendrier-gazon.ts. Le calendrier de référence est rendu côté serveur.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { CalendrierGazon } from '@/components/tools/CalendrierGazon'
import { InscriptionLettre } from '@/components/tools/InscriptionLettre'
import { GuideDownload } from '@/components/tools/GuideDownload'
import { SOURCES_CALENDRIER } from '@/lib/content/calendrier-gazon'
import { isNewsletterConfigured } from '@/lib/newsletter/brevo'
import { PageTitle } from '@/components/v2/PageTitle'
import { Mascotte } from '@/components/v2/Mascotte'
import { saisonDuMois } from '@/components/tools/saison'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PATH = '/calendrier-du-gazon'
const TITLE = 'Calendrier du gazon : les gestes mois par mois'
const DESC = 'Tonte, hauteur de coupe, engrais, scarification, semis, arrosage, robot : les gestes des 12 mois selon votre région et l’exposition de la pelouse. Sources citées.'

export const revalidate = 86400

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESC, url: `${SITE_URL}${PATH}`, siteName: niche.siteName, type: 'website' },
}

export default function CalendrierGazonPage() {
  return (
    <main id="main-content" className="v2 fiche-print">
      <div className="wrap">
        <PageTitle
          title="Le calendrier du gazon, mois par mois."
          pose={saisonDuMois(new Date().getMonth())}
          meta="Sources lues le 12 novembre 2026"
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Calendrier du gazon' }]}
        />
        <div className="stack">
          <p className="lede">
            Trois gestes par mois pour la pelouse, plus celui du robot. Choisissez votre région et l’exposition : le calendrier s’ajuste. Les mois sont des repères. Le vrai signal est la température du sol : la pousse démarre vers 8 °C, un semis lève à partir de 10 °C.
          </p>
          <p className="warn">
            À éviter : le sulfate de fer contre la mousse. La fiche FREDON le déconseille et propose d’aérer le sol, puis de chauler légèrement à l’automne [S5].
          </p>
        </div>

        <section aria-labelledby="calendrier-titre" className="sec">
          <h2 id="calendrier-titre" className="h-lg sec-hd">Mon calendrier</h2>
          <CalendrierGazon />
        </section>

        <section aria-labelledby="lecture-titre" className="sec prose">
          <h2 id="lecture-titre">Comment lire ce calendrier</h2>
          <p>
            Chaque geste porte le numéro de sa source entre crochets. La mention « repère indicatif » signale un conseil de bon sens que nous n’avons trouvé dans aucune des sources lues, par exemple les décalages de 2 à 3 semaines entre régions. Prenez-le comme un ordre de grandeur.
          </p>
          <p>
            Les sources ne donnent pas toutes la même hauteur de tonte : 1 à 3 cm pour un gazon d’ornement selon SEMAE [S1], 5 cm au moins selon FREDON [S5], 10 cm en été selon Jardiner autrement [S4]. Le calendrier retient 5 à 6 cm en saison et 7 à 8 cm l’été ou en terrain sec.
          </p>
          <p>
            Les consignes pour le robot viennent des guides Husqvarna, écrits pour l’Automower. Sur une autre marque, la notice de votre modèle passe avant ce calendrier. La surface du jardin ne change pas ces gestes ; elle compte pour <Link href="/superficie" className="lnk">choisir le robot</Link>.
          </p>
        </section>

        <div className="no-print stack-lg">
          <GuideDownload file="calendrier-du-gazon.pdf" label="Télécharger le guide du gazon en PDF" note="Les 12 mois, 8 pages, 220 Ko. Réglé pour l’ouest et la plaine, pelouse au soleil." />
          <Link className="door door--ink" href="/fiche-hivernage-robot-tondeuse">
            <h3>La fiche hivernage du robot</h3>
            <p>Une page à imprimer et à accrocher dans le garage.</p>
            <Mascotte pose="hiver" size={104} />
          </Link>
          {isNewsletterConfigured() && (
            <section aria-labelledby="lettre-titre" className="card card-p stack">
              <h2 id="lettre-titre" className="h-md">Les gestes du mois, par e-mail</h2>
              <p className="small muted">
                Un e-mail par mois au plus, au début du mois : les gestes de ce calendrier, au bon moment. Chaque conseil cite sa source.
              </p>
              <InscriptionLettre source="calendrier-gazon" />
            </section>
          )}
        </div>

        <section aria-labelledby="sources-titre" className="sec stack">
          <h2 id="sources-titre" className="h-md">Sources</h2>
          <ul className="sources">
            {SOURCES_CALENDRIER.map((s) => (
              <li key={s.id}>
                [{s.id}] <a href={s.url} rel="noopener" className="lnk">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="small muted">
            Sources lues le 12 novembre 2026. Le calendrier rapporte ce qu’elles écrivent : l’équipe n’a pas essayé ces gestes elle-même. Pour l’arrosage, l’arrêté de votre département fait foi (vigieau.gouv.fr).
          </p>
          <p className="no-print">
            <Link href="/quiz" className="btn btn--ivory btn--full">Trouver le robot adapté à mon jardin</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
