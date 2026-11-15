import Link from 'next/link'
import { rubriqueLabel } from './rubriques'

type Props = { rubriques: { slug: string; count: number }[]; active?: string }

/** Filtre par rubrique : une rangée de pastilles qui défile sur téléphone. */
export function RubriqueChips({ rubriques, active }: Props) {
  const sorted = [...rubriques].sort((a, b) => b.count - a.count)
  return (
    <nav aria-label="Filtrer par rubrique" className="chips">
      <Link className={active ? 'chip' : 'chip on'} href="/blog" aria-current={active ? undefined : 'page'}>
        Tous
      </Link>
      {sorted.map(({ slug }) => (
        <Link
          key={slug}
          className={slug === active ? 'chip on' : 'chip'}
          href={`/blog/${slug}`}
          aria-current={slug === active ? 'page' : undefined}
        >
          {rubriqueLabel(slug)}
        </Link>
      ))}
    </nav>
  )
}
