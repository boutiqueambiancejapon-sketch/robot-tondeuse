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
