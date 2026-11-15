/**
 * FaqAccordion — questions fréquentes en <details>, sans script.
 * Les réponses viennent de l'en-tête de l'article : seul le gras **…** est interprété.
 * Server Component.
 */
import type { ReactNode } from 'react'

type FaqItem = { q: string; a: string }

function withBold(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

export function FaqAccordion({ items = [] }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map(({ q, a }) => (
        <details className="acc" key={q}>
          <summary>{q}</summary>
          <p>{withBold(a)}</p>
        </details>
      ))}
    </div>
  )
}
