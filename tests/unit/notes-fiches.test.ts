import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { etiquetteCarte, FICHES_NOTEES, mieuxNotes, noteFiche } from '@/lib/notes-fiches'
import { SEUIL_PROPOSER_MIEUX } from '@/lib/bareme'
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

  it('sous le seuil : au plus 2 robots mieux notés, au-dessus du seuil, avec prix daté', () => {
    for (const [slug, f] of Object.entries(FICHES_NOTEES)) {
      const n = noteFiche(f.nom, slug)
      const m = mieuxNotes(f.nom, slug)
      if (!n?.proposerMieux) {
        expect(m).toEqual([])
        continue
      }
      expect(m.length).toBeLessThanOrEqual(2)
      for (const a of m) {
        expect(a.slug).not.toBe(slug)
        expect(a.note).toBeGreaterThanOrEqual(SEUIL_PROPOSER_MIEUX)
        expect(a.note).toBeGreaterThan(n.note)
        expect(a.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(a.url).toMatch(/^\/go\/[A-Za-z0-9_-]+$/)
      }
    }
  })

  it('le Bosch Indego S+ 500 propose 2 robots de surface proche', () => {
    const m = mieuxNotes('Bosch Indego S+ 500', 'bosch-indego-s-plus-500')
    expect(m).toHaveLength(2)
    expect(m.map((a) => a.surface).every((s) => s <= 1000)).toBe(true)
  })

  it('la carte du haut n’écrit jamais « Notre choix » au-dessus d’un robot noté sous le seuil', () => {
    for (const [slug, f] of Object.entries(FICHES_NOTEES)) {
      const n = noteFiche(f.nom, slug)
      const attendu = n && n.note < SEUIL_PROPOSER_MIEUX ? 'Premier robot de l’article' : 'Notre choix'
      expect(etiquetteCarte(f.nom)).toBe(attendu)
    }
    const bosch = noteFiche('Bosch Indego S+ 500')
    if (bosch && bosch.note < SEUIL_PROPOSER_MIEUX) expect(etiquetteCarte('Bosch Indego S+ 500')).not.toBe('Notre choix')
    expect(etiquetteCarte('Robot inconnu')).toBe('Notre choix')
  })
})
