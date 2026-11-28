import { describe, expect, it } from 'vitest'
import { caracteristiques, indexable, LOTS, MAX_PAR_LOT, nbSourcees, slugAvis, titreAvis, type RobotBase } from '@/lib/avis-base'
import { forcesLimites, mauvaisChoix, questions } from '@/lib/avis-base-texte'
import { getAllStandaloneArticles } from '@/lib/articles'
import { avisBaseIndexables, BASE, slugsAvisBase } from '@/lib/server/avis-base'

const robot = (id: string) => BASE.find((r) => r.id === id) as RobotBase

describe('lots des avis de la base', () => {
  it('chaque lot a 10 robots au plus, tous dans la base, sans doublon', () => {
    const tous = LOTS.flatMap((l) => l.ids)
    expect(new Set(tous).size).toBe(tous.length)
    for (const l of LOTS) {
      expect(l.ids.length).toBeLessThanOrEqual(MAX_PAR_LOT)
      for (const id of l.ids) expect(robot(id), id).toBeTruthy()
    }
  })

  it("aucun robot d'un lot n'a déjà un avis MDX, aucune adresse n'est déjà prise", () => {
    const articles = getAllStandaloneArticles()
    const bases = new Set(articles.flatMap((a) => (a.base === undefined ? [] : Array.isArray(a.base) ? a.base : [a.base])))
    const slugs = new Set(articles.map((a) => a.slug))
    for (const id of LOTS.flatMap((l) => l.ids)) {
      expect(bases.has(id), id).toBe(false)
      expect(slugs.has(slugAvis(id)), id).toBe(false)
    }
    expect(slugsAvisBase().length).toBe(LOTS.flatMap((l) => l.ids).length)
  })

  it('le lot 1 est indexable en entier : 8 caractéristiques sourcées, une note, 2 rivaux', () => {
    expect(avisBaseIndexables().length).toBe(LOTS[0].ids.length)
    for (const id of LOTS[0].ids) expect(nbSourcees(robot(id)), id).toBeGreaterThanOrEqual(8)
  })
})

describe('règle d’indexation', () => {
  const r = robot('husqvarna-automower-435x-awd-nera')
  it('sans prix public : noindex', () => {
    expect(indexable({ ...r, prix_eur: null }, BASE).ok).toBe(false)
  })
  it('moins de 8 caractéristiques : noindex', () => {
    const maigre = { ...r, ip: null, poids_kg: null, zones_max: null, largeur_coupe_cm: null, hauteur_coupe_mm: null, transmission: null }
    expect(nbSourcees(maigre)).toBeLessThan(8)
    expect(indexable(maigre, BASE).ok).toBe(false)
  })
  it('sans source : aucune caractéristique comptée', () => {
    expect(nbSourcees({ ...r, sources: [] })).toBe(0)
  })
})

describe('textes', () => {
  it('titres de 60 signes au plus, commencent par « Avis », sans année', () => {
    for (const r of BASE) {
      const t = titreAvis(r)
      expect(t.length, t).toBeLessThanOrEqual(60)
      expect(t.startsWith('Avis ')).toBe(true)
      expect(t).not.toMatch(/\(?\b20[2-3]\d\b\)?$|\(20\d\d\)/)
    }
  })

  it('une valeur absente n’apparaît pas dans le tableau', () => {
    const r = robot('kress-kr285e')
    expect(r.autonomie_min).toBeNull()
    expect(caracteristiques(r).some((c) => c.label === 'Autonomie annoncée')).toBe(false)
  })

  it('au moins une limite et un mauvais choix par robot du lot ; jamais d’essai affirmé', () => {
    for (const id of LOTS.flatMap((l) => l.ids)) {
      const r = robot(id)
      const { forces, limites } = forcesLimites(r, BASE)
      expect(limites.length, id).toBeGreaterThan(0)
      expect(mauvaisChoix(r).length, id).toBeGreaterThan(0)
      const texte = JSON.stringify([forces, limites, mauvaisChoix(r), questions(r, [])])
      expect(texte).not.toMatch(/testé|notre test|nous avons|j'ai|j’ai/i)
    }
  })
})
