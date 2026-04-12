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
