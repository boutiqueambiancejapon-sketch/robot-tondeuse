/**
 * lib/home-hubs.ts — config des sections de hubs sur la home.
 * Chaque section liste les hubs (slug, label, description) à afficher.
 */

import type { HubSectionItem } from '@/components/home/HomeHubSection'

// ─── Par jardin (taille + contrainte) ────────────────────────────────────

export const PAR_JARDIN_ITEMS: HubSectionItem[] = [
  { href: '/robot-tondeuse-petit-jardin', label: 'Petit jardin', description: 'Moins de 500 m², urbain ou pavillonnaire compact.' },
  { href: '/robot-tondeuse-500m2', label: '500 m²', description: 'Le palier moyen, pavillonnaire classique.' },
  { href: '/robot-tondeuse-1000m2', label: '1 000 m²', description: 'Grande maison, propriétés rurales.' },
  { href: '/robot-tondeuse-2000m2', label: '2 000 m²', description: 'Estate, dénivelés, zones multiples.' },
  { href: '/robot-tondeuse-grande-surface', label: 'Grande surface', description: '3 000 m² et plus — propriétés, parcs.' },
  { href: '/robot-tondeuse-pente', label: 'Terrain en pente', description: 'Modèles validés sur 35 % à 80 % de dénivelé.' },
  { href: '/robot-tondeuse-terrain-complexe', label: 'Terrain complexe', description: 'Pentes, obstacles, formes irrégulières.' },
  { href: '/robot-tondeuse-multi-zones', label: 'Multi-zones', description: 'Jardins séparés ou plusieurs zones distinctes.' },
]

// ─── Par technologie ─────────────────────────────────────────────────────

export const PAR_BESOIN_ITEMS: HubSectionItem[] = [
  { href: '/robot-tondeuse-sans-fil-peripherique', label: 'Sans fil périphérique', description: 'Plus de câble enterré, navigation autonome.', badge: 'Tendance' },
  { href: '/robot-tondeuse-silencieux', label: 'Silencieux', description: 'Moins de 60 dB — idéal copropriété et voisinage.' },
  { href: '/robot-tondeuse-connecte', label: 'Connecté', description: 'WiFi, Alexa, Google Home, app premium.' },
  { href: '/robot-tondeuse-rtk', label: 'GPS RTK', description: 'Précision centimétrique pour les grands terrains.' },
  { href: '/robot-tondeuse-vision-ia', label: 'Vision IA', description: 'Caméras + IA pour cartographier le jardin.' },
]

// ─── Comparatifs (par budget / sélections phares) ───────────────────────

export const COMPARATIFS_ITEMS: HubSectionItem[] = [
  { href: '/meilleur-robot-tondeuse-2026', label: 'Top 2026', description: 'Notre sélection des 10 meilleurs modèles testés.', badge: 'À jour' },
  { href: '/robot-tondeuse-rapport-qualite-prix', label: 'Meilleur rapport qualité-prix', description: 'Le sweet spot performance vs prix.' },
  { href: '/robot-tondeuse-pas-cher', label: 'Pas cher (< 600 €)', description: 'Modèles efficaces sans vous ruiner.' },
  { href: '/robot-tondeuse-haut-de-gamme', label: 'Haut de gamme', description: 'Husqvarna NERA, Mammotion Luba, Worx Vision.' },
]

// ─── Guides & conseils ───────────────────────────────────────────────────

export const GUIDES_ITEMS: HubSectionItem[] = [
  { href: '/comment-choisir-robot-tondeuse', label: 'Comment choisir', description: 'Les 5 critères qui comptent vraiment.' },
  { href: '/robot-tondeuse-vs-thermique', label: 'Robot vs thermique', description: 'Avantages, inconvénients, ROI sur 7 ans.' },
  { href: '/installation-robot-tondeuse', label: 'Installation', description: 'Câble périphérique, sans fil, mise en service.' },
  { href: '/entretien-robot-tondeuse', label: 'Entretien', description: 'Lames, batterie, nettoyage, mises à jour.' },
  { href: '/hivernage-robot-tondeuse', label: 'Hivernage', description: 'Comment remiser correctement votre robot.' },
  { href: '/horaires-tonte-reglementation', label: 'Réglementation FR', description: 'Horaires, voisinage, canicule, exemptions.' },
]
