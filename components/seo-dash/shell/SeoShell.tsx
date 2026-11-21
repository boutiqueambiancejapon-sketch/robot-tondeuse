import type { ReactNode } from 'react'
import { Mascotte } from '@/components/v2/Mascotte'
import { mascotOf } from '@/lib/seo-dash/nav'
import { filterQuery, type Filters } from '@/lib/seo-dash/filters'
import { FilterBar } from './FilterBar'
import { BottomBar, MobileTop, Sidebar } from './Sidebar'
import '../seo-dash.css'

// SEO dashboard frame: left menu, title with the page's mascot and one-line intro, filter bar, then the page.
// On iPhone: site name and title on top (small mascot), 5-tab bar at the bottom.

interface Props {
  current: string
  title: string
  sub?: string
  filters?: Filters
  /** Chemin de la page, pour les liens des filtres. */
  path?: string
  keep?: Record<string, string>
  fresh?: string
  hide?: ('compare' | 'pages' | 'device')[]
  /** Contenu d'un outil (anciens écrans) : pas de styles de tableau du nouveau tableau de bord. */
  legacy?: boolean
  children: ReactNode
}

export function SeoShell({ current, title, sub, filters, path, keep, fresh, hide, legacy = false, children }: Props) {
  const query = filters ? filterQuery(filters) : ''
  const pose = mascotOf(current)
  const mascot = (priority: boolean) => <Mascotte pose={pose} size={priority ? 96 : 40} className="sd-masc" priority={priority} />
  return (
    <div className="sd">
      <div className="sd-app">
        <Sidebar current={current} query={query} />
        <main className={`sd-main ${legacy ? 'sd-old' : 'sd-v'}`}>
          <MobileTop title={title} mascot={mascot(false)} />
          <div className="sd-top sd-v">
            <div>
              <h1>{title}</h1>
              {sub ? <p className="sd-sub">{sub}</p> : null}
            </div>
            {mascot(true)}
          </div>
          {filters && path ? <FilterBar filters={filters} path={path} keep={keep} fresh={fresh} hide={hide} /> : null}
          {children}
        </main>
      </div>
      <BottomBar current={current} query={query} />
    </div>
  )
}
