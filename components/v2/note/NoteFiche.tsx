/**
 * NoteFiche — haut d'une fiche robot : note sur 10 avec indice de confiance, rang dans la base,
 * prix du jour daté, « L'essentiel en 30 secondes » et détail du barème (tasks/collections-v1.md § 3 ter).
 * Server Component, sans JavaScript ni animation. Les ids note-resume et essentiel-liste servent au speakable.
 */
import type { FicheNote } from '@/lib/fiche-note'
import { dateFr } from '@/lib/fiche-note'
import { CONFIANCE_MIN_NOTE, noteFr } from '@/lib/note-objective'

const nf = new Intl.NumberFormat('fr-FR')

export function NoteFiche({ fiche }: { fiche: FicheNote }) {
  const { note, rang, offres, essentiel, nom, robot } = fiche
  const jour = offres[0]
  return (
    <section className="note-sec" aria-labelledby="note-titre">
      <h2 id="note-titre" className="sr-only">
        Note de {nom}
      </h2>
      <p id="note-resume" className="note-res">
        {note.note !== null ? (
          <>
            <span className="note-val">
              {noteFr(note.note)}
              <small>/10</small>
            </span>
            {rang ? (
              <span>
                rang {rang.rang} sur {rang.notes} robots notés ({rang.analyses} analysés)
              </span>
            ) : null}
          </>
        ) : (
          <span>
            {note.confiance >= CONFIANCE_MIN_NOTE
              ? `Pas de note : ${robot.marque} ne publie pas de prix public.`
              : `Pas de note : trop peu de caractéristiques publiées (confiance ${note.confiance} %).`}
          </span>
        )}
        {jour ? (
          <span>
            {nf.format(jour.prix)} € chez {jour.marchand}, relevé le {dateFr(jour.date)}
          </span>
        ) : null}
      </p>
      <p className="note-conf">
        Confiance {note.confiance} %{note.manques.length ? ` : ${note.manques.join(', ')}` : ' : toutes les caractéristiques du barème sont publiées'}.
        {' '}{note.note !== null ? `Note calculée sur la fiche de ${robot.marque}, sans essai.` : `Données lues sur la fiche de ${robot.marque}.`}
      </p>

      <h2 id="essentiel" className="h-sm">
        L&apos;essentiel en 30 secondes
      </h2>
      <ul id="essentiel-liste" className="tldr-l">
        {essentiel.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <details className="note-det">
        <summary>Détail de la note, critère par critère</summary>
        <div className="tbl-wrap">
          <div className="tbl-scroll">
            <table className="tbl tbl--fit">
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {note.criteres.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <b>{c.titre}</b>
                      <small>{c.texte}</small>
                    </td>
                    <td>{c.points === null ? `retiré (sur ${c.max})` : `${c.points} / ${c.max}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="note-meth">
          Un critère non publié est retiré du barème, jamais compté zéro : la note est recalculée sur les autres. Sans prix public, pas de note.
          Prix du barème : {robot.prix_eur ? `${nf.format(robot.prix_eur)} € (prix public de ${robot.marque}` : 'non publié'}
          {robot.prix_eur && robot.prix_lu_le ? `, lu le ${dateFr(robot.prix_lu_le)})` : robot.prix_eur ? ')' : ''}.
        </p>
      </details>
    </section>
  )
}
