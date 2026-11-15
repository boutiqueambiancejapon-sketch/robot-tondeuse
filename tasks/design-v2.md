# Design V2 — à appliquer à tout le site

Validé par le propriétaire le 15/11/2026 : « Je valide la V2, appliquée à tout le site ». Cette décision remplace
la consigne « garder la DA » : on garde les couleurs, le logo et le robot, on change la mise en page, la typographie
et les animations.

- Maquette en ligne (vrais écrans) : https://maquette-qrt.85-190-127-13.sslip.io
- Sources de la maquette dans le dépôt : `docs/maquette-v2/` (une page HTML par type de page, `styles.css`, `app.js`).
  Les prix, notes et modèles de piscine y sont des exemples : ne jamais les recopier dans le site.

## Ce qui est déjà en place (socle, 15/11)

- `app/v2.css` : tous les styles V2, limités à ce qui est placé dans un élément `.v2`. Une page pas encore migrée
  garde l'ancien style, sans mélange.
- `components/v2/Header.tsx` et `Footer.tsx` : en-tête, menu et pied de page V2 sur tout le site
  (`app/(site)/layout.tsx`). La barre d'onglets du bas (`BottomNav`) n'est plus affichée.
- `components/v2/Mascotte.tsx` + `lib/mascotte.ts` : le robot, 17 poses dans `public/images/mascotte/`.
- `components/v2/LawnHero.tsx` : le robot qui tond le titre de l'accueil.
- Accueil V2 : `app/(site)/page.tsx` et `components/v2/home/`.
- La police à chasse fixe est retirée (`--next-font-mono` renvoie la police de texte).

## Règles du propriétaire (il les a relevées lui-même comme « AI slop »)

1. Aucun liseré coloré épais sur le côté d'un encadré. Un encadré a un fond uni.
2. Cadres fins (1 px) et seulement autour d'un produit, d'un formulaire ou d'un tableau. Le reste est séparé par des lignes.
3. Deux polices : Schibsted Grotesk pour les titres, Hanken Grotesk pour le texte. Pas de police « machine à écrire ».
4. H1 d'environ 30 px sur téléphone (classe `h-xl`), 2 à 3 lignes au plus. Seul le titre de l'accueil est géant.
5. Aucun texte qui apparaît en glissant au défilement. Seules les notes, les jauges et le robot s'animent.
6. Pas de bandeau qui défile, de mot surligné, de flèche dans un bouton, de petite étiquette au-dessus de chaque titre,
   de gros chiffres alignés pour décorer, d'emoji, de boutons « Résumer avec ChatGPT… ».
7. Un seul élément collé en bas de l'écran : la barre d'achat des fiches et classements.
8. Le prix et le bouton marchand sont visibles dans le premier écran d'une fiche ou d'un classement.
9. `prefers-reduced-motion` respecté partout.

## La mascotte

Le robot change de tenue selon la page, et le propriétaire veut qu'on pousse l'idée. Une pose par type de page,
à droite du H1 (bloc `.ttl`, `<Mascotte pose="…" size={104} className="masc" />`) :

| Page | Pose |
|---|---|
| Avis, fiche robot, méthode | `lecture` |
| Comparatif, classement | `podium` |
| Marque | `loupe` |
| Duel X ou Y | `boxe` |
| Comparateur | `balance` |
| Promos, prix | `prix` |
| Calculs (coût, surface) | `calcul` |
| Dépannage, entretien | `outils` |
| Gazon, jardin, compte | `jardinier` |
| Calendrier | `printemps`, `ete`, `automne`, `hiver` selon le mois |
| Résultat du quiz | `fete` |
| Piscine | `piscine` |

Une nouvelle pose se dessine avec `docs/maquette-v2/tools/gen.mjs` (Gemini, clé du serveur) puis `key.mjs` : c'est un
appel payant, donc réservé à Claude en session avec l'accord du propriétaire. Les agents utilisent les poses existantes.

## Données : ne rien inventer

La maquette montre une note sur 10, un prix du jour daté et une comparaison Cdiscount / Fnac. Sur le site :

- le prix du jour daté n'existe pas encore (flux Cdiscount et Fnac à brancher par Claude en session). En attendant :
  « Prix indicatif, à vérifier chez le marchand », sans date ;
- la note détaillée arrive avec le lot 3 (barème public). Sans note calculée, on n'affiche ni anneau ni barres ;
- jamais « testé », « mesuré », faux stock, compte à rebours ni prix barré non vérifié.

## Ordre de migration (Dév QRT, une étape par passage)

Pour chaque page : envelopper le `<main>` dans `className="v2"`, réécrire le contenu avec les classes de la maquette
(le fichier `docs/maquette-v2/<page>.html` sert de modèle), retirer les styles en ligne et les anciens composants.
Avant d'envoyer : types, lint, tests, build, capture à 390 px sans débordement, H1 lisible sans JavaScript.

- [x] 0. Socle, en-tête, pied de page, accueil (Claude en session, 15/11)
- [ ] 1. Gabarit d'article : `app/(site)/[article]/page.tsx` et `blog/[categorie]/[slug]` (modèle : `guide.html`).
      Retirer `AISummarize` (garder le résumé « En bref » sans liseré), `ArticleSidebar` flottante, lettrine, numéros de section.
- [ ] 2. Composants d'article : `ProductCTA`, `AutoProductCTAs`, `ProductCarousel`, `Verdict`, `Tip`, `Warning`, `ProConTable`,
      `FaqAccordion`, `StickyCTA` (modèles : cartes `.pick`, `.duo`, `.acc`, `.buybar`, `.warn`).
- [ ] 3. Listes : `/blog`, `/blog/[categorie]`, `ArticleCard`, `Pagination`.
- [ ] 4. `/comparatifs` et les articles de classement (modèle : `classement.html`).
- [ ] 5. `/marques` et les pages marque (modèle : `marque.html`).
- [ ] 6. Articles « X vs Y » (modèle : `duel.html`, type de page `comparatif`).
- [ ] 7. `/quiz` (modèle : `quiz.html` et `quiz-resultat.html`, le robot avance sur la barre).
- [ ] 8. `/comparer` (modèle : `comparateur.html`).
- [ ] 9. Outils : `/superficie`, `/calculateur-rentabilite-robot-tondeuse`, `/simulateur` (modèle : `outil-cout.html`).
- [ ] 10. `/calendrier-du-gazon`, `/fiche-hivernage-robot-tondeuse`, `InscriptionLettre` (modèle : `calendrier.html`).
- [ ] 11. `/deals` (modèle : `promos.html`, sans courbe tant que l'historique des prix n'existe pas).
- [ ] 12. Pages auteur, mentions légales, confidentialité.
- [ ] 13. Ménage : supprimer `components/effects`, `components/home`, l'ancien `Nav`, `Footer`, `BottomNav`, `ThemeToggle`,
      les styles devenus inutiles de `app/globals.css`, puis retirer la limite `.v2` si plus rien ne dépend de l'ancien style.

Ensuite, hors migration : fiches robots notées (lot 3), rubrique « Robots de piscine » (plan éditorial par Contenu QRT,
modèle : `piscine.html`), compte « Mon jardin » (lot 5, Claude en session, modèle : `mon-jardin.html`).
