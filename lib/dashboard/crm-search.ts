import 'server-only'
import { cookies } from 'next/headers'

export const CRM_SEARCH_COOKIE = 'qrt_crm_q'

export async function readSearch(): Promise<string> {
  return ((await cookies()).get(CRM_SEARCH_COOKIE)?.value ?? '').slice(0, 120)
}

export function parsePage(v: string | string[] | undefined): number {
  const n = Number(Array.isArray(v) ? v[0] : v)
  return Number.isInteger(n) && n > 1 && n < 1000 ? n : 1
}
