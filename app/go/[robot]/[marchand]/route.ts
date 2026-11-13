/**
 * /go/<robot>/<marchand> — redirection 302 vers le marchand, avec l'étiquette affiliée.
 * Sert à compter les clics sortants dans les journaux du serveur (lot 0) : aucun cookie.
 * La page d'origine est lue dans l'en-tête Referer du journal.
 */
import { NextResponse } from 'next/server'
import { amazonProductUrl, isAsin } from '@/lib/utils/affiliate'

export const dynamic = 'force-dynamic'

const HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
}

type Params = Promise<{ robot: string; marchand: string }>

export async function GET(_request: Request, { params }: { params: Params }) {
  const { robot, marchand } = await params
  const asin = robot.toUpperCase()
  if (marchand !== 'amazon' || !isAsin(asin)) {
    return new NextResponse('Lien introuvable', { status: 404, headers: HEADERS })
  }
  return NextResponse.redirect(amazonProductUrl(asin), { status: 302, headers: HEADERS })
}
