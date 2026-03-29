/**
 * niche.config.ts — Configuration centrale du site.
 * C'est le SEUL fichier à remplir pour chaque nouveau site issu du template.
 * Le prompt d'init pose les questions et remplit ces valeurs.
 */

export type NicheConfig = {
  // Identité
  siteName: string
  domain: string
  tagline: string

  // Vocabulaire de la niche
  entity: string          // "produit", "destination", "carte"
  entities: string        // pluriel
  entityVerb: string      // "acheter", "explorer", "souscrire"
  dealWord: string        // "deals", "bons plans", "offres"

  // Hero
  heroPrefix: string      // "Choisir votre"
  heroSuffix: string      // "en 10 minutes"
  rotatingWords: string[] // ["iPhone", "Mac"] → ["vol", "hôtel"]
  subtitle: string
  ctaPrimary: { text: string; url: string }
  ctaSecondary: { text: string; url: string }

  // Catégories (1 couleur accent par catégorie)
  categories: {
    slug: string
    label: string
    accent: string // hex color
    description?: string
  }[]

  // Outils
  quiz: {
    enabled: boolean
    question: string        // "Quel iPhone pour vous ?"
    criteria: string[]      // ["budget", "usage", "taille"]
  }
  comparator: {
    enabled: boolean
    criteria: string[]      // ["prix", "performance", "photo"]
  }
  simulator: {
    enabled: boolean
    title: string           // "Calculer votre budget Apple"
    description: string
  }

  // DA
  palette: {
    accent1: string
    accent2: string
    accent3: string
    accent4: string
    accent5: string
    bgPrimary: string
    bgSurface: string
    bgSurface2: string
    textPrimary: string
    textSecondary: string
    textMuted: string
  }
  fonts: {
    display: string   // Google Fonts family name
    body: string      // Google Fonts family name
  }

  // Auteur
  author: {
    name: string
    slug: string
    title: string
    bio: string
    tone: string[]          // ["direct", "honnête", "expert"]
    noGo: string[]          // ["révolutionnaire", "incroyable"]
    formulations: string[]  // ["Honnêtement,", "Le vrai tip :"]
  }

  // Affiliation
  affiliateTag: string     // "monsite-21"
  defaultStore: string     // "Amazon"

  // Langue & i18n
  defaultLocale: string    // "fr"
  locales: string[]        // ["fr"] — ajouter "en" quand la traduction est prête

  // Technique
  vercelRegion: string     // "fra1"
  repo: string             // "org/repo"
  branch: string           // branche principale — PAS toujours "main" ! Le CMS l'utilise pour lire/écrire le contenu.
}

// ─── Valeurs par défaut (placeholder) ───────────────────────────────────
// Le prompt d'init remplace ces valeurs. Le site build même avec des valeurs vides.

export const niche: NicheConfig = {
  siteName: 'Mon Robot Tondeuse',
  domain: 'mon-robot-tondeuse.be',
  tagline: 'Votre pelouse mérite un robot. On vous aide à choisir.',

  entity: 'robot tondeuse',
  entities: 'robots tondeuses',
  entityVerb: 'acheter',
  dealWord: 'bons plans',

  heroPrefix: 'Choisir votre',
  heroSuffix: 'en 10 minutes',
  rotatingWords: ['Mammotion', 'Husqvarna', 'Gardena', 'Worx', 'Ecovacs Goat'],
  subtitle: 'Comparatifs honnêtes, quiz rapide et simulateur de surface. Le bon robot tondeuse pour votre jardin, sans prise de tête.',
  ctaPrimary: { text: 'Comparer →', url: '/comparer' },
  ctaSecondary: { text: 'Quel robot pour moi ?', url: '/quiz' },

  categories: [
    { slug: 'mammotion', label: 'Mammotion', accent: '#16A34A', description: 'Luba et Yuka : robots tondeuses sans fil avec navigation RTK' },
    { slug: 'husqvarna', label: 'Husqvarna', accent: '#FF6A00', description: 'Automower : la référence suédoise depuis 1995' },
    { slug: 'gardena', label: 'Gardena', accent: '#0891B2', description: 'SILENO : robots fiables et silencieux pour petits et moyens jardins' },
    { slug: 'worx', label: 'Worx', accent: '#D97706', description: 'Landroid : robots modulaires au meilleur rapport qualité-prix' },
    { slug: 'ecovacs', label: 'Ecovacs Goat', accent: '#7C3AED', description: 'GOAT : robots sans fil périphérique avec navigation RTK' },
  ],

  quiz: {
    enabled: true,
    question: 'Quel robot tondeuse pour votre jardin ?',
    criteria: ['surface', 'pente', 'budget', 'connectivité'],
  },
  comparator: {
    enabled: true,
    criteria: ['prix', 'surface max', 'pente max', 'bruit', 'navigation', 'connectivité'],
  },
  simulator: {
    enabled: true,
    title: 'Estimez votre budget robot tondeuse',
    description: 'Quelques infos sur votre jardin et on vous donne une fourchette de prix réaliste.',
  },

  palette: {
    accent1: '#16A34A',
    accent2: '#D97706',
    accent3: '#15803D',
    accent4: '#7C3AED',
    accent5: '#0891B2',
    bgPrimary: '#080E08',
    bgSurface: '#0F1A0F',
    bgSurface2: '#182618',
    textPrimary: '#F0F5F0',
    textSecondary: '#8FA88F',
    textMuted: '#4D664D',
  },
  fonts: { display: 'Plus Jakarta Sans', body: 'DM Sans' },

  author: {
    name: 'Thomas',
    slug: 'thomas',
    title: 'Expert robots tondeuses',
    bio: 'Je teste des robots tondeuses depuis 2018. Plus de 30 modèles passés au crible pour vous éviter les mauvais achats.',
    tone: ['direct', 'pragmatique', 'technique'],
    noGo: ['révolutionnaire', 'incroyable', 'game-changer'],
    formulations: ['Concrètement,', 'Le vrai critère :', 'Sur le terrain,'],
  },

  affiliateTag: 'ambiancejap0a-21',
  defaultStore: 'Amazon',

  defaultLocale: 'fr',
  locales: ['fr'],

  vercelRegion: 'fra1',
  repo: 'boutiqueambiancejapon-sketch/robot-tondeuse',
  branch: 'claude/lawn-mower-robot-site-4OSfv',
}

// ─── Helpers ────────────────────────────────────────────────────────────

/** Accent CSS variable for a given category index. */
const ACCENT_VARS = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)', 'var(--accent-5)']

export function categoryAccent(index: number): string {
  return ACCENT_VARS[index % ACCENT_VARS.length]
}

/** Map category slug → label */
export function categoryLabels(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const cat of niche.categories) map[cat.slug] = cat.label
  return map
}

/** Map category slug → CSS accent variable */
export function categoryAccents(): Record<string, string> {
  const map: Record<string, string> = {}
  niche.categories.forEach((cat, i) => {
    map[cat.slug] = categoryAccent(i)
  })
  return map
}
