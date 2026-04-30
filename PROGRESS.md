# Progression : Quel Robot Tondeuse

## Complété : initialisation du site

### Configuration
- [x] `niche.config.ts` rempli
- [x] Auteur Thomas créé
- [x] Catégories : Mammotion, Husqvarna, Gardena, Worx, Bosch, entretien-pelouse
- [x] Comparateur avec 16 modèles
- [x] Contenu éditorial /choisir/ pour les 5 marques
- [x] Quiz configuré

### Contenu
- [x] 51 articles MDX publiés
- [x] 16 produits (Mammotion, Husqvarna, Gardena, Worx, Dreame, Ecovacs, Segway Navimow)

## En cours : Migration DA Atelier Vert (avril 2026)

Branche `claude/review-design-files-HKwEE` — 8 batches.

### Batch 1 — Foundation ✅
- [x] 1A — `niche.config.ts` palette + fonts + siteName "Quel Robot Tondeuse"
- [x] 1B — `app/layout.tsx` Inter + Instrument Serif + JetBrains Mono
- [x] 1C — `globals.css` :root Atelier Vert + suppression dark
- [x] 1D — prose-article + utilitaires adaptés à light + Instrument Serif (400)
- [x] 1E — DECISIONS.md + PROGRESS.md + smoke test (tsc OK côté app)

### Batch 2 — Nav refondue (en attente)
- [ ] Mega menu 5 entrées (Comparatifs / Par jardin / Marques / Guides / Outils)
- [ ] Mobile drawer plein écran
- [ ] Bottom nav fixe (Accueil · Comparatifs · Quiz · Recherche)
- [ ] Retrait ThemeToggle

### Batch 3 — Home DA (en attente)
- [ ] HeroSection forest-deep + copper accents
- [ ] Sections : TopRobots / ToolsSection / QuizTeaser / BrandsStrip / MethodologySection

### Batch 4 — Composants article DA (en attente)
- [ ] StickyCTA dual-button (acheter + quiz)
- [ ] ArticleCard / Verdict / ProductCTA / AuthorCard restylés
- [ ] Page article complète

### Batch 5 — Hubs cluster placeholder (en attente)
- [ ] /comparatifs (index)
- [ ] /par-jardin/{petit,500m2,1000m2,2000m2,grand,pente,terrain-complexe,multi-zones}
- [ ] /par-besoin/{sans-fil-peripherique,silencieux,connecte,rtk,vision-ia}
- [ ] /guides/{comment-choisir,installation,entretien,hivernage,reglementation,robot-vs-thermique,securite-enfants-animaux}
- [ ] /marques (index + sous-marques étendues)

### Batch 6 — Outils (en attente)
- [ ] /superficie (Leaflet + Esri + Nominatim + turf.js)
- [ ] /calculateur-rentabilite-robot-tondeuse
- [ ] Refonte /quiz et /comparer en DA

### Batch 7 — SEO & maillage (en attente)
- [ ] Sitemap MAJ
- [ ] JSON-LD ItemList sur hubs
- [ ] Breadcrumbs
- [ ] Redirects 301 si renommages

### Batch 8 — QA & polish (en attente)
- [ ] tsc + lint + vitest
- [ ] Lighthouse + a11y + mobile
- [ ] DECISIONS.md + PROGRESS.md final
