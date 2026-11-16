'use client'

import type { Offre } from '@/lib/offres-format'

/**
 * QuizEngine — une question par écran, le robot avance sur la barre à chaque réponse.
 * 'use client' isolé : les pages /quiz et /choisir/[produit] restent des Server Components.
 * Les questions viennent de quiz.yaml, la recommandation de quiz-logic.ts (inchangée).
 */

import { useEffect, useRef, useState } from 'react'
import { signaler } from '@/lib/utils/mesure'
import { Mascotte } from '@/components/v2/Mascotte'
import { DEFAULT_STEPS, recommend, type Answers, type Step } from './quiz-logic'
import { QuizResult } from './QuizResult'

type QuizEngineProps = {
  steps?: Step[]
  /** Liens marchands connus (voir merchant-links.ts). */
  merchantLinks?: Record<string, Offre[]>
  /** Quiz placé dans une autre page : la barre ne reste pas collée en haut. */
  embedded?: boolean
}

const calme = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function QuizEngine({ steps, merchantLinks = {}, embedded = false }: QuizEngineProps = {}) {
  const STEPS = steps && steps.length > 0 ? steps : DEFAULT_STEPS
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [phase, setPhase] = useState<'questions' | 'arrivee' | 'resultat'>('questions')
  const root = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const current = STEPS[step]
  const progress = phase === 'questions' ? 16 + (step / STEPS.length) * 84 : 100

  function remonter() {
    root.current?.scrollIntoView({ block: 'start', behavior: calme() ? 'auto' : 'smooth' })
  }

  function handleSelect(value: string) {
    if (timer.current) return
    const next = { ...answers, [current.id]: value }
    setAnswers(next)
    const last = step >= STEPS.length - 1
    if (last) {
      setPhase('arrivee')
      signaler('quiz-termine')
    }
    // Le temps de voir la réponse choisie, puis le robot repart.
    timer.current = setTimeout(() => {
      timer.current = null
      if (last) setPhase('resultat')
      else setStep(step + 1)
      remonter()
    }, calme() ? 0 : last ? 650 : 260)
  }

  function restart() {
    setStep(0)
    setAnswers({})
    setPhase('questions')
    remonter()
  }

  if (phase === 'resultat') {
    return (
      <div ref={root} className="quiz-root">
        <QuizResult rec={recommend(answers)} steps={STEPS} answers={answers} merchantLinks={merchantLinks} onRestart={restart} />
      </div>
    )
  }

  return (
    <div ref={root} className="quiz-root">
      <div className={embedded ? 'quiz-top quiz-top--flat' : 'quiz-top'}>
        <div className="track" aria-hidden="true" style={{ '--p': `${progress}%` } as React.CSSProperties}>
          <i />
          <Mascotte pose="side" size={56} />
        </div>
        <p className="dated quiz-nav">
          <span aria-live="polite">
            Question {step + 1} sur {STEPS.length}
          </span>
          {step > 0 && phase === 'questions' ? (
            <button type="button" className="lnk quiz-back" onClick={() => setStep(step - 1)}>
              Question précédente
            </button>
          ) : null}
        </p>
      </div>

      <section className="q on" key={current.id}>
        <h2>{current.question}</h2>
        <div className="opts" role="group" aria-label={current.question}>
          {current.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={answers[current.id] === opt.value ? 'opt sel' : 'opt'}
              aria-pressed={answers[current.id] === opt.value}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>
      <p className="dated">Sans inscription. Vos réponses restent dans votre navigateur.</p>
    </div>
  )
}
