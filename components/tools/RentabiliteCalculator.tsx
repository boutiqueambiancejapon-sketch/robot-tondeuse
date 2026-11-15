'use client'

/**
 * RentabiliteCalculator — robot tondeuse ou tondeuse classique : six réglages, un résultat.
 * Le calcul est dans rentabilite.ts, l'affichage du résultat dans RentabiliteResult.
 */

import { useRef, useState } from 'react'
import { signaler } from '@/lib/utils/mesure'
import { calculerRentabilite } from './rentabilite'
import { RentabiliteResult } from './RentabiliteResult'

export function RentabiliteCalculator() {
  const [surface, setSurface] = useState(800)
  const [prixRobot, setPrixRobot] = useState(1200)
  const [coutEssenceMois, setCoutEssenceMois] = useState(15)
  const [heuresParTonte, setHeuresParTonte] = useState(1.5)
  const [coutHoraire, setCoutHoraire] = useState(20)
  const [annees, setAnnees] = useState(7)

  // Lot 0 : un seul signal par visite, au premier réglage du visiteur
  const calculSignale = useRef(false)
  const avec = (set: (v: number) => void) => (v: number) => {
    if (!calculSignale.current) {
      calculSignale.current = true
      signaler('calcul-rentabilite')
    }
    set(v)
  }

  const result = calculerRentabilite({ surface, prixRobot, coutEssenceMois, heuresParTonte, coutHoraire, annees })

  return (
    <div className="stack-lg">
      <div className="card card-p stack-lg">
        <h2 className="h-md">Vos données</h2>
        <Field id="r-surface" label="Surface du jardin" value={surface} onChange={avec(setSurface)} min={50} max={5000} step={50} suffix="m²" />
        <Field id="r-prix" label="Prix du robot envisagé" value={prixRobot} onChange={avec(setPrixRobot)} min={300} max={5000} step={50} suffix="€" />
        <Field id="r-essence" label="Essence aujourd’hui" value={coutEssenceMois} onChange={avec(setCoutEssenceMois)} min={0} max={50} step={1} suffix="€ par mois" hint="Si vous tondez vous-même" />
        <Field id="r-heures" label="Durée d’une tonte" value={heuresParTonte} onChange={avec(setHeuresParTonte)} min={0.25} max={5} step={0.25} suffix="h" />
        <Field id="r-horaire" label="Valeur de votre temps" value={coutHoraire} onChange={avec(setCoutHoraire)} min={0} max={100} step={5} suffix="€ de l’heure" hint="Combien vaut votre heure ?" />
        <Field id="r-annees" label="Période d’analyse" value={annees} onChange={avec(setAnnees)} min={1} max={15} step={1} suffix={annees > 1 ? 'ans' : 'an'} />
      </div>

      <RentabiliteResult result={result} annees={annees} surface={surface} />
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix: string
  hint?: string
}

function Field({ id, label, value, onChange, min, max, step, suffix, hint }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} ·{' '}
        <b className="num">
          {value.toLocaleString('fr-FR')} {suffix}
        </b>
      </label>
      <input
        id={id}
        className="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      {hint ? <p className="hint">{hint}</p> : null}
    </div>
  )
}
