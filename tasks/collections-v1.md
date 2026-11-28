# Collections longue traîne (chantier du 28/11/2026, priorité n° 1 de l'équipe)

Décision du propriétaire (28/11/2026), inspirée de quel-canape.fr (post d'Affiseo du 13/11/2026 : 22 → 275 visites par jour depuis
ChatGPT en un mois, 12,5 clics marchands pour 100 visites IA contre 7,3 pour Google). Accord sur : robots tondeuses d'abord, robots
piscine ensuite ; adresses `/robot-tondeuse/<critères>/` ; 3 à 5 pages par nuit.

## 1. Base produits (agent Catalogue QRT)

Fichier unique `data/robots-tondeuses.json` (un objet par modèle vendu en France en 2026, 100 à 150 visés) :

| Champ | Exemple | Source obligatoire |
|---|---|---|
| `id`, `marque`, `modele` | `mammotion-luba-2-awd-3000` | page officielle |
| `surface_m2` | 3000 | fiche technique officielle |
| `pente_pct` | 80 | idem |
| `guidage` | `fil` · `rtk` · `vision` · `lidar` · `rtk+vision` | idem |
| `sans_fil` | true | déduit du guidage |
| `transmission` | `2rm` · `4rm` | idem |
| `connectivite` | `["wifi","bluetooth","4g"]` | idem |
| `bruit_db`, `largeur_coupe_cm`, `hauteur_coupe_mm`, `autonomie_min`, `zones_max`, `ip` | | idem |
| `prix_eur` | 1899 | prix public conseillé de la marque, daté ; prix du jour : API Amazon / flux Awin (jamais écrit à la main) |
| `asin`, `awin` | | API Amazon Creators (`scripts/amazon-cherche.mjs`), flux Awin |
| `sources` | `[{url, lu_le}]` | — |

Règles : une valeur sans source reste vide (jamais devinée) ; « analysé », jamais « testé » ; un modèle arrêté reste avec `arrete: true`.

## 2. Moteur de collections (Dév QRT)

- Familles de critères (une valeur par famille au plus) : surface (≤ 500, 1000, 1500, 2000, 3000, 5000 m²), pente (≥ 35, 45, 70 %),
  guidage (fil, sans fil, RTK, vision, LiDAR), 4 roues motrices, 4G/antivol, silencieux (≤ 58 dB), budget (< 500, 800, 1000, 1500, 2000 €),
  marque, usage (petit jardin, grand terrain, terrain en pente, jardin complexe multi-zones).
- Une page existe dès que **4 modèles réels** correspondent, de 1 à 3 critères combinés. Le volume de recherche décide l'ORDRE, jamais
  l'existence.
- Anti-doublon : une page qui partage ≥ 70 % de ses modèles avec une page existante n'est pas créée ; titre, H1 et requête cible uniques ;
  similarité de texte faible (blocs de 6 mots) ; liens vers et depuis les pages sœurs.
- Une page naît en `noindex`, hors plan du site ; elle devient indexable quand son texte, sa FAQ et son illustration sont écrits et relus.
- Rythme : 3 à 5 pages par nuit (après la rédaction de nuit, quota Claude gardé, voir `equipe.md`).
- Adresse : `/robot-tondeuse/<slug-des-critères>/` (ex. `/robot-tondeuse/sans-fil-1000-m2/`, `/robot-tondeuse/pente-45-moins-1000-euros/`).

## 3. Anatomie d'une page (ce qu'une IA cite)

1. H1 = la question exacte (« Quel robot tondeuse sans fil pour 1000 m² ? »).
2. Résumé chiffré : note moyenne /10 · nombre de modèles analysés · prix médian · mis à jour le …
3. « L'essentiel en 30 secondes » : réponse autonome, 3 à 5 puces.
4. Grille notée des modèles (barème public `lib/bareme.ts`), bouton marchand suivi (`/go/…`), prix du jour daté.
5. Comparaison critère par critère avec tout le catalogue.
6. Un outil : « ce robot convient-il à mon jardin ? » (surface, pente, zones).
7. FAQ (FAQPage), ItemList, Product/Offer, BreadcrumbList ; méthode et date.

## 3 bis. Graphe radar sur chaque fiche produit et chaque collection (propriétaire, 28/11/2026)

> « quel-canape ajoute à chaque page produit un graphe radar »

