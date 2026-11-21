import type { Pair } from './compare'
import { pageTypeOf, PAGE_TYPE_LABELS, type PageType } from './page-type'

// Traffic maths, no database and no display (adapted from Toutou). A session: page views (Caddy log)
// and actions (/api/e) of one daily visitor hash, with no pause over 30 minutes
// (query in lib/server/dashboard/sessions.ts). Page views carry the pseudo-name "pageview".

export type Channel = 'google' | 'search' | 'direct' | 'ai' | 'email' | 'social' | 'other'

export const CHANNEL_LABELS: Record<Channel, string> = {
  google: 'Google',
  search: 'Autres moteurs',
  direct: 'Accès direct',
  ai: 'IA (ChatGPT, Perplexity…)',
  email: 'E-mails',
  social: 'Réseaux sociaux',
  other: 'Autres sites',
}

const AI_HOST = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|mistral\.ai|grok\.com|deepseek\.com|you\.com|phind\.com|meta\.ai|poe\.com)$/
const EMAIL_HOST = /^(com\.google\.android\.gm|com\.microsoft\.office\.outlook|mail\.google\.com|outlook\.(live|office)\.com)$|(^|\.)(webmail|mail)\./
const GOOGLE_HOST = /(^|\.)google\.[a-z.]+$|^com\.google\.android\.googlequicksearchbox$/
const SEARCH_HOST = /(^|\.)(bing\.com|duckduckgo\.com|ecosia\.org|qwant\.com|yahoo\.[a-z.]+|brave\.com|yandex\.[a-z.]+|baidu\.com|startpage\.com|naver\.com)$/
const SOCIAL_HOST = /(^|\.)(facebook\.com|instagram\.com|pinterest\.[a-z.]+|tiktok\.com|youtube\.com|x\.com|t\.co|twitter\.com|reddit\.com|linkedin\.com|whatsapp\.com|snapchat\.com|threads\.net|quora\.com)$/

export function isOwnHost(host: string): boolean {
  return /(^|\.)10minlanguages\.com$/.test(host)
}

/** Order matters: Gemini sits on a Google domain and must stay with the AIs. */
export function channelOf(host: string | null, ai: string | null = null): Channel {
  if (ai) return 'ai'
  if (!host || isOwnHost(host)) return 'direct'
  if (AI_HOST.test(host)) return 'ai'
  if (EMAIL_HOST.test(host)) return 'email'
  if (GOOGLE_HOST.test(host)) return 'google'
  if (SEARCH_HOST.test(host)) return 'search'
  if (SOCIAL_HOST.test(host)) return 'social'
  return 'other'
}

export interface SessionRow {
  /** True for the chosen period, false for the one before. */
  current: boolean
  visitor: string
  seconds: number
  views: number
  landing: string
  ref: string | null
  ai: string | null
  device: string | null
  country: string | null
  names: string[]
}

/** Shown without a gesture: they don't stop a session from being a bounce. */
const PASSIVE = new Set(['pageview', 'nudge_shown'])
export const SIGNUP_EVENTS = ['newsletter_signup']
export const KIT_EVENTS = ['kit_request']
export const TOOL_EVENTS = ['calc_result', 'quiz_result', 'daily_done', 'level_share']
export const ACCOUNT_EVENTS = ['account_created']
export const CLICK_EVENT = 'preply_click'

export function isBounce(s: Pick<SessionRow, 'views' | 'names'>): boolean {
  return s.views <= 1 && s.names.every((n) => PASSIVE.has(n))
}

const hasAny = (s: SessionRow, names: string[]) => s.names.some((n) => names.includes(n))
const clicked = (s: SessionRow) => s.names.includes(CLICK_EVENT)
export const share = (part: number, total: number) => (total > 0 ? part / total : 0)

export interface Overview {
  visitors: Pair
  sessions: Pair
  /** Share of sessions with no second page and no action, 0 to 1; null without sessions. */
  bounce: { current: number | null; previous: number | null }
  /** Average length in seconds; null without sessions. */
  seconds: number | null
  pagesPerSession: number | null
  rates: { clicks: number; kits: number; signups: number; tools: number }
}

function bounceRate(rows: SessionRow[]): number | null {
  return rows.length === 0 ? null : share(rows.filter(isBounce).length, rows.length)
}

export function overviewOf(rows: SessionRow[]): Overview {
  const cur = rows.filter((r) => r.current)
  const prev = rows.filter((r) => !r.current)
  const distinct = (list: SessionRow[]) => new Set(list.map((r) => r.visitor)).size
  const rate = (test: (s: SessionRow) => boolean) => share(cur.filter(test).length, cur.length)
  return {
    visitors: { current: distinct(cur), previous: distinct(prev) },
    sessions: { current: cur.length, previous: prev.length },
    bounce: { current: bounceRate(cur), previous: bounceRate(prev) },
    seconds: cur.length === 0 ? null : cur.reduce((sum, r) => sum + r.seconds, 0) / cur.length,
    pagesPerSession: cur.length === 0 ? null : cur.reduce((sum, r) => sum + r.views, 0) / cur.length,
    rates: { clicks: rate(clicked), kits: rate((s) => hasAny(s, KIT_EVENTS)), signups: rate((s) => hasAny(s, SIGNUP_EVENTS)), tools: rate((s) => hasAny(s, TOOL_EVENTS)) },
  }
}

