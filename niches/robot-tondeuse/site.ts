/**
 * Quel Robot Tondeuse — identité et réglages du site, repris tels quels de l'ancien niche.config.ts (28/11/2026).
 * Changer une valeur ici change le site en ligne.
 */
import type { NicheConfig } from '../types'

export const site: NicheConfig = {
  siteName: 'Quel Robot Tondeuse',
  domain: 'quel-robot-tondeuse.com',
  tagline: 'Le guide indépendant pour bien choisir votre robot tondeuse.',

  entity: 'robot tondeuse',
  entities: 'robots tondeuses',
  entityVerb: 'acheter',
  dealWord: 'bons plans',

  heroPrefix: 'Le robot qui tond',
  heroSuffix: 'votre jardin',
  rotatingWords: ['vraiment', 'enfin', 'tranquillement', 'sans bruit', 'tout seul'],
  subtitle: '55 robots passés au crible de leurs fiches techniques et des essais publiés. Pente, surface, navigation, bruit : nos outils trouvent le vôtre en 2 minutes.',
  ctaPrimary: { text: 'Trouver mon robot →', url: '/quiz' },
  ctaSecondary: { text: 'Voir le top 2026', url: '/comparatifs' },

  categories: [
    { slug: 'mammotion', label: 'Mammotion', accent: '#3a5a3d', description: 'Yuka et Luba : robots tondeuses sans fil avec navigation vision et RTK' },
    { slug: 'husqvarna', label: 'Husqvarna', accent: '#b8623d', description: 'Automower : la référence suédoise depuis 1995' },
    { slug: 'gardena', label: 'Gardena', accent: '#8ba88e', description: 'SILENO : robots fiables et silencieux pour petits et moyens jardins' },
    { slug: 'worx', label: 'Worx', accent: '#d97742', description: 'Landroid et Vision Cloud : robots modulaires et sans fil' },
    { slug: 'bosch', label: 'Bosch', accent: '#1a2e1f', description: 'Indego et VISIMOW : robots tondeuses connectés et compacts' },
    { slug: 'entretien-pelouse', label: 'Entretien pelouse', accent: '#243b2a', description: 'Guides et astuces pour une pelouse en pleine forme toute l\'année' },
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
    accent1: '#b8623d',  // copper — CTA primaire / affiliés
    accent2: '#3a5a3d',  // moss — vert secondaire
    accent3: '#1a2e1f',  // forest-deep — ancrage sombre
    accent4: '#d97742',  // copper-bright — hover / highlight
    accent5: '#8ba88e',  // sage — soft accent
    bgPrimary: '#fbf8f0',   // paper
    bgSurface: '#faf6ec',   // ivory
    bgSurface2: '#f5efe1',  // cream
    textPrimary: '#1a2e1f',    // ink (forest-deep)
    textSecondary: '#3d4a3f',  // ink-soft
    textMuted: '#6b7a6c',      // muted
  },
  fonts: { display: 'Instrument Serif', body: 'Inter' },

  author: {
    // 28/11/2026 : l'auteur est le vrai propriétaire du site (demande du propriétaire), plus le prénom « Thomas ».
    name: 'Mathias',
    slug: 'mathias',
    title: 'Fondateur de Quel Robot Tondeuse',
    bio: 'Je compare les robots tondeuses à partir des fiches des fabricants, des notices et des retours de propriétaires publiés, avec les mêmes critères pour chaque modèle.',
    tone: ['direct', 'pragmatique', 'technique'],
    noGo: ['révolutionnaire', 'incroyable', 'game-changer'],
    formulations: ['Concrètement,', 'Le vrai critère :', 'Sur le terrain,'],
    // Avatar illustré de Mathias en bricoleur de jardin (demande du propriétaire, 28/11/2026).
    photo: '/images/auteur-mathias.webp',
  },

  affiliateTag: 'ambiancejap0a-21',
  defaultStore: 'Amazon',

  defaultLocale: 'fr',
  locales: ['fr'],

  vercelRegion: 'fra1',
  repo: 'boutiqueambiancejapon-sketch/robot-tondeuse',
  branch: 'claude/lawn-mower-robot-site-4OSfv',
}

