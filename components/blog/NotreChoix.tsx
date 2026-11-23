import Image from 'next/image'
import type { ProduitCite } from '@/lib/produits-cites'
import { prixBas } from '@/lib/produits-cites'
import { offresRelevees } from '@/lib/offres-releves'
import { formatPrix } from '@/lib/offres-format'
import { amazonHref } from '@/lib/utils/affiliate'
import { PriceRows } from './PriceRows'
import { NoteLigne } from './NoteLigne'
import { etiquetteCarte } from '@/lib/notes-fiches'

/** Carte « Notre choix » du haut des pages d'achat : le premier robot de l'article, ses prix chez chaque vendeur, un bouton. */
export function NotreChoix({ produit }: { produit: ProduitCite }) {
  const autres = offresRelevees(produit.name)
  const amazonBas = prixBas(produit.price)
  const meilleur = autres.find((o) => o.prix !== undefined && (amazonBas === undefined || o.prix < amazonBas))
  const url = meilleur?.url ?? amazonHref(produit.url, produit.name)
  const etiquette = etiquetteCarte(produit.name)
  const label = meilleur?.prix ? `Voir chez ${meilleur.marchand} · ${formatPrix(meilleur.prix)}` : 'Voir le prix chez Amazon'
  return (
    <aside className="choix" aria-label={`${etiquette} : ${produit.name}`} data-cta="choix-haut" data-place="notre-choix" data-robot={produit.name}>
      <div className="choix-top">
        {produit.image ? (
          <span className="choix-img">
            <Image src={produit.image} alt={produit.name} width={200} height={200} />
          </span>
        ) : null}
        <div>
          <p className="choix-k">{etiquette}</p>
          <p className="choix-n">{produit.name}</p>
          <NoteLigne nom={produit.name} />
          {produit.hook ? <p className="choix-h">{produit.hook.split('. ')[0].replace(/\.$/, '')}.</p> : null}
        </div>
      </div>
      <PriceRows name={produit.name} amazonUrl={produit.url} amazonPrice={produit.price} />
      <a className="btn btn--lime btn--full" href={url} rel="sponsored nofollow noopener" target="_blank">
        {label}
      </a>
      <p className="choix-f">Liens partenaires : nous touchons une commission si vous achetez, sans changer votre prix.</p>
    </aside>
  )
}
