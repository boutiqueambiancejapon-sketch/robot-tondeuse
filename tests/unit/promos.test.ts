import { describe, it, expect } from 'vitest'
import { PROMO_BRANDS, dateFr, getBlackFridayBrands, getBrandRobots, moisAnnee } from '@/lib/promos'
import { getVerifiedDeals } from '@/lib/deals'

describe('promos', () => {
  it('chaque marque a un slug unique et une date de contrôle AAAA-MM-JJ', () => {
    expect(new Set(PROMO_BRANDS.map((b) => b.slug)).size).toBe(PROMO_BRANDS.length)
    for (const b of PROMO_BRANDS) expect(b.checkedAt, b.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('un code publié porte son marchand et sa date de contrôle', () => {
    for (const b of PROMO_BRANDS) {
      for (const c of b.codes) {
        expect(c.code.length > 0 && c.store.length > 0, b.slug).toBe(true)
        expect(c.verifiedAt, b.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      }
    }
  })

  it('un code annoncé vient du site de la marque, porte sa fin et sa source, et n’est pas compté comme vérifié', () => {
    const today = new Date().toISOString().slice(0, 10)
    for (const b of PROMO_BRANDS) {
      for (const a of b.annonces) {
        expect(a.jusquau >= today, `${b.slug} ${a.code}`).toBe(true)
        expect(a.source, a.code).toMatch(/lue le \d+ \S+ 20\d\d/)
        expect(new URL(a.href).hostname, a.code).toContain(b.slug.split('-')[0])
        expect(b.codes.map((c) => c.code), a.code).not.toContain(a.code)
      }
    }
  })

  it('une offre Black Friday est sous le plus bas des 30 jours précédents', () => {
    for (const b of PROMO_BRANDS) for (const o of b.offers) expect(o.price < o.lowest30d, `${b.slug} ${o.slug}`).toBe(true)
  })

  it('un prix relevé vient de la boutique de la marque, porte sa date et reste hors des offres confirmées', () => {
    const boutiques: Record<string, string> = { dreame: 'fr.dreametech.com', mammotion: 'fr.mammotion.com', mova: 'fr.mova.tech', 'segway-navimow': 'fr.navimow.com', ecovacs: 'www.ecovacs.com', gardena: 'www.gardena.com' }
    for (const b of PROMO_BRANDS) {
      const fiches = getBrandRobots(b).map((r) => r.slug)
      for (const r of b.releves) {
        expect(new URL(r.url).hostname, `${b.slug} ${r.slug}`).toBe(boutiques[b.slug])
        expect(fiches, r.slug).toContain(r.slug)
        expect(r.checkedAt, r.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(r.checkedAt <= b.checkedAt, `${r.slug} relevé après le contrôle de la marque`).toBe(true)
        expect(r.price > 0 && (r.reference === undefined || r.reference > r.price), r.slug).toBe(true)
        expect(b.offers.some((o) => o.slug === r.slug && o.price === r.price), r.slug).toBe(false)
      }
    }
  })

  it('les robots viennent de content/produits, avec un lien marchand', () => {
    const brands = getBlackFridayBrands()
    expect(brands.length).toBeGreaterThan(0)
    for (const b of brands) for (const r of getBrandRobots(b)) expect(r.url, r.slug).toMatch(/^https:\/\//)
  })

  it('écrit les dates en français', () => {
    expect(dateFr('2026-11-15')).toBe('15 novembre 2026')
    expect(dateFr('2026-12-01')).toBe('1er décembre 2026')
    expect(moisAnnee('2026-11-15')).toBe('novembre 2026')
  })

  it('les bons plans affichés sont de vraies baisses datées', () => {
    for (const d of getVerifiedDeals()) expect(d.price < d.lowest30d, d.slug).toBe(true)
  })
})
