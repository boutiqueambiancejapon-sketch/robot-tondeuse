import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { FICHES_NOTEES, noteFiche } from '@/lib/notes-fiches'
import { COMPARATEURS } from '@/lib/comparateur'

describe('notes des fiches robots', () => {
  it('chaque fiche notée existe et pointe vers un modèle du comparateur', () => {
    for (const [slug, f] of Object.entries(FICHES_NOTEES)) {
      expect(fs.existsSync(path.join(process.cwd(), 'content/produits', `${slug}.yaml`))).toBe(true)
      expect(COMPARATEURS[f.produit]?.modeles.some((m) => m.nom === f.modele)).toBe(true)
    }
  })

  it('une note a toujours un prix et une date de relevé, sinon rien', () => {
    for (const [slug, f] of Object.entries(FICHES_NOTEES)) {
      const n = noteFiche(f.nom, slug)
      if (!n) continue
      expect(n.prix).toBeGreaterThan(0)
      expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(n.note).toBeGreaterThan(0)
      expect(n.note).toBeLessThanOrEqual(100)
    }
  })

  it('un robot hors du lot ou inconnu n’a pas de note', () => {
    expect(noteFiche('Dreame A2 3000', 'dreame-a2-3000')).toBeNull()
    expect(noteFiche('Robot inconnu')).toBeNull()
  })

  it('le nom seul suffit à retrouver la fiche', () => {
    const f = FICHES_NOTEES['mammotion-luba-3-awd-3000']
    expect(noteFiche(f.nom)).toEqual(noteFiche(f.nom, 'mammotion-luba-3-awd-3000'))
  })
})
