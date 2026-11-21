// Type of a public page, from its path: groups the traffic, the conversions and the robots' reads.

export const PAGE_TYPES = ['blog', 'languages', 'review', 'personas', 'tools', 'daily', 'kits', 'account', 'level', 'home', 'other'] as const
export type PageType = (typeof PAGE_TYPES)[number]

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  blog: 'Articles',
  languages: 'Pages langue',
  review: 'Avis Preply',
  personas: 'Pages « pour qui »',
  tools: 'Outils et quiz',
  daily: 'Exercice du jour',
  kits: 'Kits gratuits',
  account: 'Compte, carnet, préparation',
  level: 'Niveaux partagés',
  home: 'Accueil',
  other: 'Autres pages',
}

const RULES: [RegExp, PageType][] = [
  [/^\/blog(\/|$)/, 'blog'],
  [/^\/languages(\/|$)/, 'languages'],
  [/^\/preply-review(\/|$)/, 'review'],
  [/^\/for(\/|$)/, 'personas'],
  [/^\/(tools|level-quiz)(\/|$)/, 'tools'],
  [/^\/daily(\/|$)/, 'daily'],
  [/^\/free-kits(\/|$)|^\/kits\//, 'kits'],
  [/^\/(account|notebook|lesson-prep)(\/|$)/, 'account'],
  [/^\/level(\/|$)/, 'level'],
]

export function pageTypeOf(path: string): PageType {
  if (path === '/' || path === '') return 'home'
  for (const [re, type] of RULES) if (re.test(path)) return type
  return 'other'
}
