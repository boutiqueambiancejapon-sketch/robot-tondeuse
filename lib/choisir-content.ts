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
  husqvarna: {
    tldr: [
      'Référence du marché depuis 1995 — fiabilité éprouvée.',
      'Gamme large du petit jardin (305) aux terrains de sport (CEORA).',
      'Seule marque à proposer des pentes jusqu\'à 70% (435X AWD).',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Husqvarna Automower ?',
        intro: 'Husqvarna a inventé le robot tondeuse en 1995. Avec 30 ans d\'expérience, la marque suédoise offre la gamme la plus complète du marché.',
        paragraphs: [
          'L\'Automower se distingue par sa fiabilité, son système antivol GPS intégré et sa capacité à gérer des terrains complexes avec passages étroits et pentes raides.',
          'Le système EPOS (positionnement précis) sur les modèles haut de gamme permet une tonte systématique en bandes parallèles, comme un jardinier professionnel.',
        ],
        tip: 'Pour un jardin de moins de 600 m² sans forte pente, le modèle 305 offre le meilleur rapport qualité-prix de la gamme.',
        internalLink: { text: 'Comparer tous les Husqvarna Automower', href: '/comparer/husqvarna' },
      },
      {
        id: 'gamme',
        title: 'Quelle gamme choisir ?',
        intro: 'Husqvarna propose trois familles principales adaptées à chaque besoin.',
        table: {
          headers: ['Gamme', 'Surface', 'Pente max', 'Budget'],
          rows: [
            ['Série 300 (305)', 'Jusqu\'à 600 m²', '40%', '~1 000 €'],
            ['Série 400 (415X, 435X)', '1 500 – 3 500 m²', '40–70%', '1 900 – 3 500 €'],
            ['Série NERA', '3 000 – 5 000 m²', '50%', '3 000 – 5 000 €'],
          ],
        },
      },
    ],
    faq: [
      { q: 'Faut-il un fil périphérique pour les Husqvarna Automower ?', a: 'Les modèles classiques (305, 415X) nécessitent un fil périphérique. Les modèles NERA et CEORA utilisent la technologie EPOS sans fil.' },
      { q: 'Quelle est la durée de vie d\'un Automower ?', a: 'Un Automower bien entretenu dure 10 à 15 ans. Les lames doivent être changées toutes les 4 à 8 semaines selon l\'usage.' },
      { q: 'L\'Automower fonctionne-t-il sous la pluie ?', a: 'Oui, tous les modèles sont conçus pour tondre sous la pluie. Un capteur météo peut retarder la tonte en cas de forte pluie sur les modèles connectés.' },
      { q: 'Quel modèle pour un terrain en pente ?', a: 'Le 435X AWD est le seul robot du marché à gérer des pentes jusqu\'à 70% grâce à sa transmission intégrale.' },
      { q: 'L\'installation est-elle compliquée ?', a: 'La pose du fil périphérique prend 2 à 4 heures pour un terrain de 1000 m². Husqvarna propose aussi un service d\'installation professionnel.' },
      { q: 'Comment fonctionne l\'antivol ?', a: 'Tous les modèles intègrent un code PIN. Les modèles X ajoutent un GPS et une alarme connectée à l\'application Automower Connect.' },
    ],
  },
  worx: {
    tldr: [
      'Meilleur rapport qualité-prix du marché — à partir de 549 €.',
      'Système modulaire : ajoutez des options (ACS, GPS, Find My Landroid).',
      'Le Landroid Vision fonctionne sans fil périphérique grâce à sa caméra HDR.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Worx Landroid ?',
        intro: 'Le Landroid de Worx séduit par son prix agressif et sa modularité unique sur le marché des robots tondeuses.',
        paragraphs: [
          'Le concept modulaire permet d\'ajouter des modules optionnels : capteur anticollision (ACS), module GPS, balise Find My Landroid et kit voix.',
          'Le Landroid Vision, dernier-né de la gamme, utilise une caméra HDR pour naviguer sans fil périphérique — une alternative abordable aux systèmes RTK.',
        ],
        tip: 'Commencez par le modèle de base et ajoutez les modules selon vos besoins. Le module ACS (anticollision) est le plus utile pour les jardins avec massifs.',
        internalLink: { text: 'Comparer tous les Worx Landroid', href: '/comparer/worx' },
      },
    ],
    faq: [
      { q: 'Le Worx Landroid est-il fiable ?', a: 'Oui, le Landroid bénéficie de bonnes évaluations utilisateurs. La garantie constructeur est de 2 ans, extensible à 3 ans via l\'application.' },
      { q: 'Le Landroid Vision nécessite-t-il un fil ?', a: 'Non, le Landroid Vision utilise une caméra HDR pour détecter les bordures de pelouse. Aucun fil périphérique ni balise RTK nécessaire.' },
      { q: 'Quels modules acheter en priorité ?', a: 'Le module ACS (anticollision ultrason) est le plus utile. Le module GPS est recommandé pour les terrains de plus de 500 m².' },
      { q: 'Le Landroid tond-il les bordures ?', a: 'Le système Cut to Edge permet de tondre au plus près des bordures, mais un passage de débroussailleuse reste conseillé 1 à 2 fois par mois.' },
      { q: 'Quelle est la largeur de coupe ?', a: 'Entre 18 et 22 cm selon les modèles. Plus petite que Robomow, mais adaptée aux jardins résidentiels.' },
      { q: 'Le Landroid est-il bruyant ?', a: 'Avec 65 dB, le Landroid est plus bruyant que les Husqvarna ou Gardena (57 dB), mais reste acceptable pour un usage diurne.' },
    ],
  },
  gardena: {
    tldr: [
      'Robots silencieux et fiables — idéaux pour les petits et moyens jardins.',
      'Application intuitive avec planification intelligente (AI).',
      'Groupe Husqvarna — technologie éprouvée à prix plus accessible.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Gardena SILENO ?',
        intro: 'Gardena, marque du groupe Husqvarna, propose des robots tondeuses fiables et silencieux à un prix plus accessible que les Automower.',
        paragraphs: [
          'Les SILENO utilisent le système SensorCut pour un résultat de tonte homogène sans traces visibles. Leur niveau sonore de 57–58 dB en fait parmi les robots les plus silencieux du marché.',
          'L\'application Gardena Smart permet de programmer les plages de tonte et de suivre le robot en temps réel.',
        ],
        tip: 'Pour un jardin de moins de 300 m², le SILENO minimo est le choix le plus économique avec une qualité de tonte identique aux modèles supérieurs.',
      },
    ],
    faq: [
      { q: 'Quelle différence entre Gardena SILENO et Husqvarna Automower ?', a: 'Les SILENO sont des robots d\'entrée et milieu de gamme du groupe Husqvarna. Ils partagent la même fiabilité mais offrent moins d\'options (pas de 4G, GPS simplifié).' },
      { q: 'Le SILENO gère-t-il les passages étroits ?', a: 'Oui, les SILENO passent dans des couloirs de 60 cm minimum grâce au guidage par fil.' },
      { q: 'Faut-il un fil périphérique ?', a: 'Oui, tous les modèles SILENO actuels nécessitent un fil périphérique et un fil guide.' },
      { q: 'Le SILENO est-il compatible avec la domotique ?', a: 'Via la passerelle Gardena Smart Gateway, les SILENO sont compatibles avec les systèmes Alexa et IFTTT.' },
      { q: 'Quelle est la garantie ?', a: 'Gardena offre une garantie constructeur de 2 ans sur tous les modèles SILENO.' },
      { q: 'Combien coûte l\'entretien annuel ?', a: 'Comptez environ 30 à 50 € par an pour les lames de remplacement. Un hivernage soigné prolonge la durée de vie de la batterie.' },
    ],
  },
  robomow: {
    tldr: [
      'Robots puissants avec lame à coupe large (28 cm) — tonte rapide.',
      'Idéaux pour les grands terrains jusqu\'à 3 000 m².',
      'Système Edge Cut pour une coupe nette le long des bordures.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Robomow ?',
        intro: 'Robomow se distingue par sa puissance de coupe et sa capacité à gérer de grandes surfaces rapidement.',
        paragraphs: [
          'Avec une lame de 28 cm (contre 18–22 cm chez la concurrence), les Robomow tondent plus vite et gèrent mieux les herbes hautes après une absence prolongée.',
          'Le système Edge Cut intégré permet de tondre proprement le long des bordures sans outil supplémentaire.',
        ],
      },
    ],
    faq: [
      { q: 'Le Robomow est-il bruyant ?', a: 'Avec 64–66 dB, les Robomow sont un peu plus bruyants que la moyenne, mais restent dans les normes de voisinage pour un usage diurne.' },
      { q: 'Quelle est la largeur de coupe ?', a: '28 cm pour les modèles RS, 18 cm pour les modèles RK. La plus grande largeur du marché.' },
      { q: 'Le Robomow gère-t-il l\'herbe haute ?', a: 'Oui, grâce à sa lame puissante, le Robomow peut couper de l\'herbe jusqu\'à 10 cm sans bourrage.' },
      { q: 'Combien de zones peut-il gérer ?', a: 'Jusqu\'à 4 zones distinctes, programmables indépendamment dans l\'application.' },
      { q: 'Faut-il un fil périphérique ?', a: 'Oui, tous les modèles Robomow actuels utilisent un fil périphérique.' },
      { q: 'Quelle est la durée de vie de la batterie ?', a: 'Les batteries lithium-ion durent 3 à 5 ans en usage normal. Elles sont remplaçables par l\'utilisateur.' },
    ],
  },
  ecovacs: {
    tldr: [
      'Navigation RTK sans fil périphérique — installation en 30 minutes.',
      'Détection d\'obstacles par vision IA — évite animaux et jouets.',
      'Autonomie record de 180 minutes par charge.',
    ],
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi choisir un Ecovacs GOAT ?',
        intro: 'Ecovacs, leader mondial des robots aspirateurs, a transposé son expertise en navigation IA aux robots tondeuses avec la gamme GOAT.',
        paragraphs: [
          'Le GOAT utilise la navigation RTK (Real-Time Kinematic) combinée à la vision IA pour se repérer avec une précision de 2 cm, sans aucun fil périphérique à installer.',
          'Les balises UWB (Ultra Wide Band) délimitent les zones de tonte et d\'exclusion. L\'installation se fait en 30 minutes environ, contre 3 à 4 heures pour un fil classique.',
        ],
        tip: 'Les balises UWB incluses couvrent un jardin standard. Vous pouvez acheter des balises supplémentaires pour les formes complexes.',
        internalLink: { text: 'Comparer les modèles Ecovacs GOAT', href: '/comparer/ecovacs' },
      },
    ],
    faq: [
      { q: 'Le GOAT est-il vraiment sans fil ?', a: 'Oui, le GOAT utilise des balises UWB et la navigation RTK. Aucun fil à enterrer — l\'installation prend 30 minutes.' },
      { q: 'La navigation RTK est-elle fiable ?', a: 'Oui, la précision RTK est de 2 cm. Le robot tond en bandes parallèles avec un résultat très uniforme, même sur les formes complexes.' },
      { q: 'Le GOAT détecte-t-il les obstacles ?', a: 'Oui, la caméra IA détecte et contourne les obstacles (animaux, jouets, arroseurs) sans les heurter.' },
      { q: 'Quelle autonomie pour le GOAT ?', a: '180 minutes par charge — la plus longue du marché. Il peut tondre jusqu\'à 2000 m² en une seule session.' },
      { q: 'Le GOAT fonctionne-t-il sur les pentes ?', a: 'Oui, jusqu\'à 45% de pente — supérieur à la plupart des concurrents à fil.' },
      { q: 'Quel est le prix du GOAT ?', a: 'À partir de 999 € pour le G1 (800 m²) et 1499 € pour le G1-2000 (2000 m²). Compétitif vu l\'absence de frais d\'installation du fil.' },
    ],
  },
}

/** Get editorial content for a /choisir/[produit] page. */
export function getChoisirContent(produit: string, _year?: number): ChoisirProductContent | undefined {
  return CHOISIR_CONTENT[produit]
}
