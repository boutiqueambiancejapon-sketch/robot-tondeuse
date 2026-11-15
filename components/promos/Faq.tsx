export type FaqItem = { q: string; a: string }

/** FAQ en accordéon natif (details.acc) : lisible et dépliable sans JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <details className="acc" key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
