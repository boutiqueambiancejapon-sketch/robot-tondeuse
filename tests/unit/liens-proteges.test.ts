import { describe, expect, it } from 'vitest'
import { fromGo, goTarget, isPartner, toGo } from '@/lib/go'
import { _resetFiltre, filtreClic } from '@/lib/go-filtre'
import { GET } from '@/app/go/[robot]/route'
import { merchantOf } from '@/lib/dashboard/events'

const AWIN = 'https://www.awin1.com/pclick.php?p=42&a=1&m=6948'
const humain = { 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) Safari/604.1', 'accept-language': 'fr-FR,fr;q=0.9' }
const req = (headers: Record<string, string>) => new Request('https://quel-robot-tondeuse.com/go/x', { headers })
const go = (t: string, headers: Record<string, string> = humain) => GET(req(headers), { params: Promise.resolve({ robot: t }) })

describe('lib/go : liens partenaires protégés', () => {
  it('cache un lien Awin ou Amazon derrière /go/<jeton>, et le retrouve', () => {
    const t = toGo(AWIN)
    expect(t).toMatch(/^\/go\/[A-Za-z0-9_-]+$/)
    expect(t).not.toContain('awin1')
    expect(fromGo(t.slice(4))).toBe(AWIN)
    expect(goTarget(`https://quel-robot-tondeuse.com${t}`)).toBe(AWIN)
    expect(toGo('https://amzn.to/4c4vSyD')).toMatch(/^\/go\//)
  })
  it('laisse tels quels les liens internes et les sites non partenaires', () => {
    expect(toGo('/quiz')).toBe('/quiz')
    expect(toGo('https://www.boulanger.com/aide')).toBe('https://www.boulanger.com/aide')
    expect(isPartner('javascript:alert(1)')).toBe(false)
  })
  it('refuse un jeton vers un site non partenaire (pas de redirection ouverte)', () => {
    const evil = btoa('https://evil.example/awin1.com').replace(/=+$/, '')
    expect(fromGo(evil)).toBeNull()
    expect(fromGo('pas un jeton !')).toBeNull()
  })
  it('garde la mesure par marchand derrière un jeton', () => {
    expect(merchantOf(toGo(AWIN), 'https://quel-robot-tondeuse.com')).toBe('cdiscount')
    expect(merchantOf(toGo('https://www.amazon.fr/s?k=robot&tag=x-21'), 'https://quel-robot-tondeuse.com')).toBe('amazon')
  })
})

describe('GET /go/<jeton>', () => {
  it('un humain part chez le marchand en 302, sans cache ni indexation', async () => {
    _resetFiltre()
    const r = await go(toGo(AWIN).slice(4))
    expect(r.status).toBe(302)
    expect(r.headers.get('location')).toBe(AWIN)
    expect(r.headers.get('cache-control')).toBe('no-store')
    expect(r.headers.get('x-robots-tag')).toContain('noindex')
  })
  it('un robot, curl ou un navigateur sans langue : 403 ; un préchargement : 204', async () => {
    _resetFiltre()
    const t = toGo(AWIN).slice(4)
    expect((await go(t, { 'user-agent': 'Googlebot/2.1', 'accept-language': 'fr' })).status).toBe(403)
    expect((await go(t, { 'user-agent': 'curl/8.5.0', 'accept-language': 'fr' })).status).toBe(403)
    expect((await go(t, { 'user-agent': humain['user-agent'] })).status).toBe(403)
    expect((await go(t, { ...humain, 'sec-purpose': 'prefetch' })).status).toBe(204)
  })
  it('jeton inconnu : 404', async () => {
    expect((await go('aaaaaaaaaaaaaaaaaaaa')).status).toBe(404)
  })
})

describe('filtre des rafales de clics', () => {
  const ip = (n: string) => req({ ...humain, 'x-forwarded-for': n })
  it('429 au 4e clic vers le même lien en 10 minutes', () => {
    _resetFiltre()
    for (let i = 0; i < 3; i++) expect(filtreClic(ip('1.1.1.1'), 'a', 1000 + i)).toBeNull()
    expect(filtreClic(ip('1.1.1.1'), 'a', 1004)?.status).toBe(429)
    expect(filtreClic(ip('2.2.2.2'), 'a', 1004)).toBeNull()
  })
  it('429 au 9e clic d’une même adresse en 10 minutes, puis libre 10 minutes après', () => {
    _resetFiltre()
    for (let i = 0; i < 8; i++) expect(filtreClic(ip('3.3.3.3'), `l${i}`, 1000 + i)).toBeNull()
    expect(filtreClic(ip('3.3.3.3'), 'l9', 1010)?.status).toBe(429)
    expect(filtreClic(ip('3.3.3.3'), 'l9', 1010 + 10 * 60_000)).toBeNull()
  })
})
