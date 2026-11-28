/**
 * FicheProduit — gabarit commun de la fiche produit (maquette validée le 28/11/2026, ~/drafts/qrt-gabarits/maquette-validee.html) :
 * photo, note sur 10 et confiance, offres datées, essentiel, comparaison (radar du site, s'il en a un), caractéristiques,
 * détail de la note, alternatives, questions, barre collante. Server Component : tout se lit sans JavaScript.
 * Les données viennent de lib/modele/fiche.ts (dossier du site), jamais d'un essai.
 */
import type { ReactNode } from 'react'
import { PageTitle } from '@/components/v2/PageTitle'
import { dateCourte, euros } from '@/lib/gabarits'
import { noteFr } from '@/lib/note-objective'
import { nomProduit, type DonneesFiche } from '@/lib/modele/fiche'
import { ActionsProduit } from './ActionsProduit'
import { Alternatives } from './Alternatives'
import { BarreCollante } from './BarreCollante'
import { OffresMarchands } from './BoutonMarchand'
import { Essentiel } from './Essentiel'
import { NoteSur10 } from './NoteSur10'
import { PhotoFiche } from './PhotoFiche'

type Props = { d: DonneesFiche; crumbs: { href?: string; label: string }[]; radar?: ReactNode }

function Tableau({ id, titre, lignes }: { id: string; titre: string; lignes: { label: ReactNode; valeur: string }[] }) {
  return (
    <section className="g-sec" aria-labelledby={id}>
      <h2 id={id} className="g-h2">
        {titre}
      </h2>
      <div className="tbl-wrap g-specs">
        <table className="tbl">
          <tbody>
            {lignes.map((l, i) => (
              <tr key={i}>
                <th scope="row">{l.label}</th>
                <td>{l.valeur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function FicheProduit({ d, crumbs, radar }: Props) {
  const { produit: p, note, rang } = d
  const nom = nomProduit(p)
  const prixDate = p.prix_eur && p.prix_lu_le ? `${euros(p.prix_eur)} ${p.prix_source ?? ''}, relevé le ${dateCourte(p.prix_lu_le)}` : null
  return (
    <main id="main-content" className="v2">
      <article className="wrap art">
        {p.exemple ? (
          <p className="g-note" role="note">
            Fiche d&apos;exemple du site modèle : produit et chiffres fictifs, à remplacer.
          </p>
        ) : null}
        <PageTitle title={nom} crumbs={crumbs} />
        <PhotoFiche produit={d.gabarit} />

        <section className="g-sec g-fiche__haut" aria-labelledby="note-titre">
          <h2 id="note-titre" className="sr-only">
            Note et prix de {nom}
          </h2>
          <p id="note-resume" className="g-fiche__note">
            <NoteSur10 note={note.note} taille="l" />
            {rang ? <span className="chip">{rang.rang}e sur {rang.notes} produits notés</span> : null}
          </p>
          <p className="g-note">
            {note.note !== null ? 'Note sur dossier, sans essai' : 'Pas de note : trop peu de caractéristiques publiées'} · confiance{' '}
            {note.confiance} %{note.manques.length ? ` (${note.manques.join(', ')} non publiés)` : ''}.
          </p>
          <div className="g-fiche__offres">
            <OffresMarchands offres={d.offres} place="fiche-offres" />
          </div>
          {prixDate ? <p className="g-note">Prix : {prixDate}.</p> : null}
          <ActionsProduit id={p.id} />
        </section>

        <Essentiel lignes={d.essentiel} />
        {radar}

        <Tableau id="caracteristiques" titre="Caractéristiques" lignes={d.specs} />
        <Tableau
          id="detail-note"
          titre="Détail de la note"
          lignes={note.criteres.map((c) => ({
            label: (
              <>
                {c.titre}
                <small>{c.texte}</small>
              </>
            ),
            valeur: c.points === null ? '—' : `${c.points} / ${c.max}`,
          }))}
        />

        <Alternatives items={d.alternatives} />

        {p.faq?.length ? (
          <section className="g-sec" aria-labelledby="faq">
            <h2 id="faq" className="g-h2">
              Questions fréquentes
            </h2>
            {p.faq.map((q) => (
              <details key={q.q} className="acc">
                <summary>{q.q}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </section>
        ) : null}

        {p.sources.length ? (
          <p className="g-note">
            Sources : {p.sources.map((s) => `${s.label} (lu le ${dateCourte(s.lu_le)})`).join(' ; ')}.
          </p>
        ) : null}
      </article>
      {d.offres[0] ? (
        <BarreCollante
          titre={nom}
          detail={`${note.note !== null ? `${noteFr(note.note)}/10` : 'non noté'}${prixDate ? ` · ${euros(p.prix_eur as number)}` : ''}`}
          offre={d.offres[0]}
        />
      ) : null}
    </main>
  )
}
