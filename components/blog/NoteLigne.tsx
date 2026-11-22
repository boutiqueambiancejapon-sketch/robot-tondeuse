import Link from 'next/link'
import { noteFiche } from '@/lib/notes-fiches'
import { formatDate, formatPrix } from '@/lib/offres-format'
import { SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'

/** Note sur 100 d'une fiche, avec le prix et la date utilisés, et le lien vers le barème. Rien si la fiche n'est pas notée. */
export function NoteLigne({ nom, slug }: { nom: string; slug?: string }) {
  const n = noteFiche(nom, slug)
  if (!n) return null
  return (
    <p className="note-l" data-note={n.note}>
      <span className="score">
        {n.note}
        <small>/100</small>
      </span>{' '}
      <span className="dated">
        Note calculée avec le prix {n.marchand} du {formatDate(n.date)} ({formatPrix(n.prix)}) ·{' '}
        <Link href="/comment-nous-notons" className="lnk">
          notre barème
        </Link>
        {n.proposerMieux ? (
          <>
            {' '}
            · Sous {SEUIL_PROPOSER_MIEUX}&nbsp;: comparez d’abord avec un robot{' '}
            <Link href="/comparer" className="lnk">
              mieux noté
            </Link>
            .
          </>
        ) : null}
      </span>
    </p>
  )
}
