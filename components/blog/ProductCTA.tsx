/**
 * ProductCTA — encart produit affilié dans le corps d'un article.
 * Usage MDX :
 *   <ProductCTA name="Produit X" price="999 €" url="https://..." badge="Recommandé" hook="Description courte." />
 * Server Component.
 */

import { getProductImageByName } from '@/lib/products'
import { ProductPick } from './ProductPick'

type ProductCTAProps = {
  name: string
  price: string
  url: string
  image?: string
  badge?: string
  hook?: string
}

export function ProductCTA({ name, price, url, image, badge, hook }: ProductCTAProps) {
  // Photo passée par l'article, sinon celle de la fiche du robot (catalogue Fnac).
  const photo = image || getProductImageByName(name)
  return <ProductPick name={name} price={price} url={url} image={photo} badge={badge} hook={hook} />
}
