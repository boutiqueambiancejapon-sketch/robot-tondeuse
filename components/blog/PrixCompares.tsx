import type { ProduitCite } from '@/lib/produits-cites'
import { offresRelevees } from '@/lib/offres-releves'
import { formatDate, formatPrix } from '@/lib/offres-format'
import { affiliateHref } from '@/lib/utils/affiliate'
import { prixBas } from '@/lib/produits-cites'

/** Tableau « Où l'acheter ? » : chaque robot de l'article, son prix chez Amazon, Cdiscount et Fnac. */
export function PrixCompares({ produits }: { produits: ProduitCite[] }) {
  const lignes = produits.slice(0, 8).map((p) => ({ p, autres: offresRelevees(p.name) }))
  if (lignes.length < 2 && !lignes.some((l) => l.autres.length)) return null
  const date = lignes.flatMap((l) => l.autres).find((o) => o.date)?.date
  const cell = (l: (typeof lignes)[number], m: 'Cdiscount' | 'Fnac') => {
    const o = l.autres.find((x) => x.marchand === m)
    const bas = Math.min(...l.autres.map((x) => x.prix ?? Infinity))
    return o?.prix ? (
      <td className={o.prix === bas ? 'best' : undefined}>
        <a href={o.url} rel="sponsored nofollow noopener" target="_blank">{formatPrix(o.prix)}</a>
      </td>
    ) : (
      <td className="muted">—</td>
    )
  }
  return (
    <section className="prix-cmp" aria-labelledby="prix-cmp-t">
      <h2 id="prix-cmp-t" className="h-md">Où acheter ces robots au meilleur prix ?</h2>
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr><th>Robot</th><th>Amazon</th><th>Cdiscount</th><th>Fnac</th></tr>
            </thead>
            <tbody>
              {lignes.map((l) => (
                <tr key={l.p.name}>
                  <td>{l.p.name}</td>
                  <td><a href={affiliateHref(l.p.url)} rel="sponsored nofollow noopener" target="_blank">{prixBas(l.p.price) ? `dès ${formatPrix(prixBas(l.p.price) ?? 0)}` : 'Voir'}</a></td>
                  {cell(l, 'Cdiscount')}
                  {cell(l, 'Fnac')}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="dated">
        {date ? `Prix Cdiscount et Fnac relevés le ${formatDate(date)}, en vert le moins cher. ` : ''}Prix Amazon indicatifs. Vérifiez le prix chez le marchand · liens partenaires.
      </p>
    </section>
  )
}
