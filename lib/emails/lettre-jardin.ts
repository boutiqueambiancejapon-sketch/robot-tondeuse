/**
 * Textes de « La lettre du jardin » (lot 6) : 3 e-mails de bienvenue et la lettre du mois.
 * Ce fichier ne fait que préparer les textes. Rien n'est envoyé d'ici : l'envoi réel attend l'accord du
 * propriétaire et se fera depuis Brevo (liste « Quel Robot Tondeuse »).
 *
 * Règles : chaque conseil vient du calendrier du site (lib/content/calendrier-gazon.ts) et nomme sa source.
 * Aucun essai affirmé, aucun prix, aucune promotion sans offre confirmée dans lib/promos.ts.
 * La lettre du mois se fabrique à partir du calendrier : corriger un geste là-bas corrige aussi la lettre.
 */
import { MOIS, type Geste } from '@/lib/content/calendrier-gazon'

export const SITE = 'https://quel-robot-tondeuse.com'
/** Remplacé par Brevo au moment de l'envoi. */
export const LIEN_DESINSCRIPTION = '{{ unsubscribe }}'
export const EXPEDITEUR = { nom: 'Quel Robot Tondeuse', email: 'bonjour@quel-robot-tondeuse.com' }

export type Bloc =
  | { type: 'p'; texte: string }
  | { type: 'titre'; texte: string }
  | { type: 'liste'; items: string[] }
  | { type: 'bouton'; label: string; href: string }

export interface Email {
  id: string
  /** Moment de l'envoi, en clair. */
  quand: string
  objet: string
  /** Ligne d'aperçu affichée sous l'objet dans la boîte de réception. */
  apercu: string
  blocs: Bloc[]
}

/** Nom court de chaque source du calendrier, pour la citer dans une phrase. */
const NOM_SOURCE: Record<string, string> = {
  S1: 'SEMAE',
  S2: 'Husqvarna',
  S3: 'Husqvarna',
  S4: 'Jardiner autrement',
  S5: 'FREDON',
  S6: 'ministère de la Transition écologique',
  S7: 'Royal Horticultural Society',
  S8: 'Hubo',
}

export const PIED: Bloc[] = [
  {
    type: 'p',
    texte:
      'Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.',
  },
  { type: 'p', texte: `Se désinscrire en un clic : ${LIEN_DESINSCRIPTION}` },
]

const p = (texte: string): Bloc => ({ type: 'p', texte })
const titre = (texte: string): Bloc => ({ type: 'titre', texte })
const bouton = (label: string, chemin: string): Bloc => ({ type: 'bouton', label, href: `${SITE}${chemin}` })

