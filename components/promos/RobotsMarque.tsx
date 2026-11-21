import Image from 'next/image'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import type { PromoRobot } from '@/lib/promos'

/** Robots d'une marque : nom, prix indicatif de la fiche, lien vers le marchand. Aucun prix barré. */
export function RobotsMarque({ robots }: { robots: PromoRobot[] }) {
  return (
    <div className="promo-robots" data-place="promos-robots-marque">
      <div className="stack">
        {robots.map((r) => (
          <span key={r.slug} style={{ display: 'contents' }} data-robot={r.name}>
          <AffiliateLink href={r.url} className="card mini">
            {r.image ? <Image src={r.image} alt="" width={152} height={116} sizes="76px" /> : null}
            <div>
              <h3>{r.name}</h3>
              <p>Voir le prix {r.ou}{r.partenaire ? ' · lien partenaire' : ''}</p>
            </div>
            <span className="price num">{r.prix}</span>
          </AffiliateLink>
          </span>
        ))}
      </div>
      <p className="dated">Prix indicatif, à vérifier chez le marchand.</p>
    </div>
  )
}
