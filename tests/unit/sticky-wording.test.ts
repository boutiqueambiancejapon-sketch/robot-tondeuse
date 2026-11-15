import { describe, it, expect, vi } from 'vitest'
import { wording, merchantLink } from '@/components/blog/sticky-wording'

vi.mock('@/niche.config', () => ({
  niche: { affiliateTag: 'test-tag-21', defaultStore: 'Amazon' },
}))

describe('wording', () => {
  it('garde le nom du robot et retire le prix non daté entre parenthèses', () => {
    expect(wording('Husqvarna Automower 310 Mark II (1 399-1 599 €)')).toEqual({
      title: 'Husqvarna Automower 310 Mark II',
      button: 'Voir l’offre',
    })
    expect(wording('Voir le Mammotion Yuka Mini 2').title).toBe('Mammotion Yuka Mini 2')
  })

  it('« Voir sur Amazon » devient le bouton, l’accroche de l’article le texte', () => {
    expect(wording('Voir sur Amazon', 'Notre recommandation')).toEqual({
      title: 'Notre recommandation',
      button: 'Voir sur Amazon',
    })
    expect(wording('Voir sur Amazon', 'Voir le prix du jour').title).toBe('Le prix chez le marchand')
    expect(wording('Voir sur Amazon', 'Le choix &laquo; petit jardin &raquo;').title).toBe('Le choix « petit jardin »')
  })
})

describe('merchantLink', () => {
  it('un lien Amazon passe par /go/ avec rel sponsored', () => {
    const link = merchantLink('https://www.amazon.fr/dp/B08VJJKFBX')
    expect(link.href).toBe('/go/B08VJJKFBX/amazon')
    expect(link.rel).toContain('sponsored')
    expect(link.rel).toContain('nofollow')
  })
  it('un autre lien reste tel quel', () => {
    expect(merchantLink('https://www.fnac.com/a1')).toEqual({ href: 'https://www.fnac.com/a1', rel: 'noopener' })
  })
})
