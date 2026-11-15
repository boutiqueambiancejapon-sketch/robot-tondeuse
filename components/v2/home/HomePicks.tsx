import Image from 'next/image'
import Link from 'next/link'
import { getProduct, getPrimaryLink } from '@/lib/products'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

// Trois robots mis en avant, avec leur photo en situation (public/images/robots).
const PICKS = [
  { slug: 'husqvarna-automower-310-mark-ii', photo: '/images/robots/husqvarna-automower-310-mark-ii-jardin.jpeg' },
  { slug: 'mammotion-yuka-mini-2-1000', photo: '/images/robots/mammotion-yuka-mini-2-jardin.jpeg' },
  { slug: 'gardena-sileno-minimo-250', photo: '/images/robots/gardena-sileno-minimo-250-jardin.jpeg' },
]

const STORES: Record<string, string> = { amazon: 'Amazon', fnac: 'Fnac', cdiscount: 'Cdiscount' }

export function HomePicks() {
  const picks = PICKS.flatMap(({ slug, photo }) => {
    const product = getProduct(slug)
    return product ? [{ product, photo }] : []
  })
  if (picks.length === 0) return null

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-hd">
          <h2 className="h-lg">Nos choix du moment</h2>
        </div>
        <div className="snap">
          {picks.map(({ product, photo }) => {
            const store = product.stickyCta ?? product.links?.[0]?.store ?? 'amazon'
            return (
              <article className="card pick" key={product.name}>
                <div className="shot shot--photo">
                  {product.badge ? <span className="tag">{product.badge}</span> : null}
                  <Image src={photo} alt={`${product.name} sur une pelouse`} width={800} height={550} sizes="(max-width: 860px) 84vw, 340px" />
                </div>
                <div className="pick-b">
                  <h3 className="h-sm">{product.name}</h3>
                  <p className="price num">{product.prix}</p>
                  {product.hook ? <p className="small">{product.hook}</p> : null}
                  <AffiliateLink href={getPrimaryLink(product)} className="btn btn--full">
                    Voir le prix chez {STORES[store.toLowerCase()] ?? store}
                  </AffiliateLink>
                  <p className="dated">Prix indicatif, à vérifier chez le marchand · lien partenaire</p>
                </div>
              </article>
            )
          })}
        </div>
        <p style={{ marginTop: 8 }}>
          <Link className="btn btn--ivory btn--full" href="/comparatifs">
            Tous les comparatifs
          </Link>
        </p>
      </div>
    </section>
  )
}
