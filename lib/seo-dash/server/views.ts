import { humanView } from '@/lib/server/dashboard/sessions'

// SEO dashboard, Quel Robot Tondeuse: where the "people" figures come from. Toutou counts page views from its JS beacon
// (events "Pageview"); here, as on 10minlanguages, page views are Caddy's log lines for people (analytics.hits,
// kind = 'human', 2xx/304, never a file), robots and scrapers already set apart by the ingester. Actions come from
// analytics.events. QRT has no accounts: the fifth tile of Aujourd'hui counts letter sign-ups instead.

/** SQL condition of a human page view on analytics.hits (alias with its dot, e.g. "h."). */
export const VIEW = (a = ''): string => humanView(a)

/** analytics.events names ("account" = the second goal after partner clicks: a letter sign-up on QRT). */
export const EV = { account: 'newsletter_signup', vital: 'web_vital' } as const
