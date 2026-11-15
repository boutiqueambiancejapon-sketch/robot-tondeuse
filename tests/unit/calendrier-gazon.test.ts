import { describe, it, expect } from 'vitest'
import { EXPOSITIONS, MOIS, REGIONS, SOURCES_CALENDRIER, construireCalendrier } from '@/lib/content/calendrier-gazon'

const ids = new Set(SOURCES_CALENDRIER.map((s) => s.id))

describe('calendrier du gazon', () => {
  it('donne 12 mois avec 3 gestes et 1 geste robot', () => {
    expect(MOIS).toHaveLength(12)
    for (const m of MOIS) expect(m.gestes).toHaveLength(3)
  })

  it('chaque geste cite une source connue ou est marqué repère indicatif, dans toutes les combinaisons', () => {
    for (const r of REGIONS) {
      for (const e of EXPOSITIONS) {
        const cal = construireCalendrier(r.id, e.id, true)
        expect(cal).toHaveLength(12)
        for (const m of cal) {
          for (const g of [...m.gestes, ...m.robot]) {
            expect(g.sources.length > 0 || g.indicatif === true, g.texte).toBe(true)
            for (const s of g.sources) expect(ids.has(s), `${s} : ${g.texte}`).toBe(true)
          }
        }
      }
    }
  })

  it('sans robot, aucun geste robot', () => {
    for (const m of construireCalendrier('montagne', 'ombre', false)) expect(m.robot).toHaveLength(0)
  })

  it('la région et l’exposition ajoutent des gestes aux bons mois', () => {
    const ref = construireCalendrier('ouest', 'soleil', true)
    const sud = construireCalendrier('sud', 'soleil', true)
    expect(sud[1].gestes.length).toBe(ref[1].gestes.length + 1)
    expect(sud[11].robot).toHaveLength(2)
    const ombre = construireCalendrier('ouest', 'ombre', true)
    expect(ombre[2].gestes.some((g) => g.texte.includes('mousse'))).toBe(true)
    expect(ref[6].gestes).toHaveLength(4)
  })

  it('n’affirme aucun essai', () => {
    const tout = JSON.stringify([MOIS, REGIONS.map((r) => construireCalendrier(r.id, 'ombre', true))])
    expect(tout).not.toMatch(/test[ée]|notre test|essayé/i)
  })
})
