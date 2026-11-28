// SEO dashboard: everything specific to quel-robot-tondeuse.com lives here (ported from Toutou Gourmet's
// lib/seo-dash/config.ts on 2026-11-21, through 10minlanguages' port). The data readers (lib/seo-dash/server/*) and
// the views (components/seo-dash/*) are shared with Toutou and 10minlanguages; keep them site-neutral.
// Plain module (no "@/" import): the nightly scripts load it too.

export interface PageTypeRule {
  key: string
  label: string
  /** Plural label for tables and the "Pages" filter. */
  plural: string
  match: RegExp
}

export interface SiteConfig {
  key: string
  name: string
  baseUrl: string
  /** Search Console property (sc-domain:… or https://…/). */
  gscSite: string
  /** First day with Search Console data: the year-on-year comparison only exists 364 days later. */
  gscStart: string
  /** First day of the server logs (analytics.hits). */
  logsStart: string
  /** Every sitemap read by the nightly audit, URL inspection and "never crawled" (index files are followed). */
  sitemaps: string[]
  /** Site hosts in the logs and in Search Console addresses. */
  hosts: string[]
  /** Project key in the control centre (commissions table, copied by deploy/revenue-sync.sh). */
  controlProject: string
  goalMonthly: number
  partner: {
    names: string[]
    /** analytics.events name of a partner click. */
    event: string
    /** SQL label grouping the clicks (Toutou: the brand; 10min: the link's place; QRT: the merchant). */
    groupSql: string
    groupPlural: string
    /** Estimated euros per click; null while unknown (the screens show clicks and "€ ?"). */
    valuePerClick: number | null
    /** Estimated customers per click; null while unknown. */
    clientRate: number | null
  }
  pageTypes: PageTypeRule[]
  /** Exploration chart groups: page types counted as "fiche" or "article" (other pages and files apart). */
  crawlGroups: { fiche: string[]; article: string[] }
  crawlLabels: { fiche: string; article: string; autre: string; asset: string }
  /** List pages (HTML sitemap, hubs): their links don't count when looking for orphan pages. */
  linkHubs: string[]
  /** Paths never audited nor counted as internal links (private or app pages, files). */
  auditSkip: RegExp
  /** Owner's other dashboards: site switcher. */
  sites: { key: string; label: string; url: string }[]
}

const MERCHANT_SQL = `CASE props->>'merchant' WHEN 'amazon' THEN 'Amazon' WHEN 'cdiscount' THEN 'Cdiscount' WHEN 'fnac' THEN 'Fnac' ELSE 'Autre marchand' END`

