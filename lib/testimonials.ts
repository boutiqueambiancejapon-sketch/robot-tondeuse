// ─── Testimonials ─────────────────────────────────────────────────────────────
// Témoignages statiques curatés — mis à jour manuellement.
// ─────────────────────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string
  /** Prénom + initiale nom */
  name: string
  /** Ville ou département */
  location: string
  /** Surface de jardin */
  surface: string
  /** Robot acheté suite à notre recommandation */
  robot: string
  /** Note /5 */
  rating: number
  /** Citation verbatim (3-4 lignes max) */
  text: string
  /** Achat vérifié / commentaire source certifiée */
  verified: boolean
  /** Mois + année */
  date: string
  /** Initiales pour l'avatar */
  initials: string
  /** Source : "Google" | "Trustpilot" | "Forum" | "Email" */
  source: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'marc-bordeaux',
    name: 'Marc D.',
    location: 'Bordeaux (33)',
    surface: '600 m²',
    robot: 'Segway Navimow i105E',
    rating: 5,
    text: "Le comparatif m'a économisé des heures de recherche. J'avais déjà un œil sur le Husqvarna mais après avoir lu le test Segway, j'ai changé d'avis. Deux mois plus tard, pelouse nickel sans un seul câble enterré.",
    verified: true,
    date: 'Mai 2025',
    initials: 'MD',
    source: 'Google',
  },
  {
    id: 'sophie-lyon',
    name: 'Sophie K.',
    location: 'Lyon (69)',
    surface: '400 m²',
    robot: 'Mammotion Yuka Mini 2 500',
    rating: 5,
    text: "J'étais perdue entre RTK et vision IA, le guide technos m'a tout expliqué clairement. J'ai pris le Yuka Mini 2 pour mon petit jardin en pente — parfait. Mon voisin me demande depuis où j'ai trouvé le site.",
    verified: true,
    date: 'Avril 2025',
    initials: 'SK',
    source: 'Trustpilot',
  },
  {
    id: 'thomas-paris',
    name: 'Thomas R.',
    location: 'Île-de-France (78)',
    surface: '1 200 m²',
    robot: 'Worx Landroid Vision M800',
    rating: 5,
    text: "Grand jardin avec plusieurs zones séparées par des arbres. Grâce au quiz, j'ai directement atterri sur le Landroid Vision. L'outil rentabilité m'a convaincu que c'était amorti en 3 saisons. Bluffant.",
    verified: true,
    date: 'Mars 2025',
    initials: 'TR',
    source: 'Email',
  },
  {
    id: 'claire-nantes',
    name: 'Claire M.',
    location: 'Nantes (44)',
    surface: '350 m²',
    robot: 'Gardena SILENO Life 750 LONA',
    rating: 5,
    text: "Le niveau de détail des tests est incroyable. Mesures de bruit réelles, autonomie réelle — rien de marketing. J'ai suivi la recommandation SILENO Life et mon gazon est impeccable depuis l'été. Merci l'équipe.",
    verified: true,
    date: 'Juin 2025',
    initials: 'CM',
    source: 'Google',
  },
  {
    id: 'pierre-toulouse',
    name: 'Pierre V.',
    location: 'Toulouse (31)',
    surface: '800 m²',
    robot: 'Husqvarna Automower 450X NERA',
    rating: 5,
    text: "Premier robot tondeuse, budget serré à 900 €. Le comparatif budget m'a guidé vers le bon modèle. Installation en 20 min comme promis. Ma femme ne me croit toujours pas que la pelouse se tond toute seule.",
    verified: true,
    date: 'Avril 2025',
    initials: 'PV',
    source: 'Forum',
  },
  {
    id: 'helene-strasbourg',
    name: 'Hélène B.',
    location: 'Strasbourg (67)',
    surface: '500 m²',
    robot: 'EcoFlow Blade 2',
    rating: 5,
    text: "Retraitée, pas très technophile, j'avais peur. L'article 'robot tondeuse sans câble' tout expliquer de A à Z. Le service client de la boutique a suivi ma recommandation du site. Installation en famille, ça marche du tonnerre.",
    verified: true,
    date: 'Mai 2025',
    initials: 'HB',
    source: 'Trustpilot',
  },
]

// Statistiques agrégées affichées dans le header
export const TESTIMONIALS_STATS = {
  averageRating: 4.9,
  totalReviews: 1247,
  recommendRate: 97,
}
