import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { dateFr } from '@/lib/promos'
import type { Deal } from '@/lib/deals'

const euros = (n: number): string => `${n.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`

/** Baisses vérifiées : prix relevé, écart avec le plus bas des 30 jours précédents, date et marchand. Aucun prix barré. */
export function DealsGrid({ deals }: { deals: Deal[] }) {
  return (
    <div className="stack">
      {deals.map((d) => (
        <article className="card card-p stack" key={`${d.slug}-${d.store}`}>
          <h2 className="h-sm">{d.name}</h2>
          <p className="promo-prix">
            <span className="price num">{euros(d.price)}</span>
            <span className="drop num">−{euros(d.lowest30d - d.price)}</span>
          </p>
          <p className="dated">
            Relevé le {dateFr(d.checkedAt)} chez {d.store}. Plus bas des 30 jours précédents : {euros(d.lowest30d)}.
          </p>
          <AffiliateLink href={d.url} className="btn btn--full">Voir chez {d.store}</AffiliateLink>
        </article>
      ))}
    </div>
  )
}
