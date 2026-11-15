import Image from 'next/image'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

/** Mention obligatoire tant que le prix n'a pas de date de relevé. */
export const MENTION_PRIX = 'Prix indicatif, à vérifier chez le marchand · lien partenaire'

type Props = {
  name: string
  price?: string
  url: string
  image?: string
  badge?: string
  hook?: string
}

/** Encart produit d'un article : photo, nom, prix indicatif et bouton marchand. Sans état, utilisable partout. */
export function ProductPick({ name, price, url, image, badge, hook }: Props) {
  return (
    <aside className={image ? 'card buy' : 'card buy buy--plain'} aria-label={name}>
      {image ? (
        <span className="buy-img">
          <Image src={image} alt={name} width={160} height={160} />
        </span>
      ) : null}
      <div className="buy-b">
        {badge ? <span className="tag">{badge}</span> : null}
        <p className="buy-name">{name}</p>
        {hook ? <p className="small muted">{hook}</p> : null}
      </div>
      <div className="buy-row">
        {price ? <p className="price num">{price}</p> : null}
        <AffiliateLink href={url} className="btn">
          Voir l’offre
        </AffiliateLink>
      </div>
      <p className="dated">{MENTION_PRIX}</p>
    </aside>
  )
}
