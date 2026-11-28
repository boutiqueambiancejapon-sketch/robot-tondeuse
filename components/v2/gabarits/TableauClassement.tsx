/**
 * TableauClassement — le top du classement (maquette validée) : rang, produit et « pour qui », note sur 10, prix daté.
 * Lisible à 390 px sans défilement de côté : 4 colonnes, le texte va à la ligne. La ligne du n° 1 est surlignée.
 */
import Link from 'next/link'
import { dateCourte, euros } from '@/lib/gabarits'
import { noteFr } from '@/lib/note-objective'
import type { ProduitGabarit } from './types'

export type LigneTableau = { rang: number; produit: ProduitGabarit; pourQui?: string }

export function TableauClassement({ lignes, titre = 'Le classement', id = 'classement' }: { lignes: LigneTableau[]; titre?: string; id?: string }) {
  if (!lignes.length) return null
  return (
    <section className="g-sec" aria-labelledby={id}>
      <h2 id={id} className="g-h2">
        {titre}
      </h2>
      <div className="tbl-wrap g-rang">
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Produit</th>
              <th scope="col">Note</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map(({ rang, produit: p, pourQui }) => (
              <tr key={p.id} className={rang === 1 ? 'g-rang__n1' : undefined}>
                <td>{rang}</td>
                <th scope="row">
                  {p.href ? <Link href={p.href}>{p.nom}</Link> : p.nom}
                  {pourQui || p.meta ? <small>{pourQui || p.meta}</small> : null}
                </th>
                <td>{p.note !== null ? <b>{noteFr(p.note)}</b> : '—'}</td>
                <td>
                  {p.prix && p.prixDate ? (
                    <>
                      {euros(p.prix)}
                      <small>{dateCourte(p.prixDate)}</small>
                    </>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
