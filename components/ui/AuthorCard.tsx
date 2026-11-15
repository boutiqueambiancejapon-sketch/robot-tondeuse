/**
 * AuthorCard — carte auteur : photo si niche.author.photo est défini, nom et courte bio.
 * Variantes : 'inline' (bas d'article) | 'full' (page auteur).
 * Server Component.
 */

import Link from 'next/link'
import Image from 'next/image'
import { niche } from '@/niche.config'

type AuthorCardProps = {
  authorSlug: string
  authorName?: string
  bio: string
  variant?: 'inline' | 'full'
}

export function AuthorCard({ authorSlug, authorName = '', bio, variant = 'inline' }: AuthorCardProps) {
  const full = variant === 'full'
  const size = full ? 64 : 48
  const photo = niche.author.photo

  return (
    <div className={full ? 'author author--full' : 'author'}>
      {photo ? (
        <Image
          className="author-ph"
          src={photo}
          alt={`Photo de ${authorName || 'l’auteur'}`}
          width={size}
          height={size}
        />
      ) : null}
      <div className="author-b">
        {authorName ? (
          <p className="author-n">
            <Link href={`/auteurs/${authorSlug}`}>{authorName}</Link>
          </p>
        ) : null}
        <p className="small muted">{bio}</p>
        {full ? (
          <p className="small">
            <Link className="lnk" href={`/auteurs/${authorSlug}`}>
              Voir tous les articles
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  )
}
