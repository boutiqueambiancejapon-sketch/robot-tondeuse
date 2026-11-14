import { describe, it, expect, vi, afterEach } from 'vitest'
import { POST } from '@/app/api/inscription/route'
import { BREVO_LIST_ID_QRT, isValidEmail } from '@/lib/newsletter/brevo'

function call(body: unknown) {
  return POST(new Request('http://localhost/api/inscription', { method: 'POST', body: JSON.stringify(body) }))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('POST /api/inscription', () => {
  it('refuse sans consentement coché, sans appeler Brevo', async () => {
    vi.stubEnv('BREVO_API_KEY', 'cle-de-test')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await call({ email: 'a@exemple.fr', consentement: false })
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('refuse une adresse invalide', async () => {
    vi.stubEnv('BREVO_API_KEY', 'cle-de-test')
    expect((await call({ email: 'pas-une-adresse', consentement: true })).status).toBe(400)
    expect(isValidEmail('a@b')).toBe(false)
  })

  it('répond 503 si la clé Brevo manque', async () => {
    vi.stubEnv('BREVO_API_KEY', '')
    expect((await call({ email: 'a@exemple.fr', consentement: true })).status).toBe(503)
  })

  it('ignore un robot qui remplit le champ piège', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await call({ email: 'a@exemple.fr', consentement: true, website: 'spam' })
    expect(res.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('inscrit sur la liste Quel Robot Tondeuse, sans cookie', async () => {
    vi.stubEnv('BREVO_API_KEY', 'cle-de-test')
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    const res = await call({ email: 'a@exemple.fr', consentement: true, source: 'fiche-hivernage' })
    expect(res.status).toBe(200)
    expect(res.headers.get('set-cookie')).toBeNull()
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body.listIds).toEqual([BREVO_LIST_ID_QRT])
    expect(body.attributes.SOURCE).toBe('qrt:fiche-hivernage')
  })
})
