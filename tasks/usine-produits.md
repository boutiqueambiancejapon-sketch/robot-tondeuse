# Usine produits : un moteur de sites comparateurs, QRT en pilote (décision du propriétaire, 28/11/2026)

> « Croise quel-canape.fr et QRT et vois ce qu'on peut faire pour créer un moteur comme le voyage, mais de produits avec Amazon ;
> quand ça décolle, on cherche d'autres programmes. » Accord : étude de niches d'abord, un nom de domaine par niche.

## Principe
- **Un seul code** (celui de QRT, déjà réglé par `niche.config.ts`), un réglage par site qui choisit la niche, comme `SITE_DEST` dans
  l'usine voyage (`~/sites-src/neko-voyage`). Ce qui est propre à la tonte sort du code commun vers les données de la niche ;
  preuve à chaque étape : QRT identique au caractère près (comme Miami et AJ lors du passage au moteur commun).
- **Par niche, seulement des données** : schéma des caractéristiques (`data/<niche>.json`, sources datées), barème de la note
  (critères et paliers), familles de critères des collections, menu, 1 ou 2 calculateurs, textes d'interface.
- **Fabriqué par le moteur** : fiche produit (note sur 10 + confiance, radar comparatif, données structurées), collections par critères
  (≥ 4 modèles, anti-doublon 70 %, nombre de modèles affiché dans le menu comme quel-canape.fr), classements, duels, bons plans avec
  historique de prix honnête (prix barré = plus bas des 30 derniers jours), « Mes projets » (mesures et budget gardés dans le navigateur).
- **Argent par paliers** : 1) Amazon (API Creators : recherche, prix, disponibilité, accessoires écartés, en cas de doute la fiche la plus
  chère) ; 2) quand une niche dépasse ~300 clics marchands par mois : programmes des enseignes et des marques (Awin, Effinity, programmes
  directs), chaque bouton vers le marchand qui rapporte le plus à prix égal pour le visiteur.
- **Contenu** : guides par les agents (une intention = une page, au plus quelques pages par nuit), GEO (réponse chiffrée en tête),
  IndexNow + Bing, mesure dans le tableau de bord commun du centre de contrôle. Jamais de page de méthode, jamais « testé ».

## Photos des produits (décision du propriétaire, 28/11/2026)
1. D'abord des photos qu'on a le droit d'héberger : flux marchands Awin (Fnac, déjà sur 22 fiches) et photos officielles des marques
   (kits presse / revendeurs), conditions de chaque programme ou marque vérifiées avant usage.
2. Sinon la photo Amazon, **jamais stockée chez nous** (règle du Partenariat Amazon : seule l'adresse peut être gardée, 24 h au plus,
   image servie depuis les serveurs d'Amazon). Son adresse est relevée dans la MÊME demande que le prix (getItems, ressource
   images.primary.large, 10 produits par demande) : aucun appel en plus ; relevé de nuit, adresse remplacée chaque jour.
3. Sans photo : l'initiale de la marque (comme la maquette), jamais une image inventée.

