/**
 * /comment-nous-notons — barème public de la note sur 100 (lot 3, pas 2, 20/11/2026).
 * Lit CRITERES et SEUIL_PROPOSER_MIEUX de lib/bareme.ts : la page et le calcul ont la même source.
 * Les notes des fiches (lib/notes-fiches.ts) utilisent le même calcul.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { PageTitle } from '@/components/v2/PageTitle'
import { CRITERES, SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'
import { CONFIANCE_MIN_BADGE, CONFIANCE_MIN_NOTE } from '@/lib/note-objective'
import { CATALOGUE } from '@/lib/radar-fiche'

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
              d’abord des robots mieux notés pour une surface proche.
            </p>
          </section>

          <section>
            <h2>Où voir les notes</h2>
            <p>
              Depuis le 22 novembre 2026, la note s’affiche sur un premier lot de fiches, à côté du prix
              qui a servi au calcul et de sa date. Le prix retenu est le plus bas relevé chez Cdiscount ou
              Fnac. Un robot sans prix daté n’a pas de note&nbsp;: le prix Amazon affiché n’a pas de date, nous
              ne l’utilisons donc pas.
            </p>
          </section>

          <section>
            <h2>Note sur 10 et indice de confiance</h2>
            <p>
              Sur la fiche du Mammotion LUBA 3 AWD 3000, la note passe sur 10 et s’appuie sur notre base de{' '}
              {CATALOGUE.length} robots, avec le prix public de chaque marque, daté. Un critère que la marque
              ne publie pas est retiré du barème, au lieu de bloquer la note, et la note est recalculée sur
              les autres critères.
            </p>
            <p>
              L’indice de confiance donne la part du barème couverte par des chiffres publiés. Mammotion ne
              publie pas le bruit de ce robot&nbsp;: 15 points sur 100 manquent, la confiance est donc de
              85&nbsp;%. Sous {CONFIANCE_MIN_NOTE}&nbsp;%, pas de note. Sous {CONFIANCE_MIN_BADGE}&nbsp;%, jamais de
              mention «&nbsp;meilleur choix&nbsp;». Sans prix public, pas de note non plus&nbsp;: le prix pèse
              25 points, et l’ôter donnerait 10/10 à un robot dont la marque cache son tarif.
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
