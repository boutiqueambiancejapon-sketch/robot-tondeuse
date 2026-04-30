# Progression : Quel Robot Tondeuse

## Migration DA Atelier Vert (avril 2026) — Complète ✅

Branche `claude/review-design-files-HKwEE` — 8 batches.

### Batch 1 — Foundation ✅
- 1A · `niche.config.ts` palette + fonts + siteName "Quel Robot Tondeuse"
- 1B · `app/layout.tsx` Inter + Instrument Serif + JetBrains Mono
- 1C · `globals.css` :root Atelier Vert + suppression dark mode
- 1D · prose-article + utilitaires adaptés à light + Instrument Serif (400)
- 1E · DECISIONS.md + PROGRESS.md + smoke test

### Batch 2 — Nav refondue ✅
- 2A · `lib/menu.ts` config 5 entrées (Comparatifs / Par jardin / Marques / Guides / Outils)
- 2B · `Nav.tsx` mega menu + mobile drawer + logo SVG Atelier Vert + CTA Quiz copper
- 2C · `BottomNav.tsx` mobile fixe 4 icônes (Quiz central relevé)

### Batch 3 — Home DA ✅
- 3A · `HeroSection` paper + halos + Instrument Serif italique copper + stats row
- 3B · RecentArticles / CategorySection / AuthorTeaser / FeaturedTools / ArticleCard typo migrés
- 3C · Footer adapté (logo serif + eyebrows mono moss)

### Batch 4 — Composants article DA ✅
- 4A · `StickyCTA` dual-button (Quiz transparent + Acheter copper) — pattern CRO
- 4B · ProductCTA / ProConTable / AuthorCard adaptés Atelier Vert

### Batch 5 — Hubs cluster placeholder ✅
- 5A · Pages index `/comparatifs` et `/marques`
- 5B · 6 hubs MDX placeholder :
  - `/robot-tondeuse-petit-jardin`
  - `/robot-tondeuse-sans-fil-peripherique`
  - `/comment-choisir-robot-tondeuse`
  - `/meilleur-robot-tondeuse-2026`
  - `/horaires-tonte-reglementation` (différenciateur FR)
  - `/robot-tondeuse-pas-cher`

### Batch 6 — Outils ✅
- 6A · `/superficie` Leaflet + Esri World Imagery + Nominatim + turf.js (aire géodésique)
- 6B · `/calculateur-rentabilite-robot-tondeuse` (slug long SEO, slider-based)
- Redirect 301 `/simulateur` → `/superficie` dans `next.config.ts`
- Deps : leaflet, @types/leaflet, @turf/area, @turf/helpers
- CSP étendue : Esri + Nominatim en connect-src

### Batch 7 — SEO & maillage ✅
- Sitemap MAJ : ajout hubs (/comparatifs, /marques) + outils (/superficie, /calculateur-rentabilite-robot-tondeuse)
- Retrait /simulateur du sitemap (redirigé)

### Batch 8 — QA & polish ✅
- TypeScript : pas d'erreur introduite par la migration (warnings = node_modules absent en env de dev seulement)
- Build prod Vercel : Batch 3A bloquait (`AnimatedHeading as="div"` invalide) → fixé en commit 7ea064f
- DECISIONS.md + PROGRESS.md à jour

## Reste à faire (post-migration)

### Hubs à enrichir au fur et à mesure (priorité)
- Liens affiliés Amazon avec ASIN VÉRIFIÉ obligatoire (jamais de 404 affilié)
- Top 5 modèles concrets dans chaque hub placeholder (au-dessus du listing actuel)
- Hubs additionnels du menu non créés en placeholder MDX :
  - /robot-tondeuse-{500m2, 1000m2, 2000m2, grande-surface, multi-zones, pente}
  - /robot-tondeuse-{silencieux, connecte, rtk, vision-ia}
  - /robot-tondeuse-{rapport-qualite-prix, haut-de-gamme}
  - /quel-robot-tondeuse-pour-mon-jardin
  - /installation-robot-tondeuse, /entretien-robot-tondeuse, /hivernage-robot-tondeuse
  - /robot-tondeuse-vs-thermique
  - /depannage-robot-tondeuse
  - /robot-tondeuse-bruit-voisinage
  - /robot-tondeuse-securite-enfants-animaux

### Marques à étendre dans `niche.config.ts`
- Stihl, Segway Navimow, Ecovacs, Dreame, Mova, Ambrogio, Kress
- Vague chinoise 2024-2026 confirmée par recherche SERP US/FR

### Polish optionnel
- Refonte plus approfondie de `/quiz` et `/comparer` pour matcher davantage la DA
- Ajouter section "Notre méthodologie" sur la home
- Ajouter section "TopRobots" + "QuizTeaser" forest-deep block sur la home (Atelier Vert spec)
- BrandsStrip / MethodologySection (sections Atelier Vert design)
- Fix erreurs TS pré-existantes (`comparer/[produit]/page.tsx` data possibly undefined, `[article]/page.tsx` null guard meta/content)

## Commits récap (chronologique)

1. `9882c69` · niche.config Atelier Vert
2. `22ae354` · fonts Inter + Instrument Serif + Mono
3. `623e2d6` · globals.css :root tokens
4. `1d4f697` · prose-article serif weights
5. `2b6eb9d` · DECISIONS + PROGRESS Batch 1
6. `32d7faa` · lib/menu.ts
7. `b2b1f40` · Nav mega menu
8. `bb452e1` · BottomNav mobile
9. `67ee38d` · Hero refait
10. `a853f3c` · home sections font weights
11. `2d710fa` · Footer typo
12. `7e2e1b0` · StickyCTA dual-button
13. `83680bc` · ProductCTA + ProConTable + AuthorCard
14. `7ea064f` · fix HeroSection AnimatedHeading as="p"
15. `f6c9509` · /comparatifs + /marques index
16. `d8fcbf3` · 6 hubs MDX placeholder
17. `cd74780` · /superficie Leaflet
18. `0170210` · /calculateur-rentabilite-robot-tondeuse
19. `a86345d` · sitemap MAJ
20. (ce commit) · PROGRESS + DECISIONS final
