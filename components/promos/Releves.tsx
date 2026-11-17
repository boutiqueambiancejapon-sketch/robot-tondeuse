import Image from 'next/image'
import { getProduct } from '@/lib/products'
import { dateFr, type PrixReleve } from '@/lib/promos'

const euros = (n: number): string => `${n.toLocaleString('fr-FR').replace(/\s/g, '\u00a0')}\u00a0€`

/**
 * Prix lus sur la boutique officielle d'une marque, datés. Ce ne sont pas des offres confirmées :
 * aucun prix barré, aucun montant de remise. Le prix de référence de la marque est cité en toutes lettres.
 */
export function Releves({ releves, boutique }: { releves: PrixReleve[]; boutique?: string }) {
  return (
    <div className="promo-robots">
      <div className="stack">
        {releves.map((r) => {
          const product = getProduct(r.slug)
          const ou = boutique ?? new URL(r.url).hostname.replace(/^www\./, '')
          return (
            <a key={r.slug} href={r.url} rel="nofollow noopener" target="_blank" className="card mini">
              {product?.image ? <Image src={product.image} alt="" width={152} height={116} sizes="76px" /> : null}
              <div>
                <h3>{product?.name ?? r.slug}</h3>
                <p>
                  Lu le {dateFr(r.checkedAt)} sur {ou}
                  {r.cadeau ? `, ${r.cadeau} selon la marque` : ''}
                  {r.reference ? `. Prix de référence de la marque\u00a0: ${euros(r.reference)}` : ''}
                </p>
              </div>
              <span className="price num">{euros(r.price)}</span>
            </a>
          )
        })}
      </div>
      <p className="dated">
        Prix affichés par la marque ce jour-là. Nous ne les avons pas comparés au plus bas des 30 jours précédents et nous n’avons pas contrôlé son prix de référence.
      </p>
    </div>
  )
}
