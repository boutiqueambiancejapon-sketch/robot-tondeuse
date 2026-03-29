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
  siteName: '10minTondeuse',
  domain: '10minutestondeuse.com',
  tagline: 'Trouvez le meilleur robot tondeuse en 10 minutes',

  entity: 'robot tondeuse',
  entities: 'robots tondeuses',
  entityVerb: 'acheter',
  dealWord: 'bons plans',

  heroPrefix: 'Choisir votre',
  heroSuffix: 'en 10 minutes',
  rotatingWords: ['Husqvarna', 'Gardena', 'Worx', 'Robomow', 'Ecovacs Goat'],
  subtitle: 'Comparateur indépendant, quiz personnalisé et simulateur de surface — tout pour choisir le bon robot tondeuse.',
  ctaPrimary: { text: 'Comparer →', url: '/comparer' },
  ctaSecondary: { text: 'Quiz personnalisé', url: '/quiz' },

  categories: [
    { slug: 'husqvarna', label: 'Husqvarna', accent: '#FF6A00', description: 'Automower : la référence suédoise des robots tondeuses' },
    { slug: 'gardena', label: 'Gardena', accent: '#00B8D4', description: 'SILENO : robots fiables et accessibles du groupe Husqvarna' },
    { slug: 'worx', label: 'Worx', accent: '#76FF03', description: 'Landroid : robots connectés et modulaires' },
    { slug: 'robomow', label: 'Robomow', accent: '#FF3D57', description: 'Robots puissants pour grands jardins' },
    { slug: 'ecovacs', label: 'Ecovacs Goat', accent: '#7B61FF', description: 'GOAT : robots sans fil périphérique avec navigation RTK' },
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
    title: 'Calculer votre budget robot tondeuse',
    description: 'Estimez le budget nécessaire en fonction de la surface et des contraintes de votre jardin.',
  },

  palette: {
    accent1: '#22C55E',
    accent2: '#F59E0B',
    accent3: '#10B981',
    accent4: '#6366F1',
    accent5: '#06B6D4',
    bgPrimary: '#0A0F0A',
    bgSurface: '#111A11',
    bgSurface2: '#1A261A',
    textPrimary: '#F0F5F0',
    textSecondary: '#90A890',
    textMuted: '#556A55',
  },
  fonts: { display: 'Outfit', body: 'DM Sans' },

  author: {
    name: 'Thomas',
    slug: 'thomas',
    title: 'Expert robots tondeuses',
    bio: 'Passionné de jardinage connecté depuis 2018. J\'ai testé plus de 30 robots tondeuses pour aider les propriétaires à faire le bon choix.',
    tone: ['direct', 'pragmatique', 'technique'],
    noGo: ['révolutionnaire', 'incroyable', 'game-changer'],
    formulations: ['Honnêtement,', 'Le vrai critère :', 'En pratique,'],
  },

  affiliateTag: 'tondeuse10m-21',
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
