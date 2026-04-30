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
