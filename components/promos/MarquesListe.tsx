import Link from 'next/link'

type Ligne = { href: string; label: string; detail: string }

/** Liste de marques : une ligne par marque, avec l'état connu à la date du contrôle. */
export function MarquesListe({ lignes }: { lignes: Ligne[] }) {
  return (
    <ul className="promo-marques">
      {lignes.map((l) => (
        <li key={l.href}>
          <Link href={l.href}>
            <b>{l.label}</b>
            <span>{l.detail}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
