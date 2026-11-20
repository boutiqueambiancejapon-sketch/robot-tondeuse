import { describe, it, expect } from 'vitest'
import { CRITERES, SEUIL_PROPOSER_MIEUX, noter, lireFiche, lireNavigation, lireConnexion } from '@/lib/bareme'
import { COMPARATEURS } from '@/lib/comparateur'

describe('barème public sur 100', () => {
  it('les maxima des critères font 100 et chaque palier le plus haut vaut le maximum', () => {
    expect(CRITERES.reduce((s, c) => s + c.max, 0)).toBe(100)
    for (const c of CRITERES) expect(c.paliers[0].points).toBe(c.max)
  })

  it('le meilleur profil fait 100, le moins bon reste au-dessus de 0', () => {
    const top = noter({ prix: 1000, surface: 3000, pente: 80, bruit: 55, navigation: 'sans-fil-multi', connexion: '4g' })
    expect(top.note).toBe(100)
    expect(top.proposerMieux).toBe(false)
    const bas = noter({ prix: 900, surface: 300, pente: 20, bruit: 66, navigation: 'fil-aleatoire', connexion: 'aucune' })
    expect(bas.note).toBe(6 + 5 + 3 + 3 + 0)
    expect(bas.proposerMieux).toBe(true)
  })

  it('les points de chaque critère existent dans les paliers publiés', () => {
    const r = noter({ prix: 699, surface: 500, pente: 45, bruit: 57, navigation: 'sans-fil-simple', connexion: '4g' })
    for (const d of r.details) {
      const critere = CRITERES.find((c) => c.id === d.id)!
      expect(critere.paliers.map((p) => p.points)).toContain(d.points)
    }
    // 22 + 10 (139,8 € / 100 m²) + 12 + 12 + 15
    expect(r.note).toBe(71)
  })

  it(`propose mieux sous ${SEUIL_PROPOSER_MIEUX}, pas à ${SEUIL_PROPOSER_MIEUX}`, () => {
    expect(SEUIL_PROPOSER_MIEUX).toBe(55)
  })
})

describe('lecture des fiches', () => {
  it('reconnaît les navigations du comparateur', () => {
    expect(lireNavigation('VSLAM + RTK (sans fil)')).toBe('sans-fil-multi')
    expect(lireNavigation('LiDAR + RTK (sans fil)')).toBe('sans-fil-multi')
    expect(lireNavigation('Vision IA (sans fil)')).toBe('sans-fil-simple')
    expect(lireNavigation('Caméra HDR (sans fil)')).toBe('sans-fil-simple')
    expect(lireNavigation('SensorCut + fil')).toBe('fil-guide')
    expect(lireNavigation('Aléatoire + fil')).toBe('fil-aleatoire')
    expect(lireNavigation('Navigation')).toBeNull()
  })

  it('reconnaît les connexions', () => {
    expect(lireConnexion('WiFi + 4G + App')).toBe('4g')
    expect(lireConnexion('WiFi + Alexa')).toBe('wifi')
    expect(lireConnexion('Bluetooth + App')).toBe('bluetooth')
    expect(lireConnexion('Connectivité')).toBeNull()
  })

  it('ne note pas une fiche incomplète', () => {
    expect(lireFiche(999, { surface: '500 m²', pente: 'Pente max', bruit: '57 dB', navigation: 'Vision IA (sans fil)', connectivite: 'WiFi' })).toBeNull()
  })

  it('chaque robot complet du comparateur reçoit une note entre 0 et 100', () => {
    let notes = 0
    for (const p of Object.values(COMPARATEURS)) {
      for (const m of p.modeles) {
        const fiche = lireFiche(m.prix, m.specs)
        if (!fiche) continue
        const { note } = noter(fiche)
        expect(note).toBeGreaterThan(0)
        expect(note).toBeLessThanOrEqual(100)
        notes++
      }
    }
    expect(notes).toBeGreaterThanOrEqual(20)
  })
})
