import type { Pose } from '@/lib/mascotte'

// SEO dashboard navigation (ported from Toutou Gourmet, via 10minlanguages): 7 steering tabs, then the tools (opened
// less often). Old addresses of replaced tabs redirect (app/dashboard/trafic, robots, contenu/recherche). Each entry
// has its pose of the robot mascot (components/v2/Mascotte, public/images/mascotte/robot-*.webp).

export const ROOT = '/dashboard'

export type IconKey = 'today' | 'google' | 'crawl' | 'tech' | 'revenue' | 'live' | 'sources' | 'notes' | 'menu'

export interface NavItem {
  slug: string
  label: string
  desc: string
  icon?: IconKey
  mascot: Pose
  /** Tool without the shared filter bar. */
  tool?: boolean
}

export const MAIN_TABS: NavItem[] = [
  { slug: '', label: 'Aujourd’hui', desc: 'Les 5 actions du jour et ce qui sort de l’ordinaire', icon: 'today', mascot: 'jardinier' },
  { slug: 'google', label: 'Google', desc: 'Clics, positions, opportunités, indexation', icon: 'google', mascot: 'loupe' },
  { slug: 'exploration', label: 'Exploration', desc: 'Ce que Googlebot et les IA lisent', icon: 'crawl', mascot: 'top' },
  { slug: 'technique', label: 'Technique', desc: 'Vitesse, liens cassés, titres', icon: 'tech', mascot: 'outils' },
  { slug: 'revenus', label: 'Revenus', desc: 'Quelles pages envoient vers Amazon, Cdiscount, Fnac', icon: 'revenue', mascot: 'prix' },
  { slug: 'en-direct', label: 'Direct', desc: 'Qui est sur le site maintenant', icon: 'live', mascot: 'side' },
  { slug: 'sources', label: 'Sources', desc: 'Moteurs, IA, réseaux, e-mails : d’où viennent les visites', icon: 'sources', mascot: 'ete' },
  { slug: 'contenu', label: 'Contenu & notes', desc: 'Publications, prix, changements, notes', icon: 'notes', mascot: 'lecture' },
]

export const TOOLS: NavItem[] = [
  { slug: 'conversions', label: 'Conversions', desc: 'Clics par marchand et par robot, quiz, guides PDF, promos', tool: true, mascot: 'fete' },
  { slug: 'crm', label: 'Contacts', desc: 'Contacts et suivi', tool: true, mascot: 'podium' },
  { slug: 'emails', label: 'E-mails', desc: 'Liste et campagnes', tool: true, mascot: 'printemps' },
  { slug: 'serveur', label: 'Serveur', desc: 'Service, mises en ligne, relevés', tool: true, mascot: 'calcul' },
  { slug: 'securite', label: 'Sécurité', desc: 'Connexions et appareils', tool: true, mascot: 'balance' },
]

/** Sub-screens shown under a tab (none on QRT: no programmatic pages indexed by batches). */
export const SUB_TABS: Record<string, { slug: string; label: string }[]> = {}

/** iPhone bottom bar: 4 tabs + Menu. */
export const BOTTOM_BAR: { slug: string; label: string; icon: IconKey }[] = [
  { slug: '', label: 'Aujourd’hui', icon: 'today' },
  { slug: 'google', label: 'Google', icon: 'google' },
  { slug: 'revenus', label: 'Revenus', icon: 'revenue' },
  { slug: 'en-direct', label: 'Direct', icon: 'live' },
  { slug: 'menu', label: 'Menu', icon: 'menu' },
]

/** Screens without a bottom-bar tab: the tab lit in their place (Sources is a sub-tab of Direct). */
export const BOTTOM_PARENT: Record<string, string> = { sources: 'en-direct' }

export function hrefOf(slug: string, query = ''): string {
  return `${slug ? `${ROOT}/${slug}` : ROOT}${query}`
}

/** Nav entry lit for a dashboard slug (sub-screens included). */
export function navOf(slug: string): string {
  for (const [parent, subs] of Object.entries(SUB_TABS)) if (subs.some((s) => s.slug === slug)) return parent
  return slug
}

export function mascotOf(slug: string): Pose {
  const s = navOf(slug)
  return [...MAIN_TABS, ...TOOLS].find((t) => t.slug === s)?.mascot ?? 'side'
}

/** Detail of one page (same template for all), filters kept. */
export function pageHref(path: string, query = ''): string {
  const q = new URLSearchParams(query.replace(/^\?/, ''))
  q.set('u', path)
  return `${ROOT}/google/page?${q.toString()}`
}

/** Detail of one query. */
export function queryHref(text: string, query = ''): string {
  const q = new URLSearchParams(query.replace(/^\?/, ''))
  q.set('q', text)
  return `${ROOT}/google/requete?${q.toString()}`
}

/** CSV export of a table: same request as the screen. */
export function csvHref(id: string, query = '', extra: Record<string, string> = {}): string {
  const q = new URLSearchParams(query.replace(/^\?/, ''))
  for (const [k, v] of Object.entries(extra)) q.set(k, v)
  const s = q.toString()
  return `${ROOT}/export/${id}${s ? `?${s}` : ''}`
}
