import Image from 'next/image'
import Link from 'next/link'
import { getProduct } from '@/lib/products'
import { offresPour } from '@/lib/offres'
import { MerchantButtons } from '@/components/v2/MerchantButtons'

// Trois robots mis en avant, avec leur photo en situation (public/images/robots).
const PICKS = [
  { slug: 'husqvarna-automower-310-mark-ii', photo: '/images/robots/husqvarna-automower-310-mark-ii-jardin.jpeg' },
  { slug: 'mammotion-yuka-mini-2-1000', photo: '/images/robots/mammotion-yuka-mini-2-jardin.jpeg' },
  { slug: 'gardena-sileno-minimo-250', photo: '/images/robots/gardena-sileno-minimo-250-jardin.jpeg' },
]

export function HomePicks() {
  const picks = PICKS.flatMap(({ slug, photo }) => {
    const product = getProduct(slug)
    return product ? [{ product, photo, slug }] : []
  })
  if (picks.length === 0) return null

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-hd">
          <h2 className="h-lg">Nos choix du moment</h2>
        </div>
        <div className="snap">
          {picks.map(({ product, photo, slug }) => {
            return (
              <article className="card pick" key={product.name}>
                <div className="shot shot--photo">
                  {product.badge ? <span className="tag">{product.badge}</span> : null}
                  <Image src={photo} alt={`${product.name} sur une pelouse`} width={800} height={550} sizes="(max-width: 860px) 84vw, 340px" />
                </div>
                <div className="pick-b">
                  <h3 className="h-sm">{product.name}</h3>
                  <p className="price num">{product.prix}</p>
                  <p className="dated">Prix indicatif</p>
                  {product.hook ? <p className="small">{product.hook}</p> : null}
                  <MerchantButtons offres={offresPour(product.name, slug)} place="accueil-choix" robot={product.name} />
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
