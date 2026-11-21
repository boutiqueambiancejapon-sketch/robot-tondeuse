import { describe, it, expect } from 'vitest'
import { titreAffiche } from '@/lib/utils/titre-affiche'

describe('titreAffiche', () => {
  it('prend le champ h1 quand il existe', () => {
    expect(titreAffiche({ title: 'Titre long pour Google', h1: ' Titre court ' })).toBe('Titre court')
  })
  it('garde le title sans h1, avec un h1 vide ou d’un autre type', () => {
    expect(titreAffiche({ title: 'T' })).toBe('T')
    expect(titreAffiche({ title: 'T', h1: '  ' })).toBe('T')
    expect(titreAffiche({ title: 'T', h1: 42 })).toBe('T')
  })
})
