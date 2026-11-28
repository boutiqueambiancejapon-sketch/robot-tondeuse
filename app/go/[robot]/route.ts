/**
 * /go/<jeton> — lien partenaire protégé (lib/go.ts) : filtre (lib/go-filtre.ts), puis 302 vers le marchand.
 * Le segment s'appelle [robot] parce que Next.js impose le même nom que /go/[robot]/[marchand].
 */
import { NextResponse } from 'next/server'
import { fromGo } from '@/lib/go'
import { filtreClic, GO_HEADERS } from '@/lib/go-filtre'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type Params = Promise<{ robot: string }>

export async function GET(request: Request, { params }: { params: Params }) {
  const { robot: jeton } = await params
  const to = fromGo(jeton)
  if (!to) return new NextResponse('Lien introuvable', { status: 404, headers: GO_HEADERS })
  const refus = filtreClic(request, jeton)
  if (refus) return refus
  return NextResponse.redirect(to, { status: 302, headers: GO_HEADERS })
}
