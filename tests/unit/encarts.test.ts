import { describe, it, expect } from 'vitest'
import { chooseEncarts, isMerchantUrl, middleH2Index } from '@/lib/utils/encarts'
import { PAGE_TYPES } from '@/lib/utils/page-type'

const SANS = 'Texte.\n\n## Un\n\n## Deux\n'
const AVEC = 'Texte.\n\n<ProductCTA name="X" price="1 €" url="https://www.amazon.fr/dp/B08VJJKFBX" />\n'

describe('chooseEncarts', () => {
  it('guide d’achat et comparatif : marchand au milieu, quiz à la fin', () => {
    expect(chooseEncarts({ pageType: 'guide-achat', content: SANS, hasMerchantLink: true })).toEqual({ milieu: 'marchand', fin: 'quiz' })
    expect(chooseEncarts({ pageType: 'comparatif', content: SANS, hasMerchantLink: true })).toEqual({ milieu: 'marchand', fin: 'quiz' })
  })
  it('pas d’encart marchand en double : l’auteur en a déjà posé un, ou l’article n’a pas de lien', () => {
    expect(chooseEncarts({ pageType: 'guide-achat', content: AVEC, hasMerchantLink: true }).milieu).toBeNull()
    expect(chooseEncarts({ pageType: 'comparatif', content: SANS, hasMerchantLink: false }).milieu).toBeNull()
  })
  it('gazon et réglementation : le calendrier au milieu', () => {
    expect(chooseEncarts({ pageType: 'gazon', content: AVEC, hasMerchantLink: true })).toEqual({ milieu: 'calendrier', fin: 'quiz' })
    expect(chooseEncarts({ pageType: 'reglementation', content: SANS, hasMerchantLink: true })).toEqual({ milieu: 'calendrier', fin: null })
  })
  it('dépannage : pas de robot à vendre, le calendrier à la fin', () => {
    expect(chooseEncarts({ pageType: 'depannage', content: SANS, hasMerchantLink: true })).toEqual({ milieu: null, fin: 'calendrier' })
  })
  it('encart de fin retiré si la dernière partie du texte mène déjà au quiz', () => {
    const fin = 'Texte.\n\n## Un\n\n## Encore un doute ?\n\n[Quel robot pour mon jardin](/quiz) en 4 questions.\n'
    expect(chooseEncarts({ pageType: 'guide-achat', content: fin, hasMerchantLink: false }).fin).toBeNull()
    const debut = 'Voir [le quiz](/quiz).\n\n## Un\n\n## Deux\n'
    expect(chooseEncarts({ pageType: 'guide-achat', content: debut, hasMerchantLink: false }).fin).toBe('quiz')
  })
  it('un lien vers une page du site n’est pas un lien marchand', () => {
    expect(isMerchantUrl('/quiz')).toBe(false)
    expect(isMerchantUrl(undefined)).toBe(false)
    expect(isMerchantUrl('https://www.amazon.fr/dp/B08VJJKFBX')).toBe(true)
  })
  it('jamais deux fois la même demande', () => {
    for (const pageType of PAGE_TYPES) {
      const { milieu, fin } = chooseEncarts({ pageType, content: SANS, hasMerchantLink: true })
      if (milieu) expect(milieu).not.toBe(fin)
    }
  })
})

describe('middleH2Index', () => {
  it('aucun milieu sous 3 H2, sinon le H2 qui ouvre la seconde moitié', () => {
    expect(middleH2Index(2)).toBe(-1)
    expect(middleH2Index(3)).toBe(2)
    expect(middleH2Index(6)).toBe(3)
    expect(middleH2Index(7)).toBe(4)
  })
})
