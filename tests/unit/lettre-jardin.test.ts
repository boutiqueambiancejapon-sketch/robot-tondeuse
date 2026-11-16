import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { BIENVENUE, LIEN_DESINSCRIPTION, SITE, enTexte, lettreDuMois, type Email } from '@/lib/emails/lettre-jardin'
import { MOIS } from '@/lib/content/calendrier-gazon'

const lettres = Array.from({ length: 12 }, (_, i) => lettreDuMois(i))
const tous: Email[] = [...BIENVENUE, ...lettres]

/** Mots et tournures interdits par les règles d'honnêteté du site. */
const INTERDITS = /(testé|notre test|nous avons (essayé|mesuré)|plus que \d+|dernières? heures?|stock limité|offre flash|au lieu de|-\s?\d+\s?%|\d+\s?% de réduction)/i

function pageExiste(chemin: string): boolean {
  if (chemin.startsWith('/guides/')) return fs.existsSync(path.join(process.cwd(), 'public', chemin))
  return fs.existsSync(path.join(process.cwd(), 'app/(site)', chemin, 'page.tsx'))
}

describe('lettre du jardin', () => {
  it('prépare 3 e-mails de bienvenue et 12 lettres du mois', () => {
    expect(BIENVENUE).toHaveLength(3)
    expect(new Set(tous.map((e) => e.id)).size).toBe(15)
  })

  it('objet court, aperçu présent, lien de désinscription dans chaque e-mail', () => {
    for (const e of tous) {
      expect(e.objet.length, e.objet).toBeLessThanOrEqual(60)
      expect(e.apercu.length, e.id).toBeGreaterThan(10)
      expect(enTexte(e)).toContain(LIEN_DESINSCRIPTION)
    }
  })

  it('aucun essai affirmé, aucune urgence, aucun pourcentage de remise', () => {
    for (const e of tous) expect(enTexte(e), e.id).not.toMatch(INTERDITS)
  })

  it('chaque bouton mène à une page ou à un fichier qui existe', () => {
    for (const e of tous) {
      for (const b of e.blocs) {
        if (b.type !== 'bouton') continue
        expect(b.href.startsWith(SITE), b.href).toBe(true)
        expect(pageExiste(b.href.slice(SITE.length)), b.href).toBe(true)
      }
    }
  })

  it('la lettre du mois reprend les 3 gestes et le geste robot du calendrier, avec leur source', () => {
    lettres.forEach((l, i) => {
      const texte = enTexte(l)
      for (const g of [...MOIS[i].gestes, MOIS[i].robot]) {
        expect(texte).toContain(g.texte)
        expect(texte).toContain(g.sources.length ? `${g.texte} (source : ` : `${g.texte} (repère indicatif`)
      }
    })
  })

  it('sans offre confirmée, la lettre ne parle d’aucune promotion ; avec, elle donne la date du contrôle', () => {
    expect(enTexte(lettreDuMois(11))).not.toMatch(/offre|promo/i)
    const avec = enTexte(lettreDuMois(11, { texte: 'Exemple de phrase.', chemin: '/code-promo', verifiedAt: '2026-12-01' }))
    expect(avec).toContain('Contrôlé le 01/12/2026')
  })
})
