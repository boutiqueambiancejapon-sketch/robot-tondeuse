import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { choisirPhoto, estAdresseAmazon, initiale, releveAmazonValide, type RelevePhotosAmazon } from '@/lib/photos-produits'
import { construireReleve, lireReponse, paquets, RESSOURCES } from '../../scripts/lib/photos-amazon.mjs'
import { CarteProduit } from '@/components/v2/gabarits/CarteProduit'
import { PhotoFiche } from '@/components/v2/gabarits/PhotoFiche'

const URL_AMZ = 'https://m.media-amazon.com/images/I/71abcDEF12L._AC_SL1500_.jpg'
const MAINTENANT = Date.parse('2026-11-28T21:00:00Z')
const releve = (heure: string, image = URL_AMZ): RelevePhotosAmazon => ({ releve: heure, produits: { 'luba-x': { asin: 'B0TEST0001', image } } })

describe('choix de la photo', () => {
  it("photo hébergée d'abord, même si Amazon en a une", () => {
    const p = choisirPhoto(['luba-x'], new Set(['luba-x']), releve('2026-11-28T20:10Z'), MAINTENANT)
    expect(p).toEqual({ src: '/images/produits/luba-x.webp', origine: 'site' })
  })

  it("sinon l'adresse Amazon du relevé de moins de 24 heures", () => {
    expect(choisirPhoto(['luba-x'], new Set(), releve('2026-11-28T20:10Z'), MAINTENANT)).toMatchObject({ src: URL_AMZ, origine: 'amazon' })
  })

  it("relevé de plus de 24 heures, vide ou daté dans le futur : pas de photo (l'initiale)", () => {
    expect(choisirPhoto(['luba-x'], new Set(), releve('2026-11-27T20:59Z'), MAINTENANT)).toBeNull()
    expect(choisirPhoto(['luba-x'], new Set(), { releve: null, produits: {} }, MAINTENANT)).toBeNull()
    expect(releveAmazonValide('2026-11-29T09:00Z', MAINTENANT)).toBe(false)
  })

  it("adresse hors des serveurs d'Amazon : écartée", () => {
    expect(estAdresseAmazon('https://exemple.com/images/a.jpg')).toBe(false)
    expect(choisirPhoto(['luba-x'], new Set(), releve('2026-11-28T20:10Z', 'https://exemple.com/a.jpg'), MAINTENANT)).toBeNull()
  })

  it("initiale : celle de la marque, sinon celle du nom", () => {
    expect(initiale('Mammotion', 'LUBA 3')).toBe('M')
    expect(initiale(undefined, 'ecovacs Goat')).toBe('E')
  })
})

describe('relevé de nuit (script)', () => {
  it('la photo est demandée dans la même demande que le prix, par paquets de 10', () => {
    expect(RESSOURCES).toEqual(expect.arrayContaining(['images.primary.large', 'offersV2.listings.price']))
    expect(paquets(Array.from({ length: 23 }, (_, i) => i)).map((p: number[]) => p.length)).toEqual([10, 10, 3])
  })

  it("lit l'adresse, la taille et le prix, écarte une adresse étrangère, range par id de la base", () => {
    const parAsin = lireReponse({
      itemsResult: {
        items: [
          { asin: 'B0TEST0001', images: { primary: { large: { url: URL_AMZ, width: 500, height: 375 } } }, offersV2: { listings: [{ price: { money: { amount: 1899 } } }] } },
          { asin: 'B0TEST0002', images: { primary: { large: { url: 'http://autre.site/a.jpg' } } } },
          { asin: 'B0TEST0003' },
        ],
      },
    })
    expect(Object.keys(parAsin)).toEqual(['B0TEST0001'])
    const r = construireReleve([{ id: 'luba-x', asin: 'B0TEST0001' }, { id: 'sans', asin: null }], parAsin, new Date('2026-11-28T20:10:42Z'))
    expect(r).toEqual({ releve: '2026-11-28T20:10Z', produits: { 'luba-x': { asin: 'B0TEST0001', image: URL_AMZ, largeur: 500, hauteur: 375, prix: 1899 } } })
  })
})

describe('vignettes', () => {
  it("carte sans photo : l'initiale de la marque", () => {
    const { container } = render(<CarteProduit produit={{ id: 'g', nom: 'Goat A3000', marque: 'Ecovacs', note: null, photo: null }} />)
    expect(container.querySelector('.g-pic--vide span')?.textContent).toBe('E')
  })

  it("fiche avec photo Amazon : l'image vient directement d'Amazon (pas de copie par l'optimiseur), source affichée", () => {
    render(<PhotoFiche produit={{ id: 'l', nom: 'Mammotion LUBA X', marque: 'Mammotion', note: 8, photo: { src: URL_AMZ, origine: 'amazon' } }} />)
    const img = screen.getByAltText('Mammotion LUBA X, photo du produit')
    expect(img.getAttribute('src')).toBe(URL_AMZ)
    expect(screen.getByText('Photo : Amazon.fr')).toBeTruthy()
  })

  it('carte avec photo hébergée : optimisée par le site, sans mention de source', () => {
    render(<CarteProduit produit={{ id: 'd', nom: 'Dreame A1 Pro', note: 7, photo: { src: '/images/produits/dreame-a1-pro.webp', origine: 'site' } }} />)
    expect(screen.getByAltText('Dreame A1 Pro, photo du produit').getAttribute('src')).toContain('/_next/image')
  })
})
