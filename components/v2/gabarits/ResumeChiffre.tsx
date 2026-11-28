/**
 * ResumeChiffre — trois cases en tête d'une collection : note moyenne · nombre de modèles · prix médian.
 * Une valeur absente s'écrit « — » avec la raison ; la date du relevé le plus récent est donnée dessous.
 */
import { dateCourte, euros, type ResumeChiffre as Resume } from '@/lib/gabarits'
import { noteFr } from '@/lib/note-objective'

export function ResumeChiffre({ resume }: { resume: Resume }) {
  const { noteMoyenne, modeles, notes, prixMedian, misAJour } = resume
  return (
    <div className="g-sum-w">
      <dl className="g-sum">
        <div>
          <dt>note moyenne</dt>
          <dd>{noteMoyenne !== null ? `${noteFr(noteMoyenne)}/10` : '—'}</dd>
        </div>
        <div>
          <dt>modèles analysés</dt>
          <dd>{modeles}</dd>
        </div>
        <div>
          <dt>prix médian</dt>
          <dd>{prixMedian !== null ? euros(prixMedian) : '—'}</dd>
        </div>
      </dl>
      <p className="g-note">
        {notes} modèle{notes > 1 ? 's' : ''} noté{notes > 1 ? 's' : ''} sur {modeles}
        {misAJour ? ` · prix publics relevés jusqu’au ${dateCourte(misAJour)}` : ' · aucun prix public daté'}
      </p>
    </div>
  )
}
