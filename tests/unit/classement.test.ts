import { describe, expect, it } from 'vitest'
import { modele } from '@/niches/_modele'
import { categorieDuClassement, choisirPodium, donneesClassement, jsonLdClassement } from '@/lib/modele/classement'
import { estClassementArticle } from '@/components/blog/PodiumArticle'
import { affiliateHref } from '@/lib/utils/affiliate'

const fiches = modele.fiches!

describe('podium du classement', () => {
  const c = (item: string, note: number, prix: number | null) => ({ item, note, prix })
  it('meilleur choix, meilleur prix sous la médiane, haut de gamme dans le quart le plus cher', () => {
    const p = choisirPodium([c('a', 9, 449), c('g', 7, 389), c('b', 6, 599), c('a2', 5, 329), c('b2', 5, 199)])
    expect(p).toEqual([
      { label: 'Meilleur choix', item: 'a' },
      { label: 'Meilleur prix', item: 'a2' },
      { label: 'Haut de gamme', item: 'b' },
    ])
  })
  it('un produit sans prix daté ne monte jamais sur le podium', () => {
    const p = choisirPodium([c('x', 10, null), c('a', 8, 500), c('b', 7, 100)])
    expect(p.map((m) => m.item)).not.toContain('x')
    expect(p[0]).toEqual({ label: 'Meilleur choix', item: 'a' })
  })
  it('retire une marche sans candidat plutôt que de la remplir', () => {
    expect(choisirPodium([c('a', 8, 500)])).toEqual([{ label: 'Meilleur choix', item: 'a' }])
    expect(choisirPodium([])).toEqual([])
  })
})

describe('classement du site modèle', () => {
  const d = donneesClassement(fiches, 'produits')
  it('classe les produits notés par note, sans le produit sans note', () => {
    expect(d.analyses).toBe(6)
    expect(d.lignes.map((l) => l.produit.id)).toEqual(['marque-alpha-a1', 'marque-gamma-g1', 'marque-beta-b1', 'marque-alpha-a2', 'marque-beta-b2'])
    expect(d.lignes.map((l) => l.rang)).toEqual([1, 2, 3, 4, 5])
    expect(d.lignes.some((l) => l.produit.id === 'marque-gamma-g2')).toBe(false)
    expect(d.exemple).toBe(true)
  })
  it('podium à 3 marches, chacune avec une offre qui passe par /go/', () => {
    expect(d.podium.map((m) => [m.label, m.produit.id])).toEqual([
      ['Meilleur choix', 'marque-alpha-a1'],
      ['Meilleur prix', 'marque-alpha-a2'],
      ['Haut de gamme', 'marque-beta-b1'],
    ])
    for (const m of d.podium) expect(affiliateHref(m.offre!.url)).toMatch(/^\/go\//)
    expect(d.premier?.produit.id).toBe('marque-alpha-a1')
  })
  it('adresse /meilleur-<catégorie> seulement pour une catégorie du site', () => {
    expect(categorieDuClassement('meilleur-produits', fiches)).toBe('produits')
    expect(categorieDuClassement('meilleur-inconnu', fiches)).toBeNull()
    expect(categorieDuClassement('meilleur-robot-tondeuse-2026', null)).toBeNull()
  })
  it('ItemList ordonnée vers les fiches', () => {
    const j = jsonLdClassement(d, { url: 'https://x.test/meilleur-produits', titre: 'T', site: 'https://x.test' })
    expect(j.itemListElement[0]).toEqual({ '@type': 'ListItem', position: 1, name: 'Marque Alpha A1', url: 'https://x.test/produits/marque-alpha-a1' })
    expect(j.numberOfItems).toBe(5)
  })
})

describe('classements de Quel Robot Tondeuse', () => {
  it('repère les adresses de classement sans toucher aux autres', () => {
    expect(estClassementArticle('meilleur-robot-tondeuse-2026')).toBe(true)
    expect(estClassementArticle('robot-tondeuse-lidar-top-5-2026')).toBe(true)
    expect(estClassementArticle('quand-acheter-robot-tondeuse-meilleur-moment-prix-2026')).toBe(false)
    expect(estClassementArticle('test-mammotion-luba-3-awd-3000-avis')).toBe(false)
  })
})
