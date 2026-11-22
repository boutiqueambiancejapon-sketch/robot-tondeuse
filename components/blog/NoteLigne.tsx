import Link from 'next/link'
import { mieuxNotes, noteFiche } from '@/lib/notes-fiches'
import { formatDate, formatPrix } from '@/lib/offres-format'
import { SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'

/** Note sur 100 d'une fiche, avec le prix et la date utilisés, et le lien vers le barème. Rien si la fiche n'est pas notée. */
export function NoteLigne({ nom, slug }: { nom: string; slug?: string }) {
  const n = noteFiche(nom, slug)
  if (!n) return null
  const mieux = n.proposerMieux ? mieuxNotes(nom, slug) : []
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
        {n.proposerMieux && !mieux.length ? (
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
      {mieux.length ? (
        <span className="note-mieux">
          Sous {SEUIL_PROPOSER_MIEUX}&nbsp;: avant de choisir ce robot, regardez{' '}
          {mieux.length > 1 ? 'ces 2 robots mieux notés' : 'ce robot mieux noté'}, de surface proche&nbsp;:
          {mieux.map((a, i) => (
            <span key={a.slug}>
              {i ? ' ;' : ''}{' '}
              <a href={a.url} rel="sponsored nofollow noopener" target="_blank" className="lnk" data-cta="mieux-note" data-robot={a.nom}>
                {a.nom}
              </a>{' '}
              ({a.note}/100, {a.surface.toLocaleString('fr-FR')}&nbsp;m², {formatPrix(a.prix)} chez {a.marchand} le{' '}
              {formatDate(a.date)})
            </span>
          ))}
          .
        </span>
      ) : null}
    </p>
  )
}
