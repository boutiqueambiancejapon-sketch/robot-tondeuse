'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { CRM_SEARCH_COOKIE } from '@/lib/dashboard/crm-search'

// Contact search: the typed address stays in a short-lived httpOnly cookie, never in the URL
// (URLs end up in the server's access log).

export async function searchContacts(form: FormData): Promise<void> {
  if (!(await dashboardAllowed())) return
  const q = String(form.get('q') ?? '').trim().toLowerCase().slice(0, 120)
  const jar = await cookies()
  if (q) jar.set(CRM_SEARCH_COOKIE, q, { httpOnly: true, secure: true, sameSite: 'strict', path: '/dashboard/crm', maxAge: 600 })
  else jar.delete({ name: CRM_SEARCH_COOKIE, path: '/dashboard/crm' })
  redirect('/dashboard/crm/contacts')
}

export async function clearContactSearch(): Promise<void> {
  if (!(await dashboardAllowed())) return
  ;(await cookies()).delete({ name: CRM_SEARCH_COOKIE, path: '/dashboard/crm' })
  redirect('/dashboard/crm/contacts')
}
