/**
 * Tip — conseil dans le corps d'un article, fond uni.
 * Usage MDX : <Tip>Texte ou **markdown** ici</Tip>
 */
import type { ReactNode } from 'react'

export function Tip({ children }: { children: ReactNode }) {
  return (
    <aside role="note" aria-label="Conseil" className="warn warn--tip">
      {children}
    </aside>
  )
}
