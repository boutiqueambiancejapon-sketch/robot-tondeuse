/**
 * /calendrier-du-gazon — outil « Calendrier du gazon » (lot 2, étape G4).
 * Contenu sourcé dans lib/content/calendrier-gazon.ts. Le calendrier de référence est rendu côté serveur.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { CalendrierGazon } from '@/components/tools/CalendrierGazon'
import { InscriptionLettre } from '@/components/tools/InscriptionLettre'
import { SOURCES_CALENDRIER } from '@/lib/content/calendrier-gazon'
import { isNewsletterConfigured } from '@/lib/newsletter/brevo'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PATH = '/calendrier-du-gazon'
const TITLE = 'Calendrier du gazon : les gestes mois par mois'
const DESC = 'Tonte, hauteur de coupe, engrais, scarification, semis, arrosage, robot : les gestes des 12 mois selon votre région et l’exposition de la pelouse. Sources citées.'

export const revalidate = 86400

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESC, url: `${SITE_URL}${PATH}`, siteName: niche.siteName, type: 'website' },
}

const mono = { fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const }
const display = { fontFamily: 'var(--next-font-display), Georgia, serif', fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)' }
const bloc = { maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-6) var(--space-10)' }
const texte = { fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 720, marginBottom: 'var(--space-4)' }
const bouton = { padding: '14px 22px', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 100, textDecoration: 'none', fontSize: 15, fontWeight: 500 }

export default function CalendrierGazonPage() {
  return (
    <main id="main-content" className="fiche-print" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ ...bloc, padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
        <p style={{ ...mono, fontWeight: 500, color: 'var(--moss)', marginBottom: 'var(--space-3)' }}>Outil · pelouse · 12 mois</p>
        <h1 style={{ ...display, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1, marginBottom: 'var(--space-4)' }}>
          Le calendrier du <em style={{ color: 'var(--copper)' }}>gazon</em>, mois par mois.
        </h1>
        <p style={{ ...texte, fontSize: 16 }}>
          Trois gestes par mois pour la pelouse, plus celui du robot. Choisissez votre région et l’exposition : le calendrier s’ajuste. Les mois sont des repères. Le vrai signal est la température du sol : la pousse démarre vers 8 °C, un semis lève à partir de 10 °C.
        </p>
        <p style={{ ...texte, fontSize: 14, marginBottom: 0 }}>
          À éviter : le sulfate de fer contre la mousse. La fiche FREDON le déconseille et propose d’aérer le sol, puis de chauler légèrement à l’automne [S5].
        </p>
      </header>

      <section aria-labelledby="calendrier-titre" style={bloc}>
        <h2 id="calendrier-titre" style={{ ...display, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', marginBottom: 'var(--space-5)' }}>Mon calendrier</h2>
        <CalendrierGazon />
      </section>

      <section aria-labelledby="lecture-titre" style={bloc}>
        <h2 id="lecture-titre" style={{ ...display, fontSize: '1.4rem', marginBottom: 'var(--space-3)' }}>Comment lire ce calendrier</h2>
        <p style={texte}>
          Chaque geste porte le numéro de sa source entre crochets. La mention « repère indicatif » signale un conseil de bon sens que nous n’avons trouvé dans aucune des sources lues, par exemple les décalages de 2 à 3 semaines entre régions. Prenez-le comme un ordre de grandeur.
        </p>
        <p style={texte}>
          Les sources ne donnent pas toutes la même hauteur de tonte : 1 à 3 cm pour un gazon d’ornement selon SEMAE [S1], 5 cm au moins selon FREDON [S5], 10 cm en été selon Jardiner autrement [S4]. Le calendrier retient 5 à 6 cm en saison et 7 à 8 cm l’été ou en terrain sec.
        </p>
        <p style={texte}>
          Les consignes pour le robot viennent des guides Husqvarna, écrits pour l’Automower. Sur une autre marque, la notice de votre modèle passe avant ce calendrier. La surface du jardin ne change pas ces gestes ; elle compte pour <Link href="/superficie" style={{ color: 'var(--moss)' }}>choisir le robot</Link>.
        </p>
      </section>

      {isNewsletterConfigured() && (
        <section className="no-print" aria-labelledby="lettre-titre" style={bloc}>
          <div style={{ background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, padding: 'var(--space-6)' }}>
            <p style={{ ...mono, color: 'var(--moss)', marginBottom: 'var(--space-2)' }}>La lettre du jardin</p>
            <h2 id="lettre-titre" style={{ ...display, fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', marginBottom: 'var(--space-3)' }}>Les gestes du mois, par e-mail</h2>
            <p style={{ ...texte, marginBottom: 'var(--space-5)' }}>
              Un e-mail par mois au plus, au début du mois : les gestes de ce calendrier, au bon moment. Chaque conseil cite sa source.
            </p>
            <InscriptionLettre source="calendrier-gazon" />
          </div>
        </section>
      )}

      <section aria-labelledby="sources-titre" style={{ ...bloc, paddingBottom: 'var(--space-20)' }}>
        <h2 id="sources-titre" style={{ ...display, fontSize: '1.4rem', marginBottom: 'var(--space-3)' }}>Sources</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 14, paddingLeft: 18, marginBottom: 'var(--space-6)', overflowWrap: 'anywhere' }}>
          {SOURCES_CALENDRIER.map((s) => (
            <li key={s.id}>
              [{s.id}] <a href={s.url} rel="noopener" style={{ color: 'var(--moss)' }}>{s.label}</a>
            </li>
          ))}
        </ul>
        <p style={{ ...texte, fontSize: 14, marginBottom: 'var(--space-6)' }}>
          Sources lues le 12 novembre 2026. Le calendrier rapporte ce qu’elles écrivent : l’équipe n’a pas essayé ces gestes elle-même. Pour l’arrosage, l’arrêté de votre département fait foi (vigieau.gouv.fr).
        </p>
        <div className="no-print" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/fiche-hivernage-robot-tondeuse" style={bouton}>La fiche hivernage du robot</Link>
          <Link href="/quiz" style={bouton}>Trouver le robot adapté à mon jardin</Link>
        </div>
      </section>
    </main>
  )
}
