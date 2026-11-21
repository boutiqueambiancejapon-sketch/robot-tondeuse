import 'server-only'
import { LOGIN_PATH } from '@/lib/dashboard/policy'
import { requirePool } from '@/lib/server/db'
import { logEvent } from './attempts'
import { NO_SESSION, ok, refused, text, type FlowContext, type FlowResult } from './flow-types'

// Security screen: close one other session, or every session (this one included). Full session only.

export async function closeSessionStep(ctx: FlowContext): Promise<FlowResult> {
  if (ctx.session?.stage !== 'full') return NO_SESSION()
  const id = text(ctx.input, 'id', 64)
  if (!/^[0-9a-f-]{36}$/.test(id) || id === ctx.session.id) return refused('input')
  await requirePool().query('DELETE FROM dashboard.session WHERE id = $1', [id])
  await logEvent('session-closed', 'success', ctx.who)
  return ok()
}

export async function logoutAllStep(ctx: FlowContext): Promise<FlowResult> {
  if (ctx.session?.stage !== 'full') return NO_SESSION()
  await requirePool().query('DELETE FROM dashboard.session')
  await logEvent('logout-all', 'success', ctx.who)
  return { ...ok({ next: LOGIN_PATH }), clearSession: true }
}
