/**
 * PhotoFiche — grande photo du haut d'une fiche produit (chargée tout de suite), avec sa source quand elle vient d'Amazon.
 * Sans photo : l'initiale de la marque, comme sur les cartes.
 */
import { VignetteProduit } from './VignetteProduit'
import type { ProduitGabarit } from './types'

export function PhotoFiche({ produit: p }: { produit: ProduitGabarit }) {
  return (
    <figure className="g-photo-fiche">
      <VignetteProduit nom={p.nom} marque={p.marque} photo={p.photo} img={p.img} format="large" sizes="(min-width: 700px) 560px, 92vw" prioritaire />
      {p.photo?.origine === 'amazon' ? <figcaption className="g-meta">Photo : Amazon.fr</figcaption> : null}
    </figure>
  )
}
