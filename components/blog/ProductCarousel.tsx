/**
 * ProductCarousel — rangée de fiches produit à faire défiler (défilement CSS, aucun script).
 * Lit content/produits/[slug].yaml. Server Component.
 *
 * Usage MDX :
 *   <ProductCarousel products="slug-a,slug-b,slug-c" />
 */

import Image from 'next/image'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { getProduct, getPrimaryLink, type Product } from '@/lib/products'
import { MENTION_PRIX } from './ProductPick'

type Item = { slug: string; product: Product; url: string }

export function ProductCarousel({ products }: { products: string }) {
  const items = products
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((slug): Item | null => {
      const product = getProduct(slug)
      if (!product) return null
      const url = getPrimaryLink(product)
      return url ? { slug, product, url } : null
    })
    .filter((item): item is Item => item !== null)

  if (items.length === 0) return null

  return (
    <div className="snap picks">
      {items.map(({ slug, product, url }) => (
        <article className="card pick" key={slug}>
          {product.image ? (
            <span className="shot">
              {product.badge ? <span className="tag">{product.badge}</span> : null}
              <Image src={product.image} alt={product.name} width={600} height={420} />
            </span>
          ) : null}
          <div className="pick-b">
            <div className="pick-top">
              <p className="buy-name">{product.name}</p>
              <p className="price num">{product.prix}</p>
            </div>
            {product.hook ? <p className="small">{product.hook}</p> : null}
            <AffiliateLink href={url} className="btn btn--full">
              Voir l’offre
            </AffiliateLink>
            <p className="dated">{MENTION_PRIX}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
