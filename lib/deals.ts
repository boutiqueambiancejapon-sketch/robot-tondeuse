// ─── Deal catalogue ───────────────────────────────────────────────────────────
// Données statiques — mis à jour manuellement pour chaque flash sale.
// Les prix YAML sont des ranges string ; ici on stocke les prix numériques exacts.
// ─────────────────────────────────────────────────────────────────────────────

export type Deal = {
  /** Identifiant interne */
  id: string
  /** Marque affichée (ex : "Segway") */
  brand: string
  /** Nom complet du modèle */
  model: string
  /** Slug du produit → /tests/[slug] */
  slug: string
  /** Accroche courte (specs clés) */
  hook: string
  /** Prix actuel promo en € */
  price: number
  /** Prix barré (référence) en € */
  oldPrice: number
  /** Pourcentage de réduction */
  discount: number
  /** Unités simulées restantes (1-12) */
  stock: number
  /** Label badge flash (ex : "Vente flash") */
  label: string
  /** Couleur accentuée de la marque (hex) */
  color: string
  /** URL affiliate (rel="nofollow noopener") */
  buyUrl: string
}

// Secondes restantes dans la vente flash (synchronisé avec FlashBar)
export const FLASH_SECONDS = 6 * 3600 + 14 * 60 + 39

export const DEALS: Deal[] = [
  {
    id: 'segway-i105e',
    brand: 'Segway',
    model: 'Navimow i105E',
    slug: 'segway-navimow-i105e',
    hook: 'RTK + Vision IA · sans fil périmétrique · 500 m² · 58 dB',
    price: 699,
    oldPrice: 899,
    discount: 22,
    stock: 7,
    label: 'Vente flash',
    color: '#1a6bc4',
    buyUrl: 'https://www.amazon.fr/dp/B0CXDNFZLL',
  },
  {
    id: 'mammotion-yuka-mini',
    brand: 'Mammotion',
    model: 'Yuka Mini 2 500',
    slug: 'mammotion-yuka-mini-2-500',
    hook: 'Triple caméra IA · sans câble ni RTK · 500 m²',
    price: 549,
    oldPrice: 699,
    discount: 21,
    stock: 4,
    label: 'Promo été',
    color: '#2d9d8f',
    buyUrl: 'https://www.amazon.fr/s?k=mammotion+yuka+mini+2+500',
  },
  {
    id: 'worx-vision-m800',
    brand: 'Worx',
    model: 'Landroid Vision M800',
    slug: 'worx-landroid-vision-m800-wr208e',
    hook: 'Caméra 4K + IA adaptative · 800 m² · multi-zones',
    price: 699,
    oldPrice: 999,
    discount: 30,
    stock: 5,
    label: 'Offre printemps',
    color: '#e55f00',
    buyUrl: 'https://www.amazon.fr/dp/B0CTTWLLZZ',
  },
  {
    id: 'gardena-sileno-750',
    brand: 'Gardena',
    model: 'SILENO Life 750 LONA',
    slug: 'gardena-smart-sileno-life-750-lona',
    hook: 'Sans câble ni RTK · 750 m² · silencieux · app LONA',
    price: 849,
    oldPrice: 1099,
    discount: 23,
    stock: 9,
    label: 'Promo saison',
    color: '#e05a1a',
    buyUrl: 'https://www.amazon.fr/s?k=gardena+sileno+life+750+LONA',
  },
]
