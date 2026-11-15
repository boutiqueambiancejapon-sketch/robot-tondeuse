import Link from 'next/link'
import type { Groupe, Ligne } from './comparatifs-data'

const VISIBLE = 8

function LigneMini({ ligne }: { ligne: Ligne }) {
  return (
    <Link className="mini" href={ligne.href}>
      <div>
        <h3>{ligne.label}</h3>
        {ligne.text ? <p>{ligne.text}</p> : null}
      </div>
    </Link>
  )
}

/** Un groupe de comparatifs : titre, lignes .mini, et le reste replié quand la liste est longue. */
export function GroupeLignes({ groupe }: { groupe: Groupe }) {
  const first = groupe.lignes.slice(0, VISIBLE)
  const rest = groupe.lignes.slice(VISIBLE)
  return (
    <section className="groupe" id={groupe.id} aria-labelledby={`${groupe.id}-titre`}>
      <h2 className="h-md" id={`${groupe.id}-titre`}>
        {groupe.title}
      </h2>
      <div className="lignes">
        {first.map((l) => (
          <LigneMini ligne={l} key={l.href} />
        ))}
      </div>
      {rest.length > 0 ? (
        <details className="acc">
          <summary>Voir les {rest.length} autres</summary>
          <div className="lignes">
            {rest.map((l) => (
              <LigneMini ligne={l} key={l.href} />
            ))}
          </div>
        </details>
      ) : null}
    </section>
  )
}
