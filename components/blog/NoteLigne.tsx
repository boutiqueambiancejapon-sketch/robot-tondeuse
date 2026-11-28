import Link from 'next/link'
import { mieuxNotes, noteFiche, slugFiche } from '@/lib/notes-fiches'
import { FICHES_NOTE_OBJECTIVE, noteFr, noteObjective } from '@/lib/note-objective'
import { CATALOGUE } from '@/lib/radar-fiche'
import { formatDate, formatPrix } from '@/lib/offres-format'
import { SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'

/** Note sur 100 d'une fiche, avec le prix et la date utilisés, et le lien vers le barème. Rien si la fiche n'est pas notée. */
export function NoteLigne({ nom, slug }: { nom: string; slug?: string }) {
  // Fiche pilote de la note sur 10 : la même note que le haut de sa fiche, partout.
  const id = slugFiche(nom, slug)
  const robot = id && FICHES_NOTE_OBJECTIVE.includes(id) ? CATALOGUE.find((r) => r.id === id) : undefined
  const n10 = robot ? noteObjective(robot) : null
  if (n10?.note != null) {
    return (
      <p className="note-l" data-note={n10.note}>
        <span className="score">
          {noteFr(n10.note)}
          <small>/10</small>
        </span>{' '}
        <span className="dated">
          Confiance {n10.confiance}&nbsp;% ·{' '}
          <Link href="/comment-nous-notons" className="lnk">
            notre barème
          </Link>
        </span>
      </p>
    )
  }
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
        Note calculée avec le prix {n.marchand} du {formatDate(n.date)} ({formatPrix(n.prix)})
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
