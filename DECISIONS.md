# Décisions : Quel Robot Tondeuse

## Architecture
- [x] Next.js ~16.2.1 patch auto, Vercel fra1
- [x] Tailwind v4.2.2 + variables CSS
- [x] Langue FR uniquement, pas de segment [locale], routes racine
- [x] Configuration centralisée dans `niche.config.ts`
- [x] Catégories dynamiques via `CategorySection`
- [x] CMS portable dans `packages/cms/`

## DA Atelier Vert (avril 2026 — light only)

**Identité** : `Quel Robot Tondeuse — Tests · Comparatifs · Outils`. Univers jardin premium, indépendant, expert. Ton chaleureux serif + accents copper.

**Palette** :
- `--paper` `#fbf8f0` · fond global
- `--ivory` `#faf6ec` · cartes
- `--cream` `#f5efe1` · cartes secondaires
- `--copper` `#b8623d` · CTA primaire / liens affiliés (= `--accent-1`)
- `--copper-bright` `#d97742` · hover / highlight (= `--accent-4`)
- `--moss` `#3a5a3d` · vert secondaire / success (= `--accent-2`)
- `--forest-deep` `#1a2e1f` · ancrage sombre / hero / nav scrolled (= `--accent-3`)
- `--sage` `#8ba88e` · soft accent (= `--accent-5`)
- Compat aliases `--bg-primary`, `--bg-surface`, `--accent-1..5` conservés pour ne pas casser les composants existants.

**Fonts** :
- Display : **Instrument Serif** 400 + italic — H1/H2/H3 + lettrine
- Body : **Inter** 400/500/600/700 — corps + UI
- Mono : **JetBrains Mono** 400/500/600 — eyebrow, prix, specs, table headers

**Effets** :
- Aurora : moss → copper → forest (animé sur hero)
- Noise : 0.025 (très subtil)
- Glass : ivory 80%, blur 14px
- Shadows : warm rgba(26,46,31,...)

**Catégories accents (Atelier Vert harmonisé)** :
- mammotion `#3a5a3d` (moss)
- husqvarna `#b8623d` (copper)
- gardena `#8ba88e` (sage)
- worx `#d97742` (copper-bright)
- bosch `#1a2e1f` (forest-deep)
- entretien-pelouse `#243b2a` (forest)

## Light only — pas de dark mode

Décision avril 2026 : le site est **light only**. Suppression des blocs `@media (prefers-color-scheme: light)` et `html[data-theme="..."]`. Le ThemeToggle sera retiré au Batch 2. Justification : la DA Atelier Vert (paper/ivory/forest) repose sur le contraste warm light, le dark mode dénaturerait l'identité.

## Catégories : 6 (extensions prévues)

Actuel : Mammotion, Husqvarna, Gardena, Worx, Bosch, entretien-pelouse.
Prévu (Batch 5+) : Stihl, Segway Navimow, Ecovacs, Dreame, Mova, Ambrogio, Kress (hubs marques placeholder).

## Architecture menu (Batch 2)

5 entrées top niveau :
1. **Comparatifs** — Top 2026 / Q-P / Pas cher / Premium / Sans fil périphérique / Silencieux / Connecté
2. **Par jardin** — Petit / 500m² / 1000m² / 2000m² / Grande surface / Pente / Terrain complexe / Multi-zones
3. **Marques** — grille logos + index marques
4. **Guides & conseils** — Comment choisir / Installation / Entretien / Hivernage / Dépannage / Sécurité enfants-animaux / Robot vs thermique / Réglementation FR
5. **Outils** — Quiz / Calculateur surface (Leaflet) / Comparateur / Calculateur rentabilité

Mobile : drawer plein écran + bottom nav fixe 4 icônes (Accueil · Comparatifs · Quiz · Recherche).

## Outils interactifs

- `/quiz` — existant, à restyler en DA
- `/superficie` — Leaflet + Esri World Imagery + Nominatim (geocoding) + turf.js (aire géodésique). Sans clé API, RGPD-friendly. Slug retenu pour SEO.
- `/comparer` — existant, à restyler
- `/calculateur-rentabilite-robot-tondeuse` — nouveau, calcul amortissement vs thermique. Slug long pour ranker sur "calculateur rentabilité robot tondeuse".

