/**
 * /comment-nous-notons — barème public de la note sur 100 (lot 3, pas 2, 20/11/2026).
 * Lit CRITERES et SEUIL_PROPOSER_MIEUX de lib/bareme.ts : la page et le calcul ont la même source.
 * Aucune note de robot n'est affichée ici tant que le Chef n'a pas relu les poids.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { PageTitle } from '@/components/v2/PageTitle'
import { CRITERES, SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'

export const metadata: Metadata = {
  title: { absolute: `Comment nous notons les robots tondeuses | ${niche.siteName}` },
  description:
    'Le barème de notre note sur 100 : 5 critères tirés des fiches des marques (navigation, prix pour 100 m², pente, bruit, connexion), avec les points de chaque palier.',
  alternates: { canonical: '/comment-nous-notons' },
}

const total = CRITERES.reduce((s, c) => s + c.max, 0)

export default function CommentNousNotonsPage() {
  return (
    <main id="main-content" className="v2">
      <div className="wrap lst legal">
        <PageTitle
          title="Comment nous notons"
          meta="Barème publié le 20 novembre 2026."
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Comment nous notons' }]}
        />
        <div className="prose">
          <section>
            <h2>D’où vient la note</h2>
            <p>
              Nous n’essayons pas les robots. La note sur {total} vient seulement des caractéristiques
              annoncées par la marque, sur sa fiche ou dans sa notice, et du prix relevé à une date
              donnée. Deux robots aux mêmes chiffres ont donc la même note, quelle que soit la marque.
            </p>
            <p>
              Il manque une seule de ces caractéristiques ? Le robot n’a pas de note. Nous ne devinons
              pas un chiffre absent.
            </p>
          </section>

          {CRITERES.map((c) => (
            <section key={c.id}>
              <h2>
                {c.titre} : {c.max} points sur {total}
              </h2>
              <ul>
                {c.paliers.map((p) => (
                  <li key={p.texte}>
                    {p.texte} : {p.points} {p.points > 1 ? 'points' : 'point'}
                  </li>
                ))}
              </ul>
              {c.id === 'prixParSurface' ? (
                <p>
                  Exemple de calcul : un robot à 1 200 € annoncé pour 1 000 m² revient à 120 € pour
                  100 m², soit 15 points sur 25. Le prix change souvent, la note peut donc bouger avec lui.
                </p>
              ) : null}
              {c.id === 'bruit' ? (
                <p>
                  C’est le chiffre de la marque, pas une mesure. Quand un média publie une mesure, nous la
                  citons à part dans l’article, avec son nom et sa date.
                </p>
              ) : null}
            </section>
          ))}

          <section>
            <h2>Sous {SEUIL_PROPOSER_MIEUX} sur {total}</h2>
            <p>
              Un robot noté sous {SEUIL_PROPOSER_MIEUX} ne sera pas mis en avant : sa fiche proposera
              d’abord des robots mieux notés pour une surface proche. Les notes ne sont pas encore
              affichées sur les fiches ; elles le seront après relecture du barème.
            </p>
          </section>

          <section>
            <h2>Ce que la note ne dit pas</h2>
            <ul>
              <li>La fiabilité dans le temps et le service après-vente : aucune fiche de marque ne les chiffre.</li>
              <li>La qualité de coupe et le soin des bordures, qui dépendent aussi de votre gazon.</li>
              <li>
                Le bon choix pour votre jardin : une note haute sur 3 000 m² ne sert à rien sur 300 m².
                Le <Link href="/quiz" className="lnk">quiz</Link> part de votre terrain.
              </li>
            </ul>
            <p>
              Aucune marque ne paie pour sa note. Les liens vers les marchands peuvent nous rapporter une
              commission ; elle ne change pas le barème.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
