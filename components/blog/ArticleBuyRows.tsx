/**
 * ArticleBuyRows — sous le titre d'un avis, d'un classement ou d'un comparatif : le bouton marchand
 * dans le premier écran (deux liens au plus, ceux de `stickyCta`). Aucun prix affiché : il n'est pas daté.
 * Server Component.
 */
import { merchantLink, wording, type StickyCTAItem } from './sticky-wording'

type Props = { items: StickyCTAItem[]; message?: string }

export function ArticleBuyRows({ items, message }: Props) {
  const rows = items.filter((item) => item.url).slice(0, 2)
  if (rows.length === 0) return null

  return (
    <div className="art-buy">
      {rows.map((item) => {
        const { title, button } = wording(item.label, message)
        const { href, rel } = merchantLink(item.url)
        return (
          <div className="buyrow" key={item.url}>
            <p className="buy-name">{title}</p>
            <a className="btn" href={href} rel={rel} target="_blank">
              {button}
            </a>
          </div>
        )
      })}
      <p className="dated">Prix à vérifier chez le marchand · lien partenaire</p>
    </div>
  )
}
