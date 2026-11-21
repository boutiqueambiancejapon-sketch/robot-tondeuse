import 'server-only'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/dashboard/policy'
import { loginConfigured } from '@/lib/server/login/secrets'
import { readSession, type DashboardSession } from '@/lib/server/login/sessions'

// Defence in depth: proxy.ts filters /dashboard, and every dashboard page checks again here
// (Next has had proxy bypasses before). Without the login configured, /dashboard does not exist.

export async function dashboardSession(): Promise<DashboardSession | null> {
  if (!loginConfigured()) return null
  try {
    const session = await readSession((await cookies()).get(SESSION_COOKIE)?.value)
    return session?.stage === 'full' ? session : null
  } catch (err) {
    console.error('[dashboard-login] unreadable session', err instanceof Error ? err.message : err)
    return null
  }
}

export async function dashboardAllowed(): Promise<boolean> {
  return (await dashboardSession()) !== null
}

/** Session at any stage (login screens), or null. */
export async function anySession(): Promise<DashboardSession | null> {
  if (!loginConfigured()) return null
  try {
    return await readSession((await cookies()).get(SESSION_COOKIE)?.value)
  } catch {
    return null
  }
}
