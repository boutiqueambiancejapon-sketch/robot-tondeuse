/**
 * AuthorByline — ligne d'information sous le titre : auteur, temps de lecture, date.
 * Format : « Par [Auteur] · 5 min de lecture · Màj le 23 mars 2026 ».
 * Server Component — rendu côté serveur, indexable.
 */

import Link from 'next/link'

type AuthorBylineProps = {
  authorSlug: string
  authorName?: string
  publishedAt: string        // ISO 8601 : "2026-03-23"
  updatedAt?: string
  readingTimeMin?: number
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function AuthorByline({
  authorSlug,
  authorName = '',
  publishedAt,
  updatedAt,
  readingTimeMin,
}: AuthorBylineProps) {
  const updated = Boolean(updatedAt && updatedAt !== publishedAt)
  const displayDate = updated && updatedAt ? updatedAt : publishedAt

  const sep = <span aria-hidden="true"> · </span>

  return (
    <p className="dated byline">
      {authorName ? (
        <>
          Par <Link href={`/auteurs/${authorSlug}`}>{authorName}</Link>
          {sep}
        </>
      ) : null}
      {readingTimeMin !== undefined ? (
        <>
          <span>{readingTimeMin} min de lecture</span>
          {sep}
        </>
      ) : null}
      <time dateTime={displayDate}>
        {updated ? 'Màj le ' : ''}
        {formatDate(displayDate)}
      </time>
    </p>
  )
}
