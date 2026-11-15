import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { getProduct } from '@/lib/products'
import { dateFr, type BlackFridayOffer } from '@/lib/promos'

const euros = (n: number): string => `${n.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`

/** Offres confirmées : prix relevé, plus bas des 30 jours précédents chez le même marchand, date du relevé. Aucun prix barré. */
export function Offres({ offers }: { offers: BlackFridayOffer[] }) {
  return (
    <div className="stack">
      {offers.map((o) => (
        <article className="card card-p stack" key={`${o.slug}-${o.store}`}>
          <h3 className="h-sm">{getProduct(o.slug)?.name ?? o.slug}</h3>
          <p className="promo-prix">
            <span className="price num">{euros(o.price)}</span>
            <span className="drop num">−{euros(o.lowest30d - o.price)}</span>
          </p>
          <p className="dated">
            Relevé le {dateFr(o.checkedAt)} chez {o.store}. Plus bas des 30 jours précédents : {euros(o.lowest30d)}.
          </p>
          <AffiliateLink href={o.url} className="btn btn--full">Voir chez {o.store}</AffiliateLink>
        </article>
      ))}
    </div>
  )
}
