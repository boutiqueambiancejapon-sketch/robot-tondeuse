# Décisions : Mon Robot Tondeuse

## Architecture
- [x] Next.js ~16.2.1 patch auto, Vercel fra1
- [x] Tailwind v4.2.2 + variables CSS
- [x] Langue FR uniquement, pas de segment [locale], routes racine
- [x] Configuration centralisée dans `niche.config.ts`
- [x] Catégories dynamiques via `CategorySection`
- [x] CMS portable dans `packages/cms/`

## DA : palette nature premium

**Contexte** : robots tondeuses, univers jardin + technologie. Ambiance premium et chaleureuse.

**Palette dark** :
- accent1 `#16A34A` (vert forêt, CTA principal)
- accent2 `#D97706` (ambre, badges et deals)
- accent3 `#15803D` (vert foncé, succès)
- accent4 `#7C3AED` (violet, quiz et interactif)
- accent5 `#0891B2` (cyan, liens secondaires)
- bgPrimary `#080E08` (noir-vert profond)
- bgSurface `#0F1A0F` (cartes)
- bgSurface2 `#182618` (cartes secondaires)

**Palette light** :
- Accents assombris pour WCAG AA sur fond blanc
- accent1 `#116932` (6.2:1), accent4 `#5B21B6` (8.4:1)

**Fonts** :
- Display : Syne (bold, géométrique, personnalité forte)
- Body : DM Sans (clean, excellente lisibilité)

**Effets** :
- Aurora : `#16A34A` → `#7C3AED` → `#15803D`
- Noise : 0.03 (subtil)

## DA : effets par section
- effect-hero : aurora CSS animée + noise 0.03 + H1 clip gradient
- effect-comparateur : bento grid + border animée
- effect-quiz : radial gradient + glassmorphism cards
- effect-deals : watermark + MarqueeStrip + badge
- effect-articles : grille asymétrique + cards border-top 3px accent
- effect-footer : --bg-surface + diagonal clip-path

## Fonts
- Next.js variables : `--next-font-primary` (DM Sans) / `--next-font-display` (Syne) / `--next-font-mono`

## Light mode
- Via `@media (prefers-color-scheme: light)` dans globals.css
- OG image toujours dark

## Catégories : 5 marques

- **Mammotion** (affiliation directe, bon taux de commission)
- **Husqvarna** (référence historique, Amazon)
- **Gardena** (entrée de gamme Husqvarna, Amazon)
- **Worx** (rapport qualité-prix, Amazon)
- **Ecovacs Goat** (innovation sans fil RTK, Amazon)

## Ton éditorial

Pas de tirets cadratins. Ton direct et naturel, pas lissé. Phrases courtes. On tutoie pas mais on reste accessible.

## Section backgrounds

Variables CSS `--bg-primary`, `--bg-surface` et `--bg-surface-2` en alternance. Pas de fond hardcodé.

## Refonte DA 2026-04-12 — phase 2 : motion + éditorial pro

**Contexte** : la DA CSS-only initiale manquait de rythme et de différenciation visuelle. Le template de référence `emd-template` utilise framer-motion + primitives motion maison pour animer le scroll et les interactions. Politique zéro image maintenue — tout passe par typo, SVG inline et effets CSS.

**Ajouts de dépendances** (assumés : les libs pèsent ~120 KB gzip mais la DA est prioritaire sur le score Lighthouse dans cette phase) :
- `framer-motion@^12.38.0` — primitives motion, AnimatePresence, parallax via useScroll
- `react-wrap-balancer@^1.1.1` — équilibrage H1/H2
- `react-intersection-observer@^10.0.3` — triggers scroll custom
- `embla-carousel-react@^8.6.0` — carousels horizontaux (prévus pour phases suivantes)

**Nouveau dossier `components/motion/`** (toutes primitives `'use client'`, respectent `useReducedMotion`) :
- `FadeIn` — fade + translate + blur au viewport
- `Stagger` + `StaggerItem` — cascade orchestrée
- `ScrollReveal` — fade + parallax contrôlés par `useScroll` / `useTransform`
- `MagneticButton` — spring physics sur le hover curseur
- `Parallax` — translation Y proportionnelle au scroll

**Nouveaux effets (`components/effects/`)** :
- `RotatingWordsMotion` — remplace `RotatingWords` CSS par `AnimatePresence mode="wait"`, transitions y + blur
- `SpotlightCursor` — radial highlight qui suit le curseur dans le hero (no state, DOM direct, désactivé sur touch/reduced-motion)
- `RobotOrnament` — SVG inline 400×400 décoratif (robot tondeuse stylisé, gradients, scan arcs, corner marks, grass arcs, halo). Zéro raster.

