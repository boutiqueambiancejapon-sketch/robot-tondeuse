import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { quizMerchantLinks } from '@/components/quiz/merchant-links'
import { ComparateurSelector } from '@/components/comparer/ComparateurSelector'
import { meilleursPrix, meilleursSpec, verdict, afficher } from '@/components/comparer/comparer-logic'
import { guidePourSurface } from '@/components/tools/guide-surface'
import { calculerRentabilite } from '@/components/tools/rentabilite'
import { COMPARATEURS } from '@/lib/comparateur'

const signaler = vi.hoisted(() => vi.fn())
vi.mock('@/lib/utils/mesure', () => ({ signaler }))

beforeEach(() => {
  signaler.mockClear()
  Element.prototype.scrollIntoView = vi.fn()
  window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia
  vi.useFakeTimers()
})

function repondre(label: string) {
  fireEvent.click(screen.getByRole('button', { name: label }))
  act(() => {
    vi.runAllTimers()
  })
}

describe('quiz V2', () => {
  it('pose une question par écran, puis conseille le robot de la logique existante', () => {
    render(<QuizEngine merchantLinks={quizMerchantLinks()} />)
    expect(screen.getByText('Question 1 sur 4')).toBeInTheDocument()
    repondre('Moins de 400 m²')
    expect(screen.getByText('Question 2 sur 4')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Question précédente' })).toBeInTheDocument()
    repondre('Plutôt plat (moins de 15%)')
    repondre('1000 à 2000 €')
    expect(signaler).not.toHaveBeenCalled()
    repondre('Oui, pas de souci')

    expect(signaler).toHaveBeenCalledTimes(1)
    expect(signaler).toHaveBeenCalledWith('quiz-termine')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Gardena SILENO city 600')
    // rappel des réponses
    expect(screen.getByText('Moins de 400 m²')).toBeInTheDocument()
    // trois marchands : Amazon compté par /go/, Cdiscount et Fnac par Awin
    expect(screen.getByRole('link', { name: 'Voir le prix chez Amazon' }).getAttribute('href')).toMatch(/^\/go\/[A-Z0-9]{10}\/amazon$/)
    expect(screen.getByRole('link', { name: 'Voir le prix chez Cdiscount' }).getAttribute('href')).toMatch(/^https:\/\/www\.awin1\.com\/cread\.php\?awinmid=6948&awinaffid=\d+&ued=/)
    expect(screen.getByRole('link', { name: 'Voir le prix chez Fnac' }).getAttribute('href')).toMatch(/awinmid=12665/)
  })

  it('sans offres fournies, envoie vers le comparateur de la marque', () => {
    render(<QuizEngine />)
    repondre('Plus de 3000 m²')
    repondre('Grosses pentes (25%+)')
    repondre('Plus de 2000 €')
    repondre('Peu importe')
    expect(screen.queryByRole('link', { name: 'Voir le prix chez Amazon' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Comparer les modèles Mammotion' })).toHaveAttribute('href', '/comparer/mammotion')
  })
})

describe('comparateur V2', () => {
  const { modeles, specsLabels } = COMPARATEURS.mammotion

  it('ne met en avant que les lignes comparables', () => {
    const trois = modeles.slice(0, 3)
    expect([...meilleursPrix(trois)]).toEqual([0])
    expect([...meilleursSpec(trois, 'surface')]).toEqual([2])
    expect(meilleursSpec(trois, 'pente').size).toBe(0) // égalité : rien en vert
    expect(meilleursSpec(trois, 'navigation').size).toBe(0) // texte : pas de classement
    expect(afficher('45%')).toBe('45 %')
  })

  it('écrit une phrase de verdict à partir des données', () => {
    const v = verdict(modeles.slice(0, 3))
    expect(v?.moinsCher.nom).toBe('YUKA Mini 2 500')
    expect(v?.plusGrand.nom).toBe('YUKA Mini 2 1000')
    expect(v?.ecart).toBe(600)
  })

  it('garde entre deux et trois modèles choisis', () => {
    render(<ComparateurSelector modeles={modeles} specsLabels={specsLabels} />)
    const on = () => screen.getAllByRole('button', { pressed: true }).map((b) => b.textContent)
    expect(on()).toHaveLength(3)
    fireEvent.click(screen.getByRole('button', { name: 'YUKA 3000' }))
    expect(on()).toHaveLength(3)
    expect(on()).toContain('YUKA 3000')
    fireEvent.click(screen.getByRole('button', { name: 'YUKA 3000' }))
    fireEvent.click(screen.getAllByRole('button', { pressed: true })[0])
    expect(on()).toHaveLength(2)
    expect(document.querySelectorAll('td.best').length).toBeGreaterThan(0)
  })
})

describe('outils V2', () => {
  it('choisit le guide qui couvre la surface', () => {
    expect(guidePourSurface(650).href).toBe('/quel-robot-tondeuse-pour-700m2-guide-achat-2026')
    expect(guidePourSurface(1000).href).toBe('/quel-robot-tondeuse-pour-1000m2-grand-terrain')
    expect(guidePourSurface(0).href).toBe('/comparatifs')
    expect(guidePourSurface(20000).href).toBe('/comparatifs')
  })

  it('garde le calcul de rentabilité', () => {
    const r = calculerRentabilite({ surface: 800, prixRobot: 1200, coutEssenceMois: 15, heuresParTonte: 1.5, coutHoraire: 20, annees: 7 })
    expect(r.coutRobotTotal).toBe(1200 + 350 + 150 + 314)
    expect(r.coutThermiqueTotal).toBe(735 + 560 + 5880)
    expect(r.tempsTotal).toBe(294)
  })
})
