/** NoteSur10 — « 7,8/10 » en vert, ou « — » si le robot n'est pas noté (jamais de note devinée). */
import { noteFr } from '@/lib/note-objective'

export function NoteSur10({ note, taille = 'm' }: { note: number | null; taille?: 's' | 'm' | 'l' }) {
  return (
    <span className={`g-score g-score--${taille}`} aria-label={note !== null ? `Note ${noteFr(note)} sur 10` : 'Pas de note'}>
      {note !== null ? noteFr(note) : '—'}
      <small>/10</small>
    </span>
  )
}
