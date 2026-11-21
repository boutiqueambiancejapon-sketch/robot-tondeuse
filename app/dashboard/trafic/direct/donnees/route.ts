import { NextResponse } from 'next/server'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { getPool } from '@/lib/server/db'
import { getLive } from '@/lib/server/dashboard/live'

// Data of the "En direct" view, protected like the pages (proxy.ts + session check here).

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const HEADERS = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' }

export async function GET() {
  if (!(await dashboardAllowed())) return new NextResponse(null, { status: 401, headers: HEADERS })
  const pool = getPool()
  if (!pool) return NextResponse.json({ error: 'no-db' }, { status: 503, headers: HEADERS })
  try {
    return NextResponse.json(await getLive(pool), { headers: HEADERS })
  } catch (err) {
    console.error('[dashboard/live]', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'query' }, { status: 500, headers: HEADERS })
  }
}
