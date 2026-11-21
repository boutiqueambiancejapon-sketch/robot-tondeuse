import Link from 'next/link'
import { SITE } from '@/lib/seo-dash/config'
import { hrefOf, MAIN_TABS, SUB_TABS, TOOLS, type NavItem } from '@/lib/seo-dash/nav'
import { openSeoPage, type SeoPageProps } from '@/lib/seo-dash/server/page'
import { SeoShell } from '@/components/seo-dash/shell/SeoShell'

// SEO dashboard: full menu ("Menu" tab of the iPhone bottom bar): site, screens (with their sub-screens), tools.

export const dynamic = 'force-dynamic'

function List({ items, query, desc }: { items: NavItem[]; query: string; desc: boolean }) {
  return (
    <ul className="sd-menu-list">
      {items.map((t) => (
        <li key={t.slug}>
          <Link href={hrefOf(t.slug, t.tool ? '' : query)}>
            <span>
              <b>{t.label}</b>
              {desc ? <small>{t.desc}</small> : null}
            </span>
            <span aria-hidden="true">›</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default async function MenuPage(props: SeoPageProps) {
  const { query } = await openSeoPage(props)
  return (
    <SeoShell current="menu" title="Menu">
      <div className="sd-menu-page">
        <section className="sd-card">
          <h2>Site</h2>
          <nav className="sd-seg sd-gap" aria-label="Sites">
            {SITE.sites.map((s) => (
              <a key={s.key} href={s.url} aria-current={s.key === SITE.key ? 'true' : undefined}>
                {s.label}
              </a>
            ))}
          </nav>
        </section>
        <section className="sd-card">
          <h2>Tableau de bord</h2>
          <List items={MAIN_TABS.flatMap((t) => [t, ...(SUB_TABS[t.slug] ?? []).map((x): NavItem => ({ ...x, desc: `${t.label} › ${x.label}`, mascot: t.mascot, tool: true }))])} query={query} desc />
        </section>
        <section className="sd-card">
          <h2>Outils</h2>
          <List items={TOOLS} query={query} desc={false} />
        </section>
      </div>
    </SeoShell>
  )
}
