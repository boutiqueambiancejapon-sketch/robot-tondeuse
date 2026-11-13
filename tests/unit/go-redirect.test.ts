import { describe, it, expect, vi } from 'vitest'

vi.mock('@/niche.config', () => ({
  niche: { affiliateTag: 'test-tag-21', defaultStore: 'Amazon' },
}))

const { affiliateHref } = await import('@/lib/utils/affiliate')
const { GET } = await import('@/app/go/[robot]/[marchand]/route')

function call(robot: string, marchand: string) {
  return GET(new Request(`http://localhost/go/${robot}/${marchand}`), {
    params: Promise.resolve({ robot, marchand }),
  })
}

describe('affiliateHref', () => {
  it('envoie une fiche Amazon.fr vers /go/<asin>/amazon', () => {
    expect(affiliateHref('https://www.amazon.fr/dp/B0GCCLW2PL')).toBe('/go/B0GCCLW2PL/amazon')
    expect(affiliateHref('https://www.amazon.fr/Mammotion-LUBA/dp/B0GR8MRCYC?ref=x')).toBe('/go/B0GR8MRCYC/amazon')
  })
  it('garde l’étiquette en direct pour une recherche Amazon', () => {
    expect(affiliateHref('https://www.amazon.fr/s?k=robot')).toContain('tag=test-tag-21')
  })
  it('ne touche ni aux liens internes ni aux autres sites', () => {
    expect(affiliateHref('/quiz')).toBe('/quiz')
    expect(affiliateHref('https://www.fnac.com/x')).toBe('https://www.fnac.com/x')
    expect(affiliateHref('/go/B0GCCLW2PL/amazon')).toBe('/go/B0GCCLW2PL/amazon')
  })
})

describe('GET /go/<robot>/<marchand>', () => {
  it('redirige en 302 vers Amazon avec l’étiquette, sans cache ni indexation', async () => {
    const res = await call('B0GCCLW2PL', 'amazon')
    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toBe('https://www.amazon.fr/dp/B0GCCLW2PL?tag=test-tag-21')
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(res.headers.get('x-robots-tag')).toContain('noindex')
  })
  it('refuse un marchand inconnu ou un identifiant invalide (pas de redirection ouverte)', async () => {
    expect((await call('B0GCCLW2PL', 'evil')).status).toBe(404)
    expect((await call('https:--evil.com', 'amazon')).status).toBe(404)
    expect((await call('B0GC', 'amazon')).status).toBe(404)
  })
})
