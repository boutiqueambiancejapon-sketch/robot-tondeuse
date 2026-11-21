import { n } from '@/lib/dashboard/format'
import type { ArticlePath } from '@/lib/dashboard/robots'
import { Card, Empty } from '../Card'

const SHOWN = 12

function List({ items }: { items: ArticlePath[] }) {
  return (
    <ul className="rows">
      {items.map((a) => (
        <li key={a.path} className="small">
          <a className="lnk" href={`https://10minlanguages.com${a.path}`} target="_blank" rel="noopener">
            {a.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Sitemap pages no AI robot has read yet, all robots together. */
export function UnreadPages({ pages, total }: { pages: ArticlePath[]; total: number }) {
  return (
    <Card title="Jamais lues par une IA" note={`${n(pages.length)} sur ${n(total)} pages`}>
      {pages.length === 0 ? <Empty>Chaque page du plan du site a reçu au moins une visite de robot IA.</Empty> : <List items={pages.slice(0, SHOWN)} />}
      {pages.length > SHOWN && (
        <details className="more">
          <summary>Voir les {pages.length - SHOWN} autres</summary>
          <List items={pages.slice(SHOWN)} />
        </details>
      )}
    </Card>
  )
}
