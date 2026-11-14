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
