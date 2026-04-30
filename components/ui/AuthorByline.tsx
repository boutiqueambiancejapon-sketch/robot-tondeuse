/**
 * AuthorByline — byline éditorial textuel, zéro photo.
 * Format : "Par [Auteur] · 5 min · 23 mars 2026"
 * Lien vers /auteurs/[authorSlug].
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
  const displayDate = updatedAt && updatedAt !== publishedAt ? updatedAt : publishedAt

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        fontSize: '14px',
        color: 'currentColor',
        opacity: 0.9,
      }}
    >
      {authorName && <span style={{ opacity: 0.75 }}>Par</span>}
      {authorName && (
        <Link
          href={`/auteurs/${authorSlug}`}
          style={{
            color: 'inherit',
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: '1px solid var(--copper-bright)',
            paddingBottom: '1px',
          }}
        >
          {authorName}
        </Link>
      )}

      {readingTimeMin !== undefined && (
        <>
          {authorName && <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>}
          <span style={{ opacity: 0.75 }}>{readingTimeMin} min de lecture</span>
        </>
      )}

      <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>

      <time dateTime={displayDate} style={{ opacity: 0.75 }}>
        {updatedAt && updatedAt !== publishedAt ? 'Màj le ' : ''}
        {formatDate(displayDate)}
      </time>
    </div>
  )
}
