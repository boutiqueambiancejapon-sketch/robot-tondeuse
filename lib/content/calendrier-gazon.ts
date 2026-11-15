/**
 * Contenu du « Calendrier du gazon » (lot 2, étape G4).
 * Tiré de tasks/calendrier-gazon-sources.md (sources lues le 12/11/2026). Chaque geste porte sa source.
 * `indicatif: true` = repère de l'équipe, sans source lue : la page l'affiche comme « repère indicatif ».
 * Rien n'a été essayé par l'équipe. Les consignes robot viennent de Husqvarna (Automower).
 */
import type { Source } from './fiche-hivernage'

export type Region = 'ouest' | 'nord-est' | 'sud' | 'montagne'
export type Exposition = 'soleil' | 'mi-ombre' | 'ombre'

export interface Geste {
  texte: string
  sources: string[]
  indicatif?: boolean
}

export interface Mois {
  nom: string
  theme: string
  gestes: Geste[]
  robot: Geste
}

/** Geste ajouté à certains mois (0 = janvier) selon la région ou l'exposition. */
interface Ajout extends Geste {
  mois: number[]
  robot?: boolean
}

export const REGIONS: { id: Region; label: string }[] = [
  { id: 'ouest', label: 'Ouest et plaine' },
  { id: 'nord-est', label: 'Nord et est' },
  { id: 'sud', label: 'Sud méditerranéen' },
  { id: 'montagne', label: 'Montagne' },
]

export const EXPOSITIONS: { id: Exposition; label: string }[] = [
  { id: 'soleil', label: 'Plein soleil' },
  { id: 'mi-ombre', label: 'Mi-ombre' },
  { id: 'ombre', label: 'Ombre' },
]

export const SOURCES_CALENDRIER: Source[] = [
  { id: 'S1', label: 'SEMAE, Petit guide du tapis vert (2023)', url: 'https://www.semae.fr/uploads/semae-fr_publication_202305_D1763_PETIT-GUIDE-DU-TAPIS-VERT.pdf' },
  { id: 'S2', label: 'Husqvarna, Guide d’assistance Automower par saison', url: 'https://www.husqvarna.com/be-fr/assistance/husqvarna-self-service/guide-d-assistance-automower-par-saison-ka-70343/' },
  { id: 'S3', label: 'Husqvarna, Préparer la pelouse et le robot Automower pour la saison de tonte', url: 'https://www.husqvarna.com/fr/assistance/husqvarna-self-service/preparer-la-pelouse-et-le-robot-automower-husqvarna-pour-la-saison-de-tonte-ka-70144/' },
  { id: 'S4', label: 'Jardiner autrement (SNHF), La gestion du gazon à l’aide du biocontrôle (2018)', url: 'https://www.jardiner-autrement.fr/wp-content/uploads/2018/06/gestion-du-gazon-a-laide-du-biocontrole.pdf' },
  { id: 'S5', label: 'FREDON, Fiche conseil : la pelouse', url: 'https://fredon.fr/aura/sites/default/files/Publications/fiche-conseil_auvergne_pelouse_web.pdf' },
  { id: 'S6', label: 'Ministère de la Transition écologique, Sécheresse (règles par département sur VigiEau)', url: 'https://www.ecologie.gouv.fr/actualites/secheresse-france' },
  { id: 'S7', label: 'Royal Horticultural Society, Fusarium patch and snow mould', url: 'https://www.rhs.org.uk/advice/profile?pid=563' },
  { id: 'S8', label: 'Hubo, Calendrier du jardin', url: 'https://www.hubo.be/fr/aide-et-conseils/jardin/entretien-du-jardin/calendrier-du-jardin/' },
]

const g = (texte: string, sources: string[], indicatif = false): Geste => (indicatif ? { texte, sources, indicatif } : { texte, sources })

