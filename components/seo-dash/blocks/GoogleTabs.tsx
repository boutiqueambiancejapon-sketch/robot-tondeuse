import Link from 'next/link'
import { hrefOf, SUB_TABS } from '@/lib/seo-dash/nav'

// SEO dashboard: contents of the Google screen (anchors to each part of the same page), then its sub-screens
// (none on QRT; 10minlanguages has its "How to say" fiches there).

const TABS = [
  ['#vue', 'Vue d’ensemble'],
  ['#requetes', 'Requêtes et pages'],
  ['#opportunites', 'Opportunités'],
  ['#indexation', 'Indexation'],
] as const

export function GoogleTabs({ current = '' }: { current?: string }) {
  return (
    <nav className="sd-tabs" aria-label="Parties de l’écran Google">
      {TABS.map(([href, label], i) => (
        <a key={href} href={current ? `${hrefOf('google')}${href}` : href} aria-current={!current && i === 0 ? 'true' : undefined}>
          {label}
        </a>
      ))}
      {(SUB_TABS.google ?? []).map((s) => (
        <Link key={s.slug} href={hrefOf(s.slug)} aria-current={current === s.slug ? 'true' : undefined}>
          {s.label}
        </Link>
      ))}
    </nav>
  )
}
