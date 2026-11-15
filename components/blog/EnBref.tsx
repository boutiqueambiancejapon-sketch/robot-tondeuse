/** « En bref » : le résumé de l'article (champ aiSummary), en tête de page. Server Component. */
export function EnBref({ points }: { points: string[] }) {
  if (!points.length) return null
  return (
    <aside className="tldr" aria-labelledby="en-bref">
      <h2 id="en-bref" className="h-sm">
        En bref
      </h2>
      <ul className="tldr-l">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </aside>
  )
}
