# Décisions : Mon Robot Tondeuse

## Architecture
- [x] Next.js ~16.2.1 patch auto, Vercel fra1
- [x] Tailwind v4.2.2 + variables CSS
- [x] Langue FR uniquement, pas de segment [locale], routes racine
- [x] Configuration centralisée dans `niche.config.ts`
- [x] Catégories dynamiques via `CategorySection`
- [x] CMS portable dans `packages/cms/`

## DA : "Terrain & Nature" — identité propre robot-tondeuse

**Contexte** : robots tondeuses, univers jardin + technologie. Ambiance premium et chaleureuse.
**Principe directeur** : esthétique organique (lignes topographiques, ondulations, textures naturelles, mouvements doux) au lieu du langage visuel tech/glow du template 10min.

**Palette dark** (inchangée) :
- accent1 `#16A34A` (vert forêt, CTA principal)
- accent2 `#D97706` (ambre, badges et deals)
- accent3 `#15803D` (vert foncé, succès)
- accent4 `#7C3AED` (violet, quiz et interactif)
- accent5 `#0891B2` (cyan, liens secondaires)
- bgPrimary `#080E08` (noir-vert profond — "jardin de nuit")
- bgSurface `#0F1A0F` (cartes)
- bgSurface2 `#182618` (cartes secondaires)

**Palette light** (inchangée) :
- Accents assombris pour WCAG AA sur fond blanc
- accent1 `#116932` (6.2:1), accent4 `#5B21B6` (8.4:1)

**Fonts** :
- Display : Plus Jakarta Sans (bold, géométrique, personnalité forte)
- Body : DM Sans (clean, excellente lisibilité)

**Effets — remplacés pour différencier du template 10min** :
- ~~Aurora~~ → TopographyBackground (lignes de contour SVG animées)
- ~~Noise overlay~~ → GrassTexture (fines lignes CSS évoquant des brins d'herbe)
- ~~Diagonal clip-path~~ → WaveDivider (ondulation organique SVG)
- ~~Glass morphism nav~~ → Nav solide avec bordure accent douce
- ~~Marquee strips~~ → Scroll natif horizontal avec snap
- ~~Heading clip-path reveal~~ → Fade-up doux (hero-fade-up)
- ~~Radial glow cards~~ → Cards avec bordure gauche accent + ombre portée
- ~~Conic-gradient monogramme~~ → Cercle bordure accent + leaf SVG subtil

## DA : effets par section
- effect-hero : topographie SVG animée + GrassTexture 0.025 + fade-up doux + gradient vert
- effect-comparateur : bento grid + border animée (accent-1/3/5 au lieu d'aurora)
- effect-quiz : radial gradient + cards avec bordure accent
- effect-deals : scroll snap horizontal statique + badges
- effect-articles : grille asymétrique + cards border-top 3px accent
- effect-footer : WaveDivider organique + --bg-surface

## Fonts
- Next.js variables : `--next-font-primary` (DM Sans) / `--next-font-display` (Plus Jakarta Sans) / `--next-font-mono`

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
