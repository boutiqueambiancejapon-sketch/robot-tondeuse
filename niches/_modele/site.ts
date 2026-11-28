/**
 * Site modèle : identité neutre à remplacer en entier quand on copie ce dossier pour un nouveau site.
 * Jamais en ligne (indexable: false dans index.ts), pas de domaine, pas d'étiquette partenaire.
 */
import type { NicheConfig } from '../types'

export const site: NicheConfig = {
  siteName: 'Site modèle',
  domain: 'modele.example',
  tagline: 'Site modèle du moteur : produits d’exemple, à remplacer.',

  entity: 'produit',
  entities: 'produits',
  entityVerb: 'acheter',
  dealWord: 'bons plans',

  heroPrefix: 'Le bon produit',
  heroSuffix: 'pour votre usage',
  rotatingWords: ['exemple'],
  subtitle: 'Six produits d’exemple, notés avec un barème public d’exemple.',
  ctaPrimary: { text: 'Voir une fiche', url: '/produits/marque-alpha-a1' },
  ctaSecondary: { text: 'Accueil', url: '/' },

  categories: [{ slug: 'produits', label: 'Produits', accent: '#2f5bd3', description: 'Catégorie d’exemple' }],

  quiz: { enabled: false, question: '', criteria: [] },
  comparator: { enabled: false, criteria: [] },
  simulator: { enabled: false, title: '', description: '' },

  // Valeurs reprises dans theme.css (seule source des couleurs affichées).
  palette: {
    accent1: '#2f5bd3',
    accent2: '#3d5a80',
    accent3: '#1b2430',
    accent4: '#4a74e8',
    accent5: '#9fb3c8',
    bgPrimary: '#f4f6f9',
    bgSurface: '#ffffff',
    bgSurface2: '#e9edf3',
    textPrimary: '#1b2430',
    textSecondary: '#3c4656',
    textMuted: '#5f6b7a',
  },
  fonts: { display: 'Schibsted Grotesk', body: 'Hanken Grotesk' },

  author: {
    name: 'Auteur du site',
    slug: 'auteur',
    title: 'Fondateur',
    bio: 'Présentation de l’auteur à écrire : qui il est, comment il compare les produits.',
    tone: ['direct', 'précis'],
    noGo: ['révolutionnaire', 'incroyable'],
    formulations: ['Concrètement,'],
  },

  affiliateTag: '',
  defaultStore: 'Amazon',

  defaultLocale: 'fr',
  locales: ['fr'],

  vercelRegion: 'fra1',
  repo: '',
  branch: '',
}
