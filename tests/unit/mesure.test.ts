import { describe, it, expect, vi, afterEach } from 'vitest'
import { EVENEMENTS, isEvenement, signaler } from '@/lib/utils/mesure'
import { POST } from '@/app/api/m/[evenement]/route'

function call(evenement: string) {
  return POST(new Request(`http://localhost/api/m/${evenement}`, { method: 'POST' }), {
    params: Promise.resolve({ evenement }),
  })
}

afterEach(() => vi.unstubAllGlobals())

describe('POST /api/m/<evenement>', () => {
  it('répond 204 sans cache ni cookie pour les 3 événements connus', async () => {
    for (const e of EVENEMENTS) {
      const res = await call(e)
      expect(res.status).toBe(204)
      expect(res.headers.get('cache-control')).toBe('no-store')
      expect(res.headers.get('set-cookie')).toBeNull()
    }
  })
  it('refuse un événement inconnu', async () => {
    expect((await call('autre')).status).toBe(404)
    expect(isEvenement('../go')).toBe(false)
  })
})

describe('signaler', () => {
  it('appelle /api/m/<evenement> en POST sans identifiants', () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)
    signaler('quiz-termine')
    expect(fetchMock).toHaveBeenCalledWith('/api/m/quiz-termine', expect.objectContaining({ method: 'POST', credentials: 'omit' }))
  })
  it('ne casse rien si le réseau échoue', () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('hors ligne')))
    expect(() => signaler('surface-mesuree')).not.toThrow()
  })
})
