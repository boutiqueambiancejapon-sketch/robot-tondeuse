/**
 * Contenu éditorial structuré pour les pages /choisir/[produit].
 * Le contenu est pur texte ; le rendu JSX est dans ChoisirEditorial.
 */

export type ChoisirTable = {
  headers: string[]
  rows: string[][]
}

export type ChoisirSection = {
  id: string
  title: string
  intro: string
  paragraphs?: string[]
  table?: ChoisirTable
  tip?: string
  internalLink?: { text: string; href: string }
}

export type ChoisirFAQ = { q: string; a: string }

export type ChoisirProductContent = {
  tldr: string[]
  sections: ChoisirSection[]
  faq: ChoisirFAQ[]
}

export const CHOISIR_CONTENT: Record<string, ChoisirProductContent> = {
  mammotion: {
    tldr: [
      'Robots sans fil avec navigation RTK. Installation en 30 minutes.',
      'Le Luba 2 AWD grimpe des pentes jusqu\'à 75%, record du marché.',
      'Bon programme d\'affiliation et prix compétitifs face à Husqvarna.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Mammotion ?',
        intro: 'Mammotion est un constructeur chinois spécialisé dans les robots tondeuses sans fil. Leurs modèles Yuka et Luba utilisent la navigation RTK combinée à la vision IA.',
        paragraphs: [
          'Le gros avantage : zéro fil à enterrer. Vous posez une station de base RTK, vous tracez les zones dans l\'appli et c\'est parti. En 30 minutes c\'est plié.',
          'Le Luba 2 AWD est le modèle phare. Avec sa transmission intégrale il grimpe des pentes à 75%, ce qui en fait le meilleur robot du marché pour les terrains vallonnés.',
          'Les Yuka sont plus accessibles et visent les jardins de 1500 à 2000 m². Ils partagent la même navigation RTK que les Luba.',
        ],
        tip: 'Pour un jardin de moins de 2000 m² sans grosse pente, le Yuka 1500 à 1099 € est un excellent point d\'entrée dans le sans fil.',
        internalLink: { text: 'Comparer tous les Mammotion', href: '/comparer/mammotion' },
      },
      {
        id: 'gamme',
        title: 'Quelle gamme choisir ?',
        intro: 'Mammotion propose deux gammes : Yuka pour les jardins standard et Luba pour les grands terrains ou les pentes.',
        table: {
          headers: ['Modèle', 'Surface', 'Pente max', 'Prix'],
          rows: [
            ['Yuka 1500', '1500 m²', '45%', '~1 100 €'],
            ['Yuka 2000', '2000 m²', '45%', '~1 500 €'],
            ['Luba 2 AWD 3000', '3000 m²', '75%', '~2 500 €'],
            ['Luba 2 AWD 5000', '5000 m²', '75%', '~3 000 €'],
          ],
        },
      },
    ],
    faq: [
      { q: 'Le Mammotion fonctionne-t-il vraiment sans fil ?', a: 'Oui. La station de base RTK et les capteurs de vision remplacent le fil périphérique. Pas besoin de creuser votre pelouse.' },
      { q: 'La navigation RTK est fiable ?', a: 'Oui, la précision est d\'environ 2 cm. Le robot tond en lignes droites parallèles, comme un jardinier pro.' },
      { q: 'Le Luba 2 grimpe vraiment à 75% ?', a: 'Oui, grâce à la transmission intégrale (AWD). C\'est le record du marché. Le Husqvarna 435X AWD monte à 70%.' },
      { q: 'Quelle est l\'autonomie ?', a: 'De 180 à 300 minutes selon le modèle. Largement suffisant pour couvrir la surface annoncée en une session.' },
      { q: 'Comment se passe le SAV Mammotion ?', a: 'Mammotion a un support européen. La garantie est de 2 ans. Les pièces détachées sont disponibles sur leur site.' },
      { q: 'Le Mammotion est-il bruyant ?', a: '55 à 57 dB selon le modèle. C\'est dans la fourchette basse, comparable aux Husqvarna et Gardena.' },
    ],
  },
  husqvarna: {
    tldr: [
      'La référence depuis 1995. 30 ans de recul, fiabilité au top.',
      'Gamme large du petit jardin (305) aux terrains de sport (CEORA).',
      'Seule marque à proposer des pentes à 70% (435X AWD) sur fil.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Husqvarna Automower ?',
        intro: 'Husqvarna a inventé le robot tondeuse en 1995. 30 ans plus tard, c\'est toujours la marque la plus vendue en Europe.',
        paragraphs: [
          'Ce qui fait la différence : la fiabilité. Un Automower bien entretenu tient 10 à 15 ans. Le réseau de revendeurs et réparateurs est le plus dense du marché.',
          'Le système de navigation par fil est éprouvé. Pas la techno la plus sexy, mais ça fonctionne dans tous les cas de figure : passages étroits, multi-zones, terrain complexe.',
        ],
        tip: 'Pour un jardin classique de moins de 600 m², le modèle 305 est le meilleur rapport qualité-prix de la gamme.',
        internalLink: { text: 'Comparer tous les Husqvarna', href: '/comparer/husqvarna' },
      },
      {
        id: 'gamme',
        title: 'Quelle gamme choisir ?',
        intro: 'Trois familles principales selon la taille de votre terrain.',
        table: {
          headers: ['Gamme', 'Surface', 'Pente max', 'Budget'],
          rows: [
            ['Série 300 (305)', 'Jusqu\'à 600 m²', '40%', '~1 000 €'],
            ['Série 400 (415X, 435X)', '1 500 à 3 500 m²', '40 à 70%', '1 900 à 3 500 €'],
            ['Série NERA', '3 000 à 5 000 m²', '50%', '3 000 à 5 000 €'],
          ],
        },
      },
    ],
    faq: [
      { q: 'Faut-il un fil périphérique pour les Automower ?', a: 'Les modèles classiques (305, 415X) oui. Les modèles NERA et CEORA utilisent la technologie EPOS sans fil.' },
      { q: 'Combien de temps dure un Automower ?', a: '10 à 15 ans avec un bon entretien. Les lames se changent toutes les 4 à 8 semaines.' },
      { q: 'L\'Automower tond sous la pluie ?', a: 'Oui, tous les modèles sont conçus pour ça. Les modèles connectés peuvent retarder la tonte si la pluie est trop forte.' },
      { q: 'Quel modèle pour un terrain en pente ?', a: 'Le 435X AWD grimpe à 70% grâce à sa transmission intégrale. C\'est le seul Automower avec cette capacité.' },
      { q: 'L\'installation du fil est compliquée ?', a: 'Comptez 2 à 4 heures pour 1000 m². Husqvarna propose aussi un service d\'installation pro.' },
      { q: 'Comment marche l\'antivol ?', a: 'Code PIN sur tous les modèles. Les versions X ajoutent un GPS et une alarme connectée à l\'appli.' },
    ],
  },
  gardena: {
    tldr: [
      'Robots silencieux et fiables pour les petits et moyens jardins.',
      'Appli intuitive avec planification intelligente.',
      'Même groupe que Husqvarna, technologie éprouvée à prix plus doux.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Gardena SILENO ?',
        intro: 'Gardena appartient au groupe Husqvarna. En gros, c\'est la même fiabilité mais à un prix plus accessible.',
        paragraphs: [
          'Les SILENO sont parmi les robots les plus silencieux du marché (57-58 dB). Le système SensorCut évite les traces de tonte visibles.',
          'L\'appli Gardena Smart est simple et bien faite. Vous programmez les plages de tonte et le robot gère le reste.',
        ],
        tip: 'Pour un petit jardin de moins de 300 m², le SILENO minimo à 649 € est le meilleur choix budget. Même qualité de tonte que les modèles plus chers.',
      },
    ],
    faq: [
      { q: 'Quelle différence entre Gardena SILENO et Husqvarna Automower ?', a: 'Les SILENO sont l\'entrée et le milieu de gamme du groupe Husqvarna. Même fiabilité, moins d\'options (pas de 4G, GPS simplifié).' },
      { q: 'Le SILENO gère les passages étroits ?', a: 'Oui, il passe dans des couloirs de 60 cm minimum grâce au guidage par fil.' },
      { q: 'Faut-il un fil périphérique ?', a: 'Oui, tous les SILENO actuels utilisent un fil périphérique et un fil guide.' },
      { q: 'C\'est compatible avec la domotique ?', a: 'Via la passerelle Gardena Smart Gateway, les SILENO sont compatibles Alexa et IFTTT.' },
      { q: 'Quelle est la garantie ?', a: '2 ans constructeur sur tous les modèles SILENO.' },
      { q: 'Combien coûte l\'entretien ?', a: 'Environ 30 à 50 € par an pour les lames. Un bon hivernage prolonge la durée de vie de la batterie.' },
    ],
  },
  worx: {
    tldr: [
      'Meilleur rapport qualité-prix du marché. À partir de 549 €.',
      'Système modulaire : ajoutez des options selon vos besoins.',
      'Le Landroid Vision fonctionne sans fil grâce à sa caméra HDR.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Worx Landroid ?',
        intro: 'Le Landroid plaît pour deux raisons : son prix et sa modularité. Vous achetez le robot de base et vous ajoutez des modules selon vos besoins.',
        paragraphs: [
          'Les modules disponibles : capteur anticollision (ACS), GPS, balise Find My Landroid, kit voix. Ça permet de personnaliser le robot sans payer pour des fonctions inutiles.',
          'Le Landroid Vision est le modèle sans fil de Worx. Il utilise une caméra HDR pour détecter les bordures, pas de fil à installer.',
        ],
        tip: 'Le module ACS (anticollision) à environ 200 € est le plus utile. Il évite que le robot cogne dans vos massifs et vos arbres.',
        internalLink: { text: 'Comparer tous les Worx Landroid', href: '/comparer/worx' },
      },
    ],
    faq: [
      { q: 'Le Worx Landroid est fiable ?', a: 'Oui, bonnes évaluations utilisateurs en général. Garantie de 2 ans, extensible à 3 ans via l\'appli.' },
      { q: 'Le Landroid Vision a besoin d\'un fil ?', a: 'Non, il utilise une caméra HDR pour voir les bordures. Pas de fil, pas de balise RTK.' },
      { q: 'Quel module acheter en premier ?', a: 'L\'ACS (anticollision ultrason). Si votre jardin fait plus de 500 m², le module GPS aussi.' },
      { q: 'Le Landroid tond les bordures ?', a: 'Le système Cut to Edge tond au plus près des bords. Un passage de débroussailleuse reste utile 1 à 2 fois par mois.' },
      { q: 'Quelle largeur de coupe ?', a: '18 à 22 cm selon le modèle. Plus petit que certains concurrents, mais adapté aux jardins résidentiels.' },
      { q: 'Le Landroid est bruyant ?', a: '65 dB, c\'est plus que les Husqvarna ou Gardena (57 dB). Ça s\'entend en journée mais ça reste correct.' },
    ],
  },
  ecovacs: {
    tldr: [
      'Navigation RTK sans fil. Installation en 30 minutes.',
      'Détection d\'obstacles par vision IA.',
      'Autonomie record de 180 minutes par charge.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Ecovacs GOAT ?',
        intro: 'Ecovacs, c\'est le leader mondial des robots aspirateurs. Avec le GOAT, ils appliquent leur expertise navigation IA aux robots tondeuses.',
        paragraphs: [
          'Le GOAT se repère avec une précision de 2 cm grâce à la navigation RTK et les balises UWB. Pas de fil à enterrer.',
          'L\'installation est rapide : plantez les balises aux coins du jardin, tracez les zones dans l\'appli, et c\'est parti. Comptez 30 minutes max.',
        ],
        tip: 'Les balises UWB fournies couvrent un jardin standard. Pour les formes complexes, des balises supplémentaires sont disponibles.',
        internalLink: { text: 'Comparer les modèles Ecovacs GOAT', href: '/comparer/ecovacs' },
      },
    ],
    faq: [
      { q: 'Le GOAT est vraiment sans fil ?', a: 'Oui. Balises UWB + navigation RTK. Pas de tranchée à creuser dans votre pelouse.' },
      { q: 'La navigation RTK est fiable ?', a: 'Oui, précision de 2 cm. Le robot tond en bandes parallèles, résultat très uniforme.' },
      { q: 'Le GOAT détecte les obstacles ?', a: 'Oui, la caméra IA contourne les obstacles (animaux, jouets, arroseurs) sans les heurter.' },
      { q: 'Quelle autonomie ?', a: '180 minutes par charge. Il peut couvrir 2000 m² en une seule session.' },
      { q: 'Le GOAT gère les pentes ?', a: 'Jusqu\'à 45%. Mieux que la plupart des robots à fil, mais moins que le Mammotion Luba 2 (75%).' },
      { q: 'Quel prix pour le GOAT ?', a: 'À partir de 999 € pour le G1 (800 m²) et 1499 € pour le G1-2000. Compétitif vu qu\'il n\'y a pas de frais d\'installation du fil.' },
    ],
  },
}

/** Get editorial content for a /choisir/[produit] page. */
export function getChoisirContent(produit: string, _year?: number): ChoisirProductContent | undefined {
  return CHOISIR_CONTENT[produit]
}
