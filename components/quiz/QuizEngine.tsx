'use client'

/**
 * QuizEngine — moteur interactif du quiz robot tondeuse.
 * 'use client' isolé — la page /quiz reste Server Component.
 * Questions lues depuis quiz.yaml, recommandations basées sur les réponses.
 */

import { useState } from 'react'
import Link from 'next/link'

type Step = {
  id: string
  question: string
  options: { label: string; value: string; emoji?: string }[]
}

type Answers = Record<string, string>

type Recommendation = {
  produit: string
  modele: string
  pourquoi: string
  prix: string
  href: string
  comparerHref: string
}

const DEFAULT_STEPS: Step[] = [
  {
    id: 'surface',
    question: 'Quelle surface de pelouse ?',
    options: [
      { label: 'Moins de 400 m²', value: 'small' },
      { label: '400 à 1000 m²', value: 'medium' },
      { label: '1000 à 3000 m²', value: 'large' },
      { label: 'Plus de 3000 m²', value: 'xlarge' },
    ],
  },
  {
    id: 'pente',
    question: 'Votre terrain est en pente ?',
    options: [
      { label: 'Plutôt plat (moins de 15%)', value: 'flat' },
      { label: 'Quelques pentes (15-25%)', value: 'moderate' },
      { label: 'Grosses pentes (25%+)', value: 'steep' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel budget ?',
    options: [
      { label: 'Moins de 1000 €', value: 'eco' },
      { label: '1000 à 2000 €', value: 'mid' },
      { label: 'Plus de 2000 €', value: 'high' },
    ],
  },
  {
    id: 'installation',
    question: 'Prêt à poser un fil périphérique ?',
    options: [
      { label: 'Oui, pas de souci', value: 'wire' },
      { label: 'Non, je veux du sans fil', value: 'wireless' },
      { label: 'Peu importe', value: 'any' },
    ],
  },
]

function recommend(answers: Answers): Recommendation {
  const { surface, pente, budget, installation } = answers

  // Grandes surfaces + pentes fortes
  if ((surface === 'xlarge' || surface === 'large') && pente === 'steep') {
    return {
      produit: 'Mammotion',
      modele: 'Mammotion Luba 2 AWD 3000',
      pourquoi: 'C\'est le seul robot qui grimpe à 75% de pente tout en couvrant 3000 m². Transmission intégrale, navigation RTK sans fil. Idéal pour les grands terrains vallonnés.',
      prix: '~2 499 €',
      href: '/choisir/mammotion',
      comparerHref: '/comparer/mammotion',
    }
  }

  // Sans fil + budget moyen
  if (installation === 'wireless' && budget === 'mid') {
    if (surface === 'small' || surface === 'medium') {
      return {
        produit: 'Ecovacs',
        modele: 'Ecovacs GOAT G1',
        pourquoi: 'Navigation RTK sans fil, installation en 30 minutes, détection d\'obstacles par caméra IA. Parfait pour les jardins jusqu\'à 800 m² sans vouloir poser de fil.',
        prix: '~999 €',
        href: '/choisir/ecovacs',
        comparerHref: '/comparer/ecovacs',
      }
    }
    return {
      produit: 'Mammotion',
      modele: 'Mammotion Yuka 1500',
      pourquoi: 'Sans fil avec navigation RTK, jusqu\'à 1500 m². Le meilleur rapport qualité-prix en sans fil pour les jardins moyens à grands.',
      prix: '~1 099 €',
      href: '/choisir/mammotion',
      comparerHref: '/comparer/mammotion',
    }
  }

  // Sans fil + gros budget
  if (installation === 'wireless' && budget === 'high') {
    return {
      produit: 'Mammotion',
      modele: 'Mammotion Luba 2 AWD 5000',
      pourquoi: 'Le haut de gamme sans fil. 5000 m², pentes à 75%, autonomie 300 min. Si vous avez un grand terrain et le budget, c\'est le meilleur choix.',
      prix: '~2 999 €',
      href: '/choisir/mammotion',
      comparerHref: '/comparer/mammotion',
    }
  }

  // Sans fil + petit budget
  if (installation === 'wireless' && budget === 'eco') {
    return {
      produit: 'Ecovacs',
      modele: 'Ecovacs GOAT G1',
      pourquoi: 'Le GOAT G1 est le robot sans fil le plus accessible à 999 €. Navigation RTK, 800 m², installation rapide.',
      prix: '~999 €',
      href: '/choisir/ecovacs',
      comparerHref: '/comparer/ecovacs',
    }
  }

  // Petit budget + petit jardin
  if (budget === 'eco' && surface === 'small') {
    return {
      produit: 'Worx',
      modele: 'Worx Landroid S300',
      pourquoi: 'Le meilleur prix du marché pour les petits jardins. Connecté WiFi, modulaire. Ajoutez le capteur anticollision si vous avez des obstacles.',
      prix: '~549 €',
      href: '/choisir/worx',
      comparerHref: '/comparer/worx',
    }
  }

  // Petit budget + jardin moyen
  if (budget === 'eco' && (surface === 'medium' || surface === 'large')) {
    return {
      produit: 'Worx',
      modele: 'Worx Landroid M700',
      pourquoi: 'Excellent rapport qualité-prix pour 700 m². Système modulaire, appli WiFi, mises à jour OTA. Le choix malin sous 1000 €.',
      prix: '~899 €',
      href: '/choisir/worx',
      comparerHref: '/comparer/worx',
    }
  }

  // Budget moyen + jardin moyen + veut du fiable
  if (budget === 'mid' && (surface === 'medium' || surface === 'small') && installation === 'wire') {
    return {
      produit: 'Gardena',
      modele: 'Gardena SILENO city 600',
      pourquoi: 'Ultra-silencieux (58 dB), fiable et simple. Le groupe Husqvarna à prix plus doux. Parfait pour les jardins résidentiels classiques.',
      prix: '~899 €',
      href: '/choisir/gardena',
      comparerHref: '/comparer/gardena',
    }
  }

  // Budget moyen/haut + grande surface + fil OK
  if ((budget === 'mid' || budget === 'high') && (surface === 'large' || surface === 'xlarge') && installation === 'wire') {
    return {
      produit: 'Husqvarna',
      modele: 'Husqvarna Automower 415X',
      pourquoi: '30 ans de fiabilité, 4G + GPS intégré, pentes à 40%. La référence pour les grands jardins quand on veut du solide et éprouvé.',
      prix: '~1 899 €',
      href: '/choisir/husqvarna',
      comparerHref: '/comparer/husqvarna',
    }
  }

  // Gros budget + pentes
  if (budget === 'high' && pente === 'steep') {
    return {
      produit: 'Mammotion',
      modele: 'Mammotion Luba 2 AWD 3000',
      pourquoi: 'Pentes à 75%, sans fil, navigation RTK. Le meilleur robot pour les terrains difficiles.',
      prix: '~2 499 €',
      href: '/choisir/mammotion',
      comparerHref: '/comparer/mammotion',
    }
  }

  // Gros budget + grande surface
  if (budget === 'high' && (surface === 'large' || surface === 'xlarge')) {
    return {
      produit: 'Husqvarna',
      modele: 'Husqvarna Automower 435X AWD',
      pourquoi: 'Transmission intégrale, 3500 m², pentes à 70%. Le top de la fiabilité pour les très grands terrains.',
      prix: '~3 499 €',
      href: '/choisir/husqvarna',
      comparerHref: '/comparer/husqvarna',
    }
  }

  // Défaut : recommandation polyvalente
  if (budget === 'mid' || budget === 'high') {
    return {
      produit: 'Mammotion',
      modele: 'Mammotion Yuka 1500',
      pourquoi: 'Sans fil, navigation RTK, 1500 m². Un bon choix polyvalent qui évite la corvée du fil périphérique.',
      prix: '~1 099 €',
      href: '/choisir/mammotion',
      comparerHref: '/comparer/mammotion',
    }
  }

  return {
    produit: 'Worx',
    modele: 'Worx Landroid M700',
    pourquoi: 'Le meilleur rapport qualité-prix du marché. 700 m², WiFi, système modulaire. Difficile de trouver mieux sous 900 €.',
    prix: '~899 €',
    href: '/choisir/worx',
    comparerHref: '/comparer/worx',
  }
}

type QuizEngineProps = {
  defaultProduit?: string
  steps?: Step[]
}

export function QuizEngine({ defaultProduit, steps }: QuizEngineProps = {}) {
  const STEPS = steps && steps.length > 0 ? steps : DEFAULT_STEPS
  const initialStep = defaultProduit ? 1 : 0
  const initialAnswers: Answers = defaultProduit ? { surface: defaultProduit } : {}

  const [step, setStep] = useState(initialStep)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [done, setDone] = useState(false)

  const current = STEPS[step]
  const progress = Math.round(((step) / STEPS.length) * 100)

  function handleSelect(value: string) {
    const next = { ...answers, [current.id]: value }
    setAnswers(next)

    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  function restart() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    const rec = recommend(answers)
    return <Result rec={rec} onRestart={restart} />
  }

  return (
    <div>
      {/* Barre de progression */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            flex: 1,
            height: '3px',
            background: 'var(--bg-surface-2)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent-4)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 300ms ease',
            }}
          />
        </div>
        <span
          style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}
          aria-label={`Question ${step + 1} sur ${STEPS.length}`}
        >
          {step + 1} / {STEPS.length}
        </span>
      </div>

      {/* Question */}
      <h2
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-6)',
          textWrap: 'balance',
          lineHeight: 1.2,
        }}
      >
        {current.question}
      </h2>

      {/* Options */}
      <div
        role="group"
        aria-label={current.question}
        style={{
          display: 'grid',
          gridTemplateColumns:
            current.options.length <= 3
              ? '1fr'
              : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: opt.emoji ? 'var(--space-4)' : 'var(--space-3)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 150ms ease, background 150ms ease',
              width: '100%',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--accent-4)'
              el.style.background = 'rgba(124,58,237,0.06)'
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--border)'
              el.style.background = 'var(--bg-surface)'
            }}
          >
            {opt.emoji && (
              <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>
                {opt.emoji}
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                color: 'var(--text-primary)',
              }}
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {/* Retour */}
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '13px',
            marginTop: 'var(--space-6)',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          ← Retour
        </button>
      )}
    </div>
  )
}

