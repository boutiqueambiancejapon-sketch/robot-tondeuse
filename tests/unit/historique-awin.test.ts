import { describe, expect, it } from 'vitest'
import { ajouterReleve, ecrireHistorique } from '../../scripts/historique-awin.mjs'

const offres = { 'dreame-a1-pro': { cdiscount: { prix: 599 }, fnac: { prix: 649 } } }

describe('historique des prix Awin', () => {
  it('ajoute une ligne par produit et par marchand, avec date et heure', () => {
    const h = ajouterReleve([], offres, '2026-11-28T11:00Z')
    expect(h).toEqual([
      { cle: 'dreame-a1-pro', marchand: 'cdiscount', prix: 599, quand: '2026-11-28T11:00Z' },
      { cle: 'dreame-a1-pro', marchand: 'fnac', prix: 649, quand: '2026-11-28T11:00Z' },
    ])
  })

  it('retire les lignes de plus de 90 jours, garde celles du 90e jour', () => {
    const vieux = [
      { cle: 'x', marchand: 'cdiscount', prix: 500, quand: '2026-08-29T10:59Z' },
      { cle: 'x', marchand: 'cdiscount', prix: 510, quand: '2026-08-30T11:00Z' },
    ]
    const h = ajouterReleve(vieux, {}, '2026-11-28T11:00Z')
    expect(h.map((l) => l.prix)).toEqual([510])
  })

  it('un relevé relancé à la même minute remplace le précédent', () => {
    const une = ajouterReleve([], offres, '2026-11-28T11:00Z')
    expect(ajouterReleve(une, offres, '2026-11-28T11:00Z')).toHaveLength(2)
    expect(ajouterReleve(une, offres, '2026-11-28T23:00Z')).toHaveLength(4)
  })

  it('écrit une ligne par relevé, relisible en JSON', () => {
    const h = ajouterReleve([], offres, '2026-11-28T11:00Z')
    const texte = ecrireHistorique(h)
    expect(texte.split('\n')).toHaveLength(5)
    expect(JSON.parse(texte)).toEqual(h)
    expect(ecrireHistorique([])).toBe('[]\n')
  })
})
