import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/seo-dash/config'
import { BOTTOM_BAR, BOTTOM_PARENT, hrefOf, MAIN_TABS, navOf, SUB_TABS, TOOLS } from '@/lib/seo-dash/nav'
import { Mascotte } from '@/components/v2/Mascotte'
import { NavIcon } from './Icons'

// SEO dashboard: left menu (computer), top line and bottom bar (iPhone). Filters follow from one steering tab to the
// next (query); tools open without them. Sub-screens, when a tab has some, are listed under it.

export function SiteSwitcher({ compact = false }: { compact?: boolean }) {
  return (
    <details className="sd-sel plain">
      <summary aria-label="Changer de site">
        {compact ? SITE.name : <span>changer de site</span>}
      </summary>
      <nav className="sd-menu" aria-label="Sites">
        {SITE.sites.map((s) => (
          <a key={s.key} href={s.url} aria-current={s.key === SITE.key ? 'true' : undefined}>
            {s.label}
          </a>
        ))}
      </nav>
    </details>
  )
}

export function Sidebar({ current, query }: { current: string; query: string }) {
  return (
    <aside className="sd-side">
      <div className="sd-brand">
        <Mascotte pose="side" size={36} className="sd-mark" />
        <div>
          {SITE.name}
          <small>
            <SiteSwitcher />
          </small>
        </div>
      </div>
      <nav className="sd-nav" aria-label="Tableau de bord">
        {MAIN_TABS.map((t) => (
          <Fragment key={t.slug}>
            <Link href={hrefOf(t.slug, query)} aria-current={t.slug === current ? 'page' : undefined}>
              {t.label}
            </Link>
            {(SUB_TABS[t.slug] ?? []).map((s) => (
              <Link key={s.slug} href={hrefOf(s.slug)} className="sd-subnav" aria-current={s.slug === current ? 'page' : undefined}>
                {s.label}
              </Link>
            ))}
          </Fragment>
        ))}
        <p className="sd-navh">Outils</p>
        {TOOLS.map((t) => (
          <Link key={t.slug} href={hrefOf(t.slug)} aria-current={t.slug === current ? 'page' : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export function MobileTop({ title, mascot }: { title: string; mascot: ReactNode }) {
  return (
    <div className="sd-mtop">
      <div>
        <div className="site">
          <SiteSwitcher compact />
        </div>
        <div className="ti">{title}</div>
      </div>
      {mascot}
    </div>
  )
}

export function BottomBar({ current, query }: { current: string; query: string }) {
  const lit = BOTTOM_PARENT[current] ?? navOf(current)
  const tools = TOOLS.some((t) => t.slug === lit) || lit === 'menu'
  return (
    <nav className="sd-mtab" aria-label="Onglets principaux">
      {BOTTOM_BAR.map((b) => {
        const on = b.slug === 'menu' ? tools || !BOTTOM_BAR.some((x) => x.slug === lit) : b.slug === lit
        return (
          <Link key={b.slug} href={hrefOf(b.slug, b.slug === 'menu' ? '' : query)} aria-current={on ? 'page' : undefined}>
            <NavIcon name={b.icon} />
            {b.label}
          </Link>
        )
      })}
    </nav>
  )
}