function Result({
  rec,
  onRestart,
}: {
  rec: Recommendation
  onRestart: () => void
}) {
  return (
    <div>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent-3)',
          marginBottom: 'var(--space-5)',
        }}
      >
        Notre recommandation
      </div>

      <h2
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)',
          lineHeight: 1.1,
        }}
      >
        {rec.modele}
      </h2>
      <div
        style={{
          fontFamily: 'var(--next-font-primary), system-ui, sans-serif',
          fontVariantNumeric: 'tabular-nums',
          fontSize: '16px',
          color: 'var(--accent-2)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {rec.prix}
      </div>

      <div
        style={{
          background: 'var(--bg-surface)',
          borderLeft: '3px solid var(--accent-3)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          padding: 'var(--space-5) var(--space-6)',
          marginBottom: 'var(--space-8)',
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {rec.pourquoi}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
        }}
      >
        <Link
          href={rec.comparerHref}
          style={{
            display: 'inline-block',
            background: 'var(--accent-4)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
          }}
        >
          Comparer les modèles →
        </Link>
        <Link
          href={rec.href}
          style={{
            display: 'inline-block',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '14px',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
          }}
        >
          Guide d&apos;achat {rec.produit}
        </Link>
      </div>

      <button
        onClick={onRestart}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '13px',
          padding: 0,
        }}
      >
        ↩ Recommencer le quiz
      </button>
    </div>
  )
}
