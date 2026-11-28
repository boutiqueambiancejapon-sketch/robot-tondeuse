import { describe, expect, it } from 'vitest'
import { amazonHref } from '@/lib/utils/affiliate'
import { GET } from '@/app/go/[robot]/[marchand]/route'
import { goTarget } from '@/lib/go'
import { _resetFiltre } from '@/lib/go-filtre'

const go = (robot: string) => (_resetFiltre(), GET(new Request('https://quel-robot-tondeuse.com/go/x', { headers: { 'user-agent': 'Mozilla/5.0 (iPhone)', 'accept-language': 'fr-FR' } }), { params: Promise.resolve({ robot, marchand: 'amazon' }) }))

describe('liens Amazon', () => {
  it('garde la fiche Amazon, comptée par /go/', () => {
    expect(amazonHref('https://www.amazon.fr/dp/B0CXDNFZLL', 'Segway Navimow i105E')).toBe('/go/B0CXDNFZLL/amazon')
  })
  it('remplace un site sans affiliation par une recherche Amazon du robot', () => {
    expect(goTarget(amazonHref('https://www.husqvarna.com/fr/robots-tondeuses/', 'Husqvarna Automower 450X'))).toMatch(/^https:\/\/www\.amazon\.fr\/s\?k=Husqvarna(\+|%20)Automower/)
  })
  it('envoie une fiche fausse ou morte vers la recherche du bon modèle', async () => {
    const r = await go('B08XQYHFGZ')
    expect(r.status).toBe(302)
    expect(r.headers.get('location')).toMatch(/amazon\.fr\/s\?k=Bosch(\+|%20)Indego(\+|%20)XS(\+|%20)300/)
  })
  it('laisse passer une fiche juste', async () => {
    const r = await go('B0CXDNFZLL')
    expect(r.headers.get('location')).toMatch(/amazon\.fr\/dp\/B0CXDNFZLL/)
  })
})
