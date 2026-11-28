import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { compterFacettes, FACETTES_ROBOTS, facettesDe, mediane, resumeChiffre } from '@/lib/gabarits'
import { noteObjective } from '@/lib/note-objective'
import { CATALOGUE } from '@/lib/radar-fiche'
import type { RobotCatalogue } from '@/lib/radar'
import { BoutonMarchand, OffresMarchands } from '@/components/v2/gabarits/BoutonMarchand'
import { CarteProduit } from '@/components/v2/gabarits/CarteProduit'
import { ResumeChiffre } from '@/components/v2/gabarits/ResumeChiffre'

vi.mock('@/niche.config', () => ({ niche: { affiliateTag: 'test-tag-21', defaultStore: 'Amazon' } }))

const r = (o: Partial<RobotCatalogue> = {}): RobotCatalogue => ({
  id: 'x', marque: 'M', modele: 'X', surface_m2: 1000, pente_pct: 50, guidage: 'rtk+vision',
  connectivite: ['wifi', '4g'], bruit_db: 57, autonomie_min: 100, prix_eur: 1000, prix_lu_le: '2026-11-20', ...o,
})

describe('calculs des gabarits', () => {
  it('médiane : impaire, paire, vide', () => {
    expect(mediane([3, 1, 2])).toBe(2)
    expect(mediane([1000, 2000, 3000, 4000])).toBe(2500)
    expect(mediane([])).toBeNull()
  })

  it('résumé chiffré : seuls les prix datés comptent, la date la plus récente est gardée', () => {
    const s = resumeChiffre([r({ id: 'a', prix_eur: 1000 }), r({ id: 'b', prix_eur: 3000, prix_lu_le: '2026-11-28' }), r({ id: 'c', prix_eur: 9999, prix_lu_le: undefined })])
    expect(s.modeles).toBe(3)
    expect(s.prixMedian).toBe(2000)
    expect(s.misAJour).toBe('2026-11-28')
  })

  it('résumé chiffré sur la vraie base : la moyenne reste entre la plus basse et la plus haute note', () => {
    const s = resumeChiffre(CATALOGUE)
    const notes = CATALOGUE.map((x) => noteObjective(x).note).filter((n): n is number => n !== null)
    expect(s.notes).toBe(notes.length)
    expect(s.noteMoyenne).toBeGreaterThanOrEqual(Math.min(...notes) - 0.05)
    expect(s.noteMoyenne).toBeLessThanOrEqual(Math.max(...notes) + 0.05)
  })

  it('facettes : nombres exacts, filtre vide retiré, et data-f cohérent', () => {
    const liste = [r({ id: 'a', pente_pct: 80 }), r({ id: 'b', pente_pct: 30, connectivite: ['bluetooth'] }), r({ id: 'c', guidage: 'fil', prix_eur: 2000 })]
    const f = compterFacettes(liste, FACETTES_ROBOTS)
    expect(f.find((x) => x.id === 'pente45')?.nombre).toBe(2)
    expect(f.find((x) => x.id === '4g')?.nombre).toBe(2)
    expect(f.find((x) => x.id === 'sansfil')?.nombre).toBe(2)
    expect(f.find((x) => x.id === 'moins1000')).toBeUndefined()
    expect(compterFacettes([liste[0], liste[1]], FACETTES_ROBOTS).find((x) => x.id === 'sansfil')).toBeUndefined()
    expect(facettesDe(liste[1], FACETTES_ROBOTS)).toEqual(['sansfil'])
  })
})

describe('composants des gabarits', () => {
  it('bouton marchand : prix affiché seulement avec sa date, lien Amazon par /go/', () => {
    const { container, rerender } = render(<BoutonMarchand offre={{ marchand: 'Amazon', url: 'https://www.amazon.fr/dp/B0CHX1W1XY', prix: 1899 }} />)
    expect(container.textContent).not.toContain('1 899')
    expect(screen.getByRole('link').getAttribute('href')).toBe('/go/B0CHX1W1XY/amazon')
    expect(screen.getByRole('link').getAttribute('rel')).toContain('sponsored')
    rerender(<BoutonMarchand offre={{ marchand: 'Cdiscount', url: 'https://www.cdiscount.com/x', prix: 1899, date: '2026-11-28' }} />)
    expect(container.textContent).toMatch(/1\s899\s€ · relevé le 28\/11\/2026/)
  })

  it('offres : la moins chère datée est la seule en bouton plein', () => {
    render(
      <OffresMarchands
        offres={[
          { marchand: 'Fnac', url: 'https://www.fnac.com/x', prix: 2199, date: '2026-11-28' },
          { marchand: 'Cdiscount', url: 'https://www.cdiscount.com/x', prix: 2149, date: '2026-11-28' },
        ]}
      />,
    )
    const liens = screen.getAllByRole('link')
    expect(liens[0].textContent).toBe('Voir l’offre')
    expect(liens[0].closest('.g-offre')?.textContent).toContain('Cdiscount')
    expect(liens[0].className).not.toContain('btn--ivory')
    expect(liens[1].className).toContain('btn--ivory')
  })

  it('carte produit : sans note ni prix daté, « — » et « prix non publié »', () => {
    const { container } = render(<CarteProduit produit={{ id: 'a', nom: 'Robot A', note: null, prix: 1500 }} filtres={['4g']} />)
    expect(container.textContent).toContain('—/10')
    expect(container.textContent).toContain('prix non publié')
    expect(container.querySelector('[data-f="4g"]')).not.toBeNull()
  })

  it('résumé chiffré : « — » quand rien n’est noté', () => {
    const { container } = render(<ResumeChiffre resume={{ noteMoyenne: null, modeles: 4, notes: 0, prixMedian: null, misAJour: null }} />)
    expect(container.textContent).toContain('note moyenne—')
    expect(container.textContent).toContain('aucun prix public daté')
  })
})
