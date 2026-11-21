import 'server-only'
import type { Pool } from 'pg'
import type { Period } from '@/lib/dashboard/period'
import type { Row } from './safe'

// Conversions tab: Preply clicks per page (with that page's views over the same period), per link,
// where on the page, newsletter sign-ups per page and per kit, calculator and quiz results.

export interface PageClicks {
  page: string
  clicks: number
  views: number
}

export interface ConversionData {
  total: number
  views: number
  byPage: PageClicks[]
  byLink: Row[]
  byPlace: Row[]
  signups: Row[]
  /** Calculator and quiz results, free-kit requests (asked vs confirmed). */
  tools: Row[]
  kits: Row[]
}

export const EMPTY_CONVERSIONS: ConversionData = { total: 0, views: 0, byPage: [], byLink: [], byPlace: [], signups: [], tools: [], kits: [] }

const LINKS: Record<string, string> = {
  text: 'Boutons et liens texte',
  'banner-300x600': 'Bannière 300×600',
  'banner-250x250': 'Bannière 250×250',
  'banner-300x50': 'Bannière mobile 300×50',
  other: 'Autre lien Preply',
}

export async function getConversions(pool: Pool, period: Period): Promise<ConversionData> {
  const p = [period.interval]
  const [totals, byPage, byLink, signups, byPlace, tools, kits] = await Promise.all([
    pool.query<{ total: number; views: number }>(
      `SELECT (SELECT count(*)::int FROM analytics.events WHERE name = 'preply_click' AND ts >= now() - $1::interval) AS total,
              (SELECT count(*)::int FROM analytics.hits WHERE kind = 'human' AND (status BETWEEN 200 AND 299 OR status = 304) AND ts >= now() - $1::interval) AS views`,
      p,
    ),
    pool.query<PageClicks>(
      `WITH c AS (SELECT page, count(*)::int AS clicks FROM analytics.events WHERE name = 'preply_click' AND ts >= now() - $1::interval GROUP BY 1),
            v AS (SELECT path AS page, count(*)::int AS views FROM analytics.hits WHERE kind = 'human' AND (status BETWEEN 200 AND 299 OR status = 304) AND ts >= now() - $1::interval GROUP BY 1)
       SELECT c.page, c.clicks, coalesce(v.views, 0) AS views FROM c LEFT JOIN v USING (page) ORDER BY c.clicks DESC, c.page LIMIT 20`,
      p,
    ),
    pool.query<Row>(`SELECT coalesce(props->>'link', 'other') AS label, count(*)::int AS value FROM analytics.events WHERE name = 'preply_click' AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC`, p),
    pool.query<Row>(`SELECT page AS label, count(*)::int AS value FROM analytics.events WHERE name = 'newsletter_signup' AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC LIMIT 10`, p),
    pool.query<Row>(`SELECT coalesce(props->>'place', 'sans emplacement') AS label, count(*)::int AS value FROM analytics.events WHERE name = 'preply_click' AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC LIMIT 12`, p),
    pool.query<Row>(
      `SELECT CASE WHEN name = 'calc_result' THEN 'Calculateur · ' || coalesce(props->>'lang', '?') || ' → ' || coalesce(props->>'to', '?')
                   ELSE 'Quiz méthode · ' || coalesce(props->>'result', '?') END AS label, count(*)::int AS value
       FROM analytics.events WHERE name IN ('calc_result', 'quiz_result') AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 2 DESC LIMIT 12`,
      p,
    ),
    pool.query<Row>(
      `SELECT coalesce(props->>'kit', '?') || CASE WHEN name = 'kit_request' THEN ' · demandé' ELSE ' · confirmé' END AS label, count(*)::int AS value
       FROM analytics.events WHERE name IN ('kit_request', 'newsletter_signup') AND ts >= now() - $1::interval GROUP BY 1 ORDER BY 1`,
      p,
    ),
  ])
  return {
    total: totals.rows[0]?.total ?? 0,
    views: totals.rows[0]?.views ?? 0,
    byPage: byPage.rows,
    byLink: byLink.rows.map((r) => ({ ...r, label: LINKS[r.label] ?? r.label })),
    byPlace: byPlace.rows,
    signups: signups.rows,
    tools: tools.rows,
    kits: kits.rows,
  }
}
