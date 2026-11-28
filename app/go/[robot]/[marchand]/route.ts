/**
 * /go/<robot>/<marchand> — redirection 302 vers le marchand, avec l'étiquette affiliée.
 * Sert à compter les clics sortants dans les journaux du serveur (lot 0) : aucun cookie.
 * La page d'origine est lue dans l'en-tête Referer du journal.
 * <robot> est une référence Amazon (ASIN) ou une pièce de dépannage connue (lames, cable, batterie),
 * qui mène à une recherche Amazon. Rien d'autre n'est accepté : pas de redirection ouverte.
 * Les robots et les rafales de clics sont refusés avant la redirection (lib/go-filtre.ts).
 */
import { NextResponse } from 'next/server'
import { addAffiliateTag, amazonProductUrl, isAsin } from '@/lib/utils/affiliate'
import { isPieceKey, pieceSearchUrl } from '@/lib/utils/pieces'
import corrections from '@/content/offres/amazon-corrections.json'
import { filtreClic, GO_HEADERS } from '@/lib/go-filtre'

const CORRECTIONS = corrections as Record<string, string>

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const HEADERS = GO_HEADERS

type Params = Promise<{ robot: string; marchand: string }>

export async function GET(request: Request, { params }: { params: Params }) {
  const { robot, marchand } = await params
  const known = marchand === 'amazon' && (isPieceKey(robot) || isAsin(robot.toUpperCase()))
  if (!known) return new NextResponse('Lien introuvable', { status: 404, headers: HEADERS })
  // Même filtre que /go/<jeton> (robots, préchargements, rafales de clics) : décision du propriétaire du 28/11/2026.
  const refus = filtreClic(request, `${robot}/${marchand}`)
  if (refus) return refus
  if (marchand === 'amazon' && isPieceKey(robot)) {
    return NextResponse.redirect(addAffiliateTag(pieceSearchUrl(robot)), { status: 302, headers: HEADERS })
  }
  const asin = robot.toUpperCase()
  if (marchand !== 'amazon' || !isAsin(asin)) {
    return new NextResponse('Lien introuvable', { status: 404, headers: HEADERS })
  }
  const recherche = CORRECTIONS[asin]
  if (recherche) {
    const url = `https://www.amazon.fr/s?k=${encodeURIComponent(recherche)}`
    return NextResponse.redirect(addAffiliateTag(url), { status: 302, headers: HEADERS })
  }
  return NextResponse.redirect(amazonProductUrl(asin), { status: 302, headers: HEADERS })
}
