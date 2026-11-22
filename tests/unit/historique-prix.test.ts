import { describe, expect, it } from 'vitest'
import historique from '@/content/offres/historique-prix.json'
import sources from '@/content/offres/releve-quotidien.json'
import { plusBas30Jours, type PrixDuJour } from '@/lib/historique-prix'
import { PROMO_BRANDS } from '@/lib/promos'

const r = (date: string, prix: number): PrixDuJour => ({ date, slug: 'x', prix, dispo: true, page: 'https://exemple.fr' })

describe('plusBas30Jours', () => {
  it('prend le plus bas des 30 jours précédents, sans le jour même', () => {
    const data = [r('2026-10-22', 500), r('2026-10-23', 900), r('2026-11-21', 950), r('2026-11-22', 700)]
    expect(plusBas30Jours('x', '2026-11-22', data)).toEqual({ prix: 900, jours: 2 })
  })
  it('renvoie null sans relevé', () => {
    expect(plusBas30Jours('x', '2026-11-22', [])).toBeNull()
  })
})

describe('relevé quotidien', () => {
  it('suit exactement les robots du relevé des boutiques', () => {
    const attendus = PROMO_BRANDS.flatMap((b) => b.releves.map((x) => x.slug)).sort()
    expect(sources.robots.map((x) => x.slug).sort()).toEqual(attendus)
  })
  it('n’a jamais deux lignes pour le même robot le même jour, et que des prix positifs', () => {
    const cles = historique.releves.map((x) => `${x.date}|${x.slug}`)
    expect(new Set(cles).size).toBe(cles.length)
    expect(historique.releves.every((x) => x.prix > 0)).toBe(true)
  })
})
