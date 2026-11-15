import { AffiliateLink } from '@/components/ui/AffiliateLink'
import type { ModeleComparateur } from '@/lib/comparateur'
import { afficher, euros, meilleursPrix, meilleursSpec } from './comparer-logic'

type Props = { modeles: ModeleComparateur[]; specsLabels: Record<string, string> }

/** Tableau des modèles choisis : première colonne figée, meilleur de la ligne en vert quand il y en a un. */
export function ComparateurTable({ modeles, specsLabels }: Props) {
  const prix = meilleursPrix(modeles)
  return (
    <div className="tbl-wrap">
      <div className="tbl-scroll">
        <table className="tbl tbl--fit">
          <thead>
            <tr>
              <th scope="col">Critère</th>
              {modeles.map((m) => (
                <th scope="col" key={m.nom}>
                  {m.nom}
                  {m.nouveaute ? <small>Nouveau</small> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prix indicatif</td>
              {modeles.map((m, i) => (
                <td key={m.nom} className={prix.has(i) ? 'best num' : 'num'}>
                  {euros(m.prix)}
                </td>
              ))}
            </tr>
            {Object.entries(specsLabels).map(([cle, label]) => {
              const best = meilleursSpec(modeles, cle)
              return (
                <tr key={cle}>
                  <td>{label}</td>
                  {modeles.map((m, i) => (
                    <td key={m.nom} className={best.has(i) ? 'best' : undefined}>
                      {afficher(m.specs[cle])}
                    </td>
                  ))}
                </tr>
              )
            })}
            <tr>
              <td>Chez le marchand</td>
              {modeles.map((m) => (
                <td key={m.nom}>
                  {m.amazonUrl ? (
                    <AffiliateLink href={m.amazonUrl} className="lnk">
                      Voir sur Amazon
                    </AffiliateLink>
                  ) : (
                    '—'
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
