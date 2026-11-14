/**
 * POST /api/m/<evenement> — répond 204 sans rien stocker.
 * Sert seulement à laisser une ligne dans les journaux du serveur (lot 0) : quiz terminé,
 * surface mesurée, calcul de rentabilité. Aucun cookie, aucune donnée lue dans la requête.
 */
import { NextResponse } from 'next/server'
import { isEvenement } from '@/lib/utils/mesure'

export const dynamic = 'force-dynamic'

const HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
}

type Params = Promise<{ evenement: string }>

export async function POST(_request: Request, { params }: { params: Params }) {
  const { evenement } = await params
  if (!isEvenement(evenement)) {
    return new NextResponse(null, { status: 404, headers: HEADERS })
  }
  return new NextResponse(null, { status: 204, headers: HEADERS })
}
