/**
 * Pagination — navigation entre les pages d'une liste (design V2).
 * Server Component : des liens, aucun JavaScript. Chaque cible fait au moins 44 px.
 * Affiche au plus 5 numéros autour de la page courante, plus la première et la dernière.
 */
import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  /** Adresse sans paramètre, par exemple "/blog" ou "/blog/astuces". */
  basePath: string
}

function pageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}?page=${page}`
}

export function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null

  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  if (start > 1) pages.unshift(1)
  if (end < totalPages) pages.push(totalPages)

  return (
    <nav aria-label="Pagination" className="pager">
      <div className="pager-steps">
        {currentPage > 1 ? (
          <Link className="btn btn--ivory" href={pageHref(basePath, currentPage - 1)} rel="prev">
            Page précédente
          </Link>
        ) : null}
        {currentPage < totalPages ? (
          <Link className="btn btn--ivory" href={pageHref(basePath, currentPage + 1)} rel="next">
            Page suivante
          </Link>
        ) : null}
      </div>
      <ol className="pager-nums">
        {pages.map((page, i) => (
          <li key={page}>
            {i > 0 && page - pages[i - 1] > 1 ? <span aria-hidden="true">…</span> : null}
            <Link
              href={pageHref(basePath, page)}
              className={page === currentPage ? 'on' : undefined}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
