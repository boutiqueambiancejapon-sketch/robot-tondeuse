/**
 * Encart — l'appel du milieu ou de la fin d'un article (carte des conversions, lib/utils/encarts.ts).
 * Quiz et calendrier : une tuile vers l'outil. Marchand : l'encart produit, sans prix (il n'est pas daté).
 * Pièce (dépannage) : lames, câble ou batterie, vers une recherche chez le marchand, sans prix ni référence inventée.
 * Server Component.
 */
import Link from 'next/link'
import { Mascotte } from '@/components/v2/Mascotte'
import { getProductImageByName } from '@/lib/products'
import { ENCART_HREF, type EncartKind } from '@/lib/utils/encarts'
import { PIECES, pieceHref, type PieceKey } from '@/lib/utils/pieces'
import { ProductPick } from './ProductPick'
import { wording, type StickyCTAItem } from './sticky-wording'

type Props = {
  kind: EncartKind | null
  /** Lien marchand de l'en-tête de l'article, pour l'encart « marchand ». */
  merchant?: StickyCTAItem
  message?: string
  /** Pièce à montrer pour l'encart « pièce » (lib/utils/pieces.ts). */
  piece?: PieceKey | null
}

export function Encart({ kind, merchant, message, piece }: Props) {
  if (kind === 'quiz') {
    return (
      <Link href={ENCART_HREF.quiz} className="card door door--lime" data-encart="quiz">
        <Mascotte pose="loupe" size={104} />
        <h3>Quel robot pour votre jardin ?</h3>
        <p>Quatre questions sur votre terrain, un robot conseillé à la fin.</p>
      </Link>
    )
  }
  if (kind === 'calendrier') {
    return (
      <Link href={ENCART_HREF.calendrier} className="card door door--copper" data-encart="calendrier">
        <Mascotte pose="printemps" size={104} />
        <h3>Le calendrier du gazon</h3>
        <p>Les gestes à faire sur votre pelouse, mois par mois.</p>
      </Link>
    )
  }
  if (kind === 'piece' && piece) {
    const { titre, texte, bouton } = PIECES[piece]
    return (
      <aside className="card buy buy--plain" aria-label={titre} data-encart="piece">
        <div className="buy-b">
          <p className="buy-name">{titre}</p>
          <p className="small muted">{texte}</p>
        </div>
        <a href={pieceHref(piece)} rel="sponsored nofollow noopener" target="_blank" className="btn">
          {bouton}
        </a>
        <p className="dated">Lien partenaire · compatibilité à vérifier avec votre modèle</p>
      </aside>
    )
  }
  if (kind === 'marchand' && merchant?.url) {
    const { title } = wording(merchant.label, message)
    return <ProductPick name={title} url={merchant.url} image={getProductImageByName(title)} />
  }
  return null
}
