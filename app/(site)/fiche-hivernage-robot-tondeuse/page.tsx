/**
 * /fiche-hivernage-robot-tondeuse — fiche à imprimer (lot 2, étape G2). Sans e-mail.
 * Contenu sourcé dans lib/content/fiche-hivernage.ts. Styles d'impression : .fiche-print (globals.css).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PrintButton } from '@/components/tools/PrintButton'
import { GuideDownload } from '@/components/tools/GuideDownload'
import { ETAPES_HIVERNAGE, SOURCES_HIVERNAGE } from '@/lib/content/fiche-hivernage'
import { InscriptionLettre } from '@/components/tools/InscriptionLettre'
import { isNewsletterConfigured } from '@/lib/newsletter/brevo'
import { PageTitle } from '@/components/v2/PageTitle'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PATH = '/fiche-hivernage-robot-tondeuse'
const TITLE = 'Fiche hivernage du robot tondeuse à imprimer'
const DESC = 'Les gestes pour ranger un robot tondeuse l’hiver : hauteur d’herbe, nettoyage, lames, batterie, câbles. D’après les consignes Husqvarna, sources citées.'

export const revalidate = 86400

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESC, url: `${SITE_URL}${PATH}`, siteName: niche.siteName, type: 'website' },
}

export default function FicheHivernagePage() {
  return (
    <main id="main-content" className="v2 fiche-print">
      <div className="wrap">
        <PageTitle
          title="Ranger son robot tondeuse pour l’hiver."
          pose="hiver"
          meta="Fiche à imprimer · sources relues le 13 novembre 2026"
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Fiche hivernage' }]}
        />
        <div className="stack">
          <p className="lede">
            Sept étapes à cocher, de la dernière tonte à la remise en route. Les consignes viennent des guides Husqvarna pour l’Automower. Sur un Worx, un Segway, un Mammotion ou un Gardena, la notice de votre modèle passe avant cette fiche.
          </p>
          <p className="warn">
            À éviter : l’abri de jardin non isolé s’il gèle chez vous. Husqvarna demande un rangement au-dessus de 0 °C.
          </p>
          <PrintButton />
          <GuideDownload file="fiche-hivernage-robot-tondeuse.pdf" label="Télécharger la fiche en PDF" note="4 pages, 150 Ko. Sur iPhone : ouvrez le PDF, puis Partager › Imprimer." />
        </div>

        <section aria-label="Étapes de l’hivernage" className="sec stack-lg">
          {ETAPES_HIVERNAGE.map((etape, i) => (
            <article key={etape.titre} className="fiche-etape">
              <p className="dated">Étape {i + 1} · {etape.quand}</p>
              <h2 className="h-md etape-titre">{etape.titre}</h2>
              <ul className="stack">
                {etape.gestes.map((g) => (
                  <li key={g.texte} className="task">
                    <span className="case" aria-hidden="true" />
                    <div>
                      <p className="geste">{g.texte}</p>
                      {g.sources.length > 0 && <p className="dated">[{g.sources.join(', ')}]</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {isNewsletterConfigured() && (
          <section className="no-print card card-p stack" aria-labelledby="lettre-titre">
            <h2 id="lettre-titre" className="h-md">Les gestes du mois pour la pelouse et le robot</h2>
            <p className="small muted">
              Un e-mail par mois au plus : quand reprendre la tonte, à quelle hauteur couper, quand scarifier, quand ranger le robot. Chaque conseil cite sa source.
            </p>
            <InscriptionLettre source="fiche-hivernage" />
          </section>
        )}

        <section className="sec stack">
          <h2 className="h-md">Sources</h2>
          <ul className="sources">
            {SOURCES_HIVERNAGE.map((s) => (
              <li key={s.id}>
                [{s.id}] <a href={s.url} rel="noopener" className="lnk">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="small muted">
            Sources relues le 13 novembre 2026. La fiche rapporte les consignes écrites du fabricant : l’équipe ne les a pas essayées elle-même.
          </p>
          <div className="no-print stack">
            <Link href="/comment-hiverner-son-robot-tondeuse" className="btn btn--ivory btn--full">Le guide complet de l’hivernage</Link>
            <Link href="/quiz" className="btn btn--ivory btn--full">Trouver le robot adapté à mon jardin</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
