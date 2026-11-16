import Image from 'next/image'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { offresRelevees } from '@/lib/offres'
import { formatDate, formatPrix } from '@/lib/offres-format'

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
  // Si le même robot est aussi dans un flux Cdiscount ou Fnac, un bouton par vendeur, avec le prix relevé.
  const autres = offresRelevees(name)
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
          {autres.length > 0 ? 'Voir chez Amazon' : 'Voir l’offre'}
        </AffiliateLink>
      </div>
      {autres.map((o) => (
        <a key={o.marchand} href={o.url} rel="sponsored nofollow noopener" target="_blank" className="btn btn--ivory btn--full">
          {o.marchand} · {o.prix ? formatPrix(o.prix) : ''}
        </a>
      ))}
      <p className="dated">
        {autres[0]?.date ? `Prix ${autres.map((o) => o.marchand).join(' et ')} relevé le ${formatDate(autres[0].date)} · ${MENTION_PRIX}` : MENTION_PRIX}
      </p>
    </aside>
  )
}
