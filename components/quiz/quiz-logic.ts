/**
 * Questions par défaut et règles de recommandation du quiz.
 * Déplacé tel quel depuis QuizEngine.tsx lors de la migration V2 : la logique n'a pas changé.
 */

export type Step = {
  id: string
  question: string
  options: { label: string; value: string; emoji?: string }[]
}

export type Answers = Record<string, string>

export type Recommendation = {
  produit: string
  modele: string
  pourquoi: string
  prix: string
  href: string
  comparerHref: string
}

export const DEFAULT_STEPS: Step[] = [
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

export function recommend(answers: Answers): Recommendation {
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
        produit: 'Mammotion',
        modele: 'Mammotion YUKA Mini 2 500',
        pourquoi: 'Sans fil avec caméra IA, installation en 30 minutes. Le plus accessible des robots sans fil à 699 €. Parfait pour les jardins jusqu\'à 500 m².',
        prix: '~699 €',
        href: '/choisir/mammotion',
        comparerHref: '/comparer/mammotion',
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
      produit: 'Mammotion',
      modele: 'Mammotion YUKA Mini 2 500',
      pourquoi: 'Le robot sans fil le plus accessible à 699 €. Caméra IA triple, pas de fil à poser, 500 m².',
      prix: '~699 €',
      href: '/choisir/mammotion',
      comparerHref: '/comparer/mammotion',
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
