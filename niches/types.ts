/**
 * niches/types.ts — formes communes à tous les sites du moteur (tasks/usine-produits.md § « Site modèle de base »).
 * Un seul code, un dossier par site : niches/<site>/ ne contient que des réglages et des données.
 * Le site lu est choisi par NEXT_PUBLIC_SITE (niches/index.ts), Quel Robot Tondeuse par défaut.
 */

export type NicheConfig = {
  // Identité
  siteName: string
  domain: string
  tagline: string

  // Vocabulaire de la niche
  entity: string          // "produit", "destination", "carte"
  entities: string        // pluriel
  entityVerb: string      // "acheter", "explorer", "souscrire"
  dealWord: string        // "deals", "bons plans", "offres"

  // Hero
  heroPrefix: string      // "Choisir votre"
  heroSuffix: string      // "en 10 minutes"
  rotatingWords: string[] // ["iPhone", "Mac"] → ["vol", "hôtel"]
  subtitle: string
  ctaPrimary: { text: string; url: string }
  ctaSecondary: { text: string; url: string }

  // Catégories (1 couleur accent par catégorie)
  categories: {
    slug: string
    label: string
    accent: string // hex color
    description?: string
  }[]

  // Outils
  quiz: {
    enabled: boolean
    question: string        // "Quel iPhone pour vous ?"
    criteria: string[]      // ["budget", "usage", "taille"]
  }
  comparator: {
    enabled: boolean
    criteria: string[]      // ["prix", "performance", "photo"]
  }
  simulator: {
    enabled: boolean
    title: string           // "Calculer votre budget Apple"
    description: string
  }

  // DA
  palette: {
    accent1: string
    accent2: string
    accent3: string
    accent4: string
    accent5: string
    bgPrimary: string
    bgSurface: string
    bgSurface2: string
    textPrimary: string
    textSecondary: string
    textMuted: string
  }
  fonts: {
    display: string   // Google Fonts family name
    body: string      // Google Fonts family name
  }

  // Auteur
  author: {
    name: string
    slug: string
    title: string
    bio: string
    tone: string[]          // ["direct", "honnête", "expert"]
    noGo: string[]          // ["révolutionnaire", "incroyable"]
    formulations: string[]  // ["Honnêtement,", "Le vrai tip :"]
    photo?: string          // chemin relatif depuis public/ — ex: '/images/auteur-portrait.webp'
  }

  // Affiliation
  affiliateTag: string     // "monsite-21"
  defaultStore: string     // "Amazon"

  // Langue & i18n
  defaultLocale: string    // "fr"
  locales: string[]        // ["fr"] — ajouter "en" quand la traduction est prête

  // Technique
  vercelRegion: string     // "fra1"
  repo: string             // "org/repo"
  branch: string           // branche principale — PAS toujours "main" ! Le CMS l'utilise pour lire/écrire le contenu.
}

/** Une caractéristique publiée d'un produit, dans l'ordre du tableau de la fiche. */
export type Caracteristique = { id: string; label: string; unite?: string }

/** Source datée d'une donnée (fiche du fabricant, notice, flux marchand). */
export type SourceDatee = { label: string; url: string; lu_le: string }

/**
 * Produit du catalogue d'un site servi par le gabarit commun (fiche, puis classement, collection, duel).
 * Aucune donnée inventée : une valeur inconnue vaut null, jamais 0.
 */
export type ProduitCatalogue = {
  id: string
  marque: string
  modele: string
  /** Premier segment de l'adresse de la fiche : /<categorie>/<id>. */
  categorie: string
  /** Ligne « pour qui » de l'essentiel, tirée des caractéristiques publiées. */
  pourQui?: string
  caracteristiques: Record<string, number | string | null>
  prix_eur: number | null
  prix_lu_le: string | null
  /** Qui publie ce prix : « prix public Marque », « Amazon », etc. */
  prix_source: string | null
  asin: string | null
  /** Adresse marchand hors Amazon (Awin…) ; passe par /go/ comme les autres. */
  lienMarchand?: { marchand: string; url: string } | null
  sources: SourceDatee[]
  faq?: { q: string; r: string }[]
  /** Données d'exemple du site modèle : bandeau « exemple » sur la fiche, jamais en ligne. */
  exemple?: boolean
}

/** Palier d'un critère : à partir de `des` (ou jusqu'à `des` si le critère est « plus bas = mieux »), `points`. */
export type Palier = { des: number; points: number }

/** Critère public de la note sur 10 : une caractéristique, ses paliers, son maximum. */
export type CritereBareme = {
  id: string
  titre: string
  /** Identifiant de la caractéristique lue. */
  champ: string
  max: number
  /** haut : plus la valeur est grande, mieux c'est ; bas : l'inverse (bruit, prix, poids). */
  sens: 'haut' | 'bas'
  paliers: Palier[]
}

export type Bareme = {
  criteres: CritereBareme[]
  /** Sous ce pourcentage de points connus, pas de note (même règle que lib/note-objective.ts). */
  confianceMin: number
}

/** Collection par critère : un filtre sur les caractéristiques (≥ 4 modèles pour ouvrir une page). */
export type CollectionDef = { id: string; label: string; champ: string; min?: number; max?: number }

/** Programme partenaire, dans l'ordre de préférence (Amazon d'abord). */
export type Partenaire = { id: string; nom: string; tag?: string; actif: boolean }

/**
 * Ce que le gabarit commun lit pour un site. `fiches` est null tant que les fiches du site restent
 * des articles (QRT : avis MDX) ; le gabarit ne sert alors aucune adresse nouvelle.
 */
export type FichesSite = {
  catalogue: ProduitCatalogue[]
  caracteristiques: Caracteristique[]
  bareme: Bareme
  collections: CollectionDef[]
}

export type SiteNiche = {
  id: string
  site: NicheConfig
  /** false : site modèle ou de recette, jamais indexé. */
  indexable: boolean
  partenaires: Partenaire[]
  fiches: FichesSite | null
}