export const MOIS: Mois[] = [
  {
    nom: 'Janvier', theme: 'Repos',
    gestes: [
      g('Ne pas marcher sur le gazon gelé : les brins cassent et brunissent.', ['S4', 'S8']),
      g('Ramasser les feuilles et les branches restées sur la pelouse.', ['S7']),
      g('Repérer les zones de mousse ou d’eau qui stagne. Elles diront où aérer au printemps.', ['S5']),
    ],
    robot: g('Robot et station rangés à l’intérieur, au-dessus de 0 °C. Vérifier la charge comme le demande la notice.', ['S2']),
  },
  {
    nom: 'Février', theme: 'Préparer',
    gestes: [
      g('En fin de mois, si le sol n’est ni gelé ni détrempé : compost fin, 0,5 kg/m², sur les zones à trèfle.', ['S5']),
      g('Ramasser les débris laissés par l’hiver.', ['S3']),
      g('Acheter les semences de regarnissage et l’engrais pour gazon, sans encore les épandre.', [], true),
    ],
    robot: g('Commander lames et vis si elles n’ont pas été changées à l’automne. Elles se changent ensemble.', ['S2', 'S3']),
  },
  {
    nom: 'Mars', theme: 'Reprise',
    gestes: [
      g('Première tonte quand l’herbe atteint 5 à 7 cm. La pousse démarre quand le sol approche 8 °C.', ['S3', 'S8']),
      g('Commencer haut, puis baisser la coupe par paliers.', ['S3']),
      g('Scarifier si le feutre est épais, sur 2 à 4 mm de profondeur. Une fois par an suffit.', ['S1', 'S4', 'S5']),
    ],
    robot: g('Réinstaller la station, charger le robot, dégager son chemin (branches, pommes de pin).', ['S2', 'S3']),
  },
  {
    nom: 'Avril', theme: 'Nourrir et regarnir',
    gestes: [
      g('Épandre un engrais pour gazon, puis arroser pour faire fondre les granulés.', ['S1', 'S5']),
      g('Regarnir les trous après la scarification, dans un sol à 10 °C au moins.', ['S1']),
      g('Tondre 1 à 2 fois par semaine, sans jamais couper plus d’un tiers de la hauteur.', ['S1', 'S5']),
    ],
    robot: g('Exclure les parties semées du parcours du robot jusqu’à leur première tonte.', ['S3']),
  },
  {
    nom: 'Mai', theme: 'Pleine pousse',
    gestes: [
      g('Garder 5 à 6 cm de hauteur.', ['S1', 'S5']),
      g('Par temps sec, arroser 1 fois par semaine, le soir, 4 à 5 L/m².', ['S1']),
      g('Laisser les déchets de tonte sur place : ils rendent de l’azote au sol.', ['S4']),
    ],
    robot: g('Vérifier les lames. Une herbe effilochée ou blanchie au bout signale des lames usées.', ['S2']),
  },
  {
    nom: 'Juin', theme: 'Avant la chaleur',
    gestes: [
      g('Remonter la coupe vers 7 à 8 cm avant les fortes chaleurs.', ['S1']),
      g('Arroser le soir ou la nuit, jamais en plein jour.', ['S1']),
      g('Consulter VigiEau avant d’arroser : les restrictions changent d’un département à l’autre.', ['S6']),
    ],
    robot: g('Placer la station à l’ombre. Réduire les passages si l’herbe pousse moins.', ['S2']),
  },
  {
    nom: 'Juillet', theme: 'Protéger',
    gestes: [
      g('Coupe haute : 7 à 8 cm, ou 10 cm pour laisser de la place aux insectes.', ['S1', 'S4']),
      g('Respecter les restrictions d’eau du département, de l’alerte à la crise.', ['S6']),
      g('Ne pas semer ni mettre d’engrais en pleine sécheresse.', [], true),
    ],
    robot: g('Moins de passages par temps sec. Sur un Automower, lames à changer toutes les 3 à 6 semaines en saison.', ['S2']),
  },
  {
    nom: 'Août', theme: 'Patienter',
    gestes: [
      g('Une pelouse jaunie par la sécheresse n’est pas forcément morte. Attendre les pluies avant de juger.', [], true),
      g('Garder la coupe haute.', ['S1', 'S4']),
      g('En fin de mois, préparer les semences : la meilleure période de semis commence.', ['S1']),
    ],
    robot: g('Nettoyer lames, roues et capteurs.', ['S2']),
  },
  {
    nom: 'Septembre', theme: 'Le mois des semis',
    gestes: [
      g('Semer ou regarnir : de fin août à septembre, le sol est encore chaud et les pluies reviennent.', ['S1', 'S4']),
      g('Scarifier si ce n’est pas fait au printemps, puis regarnir.', ['S1', 'S4']),
      g('Tondre un semis pour la première fois vers 5 semaines, coupe haute.', ['S1']),
    ],
    robot: g('Redescendre la coupe par paliers. Exclure les zones semées du parcours.', ['S3']),
  },
  {
    nom: 'Octobre', theme: 'Préparer l’hiver',
    gestes: [
      g('Engrais d’automne, pauvre en azote : trop d’azote en fin de saison favorise les maladies.', ['S7']),
      g('Si la mousse revient, chaulage léger à la dolomie. La mousse signale un sol acide, tassé ou ombragé.', ['S5']),
      g('Ramasser les feuilles sans attendre.', ['S7', 'S8']),
    ],
    robot: g('Laisser l’herbe à 6 à 8 cm avant l’hiver. Sur un Automower, la protection antigel garde le robot à la station sous 5 °C.', ['S2']),
  },
  {
    nom: 'Novembre', theme: 'Dernière tonte',
    gestes: [
      g('Dernière tonte quand la pousse s’arrête, herbe laissée à 6 à 8 cm.', ['S2', 'S8']),
      g('Retirer les feuilles mortes.', ['S8']),
      g('Aérer les zones où l’eau stagne, pour que la pelouse sèche vite.', ['S7']),
    ],
    robot: g('Nettoyer, poser des lames neuves, charger la batterie selon la notice, ranger robot et station à l’intérieur.', ['S2']),
  },
  {
    nom: 'Décembre', theme: 'Repos',
    gestes: [
      g('Laisser la neige en place : elle isole le gazon.', ['S8']),
      g('Ne pas marcher sur le gazon gelé.', ['S4']),
      g('Noter le bilan de l’année : zones à regarnir, mousse, ombre.', [], true),
    ],
    robot: g('Robot rangé au sec, au-dessus de 0 °C.', ['S2']),
  },
]