## Ce que quel-canape.fr fait et que QRT n'a pas encore (relevé du 28/11/2026)
1. Catalogue large (1 664 canapés, 112 fauteuils) tiré des flux marchands.
2. Méga-menu par critère avec le nombre de modèles (« Canapés d'angle 549 »).
3. Pages critère × critère avec note moyenne, nombre de modèles, prix médian en tête.
4. Calculateur (« tient-il entre vos murs ? »), quiz, « Mes projets ».
5. Promotions du moment.

## Étape 0 de chaque niche : les questions des acheteurs (propriétaire, 28/11/2026)

> « Pour chaque niche, il faudra trouver les infos intéressantes que se pose l'acheteur : aller sur les forums en amont voir les
> questions qu'on pose le plus souvent, aussi bien US qu'en France. »

Avant de choisir les axes du radar, les filtres, les calculateurs et les FAQ, l'agent Étude niches produits relève les questions
réelles des acheteurs et les classe par fréquence.
- **Sources** :
  - US : Reddit (r/lawncare, r/homeautomation, r/SolarDIY…), questions-réponses d'Amazon.com, forums spécialisés ;
  - France : forums spécialisés (jardin, bricolage, énergie), questions-réponses d'Amazon.fr, Que Choisir, commentaires des
    vidéos de test, « Autres questions posées » de Google.
- **Livrable** : `tasks/questions-acheteurs-<niche>.md`. Les 30 questions les plus fréquentes (FR et US séparés), chacune avec :
  - sa fréquence approximative ;
  - le critère chiffré qui y répond (ex. « ça monte ma pente ? » → pente maxi en %) ;
  - la source et la date.
- **Ce qu'on en tire** :
  - **radar** : les 5 à 6 critères qui reviennent le plus ;
  - **filtres et collections** : les critères éliminatoires (« sans fil », « pour 1 000 m² »…) ;
  - **calculateurs et jauges** : les questions de compatibilité (« pour mon jardin », « ça tient combien d'heures ») ;
  - **FAQ** : les questions restantes, avec une réponse chiffrée ;
  - **pièges à signaler** : pannes et frais cachés souvent cités, uniquement quand une source officielle les confirme.
- **Règles** :
  - on ne recopie aucun message de forum et on ne cite aucun pseudo, on n'en garde que la question ;
  - aucune histoire d'utilisateur présentée comme un test ;
  - les réponses viennent des fiches officielles et du catalogue.

Faire d'abord les robots tondeuses (vérifier que le radar de QRT colle aux vraies questions), puis les stations électriques,
avant toute page.

## Positionnement : on compare et on aide à choisir, en images (propriétaire, 28/11/2026)

> « On compare, on aide à choisir avec des petits graphes radar et d'autres si besoin, un truc jamais fait nulle part ailleurs. »

C'est notre différence face aux sites d'avis, puisqu'on ne teste pas : des données sourcées, montrées en petits graphiques
lisibles sur iPhone. Chaque graphique est un composant du site modèle, servi à tous les sites, et suit les règles dataviz :
une seule échelle, la couleur suit le produit, une légende, un tableau en secours.
1. **Mini-radar sur chaque carte** (classements, collections, marque) : la forme du produit se voit au premier coup d'œil.
2. **Comparer 2 à 4 produits** : tiroir « Comparer » sur toutes les listes. Radars superposés, un par couleur, et tableau
   des seules différences.
3. **Carte du marché** : un point par produit, prix en abscisse, note en ordonnée. Les bonnes affaires sautent aux yeux.
   Dans chaque classement et chaque page marque.
4. **Jauge « pour ton jardin »** : surface, pente et passages comparés aux limites du produit (vert, orange, rouge), pilotée
   par le calculateur.
5. **Historique du prix** : petite courbe des 90 derniers jours, avec le prix le plus bas vu et la date.
6. **Coût sur 5 ans** : achat, lames et batterie, en barres empilées. La donnée doit être sourcée, sinon le graphique
   n'est pas affiché.
7. **Choisir en 3 questions** : surface, pente, budget. Le site répond par 3 robots, avec leurs radars superposés.

Ordre : 1 et 2 avec les gabarits classement et collection, puis 3 et 4, puis 5 à 7. Graphiques dessinés en SVG côté
serveur (lisibles par Google et les IA, aucun JS pour les voir), interaction légère seulement pour le tiroir Comparer.

## Site modèle de base (propriétaire, 28/11/2026)

> « Il faut qu'on crée un site template de base avec toutes les typologies de base pour copier-coller rapidement, avec une DA
> spécifique à chaque site. »

**Principe, comme l'usine voyage** : un seul code, et un dossier par site. Créer un site = copier `niches/_modele/` en
`niches/<site>/`, puis changer la DA et les données. On ne copie pas le code d'un dépôt à l'autre : une correction faite
une fois sert à tous les sites.

- `niches/_modele/` : le site modèle, complet, avec des produits d'exemple neutres. Il contient les 22 types de pages de
  `tasks/gabarits-affiliation.md` (accueil, hub, collection, classement, budget, fiche, duel, comparateur, marque, alternatives,
  guide, question, bons plans, outil, mon espace, confiance…), tous branchés sur la bibliothèque de composants
  (`feat/gabarits-composants`).
- **DA par site, dans le dossier du site** :
  - `theme.css` : couleurs, rayons, ombres ; uniquement des variables, aucune valeur en dur dans les composants ;
  - `fonts.ts` : 2 familles au plus ;
  - `mascotte` et images ;
  - `site.ts` : nom, domaine, auteur, ton.
- **Données par site** :
  - `catalogue.json` : caractéristiques et ASIN ;
  - `bareme.ts` : note sur 10 et axes du radar ;
  - `collections.ts` ;
  - `calculateurs.ts` ;
  - `partenaires.ts` : Amazon d'abord.
- **Contrôles communs**, repris de l'usine voyage et lancés sur chaque site avant sa mise en ligne :
  - lancement : chaque type de page servi, H1 et premier paragraphe sans JS, données structurées Product valides ;
  - qa : 390 px, contraste, débordements, boutons sur une ligne ;
  - parité avec le modèle.
- **QRT devient le premier site** (`niches/robot-tondeuse/`) sans changer ses adresses ni son rendu. La 2e niche (stations
  électriques) se crée ensuite par copie du modèle, en quelques heures.

**Rythme (au fil de l'eau, pas tout d'un coup)** : un type de page par nuit, dans l'ordre des revenus :
1. fiche produit, classement, collection, duel (maquettes validées) ;
2. hub, budget, marque, alternatives, comparateur ;
3. guide, question, bons plans, outil ;
4. accueil, mon espace, pages de confiance.

Chaque nuit, le Dév QRT :
- construit le type de page dans `_modele` puis le branche sur QRT ;
- vérifie le build et les contrôles ;
- consigne le résultat dans `tasks/journal-equipe.md`.

Pas de nouveau domaine avant que le modèle tienne les 4 premiers types.

## Ordre
1. **QRT pilote** (Dév QRT, après le radar et la note) : collections de `tasks/collections-v1.md` + menu avec nombres + calculateur de
   surface + bons plans avec historique ; catalogue complété par Catalogue QRT (toutes marques).
2. **Site modèle de base** (`niches/_modele/`, section ci-dessus) : un type de page par nuit ; QRT devient le premier site, identique.
3. **2e niche** choisie par l'étude (agent Étude niches produits → `tasks/etude-niches-produits.md`), nouveau domaine, même code.
