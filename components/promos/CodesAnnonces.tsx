import { dateFr, type CodeAnnonce } from '@/lib/promos'

/** Codes publiés par la marque, lus sur son site mais pas saisis dans un panier : affichés comme tels, jamais comme vérifiés. */
export function CodesAnnonces({ marque, annonces }: { marque: string; annonces: CodeAnnonce[] }) {
  if (annonces.length === 0) return null
  return (
    <>
      <p>
        {marque} publie {annonces.length > 1 ? 'ces codes' : 'ce code'} sur son site. Nous l’avons lu, mais pas saisi dans un panier : vérifiez le total avant de payer.
      </p>
      <ul className="puces">
        {annonces.map((a) => (
          <li key={a.code}>
            <b>{a.code}</b> : {a.effet}, jusqu’au {dateFr(a.jusquau)}. Source :{' '}
            <a className="lnk" href={a.href} rel="nofollow noopener" target="_blank">{a.source}</a>.
          </li>
        ))}
      </ul>
    </>
  )
}