## Ton éditorial

Pas de tirets cadratins. Ton direct et naturel, pas lissé. Phrases courtes. On tutoie pas mais on reste accessible. Formulations Thomas : « Concrètement, », « Le vrai critère : », « Sur le terrain, ».

## Section backgrounds

Variables CSS `--paper`, `--ivory`, `--cream` (et leurs alias `--bg-primary`, `--bg-surface`, `--bg-surface-2`) en alternance. Sections sombres (hero, footer) sur `--forest-deep`. Pas de fond hardcodé.

## Affiliation

Tag : `ambiancejap0a-21`. Tout lien Amazon passe par `addAffiliateTag()` ou `<AffiliateLink>`. **ASIN obligatoire et vérifié avant tout lien** — jamais de 404 affilié.

## Migration historique (avril 2026)

Branche `claude/review-design-files-HKwEE`. Migration en 8 batches commit par commit (1A → 8). Préservation totale des 51 articles existants, slugs conservés ou redirigés en 301.

## Hébergement VPS (novembre 2026)
- [x] Site servi par le VPS (Caddy + systemd), plus par Vercel : `@vercel/analytics` et `vercel.json` retirés, CSP sans `vitals.vercel-insights.com`. `@vercel/blob` et le CMS restent (retrait prévu plus tard) ; aucune page publique n'en dépend (images dans `public/`).
- [x] Next.js 16.4.5 (failles 16.1/16.2 corrigées), `sharp` déclaré (images de partage).
- [x] Images de partage par `next/og`, JPEG 1200×630, DA Atelier Vert : `lib/og/` (gabarit `ShareCard`, polices Schibsted/Hanken en WOFF dans `assets/og/fonts/`, données réelles de l'article : format, modèles cités par `<ProductCTA>`, prix d'appel, durée de lecture). Routes : `app/opengraph-image.tsx`, `app/(site)/[article]/opengraph-image.tsx`, `app/(site)/blog/[categorie]/opengraph-image.tsx`. Les pages qui déclarent leur propre `openGraph` passent `DEFAULT_OG_IMAGES`, sinon Next.js perd l'image du parent. `twitter:image` hérite de `og:image`.

## 13/11/2026 — Fiche « Hivernage du robot » (lot 2, G2)
- Route `/fiche-hivernage-robot-tondeuse` (les adresses `hivernage-robot-tondeuse` et `comment-hiverner-son-robot-tondeuse` sont des articles).
- Fonds : page `var(--paper)`, cartes d'étapes `var(--ivory)` bordées, comme `/superficie`. Aucune animation.
- Impression : `@media print` dans globals.css, limité aux pages qui ont `.fiche-print` ; menu, pied de page, barre du bas et boutons masqués. Réutilisable pour le guide PDF du calendrier.
- Contenu dans `lib/content/fiche-hivernage.ts`, chaque geste avec sa source (Husqvarna S2/S3, Hubo S8).

## 14/11/2026 — Inscription à « La lettre du jardin » (lot 2, G3)
- Liste Brevo séparée « Quel Robot Tondeuse » créée dans le compte de Toutou (numéro 6, dossier 1). Le numéro est fixé dans `lib/newsletter/brevo.ts` (pas une variable) : un copier-coller des réglages de Toutou ne peut pas inscrire sur la liste de Toutou.
- `POST /api/inscription` : consentement obligatoire (`consentement: true`), champ piège `website`, aucune adresse stockée ni journalisée par le site. 503 tant que `BREVO_API_KEY` manque dans l'environnement du serveur. Pas de double confirmation : il faut un expéditeur sur le domaine (DNS bloqué).
- `<InscriptionLettre>` : case non cochée, lien `/confidentialite`. Affiché en bas de `/fiche-hivernage-robot-tondeuse` seulement si la clé est présente au build (le build du serveur lit `shared/.env`). Fond : carte `var(--ivory)` bordée sur `var(--paper)`, comme les étapes ; bouton cuivre comme « Imprimer ». Masqué à l'impression.
- `/confidentialite` réécrite : lettre (Brevo, base légale, désinscription, 3 ans sans ouverture), comptage sans cookie, journaux du serveur, liens marchands. « Données analytiques 24 mois » retiré (plus d'outil d'analyse). Nom et e-mail du responsable toujours « [À compléter] ».

