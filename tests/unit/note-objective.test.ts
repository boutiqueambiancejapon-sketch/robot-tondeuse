/* eslint-disable @typescript-eslint/no-explicit-any -- lecture libre du JSON-LD produit dans le test */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { noteObjective, rangDansCatalogue, navigationDe, connexionDe } from '@/lib/note-objective'
import { ficheNote } from '@/lib/fiche-note'
import { jsonLdProduit, lendemain } from '@/lib/jsonld-produit'
import { CATALOGUE } from '@/lib/radar-fiche'
import type { RobotCatalogue } from '@/lib/radar'

const r = (o: Partial<RobotCatalogue> = {}): RobotCatalogue => ({
  id: 'x', marque: 'M', modele: 'X', surface_m2: 1000, pente_pct: 50, guidage: 'rtk+vision',
  connectivite: ['wifi', '4g'], bruit_db: 57, autonomie_min: 100, prix_eur: 1000, ...o,
})

describe('note objective sur 10', () => {
  it('toutes les données : confiance 100 % et note = barème sur 100 divisé par 10', () => {
    // navigation 30 + prix/100 m² (100 €) 15 + pente 12 + bruit 12 + 4G 15 = 84
    const n = noteObjective(r())
    expect(n.confiance).toBe(100)
    expect(n.note).toBe(8.4)
    expect(n.badgePossible).toBe(true)
  })

  it('bruit non publié : critère retiré, note recalculée, confiance 85 %', () => {
    const n = noteObjective(r({ bruit_db: null }))
    expect(n.confiance).toBe(85)
    expect(n.note).toBe(Math.round((72 / 85) * 100) / 10)
    expect(n.manques).toEqual(['bruit non publié'])
  })

  it('sous 60 % de confiance : pas de note ; sans prix public : pas de note', () => {
    expect(noteObjective(r({ guidage: 'fil', bruit_db: null, connectivite: null })).note).toBeNull()
    const sansPrix = noteObjective(r({ prix_eur: null }))
    expect(sansPrix.confiance).toBe(75)
    expect(sansPrix.note).toBeNull()
  })

  it('sous 80 % de confiance : note possible, badge interdit', () => {
    const n = noteObjective(r({ guidage: 'fil' }))
    expect(n.confiance).toBe(70)
    expect(n.note).not.toBeNull()
    expect(n.badgePossible).toBe(false)
  })

  it('lit le guidage et la connexion de la base sans deviner', () => {
    expect(navigationDe('rtk+lidar+vision')).toBe('sans-fil-multi')
    expect(navigationDe('rtk')).toBe('sans-fil-simple')
    expect(navigationDe('fil')).toBeNull()
    expect(connexionDe(['bluetooth', 'wifi'])).toBe('wifi')
    expect(connexionDe(null)).toBeNull()
  })

  it('rang parmi les robots notés, ex æquo au même rang', () => {
    const cat = [r({ id: 'a' }), r({ id: 'b' }), r({ id: 'c', pente_pct: 20 })]
    expect(rangDansCatalogue(cat[0], cat)).toEqual({ rang: 1, notes: 3, analyses: 3 })
    expect(rangDansCatalogue(cat[2], cat)?.rang).toBe(3)
  })
})

