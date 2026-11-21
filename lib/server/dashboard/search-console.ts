import 'server-only'
import { createSign } from 'node:crypto'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

// Search Console, read-only, with the Google service account Toutou already uses (key file
// GSC_KEY_FILE, default /srv/sites/robot-tondeuse/shared/gsc-key.json, never in the repo). The
// token is signed here (RS256), no Google library. Adapted from Toutou. Also used by the nightly SEO collectors
// (scripts/seo/*.ts, run with scripts/lib/ts-register.mjs, where `server-only` is a no-op).

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'
const KEY_FILE = process.env.GSC_KEY_FILE || '/srv/sites/robot-tondeuse/shared/gsc-key.json'
export const GSC_SITE = process.env.GSC_SITE || 'sc-domain:quel-robot-tondeuse.com'

interface Key {
  client_email: string
  private_key: string
}

let token: { value: string; expires: number } | null = null
const b64 = (s: string | Buffer) => Buffer.from(s).toString('base64url')

async function readKey(): Promise<Key | null> {
  try {
    return JSON.parse(await readFile(KEY_FILE, 'utf8')) as Key
  } catch {
    return null
  }
}

/** Service account address (not a secret): the one the owner must add in Search Console. */
export async function serviceAccount(): Promise<string | null> {
  return (await readKey())?.client_email ?? null
}

async function accessToken(): Promise<string> {
  if (token && token.expires > Date.now() + 60_000) return token.value
  const key = await readKey()
  if (!key) throw new Error('no key file')
  const now = Math.floor(Date.now() / 1000)
  const body = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({ iss: key.client_email, scope: SCOPE, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }))}`
  const signature = createSign('RSA-SHA256').update(body).sign(key.private_key)
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${body}.${b64(signature)}` }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Google token refused (${res.status})`)
  const data = (await res.json()) as { access_token: string; expires_in: number }
  token = { value: data.access_token, expires: Date.now() + data.expires_in * 1000 }
  return token.value
}

async function gsc<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Search Console ${res.status}`)
  return (await res.json()) as T
}

/** True when the service account's key file is on the server (it never is in the repo). */
export function gscKeyPresent(): boolean {
  return existsSync(KEY_FILE)
}

/** True when the service account can read the Quel Robot Tondeuse property. */
export async function siteConnected(): Promise<boolean> {
  const sites = (await gsc<{ siteEntry?: { siteUrl: string }[] }>('sites')).siteEntry ?? []
  return sites.some((s) => s.siteUrl === GSC_SITE)
}

export interface GscRow {
  keys: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export type GscDimension = 'query' | 'page' | 'date' | 'device'

/** Queries, pages, dates or devices over a period (YYYY-MM-DD). startRow pages through big results (25 000 per call). */
export async function gscQuery(start: string, end: string, dimensions: GscDimension[], rowLimit = 250, startRow = 0): Promise<GscRow[]> {
  const r = await gsc<{ rows?: GscRow[] }>(`sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`, { startDate: start, endDate: end, dimensions, rowLimit, startRow, dataState: 'all' })
  return r.rows ?? []
}

export interface InspectionResult {
  verdict: string | null
  coverageState: string | null
  indexingState: string | null
  pageFetchState: string | null
  robotsTxtState: string | null
  lastCrawlTime: string | null
  googleCanonical: string | null
  userCanonical: string | null
}

/** URL Inspection (index state of one address), same key and scope. Google's quota: 2,000 a day per property. */
export async function inspectUrl(url: string): Promise<InspectionResult> {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_SITE }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Inspection ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = (await res.json()) as { inspectionResult?: { indexStatusResult?: Partial<InspectionResult> } }
  const r = data.inspectionResult?.indexStatusResult ?? {}
  return {
    verdict: r.verdict ?? null,
    coverageState: r.coverageState ?? null,
    indexingState: r.indexingState ?? null,
    pageFetchState: r.pageFetchState ?? null,
    robotsTxtState: r.robotsTxtState ?? null,
    lastCrawlTime: r.lastCrawlTime ?? null,
    googleCanonical: r.googleCanonical ?? null,
    userCanonical: r.userCanonical ?? null,
  }
}