export const BIENVENUE: Email[] = [
  {
    id: 'bienvenue-1',
    quand: 'Le jour de l’inscription',
    objet: 'Votre calendrier du gazon, mois par mois',
    apercu: 'Le guide en PDF, et ce que vous recevrez ensuite.',
    blocs: [
      p('Bonjour,'),
      p('Votre inscription à la lettre du jardin est enregistrée. Le calendrier du gazon vous attend : trois gestes par mois pour la pelouse, plus celui du robot.'),
      bouton('Ouvrir mon calendrier', '/calendrier-du-gazon'),
      p('Sur la page, choisissez votre région et l’exposition de la pelouse : les gestes s’ajustent. Le guide en PDF (8 pages) est réglé pour l’ouest et la plaine, pelouse au soleil. Il s’imprime en A4.'),
      bouton('Télécharger le guide en PDF', '/guides/calendrier-du-gazon.pdf'),
      titre('Ce que vous recevrez'),
      p('Deux autres e-mails cette semaine : le réglage de la hauteur de tonte, puis le choix d’un robot. Ensuite, une lettre par mois au plus, au début du mois, avec les gestes du moment.'),
      p('Chaque geste nomme sa source : SEMAE, FREDON, la Société nationale d’horticulture, Husqvarna pour le robot. Nous ne les avons pas essayés nous-mêmes. Les mois sont des repères, le vrai signal est la température du sol : la pousse démarre vers 8 °C.'),
    ],
  },
  {
    id: 'bienvenue-2',
    quand: '3 jours après l’inscription',
    objet: 'Hauteur de tonte : la règle du tiers',
    apercu: '5 à 6 cm en saison, 7 à 8 cm l’été, et un produit à laisser en rayon.',
    blocs: [
      p('Bonjour,'),
      p('Une règle revient dans deux de nos sources, SEMAE et FREDON : ne jamais couper plus d’un tiers de la hauteur de l’herbe en une tonte.'),
      titre('Quelle hauteur viser'),
      p('Les sources ne sont pas d’accord entre elles. SEMAE donne 1 à 3 cm pour un gazon d’ornement, FREDON 5 cm au moins, Jardiner autrement 10 cm en été. Notre calendrier retient un milieu :'),
      {
        type: 'liste',
        items: [
          '5 à 6 cm en saison ;',
          '7 à 8 cm l’été ou en terrain sec ;',
          '6 à 8 cm pour la dernière tonte avant l’hiver, selon Husqvarna.',
        ],
      },
      p('Après l’hiver, commencez haut, puis baissez la coupe par paliers. Et laissez l’herbe coupée sur place : elle rend de l’azote au sol, d’après Jardiner autrement.'),
      titre('À éviter'),
      p('Le sulfate de fer contre la mousse. La fiche FREDON le déconseille et propose d’aérer le sol, puis de chauler légèrement à l’automne. D’après la même fiche, la mousse signale un sol acide, tassé ou à l’ombre.'),
      titre('Si vous avez un robot'),
      p('Une herbe effilochée ou blanchie au bout signale des lames usées, selon le guide Husqvarna. Sur un Automower, elles se changent toutes les 3 à 6 semaines en saison. Pour une autre marque, la notice du modèle passe avant ce conseil.'),
      bouton('Voir les gestes du mois', '/calendrier-du-gazon'),
    ],
  },
  {
    id: 'bienvenue-3',
    quand: '7 jours après l’inscription',
    objet: 'Choisir un robot tondeuse sans se tromper de taille',
    apercu: '4 questions, 2 minutes, et la marge à prendre sur la surface.',
    blocs: [
      p('Bonjour,'),
      p('Dernier e-mail de bienvenue. Si vous tondez encore à la main ou si votre robot arrive en fin de vie, voici comment nous aidons à choisir.'),
      p('D’abord, ce que nous ne faisons pas : nous n’essayons pas les robots. Nos avis comparent les fiches des fabricants, les essais publiés par la presse et les retours de propriétaires, et le disent à chaque fois.'),
      titre('Commencer par le jardin'),
      p('Le quiz pose 4 questions sur votre terrain et donne un résultat en 2 minutes.'),
      bouton('Faire le quiz', '/quiz'),
      p('La surface annoncée par un fabricant est un maximum. Prenez 20 à 30 % de marge : pour 600 m² de pelouse, visez un robot donné pour 750 m² environ. L’outil de surface fait le calcul pour vous.'),
      bouton('Mesurer ma surface', '/superficie'),
      titre('À éviter'),
      p('Acheter sur une promotion sans regarder le prix des semaines d’avant. Notre page des codes promo n’affiche un code qu’après l’avoir contrôlé, avec sa date. Quand nous n’avons rien de confirmé, elle l’écrit.'),
      bouton('Voir les codes contrôlés', '/code-promo'),
      p('La suite arrive au début du mois prochain : les gestes du mois pour la pelouse.'),
    ],
  },
]

