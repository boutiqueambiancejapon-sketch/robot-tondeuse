/**
 * Contenu de la fiche « Hivernage du robot » (lot 2, étape G2).
 * Chaque geste porte sa source. Sources relues le 13/11/2026 (voir tasks/calendrier-gazon-sources.md).
 * Les consignes Husqvarna valent pour les Automower ; pour les autres marques, la notice fait foi.
 */

export interface Source {
  id: string
  label: string
  url: string
}

export interface Etape {
  titre: string
  quand: string
  gestes: { texte: string; sources: string[] }[]
}

export const SOURCES_HIVERNAGE: Source[] = [
  {
    id: 'S2',
    label: 'Husqvarna, Guide d’assistance Automower par saison',
    url: 'https://www.husqvarna.com/be-fr/assistance/husqvarna-self-service/guide-d-assistance-automower-par-saison-ka-70343/',
  },
  {
    id: 'S3',
    label: 'Husqvarna, Préparer la pelouse et le robot Automower pour la saison de tonte',
    url: 'https://www.husqvarna.com/fr/assistance/husqvarna-self-service/preparer-la-pelouse-et-le-robot-automower-husqvarna-pour-la-saison-de-tonte-ka-70144/',
  },
  {
    id: 'S8',
    label: 'Hubo, Calendrier du jardin',
    url: 'https://www.hubo.be/fr/aide-et-conseils/jardin/entretien-du-jardin/calendrier-du-jardin/',
  },
]

export const ETAPES_HIVERNAGE: Etape[] = [
  {
    titre: 'Les dernières tontes',
    quand: 'Octobre à novembre, tant que l’herbe pousse',
    gestes: [
      { texte: 'Laisser l’herbe à 6 à 8 cm pour l’hiver : une herbe un peu longue protège mieux la pelouse.', sources: ['S2'] },
      { texte: 'Continuer à tondre tant que l’herbe pousse. Dans un climat doux, réduire le nombre de passages.', sources: ['S2'] },
      { texte: 'Sur un Automower, activer la protection antigel : le robot reste à la station sous 5 °C.', sources: ['S2'] },
      { texte: 'Arrêter quand la pousse s’arrête. L’enseigne Hubo place la dernière tonte en octobre en Belgique.', sources: ['S8'] },
    ],
  },
  {
    titre: 'Le nettoyage',
    quand: 'Le jour du remisage',
    gestes: [
      { texte: 'Retirer l’herbe collée sous le châssis, sur les roues et sur le disque de coupe.', sources: ['S2'] },
      { texte: 'Nettoyer les contacts de charge, sur le robot et sur la station.', sources: ['S2'] },
      { texte: 'Husqvarna conseille aussi un nettoyage chez le revendeur après chaque saison. Demander le tarif avant de confier le robot.', sources: ['S2'] },
    ],
  },
  {
    titre: 'Les lames',
    quand: 'Avant de ranger, pas au printemps',
    gestes: [
      { texte: 'Poser des lames neuves avant l’hiver : elles évitent la rouille sur le disque pendant le stockage.', sources: ['S2'] },
      { texte: 'Changer la vis en même temps que la lame, à chaque fois.', sources: ['S2', 'S3'] },
    ],
  },
  {
    titre: 'La batterie',
    quand: 'Juste avant d’éteindre le robot',
    gestes: [
      { texte: 'Automower : charger la batterie à fond, puis éteindre. Husqvarna l’écrit noir sur blanc.', sources: ['S2'] },
      { texte: 'Autres marques : suivre la notice. Les consignes de charge ne sont pas les mêmes partout.', sources: [] },
    ],
  },
  {
    titre: 'Le rangement',
    quand: 'Tout l’hiver',
    gestes: [
      { texte: 'Robot à l’intérieur, au sec, au-dessus de 0 °C, posé sur ses roues, sur une surface plane.', sources: ['S2'] },
      { texte: 'Station de charge à l’intérieur aussi (sur les modèles NERA, la plaque de base peut rester dehors).', sources: ['S2'] },
      { texte: 'Débrancher l’alimentation et la ranger au sec, à l’abri du gel.', sources: ['S2'] },
      { texte: 'Les réglages restent en mémoire robot éteint : rien à noter.', sources: ['S2'] },
    ],
  },
  {
    titre: 'Les câbles',
    quand: 'Avant de débrancher la station',
    gestes: [
      { texte: 'Laisser le câble périphérique et le câble guide dans le sol tout l’hiver.', sources: ['S2'] },
      { texte: 'Étiqueter chaque fil avant de le débrancher : on le rebranche sans erreur au printemps.', sources: ['S2'] },
    ],
  },
  {
    titre: 'La remise en route',
    quand: 'Au printemps, quand la pousse repart',
    gestes: [
      { texte: 'Attendre que l’herbe repousse (vers 8 °C) et atteigne 5 à 7 cm.', sources: ['S3'] },
      { texte: 'Ratisser feuilles, branches et pommes de pin avant le premier passage.', sources: ['S3'] },
      { texte: 'Commencer avec une coupe haute, puis descendre par paliers.', sources: ['S3'] },
    ],
  },
]
