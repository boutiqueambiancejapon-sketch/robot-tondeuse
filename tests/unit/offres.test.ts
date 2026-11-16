import { describe, expect, it } from 'vitest'
import { offresPour } from '@/lib/offres'

describe('offres marchandes', () => {
  it('met le prix relevé en premier, avec sa date', () => {
    const o = offresPour('Dreame A1 Pro', 'dreame-a1-pro')
    expect(o).toHaveLength(3)
    expect(o[0].marchand).toBe('Cdiscount')
    expect(o[0].prix).toBeGreaterThan(100)
    expect(o[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(o.map((x) => x.marchand).sort()).toEqual(['Amazon', 'Cdiscount', 'Fnac'])
  })

  it('sans relevé, renvoie vers la recherche du marchand, sans prix', () => {
    const o = offresPour('Worx Landroid S300')
    expect(o.every((x) => x.prix === undefined)).toBe(true)
    expect(o.find((x) => x.marchand === 'Fnac')?.url).toContain(encodeURIComponent('Search=Worx'))
  })
})
