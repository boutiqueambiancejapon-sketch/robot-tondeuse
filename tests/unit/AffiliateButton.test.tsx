import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AffiliateButton } from '@/components/ui/AffiliateButton'

vi.mock('@/niche.config', () => ({
  niche: {
    affiliateTag: 'test-tag-21',
    defaultStore: 'Amazon',
  },
}))

describe('AffiliateButton', () => {
  it('affiche le label', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="Voir le meilleur prix"
      />
    )
    expect(screen.getByText('Voir le meilleur prix')).toBeInTheDocument()
  })

  it('passe par la redirection /go/ (comptée, étiquette côté serveur)', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/go/B0CHX1W1XY/amazon')
  })

  it('a les attributs rel corrects', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('rel')).toContain('nofollow')
    expect(link.getAttribute('rel')).toContain('sponsored')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('ouvre dans un nouvel onglet', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank')
  })

  it('rend une icône ExternalLink', () => {
    const { container } = render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
