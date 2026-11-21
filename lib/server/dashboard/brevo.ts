import 'server-only'

// E-mails tab: Brevo list 6 « La lettre du jardin » (Brevo account shared with Toutou Gourmet), its
// latest campaigns and the sending domain's authentication. Read-only API calls, cached 5 minutes.
// Key in the shared .env (BREVO_API_KEY), never in the code. The site sends no automatic e-mail.

const API = 'https://api.brevo.com/v3'
import { BREVO_LIST_ID_QRT } from '@/lib/newsletter/brevo'

const DOMAIN = 'quel-robot-tondeuse.com'

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
  const listId = BREVO_LIST_ID_QRT
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
