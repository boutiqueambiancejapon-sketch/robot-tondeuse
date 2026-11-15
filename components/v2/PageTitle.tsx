import Link from 'next/link'
import type { Pose } from '@/lib/mascotte'
import { Mascotte } from './Mascotte'

type Crumb = { href?: string; label: string }
type Props = { title: string; pose?: Pose; meta?: string; crumbs?: Crumb[] }

/** Haut de page V2 : fil d'Ariane, H1 à taille de lecture, mascotte de la page, ligne d'information. */
export function PageTitle({ title, pose, meta, crumbs }: Props) {
  return (
    <>
      {crumbs && crumbs.length > 0 ? (
        <p className="crumb">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 ? ' › ' : ''}
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </span>
          ))}
        </p>
      ) : null}
      <div className="ttl">
        <h1 className="h-xl">{title}</h1>
        {pose ? <Mascotte pose={pose} size={104} className="masc" priority /> : null}
      </div>
      {meta ? <p className="dated" style={{ margin: '-8px 0 16px' }}>{meta}</p> : null}
    </>
  )
}
