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
import { offresRelevees } from '@/lib/offres-releves'
import { formatDate, formatPrix } from '@/lib/offres-format'

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
      {items.map(({ slug, product, url }) => {
        const autres = offresRelevees(product.name, slug)
        return (
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
              {autres.length > 0 ? 'Voir chez Amazon' : 'Voir l’offre'}
            </AffiliateLink>
            {autres.map((o) => (
              <a key={o.marchand} href={o.url} rel="sponsored nofollow noopener" target="_blank" className="btn btn--ivory btn--full">
                {o.marchand} · {o.prix ? formatPrix(o.prix) : ''}
              </a>
            ))}
            <p className="dated">
              {autres[0]?.date ? `Prix relevé le ${formatDate(autres[0].date)} · ${MENTION_PRIX}` : MENTION_PRIX}
            </p>
          </div>
        </article>
        )
      })}
    </div>
  )
}
