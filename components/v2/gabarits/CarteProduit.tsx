/**
 * CarteProduit — carte d'une grille ou d'une liste d'alternatives : photo, nom, ligne courte, note, prix daté.
 * Un seul lien (vers la fiche du site) ; le bouton marchand vit sur la fiche. data-f : filtres de la collection.
 */
import Link from 'next/link'
import { dateCourte, euros } from '@/lib/gabarits'
import { NoteSur10 } from './NoteSur10'
import { VignetteProduit } from './VignetteProduit'
import type { ProduitGabarit } from './types'

type Props = { produit: ProduitGabarit; filtres?: string[]; enPlus?: React.ReactNode }

export function CarteProduit({ produit: p, filtres, enPlus }: Props) {
  const prix = p.prix && p.prixDate ? p.prix : null
  const corps = (
    <>
      <VignetteProduit nom={p.nom} img={p.img} />
      <div className="g-card__t">
        <h3>{p.nom}</h3>
        {p.meta ? <p className="g-meta">{p.meta}</p> : null}
        <div className="g-card__row">
          <NoteSur10 note={p.note} taille="s" />
          <span className="g-meta">
            {prix ? (
              <>
                <b>{euros(prix)}</b> <small>au {dateCourte(p.prixDate as string)}</small>
              </>
            ) : (
              'prix non publié'
            )}
          </span>
        </div>
        {enPlus}
      </div>
    </>
  )
  return (
    <article className="g-card" data-f={filtres?.join(' ')}>
      {p.href ? (
        <Link href={p.href} className="g-card__a">
          {corps}
        </Link>
      ) : (
        <div className="g-card__a">{corps}</div>
      )}
    </article>
  )
}
