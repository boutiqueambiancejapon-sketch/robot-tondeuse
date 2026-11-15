/**
 * ProConTable — points forts et limites côte à côte.
 * Usage MDX :
 *   <ProConTable pros="Avantage 1|Avantage 2" cons="Inconvénient 1|Inconvénient 2" />
 * Les attributs sont des chaînes (compileMDX ne passe pas d'expressions).
 */

type Props = {
  pros: string | string[]
  cons: string | string[]
  labelPro?: string
  labelCon?: string
}

function parseList(val: string | string[] | undefined): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val
  return val.split('|').map((s) => s.trim()).filter(Boolean)
}

export function ProConTable({ pros, cons, labelPro = 'Pour', labelCon = 'Contre' }: Props) {
  const columns = [
    { className: 'yes', label: labelPro, items: parseList(pros) },
    { className: 'no', label: labelCon, items: parseList(cons) },
  ]

  return (
    <div className="duo">
      {columns.map(({ className, label, items }) => (
        <div className={className} key={className}>
          <h3>{label}</h3>
          <ul className="duo-l">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