## Type de page par article (15/11/2026, lot 1 étape D4)

- Champ `pageType` sur `ArticleMeta` et `StandaloneArticleMeta` : guide-achat, comparatif, depannage, gazon, reglementation. Calculé par `lib/utils/page-type.ts` (fonction pure, testée).
- Ordre : `pageType` de l'en-tête MDX, puis l'adresse (réglementation, comparatif, guide d'achat, dépannage, gazon), puis la catégorie, puis guide d'achat par défaut. La catégorie seule ne suffit pas : « astuces » contient 107 articles de tous types.
- Entretien du robot, installation et hivernage sont classés « depannage » : le lecteur a déjà un robot, l'objectif est la pièce ou le carnet d'entretien.
- Rien d'affiché à cette étape. Les encarts par type arrivent avec D5.

## 15/11/2026 — Outil « Calendrier du gazon » (lot 2, G4)
- Route `/calendrier-du-gazon`. Contenu dans `lib/content/calendrier-gazon.ts` (fonction pure `construireCalendrier`, testée) ; composant client `components/tools/CalendrierGazon.tsx`.
- 3 questions au lieu de 4 : la surface n'est pas posée, aucune source lue ne fait varier les gestes avec elle.
- Chaque geste affiche sa source. Sans source : mention « repère indicatif » (champ `indicatif`). Un test refuse un geste sans source ni mention.
- Fonds : page `var(--paper)`, cartes des mois et panneau des choix `var(--ivory)` bordés, comme la fiche hivernage. Choix en pastilles (mousse quand actif, 44 px de haut). Mois en cours : bordure cuivre, connu du navigateur seul (`useSyncExternalStore`, pas d'écart à l'hydratation). Aucune animation.
- Rendu serveur : calendrier de référence (ouest, plein soleil, avec robot), lisible sans JavaScript.
- Comptage : événement `calendrier-gazon` ajouté à `lib/utils/mesure.ts`, envoyé au premier choix.

## Encarts d'article (17/11/2026, lot 1 étape D5)
- Au plus un encart au milieu et un en fin d'article, choisis par `pageType` : carte dans `lib/utils/encarts.ts` (guide d'achat et comparatif : marchand puis quiz ; gazon : calendrier puis quiz ; réglementation : calendrier ; dépannage : calendrier en fin, milieu réservé à D7).
- Encart marchand seulement si l'auteur n'a posé aucun `<ProductCTA>` ; il reprend le lien marchand de l'en-tête, sans prix (non daté). Encart de fin retiré si la dernière partie du texte mène déjà au même endroit.
- Milieu = avant le H2 qui ouvre la seconde moitié, posé à la compilation (`lib/plugins/remarkEncartMilieu.ts`), rendu serveur. Moins de 3 H2 : pas d'encart du milieu.
- Fonds : tuiles `.door` existantes (quiz `var(--sage)`, calendrier `var(--copper-pale)`), encart marchand `.card.buy`. Aucune animation.
- Supprimés : `AutoProductCTAs` (2 encarts génériques injectés côté navigateur) et `ToolCTA`.

