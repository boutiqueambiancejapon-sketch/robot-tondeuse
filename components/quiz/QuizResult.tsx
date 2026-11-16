import Link from 'next/link'
import type { Offre } from '@/lib/offres-format'
import { MerchantButtons } from '@/components/v2/MerchantButtons'
import { Mascotte } from '@/components/v2/Mascotte'
import type { Answers, Recommendation, Step } from './quiz-logic'

type Props = {
  rec: Recommendation
  steps: Step[]
  answers: Answers
  merchantLinks: Record<string, Offre[]>
  onRestart: () => void
}

/** Une raison par phrase du texte de recommandation. */
function raisons(pourquoi: string): string[] {
  return pourquoi
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Écran de résultat : le robot conseillé par recommend(), ses raisons et les suites possibles. */
export function QuizResult({ rec, steps, answers, merchantLinks, onRestart }: Props) {
  const rappel = steps.flatMap((s) => {
    const opt = s.options.find((o) => o.value === answers[s.id])
    return opt ? [{ id: s.id, label: opt.label }] : []
  })
  const offres = merchantLinks[rec.modele.toLowerCase()] ?? []
  const merchant = offres.length > 0

  return (
    <div className="quiz-res stack-lg">
      <div className="verdict-box">
        <div className="result-hero">
          <Mascotte pose="fete" size={150} />
        </div>
        <h2 className="h-lg">Pour votre jardin : le {rec.modele}</h2>
        <ul className="chips" aria-label="Vos réponses">
          {rappel.map((r) => (
            <li className="chip" key={r.id}>
              {r.label}
            </li>
          ))}
        </ul>
        <button type="button" className="lnk quiz-back" onClick={onRestart}>
          Modifier mes réponses
        </button>
      </div>

      <div>
        <p className="price num">{rec.prix}</p>
        <p className="dated">Prix indicatif, à vérifier chez le marchand</p>
      </div>

      <ul className="why">
        {raisons(rec.pourquoi).map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <div className="stack">
        {merchant ? (
          <MerchantButtons offres={offres} />
        ) : (
          <Link href={rec.comparerHref} className="btn btn--full">
            Comparer les modèles {rec.produit}
          </Link>
        )}
      </div>

      <div>
        <div className="sec-hd">
          <h3 className="h-lg">Pour aller plus loin</h3>
        </div>
        <div className="stack">
          {merchant ? (
            <Link className="card mini" href={rec.comparerHref}>
              <div>
                <h4>Comparer les modèles {rec.produit}</h4>
                <p>Prix, surface, pente et bruit côte à côte.</p>
              </div>
            </Link>
          ) : null}
          <Link className="card mini" href={rec.href}>
            <div>
              <h4>Guide d’achat {rec.produit}</h4>
              <p>Les gammes de la marque et pour quel jardin.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
