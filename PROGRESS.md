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

## Passage au VPS (novembre 2026) ✅
- Next.js 16.2.1 → 16.4.5, `npm audit --omit=dev` : 12 → 0 vulnérabilités
- Retrait Vercel Analytics + `vercel.json` ; page confidentialité mise à jour
- Images de partage personnalisées (accueil, articles, rubriques) — voir DECISIONS.md
- À faire : mentions légales → hébergeur à remplacer (Vercel → one.com) ; `middleware.ts` → `proxy.ts` (convention dépréciée depuis Next 16)

## Calendrier du gazon (15/11/2026, lot 2 étape G4) ✅
- Outil `/calendrier-du-gazon` en place (12 mois, région, exposition, robot), sources citées — voir DECISIONS.md
- À faire : guide PDF du calendrier (G5), textes de la lettre (lot 6)

## Encarts d'article (17/11/2026, lot 1 étape D5) ✅
Un encart au milieu, un en fin, choisis par type de page (`lib/utils/encarts.ts`). Encarts produit automatiques retirés. Suite : `/robot-piscine`, puis D7.

## Rubrique « Robots de piscine » (18/11/2026) ✅
Page `/robot-piscine` (choix par bassin, liste des articles), route `/robot-piscine/<adresse>`, menu, pied de page, plan du site, 14 tests. La rubrique est vide tant qu'aucun article n'est écrit. Suite : relever les prix Cdiscount et Fnac des robots de piscine (script `scripts/offres-awin.mjs`, Claude en session), puis lot 3.


## Tableau de bord SEO (21/11/2026) ✅
- `/dashboard` reprend la maquette « consultant SEO » de Toutou (via 10minlanguages), au style V2 de QRT (papier, cartes blanches, mascotte robot dans une pose par écran) : Aujourd’hui, Google (+ détail page et requête), Exploration, Technique, Revenus, Direct, Contenu & notes (avec fiches robot et relevé des prix). Outils : Conversions (clics par marchand et par robot, quiz, guides PDF, promos), Contacts, E-mails, Serveur, Sécurité. iPhone : barre de 5 onglets + Menu. Sélecteur de site vers Toutou et 10min. Export CSV de chaque tableau (`qrt-…csv`, 401 sans session). Anciennes adresses Trafic / Robots IA / Recherche redirigées.
- Code : `lib/seo-dash/config.ts` (tout ce qui est propre à QRT), `lib/seo-dash/server/*`, `components/seo-dash/*`. Pages vues = journal de Caddy (pas de balise JS). Clics groupés par marchand (Amazon, Cdiscount, Fnac). Valeur d’un clic inconnue : « € ? » ; vente réelle du mois lue dans le centre de contrôle (projet `robot-tondeuse`, 21,29 € Amazon).
- Search Console : écrans « À connecter » tant que la clé n’est pas dans `/srv/sites/robot-tondeuse/shared/gsc-key.json` et la propriété partagée ; le relevé de nuit reprend alors seul l’historique depuis le 29/03/2026 (16 mois au plus).
- Tables SEO dans `qrt` (propriétaire `qrt`, `db/analytics.sql`), droits limités pour `administrator`. Minuteurs `qrt-seo-collect` (02:05 Bruxelles) et `qrt-revenue-sync` (chaque heure à :57), dans background.slice (Safeguard). Scripts en Node pur via `scripts/lib/ts-register.mjs`.
- Filtre anti-robots dans l’ingesteur, historique reclassé : 398 des 894 pages vues « personnes » étaient des robots (183 sans langue, 7 navigateur périmé, 208 cadence). Signaux web (LCP, INP, CLS) envoyés par `components/WebVitals.tsx` ; /confidentialite mise à jour.
- Premier audit : 267 pages, 7 liens internes cassés (5 vers `/choisir/<modèle>`, 2 comparatifs) ; 249 pages jamais visitées par Googlebot.
- Vérifié avec une session temporaire (supprimée) : tous les écrans 200, 20 exports CSV 200 / 401 sans session, captures 390 et 1280 px dans `~/drafts/qrt-seo-dash/`.

### Reste à faire
- [ ] Propriétaire : partager la propriété Search Console avec le compte de service et déposer la clé (pas de copie depuis un autre site).
- [ ] Corriger les 7 liens cassés (Technique › Liens cassés).
- [ ] Clé CrUX (`CRUX_API_KEY`) pour les données Chrome de Technique.

## 2026-11-21 — Tableau de bord : onglet Sources

Nouvel onglet « Sources » (menu à côté de Direct ; sur iPhone : Menu, et sous-onglet de Direct) qui remplace l'ancienne page Trafic › Acquisition (l'adresse renvoie vers Sources). Visites par famille (Recherche, Assistants IA, Réseaux sociaux, E-mail et lettre, Sites référents, Direct), colonnes empilées par jour ou semaine, tableau par famille (visites, part, écart, pages par visite, clics marchands et inscriptions pour 100 visites), bloc « Moteurs de recherche hors Google » avec courbe par moteur, pages d'arrivée par source, détail d'une source (`/dashboard/sources/source?s=search:Bing`), appareils et pays par famille, 5 exports CSV. Classement partagé avec Toutou et 10min (`lib/seo-dash/source.ts`, même fichier), aussi utilisé par le fil en direct. Fichier propre au site : `lib/seo-dash/server/visits.ts` (journal Caddy + événements).

- 2026-11-21 : barre de période commune : « Aujourd’hui » et « 24 h » (dans l’adresse, `?periode=24h` / `aujourdhui`). Les vues tirées des journaux et des événements (tuiles d’Aujourd’hui, Sources, Exploration, Revenus) prennent des fenêtres à l’heure près avec graphiques par heure, comparées aux 24 h d’avant (ou à hier aux mêmes heures). Les écrans Google montrent le dernier jour publié avec la note « Google publie ses chiffres avec 2–3 jours de retard ». Code : `lib/seo-dash/server/range.ts` (`hourRanges`, `spanSql`, `bucketSql`), `components/seo-dash/ui/GoogleDelay.tsx`.