/** Lien de saison ajouté à la lettre du mois (0 = janvier). Uniquement des pages qui existent. */
const LIEN_SAISON: Record<number, { phrase: string; label: string; chemin: string }> = {
  0: { phrase: 'Le robot passe l’hiver à l’intérieur. La fiche à imprimer reprend les 7 étapes.', label: 'La fiche hivernage', chemin: '/fiche-hivernage-robot-tondeuse' },
  1: { phrase: 'C’est le bon mois pour choisir un robot avant la reprise de la tonte.', label: 'Faire le quiz', chemin: '/quiz' },
  2: { phrase: 'La tonte reprend. Si vous hésitez encore sur un robot, le quiz pose 4 questions.', label: 'Faire le quiz', chemin: '/quiz' },
  9: { phrase: 'Le rangement du robot approche. La fiche à imprimer reprend les 7 étapes.', label: 'La fiche hivernage', chemin: '/fiche-hivernage-robot-tondeuse' },
  10: { phrase: 'C’est le mois du rangement. La fiche à imprimer reprend les 7 étapes.', label: 'La fiche hivernage', chemin: '/fiche-hivernage-robot-tondeuse' },
  11: { phrase: 'Le robot passe l’hiver à l’intérieur. La fiche à imprimer reprend les 7 étapes.', label: 'La fiche hivernage', chemin: '/fiche-hivernage-robot-tondeuse' },
}

/** Offre confirmée à citer dans la lettre : elle doit exister dans lib/promos.ts, avec sa date de contrôle. */
export interface OffreConfirmee {
  texte: string
  /** Chemin d'une page du site (/code-promo/<marque>, /black-friday-robot-tondeuse). */
  chemin: string
  /** Date du contrôle, AAAA-MM-JJ. */
  verifiedAt: string
}

function avecSource(g: Geste): string {
  if (g.indicatif || g.sources.length === 0) return `${g.texte} (repère indicatif, sans source lue)`
  const noms = [...new Set(g.sources.map((s) => NOM_SOURCE[s] ?? s))]
  return `${g.texte} (source : ${noms.join(', ')})`
}

const dateFr = (iso: string): string => {
  const [a, m, j] = iso.split('-')
  return `${j}/${m}/${a}`
}

/**
 * Lettre du mois (0 = janvier) : 3 gestes pour la pelouse, 1 pour le robot, tirés du calendrier.
 * Sans offre confirmée, la lettre ne parle d'aucune promotion.
 */
export function lettreDuMois(mois: number, offre?: OffreConfirmee): Email {
  const m = MOIS[mois]
  if (!m) throw new Error(`mois inconnu : ${mois}`)
  const nom = m.nom.toLowerCase()
  const saison = LIEN_SAISON[mois]
  const blocs: Bloc[] = [
    p('Bonjour,'),
    p(`Voici les gestes ${/^[aeo]/.test(nom) ? 'd’' : 'de '}${nom} pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.`),
    titre('Pour la pelouse'),
    { type: 'liste', items: m.gestes.map(avecSource) },
    titre('Pour le robot'),
    p(avecSource(m.robot)),
    bouton('Régler le calendrier sur ma région', '/calendrier-du-gazon'),
  ]
  if (saison) blocs.push(p(saison.phrase), bouton(saison.label, saison.chemin))
  if (offre) {
    blocs.push(titre('Offre contrôlée'), p(`${offre.texte} Contrôlé le ${dateFr(offre.verifiedAt)}. Une offre peut s’arrêter sans préavis : vérifiez le prix chez le marchand.`), bouton('Voir le détail', offre.chemin))
  }
  return {
    id: `lettre-${String(mois + 1).padStart(2, '0')}`,
    quand: `Début ${nom}`,
    objet: `À faire en ${nom} : ${m.theme.toLowerCase()}`,
    apercu: 'Trois gestes pour la pelouse, un pour le robot.',
    blocs,
  }
}

/** Version texte d'un e-mail, pied compris. Sert à la relecture et à la version sans images. */
export function enTexte(email: Email): string {
  const lignes = [...email.blocs, ...PIED].map((b) => {
    if (b.type === 'titre') return `## ${b.texte}`
    if (b.type === 'liste') return b.items.map((i) => `- ${i}`).join('\n')
    if (b.type === 'bouton') return `[${b.label}] ${b.href}`
    return b.texte
  })
  return lignes.join('\n\n')
}
