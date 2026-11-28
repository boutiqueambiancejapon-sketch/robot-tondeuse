import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { siteDe, SITES } from '@/niches'
import { modele } from '@/niches/_modele'
import { niche } from '@/niche.config'
import { pointsCritere, noterProduit } from '@/lib/modele/note'
import { donneesFiche, jsonLdFiche } from '@/lib/modele/fiche'
import { affiliateHref } from '@/lib/utils/affiliate'

const fiches = modele.fiches!
const parId = (id: string) => fiches.catalogue.find((p) => p.id === id)!
const unites = Object.fromEntries(fiches.caracteristiques.map((c) => [c.id, c.unite]))

describe('choix du site', () => {
  it('lit Quel Robot Tondeuse par défaut, avec ses réglages', () => {
    expect(siteDe(undefined).id).toBe('robot-tondeuse')
    expect(siteDe('').id).toBe('robot-tondeuse')
    expect(niche.siteName).toBe('Quel Robot Tondeuse')
    expect(niche.affiliateTag).toBe('ambiancejap0a-21')
    expect(SITES['robot-tondeuse'].fiches).toBeNull()
    expect(SITES['robot-tondeuse'].indexable).toBe(true)
  })
  it('refuse un site inconnu', () => {
    expect(() => siteDe('inconnu')).toThrow(/inconnu/)
  })
  it('le modèle n’est jamais indexé et n’a pas d’étiquette partenaire', () => {
    expect(siteDe('_modele').indexable).toBe(false)
    expect(modele.site.affiliateTag).toBe('')
  })
})

describe('dossier du site modèle', () => {
  it('6 produits d’exemple, ids uniques, catégories connues', () => {
    expect(fiches.catalogue).toHaveLength(6)
    expect(new Set(fiches.catalogue.map((p) => p.id)).size).toBe(6)
    const cats = modele.site.categories.map((c) => c.slug)
    for (const p of fiches.catalogue) {
      expect(cats).toContain(p.categorie)
      expect(p.exemple).toBe(true)
      expect(p.asin).toBeNull()
    }
  })
  it('chaque critère du barème lit une caractéristique déclarée', () => {
    const ids = fiches.caracteristiques.map((c) => c.id)
    for (const c of fiches.bareme.criteres) expect(ids).toContain(c.champ)
  })
  it('chaque fonts.ts exporte les 3 polices du layout', () => {
    for (const site of Object.keys(SITES)) {
      const src = readFileSync(`niches/${site}/fonts.ts`, 'utf8')
      for (const nom of ['fontDisplay', 'fontPrimary', 'fontMono']) expect(src).toContain(`export const ${nom}`)
    }
  })
})

describe('note par barème', () => {
  it('paliers « à partir de » et « jusqu’à »', () => {
    const [puissance, , poids] = fiches.bareme.criteres
    expect(pointsCritere(puissance, 1200)).toBe(2)
    expect(pointsCritere(puissance, 300)).toBe(0)
    expect(pointsCritere(poids, 3.8)).toBe(2)
    expect(pointsCritere(poids, 7)).toBe(0)
  })
  it('note sur 10 et confiance', () => {
    const n = noterProduit(parId('marque-alpha-a1'), fiches.bareme, unites)
    expect(n.note).toBe(9)
    expect(n.confiance).toBe(100)
  })
  it('critère non publié : ni pour ni contre', () => {
    const n = noterProduit(parId('marque-beta-b2'), fiches.bareme, unites)
    expect(n.confiance).toBe(80)
    expect(n.manques).toEqual(['silence'])
    expect(n.note).toBe(5)
  })
  it('sous 60 % de confiance : pas de note', () => {
    const n = noterProduit(parId('marque-gamma-g2'), fiches.bareme, unites)
    expect(n.confiance).toBe(30)
    expect(n.note).toBeNull()
  })
})

describe('fiche produit', () => {
  const d = donneesFiche(parId('marque-alpha-a1'), fiches)
  it('rang, point fort, point faible et moins cher viennent des données', () => {
    expect(d.rang).toEqual({ rang: 1, notes: 5 })
    expect(d.essentiel.map((l) => l.type)).toEqual(['pour', 'fort', 'faible', 'info'])
    expect(String(d.essentiel[3].texte)).toContain('Marque Gamma G1')
  })
  it('le lien Amazon passe par /go/, jamais en clair', () => {
    expect(d.offres[0].marchand).toBe('Amazon')
    expect(affiliateHref(d.offres[0].url)).toMatch(/^\/go\//)
  })
  it('3 alternatives au plus, sans le produit lui-même', () => {
    expect(d.alternatives.length).toBeLessThanOrEqual(3)
    expect(d.alternatives.map((a) => a.produit.id)).not.toContain('marque-alpha-a1')
  })
  it('données structurées Product avec note sur dossier', () => {
    const j = jsonLdFiche(d, { url: 'https://modele.example/produits/marque-alpha-a1', description: 'x', site: { nom: 'S', url: 'https://modele.example' } })
    expect(j['@type']).toBe('Product')
    expect(j.review?.reviewRating.ratingValue).toBe(9)
    expect(j.offers?.priceValidUntil).toBe('2026-11-29')
  })
})

describe('thème du modèle : contrastes', () => {
  const css = readFileSync('niches/_modele/theme.css', 'utf8')
  const v2 = css.slice(css.indexOf('.v2'))
  const val = (nom: string) => v2.match(new RegExp(`--${nom}:\\s*(#[0-9a-f]{6})`))![1]
  const lum = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const ratio = (a: string, b: string) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
    return (x + 0.05) / (y + 0.05)
  }
  it.each([
    ['ink', 'paper'],
    ['muted', 'paper'],
    ['muted', 'white'],
    ['moss', 'white'],
    ['copper-dark', 'white'],
  ])('%s sur %s ≥ 4,5:1', (a, b) => {
    expect(ratio(val(a), val(b))).toBeGreaterThanOrEqual(4.5)
  })
  it('bouton : blanc sur cuivre ≥ 4,5:1', () => {
    expect(ratio('#ffffff', val('copper'))).toBeGreaterThanOrEqual(4.5)
  })
})
