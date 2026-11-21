import { formatDate, formatPrix, type Offre } from '@/lib/offres-format'

/**
 * Trois boutons marchands. Le premier (prix relevé le plus bas, sinon Amazon) est plein, les autres sont clairs.
 * Utilisable côté serveur comme côté client : les offres sont calculées avant.
 * data-place et data-robot servent au comptage des clics (components/AffiliateClickBeacon.tsx).
 */
export function MerchantButtons({ offres, place = 'boutons-marchands', robot }: { offres: Offre[]; place?: string; robot?: string }) {
  const releve = offres.find((o) => o.date)
  return (
    <div className="stack" data-place={place} data-robot={robot}>
      {offres.map((o, i) => (
        <a
          key={o.marchand}
          href={o.url}
          rel="sponsored nofollow noopener"
          target="_blank"
          className={`btn btn--full${i === 0 ? '' : ' btn--ivory'}`}
        >
          {o.prix ? `${o.marchand} · ${formatPrix(o.prix)}` : `Voir le prix chez ${o.marchand}`}
        </a>
      ))}
      <p className="dated">
        {releve?.date ? `Prix relevés le ${formatDate(releve.date)} chez ${releve.marchand}, à vérifier chez le marchand` : 'Prix à vérifier chez le marchand'} · liens
        partenaires
      </p>
    </div>
  )
}
