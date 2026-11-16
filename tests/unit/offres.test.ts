import { describe, expect, it } from 'vitest'
import { offresPour } from '@/lib/offres'
import { offresRelevees } from '@/lib/offres-releves'

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

describe('offres relevées par nom de produit', () => {
  it('retrouve un robot cité dans un article par son nom', () => {
    const o = offresRelevees('Segway Navimow i105E')
    expect(o.map((x) => x.marchand)).toContain('Cdiscount')
    expect(o[0].url).toMatch(/^https:\/\/www\.awin1\.com\//)
  })

  it('ne propose rien pour un produit absent des flux', () => {
    expect(offresRelevees('Robot imaginaire XZ 9000')).toEqual([])
  })
})