export const SITE: SiteConfig = {
  key: 'qrt',
  name: 'Quel Robot Tondeuse',
  baseUrl: 'https://quel-robot-tondeuse.com',
  // The service account has no access to this property yet: the Google screens say « À connecter » until
  // /srv/sites/robot-tondeuse/shared/gsc-key.json exists, the property is shared and the nightly collector has run.
  gscSite: process.env.GSC_SITE || 'sc-domain:quel-robot-tondeuse.com',
  gscStart: '2026-03-29',
  logsStart: '2026-11-20',
  sitemaps: ['https://quel-robot-tondeuse.com/sitemap.xml'],
  hosts: ['quel-robot-tondeuse.com', 'www.quel-robot-tondeuse.com'],
  controlProject: 'robot-tondeuse',
  goalMonthly: 5000,
  partner: {
    names: ['Amazon', 'Cdiscount', 'Fnac'],
    event: 'affiliate_click',
    // Toutou groups by brand; here by merchant (Amazon direct, Cdiscount and Fnac through Awin), as Conversions does.
    groupSql: MERCHANT_SQL,
    groupPlural: 'Par marchand',
    valuePerClick: null,
    clientRate: null,
  },
  // Order matters: the first matching rule wins. Articles live at the root (/<slug>), under /blog/<rubrique>/<slug>
  // and /robot-piscine/<slug> (lib/dashboard/page-type.ts, the tools' own grouping).
  pageTypes: [
    { key: 'guide-pdf', label: 'guide PDF', plural: 'Guides PDF', match: /^\/guides\/.+\.pdf$/i },
    { key: 'fiche', label: 'page robots d’une marque', plural: 'Fiches robots par marque (/choisir, /comparer)', match: /^\/(choisir|comparer)\/[^/]+/ },
    { key: 'test', label: 'test et avis d’un robot', plural: 'Tests et avis', match: /^\/(test-[a-z0-9-]+-avis|avis-[a-z0-9-]+)\/?$/ },
    { key: 'comparatif', label: 'comparatif', plural: 'Comparatifs', match: /^\/(comparatifs|comparer\/?$|[a-z0-9-]+-vs-[a-z0-9-]+|[a-z0-9-]*comparatif[a-z0-9-]*\/?$)/ },
    { key: 'guide', label: 'guide d’achat', plural: 'Guides d’achat', match: /^\/(quel-robot-tondeuse-pour-[a-z0-9-]+|[a-z0-9-]*guide-achat[a-z0-9-]*)\/?$/ },
    { key: 'promo', label: 'page promo', plural: 'Promos, Black Friday, codes promo', match: /^\/(code-promo|black-friday-robot-tondeuse|deals)(\/|$)/ },
    { key: 'outil', label: 'outil', plural: 'Accueil, quiz et outils', match: /^\/($|(quiz|simulateur|superficie|calculateur-rentabilite-robot-tondeuse|calendrier-du-gazon|fiche-hivernage-robot-tondeuse)(\/|$))/ },
    { key: 'marque', label: 'page marques', plural: 'Marques', match: /^\/marques(\/|$)/ },
    { key: 'piscine', label: 'robot piscine', plural: 'Rubrique robot piscine', match: /^\/robot-piscine(\/|$)/ },
    { key: 'confiance', label: 'page de confiance', plural: 'Méthode, auteurs, mentions', match: /^\/(comment-nous-notons|auteurs|mentions-legales|confidentialite)(\/|$)/ },
    { key: 'article', label: 'article', plural: 'Articles', match: /^\/(blog(\/|$)|[a-z0-9-]+\/?$)/ },
  ],
  crawlGroups: { fiche: ['fiche', 'test'], article: ['article', 'guide', 'comparatif', 'piscine'] },
  crawlLabels: { fiche: 'fiches et tests de robots', article: 'articles, guides et comparatifs', autre: 'autres pages', asset: 'images et fichiers' },
  linkHubs: ['/blog', '/comparatifs', '/comparer', '/marques', '/code-promo', '/black-friday-robot-tondeuse', '/deals', '/robot-piscine'],
  auditSkip: /^\/(api|_next|dashboard|admin|go)(\/|$)|\.(png|jpe?g|webp|avif|svg|pdf|xml|txt|ico|json|js|css|webmanifest)$/i,
  sites: [
    { key: 'toutou', label: 'Toutou Gourmet', url: 'https://dashboard.toutou-gourmet.com/tableau-de-bord' },
    { key: 'aj', label: 'Ambiance Japon', url: 'https://ambiance-japon.com/dashboard' },
    { key: 'miami', label: 'Miami with Neko', url: 'https://miamiwithneko.com/dashboard' },
    { key: 'belgium', label: 'Travel to Belgium', url: 'https://travel-to-belgium.com/dashboard' },
    { key: 'qrt', label: 'Quel Robot Tondeuse', url: 'https://quel-robot-tondeuse.com/dashboard' },
    { key: '10min', label: '10minlanguages', url: 'https://10minlanguages.com/dashboard' },
  ],
}

export const OTHER_TYPE = { key: 'autre', label: 'autre page', plural: 'Autres pages' } as const

/** Type of an address (path only, no host or #anchor). */
export function pageTypeOf(path: string): string {
  return SITE.pageTypes.find((t) => t.match.test(path))?.key ?? OTHER_TYPE.key
}

export function pageTypeLabel(key: string, plural = false): string {
  const t = SITE.pageTypes.find((x) => x.key === key)
  if (!t) return plural ? OTHER_TYPE.plural : OTHER_TYPE.label
  return plural ? t.plural : t.label
}

/** PostgreSQL regex (~) of a page type, to filter in the database. */
export function pageTypeSql(key: string): string | null {
  return SITE.pageTypes.find((t) => t.key === key)?.match.source ?? null
}

/** Clean path of a Search Console address: no host, no #anchor, no query string. */
export function cleanPath(url: string): string {
  let p = url
  for (const h of SITE.hosts) p = p.replace(`https://${h}`, '').replace(`http://${h}`, '')
  p = p.split('#')[0]?.split('?')[0] ?? ''
  return p || '/'
}

/** Partner value is known (Toutou: per brand; 10min and QRT: not yet). */
export const valueKnown = (): boolean => SITE.partner.valuePerClick !== null
