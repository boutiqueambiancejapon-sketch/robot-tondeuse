/**
 * pieces.ts — « la pièce qu'il faut » des articles de dépannage (carte des conversions, lot 1, D7).
 * Le lecteur a déjà un robot : on lui montre la pièce qui règle sa panne, jamais un robot neuf.
 * Fonction pure : aucune lecture de fichier, rien d'affiché (voir components/blog/Encart.tsx).
 *
 * Le lien passe par /go/<piece>/amazon et mène à une recherche Amazon : une pièce dépend du modèle
 * du robot, et nous n'affichons pas une référence précise que nous n'avons pas vérifiée.
 * Aucun prix : il ne serait pas daté.
 */
export const PIECE_KEYS = ['lames', 'cable', 'batterie'] as const
export type PieceKey = (typeof PIECE_KEYS)[number]

export type Piece = {
  /** Mots cherchés chez le marchand. */
  recherche: string
  titre: string
  texte: string
  bouton: string
  /** Repère un encart produit de l'auteur qui montre déjà cette pièce. */
  dejaCitee: RegExp
}

export const PIECES: Record<PieceKey, Piece> = {
  lames: {
    recherche: 'lames robot tondeuse',
    titre: 'Des lames neuves pour votre robot',
    texte:
      'Relevez trois cotes sur vos lames avant de commander : l’épaisseur, la longueur et le diamètre du trou de fixation. Les robots à couteaux fixes (Mammotion, Segway Navimow) n’acceptent que les pièces de leur marque.',
    bouton: 'Voir les lames sur Amazon',
    dejaCitee: /lame/i,
  },
  cable: {
    recherche: 'câble périphérique robot tondeuse connecteurs étanches',
    titre: 'Du câble et des connecteurs étanches',
    texte:
      'Une coupure se répare avec un tronçon de câble neuf et deux connecteurs prévus pour la terre humide. Prenez le raccord d’origine si votre marque en vend un : c’est celui que décrit sa notice.',
    bouton: 'Voir les connecteurs sur Amazon',
    dejaCitee: /c[âa]ble|connecteur|raccord/i,
  },
  batterie: {
    recherche: 'batterie robot tondeuse',
    titre: 'Une batterie de rechange',
    texte:
      'Relevez la référence, la tension et la capacité inscrites sur la batterie d’origine avant de commander. Évitez les batteries à 25 € annoncées à 5 Ah : la capacité réelle est souvent bien plus basse.',
    bouton: 'Voir les batteries sur Amazon',
    dejaCitee: /batterie/i,
  },
}

export function isPieceKey(value: string): value is PieceKey {
  return (PIECE_KEYS as readonly string[]).includes(value)
}

/** Adresse à mettre dans la page : le clic est compté dans les journaux du serveur, sans cookie. */
export function pieceHref(piece: PieceKey): string {
  return `/go/${piece}/amazon`
}

/** Recherche Amazon (sans étiquette : la route /go l'ajoute). */
export function pieceSearchUrl(piece: PieceKey): string {
  return `https://www.amazon.fr/s?k=${encodeURIComponent(PIECES[piece].recherche)}`
}

/** L'ordre compte : « ne charge plus » parle d'abord de la batterie, même si le câble y est cité. */
const PAR_ADRESSE: [RegExp, PieceKey][] = [
  [/^lames-/, 'lames'],
  [/^batterie-robot-tondeuse|ne-charge-plus/, 'batterie'],
  [/^cable-peripherique/, 'cable'],
  [/entretenir-son-robot/, 'lames'],
]

/**
 * La pièce qui règle le problème de l'article, d'après son adresse. `null` si aucune pièce
 * ne s'impose (nettoyage, hivernage, installation, emplacement de la station) : pas d'encart.
 */
export function pieceForSlug(slug: string): PieceKey | null {
  const s = slug.toLowerCase()
  return PAR_ADRESSE.find(([motif]) => motif.test(s))?.[1] ?? null
}

/** L'auteur a-t-il déjà posé un encart produit pour cette pièce dans le texte ? */
export function pieceAlreadyShown(piece: PieceKey, content: string): boolean {
  const noms = [...content.matchAll(/<ProductCTA\b[^>]*?\bname="([^"]*)"/g)].map((m) => m[1])
  return noms.some((nom) => PIECES[piece].dejaCitee.test(nom))
}
