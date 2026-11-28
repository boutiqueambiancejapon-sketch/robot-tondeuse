import { toGo } from '@/lib/go'
import { describe, expect, it } from 'vitest'
import { detecterBaisses, type LigneHistorique } from '@/lib/deals-detection'
import { dealsDepuisHistorique } from '@/lib/deals'

/** Un relevé par jour à midi UTC, du 1er octobre au jour donné, au prix donné. */
function jours(du: string, au: string, prix: number, cle = 'x', marchand = 'cdiscount'): LigneHistorique[] {
  const lignes: LigneHistorique[] = []
  for (let t = new Date(`${du}T12:00Z`).getTime(); t <= new Date(`${au}T12:00Z`).getTime(); t += 86_400_000) {
    lignes.push({ cle, marchand, prix, quand: new Date(t).toISOString() })
  }
  return lignes
}

describe('détection des baisses (DL2)', () => {
  it('entre quand le prix passe sous le plus bas des 30 jours précédents, avec 30 jours d’historique', () => {
    const h = [...jours('2026-10-01', '2026-11-05', 700), ...jours('2026-11-06', '2026-11-07', 640)]
    const [b] = detecterBaisses(h)
    expect(b).toMatchObject({ cle: 'x', marchand: 'cdiscount', prix: 640, plusBas30j: 700, depuis: '2026-11-06T12:00:00.000Z' })
    expect(detecterBaisses(h)).toHaveLength(1)
  })

  it('compare au plus bas des 30 jours, pas au prix le plus haut', () => {
    const h = [...jours('2026-10-01', '2026-10-20', 800), ...jours('2026-10-21', '2026-11-05', 690), ...jours('2026-11-06', '2026-11-06', 650)]
    expect(detecterBaisses(h)[0].plusBas30j).toBe(690)
  })

  it('n’entre pas avec moins de 30 jours d’historique', () => {
    const h = [...jours('2026-10-20', '2026-11-05', 700), ...jours('2026-11-06', '2026-11-06', 600)]
    expect(detecterBaisses(h)).toEqual([])
  })

  it('n’entre pas si le prix égale le plus bas des 30 jours', () => {
    const h = [...jours('2026-10-01', '2026-10-15', 700), ...jours('2026-10-16', '2026-10-20', 650), ...jours('2026-10-21', '2026-11-06', 680), ...jours('2026-11-07', '2026-11-07', 650)]
    expect(detecterBaisses(h)).toEqual([])
  })

  it('sort quand le prix remonte', () => {
    const h = [...jours('2026-10-01', '2026-11-05', 700), ...jours('2026-11-06', '2026-11-07', 640), ...jours('2026-11-08', '2026-11-08', 720)]
    expect(detecterBaisses(h)).toEqual([])
  })

  it('sort quand le produit quitte le flux', () => {
    const h = [...jours('2026-10-01', '2026-11-05', 700), ...jours('2026-11-06', '2026-11-06', 640), ...jours('2026-10-01', '2026-11-07', 300, 'autre')]
    expect(detecterBaisses(h).map((b) => b.cle)).toEqual([])
  })

  it('sort quand la baisse dure depuis 30 jours (c’est devenu le prix habituel)', () => {
    const h = [...jours('2026-09-01', '2026-10-05', 700), ...jours('2026-10-06', '2026-11-05', 640)]
    expect(detecterBaisses(h)).toEqual([])
  })

  it('traite chaque marchand à part', () => {
    const h = [...jours('2026-10-01', '2026-11-06', 700, 'x', 'fnac'), ...jours('2026-10-01', '2026-11-05', 750), ...jours('2026-11-06', '2026-11-06', 690)]
    expect(detecterBaisses(h).map((b) => b.marchand)).toEqual(['cdiscount'])
  })

  it('donne un deal avec lien et nom du dernier relevé, seulement si son prix est le même', () => {
    const h = [...jours('2026-10-01', '2026-11-05', 700), ...jours('2026-11-06', '2026-11-06', 640)]
    const url = 'https://www.awin1.com/pclick.php?p=1'
    expect(dealsDepuisHistorique(h, { x: { cdiscount: { prix: 640, url, nom: 'Robot X' } } })).toEqual([
      { slug: 'x', name: 'Robot X', store: 'Cdiscount', url: toGo(url), price: 640, lowest30d: 700, checkedAt: '2026-11-06', checkedAtTime: '2026-11-06T12:00:00.000Z' },
    ])
    expect(dealsDepuisHistorique(h, { x: { cdiscount: { prix: 655, url } } })).toEqual([])
  })

  it('historique vide : aucune baisse', () => {
    expect(detecterBaisses([])).toEqual([])
  })
})
