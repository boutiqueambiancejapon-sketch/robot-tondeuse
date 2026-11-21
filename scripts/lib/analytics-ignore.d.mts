import type { BlockList } from 'node:net'

export const SERVER_IPS: string[]
export const IGNORED_IP_TTL_HOURS: number
export function cleanIp(raw: string | null | undefined): string
export function visitorKey(raw: string | null | undefined): string
export function buildStaticList(extra?: string): BlockList
export function isStaticIgnored(raw: string | null | undefined, list: BlockList): boolean
export function newFingerprint(raw: string | null | undefined): { salt: string; hash: string } | null
export function findFingerprint(rows: { salt: string; hash: string }[], raw: string | null | undefined): { salt: string; hash: string } | null
