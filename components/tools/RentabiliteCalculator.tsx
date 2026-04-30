'use client'

/**
 * RentabiliteCalculator — calcule le ROI d'un robot tondeuse vs thermique.
 * Inputs : surface, prix robot, coût mensuel essence, heures/sem, années.
 * Outputs : coût total robot, coût total thermique, économie, break-even.
 */

import { useState, useMemo } from 'react'

const TONTES_PAR_MOIS_SAISON = 4
const MOIS_TONTE_PAR_AN = 7

export function RentabiliteCalculator() {
  const [surface, setSurface] = useState(800)
  const [prixRobot, setPrixRobot] = useState(1200)
  const [coutEssenceMois, setCoutEssenceMois] = useState(15)
  const [heuresParTonte, setHeuresParTonte] = useState(1.5)
  const [coutHoraire, setCoutHoraire] = useState(20)
  const [annees, setAnnees] = useState(7)

  const result = useMemo(() => {
    // Coût total robot : prix achat + entretien (lames 50€/an) + remplacement batterie (150€ tous les 5 ans)
    const lamesAnnees = 50 * annees
    const batteries = annees >= 5 ? Math.floor(annees / 5) * 150 : 0
    const electricite = (surface / 100) * 4 * MOIS_TONTE_PAR_AN * annees * 0.20 // ~4 kWh par 100 m² par mois × tarif EDF
    const coutRobotTotal = prixRobot + lamesAnnees + batteries + electricite

    // Coût total thermique : essence + entretien (vidange ~50€/an, lame ~30€/an) + temps personnel
    const essenceTotal = coutEssenceMois * MOIS_TONTE_PAR_AN * annees
    const entretienThermique = 80 * annees
    const tempsTotal = heuresParTonte * TONTES_PAR_MOIS_SAISON * MOIS_TONTE_PAR_AN * annees
    const coutTempsTotal = tempsTotal * coutHoraire
    const coutThermiqueTotal = essenceTotal + entretienThermique + coutTempsTotal

    const economie = coutThermiqueTotal - coutRobotTotal
    const breakEvenMois = (() => {
      const robotCoutMensuel = coutRobotTotal / (annees * 12)
      const thermiqueMensuel = coutThermiqueTotal / (annees * 12)
      if (thermiqueMensuel <= robotCoutMensuel) return null
      // simplified: Mois pour amortir l'achat initial du robot via les économies vs thermique
      const economieMensuelle = thermiqueMensuel - robotCoutMensuel
      return Math.ceil(prixRobot / economieMensuelle)
    })()

    return {
      coutRobotTotal: Math.round(coutRobotTotal),
      coutThermiqueTotal: Math.round(coutThermiqueTotal),
      economie: Math.round(economie),
      breakEvenMois,
      tempsTotal: Math.round(tempsTotal),
      essenceTotal: Math.round(essenceTotal),
    }
  }, [surface, prixRobot, coutEssenceMois, heuresParTonte, coutHoraire, annees])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 32 }} className="rentabilite-grid">
      {/* Inputs */}
      <div style={{ background: 'var(--ivory)', border: '1px solid var(--border)', borderRadius: 16, padding: 'var(--space-6)' }}>
        <h2 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 22, fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
          Vos données
        </h2>
        <Field label="Surface du jardin (m²)" value={surface} onChange={setSurface} min={50} max={5000} step={50} suffix="m²" />
        <Field label="Prix du robot envisagé (€)" value={prixRobot} onChange={setPrixRobot} min={300} max={5000} step={50} suffix="€" />
        <Field label="Coût essence mensuel actuel (€)" value={coutEssenceMois} onChange={setCoutEssenceMois} min={0} max={50} step={1} suffix="€/mois" hint="Si vous tondez vous-même" />
        <Field label="Heures par tonte (h)" value={heuresParTonte} onChange={setHeuresParTonte} min={0.25} max={5} step={0.25} suffix="h" />
        <Field label="Coût horaire de votre temps (€/h)" value={coutHoraire} onChange={setCoutHoraire} min={0} max={100} step={5} suffix="€/h" hint="Combien vaut votre heure ?" />
        <Field label="Période d'analyse (années)" value={annees} onChange={setAnnees} min={1} max={15} step={1} suffix="ans" />
      </div>

      {/* Outputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Result
          eyebrow={`Sur ${annees} ans`}
          label="Coût total tondeuse classique"
          value={`${result.coutThermiqueTotal.toLocaleString('fr-FR')} €`}
          accent="moss"
        />
        <Result
          eyebrow={`Sur ${annees} ans`}
          label="Coût total robot tondeuse"
          value={`${result.coutRobotTotal.toLocaleString('fr-FR')} €`}
          accent="moss"
        />
        <Result
          eyebrow={result.economie > 0 ? '✓ Robot plus rentable' : '✗ Tondeuse classique plus rentable'}
          label={result.economie > 0 ? 'Économie totale' : 'Surcoût total'}
          value={`${Math.abs(result.economie).toLocaleString('fr-FR')} €`}
          accent={result.economie > 0 ? 'copper' : 'moss'}
          big
        />
        {result.breakEvenMois !== null && (
          <Result
            eyebrow="Amortissement"
            label="Le robot s'amortit en"
            value={`${result.breakEvenMois} mois`}
            accent="moss"
          />
        )}
        <div style={{ background: 'var(--cream)', borderRadius: 12, padding: 'var(--space-5)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Vous économisez {result.tempsTotal.toLocaleString('fr-FR')}h</strong> de tonte sur {annees} ans avec un robot — soit {Math.round(result.tempsTotal / annees)}h par an récupérées pour autre chose.
        </div>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, min, max, step, suffix, hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix: string
  hint?: string
}) {
  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 14, fontWeight: 600, color: 'var(--copper)' }}>
          {value.toLocaleString('fr-FR')} {suffix}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--copper)' }}
      />
      {hint && (
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0' }}>{hint}</p>
      )}
    </div>
  )
}

function Result({ eyebrow, label, value, accent, big = false }: {
  eyebrow: string
  label: string
  value: string
  accent: 'copper' | 'moss'
  big?: boolean
}) {
  return (
    <div
      style={{
        background: big ? 'var(--forest-deep)' : 'var(--ivory)',
        color: big ? 'var(--ivory)' : 'var(--text-primary)',
        border: big ? 'none' : '1px solid var(--border)',
        borderRadius: 16,
        padding: 'var(--space-5)',
      }}
    >
      <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: big ? 'var(--sage-light)' : `var(--${accent})` }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: big ? 14 : 13, color: big ? 'var(--sage-light)' : 'var(--text-secondary)', marginTop: 4 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--next-font-display), Georgia, serif',
          fontSize: big ? 'clamp(2rem, 4vw, 3rem)' : 24,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: big ? 'var(--ivory)' : `var(--${accent})`,
          marginTop: 6,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  )
}
