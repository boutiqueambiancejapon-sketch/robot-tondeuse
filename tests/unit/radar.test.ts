import { describe, it, expect } from 'vitest'
import { nomRobot, rangCentile, serieRadar, concurrentsParDefaut, lireVs, pointsConnexion, type RobotCatalogue } from '@/lib/radar'
import { robotDeLaFiche, donneesRadar, CATALOGUE } from '@/lib/radar-fiche'

const r = (id: string, o: Partial<RobotCatalogue> = {}): RobotCatalogue => ({
  id, marque: 'M', modele: id, surface_m2: 1000, pente_pct: 40, guidage: 'rtk+vision',
  connectivite: ['wifi', 'bluetooth'], bruit_db: 60, autonomie_min: 100, prix_eur: 1000, ...o,
})

describe('rangCentile', () => {
  it('donne 0 au plus bas, 10 au plus haut, 5 au milieu', () => {
    expect(rangCentile(1, [1, 2, 3])).toBe(0)
    expect(rangCentile(3, [1, 2, 3])).toBe(10)
    expect(rangCentile(2, [1, 2, 3])).toBe(5)
  })
  it('inverse : la plus petite valeur a 10', () => {
    expect(rangCentile(1, [1, 2, 3], true)).toBe(10)
  })
  it('égalités : rang moyen', () => {
    expect(rangCentile(2, [1, 2, 2, 3])).toBe(5)
  })
})

describe('serieRadar', () => {
  const cat = [r('a', { prix_eur: 500, bruit_db: null }), r('b', { prix_eur: 1500 }), r('c', { prix_eur: 1000, connectivite: [] })]
  it('axe sans donnée = null, jamais 0', () => {
    const s = serieRadar(cat[0], cat)
    expect(s.notes.silence).toBeNull()
    expect(s.valeurs.silence).toBeNull()
    expect(serieRadar(cat[2], cat).notes.connexion).toBeNull()
  })
  it('prix inversé : le moins cher a 10', () => {
    expect(serieRadar(cat[0], cat).notes.prix).toBe(10)
    expect(serieRadar(cat[1], cat).notes.prix).toBe(0)
  })
  it('valeurs lisibles', () => {
    expect(serieRadar(cat[1], cat).valeurs.prix).toBe('1 500 €')
  })
})

describe('pointsConnexion', () => {
  it('compte app, wifi, 4G et GPS RTK', () => {
    expect(pointsConnexion(r('x', { connectivite: ['wifi', 'bluetooth', '4g'] }))).toBe(5)
    expect(pointsConnexion(r('x', { guidage: 'fil', connectivite: ['bluetooth'] }))).toBe(1)
    expect(pointsConnexion(r('x', { option_4g: true }))).toBe(4)
  })
})

describe('concurrentsParDefaut', () => {
  it('même famille de guidage, autre marque, prix le plus proche, sans robot arrêté', () => {
    const moi = r('moi', { prix_eur: 1000 })
    const cat = [moi, r('fil', { guidage: 'fil', marque: 'Z', prix_eur: 1000 }), r('loin', { marque: 'Z', prix_eur: 3000 }),
      r('proche', { marque: 'Z', prix_eur: 1100 }), r('meme-marque', { prix_eur: 1000 }), r('stop', { marque: 'Z', prix_eur: 1000, arrete: true })]
    expect(concurrentsParDefaut(moi, cat).map((x) => x.id)).toEqual(['proche', 'loin'])
  })
})

describe('nomRobot', () => {
  it('ne répète pas le nom de gamme', () => {
    expect(nomRobot({ marque: 'Segway Navimow', modele: 'Navimow i220 LiDAR' })).toBe('Segway Navimow i220 LiDAR')
    expect(nomRobot({ marque: 'Husqvarna', modele: 'Automower 305' })).toBe('Husqvarna Automower 305')
  })
})

describe('lireVs', () => {
  it('garde 3 ids connus au plus, sans doublon ni le robot lui-même', () => {
    expect(lireVs('a,b,a,moi,zz,c,d', ['a', 'b', 'c', 'd', 'moi'], 'moi')).toEqual(['a', 'b', 'c'])
    expect(lireVs(null, ['a'], 'moi')).toEqual([])
  })
})

describe('catalogue réel', () => {
  it('relie l’avis LUBA 3 AWD 3000 par son adresse', () => {
    expect(robotDeLaFiche('avis-mammotion-luba-3-awd-3000', '')?.id).toBe('mammotion-luba-3-awd-3000')
  })
  it('pas de radar sans correspondance (450X NERA absent de la base, page qui n’est pas une fiche)', () => {
    expect(robotDeLaFiche('avis-husqvarna-automower-450x-nera', 'Husqvarna Automower 450X NERA avis')).toBeNull()
    expect(robotDeLaFiche('avis-mammotion-luba-3-awd', 'Avis Mammotion Luba 3 AWD : quelle version choisir')).toBeNull()
    expect(robotDeLaFiche('guide-mammotion-luba-3-awd-3000', 'Mammotion LUBA 3 AWD 3000')).toBeNull()
  })
  it('notes entre 0 et 10 et 2 concurrents pour chaque robot', () => {
    for (const robot of CATALOGUE) {
      const d = donneesRadar(robot)
      expect(d.defaut).toHaveLength(2)
      for (const n of Object.values(d.principal.notes)) if (n !== null) expect(n >= 0 && n <= 10).toBe(true)
    }
  })
})
