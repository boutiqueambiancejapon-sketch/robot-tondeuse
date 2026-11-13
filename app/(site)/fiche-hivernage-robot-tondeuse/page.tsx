/**
 * /fiche-hivernage-robot-tondeuse — fiche à imprimer (lot 2, étape G2). Sans e-mail.
 * Contenu sourcé dans lib/content/fiche-hivernage.ts. Styles d'impression : .fiche-print (globals.css).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import { PrintButton } from '@/components/tools/PrintButton'
import { ETAPES_HIVERNAGE, SOURCES_HIVERNAGE } from '@/lib/content/fiche-hivernage'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const PATH = '/fiche-hivernage-robot-tondeuse'
const TITLE = 'Fiche hivernage du robot tondeuse à imprimer'
const DESC = 'Les gestes pour ranger un robot tondeuse l’hiver : hauteur d’herbe, nettoyage, lames, batterie, câbles. D’après les consignes Husqvarna, sources citées.'

export const revalidate = 86400

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { images: DEFAULT_OG_IMAGES, title: TITLE, description: DESC, url: `${SITE_URL}${PATH}`, siteName: niche.siteName, type: 'website' },
}

const mono = { fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const }
const display = { fontFamily: 'var(--next-font-display), Georgia, serif', fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)' }

export default function FicheHivernagePage() {
  return (
    <main id="main-content" className="fiche-print" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
        <p style={{ ...mono, fontWeight: 500, color: 'var(--moss)', marginBottom: 'var(--space-3)' }}>Fiche à imprimer · hiver</p>
        <h1 style={{ ...display, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1, marginBottom: 'var(--space-4)' }}>
          Ranger son robot tondeuse pour <em style={{ color: 'var(--copper)' }}>l’hiver</em>.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          Sept étapes à cocher, de la dernière tonte à la remise en route. Les consignes viennent des guides Husqvarna pour l’Automower. Sur un Worx, un Segway, un Mammotion ou un Gardena, la notice de votre modèle passe avant cette fiche.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
          À éviter : l’abri de jardin non isolé s’il gèle chez vous. Husqvarna demande un rangement au-dessus de 0 °C.
        </p>
        <PrintButton />
      </header>

      <section aria-label="Étapes de l’hivernage" style={{ maxWidth: 820, margin: '0 auto', padding: '0 var(--space-6) var(--space-10)', display: 'grid', gap: 'var(--space-4)' }}>
        {ETAPES_HIVERNAGE.map((etape, i) => (
          <article key={etape.titre} className="fiche-etape" style={{ background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, padding: 'var(--space-6)' }}>
            <p style={{ ...mono, color: 'var(--copper)', marginBottom: 'var(--space-2)' }}>Étape {i + 1} · {etape.quand}</p>
            <h2 style={{ ...display, fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', marginBottom: 'var(--space-4)' }}>{etape.titre}</h2>
            <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--space-3)' }}>
              {etape.gestes.map((g) => (
                <li key={g.texte} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                  <span aria-hidden="true" style={{ flex: '0 0 18px', height: 18, marginTop: 3, border: '1.5px solid var(--moss)', borderRadius: 4 }} />
                  <span>
                    {g.texte}
                    {g.sources.length > 0 && (
                      <span style={{ ...mono, fontSize: 10, letterSpacing: '0.06em', color: 'var(--text-secondary)', marginLeft: 6 }}>[{g.sources.join(', ')}]</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 var(--space-6) var(--space-20)' }}>
        <h2 style={{ ...display, fontSize: '1.4rem', marginBottom: 'var(--space-3)' }}>Sources</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 14, paddingLeft: 18, marginBottom: 'var(--space-6)' }}>
          {SOURCES_HIVERNAGE.map((s) => (
            <li key={s.id}>
              [{s.id}] <a href={s.url} rel="noopener" style={{ color: 'var(--moss)' }}>{s.label}</a>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
          Sources relues le 13 novembre 2026. La fiche rapporte les consignes écrites du fabricant : l’équipe ne les a pas essayées elle-même.
        </p>
        <div className="no-print" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/comment-hiverner-son-robot-tondeuse" style={{ padding: '14px 22px', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 100, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>
            Le guide complet de l’hivernage
          </Link>
          <Link href="/quiz" style={{ padding: '14px 22px', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 100, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>
            Trouver le robot adapté à mon jardin
          </Link>
        </div>
      </section>
    </main>
  )
}