- Fiche robot (`/avis-…`, fiches produits) : radar à 6 axes, notés de 0 à 10 par rapport à TOUT le catalogue (rang centile, pas un avis) :
  surface couverte, pente, silence (dB inversés), autonomie, connectivité et antivol (4G, GPS, app), prix (inversé : moins cher = plus haut).
  Deux tracés : le robot (couleur d'accent du site) et la médiane du catalogue (gris). Un axe sans donnée sourcée n'est pas tracé (jamais 0 inventé).
- Collection : le même radar en petit sur chaque carte, et un radar « médiane de la collection contre médiane du catalogue » en haut.
- Rendu serveur en SVG dans le HTML (lisible sans JS par Google et les IA), `role="img"` + `aria-label` qui dit les 6 notes, et un tableau
  repliable avec les mêmes valeurs (citable). Couleurs : variables CSS du site uniquement, contraste vérifié, `prefers-reduced-motion` respecté.
- Composant unique (≤ 150 lignes), calcul dans `lib/` (fonction pure testée), barème expliqué sur `/comment-on-note` (« comparé à N robots analysés »).
- **Comparaison superposée (propriétaire, 28/11/2026)** : sur la même fiche, le visiteur ajoute 2 ou 3 autres robots au radar, chacun avec
  sa couleur, tracés par-dessus. Par défaut, 2 concurrents proposés (même collection principale, prix le plus proche) ; un sélecteur
  (recherche par nom, 3 au plus) en ajoute ou en retire. Légende cliquable, tableau des valeurs à côté (une colonne par robot) et bouton
  marchand de chaque robot comparé. Le rendu par défaut (robot + 2 concurrents) est servi par le serveur ; seul l'ajout ou le retrait
  est en JavaScript (sous-composant client, jamais la page). Adresse partageable : `?vs=<id>,<id>` (canonical sans paramètre).
  Couleurs : 4 au plus, distinctes pour les daltoniens (variables CSS du site), motif de trait différent en plus de la couleur.
  Même système sur les pages duels (`/<a>-vs-<b>`) : le radar à deux tracés remplace le tableau seul en haut de page.
- Dév QRT : dès que `data/robots-tondeuses.json` a au moins 30 modèles ; capture 390 px envoyée au propriétaire avant la mise en ligne générale.

## 3 ter. Note objective et données structurées de chaque fiche (propriétaire, 28/11/2026)

> « Pour les fiches produits il faudra qu'on donne une note objective et donc les données structurées ultra optimisées pour les IA. »

**Note sur 10** (affichée « 7,8/10 »), calculée par `lib/bareme.ts` (barème public, déjà écrit) à partir de `data/robots-tondeuses.json`
(plus `lib/comparateur.ts`) :
- Seulement les caractéristiques publiées par la marque, jamais d'essai ni d'avis : « analysé », jamais « testé ».
- **Indice de confiance** = part du barème couverte par des données sourcées (ex. bruit non publié chez Mammotion = 10 points sur 100
  manquants → confiance 90 %). Le barème est recalculé sur les critères disponibles. Aucune note sous 60 % de confiance ; aucun badge
  « meilleur choix » sous 80 %. La confiance s'affiche à côté de la note (« confiance 90 % : bruit non publié »).
- Sous `SEUIL_PROPOSER_MIEUX`, la fiche propose de meilleurs choix au lieu de vendre le robot (règle existante).
- Détail par critère visible (points obtenus / points max, phrase du palier) et lien vers `/comment-on-note`. Même note partout
  (fiche, collections, classements, radar), une seule fonction.

**En haut de la fiche, ce qu'une IA cite** : « Note 7,8/10 · rang 12 sur 53 robots analysés · 2 899 € (prix du jour, Amazon, le …) »,
puis « L'essentiel en 30 secondes » (pour qui, pour quelle surface et quelle pente, le point fort, le point faible, l'alternative).

**Données structurées (JSON-LD), rendues serveur, toutes vraies** :
- `Product` : name, brand (`Brand`), model, sku/gtin si publiés, image, description, `additionalProperty` = une `PropertyValue` par
  caractéristique (surface max en m² avec `unitCode` MTK, pente en %, bruit en dB, autonomie en minutes, guidage, 4G…) : c'est ce que
  les IA reprennent.
- `offers` : `Offer` ou `AggregateOffer` (lowPrice/highPrice/offerCount) des marchands réellement relevés, `priceCurrency` EUR,
  `availability`, `priceValidUntil` (date du relevé + 1 jour), `url` = lien suivi `/go/…`. Aucun prix sans relevé daté.
- `review` : une `Review` éditoriale du site (author `Organization` Quel Robot Tondeuse, `reviewRating` ratingValue sur 10, bestRating 10,
  worstRating 0, datePublished/dateModified) ; JAMAIS d'`aggregateRating` (nous n'avons pas d'avis clients).
- `FAQPage` (3 à 6 vraies questions), `BreadcrumbList`, `WebPage` avec `dateModified` et `speakable` (résumé et essentiel), `Organization`
  et auteur réel (Mathias) avec page à propos ; `ItemList` sur les collections et classements.
- Contrôle : test automatique qui valide le JSON-LD de 5 fiches (champs obligatoires, aucun champ vide ou inventé) et l'outil Rich Results
  de Google sur 3 fiches avant mise en ligne générale.

Ordre (Dév QRT) : après la mise en ligne du radar ; une fiche pilote (LUBA 3 AWD 3000) en capture au propriétaire, puis toutes les fiches
reliées à la base.

## 4. Bing et IndexNow (Dév QRT, avant la première collection)

- IndexNow automatique : file vérifiée toutes les 15 min, envoi seulement si le contenu utile change (empreinte du `<main>`), 1 fois par
  heure au plus par adresse, passage complet du plan du site à l'aube. Clé à la racine.
- Bing Webmaster Tools : site vérifié, plan du site soumis (le propriétaire valide le compte si besoin).
- Robots : `robots.txt` ET réponse réelle du serveur contrôlés chaque matin pour OAI-SearchBot, ChatGPT-User, PerplexityBot,
  Claude-SearchBot, Claude-User, Bingbot, Googlebot (200 vérifié le 28/11/2026 sur une page d'article).

## 5. Mesure

Visites venues des IA (référent chatgpt.com, perplexity.ai, claude.ai, gemini, copilot ; `utm_source=chatgpt.com`), clics marchands
pour 100 visites IA contre Google, pages d'arrivée IA. Alimente le futur tableau de bord commun (chantier « tableaux de bord »).

## Ordre

1. Catalogue QRT : base produits (plusieurs passages, marques par marques : Mammotion, Segway Navimow, Husqvarna, Worx, Gardena, Bosch,
   Ecovacs, Dreame, Stiga, Ambrogio, Kress, Sunseeker, Yarbo…).
2. Dév QRT : IndexNow + mesure IA, puis moteur de collections et gabarit de page (maquette au propriétaire seulement si le design change).
3. Contenu QRT : textes, FAQ et relecture de chaque collection avant indexation.
4. Ensuite : robots piscine, même méthode.