export interface ChannelRow {
  channel: Channel
  label: string
  sessions: number
  clickRate: number
}

export function channelsOf(rows: SessionRow[]): ChannelRow[] {
  const byChannel = new Map<Channel, SessionRow[]>()
  for (const r of rows) {
    if (!r.current) continue
    const c = channelOf(r.ref, r.ai)
    byChannel.set(c, [...(byChannel.get(c) ?? []), r])
  }
  return [...byChannel.entries()]
    .map(([channel, list]) => ({ channel, label: CHANNEL_LABELS[channel], sessions: list.length, clickRate: share(list.filter(clicked).length, list.length) }))
    .sort((a, b) => b.sessions - a.sessions)
}

export function countBy(rows: SessionRow[], keyOf: (r: SessionRow) => string | null): { label: string; value: number }[] {
  const counts = new Map<string, number>()
  for (const r of rows) {
    const key = r.current ? keyOf(r) : null
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
}

export function sitesOf(rows: SessionRow[]): { label: string; value: number }[] {
  return countBy(rows, (r) => (r.ref && !isOwnHost(r.ref) ? r.ref : null))
}

/** Sessions from Google and other search engines, by host. */
export function enginesOf(rows: SessionRow[]): { label: string; value: number }[] {
  return countBy(rows, (r) => {
    const c = channelOf(r.ref, r.ai)
    return c === 'google' || c === 'search' ? r.ref : null
  })
}

export interface PageCounts {
  page: string
  views: number
  visitors: number
  clicks: number
  leads: number
}

export interface EntryRow {
  page: string
  sessions: number
  bounce: number
}

export function entriesOf(rows: SessionRow[]): EntryRow[] {
  const byPage = new Map<string, { sessions: number; bounces: number }>()
  for (const r of rows) {
    if (!r.current) continue
    const e = byPage.get(r.landing) ?? { sessions: 0, bounces: 0 }
    e.sessions += 1
    if (isBounce(r)) e.bounces += 1
    byPage.set(r.landing, e)
  }
  return [...byPage.entries()]
    .map(([page, e]) => ({ page, sessions: e.sessions, bounce: share(e.bounces, e.sessions) }))
    .sort((a, b) => b.sessions - a.sessions || a.page.localeCompare(b.page))
}

export interface TypeRow {
  type: PageType
  label: string
  views: number
  clicks: number
  leads: number
}

export function typesOf(pages: PageCounts[]): TypeRow[] {
  const byType = new Map<PageType, TypeRow>()
  for (const p of pages) {
    const type = pageTypeOf(p.page)
    const t = byType.get(type) ?? { type, label: PAGE_TYPE_LABELS[type], views: 0, clicks: 0, leads: 0 }
    t.views += p.views
    t.clicks += p.clicks
    t.leads += p.leads
    byType.set(type, t)
  }
  return [...byType.values()].sort((a, b) => b.views - a.views)
}

export interface FunnelStep {
  label: string
  value: number
}

/** Sessions that landed on an article, then among them: each step is counted on its own. */
export function funnelOf(rows: SessionRow[]): FunnelStep[] {
  const base = rows.filter((r) => r.current && /^\/blog\//.test(r.landing))
  return [
    { label: 'Arrive sur un article', value: base.length },
    { label: 'Lit une 2e page', value: base.filter((s) => s.views >= 2).length },
    { label: 'Utilise un outil ou l’exercice', value: base.filter((s) => hasAny(s, TOOL_EVENTS)).length },
    { label: 'Demande un kit', value: base.filter((s) => hasAny(s, KIT_EVENTS)).length },
    { label: 'Clic vers Preply', value: base.filter(clicked).length },
  ]
}

export function durationLabel(seconds: number): string {
  const total = Math.round(seconds)
  if (total < 60) return `${total} s`
  const rest = total % 60
  return `${Math.floor(total / 60)} min${rest ? ` ${String(rest).padStart(2, '0')}` : ''}`
}

/** Every session of the period, step by step towards the site's goals (each step counted on its own). */
export function goalFunnelOf(rows: SessionRow[]): FunnelStep[] {
  const cur = rows.filter((r) => r.current)
  return [
    { label: 'Sessions', value: cur.length },
    { label: 'Lit une 2e page', value: cur.filter((s) => s.views >= 2).length },
    { label: 'Utilise un outil ou l’exercice', value: cur.filter((s) => hasAny(s, TOOL_EVENTS)).length },
    { label: 'Demande un kit', value: cur.filter((s) => hasAny(s, KIT_EVENTS)).length },
    { label: 'Rejoint la liste', value: cur.filter((s) => hasAny(s, SIGNUP_EVENTS)).length },
    { label: 'Crée un compte', value: cur.filter((s) => hasAny(s, ACCOUNT_EVENTS)).length },
    { label: 'Clic vers Preply', value: cur.filter(clicked).length },
  ]
}
