/**
 * Verdict — conclusion de l'article.
 * Usage MDX : <Verdict>Notre recommandation ici</Verdict>
 * Les attributs `note` et `label` écrits dans certains articles ne sont pas affichés
 * (pas de note sans barème public).
 */
import type { ReactNode } from 'react'

export function Verdict({ children }: { children: ReactNode }) {
  return (
    <aside className="verdict-box stack" aria-label="Notre verdict">
      <span className="tag">Notre verdict</span>
      <div className="verdict-t stack">{children}</div>
    </aside>
  )
}
