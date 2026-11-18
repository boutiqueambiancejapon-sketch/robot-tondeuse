import { describe, it, expect } from 'vitest'
import { getAllStandaloneArticles, getStandaloneArticle } from '@/lib/articles'
import { chooseEncarts } from '@/lib/utils/encarts'
import { PIECES, PIECE_KEYS, pieceAlreadyShown, pieceForSlug, pieceHref, pieceSearchUrl } from '@/lib/utils/pieces'

describe('pieceForSlug', () => {
  it('donne la pièce qui règle la panne de l’article', () => {
    expect(pieceForSlug('lames-robot-tondeuse-quand-changer')).toBe('lames')
    expect(pieceForSlug('comment-entretenir-son-robot-tondeuse-guide-complet')).toBe('lames')
    expect(pieceForSlug('cable-peripherique-robot-tondeuse-ronge-mulots')).toBe('cable')
    expect(pieceForSlug('cable-peripherique-robot-tondeuse-coupe-trouver-reparer-guide-2026')).toBe('cable')
    expect(pieceForSlug('batterie-robot-tondeuse-duree-vie-remplacement')).toBe('batterie')
    expect(pieceForSlug('robot-tondeuse-ne-charge-plus-diagnostic-solutions')).toBe('batterie')
  })
  it('ne propose rien quand aucune pièce ne s’impose', () => {
    expect(pieceForSlug('nettoyer-robot-tondeuse-jet-eau-karcher')).toBeNull()
    expect(pieceForSlug('comment-hiverner-son-robot-tondeuse')).toBeNull()
    expect(pieceForSlug('comment-installer-robot-tondeuse-soi-meme')).toBeNull()
    expect(pieceForSlug('comment-bien-arroser-sa-pelouse')).toBeNull()
    expect(pieceForSlug('meilleur-robot-tondeuse-2026')).toBeNull()
  })
})

describe('encart « pièce »', () => {
  it('passe par /go, vers une recherche, sans prix ni essai affirmé', () => {
    for (const key of PIECE_KEYS) {
      const piece = PIECES[key]
      expect(pieceHref(key)).toBe(`/go/${key}/amazon`)
      expect(pieceSearchUrl(key)).toMatch(/^https:\/\/www\.amazon\.fr\/s\?k=/)
      const texte = `${piece.titre} ${piece.texte} ${piece.bouton}`
      expect(texte).not.toMatch(/test[ée]|notre test|€\s*au lieu|promo/i)
      expect(piece.bouton).not.toMatch(/[→›>]/)
    }
  })
  it('repère une pièce déjà montrée par l’auteur, pas un robot', () => {
    expect(pieceAlreadyShown('lames', '<ProductCTA name="Pack universel 30 lames + vis" url="x" />')).toBe(true)
    expect(pieceAlreadyShown('cable', '<ProductCTA name="Husqvarna Automower 310 Mark II" hook="Câble périphérique" url="x" />')).toBe(false)
  })
})

describe('articles réels', () => {
  const articles = getAllStandaloneArticles()
  const milieu = (slug: string) => {
    const article = articles.find((a) => a.slug === slug)
    const data = getStandaloneArticle(slug)
    if (!article || !data) throw new Error(`article introuvable : ${slug}`)
    return chooseEncarts({ pageType: article.pageType, content: data.content, hasMerchantLink: true, piece: pieceForSlug(slug) }).milieu
  }
  it('la pièce apparaît sur les articles de dépannage concernés', () => {
    expect(milieu('robot-tondeuse-ne-charge-plus-diagnostic-solutions')).toBe('piece')
    expect(milieu('cable-peripherique-robot-tondeuse-ronge-mulots')).toBe('piece')
    expect(milieu('batterie-robot-tondeuse-duree-vie-remplacement')).toBe('piece')
  })
  it('pas de doublon sur l’article des lames, rien sur un article gazon ou un guide d’achat', () => {
    expect(milieu('lames-robot-tondeuse-quand-changer')).toBeNull()
    expect(milieu('comment-bien-arroser-sa-pelouse')).toBe('calendrier')
    expect(milieu('nettoyer-robot-tondeuse-jet-eau-karcher')).toBeNull()
  })
  it('aucun article hors dépannage ne reçoit la pièce', () => {
    for (const a of articles) {
      if (a.pageType === 'depannage') continue
      const data = getStandaloneArticle(a.slug)
      if (!data) continue
      const e = chooseEncarts({ pageType: a.pageType, content: data.content, hasMerchantLink: true, piece: pieceForSlug(a.slug) })
      expect(e.milieu, a.slug).not.toBe('piece')
    }
  })
})
