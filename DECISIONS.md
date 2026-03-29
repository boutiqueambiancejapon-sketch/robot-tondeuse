# Décisions — 10minTondeuse

## Architecture
- [x] Next.js ~16.2.1 patch auto · Vercel fra1 · GitHub Actions CI
- [x] Tailwind v4.2.2 + variables CSS · dark-only (pas de next-themes)
- [x] Langue FR uniquement · pas de segment [locale] · routes racine
- [x] Configuration centralisée dans `niche.config.ts` — seul fichier à modifier par site
- [x] Catégories dynamiques — 1 composant `CategorySection` générique au lieu de sections hardcodées
- [x] CMS portable dans `packages/cms/` — copier tel quel entre sites

## DA — Palette nature/tech

**Contexte** : Site sur les robots tondeuses — univers jardin + technologie.

**Palette dark** :
- accent1 `#22C55E` (vert — pelouse, CTA principal)
- accent2 `#F59E0B` (ambre — badges, deals, warnings)
- accent3 `#10B981` (emerald — succès, validation)
- accent4 `#6366F1` (indigo — quiz, éléments interactifs)
- accent5 `#06B6D4` (cyan — liens secondaires)
- bgPrimary `#0A0F0A` (vert-noir profond)
- bgSurface `#111A11` (surface cartes — teinte verte subtile)
- bgSurface2 `#1A261A` (surface secondaire)

**Palette light** :
- Accents assombris pour WCAG AA sur fond blanc
- accent1 `#15803D` (5.3:1), accent4 `#4338CA` (7.2:1)

**Fonts** :
- Display : Outfit (géométrique, moderne, lisible)
- Body : DM Sans (clean, excellente lisibilité)

**Effets** :
- Aurora : vert `#22C55E` → indigo `#6366F1` → emerald `#10B981`
- Noise : 0.03 (subtil)
- Style : dark nature tech

**Justification** : Le vert évoque la pelouse/nature, l'indigo apporte la dimension tech. Les fonds légèrement teintés vert (0A0F0A au lieu de 0A0A0F) renforcent la cohérence thématique sans nuire à la lisibilité.

## DA — effets retenus par section
- effect-hero → aurora CSS animée + noise 0.03 + H1 clip gradient
- effect-comparateur → bento grid + border animée pulse lent
- effect-quiz → radial gradient + glassmorphism cards
- effect-deals → watermark + MarqueeStrip + badge
- effect-articles → grille asymétrique + cards border-top 3px accent
- effect-footer → --bg-surface + diagonal clip-path
- effect-404 → watermark "404" clamp Outfit 800 opacity 0.08

## DA — traitements typographiques
- typo-h1-home → clamp + background-clip:text gradient
- typo-prix → font-variant-numeric:tabular-nums + --font-mono
- typo-watermark → numéro 200px Outfit 800 opacity 0.05
- typo-article-intro → lettrine CSS ::first-letter + --font-display

## Fonts
- Next.js variables : `--next-font-primary` (DM Sans) / `--next-font-display` (Outfit) / `--next-font-mono`
- Préfixe `next-` pour éviter la référence circulaire avec @theme Tailwind

## Light mode
- Via `@media (prefers-color-scheme: light)` dans globals.css — aucun JS
- Accents assombris pour WCAG AA sur fond clair
- OG image toujours dark, indépendant du mode

## Catégories — 5 marques principales

Les 5 marques couvrent >90% du marché français des robots tondeuses :
- Husqvarna (référence historique, accent orange #FF6A00)
- Gardena (entrée de gamme Husqvarna, accent cyan #00B8D4)
- Worx (meilleur rapport Q/P, accent vert vif #76FF03)
- Robomow (puissance grands terrains, accent rouge #FF3D57)
- Ecovacs Goat (innovation sans fil RTK, accent indigo #7B61FF)

## Section backgrounds

Toutes les sections utilisent les variables CSS `--bg-primary`, `--bg-surface` et `--bg-surface-2` en alternance, avec les effets aurora et noise configurés dans globals.css. Pas de fond hardcodé.
