/**
 * Podium — 3 cartes (meilleur choix, meilleur prix, grand terrain…) visibles sans faire défiler sur un classement.
 * Chaque carte : étiquette, photo, nom, note, prix daté, pour qui, un bouton marchand.
 */
import Link from 'next/link'
import { affiliateHref } from '@/lib/utils/affiliate'
import { dateCourte, euros } from '@/lib/gabarits'
import type { OffreGabarit } from './BoutonMarchand'
import { NoteSur10 } from './NoteSur10'
import { VignetteProduit } from './VignetteProduit'
import type { ProduitGabarit } from './types'

export type MarchePodium = { label: string; produit: ProduitGabarit; pourQui?: string; offre?: OffreGabarit | null }

export function Podium({ marches, place = 'podium' }: { marches: MarchePodium[]; place?: string }) {
  if (!marches.length) return null
  return (
    <div className="g-podium" data-place={place}>
      {marches.map(({ label, produit: p, pourQui, offre }) => {
        const prix = p.prix && p.prixDate ? p.prix : null
        return (
          <article key={label} className="g-pod">
            <p className="g-pod__lab">{label}</p>
            <VignetteProduit nom={p.nom} marque={p.marque} photo={p.photo} img={p.img} format="large" sizes="(min-width: 700px) 240px, 90vw" />
            <h3>{p.href ? <Link href={p.href}>{p.nom}</Link> : p.nom}</h3>
            <div className="g-card__row">
              <NoteSur10 note={p.note} />
              {prix ? (
                <span className="g-meta">
                  <b>{euros(prix)}</b> <small>au {dateCourte(p.prixDate as string)}</small>
                </span>
              ) : null}
            </div>
            {pourQui ? <p className="g-meta">{pourQui}</p> : null}
            {offre ? (
              <a className="btn btn--full g-btn" href={affiliateHref(offre.url)} rel="sponsored nofollow noopener" target="_blank">
                {`Voir chez ${offre.marchand}`}
              </a>
            ) : p.href ? (
              <Link className="btn btn--full btn--ivory g-btn" href={p.href}>
                Voir la fiche
              </Link>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
