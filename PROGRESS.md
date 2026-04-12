# Progression : Mon Robot Tondeuse

## Complété : initialisation du site

### Configuration
- [x] `niche.config.ts` rempli (identité, vocabulaire, catégories, outils, auteur, palette, fonts, affiliation)
- [x] Palette nature premium (vert forêt #16A34A, ambre #D97706, violet #7C3AED)
- [x] Fonts : Syne (display) + DM Sans (body)
- [x] Variables CSS mises à jour (dark + light + forced modes)
- [x] OG image avec nouvelle palette

### Contenu
- [x] 5 catégories : Mammotion, Husqvarna, Gardena, Worx, Ecovacs Goat
- [x] Comparateur avec 5 marques et 15 modèles
- [x] Contenu éditorial /choisir/ pour les 5 marques
- [x] Quiz configuré (surface, pente, budget, installation)
- [x] Auteur Thomas créé
- [x] Premier article : "Meilleur robot tondeuse 2026" (1000+ mots, 8 FAQ)
- [x] Navigation : Blog, Comparer, Bons plans, Quiz, Simulateur

### Nettoyage
- [x] Suppression _example.mdx et _example.yaml

## Refonte DA 2026-04-12 — phase 2 motion

### Ajouts
- [x] Libs : framer-motion, react-wrap-balancer, react-intersection-observer, embla-carousel-react
- [x] Dossier `components/motion/` : FadeIn, Stagger/StaggerItem, ScrollReveal, MagneticButton, Parallax
- [x] Effets : RotatingWordsMotion (framer), SpotlightCursor, RobotOrnament (SVG inline)
- [x] Nouvelle section `StatsRow` (4 cells + CountUp scroll)

### Refontes home (zéro image)
- [x] HeroSection : aurora-advanced + massive type + magnetic CTAs + RobotOrnament parallaxé + spotlight
- [x] FeaturedTools : cards card-lift + corner-marks + huge number watermark + stagger
- [x] CategorySection : huge number parallax + rule-vertical + H2 massif
- [x] RecentArticles : section-head-editorial + stagger grid
- [x] AuthorTeaser : monogram ring rotatif + gradient initial + watermark
- [x] ArticleTicker : ticker-pro massive display + pastilles colorées
- [x] DealsStrip : chips glass + Live label + edge fade

### globals.css
- [x] ~470 lignes d'effets DA pro : aurora-advanced, grid-ornament, type-massive, pill-accent, card-lift, corner-marks, section-head-editorial, bento-pro, stats-row, ticker-pro, etc.
- [x] Toutes les animations respectent prefers-reduced-motion

## Refonte DA 2026-04-12 — phase 3 palette botanique

### Palette light-first botanique
- [x] Abandon des verts Tailwind saturés et du violet
- [x] Light par défaut : cream #F6F1E5, sage #5A7A5A, terracotta #A85C3B, mousse #3D5038, lin #9A7B4F
- [x] Dark mode toggle : charbon vert chaud #14170F + accents clairs
- [x] Fonts : Caladea (display, serif botanique 400/700 + italic) + DM Sans (body)
- [x] OG image + opengraph-image.tsx mis à jour
- [x] niche.config.categories accents alignés nouvelle palette
- [x] Tous les fontWeight 900/800 inline capés à 700 (Caladea max)
- [x] type-mix-hero et aurora réhumanisés (sage → terra → mousse, multiply blend en light)

### Nouveau composant SeasonCarousel
- [x] Carrousel embla Avril → Septembre (6 mois)
- [x] Calendrier du jardinier : conseils entretien robot tondeuse par mois
- [x] Boutons prev/next accessibles, dragFree, viewport aligné marge éditoriale
- [x] Watermark mois italique 13rem par carte
- [x] Inséré entre FeaturedTools et RecentArticles pour casser le rythme vertical
