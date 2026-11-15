'use client'

/**
 * Outil « Calendrier du gazon » (lot 2, G4) : 3 choix (région, exposition, robot), 12 mois.
 * Le rendu serveur donne le calendrier de référence (ouest, plein soleil, avec robot) : lisible sans JS.
 */
import { useRef, useState, useSyncExternalStore } from 'react'
import { signaler } from '@/lib/utils/mesure'
import { EXPOSITIONS, REGIONS, construireCalendrier, type Exposition, type Geste, type Region } from '@/lib/content/calendrier-gazon'

const mono = { fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const }
const display = { fontFamily: 'var(--next-font-display), Georgia, serif', fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)' }
const ROBOT = [{ id: 'oui', label: 'J’ai un robot' }, { id: 'non', label: 'Pas de robot' }] as const

const abonner = () => () => {}

function Choix<T extends string>({ titre, options, valeur, onChange }: { titre: string; options: readonly { id: T; label: string }[]; valeur: T; onChange: (v: T) => void }) {
  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
      <legend style={{ ...mono, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', padding: 0 }}>{titre}</legend>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map((o) => {
          const actif = o.id === valeur
          return (
            <button key={o.id} type="button" aria-pressed={actif} onClick={() => onChange(o.id)} style={{ minHeight: 44, padding: '0 16px', borderRadius: 100, fontSize: 15, fontWeight: 500, cursor: 'pointer', border: `1px solid ${actif ? 'var(--moss)' : 'var(--border-strong)'}`, background: actif ? 'var(--moss)' : 'transparent', color: actif ? 'var(--ivory)' : 'var(--text-primary)' }}>
              {o.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Ligne({ geste, robot = false }: { geste: Geste; robot?: boolean }) {
  const etiquette = [geste.indicatif ? 'repère indicatif' : '', geste.sources.join(', ')].filter(Boolean).join(' · ')
  return (
    <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--text-primary)', lineHeight: 1.55 }}>
      <span aria-hidden="true" style={{ flex: '0 0 8px', height: 8, marginTop: 9, borderRadius: 8, background: robot ? 'var(--copper)' : 'var(--moss)' }} />
      <span>
        {robot && <strong style={{ fontWeight: 600 }}>Robot : </strong>}
        {geste.texte}
        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.06em', color: 'var(--text-secondary)', marginLeft: 6, whiteSpace: 'nowrap' }}>
          [{etiquette}]
        </span>
      </span>
    </li>
  )
}

export function CalendrierGazon() {
  const [region, setRegion] = useState<Region>('ouest')
  const [exposition, setExposition] = useState<Exposition>('soleil')
  const [robot, setRobot] = useState<'oui' | 'non'>('oui')
  // Mois en cours : connu du navigateur seulement (-1 côté serveur, pas d'écart à l'hydratation).
  const moisCourant = useSyncExternalStore(abonner, () => new Date().getMonth(), () => -1)
  const signale = useRef(false)

  const avec = <T,>(set: (v: T) => void) => (v: T) => {
    if (!signale.current) {
      signale.current = true
      signaler('calendrier-gazon')
    }
    set(v)
  }

  const mois = construireCalendrier(region, exposition, robot === 'oui')

  return (
    <>
      <div className="no-print" style={{ display: 'grid', gap: 'var(--space-5)', background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <Choix titre="Votre région" options={REGIONS} valeur={region} onChange={avec(setRegion)} />
        <Choix titre="Exposition de la pelouse" options={EXPOSITIONS} valeur={exposition} onChange={avec(setExposition)} />
        <Choix titre="Tonte" options={ROBOT} valeur={robot} onChange={avec(setRobot)} />
      </div>
      <div aria-live="polite" style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
        {mois.map((m, i) => {
          const courant = i === moisCourant
          return (
            <article key={m.nom} className="fiche-etape" style={{ background: 'var(--ivory)', border: `1px solid ${courant ? 'var(--copper)' : 'var(--border)'}`, borderRadius: 16, padding: 'var(--space-6)' }}>
              <p style={{ ...mono, color: 'var(--copper)', marginBottom: 'var(--space-2)' }}>{m.theme}{courant ? ' · ce mois-ci' : ''}</p>
              <h3 style={{ ...display, fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', marginBottom: 'var(--space-4)' }}>{m.nom}</h3>
              <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--space-3)' }}>
                {m.gestes.map((x) => <Ligne key={x.texte} geste={x} />)}
                {m.robot.map((x) => <Ligne key={x.texte} geste={x} robot />)}
              </ul>
            </article>
          )
        })}
      </div>
    </>
  )
}
