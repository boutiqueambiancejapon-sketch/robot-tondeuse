/**
 * Warning — mise en garde dans le corps d'un article, fond uni.
 * Usage MDX : <Warning>Texte ici</Warning>
 */
import type { ReactNode } from 'react'

export function Warning({ children }: { children: ReactNode }) {
  return (
    <aside role="note" aria-label="Attention" className="warn">
      {children}
    </aside>
  )
}
