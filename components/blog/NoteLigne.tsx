import Link from 'next/link'
import { mieuxNotes, noteFiche, slugFiche } from '@/lib/notes-fiches'
import { noteFr, noteObjective } from '@/lib/note-objective'
import { CATALOGUE } from '@/lib/radar-fiche'
import { formatDate, formatPrix } from '@/lib/offres-format'
import { SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'

/**
 * Note d'un robot sur une carte produit. Robot de data/robots-tondeuses.json : la note sur 10, la même
 * que le haut de sa fiche (rien si elle n'est pas calculable). Sinon, l'ancienne note sur 100 avec le
 * prix et la date utilisés. Rien si le robot n'est pas noté.
 */
export function NoteLigne({ nom, slug }: { nom: string; slug?: string }) {
  const id = slug && CATALOGUE.some((r) => r.id === slug) ? slug : slugFiche(nom, slug)
  const robot = id ? CATALOGUE.find((r) => r.id === id) : undefined
  if (robot) {
    const n10 = noteObjective(robot)
    if (n10.note === null) return null
    return (
      <p className="note-l" data-note={n10.note}>
        <span className="score">
          {noteFr(n10.note)}
          <small>/10</small>
        </span>{' '}
        <span className="dated">
          Confiance {n10.confiance}&nbsp;%{n10.manques.length ? ` (${n10.manques.join(', ')})` : ''}, d&apos;après la fiche de {robot.marque}
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
