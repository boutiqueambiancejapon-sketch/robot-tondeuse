import 'server-only'

// E-mails tab: Brevo list "10 Min Languages" (BREVO_LIST_ID, default 7), its latest campaigns and
// the sending domain's authentication. Read-only API calls, cached 5 minutes. Key in the shared
// .env (BREVO_API_KEY), never in the code.

const API = 'https://api.brevo.com/v3'
const DOMAIN = '10minlanguages.com'

export interface Campaign {
  id: number
  name: string
  subject: string
  status: string
  sentDate: string | null
  delivered: number
  opens: number
  clicks: number
}

export interface BrevoData {
  configured: boolean
  list: { name: string; subscribers: number; total: number } | null
  campaigns: Campaign[]
  domain: { authenticated: boolean; verified: boolean } | null
}

async function get<T>(pathname: string): Promise<T | null> {
  const key = process.env.BREVO_API_KEY
  if (!key) return null
  try {
    const res = await fetch(`${API}${pathname}`, { headers: { 'api-key': key, accept: 'application/json' }, next: { revalidate: 300 } })
    if (!res.ok) {
      console.error(`[dashboard] brevo ${pathname.split('?')[0]} status=${res.status}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error('[dashboard] brevo', err instanceof Error ? err.message : err)
    return null
  }
}

interface ListJson { name?: string; uniqueSubscribers?: number; totalSubscribers?: number }
interface CampaignJson {
  id: number
  name?: string
  subject?: string
  status?: string
  sentDate?: string
  recipients?: { lists?: number[] }
  statistics?: { globalStats?: { delivered?: number; uniqueViews?: number; uniqueClicks?: number } }
}
interface DomainJson { domain_name?: string; authenticated?: boolean; verified?: boolean }

export async function getBrevo(): Promise<BrevoData> {
  const listId = Number(process.env.BREVO_LIST_ID || 7)
  if (!process.env.BREVO_API_KEY) return { configured: false, list: null, campaigns: [], domain: null }
  const [list, campaigns, domains] = await Promise.all([
    get<ListJson>(`/contacts/lists/${listId}`),
    get<{ campaigns?: CampaignJson[] }>('/emailCampaigns?limit=50&sort=desc&statistics=globalStats'),
    get<{ domains?: DomainJson[] }>('/senders/domains'),
  ])
  const domain = domains?.domains?.find((d) => d.domain_name === DOMAIN)
  return {
    configured: true,
    list: list ? { name: list.name ?? '', subscribers: list.uniqueSubscribers ?? 0, total: list.totalSubscribers ?? 0 } : null,
    campaigns: (campaigns?.campaigns ?? [])
      .filter((c) => c.recipients?.lists?.includes(listId))
      .slice(0, 8)
      .map((c) => ({
        id: c.id,
        name: c.name ?? '',
        subject: c.subject ?? '',
        status: c.status ?? '',
        sentDate: c.sentDate ?? null,
        delivered: c.statistics?.globalStats?.delivered ?? 0,
        opens: c.statistics?.globalStats?.uniqueViews ?? 0,
        clicks: c.statistics?.globalStats?.uniqueClicks ?? 0,
      })),
    domain: domain ? { authenticated: Boolean(domain.authenticated), verified: Boolean(domain.verified) } : null,
  }
}

/** Transactional emails of this site (tags set in sendMail), last 30 days. */
export const TRANSACTIONAL = [
  { tag: 'kit-ready', label: 'Kit envoyé (lien du PDF + « send me the next tips »)' },
  { tag: 'kit-welcome', label: 'Bienvenue sur la liste (J0 de la suite kit)' },
  { tag: 'account-login', label: 'Lien de connexion au compte' },
] as const

export interface TransacStats {
  tag: string
  label: string
  requests: number
  delivered: number
  opens: number
  clicks: number
  bounces: number
  blocked: number
  spam: number
}

interface ReportJson { requests?: number; delivered?: number; uniqueOpens?: number; uniqueClicks?: number; hardBounces?: number; softBounces?: number; blocked?: number; spamReports?: number }

export async function getTransactional(days = 30): Promise<TransacStats[] | null> {
  return getTagReports(TRANSACTIONAL, days)
}

/** Brevo transactional report for each tag (sent, delivered, unique opens and clicks, problems). */
export async function getTagReports(tags: readonly { tag: string; label: string }[], days: number): Promise<TransacStats[] | null> {
  if (!process.env.BREVO_API_KEY) return null
  const reports = await Promise.all(tags.map((t) => get<ReportJson>(`/smtp/statistics/aggregatedReport?days=${days}&tag=${encodeURIComponent(t.tag)}`)))
  if (reports.every((r) => r === null)) return null
  return tags.map((t, i) => {
    const r = reports[i] ?? {}
    return {
      tag: t.tag,
      label: t.label,
      requests: r.requests ?? 0,
      delivered: r.delivered ?? 0,
      opens: r.uniqueOpens ?? 0,
      clicks: r.uniqueClicks ?? 0,
      bounces: (r.hardBounces ?? 0) + (r.softBounces ?? 0),
      blocked: r.blocked ?? 0,
      spam: r.spamReports ?? 0,
    }
  })
}