**Nouvelle section `components/home/StatsRow.tsx`** :
- 4 chiffres clés (30+ modèles, 5 marques, depuis 2018, 0€ caché)
- `CountUp` au scroll + `Stagger` animé
- Layout border-top/border-bottom + cells séparées

**Refontes home** :
- `HeroSection` : classes `aurora-advanced` + `hero-advanced` + `grid-ornament` + `spotlight`. Type massive `type-massive` / `type-mix-hero` avec gradient animé. `MagneticButton` sur CTAs. `RobotOrnament` en colonne droite avec `Parallax`. Watermark display massif en fond. Pilule eyebrow animée. Navigation familles en grille éditoriale avec hover padding-left.
- `FeaturedTools` : cartes `card-lift` avec `corner-marks`, number watermark géant par carte (1/2/3), huge glow, gradient border, hover lift. Header éditorial `section-head-editorial` + `pill-accent`. Stagger animé.
- `CategorySection` : huge number parallaxé en fond (5vw-28vw), header `rule-vertical` avec mono label, H2 massif 5vw, CTA pill ombré par accent.
- `RecentArticles` : header `section-head-editorial` avec pill, type `.type-mix-hero`, stagger sur la grille.
- `AuthorTeaser` : watermark AUTEUR en fond (12-30vw), monogramme avec ring conique rotatif (animation 20s), lettre initiale en gradient mix, CTA pill avec glass.
- `ArticleTicker` : `.ticker-pro` massive display type avec pastilles colorées (8px dot + 4px shadow) alternant accent-1/2/4. Double-sens via duplication.
- `DealsStrip` : chips glass + hover lift + label flottant "Live".

**Enrichissements `globals.css`** (phase 2, ~470 lignes ajoutées) :
- `aurora-advanced` — layers radial + conic spin 40s + drift 16s
- `grid-ornament` / `dot-ornament` — mask radial fade
- `type-massive` / `type-outline` / `type-chrome` / `type-mix-hero` — variantes typographiques
- `hero-watermark` / `huge-number` — massive display type
- `spotlight` — custom prop var(--spot-x/y)
- `liquid-glass` — backdrop-filter + specular highlights
- `scanlines` — overlay repeating-linear-gradient
- `card-lift` — hover transform + glow ::before
- `gradient-border` — animated shift
- `section-head-editorial` — filet + h2 massif
- `pill-accent` — badge avec dot pulsant + glow shadow
- `corner-marks` — encadré par 4 coins SVG
- `bento-pro` — grid 6 colonnes asymétrique
- `stats-row` — 4 colonnes bordered
- `ticker-pro` — marquee massive type (50s linear)
- `hero-families` — grille éditoriale avec hover slide
- `hero-advanced-grid` — 1.2fr 1fr sur desktop
- `monogram-ring` — conic rotation 20s

**`prefers-reduced-motion`** : tous les nouveaux effets désactivent leurs animations (nouvelles keyframes + motion primitives via `useReducedMotion`).

**Ordre home mis à jour** : Hero → StatsRow → ArticleTicker → DealsStrip → FeaturedTools → RecentArticles → CategorySections → AuthorTeaser. Le but : établir la confiance (stats) avant de vendre (outils), puis donner du contenu (articles + catégories), finir par l'auteur.

**Politique zéro image respectée** : aucun `<img>`, aucun `next/image` ajouté, aucun fichier raster committé. Le RobotOrnament est 100% SVG inline vectoriel.

**Perf** : la DA prime sur le score Lightouse dans cette phase. framer-motion ajoute ~55 KB gzip et les effets aurora + spotlight consomment du GPU. À optimiser plus tard (dynamic imports, réduction des keyframes, mask-image static).

## Refonte DA 2026-04-12 — phase 3 : palette botanique light-first + Caladea + carrousel

**Contexte** : la palette "Tailwind verts + violet" de la phase 2 rendait trop "SaaS/gaming/crypto" pour une niche jardin. L'utilisateur voulait un rendu **botanique chaleureux**, light mode par défaut, sans violet. Mix des directions "Sage & terracotta" + "Forêt nordique".

