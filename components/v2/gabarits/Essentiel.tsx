/**
 * Essentiel — « L'essentiel en 30 secondes » : 3 à 5 lignes (pour qui, point fort, point faible, alternative).
 * Fond uni, sans liseré. Le contenu vient des données (lib/fiche-note.ts), jamais d'un essai.
 */
import type { ReactNode } from 'react'

export type LigneEssentiel = { type: 'pour' | 'fort' | 'faible' | 'info'; texte: ReactNode }

const SIGNE: Record<LigneEssentiel['type'], string> = { pour: '✓', fort: '✓', faible: '✗', info: '→' }
const NOM: Record<LigneEssentiel['type'], string> = { pour: 'pour', fort: 'point fort', faible: 'point faible', info: 'à savoir' }

export function Essentiel({ lignes, titre = 'L’essentiel en 30 secondes', id = 'essentiel' }: { lignes: LigneEssentiel[]; titre?: string; id?: string }) {
  if (!lignes.length) return null
  return (
    <section className="g-sec" aria-labelledby={id}>
      <h2 id={id} className="g-h2">
        {titre}
      </h2>
      <ul className="g-ess" id={`${id}-liste`}>
        {lignes.map((l, i) => (
          <li key={i} className={`g-ess__${l.type}`}>
            <i aria-label={NOM[l.type]}>{SIGNE[l.type]}</i>
            <span>{l.texte}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
