import { describe, it, expect } from 'vitest'
import { PAGE_TYPES, getPageType, showsBuyBar, isPageType } from '@/lib/utils/page-type'
import { getAllArticles } from '@/lib/blog'
import { getStandaloneArticle } from '@/lib/articles'

describe('getPageType', () => {
  it("l'adresse passe avant la catégorie (comparatif rangé en « astuces »)", () => {
    expect(
      getPageType({ slug: 'dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif', categorie: 'astuces' })
    ).toBe('comparatif')
    expect(
      getPageType({ slug: 'robot-tondeuse-lidar-ou-rtk-lequel-choisir-2026', categorie: 'comparatif' })
    ).toBe('comparatif')
  })

  it('reconnaît les guides d’achat par leur adresse', () => {
    for (const slug of [
      'meilleur-robot-tondeuse-2026',
      'quel-robot-tondeuse-pour-200m2-guide-achat-2026',
      'quel-husqvarna-automower-choisir-2026-guide-gamme',
      'robot-tondeuse-lidar-top-5-2026',
      'test-mammotion-luba-2-awd-avis',
      // un guide d'achat qui parle de câble ou de feuilles reste un guide d'achat
      'meilleur-robot-tondeuse-filaire-cable-peripherique-top-6-2026',
      'quel-robot-tondeuse-feuilles-mortes-automne-2026',
    ]) {
      expect(getPageType({ slug, categorie: 'astuces' }), slug).toBe('guide-achat')
    }
  })

  it('reconnaît le dépannage et l’entretien du robot', () => {
    for (const slug of [
      'robot-tondeuse-ne-charge-plus-diagnostic-solutions',
      'cable-peripherique-robot-tondeuse-coupe-trouver-reparer-guide-2026',
      'lames-robot-tondeuse-quand-changer',
      'batterie-robot-tondeuse-duree-vie-remplacement',
      'comment-hiverner-son-robot-tondeuse',
      'comment-installer-robot-tondeuse-soi-meme',
    ]) {
      expect(getPageType({ slug, categorie: 'entretien-pelouse' }), slug).toBe('depannage')
    }
  })

  it('reconnaît le gazon et la réglementation', () => {
    expect(getPageType({ slug: 'comment-enlever-mousse-gazon', categorie: 'entretien-pelouse' })).toBe('gazon')
    expect(getPageType({ slug: 'quel-gazon-semer-pour-robot-tondeuse', categorie: 'entretien-pelouse' })).toBe('gazon')
    expect(getPageType({ slug: 'faut-il-tondre-pelouse-hiver', categorie: 'astuces' })).toBe('gazon')
    expect(
      getPageType({ slug: 'robot-tondeuse-pelouse-neuve-semis-quand-installer-2026', categorie: 'entretien-pelouse' })
    ).toBe('gazon')
    expect(getPageType({ slug: 'horaires-tonte-reglementation', categorie: 'astuces' })).toBe('reglementation')
    expect(getPageType({ slug: 'robot-tondeuse-bruit-voisinage', categorie: 'astuces' })).toBe('reglementation')
  })

  it('l’en-tête de l’article est prioritaire, une valeur inconnue est ignorée', () => {
    expect(getPageType({ slug: 'meilleur-robot-tondeuse', pageType: 'gazon' })).toBe('gazon')
    expect(getPageType({ slug: 'meilleur-robot-tondeuse', pageType: 'nimporte' })).toBe('guide-achat')
    expect(isPageType('outil')).toBe(false)
  })

  it('sans indice, retombe sur la catégorie puis sur guide d’achat', () => {
    expect(getPageType({ slug: 'sujet-libre', categorie: 'entretien-pelouse' })).toBe('gazon')
    expect(getPageType({ slug: 'sujet-libre', categorie: 'astuces' })).toBe('guide-achat')
    expect(getPageType({ slug: 'sujet-libre' })).toBe('guide-achat')
  })
})

describe('pageType sur les articles du site', () => {
  const articles = getAllArticles()

  it('chaque article a un type connu, et les 5 types sont utilisés', () => {
    expect(articles.length).toBeGreaterThan(200)
    for (const a of articles) expect(PAGE_TYPES, a.slug).toContain(a.pageType)
    expect(new Set(articles.map((a) => a.pageType)).size).toBe(PAGE_TYPES.length)
  })

  it('aucune adresse en « -vs- » n’échappe au type comparatif', () => {
    const rates = articles.filter((a) => a.slug.includes('-vs-') && a.pageType !== 'comparatif')
    expect(rates.map((a) => a.slug)).toEqual([])
  })

  it('le chargeur des articles à la racine donne le même type', () => {
    const slug = 'dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif'
    expect(getStandaloneArticle(slug)?.meta.pageType).toBe('comparatif')
    expect(articles.find((a) => a.slug === slug)?.pageType).toBe('comparatif')
  })
})

describe('showsBuyBar (D8) — où la ligne et la barre d’achat s’affichent', () => {
  it('oui sur un guide d’achat et un comparatif, non ailleurs', () => {
    expect(showsBuyBar('guide-achat')).toBe(true)
    expect(showsBuyBar('comparatif')).toBe(true)
    expect(showsBuyBar('gazon')).toBe(false)
    expect(showsBuyBar('depannage')).toBe(false)
    expect(showsBuyBar('reglementation')).toBe(false)
  })

  it('les 3 articles relevés par le Chef le 17/11 n’ont plus de barre d’achat', () => {
    const articles = getAllArticles()
    for (const slug of [
      'robot-tondeuse-ne-charge-plus-diagnostic-solutions',
      'robot-tondeuse-bruit-voisinage-reglementation',
      'comment-bien-arroser-sa-pelouse',
    ]) {
      const article = articles.find((a) => a.slug === slug)
      expect(article, slug).toBeDefined()
      expect(showsBuyBar(article!.pageType), slug).toBe(false)
    }
  })

  it('un classement et un duel la gardent', () => {
    expect(showsBuyBar(getPageType({ slug: 'meilleur-robot-tondeuse-2026' }))).toBe(true)
    expect(showsBuyBar(getPageType({ slug: 'a-vs-b' }))).toBe(true)
  })
})
