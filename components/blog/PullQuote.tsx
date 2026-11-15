/**
 * PullQuote — phrase de l'article mise en avant.
 * Usage MDX : <PullQuote>Le choix dépend du jardin, pas de la fiche technique.</PullQuote>
 * Server Component.
 */
import type { ReactNode } from 'react'

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="pq">
      <p>{children}</p>
    </blockquote>
  )
}
