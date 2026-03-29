/**
 * lib/comparateur.ts — données statiques de tous les comparateurs produit.
 * Toujours passer amazonUrl via AffiliateLink / addAffiliateTag().
 */

export type ModeleComparateur = {
  nom: string
  prix: number
  nouveaute?: boolean
  amazonUrl: string  // '' = à venir
  specs: Record<string, string>
}

export type ProduitComparateur = {
  id: string
  label: string
  description: string
  specsLabels: Record<string, string>
  modeles: ModeleComparateur[]
}

export const COMPARATEURS: Record<string, ProduitComparateur> = {
  mammotion: {
    id: 'mammotion',
    label: 'Mammotion',
    description: 'Luba et Yuka : robots tondeuses sans fil avec navigation RTK et vision IA. La nouvelle génération.',
    specsLabels: {
      surface: 'Surface max',
      pente: 'Pente max',
      bruit: 'Niveau sonore',
      navigation: 'Navigation',
      connectivite: 'Connectivité',
      autonomie: 'Autonomie',
    },
    modeles: [
      {
        nom: 'Yuka 1500',
        prix: 1099,
        amazonUrl: '',
        specs: {
          surface: '1500 m²',
          pente: '45%',
          bruit: '57 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '180 min',
        },
      },
      {
        nom: 'Yuka 2000',
        prix: 1499,
        amazonUrl: '',
        specs: {
          surface: '2000 m²',
          pente: '45%',
          bruit: '57 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '210 min',
        },
      },
      {
        nom: 'Luba 2 AWD 3000',
        prix: 2499,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          surface: '3000 m²',
          pente: '75%',
          bruit: '55 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '240 min',
        },
      },
      {
        nom: 'Luba 2 AWD 5000',
        prix: 2999,
        nouveaute: true,
        amazonUrl: '',
        specs: {
          surface: '5000 m²',
          pente: '75%',
          bruit: '55 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '300 min',
        },
      },
    ],
  },
  husqvarna: {
    id: 'husqvarna',
    label: 'Husqvarna Automower',
    description: 'La gamme Automower, référence du marché depuis 1995. Fiabilité éprouvée sur des millions de jardins.',
    specsLabels: {
      surface: 'Surface max',
      pente: 'Pente max',
      bruit: 'Niveau sonore',
      navigation: 'Navigation',
      connectivite: 'Connectivité',
      autonomie: 'Autonomie',
    },
    modeles: [
      {
        nom: 'Automower 305',
        prix: 999,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE1',
        specs: {
          surface: '600 m²',
          pente: '40%',
          bruit: '59 dB',
          navigation: 'Aléatoire + fil',
          connectivite: 'Bluetooth',
          autonomie: '70 min',
        },
      },
      {
        nom: 'Automower 415X',
        prix: 1899,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE2',
        specs: {
          surface: '1500 m²',
          pente: '40%',
          bruit: '57 dB',
          navigation: 'GPS + fil',
          connectivite: 'Bluetooth + 4G',
          autonomie: '75 min',
        },
      },
      {
        nom: 'Automower 435X AWD',
        prix: 3499,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE3',
        specs: {
          surface: '3500 m²',
          pente: '70%',
          bruit: '55 dB',
          navigation: 'GPS + EPOS',
          connectivite: 'Bluetooth + 4G',
          autonomie: '100 min',
        },
      },
    ],
  },
  gardena: {
    id: 'gardena',
    label: 'Gardena SILENO',
    description: 'Les SILENO de Gardena : silencieux, fiables et accessibles. Parfaits pour les petits et moyens jardins.',
    specsLabels: {
      surface: 'Surface max',
      pente: 'Pente max',
      bruit: 'Niveau sonore',
      navigation: 'Navigation',
      connectivite: 'Connectivité',
      autonomie: 'Autonomie',
    },
    modeles: [
      {
        nom: 'SILENO minimo 250',
        prix: 649,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE4',
        specs: {
          surface: '250 m²',
          pente: '25%',
          bruit: '57 dB',
          navigation: 'Aléatoire + fil',
          connectivite: 'Bluetooth + App',
          autonomie: '65 min',
        },
      },
      {
        nom: 'SILENO city 600',
        prix: 899,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE5',
        specs: {
          surface: '600 m²',
          pente: '35%',
          bruit: '58 dB',
          navigation: 'SensorCut + fil',
          connectivite: 'Bluetooth + App',
          autonomie: '65 min',
        },
      },
      {
        nom: 'SILENO life 1500',
        prix: 1499,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE6',
        specs: {
          surface: '1500 m²',
          pente: '35%',
          bruit: '58 dB',
          navigation: 'SensorCut + fil',
          connectivite: 'Bluetooth + WiFi',
          autonomie: '65 min',
        },
      },
    ],
  },
  worx: {
    id: 'worx',
    label: 'Worx Landroid',
    description: 'Les Landroid de Worx : modulaires, connectés et au meilleur rapport qualité-prix du marché.',
    specsLabels: {
      surface: 'Surface max',
      pente: 'Pente max',
      bruit: 'Niveau sonore',
      navigation: 'Navigation',
      connectivite: 'Connectivité',
      autonomie: 'Autonomie',
    },
    modeles: [
      {
        nom: 'Landroid S300',
        prix: 549,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE7',
        specs: {
          surface: '300 m²',
          pente: '35%',
          bruit: '65 dB',
          navigation: 'AIA + fil',
          connectivite: 'WiFi + App',
          autonomie: '60 min',
        },
      },
      {
        nom: 'Landroid M700',
        prix: 899,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE8',
        specs: {
          surface: '700 m²',
          pente: '35%',
          bruit: '65 dB',
          navigation: 'AIA + fil',
          connectivite: 'WiFi + App',
          autonomie: '60 min',
        },
      },
      {
        nom: 'Landroid Vision L1600',
        prix: 1699,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLE9',
        specs: {
          surface: '1600 m²',
          pente: '30%',
          bruit: '62 dB',
          navigation: 'Caméra HDR (sans fil)',
          connectivite: 'WiFi + 4G',
          autonomie: '90 min',
        },
      },
    ],
  },
  ecovacs: {
    id: 'ecovacs',
    label: 'Ecovacs GOAT',
    description: 'Les GOAT d\'Ecovacs : navigation RTK sans fil, détection d\'obstacles par IA, autonomie record.',
    specsLabels: {
      surface: 'Surface max',
      pente: 'Pente max',
      bruit: 'Niveau sonore',
      navigation: 'Navigation',
      connectivite: 'Connectivité',
      autonomie: 'Autonomie',
    },
    modeles: [
      {
        nom: 'GOAT G1',
        prix: 999,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLEC',
        specs: {
          surface: '800 m²',
          pente: '45%',
          bruit: '55 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G',
          autonomie: '180 min',
        },
      },
      {
        nom: 'GOAT G1-2000',
        prix: 1499,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B09EXAMPLED',
        specs: {
          surface: '2000 m²',
          pente: '45%',
          bruit: '55 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G',
          autonomie: '180 min',
        },
      },
    ],
  },
}

/** All valid product slugs for static generation. */
export const PRODUIT_SLUGS = Object.keys(COMPARATEURS)

/** Get a single product by slug. */
export function getProduit(slug: string): ProduitComparateur | undefined {
  return COMPARATEURS[slug]
}