**Nouvelle palette light (défaut)** — jamais revenir aux verts Tailwind saturés :
- `bg-primary` `#F6F1E5` cream chaud
- `bg-surface` `#FFFCF3` ivoire
- `bg-surface-2` `#EAE3D0` beige doux
- `accent-1` `#5A7A5A` sage/eucalyptus (CTA principal)
- `accent-2` `#A85C3B` terracotta (deals, chaleur)
- `accent-3` `#3D5038` mousse profonde (intensité, succès)
- `accent-4` `#9A7B4F` lin/ocre vieilli (remplace le violet — quiz, interactif)
- `accent-5` `#6B8591` ardoise douce
- `text-primary` `#1F2419` charbon vert profond
- `text-secondary` `#4F5B45` olive sombre
- `text-muted` `#8A9680` sage grey

**Contrastes WCAG AA validés** sur `#F6F1E5` : text-primary ~15:1, accent-1 sage ~5.2:1, accent-2 terra ~6.4:1.

**Palette dark (toggle manuel ou prefers-dark)** — forêt apaisée chaude :
- `bg-primary` `#14170F` (vert-charbon chaud, plus noir bleuté `#080E08`)
- `accent-1` sage clair `#9BB88C`, `accent-2` terra clair `#D88A66`, `accent-3` mousse `#6B8558`, `accent-4` lin doré `#D4B789`, `accent-5` stone `#92A5AF`
- `text-primary` cream `#F2ECD9`

**Light par défaut** : `html { color-scheme: light }`, `ThemeToggle` default `'light'`, `getInitialTheme` retombe sur light si aucun `localStorage`. Dark via `@media (prefers-color-scheme: dark)` ou `html[data-theme="dark"]`.

**Font display** : Caladea (serif botanique Cambria-compatible) — weights 400 + 700 + italic. Toutes les classes CSS `.type-massive`, `.huge-number`, `.hero-watermark`, `.ticker-pro-item`, `.section-head-editorial h2` cappées à `font-weight: 700` (le serif à 700 est déjà très expressif, faux-bold à 900 = moche). Italic activé sur `.type-mix-hero`, `.hero-watermark`, `.ticker-pro-item` pour donner du caractère éditorial magazine.

**Font body** : DM Sans conservé (clean, se marie bien avec un serif). Weights 400/500/700.

**`type-mix-hero` assaini** : avant, gradient sage → ambre → violet → sage (arc-en-ciel SaaS). Maintenant, sage → terra → mousse, italic, drift 12s. Une seule gamme chromatique chaude.

**Aurora** : `mix-blend-mode` passe de `screen` en dark à `multiply` en light (ajoute de la couleur au lieu d'éclaircir). Opacité des layers réduite (28-38% au lieu de 45-55%) pour ne pas polluer le cream.

**Shadows light** : douces, `rgba(31, 36, 25, 0.08-0.14)`, pas de noir pur.

**Noise overlay** : passé à 0.035 en light, 0.04 en dark (le grain se lit mieux sur cream).

**Nouveau composant `SeasonCarousel.tsx`** (client, embla-carousel-react) :
- 6 cartes Avril → Septembre ("Calendrier du jardinier")
- Chaque carte : mois num + nom + titre + conseil d'entretien + pastille accent rotatif
- Embla en `dragFree: true`, `containScroll: 'trimSnaps'`, pas de boucle
- Boutons prev/next accessibles, disabled quand hors bornes
- Viewport padding `max(var(--space-6), calc((100vw - 1320px) / 2 + var(--space-6)))` pour aligner la première carte sur la marge éditoriale tout en laissant déborder à droite
- Watermark mois italique `13rem` en bas à droite de chaque carte
- Background `bg-surface-2` (beige) pour casser visuellement avec les sections claires voisines
- rAF pour init state prev/next (évite le lint `set-state-in-effect`)

**Ordre home mis à jour** : Hero → StatsRow → ArticleTicker → DealsStrip → FeaturedTools → **SeasonCarousel** → RecentArticles → CategorySections → AuthorTeaser. Le carrousel casse le rythme vertical entre "outils" et "éditorial".

**Catégories (niche.config.categories[].accent)** : hex values alignés sur la nouvelle palette — Mammotion sage, Husqvarna terra, Gardena ardoise, Worx lin, Bosch mousse (remplace le violet), entretien-pelouse sage clair. Note : `categoryAccent(index)` helper renvoie toujours `var(--accent-N)` donc la cohérence est portée par les CSS vars, pas par les hex du config.

**OG image** : fond cream, text charbon vert, accent bar sage → terra → mousse, watermark sage 8%.

**Politique zéro image toujours respectée**.
