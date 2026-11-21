// Type of a public page, from its path: groups the traffic, the conversions and the robots' reads.
// Articles live at the root (/<slug>), under /blog/<rubrique>/<slug> and /robot-piscine/<slug>.

export const PAGE_TYPES = ['home', 'articles', 'produits', 'comparer', 'promos', 'outils', 'piscine', 'marques', 'guides', 'confiance', 'other'] as const
export type PageType = (typeof PAGE_TYPES)[number]

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  home: 'Accueil',
  articles: 'Articles et guides',
  produits: 'Fiches robot (/choisir)',
  comparer: 'Comparateur et comparatifs',
  promos: 'Promos, Black Friday, bons plans',
  outils: 'Quiz et outils',
  piscine: 'Rubrique robot piscine',
  marques: 'Marques',
  guides: 'Guides PDF',
  confiance: 'Méthode, auteurs, mentions',
  other: 'Autres pages',
}

const RULES: [RegExp, PageType][] = [
  [/^\/guides\/.+\.pdf$/i, 'guides'],
  [/^\/choisir(\/|$)/, 'produits'],
  [/^\/(comparer|comparatifs)(\/|$)/, 'comparer'],
  [/^\/(code-promo|black-friday-robot-tondeuse|deals)(\/|$)/, 'promos'],
  [/^\/(quiz|simulateur|superficie|calculateur-rentabilite-robot-tondeuse|calendrier-du-gazon|fiche-hivernage-robot-tondeuse)(\/|$)/, 'outils'],
  [/^\/robot-piscine\/?$/, 'piscine'],
  [/^\/robot-piscine\/[^/]+/, 'articles'],
  [/^\/marques(\/|$)/, 'marques'],
  [/^\/(comment-nous-notons|auteurs|mentions-legales|confidentialite)(\/|$)/, 'confiance'],
  [/^\/blog(\/|$)/, 'articles'],
  [/^\/[a-z0-9-]+\/?$/, 'articles'],
]

export function pageTypeOf(path: string): PageType {
  if (path === '/' || path === '') return 'home'
  for (const [re, type] of RULES) if (re.test(path)) return type
  return 'other'
}

/** Promo pages: their visits are a conversion goal of their own (Black Friday, codes, bons plans). */
export const PROMO_PATH_SQL = `path ~ '^/(code-promo|black-friday-robot-tondeuse|deals)(/|$)'`
/** PDF guides in public/guides: a download is a goal, not a page view. */
export const PDF_PATH_SQL = `path ~* '^/guides/.+\\.pdf$'`