describe('fiche pilote LUBA 3 AWD 3000', () => {
  const luba = CATALOGUE.find((x) => x.id === 'mammotion-luba-3-awd-3000')!
  const f = ficheNote(luba, CATALOGUE)

  it('note, confiance et rang tirés de la base', () => {
    expect(f.note.confiance).toBe(85)
    expect(f.note.manques).toEqual(['bruit non publié'])
    expect(f.note.note).toBeGreaterThan(9)
    expect(f.rang?.analyses).toBe(CATALOGUE.length)
  })

  it('« L’essentiel » : aucun mot d’essai, chaque chiffre vient de la base', () => {
    const texte = f.essentiel.join(' ')
    expect(texte).not.toMatch(/test|essay|j'ai|notre avis/i)
    expect(texte).toMatch(/3\s000\sm²/u)
    expect(texte).toMatch(/80\s%/u)
  })
})

/** Parcourt tout l'objet : aucune valeur vide, nulle ou indéfinie. */
function vides(o: unknown, chemin = ''): string[] {
  if (o === null || o === undefined || o === '') return [chemin]
  if (typeof o === 'number' && !Number.isFinite(o)) return [chemin]
  if (Array.isArray(o)) return o.length ? o.flatMap((v, i) => vides(v, `${chemin}[${i}]`)) : [chemin]
  if (typeof o === 'object') return Object.entries(o).flatMap(([k, v]) => vides(v, `${chemin}.${k}`))
  return []
}

/** Robot principal (premier id du champ `base`) de chaque fiche reliée à la base. */
function robotsDesFiches(): string[] {
  const fichiers = readdirSync('content', { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.mdx'))
  const ids = fichiers.flatMap((f) => {
    const m = readFileSync(join('content', f), 'utf8').match(/^base:\s*\[?\s*"([^"]+)"/m)
    return m ? [m[1]] : []
  })
  return [...new Set(ids)]
}

describe('JSON-LD Product de toutes les fiches reliées à la base', () => {
  const ids = [...new Set([...robotsDesFiches(), 'segway-navimow-x450', 'husqvarna-automower-430v-nera'])]
  it('au moins 5 robots de fiches reliées', () => expect(robotsDesFiches().length).toBeGreaterThanOrEqual(5))
  const page = (id: string) => ({
    url: `https://quel-robot-tondeuse.com/${id}`,
    titre: id,
    description: `Fiche ${id}`,
    publie: '2026-04-08',
    modifie: '2026-11-28',
    site: { nom: 'Quel Robot Tondeuse', url: 'https://quel-robot-tondeuse.com' },
  })

  for (const id of ids) {
    it(id, () => {
      const robot = CATALOGUE.find((x) => x.id === id)!
      expect(robot).toBeDefined()
      const f = ficheNote(robot, CATALOGUE)
      const [product, webPage] = jsonLdProduit(f, page(id)) as unknown as [Record<string, any>, Record<string, any>]
      expect(vides(product)).toEqual([])
      expect(vides(webPage)).toEqual([])
      expect(product['@type']).toBe('Product')
      expect(product.name).toBeTruthy()
      expect(product.brand).toEqual({ '@type': 'Brand', name: robot.marque })
      expect(JSON.stringify(product)).not.toContain('aggregateRating')
      // Une PropertyValue par caractéristique publiée, surface en m² (MTK).
      const surface = product.additionalProperty.find((p: any) => p.unitCode === 'MTK')
      expect(surface.value).toBe(robot.surface_m2)
      if (robot.bruit_db === null) expect(product.additionalProperty.some((p: any) => p.unitCode === '2N')).toBe(false)
      // Review éditoriale seulement si le robot est noté, sur 10.
      if (f.note.note === null) expect(product.review).toBeUndefined()
      else {
        expect(product.review.author['@type']).toBe('Organization')
        expect(product.review.reviewRating).toEqual({ '@type': 'Rating', ratingValue: f.note.note, bestRating: 10, worstRating: 0 })
      }
      // Offres : seulement des relevés datés, valables jusqu'au lendemain du relevé.
      const offres = product.offers ? (product.offers.offers ?? [product.offers]) : []
      expect(offres.length).toBe(f.offres.length)
      offres.forEach((o: any, i: number) => {
        expect(o.priceCurrency).toBe('EUR')
        expect(o.price).toBe(f.offres[i].prix)
        expect(o.priceValidUntil).toBe(lendemain(f.offres[i].date))
      })
      expect(webPage.speakable.cssSelector).toEqual(['#note-resume', '#essentiel-liste'])
    })
  }

  it('pilote : 2 offres datées (Cdiscount et boutique Mammotion) en AggregateOffer', () => {
    const f = ficheNote(CATALOGUE.find((x) => x.id === 'mammotion-luba-3-awd-3000')!, CATALOGUE)
    const [product] = jsonLdProduit(f, page("p")) as unknown as [Record<string, any>]
    expect(product.offers['@type']).toBe('AggregateOffer')
    expect(product.offers.offerCount).toBe(f.offres.length)
    expect(lendemain('2026-11-30')).toBe('2026-12-01')
  })
})