## Rubrique « Robots de piscine » (18/11/2026)
- Les articles piscine vivent dans `content/articles/robot-piscine/<adresse>.mdx` et s'affichent sous `/robot-piscine/<adresse>` (`lib/piscine.ts`, `app/(site)/robot-piscine/[slug]`). Choix du dossier plutôt que d'un champ d'en-tête : les lecteurs existants ne lisent que les fichiers posés à la racine de `content/articles/`, donc aucune adresse existante ne bouge et un article piscine ne peut pas se glisser dans `/blog`, `/comparatifs` ou l'accueil.
- Type de page propre à la rubrique (`piscinePageType`, `lib/utils/piscine.ts`) : duel ou « X ou Y » → comparatif ; entretien, panne, hivernage → dépannage ; tout le reste → guide d'achat. Guide d'achat et comparatif reçoivent la carte « Notre choix » et le tableau des prix, comme les autres articles.
- Encarts : jamais le calendrier du gazon ni une pièce de robot tondeuse dans un article piscine. Seule la tuile du quiz reste en fin d'article (règle 5 de `tasks/arborescence.md` : chaque rubrique renvoie vers le robot tondeuse).
- Page de rubrique `/robot-piscine` : bandeau `var(--pool)` avec texte blanc (contraste 4,6:1), vague, corps sur `var(--paper)`, tuiles de bassin blanches bordées 1,5 px (active : `var(--pool)`), conseil sur `var(--pool-pale)`, encadré méthode `var(--ink)`, tuile pelouse `var(--sage)`. Mascotte `piscine`. Aucune animation hors la transition de couleur des tuiles.
- Écarts voulus avec la maquette `piscine.html` : pas d'étiquette « Nouvelle rubrique » au-dessus du titre (règle 6 du design V2), pas de cartes produit avec note et prix (exemples inventés), aucune tuile choisie d'avance (tous les articles sont visibles sans JavaScript).
- Bassin d'un article : champ `bassins` de l'en-tête (`hors-sol`, `enterree`, `ligne-eau`, `sans-fil`), sinon lu dans l'adresse. Sans bassin, l'article reste affiché pour tous.
- Article piscine sans image : pas de couverture dans l'article, mascotte piscine dans les listes. Jamais une photo de robot tondeuse.


## Tableau de bord du propriétaire (21/11/2026)
- Tableau de bord sur le domaine du site, à `/dashboard`, porté depuis 10minlanguages.com (lui-même tiré de Toutou Gourmet) : demande du propriétaire. Vues gardées en composants séparés pour qu'une refonte (version « consultant SEO », en maquette) puisse les remplacer une par une.
- Le layout racine garde `<html>` et les polices ; `/dashboard` est un `<div className="dash">` sans en-tête ni pied du site, styles limités à `.dash`. Plus simple que de déplacer le layout racine (le CMS `app/admin` reste intact).
- `middleware.ts` (qui ne faisait rien) remplacé par `proxy.ts` (convention de Next 16), qui ne filtre que `/dashboard` : redirection 307 vers la connexion, `noindex`, `no-store`. Chaque page revérifie la session.
- Base `qrt`, propriétaire le rôle `qrt` ; le rôle de connexion `sites` (utilisateur du service, authentification « peer ») en est membre. Même schéma que `tenmin`.
- Pages vues lues dans le journal de Caddy, sans cookie ni script (code visiteur du jour, sel effacé après 2 jours, pays lu dans le fichier DB-IP local copié depuis celui de Toutou). Images de partage, icônes et PDF ne sont pas des pages vues ; les guides PDF ouverts sont comptés à part (visiteur et fichier une fois, les iPhone chargent un PDF en plusieurs morceaux).
- Clics marchands comptés par une balise vers `/api/e` (marchand, emplacement, robot) : les liens, leurs cibles et `rel` ne changent pas, Amazon et Awin gardent leur propre suivi. Les passages par `/go/<ASIN>/amazon` (302) restent lus dans le journal comme contrôle indépendant.
- `newsletter_signup` et `tool_use` sont écrits par le serveur seulement (`/api/inscription` après accord de Brevo, `/api/m`) : un navigateur ne peut pas gonfler ces chiffres. `/api/m` garde sa ligne dans le journal pour le centre de contrôle.
- Contacts : liste Brevo 6 lue à l'affichage, rien copié dans notre base ; adresses jamais dans les URL (clé hachée, recherche dans un cookie court).
- Search Console : même compte de service que Toutou et 10min ; tant que la propriété QRT ne l'a pas ajouté et que sa clé n'est pas copiée dans `/srv/sites/robot-tondeuse/shared/gsc-key.json`, l'onglet affiche « À connecter ».
- Mesure en place depuis le 21/11/2026 ; journal du serveur lu depuis le 20/11/2026.