const AJOUTS_REGION: Record<Region, Ajout[]> = {
  ouest: [],
  'nord-est': [
    { mois: [2, 3], ...g('Dans le nord et l’est, la reprise et les semis de printemps viennent souvent 2 à 3 semaines plus tard. Les seuils ne changent pas : sol vers 8 °C pour tondre, 10 °C pour semer.', ['S1', 'S3'], true) },
    { mois: [10], robot: true, ...g('Le gel arrive plus tôt dans le nord et l’est : ranger le robot dès le début du mois.', [], true) },
  ],
  sud: [
    { mois: [1], ...g('Dans le sud, la tonte peut reprendre dès la fin février si le sol atteint 8 °C.', ['S3'], true) },
    { mois: [5, 6, 7], ...g('Dans le sud, l’été est la saison difficile : coupe haute, et VigiEau à consulter avant chaque arrosage.', ['S4', 'S6']) },
    { mois: [8, 9], ...g('Dans le sud, préférer le semis d’automne. En terrain sec, choisir un mélange à base de fétuque élevée.', ['S1']) },
    { mois: [11, 0], robot: true, ...g('En climat doux, le robot peut tondre une partie de l’hiver si l’herbe pousse encore, avec moins de passages.', ['S2']) },
  ],
  montagne: [
    { mois: [2, 3], ...g('En montagne, la première tonte et les semis attendent les mêmes seuils de sol (8 °C et 10 °C), souvent atteints en mai.', ['S1', 'S3'], true) },
    { mois: [2, 3], ...g('À la fonte de la neige, le risque de moisissure des neiges est au plus haut : aérer pour que la pelouse sèche vite.', ['S7']) },
    { mois: [9], ...g('En montagne, éviter l’azote fort et ramasser les feuilles avant la neige : cela limite la moisissure des neiges à la fonte.', ['S7']) },
    { mois: [9], robot: true, ...g('La pousse s’arrête plus tôt en altitude : dernière tonte et rangement du robot souvent dès octobre.', [], true) },
  ],
}

const AJOUTS_EXPOSITION: Record<Exposition, Ajout[]> = {
  soleil: [
    { mois: [5, 6, 7], ...g('En plein soleil, la pelouse sèche vite : coupe haute et arrosage le soir.', ['S1', 'S4']) },
  ],
  'mi-ombre': [
    { mois: [3, 8], ...g('À mi-ombre, regarnir avec un mélange « spécial ombre » ou riche en fétuque rouge.', ['S1', 'S5']) },
    { mois: [4, 5], ...g('À mi-ombre, tondre un peu plus haut qu’au soleil.', [], true) },
  ],
  ombre: [
    { mois: [2, 9], ...g('À l’ombre, la mousse revient : elle signale un manque de lumière ou un sol tassé. Aérer plutôt que traiter.', ['S5']) },
    { mois: [1, 10], ...g('Alléger les branches basses pour que l’air circule et que la pelouse sèche.', ['S7']) },
    { mois: [4], ...g('À l’ombre, accepter une pelouse moins dense.', [], true) },
  ],
}

export interface MoisCalendrier {
  nom: string
  theme: string
  gestes: Geste[]
  robot: Geste[]
}

/** Assemble les 12 mois pour une région et une exposition. Sans robot, `robot` est vide. */
export function construireCalendrier(region: Region, exposition: Exposition, avecRobot: boolean): MoisCalendrier[] {
  const ajouts = [...AJOUTS_REGION[region], ...AJOUTS_EXPOSITION[exposition]]
  const sansMois = ({ texte, sources, indicatif }: Ajout): Geste => g(texte, sources, indicatif)
  return MOIS.map((m, i) => {
    const duMois = ajouts.filter((a) => a.mois.includes(i))
    return {
      nom: m.nom,
      theme: m.theme,
      gestes: [...m.gestes, ...duMois.filter((a) => !a.robot).map(sansMois)],
      robot: avecRobot ? [m.robot, ...duMois.filter((a) => a.robot).map(sansMois)] : [],
    }
  })
}
