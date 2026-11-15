import { AffiliateLink } from '@/components/ui/AffiliateLink'
import type { Robot } from './robots'

/** Un robot adapté : nom, prix indicatif, caractéristiques annoncées, lien marchand. */
export function RobotCard({ robot }: { robot: Robot }) {
  return (
    <li className="card card-p stack">
      {robot.badge ? <span className="tag">{robot.badge}</span> : null}
      <div className="pick-top">
        <h3>
          {robot.marque} {robot.nom}
        </h3>
        <p className="price num">{robot.prix.toLocaleString('fr-FR')} €</p>
      </div>
      <ul className="facts">
        <li>{robot.surfaceMax.toLocaleString('fr-FR')} m²</li>
        <li>Pente {robot.penteMax.replace('%', ' %')}</li>
        <li>{robot.bruit}</li>
        <li>{robot.sansFil ? 'Sans fil' : 'Fil périphérique'}</li>
      </ul>
      {robot.url ? (
        <AffiliateLink href={robot.url} className="btn btn--ivory btn--full">
          Voir le prix sur Amazon
        </AffiliateLink>
      ) : null}
    </li>
  )
}
