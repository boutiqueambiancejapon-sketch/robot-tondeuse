'use client'

/**
 * Outil « Calendrier du gazon » (lot 2, G4) : 3 choix (région, exposition, robot), 12 mois.
 * Le rendu serveur donne les 12 mois du calendrier de référence (ouest, plein soleil, avec robot) : lisible sans JS.
 * Dans le navigateur, le mois en cours s'affiche seul ; « Toute l'année » rend les 12 mois (impression).
 */
import { useRef, useState, useSyncExternalStore } from 'react'
import { signaler } from '@/lib/utils/mesure'
import { Mascotte } from '@/components/v2/Mascotte'
import { EXPOSITIONS, REGIONS, construireCalendrier, type Exposition, type Geste, type MoisCalendrier, type Region } from '@/lib/content/calendrier-gazon'
import { saisonDuMois } from './saison'

const ROBOT = [{ id: 'oui', label: 'J’ai un robot' }, { id: 'non', label: 'Pas de robot' }] as const
const COURTS = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc']

const abonner = () => () => {}

function Choix<T extends string>({ titre, options, valeur, onChange }: { titre: string; options: readonly { id: T; label: string }[]; valeur: T; onChange: (v: T) => void }) {
  return (
    <fieldset className="cal-choix">
      <legend>{titre}</legend>
      <div className="chips">
        {options.map((o) => (
          <button key={o.id} type="button" aria-pressed={o.id === valeur} onClick={() => onChange(o.id)} className={o.id === valeur ? 'chip on' : 'chip'}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function Ligne({ geste, n, robot = false }: { geste: Geste; n: number; robot?: boolean }) {
  const etiquette = [geste.indicatif ? 'repère indicatif' : '', geste.sources.join(', ')].filter(Boolean).join(' · ')
  return (
    <li className="task">
      <span className="n" aria-hidden="true">{n}</span>
      <div>
        <p className="geste">
          {robot && <strong>Robot : </strong>}
          {geste.texte}
        </p>
        <p className="dated">[{etiquette}]</p>
      </div>
    </li>
  )
}

function Gestes({ mois }: { mois: MoisCalendrier }) {
  return (
    <ul className="stack">
      {mois.gestes.map((x, i) => <Ligne key={x.texte} geste={x} n={i + 1} />)}
      {mois.robot.map((x, i) => <Ligne key={x.texte} geste={x} n={mois.gestes.length + i + 1} robot />)}
    </ul>
  )
}

export function CalendrierGazon() {
  const [region, setRegion] = useState<Region>('ouest')
  const [exposition, setExposition] = useState<Exposition>('soleil')
  const [robot, setRobot] = useState<'oui' | 'non'>('oui')
  const [choix, setChoix] = useState<number | 'tous' | null>(null)
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
  const vue = choix ?? (moisCourant >= 0 ? moisCourant : 'tous')

  return (
    <>
      <div className="no-print stack">
        <Choix titre="Votre région" options={REGIONS} valeur={region} onChange={avec(setRegion)} />
        <Choix titre="Exposition de la pelouse" options={EXPOSITIONS} valeur={exposition} onChange={avec(setExposition)} />
        <Choix titre="Tonte" options={ROBOT} valeur={robot} onChange={avec(setRobot)} />
        <div className="months" role="group" aria-label="Mois affiché">
          {COURTS.map((c, i) => (
            <button key={c} type="button" aria-pressed={vue === i} aria-label={mois[i].nom} className={vue === i ? 'on' : undefined} onClick={() => avec(setChoix)(i)}>
              {c}
            </button>
          ))}
          <button type="button" aria-pressed={vue === 'tous'} className={vue === 'tous' ? 'on' : undefined} onClick={() => avec(setChoix)('tous')}>
            Toute l’année
          </button>
        </div>
      </div>
      <div aria-live="polite" className="cal-mois stack-lg">
        {mois.map((m, i) => {
          if (vue !== 'tous' && vue !== i) return null
          const courant = i === moisCourant
          return (
            <article key={m.nom} className="fiche-etape stack">
              <div className="season">
                <Mascotte pose={saisonDuMois(i)} size={112} />
                <div>
                  <h3 className="h-md">En {m.nom.toLowerCase()}</h3>
                  <p className="small">{m.theme}{courant ? ' · ce mois-ci' : ''}</p>
                </div>
              </div>
              <Gestes mois={m} />
            </article>
          )
        })}
      </div>
    </>
  )
}
