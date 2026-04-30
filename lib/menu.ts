/**
 * lib/menu.ts — Configuration centralisée du menu de navigation.
 *
 * Structure : 5 entrées top niveau (Comparatifs / Par jardin / Marques /
 * Guides / Outils). Chaque entrée a un dropdown / mega-panel.
 *
 * Note : certains slugs pointent vers des hubs créés au Batch 5. Tant que
 * le batch 5 n'est pas mergé, ces liens 404 — c'est attendu sur la branche.
 */

import { niche } from '@/niche.config'

export type MenuItem = {
  href: string
  label: string
  description?: string
  badge?: string
}

export type MenuColumn = {
  title: string
  items: MenuItem[]
}

export type MenuEntry = {
  id: string
  label: string
  href?: string           // si direct (pas de dropdown)
  columns?: MenuColumn[]  // mega panel
  cta?: MenuItem          // CTA visuel à droite du panel
}

// ─── Menu principal ──────────────────────────────────────────────────────

export const MAIN_MENU: MenuEntry[] = [
  {
    id: 'comparatifs',
    label: 'Comparatifs',
    href: '/comparatifs',
    columns: [
      {
        title: 'Top sélections',
        items: [
          { href: '/meilleur-robot-tondeuse-2026', label: 'Top 2026', badge: 'À jour' },
          { href: '/robot-tondeuse-rapport-qualite-prix', label: 'Meilleur rapport qualité-prix' },
          { href: '/robot-tondeuse-pas-cher', label: 'Robot tondeuse pas cher' },
          { href: '/robot-tondeuse-haut-de-gamme', label: 'Haut de gamme' },
        ],
      },
      {
        title: 'Par technologie',
        items: [
          { href: '/robot-tondeuse-sans-fil-peripherique', label: 'Sans fil périphérique', badge: 'Tendance' },
          { href: '/robot-tondeuse-silencieux', label: 'Silencieux' },
          { href: '/robot-tondeuse-connecte', label: 'Connecté / smart home' },
          { href: '/robot-tondeuse-rtk', label: 'GPS RTK' },
        ],
      },
    ],
    cta: {
      href: '/comparer',
      label: 'Comparateur interactif →',
      description: 'Compare 2 ou 3 robots côte à côte',
    },
  },
  {
    id: 'par-jardin',
    label: 'Par jardin',
    columns: [
      {
        title: 'Par taille',
        items: [
          { href: '/robot-tondeuse-petit-jardin', label: 'Petit jardin (< 500 m²)' },
          { href: '/robot-tondeuse-500m2', label: '500 m²' },
          { href: '/robot-tondeuse-1000m2', label: '1 000 m²' },
          { href: '/robot-tondeuse-2000m2', label: '2 000 m²' },
          { href: '/robot-tondeuse-grande-surface', label: 'Grande surface (> 3 000 m²)' },
        ],
      },
      {
        title: 'Par contrainte',
        items: [
          { href: '/robot-tondeuse-pente', label: 'Terrain en pente' },
          { href: '/robot-tondeuse-terrain-complexe', label: 'Terrain complexe' },
          { href: '/robot-tondeuse-multi-zones', label: 'Multi-zones' },
        ],
      },
    ],
    cta: {
      href: '/superficie',
      label: 'Calculer la surface →',
      description: 'Tracez votre jardin sur la carte',
    },
  },
  {
    id: 'marques',
    label: 'Marques',
    href: '/marques',
    columns: [
      {
        title: 'Marques testées',
        items: niche.categories
          .filter((c) => c.slug !== 'entretien-pelouse')
          .map((c) => ({ href: `/choisir/${c.slug}`, label: c.label })),
      },
    ],
  },
  {
    id: 'guides',
    label: 'Guides & conseils',
    columns: [
      {
        title: 'Choisir',
        items: [
          { href: '/comment-choisir-robot-tondeuse', label: 'Comment choisir' },
          { href: '/robot-tondeuse-vs-thermique', label: 'Robot vs thermique' },
          { href: '/quel-robot-tondeuse-pour-mon-jardin', label: 'Quel robot pour mon jardin ?' },
        ],
      },
      {
        title: 'Installation & SAV',
        items: [
          { href: '/installation-robot-tondeuse', label: 'Installation' },
          { href: '/entretien-robot-tondeuse', label: 'Entretien' },
          { href: '/hivernage-robot-tondeuse', label: 'Hivernage' },
          { href: '/depannage-robot-tondeuse', label: 'Dépannage' },
        ],
      },
      {
        title: 'Sécurité & règlementation',
        items: [
          { href: '/robot-tondeuse-securite-enfants-animaux', label: 'Sécurité enfants & animaux' },
          { href: '/horaires-tonte-reglementation', label: 'Horaires de tonte' },
          { href: '/robot-tondeuse-bruit-voisinage', label: 'Bruit & voisinage' },
        ],
      },
    ],
    cta: {
      href: '/blog',
      label: 'Tous les articles →',
      description: 'Le blog complet',
    },
  },
  {
    id: 'outils',
    label: 'Outils',
    columns: [
      {
        title: 'Trouver son robot',
        items: [
          { href: '/quiz', label: 'Quiz : quel robot pour moi ?', description: '7 questions, 2 min' },
          { href: '/superficie', label: 'Calculer la surface du jardin', description: 'Carte satellite' },
        ],
      },
      {
        title: 'Décider',
        items: [
          { href: '/comparer', label: 'Comparateur 2-vs-3' },
          { href: '/calculateur-rentabilite-robot-tondeuse', label: 'Calculateur de rentabilité', description: 'Robot vs thermique' },
        ],
      },
    ],
  },
]

// ─── Bottom nav mobile (4 icônes fixes) ──────────────────────────────────

export type BottomNavItem = {
  href: string
  label: string
  icon: 'home' | 'compare' | 'quiz' | 'search'
}

export const BOTTOM_NAV: BottomNavItem[] = [
  { href: '/',            label: 'Accueil',     icon: 'home' },
  { href: '/comparatifs', label: 'Comparatifs', icon: 'compare' },
  { href: '/quiz',        label: 'Quiz',        icon: 'quiz' },
  { href: '/blog',        label: 'Articles',    icon: 'search' },
]
