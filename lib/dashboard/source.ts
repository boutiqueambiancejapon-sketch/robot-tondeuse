import { channelOf, isOwnHost, type Channel } from './traffic'

// Exact source of one line of the "En direct" feed (Google, ChatGPT, WhatsApp…). The channel
// (colour) comes from channelOf, the acquisition classifier: one rule for both. Ported from 10minlanguages.com (adapted from Toutou).

export type SourceChannel = Channel | 'internal'

export interface Source {
  label: string
  channel: SourceChannel
  /** Previous page on the site, for internal navigation. */
  from?: string
}

export interface SourceInput {
  host: string | null
  /** AI found by the ingester (referrer or utm_source=chatgpt.com). */
  ai?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  from?: string | null
}

/** Readable names, tested on the referrer host or on utm_source. Order matters (Gemini before Google). */
const NAMES: [RegExp, string][] = [
  [/(^|\.)(chatgpt\.com|openai\.com)$|^chatgpt$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$|^perplexity$/, 'Perplexity'],
  [/(^|\.)claude\.ai$|^claude$/, 'Claude'],
  [/(^|\.)gemini\.google\.com$|^gemini$/, 'Gemini'],
  [/(^|\.)copilot\.(microsoft|bing)\.com$|^copilot$/, 'Copilot'],
  [/(^|\.)mistral\.ai$|^mistral$/, 'Le Chat (Mistral)'],
  [/(^|\.)google\.[a-z.]+$|^com\.google\.android\.googlequicksearchbox$|^google$/, 'Google'],
  [/(^|\.)bing\.com$|^bing$/, 'Bing'],
  [/(^|\.)duckduckgo\.com$|^duckduckgo$/, 'DuckDuckGo'],
  [/(^|\.)ecosia\.org$/, 'Ecosia'],
  [/(^|\.)qwant\.com$/, 'Qwant'],
  [/(^|\.)yahoo\.[a-z.]+$/, 'Yahoo'],
  [/(^|\.)(brave\.com|search\.brave\.com)$/, 'Brave'],
  [/(^|\.)whatsapp\.(com|net)$|^wa\.me$|^whatsapp$/, 'WhatsApp'],
  [/(^|\.)messenger\.com$|^messenger$/, 'Messenger'],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$|^(facebook|fb)$/, 'Facebook'],
  [/(^|\.)instagram\.com$|^(instagram|ig)$/, 'Instagram'],
  [/(^|\.)pinterest\.[a-z.]+$|^pin\.it$|^pinterest$/, 'Pinterest'],
  [/(^|\.)reddit\.com$|^reddit$/, 'Reddit'],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$|^(x|twitter)$/, 'X'],
  [/(^|\.)(linkedin\.com|lnkd\.in)$|^linkedin$/, 'LinkedIn'],
  [/(^|\.)youtube\.com$|^youtu\.be$|^youtube$/, 'YouTube'],
  [/(^|\.)tiktok\.com$|^tiktok$/, 'TikTok'],
]

/** Brevo tracked links and mail apps: the newsletter and our emails. */
const EMAIL = /(^|\.)(sendibt\d*\.com|sendibm\d*\.com|sendinblue\.com|brevo\.com|brevosend\.com)$|^com\.google\.android\.gm$|^(newsletter|brevo|sendinblue|email|e-mail|mail)$/
const AI_NAMES = ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Copilot', 'Le Chat (Mistral)']
const SEARCH_NAMES = ['Bing', 'DuckDuckGo', 'Ecosia', 'Qwant', 'Yahoo', 'Brave']

const clean = (v: string | null | undefined) => (v ? v.trim().toLowerCase().replace(/^www\./, '') : '')
const nameOf = (v: string) => NAMES.find(([re]) => re.test(v))?.[1] ?? null

/** Channel of a name read from utm_source without a host ("chatgpt", "facebook"). */
function channelOfName(name: string): SourceChannel {
  if (AI_NAMES.includes(name)) return 'ai'
  if (name === 'Google') return 'google'
  if (SEARCH_NAMES.includes(name)) return 'search'
  return 'social'
}

export function sourceOf({ host, ai, utmSource, utmMedium, from }: SourceInput): Source {
  const utm = clean(utmSource)
  const medium = clean(utmMedium)
  const h = clean(host)
  if (medium === 'email' || medium === 'newsletter' || (utm && EMAIL.test(utm)) || (h && EMAIL.test(h))) return { label: 'Newsletter / e-mail', channel: 'email' }
  if (ai) return { label: ai, channel: 'ai' }
  if (utm && !isOwnHost(utm)) {
    const named = nameOf(utm)
    if (named) return { label: named, channel: utm.includes('.') ? channelOf(utm) : channelOfName(named) }
    if (!h || isOwnHost(h)) return { label: utm, channel: 'other' }
  }
  if (!h) return from ? { label: 'Navigation interne', channel: 'internal', from } : { label: 'Direct', channel: 'direct' }
  if (isOwnHost(h)) return { label: 'Navigation interne', channel: 'internal', from: from ?? undefined }
  const channel = channelOf(h)
  const named = nameOf(h)
  if (named) return { label: named, channel: channel === 'other' || channel === 'direct' ? channelOfName(named) : channel }
  return { label: channel === 'email' ? 'E-mail' : h, channel }
}
