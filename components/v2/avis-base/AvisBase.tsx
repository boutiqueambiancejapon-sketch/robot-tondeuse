/**
 * AvisBase — page « Avis <modèle> » d'un robot de la base (lib/avis-base.ts), au gabarit FICHE PRODUIT :
 * réponse courte (note, confiance, prix daté), offres, radar contre ses rivaux, caractéristiques, points forts et limites,
 * mauvais choix, alternatives, questions, auteur. Server Component : tout se lit sans JavaScript. Aucun essai affirmé.
 */
import { PageTitle } from '@/components/v2/PageTitle'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { ArticleEnd } from '@/components/blog/ArticleEnd'
import { NoteFiche } from '@/components/v2/note/NoteFiche'
import { RadarFiche } from '@/components/v2/radar/RadarFiche'
import { Alternatives, type Alternative } from '@/components/v2/gabarits/Alternatives'
import { OffresMarchands, type OffreGabarit } from '@/components/v2/gabarits/BoutonMarchand'
import { PhotoFiche } from '@/components/v2/gabarits/PhotoFiche'
import type { ProduitGabarit } from '@/components/v2/gabarits/types'
import type { FicheNote } from '@/lib/fiche-note'
import { dateFr } from '@/lib/fiche-note'
import type { Ligne, Question } from '@/lib/avis-base-texte'
import type { RobotBase } from '@/lib/avis-base'
import { niche } from '@/niche.config'

export type DonneesAvis = {
  robot: RobotBase
  titre: string
  publie: string
  modifie: string
  photo: ProduitGabarit
  fiche: FicheNote
  offres: OffreGabarit[]
  specs: { label: string; valeur: string }[]
  forces: Ligne[]
  limites: Ligne[]
  mauvais: string[]
  alternatives: Alternative[]
  faq: Question[]
}

/** « site officiel Mammotion (fr.mammotion.com) » ; un fichier de données sur un CDN : « tableau technique officiel ». */
const source = (url: string, marque: string) => {
  const h = new URL(url).hostname
  return /cdn|shopify/.test(h) ? `tableau technique officiel ${marque}` : `fiche officielle ${marque} (${h.replace(/^www\./, '')})`
}

function Liste({ id, titre, lignes }: { id: string; titre: string; lignes: Ligne[] }) {
  if (!lignes.length) return null
  return (
    <section className="art-sec" aria-labelledby={id}>
      <h2 id={id} className="h-md">
        {titre}
      </h2>
      <ul className="tldr-l">
        {lignes.map((l) => (
          <li key={l.axe}>
            {l.axe} : {l.texte}.
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AvisBase({ d }: { d: DonneesAvis }) {
  const r = d.robot
  const nom = d.fiche.nom
  const author = { slug: niche.author.slug || 'auteur', name: niche.author.name || 'Auteur' }
  return (
    <main id="main-content" className="v2">
      <article className="wrap art">
        <PageTitle title={`Avis ${nom}`} pose="lecture" crumbs={[{ href: '/', label: 'Accueil' }, { href: '/marques', label: 'Marques' }, { label: `Avis ${r.marque}` }]} />
        <AuthorByline authorSlug={author.slug} authorName={author.name} publishedAt={d.publie} updatedAt={d.modifie} />
        <PhotoFiche produit={d.photo} />
        <NoteFiche fiche={d.fiche} />

        <section className="art-sec" aria-labelledby="offres-titre">
          <h2 id="offres-titre" className="h-md">
            Où acheter le {nom}
          </h2>
          <OffresMarchands offres={d.offres} place="avis-base-offres" />
        </section>

        <RadarFiche robots={[r]} />

        <section className="g-sec" aria-labelledby="caracteristiques">
          <h2 id="caracteristiques" className="g-h2">
            Caractéristiques publiées par {r.marque}
          </h2>
          <div className="tbl-wrap g-specs">
            <table className="tbl">
              <tbody>
                {d.specs.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{s.label}</th>
                    <td>{s.valeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Liste id="forces" titre={`Points forts du ${nom}, chiffres à l’appui`} lignes={d.forces} />
        <Liste id="limites" titre={`Limites du ${nom}`} lignes={d.limites} />

        {d.mauvais.length ? (
          <section className="art-sec" aria-labelledby="mauvais-choix">
            <h2 id="mauvais-choix" className="h-md">
              Pour qui le {nom} est-il un mauvais choix ?
            </h2>
            <ul className="tldr-l">
              {d.mauvais.map((m) => (
                <li key={m}>Pour {m}.</li>
              ))}
            </ul>
          </section>
        ) : null}

        <Alternatives items={d.alternatives} titre={`Alternatives au ${nom}`} />

        {r.sources?.length ? (
          <p className="g-note">
            Sources : {r.sources.map((s) => `${source(s.url, r.marque)} (lecture du ${dateFr(s.lu_le)})`).join(' ; ')}.
            {' '}Le site n’a pas essayé ce robot : les chiffres sont ceux annoncés par la marque.
          </p>
        ) : null}

        <ArticleEnd faq={d.faq} related={[]} authorSlug={author.slug} authorName={author.name} />
      </article>
    </main>
  )
}
