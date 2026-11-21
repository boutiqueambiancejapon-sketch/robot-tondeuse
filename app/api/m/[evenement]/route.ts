/**
 * POST /api/m/<evenement> — répond 204. Laisse une ligne dans les journaux du serveur (lot 0, lue par
 * le centre de contrôle) et, depuis le 21/11/2026, une ligne « tool_use » dans la base du tableau de
 * bord (lib/server/events.ts) : nom de l'outil, page, pays, appareil. Aucun cookie, aucune adresse gardée.
 */
import { NextResponse } from 'next/server'
import { isEvenement } from '@/lib/utils/mesure'
import { TOOL_EVENT } from '@/lib/dashboard/events'
import { recordEvent, refererPath } from '@/lib/server/events'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
}

type Params = Promise<{ evenement: string }>

export async function POST(request: Request, { params }: { params: Params }) {
  const { evenement } = await params
  if (!isEvenement(evenement)) {
    return new NextResponse(null, { status: 404, headers: HEADERS })
  }
  await recordEvent(request.headers, TOOL_EVENT, refererPath(request.headers), { tool: evenement })
  return new NextResponse(null, { status: 204, headers: HEADERS })
}
