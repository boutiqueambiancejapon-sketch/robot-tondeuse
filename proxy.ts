import { NextResponse, type NextRequest } from 'next/server'
import { isDataPath, isPublicPath, LOGIN_PATH, ROOT, SESSION_COOKIE, stageHref } from '@/lib/dashboard/policy'
import { loginConfigured } from '@/lib/server/login/secrets'
import { readSession } from '@/lib/server/login/sessions'
import { clientIp, markOwnerIp } from '@/lib/server/owner-ip'

// Next 16 proxy (ex-middleware). Only /dashboard goes through here (see config.matcher): the
// public site never does. Pages re-check the session themselves (lib/dashboard/guard.ts).

const PRIVATE_HEADERS = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'private, no-store' }

function passThrough(): NextResponse {
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(PRIVATE_HEADERS)) response.headers.set(key, value)
  return response
}

/** Absolute URL required by Next. Behind Caddy, request.url may not carry the public name. */
function redirectTo(request: NextRequest, location: string): NextResponse {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? request.nextUrl.host
  const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '')
  return new NextResponse(null, { status: 307, headers: { ...PRIVATE_HEADERS, Location: new URL(location, `${proto}://${host}`).toString() } })
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  if (!loginConfigured()) return new NextResponse('Not found', { status: 404, headers: PRIVATE_HEADERS })
  const { pathname, search } = request.nextUrl
  if (isPublicPath(pathname)) return passThrough()
  try {
    const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value, true)
    if (session?.stage === 'full') {
      void markOwnerIp(clientIp(request.headers))
      return passThrough()
    }
    // Data routes (CSV exports, live feed) answer 401 instead of the login page: a download or fetch never gets HTML.
    if ((request.method !== 'GET' && request.method !== 'HEAD') || isDataPath(pathname)) return new NextResponse(null, { status: 401, headers: PRIVATE_HEADERS })
    if (session) return redirectTo(request, stageHref(session.stage))
    const back = pathname + search
    return redirectTo(request, back === ROOT ? LOGIN_PATH : `${LOGIN_PATH}?suivant=${encodeURIComponent(back)}`)
  } catch (err) {
    console.error('[dashboard-login] unreadable session', err instanceof Error ? err.message : err)
    return new NextResponse('Service indisponible', { status: 503, headers: { ...PRIVATE_HEADERS, 'Retry-After': '60' } })
  }
}

export const config = { matcher: ['/dashboard', '/dashboard/:path*'] }
