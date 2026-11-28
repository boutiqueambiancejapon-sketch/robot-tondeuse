/**
 * BoutonMarchand — une offre : nom du marchand, prix et date du relevé, bouton cuivre (seul accent d'action).
 * Sans date de relevé, aucun prix n'est affiché : seulement « Voir le prix ». Bouton sur une seule ligne.
 * Les liens Amazon passent par addAffiliateTag. data-place sert au comptage des clics.
 */
import { addAffiliateTag } from '@/lib/utils/affiliate'
import { dateCourte, euros } from '@/lib/gabarits'

export type OffreGabarit = { marchand: string; url: string; prix?: number | null; date?: string | null }

type Props = { offre: OffreGabarit; principal?: boolean; place?: string; libelle?: string }

export function BoutonMarchand({ offre, principal = true, place = 'bouton-marchand', libelle }: Props) {
  const date = offre.prix && offre.date ? offre.date : null
  return (
    <div className="g-offre" data-place={place}>
      <div className="g-offre__t">
        <b>{offre.marchand}</b>
        <small>{date ? `${euros(offre.prix as number)} · relevé le ${dateCourte(date)}` : 'prix et disponibilité sur la page'}</small>
      </div>
      <a
        className={`btn g-btn${principal ? '' : ' btn--ivory'}`}
        href={addAffiliateTag(offre.url)}
        rel="sponsored nofollow noopener"
        target="_blank"
      >
        {libelle ?? (date ? 'Voir l’offre' : 'Voir le prix')}
      </a>
    </div>
  )
}

/** Plusieurs offres, la moins chère datée d'abord et seule en bouton plein ; mention des liens partenaires. */
export function OffresMarchands({ offres, place = 'offres' }: { offres: OffreGabarit[]; place?: string }) {
  if (!offres.length) return null
  const triees = [...offres].sort((a, b) => (a.prix && a.date ? a.prix : Infinity) - (b.prix && b.date ? b.prix : Infinity))
  return (
    <div className="g-offres" data-place={place}>
      {triees.map((o, i) => (
        <BoutonMarchand key={o.marchand} offre={o} principal={i === 0} place={`${place}-${i + 1}`} />
      ))}
      <p className="g-note">Liens partenaires : le site touche une commission, le prix reste le même pour vous.</p>
    </div>
  )
}
