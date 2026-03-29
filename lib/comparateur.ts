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
        nom: 'YUKA Mini 2 500',
        prix: 699,
        amazonUrl: 'https://www.amazon.fr/dp/B0GCCLW2PL',
        specs: {
          surface: '500 m²',
          pente: '45%',
          bruit: '57 dB',
          navigation: 'Vision IA (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '120 min',
        },
      },
      {
        nom: 'YUKA Mini Vision',
        prix: 1099,
        amazonUrl: 'https://www.amazon.fr/dp/B0FKTBKDQ1',
        specs: {
          surface: '700 m²',
          pente: '45%',
          bruit: '57 dB',
          navigation: 'Vision IA (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '150 min',
        },
      },
      {
        nom: 'YUKA Mini 2 1000',
        prix: 1299,
        amazonUrl: 'https://www.amazon.fr/dp/B0GJ4TWVVV',
        specs: {
          surface: '1000 m²',
          pente: '45%',
          bruit: '57 dB',
          navigation: 'Vision IA (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '180 min',
        },
      },
      {
        nom: 'YUKA 2000',
        prix: 1385,
        amazonUrl: 'https://www.amazon.fr/dp/B0FJFW87T4',
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
        nom: 'YUKA 3000',
        prix: 1449,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0DT47TX7V',
        specs: {
          surface: '3000 m²',
          pente: '45%',
          bruit: '57 dB',
          navigation: 'RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '240 min',
        },
      },
      {
        nom: 'LUBA Mini AWD LiDAR',
        prix: 1699,
        amazonUrl: 'https://www.amazon.fr/dp/B0FCFRC4HP',
        specs: {
          surface: '1500 m²',
          pente: '80%',
          bruit: '55 dB',
          navigation: 'LiDAR + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '180 min',
        },
      },
      {
        nom: 'LUBA Mini 2 AWD 1000',
        prix: 1799,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0GJ5T8DRC',
        specs: {
          surface: '1000 m²',
          pente: '80%',
          bruit: '55 dB',
          navigation: 'LiDAR + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '150 min',
        },
      },
      {
        nom: 'LUBA 3 AWD 1500',
        prix: 2299,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0GHMGVHWN',
        specs: {
          surface: '1500 m²',
          pente: '80%',
          bruit: '55 dB',
          navigation: 'LiDAR + RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '180 min',
        },
      },
      {
        nom: 'LUBA 3 AWD 3000',
        prix: 2699,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0GCZSSZRZ',
        specs: {
          surface: '3000 m²',
          pente: '80%',
          bruit: '55 dB',
          navigation: 'LiDAR + RTK + vision (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '240 min',
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
        nom: 'Automower Aspire R4',
        prix: 699,
        amazonUrl: 'https://www.amazon.fr/dp/B0D9BRY75Y',
        specs: {
          surface: '400 m²',
          pente: '40%',
          bruit: '59 dB',
          navigation: 'Aléatoire + fil',
          connectivite: 'WiFi + Bluetooth',
          autonomie: '60 min',
        },
      },
      {
        nom: 'Automower 310 Mark II',
        prix: 1173,
        amazonUrl: 'https://www.amazon.fr/dp/B0BWKF1VWS',
        specs: {
          surface: '1000 m²',
          pente: '40%',
          bruit: '58 dB',
          navigation: 'GPS + fil',
          connectivite: 'Bluetooth + WiFi',
          autonomie: '70 min',
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
        nom: 'SILENO city 500',
        prix: 850,
        amazonUrl: 'https://www.amazon.fr/dp/B078BC3XDQ',
        specs: {
          surface: '500 m²',
          pente: '35%',
          bruit: '58 dB',
          navigation: 'SensorCut + fil',
          connectivite: 'Bluetooth + App',
          autonomie: '65 min',
        },
      },
      {
        nom: 'SILENO life 750',
        prix: 700,
        amazonUrl: 'https://www.amazon.fr/dp/B07MXR9S5K',
        specs: {
          surface: '750 m²',
          pente: '35%',
          bruit: '58 dB',
          navigation: 'SensorCut + fil',
          connectivite: 'WiFi + Bluetooth',
          autonomie: '65 min',
        },
      },
      {
        nom: 'SILENO city 600',
        prix: 880,
        amazonUrl: 'https://www.amazon.fr/dp/B09M75W6QD',
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
        nom: 'SILENO life 1000 smart set',
        prix: 1000,
        amazonUrl: 'https://www.amazon.fr/dp/B09M76JPSB',
        specs: {
          surface: '1000 m²',
          pente: '35%',
          bruit: '58 dB',
          navigation: 'SensorCut + fil',
          connectivite: 'WiFi + Bluetooth',
          autonomie: '65 min',
        },
      },
      {
        nom: 'SILENO life 1250',
        prix: 825,
        amazonUrl: 'https://www.amazon.fr/dp/B07MXR49QW',
        specs: {
          surface: '1250 m²',
          pente: '35%',
          bruit: '58 dB',
          navigation: 'SensorCut + fil',
          connectivite: 'WiFi + Bluetooth',
          autonomie: '65 min',
        },
      },
      {
        nom: 'Smart SILENO Free 600',
        prix: 1100,
        amazonUrl: 'https://www.amazon.fr/dp/B0DMF8HN4T',
        specs: {
          surface: '600 m²',
          pente: '35%',
          bruit: '57 dB',
          navigation: 'Vision IA (sans fil)',
          connectivite: 'WiFi + Bluetooth',
          autonomie: '70 min',
        },
      },
      {
        nom: 'Smart SILENO Free 750',
        prix: 1250,
        amazonUrl: 'https://www.amazon.fr/dp/B0DMF6FRCX',
        specs: {
          surface: '750 m²',
          pente: '35%',
          bruit: '57 dB',
          navigation: 'Vision IA (sans fil)',
          connectivite: 'WiFi + Bluetooth',
          autonomie: '70 min',
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
        nom: 'Landroid Plus WR169E',
        prix: 424,
        amazonUrl: 'https://www.amazon.fr/dp/B0DPMTL3HZ',
        specs: {
          surface: '250 m²',
          pente: '35%',
          bruit: '65 dB',
          navigation: 'AIA + fil',
          connectivite: 'WiFi + App',
          autonomie: '60 min',
        },
      },
      {
        nom: 'Landroid Plus WR165E',
        prix: 449,
        amazonUrl: 'https://www.amazon.fr/dp/B0913J9BTB',
        specs: {
          surface: '500 m²',
          pente: '35%',
          bruit: '65 dB',
          navigation: 'AIA + fil',
          connectivite: 'WiFi + App',
          autonomie: '60 min',
        },
      },
      {
        nom: 'Landroid Vision WR205E',
        prix: 812,
        amazonUrl: 'https://www.amazon.fr/dp/B0DHLM3NT5',
        specs: {
          surface: '500 m²',
          pente: '35%',
          bruit: '62 dB',
          navigation: 'Caméra HDR (sans fil)',
          connectivite: 'WiFi + App',
          autonomie: '90 min',
        },
      },
      {
        nom: 'Vision Cloud 2WD WR305E',
        prix: 799,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0FVG2L52Q',
        specs: {
          surface: '500 m²',
          pente: '35%',
          bruit: '62 dB',
          navigation: 'VSLAM + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '90 min',
        },
      },
      {
        nom: 'Vision Cloud 2WD WR308E',
        prix: 999,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0FVG31S3K',
        specs: {
          surface: '800 m²',
          pente: '35%',
          bruit: '62 dB',
          navigation: 'VSLAM + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '90 min',
        },
      },
      {
        nom: 'Vision Cloud 2WD WR312E',
        prix: 1199,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0FVG6VC6M',
        specs: {
          surface: '1200 m²',
          pente: '35%',
          bruit: '62 dB',
          navigation: 'VSLAM + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '90 min',
        },
      },
      {
        nom: 'Vision Cloud 2WD WR318E',
        prix: 1499,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0FVG4B9XR',
        specs: {
          surface: '1800 m²',
          pente: '35%',
          bruit: '62 dB',
          navigation: 'VSLAM + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '90 min',
        },
      },
      {
        nom: 'Vision Cloud 2WD WR330E',
        prix: 2299,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0FVG4WYT4',
        specs: {
          surface: '3000 m²',
          pente: '35%',
          bruit: '62 dB',
          navigation: 'VSLAM + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
          autonomie: '90 min',
        },
      },
      {
        nom: 'Vision Cloud 4WD WR340E',
        prix: 1499,
        nouveaute: true,
        amazonUrl: 'https://www.amazon.fr/dp/B0FVG3XLBJ',
        specs: {
          surface: '600 m²',
          pente: '84%',
          bruit: '62 dB',
          navigation: 'VSLAM + RTK (sans fil)',
          connectivite: 'WiFi + 4G + App',
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
        amazonUrl: '',
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
        amazonUrl: '',
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
  bosch: {
    id: 'bosch',
    label: 'Bosch Indego',
    description: 'Les Indego de Bosch : tonte en lignes parallèles, navigation LogiCut et intégration domotique.',
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
        nom: 'Indego S+ 500',
        prix: 450,
        amazonUrl: 'https://www.amazon.fr/dp/B08VJJKFBX',
        specs: {
          surface: '500 m²',
          pente: '27%',
          bruit: '63 dB',
          navigation: 'LogiCut + fil',
          connectivite: 'WiFi + Alexa',
          autonomie: '60 min',
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
