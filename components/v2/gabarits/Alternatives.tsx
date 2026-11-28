/**
 * Alternatives — 2 à 5 modèles proches (moins cher, mieux noté, même usage) avec ce qu'on gagne et ce qu'on perd.
 * Les phrases sont calculées à partir des caractéristiques publiées, jamais d'un essai.
 */
import { CarteProduit } from './CarteProduit'
import type { ProduitGabarit } from './types'

export type Alternative = { produit: ProduitGabarit; gain?: string; perte?: string }

export function Alternatives({ items, titre = 'Alternatives', id = 'alternatives' }: { items: Alternative[]; titre?: string; id?: string }) {
  if (!items.length) return null
  return (
    <section className="g-sec" aria-labelledby={id}>
      <h2 id={id} className="g-h2">
        {titre}
      </h2>
      <div className="g-cards">
        {items.map(({ produit, gain, perte }) => (
          <CarteProduit
            key={produit.id}
            produit={produit}
            enPlus={
              gain || perte ? (
                <p className="g-alt">
                  {gain ? <span>+ {gain}</span> : null}
                  {perte ? <span>− {perte}</span> : null}
                </p>
              ) : null
            }
          />
        ))}
      </div>
    </section>
  )
}
