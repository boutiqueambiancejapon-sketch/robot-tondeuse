import { describe, it, expect } from 'vitest'
import { articleHref, getAllArticles, type ArticleMeta } from '@/lib/blog'
import { getPiscineArticle, getPiscineArticles, getPiscineSlugs } from '@/lib/piscine'
import { chooseEncarts } from '@/lib/utils/encarts'
import { showsBuyBar } from '@/lib/utils/page-type'
import { BASSINS, BASSIN_KEYS, PISCINE_DOSSIER, bassinsForArticle, piscinePageType } from '@/lib/utils/piscine'
import { FOOTER_V2, MENU_V2 } from '@/lib/menu-v2'
import sitemap from '@/app/sitemap'

describe('piscinePageType', () => {
  it('classements, avis de marque et guides de choix : pages d’achat', () => {
    for (const slug of ['meilleur-robot-piscine', 'meilleur-robot-piscine-sans-fil', 'avis-wybot', 'quel-robot-piscine-8x4-10x5', 'filtre-robot-piscine']) {
      expect(piscinePageType({ slug })).toBe('guide-achat')
    }
  })
  it('duels et « X ou Y » : comparatifs', () => {
    expect(piscinePageType({ slug: 'dolphin-vs-zodiac' })).toBe('comparatif')
    expect(piscinePageType({ slug: 'robot-piscine-sans-fil-ou-filaire' })).toBe('comparatif')
  })
  it('entretien et panne : pas de carte d’achat', () => {
    expect(piscinePageType({ slug: 'hivernage-robot-piscine' })).toBe('depannage')
    expect(piscinePageType({ slug: 'robot-piscine-ne-monte-plus-aux-parois' })).toBe('depannage')
    expect(showsBuyBar(piscinePageType({ slug: 'hivernage-robot-piscine' }))).toBe(false)
  })
  it('l’en-tête de l’article passe avant l’adresse, et jamais « gazon » par défaut', () => {
    expect(piscinePageType({ slug: 'hivernage-robot-piscine', pageType: 'guide-achat' })).toBe('guide-achat')
    expect(piscinePageType({ slug: 'robot-piscine-et-arrosage-pelouse', pageType: 'nimporte' })).toBe('guide-achat')
  })
})

describe('bassinsForArticle', () => {
  it('lit le bassin dans l’adresse', () => {
    expect(bassinsForArticle({ slug: 'meilleur-robot-piscine-hors-sol' })).toEqual(['hors-sol'])
    expect(bassinsForArticle({ slug: 'meilleur-robot-piscine-sans-fil' })).toEqual(['sans-fil'])
    expect(bassinsForArticle({ slug: 'robot-piscine-fond-parois-ligne-d-eau' })).toEqual(['enterree', 'ligne-eau'])
  })
  it('article général : aucun bassin, il reste affiché partout', () => {
    expect(bassinsForArticle({ slug: 'meilleur-robot-piscine' })).toEqual([])
  })
  it('le champ « bassins » de l’en-tête passe avant l’adresse, sans valeur inconnue', () => {
    expect(bassinsForArticle({ slug: 'meilleur-robot-piscine-sans-fil', bassins: ['enterree', 'lagon'] })).toEqual(['enterree'])
  })
  it('quatre entrées, chacune avec son conseil', () => {
    expect(BASSINS.map((b) => b.key)).toEqual([...BASSIN_KEYS])
    for (const b of BASSINS) expect(b.conseil.length).toBeGreaterThan(40)
  })
})

describe('rubrique piscine : adresses et encarts', () => {
  it('un article de la rubrique vit sous /robot-piscine/<adresse>', () => {
    const a = { slug: 'dolphin-vs-zodiac', categorie: PISCINE_DOSSIER, standalone: true, dossier: PISCINE_DOSSIER } as ArticleMeta
    expect(articleHref(a)).toBe('/robot-piscine/dolphin-vs-zodiac')
  })
  it('les adresses existantes ne changent pas', () => {
    const all = getAllArticles()
    expect(all.length).toBeGreaterThan(200)
    expect(all.some((a) => a.dossier)).toBe(false)
    expect(all.filter((a) => a.standalone).every((a) => articleHref(a) === `/${a.slug}`)).toBe(true)
  })
  it('les articles piscine ne se mêlent pas aux listes des robots tondeuses', () => {
    const slugs = new Set(getAllArticles().map((a) => a.slug))
    for (const a of getPiscineArticles()) {
      expect(a.dossier).toBe(PISCINE_DOSSIER)
      expect(slugs.has(a.slug)).toBe(false)
    }
    expect(getPiscineSlugs().length).toBeGreaterThanOrEqual(getPiscineArticles().length)
  })
  it('refuse une adresse qui sort du dossier', () => {
    expect(getPiscineArticle('../meilleur-robot-tondeuse-2026')).toBeNull()
    expect(getPiscineArticle('page-qui-n-existe-pas')).toBeNull()
  })
  it('ni calendrier du gazon ni pièce de robot tondeuse dans un article piscine', () => {
    const texte = 'Texte.\n\n## Un\n\n## Deux\n'
    expect(chooseEncarts({ pageType: 'depannage', content: texte, hasMerchantLink: false, piece: null, horsPelouse: true })).toEqual({ milieu: null, fin: 'quiz' })
    expect(chooseEncarts({ pageType: 'guide-achat', content: texte, hasMerchantLink: true, horsPelouse: true })).toEqual({ milieu: 'marchand', fin: 'quiz' })
  })
  it('la rubrique est dans le menu « Choisir », le pied de page et le plan du site', () => {
    expect(MENU_V2.find((g) => g.title === 'Choisir')?.links.some((l) => l.href === '/robot-piscine')).toBe(true)
    expect(FOOTER_V2.some((l) => l.href === '/robot-piscine')).toBe(true)
    expect(sitemap().filter((e) => e.url.endsWith('/robot-piscine')).length).toBe(1)
  })
})
