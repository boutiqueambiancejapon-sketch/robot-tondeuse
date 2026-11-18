# Arborescence cible — Quel Robot Tondeuse

Rédigé le 15/11/2026 par le responsable éditorial, à la demande du propriétaire : élargir le site aux accessoires,
à l'entretien du gazon, aux robots de piscine et à ce qui est utile au jardin autour du robot, **le robot tondeuse
restant au centre**.

> **Décision du propriétaire, 18/11/2026 : priorité aux produits chers (« high ticket »).** Robots tondeuses à plus de
> 1 000 € d'abord ; nouvelle rubrique « Tracteurs et tondeuses autoportées » (1 500 à 4 000 €), ouverte le 18/11/2026 ;
> robots de piscine avancés à décembre 2026. Gazon, dépannage et accessoires bon marché passent derrière.
> Cabanons, pergolas et mobilier : pas sur ce site (futur site jardin).

Fichiers liés : `tasks/plan-editorial.md` (les sujets, lus par la rédaction de nuit), `tasks/calendrier-editorial.md`
(la vue par mois), `tasks/design-v2.md` (les gabarits visuels : avis, marque, classement, duel, guide, outil, promos, rubrique).

## 1. Le principe en cinq lignes

1. **Sept rubriques au plus**, plus un service « Promos » qui les traverse. Pas de mobilier, de barbecue ni d'éclairage.
2. **Aucune adresse existante ne change.** Les 213 articles restent à la racine du site (`/mon-article`).
3. **Les rubriques déjà vivantes restent à la racine** (robots tondeuses, accessoires, gazon), ainsi que les **tracteurs
   et tondeuses autoportées** (même lecteur, rien à attendre du code). **Trois rubriques ont leur dossier** :
   `/robot-piscine/…`, `/arrosage/…`, `/outils-jardin/…`.
4. **Une rubrique s'ouvre quand la précédente tient debout** (critère au point 5). On n'ouvre jamais deux rubriques le même mois.
   Exception décidée par le propriétaire le 18/11/2026 : tracteurs en novembre, accessoires et robots de piscine en décembre 2026.
5. **Chaque page a une page mère** et y renvoie. Chaque rubrique renvoie vers le robot tondeuse au moins une fois par page.

## 2. Vue d'ensemble

```
/                                   accueil (quiz, classements, calendrier)
│
├─ 1. ROBOTS TONDEUSES              (ouverte, adresses à la racine)
│    /comparatifs                   rubrique : classements et duels
│    /marques                       rubrique : marques et avis de marque
│    /choisir/<robot>               fiche d'un robot (lot 3 : note et barème)
│    /quiz  /comparer  /superficie  /calculateur-rentabilite-robot-tondeuse
│
├─ 1 bis. TRACTEURS ET AUTOPORTÉES  (ouverte le 18/11/2026, adresses à la racine)
│    /tracteur-tondeuse             rubrique et page mère (à écrire en premier)
│    classements par surface et par budget · avis de marque · duels · robot ou tracteur
│
├─ 2. AUTOUR DU ROBOT               (ouverte en décembre 2026, adresses à la racine)
│    /accessoires-robot-tondeuse    rubrique et page mère (à écrire en premier)
│    lames · garages · câble · batteries · antenne RTK · antivol · entretien · pièces
│
├─ 3. GAZON ET PELOUSE              (ouverte, adresses à la racine)
│    /blog/entretien-pelouse        rubrique (existe)
│    /calendrier-du-gazon           outil pivot (existe)
│    soins · semis · engrais · problèmes · matériel « ce que le robot ne fait pas »
│
├─ 4. ROBOTS DE PISCINE             (ouverte le 18/11/2026)
│    /robot-piscine                 rubrique
│    /robot-piscine/<page>          classements, avis de marque, duels, guides
│
├─ 5. ARROSAGE                      (à ouvrir en avril 2027)
│    /arrosage                      rubrique
│    /arrosage/<page>
│
├─ 6. OUTILS DE JARDIN SUR BATTERIE (à ouvrir en septembre 2027, sous condition)
│    /outils-jardin                 rubrique
│    /outils-jardin/<page>
│
└─ PROMOS (service commun)          /deals (existe)
     /code-promo/<marque> (existe) · /black-friday-robot-tondeuse (existe) · /soldes-robot-tondeuse …
```

## 3. État des rubriques (tableau lu par la rédaction de nuit)

La rédaction de nuit n'écrit un sujet dont l'adresse commence par un dossier que si la ligne ci-dessous dit **ouverte**.
C'est le **Dév QRT** qui change « fermée » en « ouverte » le jour où le dossier fonctionne en ligne, et qui note où poser les fichiers.

| Rubrique | Dossier d'adresse | État | Où poser le fichier de l'article |
|---|---|---|---|
| Robots tondeuses | racine | ouverte | `content/articles/<adresse>.mdx` |
| Tracteurs et autoportées | racine | ouverte (18/11/2026) | `content/articles/<adresse>.mdx` |
| Autour du robot | racine | ouverte | `content/articles/<adresse>.mdx` |
| Gazon et pelouse | racine | ouverte | `content/articles/<adresse>.mdx` |
| Promos | racine | ouverte | `content/articles/<adresse>.mdx` |
| Robots de piscine | `/robot-piscine/` | **ouverte** (18/11/2026) | `content/articles/robot-piscine/<adresse>.mdx`, où `<adresse>` est la fin de l'adresse (`/robot-piscine/dolphin-vs-zodiac` → `dolphin-vs-zodiac.mdx`). En-tête facultatif : `bassins: [hors-sol, enterree, ligne-eau, sans-fil]` pour le filtre de la page de rubrique. Liens internes écrits avec le dossier (`/robot-piscine/…`) |
| Arrosage | `/arrosage/` | **fermée** (à ouvrir avant le 01/04/2027) | à noter par le Dév |
| Outils sur batterie | `/outils-jardin/` | **fermée** (à ouvrir avant le 01/09/2027, sous condition) | à noter par le Dév |

## 4. Les rubriques une par une

### 4.1 Robots tondeuses (le centre du site)

- **Pages de rubrique** : l'accueil, `/comparatifs` (classements et duels), `/marques` (marques). Elles existent.
- **Sous-rubriques** : classements · guides par surface · guides par besoin (pente, chien, sans fil…) · duels de robots ·
  duels de marques · guides de gamme · avis de marque · avis d'un robot · entretien et dépannage du robot · réglementation.
- **Pages qui servent déjà de page mère** (ne pas en créer d'autres sur le même sujet) :

| Rôle | Adresse existante |
|---|---|
| Classement général | `/meilleur-robot-tondeuse-2026` |
| Guide de choix | `/comment-choisir-robot-tondeuse` et `/quel-robot-tondeuse-pour-mon-jardin` |
| Choix d'une marque | `/quelle-marque-robot-tondeuse-choisir-2026` |
| Petit budget | `/meilleur-robot-tondeuse-pas-cher-top-2026` |
| Sans câble | `/quel-robot-tondeuse-sans-fil-choisir` |
| Pente | `/comment-choisir-robot-tondeuse-terrain-en-pente` |
| Entretien du robot | `/comment-entretenir-son-robot-tondeuse-guide-complet` |
| Installation | `/comment-installer-robot-tondeuse-soi-meme` |
| Hivernage | `/comment-hiverner-son-robot-tondeuse` et `/fiche-hivernage-robot-tondeuse` |
| Coût | `/robot-tondeuse-combien-ca-coute-vraiment` et `/calculateur-rentabilite-robot-tondeuse` |

- **Page mère du dépannage** : `/panne-robot-tondeuse-diagnostic` (le dépannage n'a pas de page mère, alors que
  17 articles de dépannage sont prévus). Passée en réserve le 18/11/2026 avec le reste du dépannage : elle s'écrira
  après les produits chers.
- **Priorité aux robots à plus de 1 000 €** (décision du 18/11/2026). Ce qui est déjà en ligne sert de page mère et
  **ne se réécrit pas** : classements par budget (`/meilleur-robot-tondeuse-moins-1000-euros-2026`, puis 1 200, 1 500,
  2 000, 2 500, 3 000), guides par surface (`/quel-robot-tondeuse-pour-1500m2-guide-achat-2026`, puis 2 000, 2 500,
  3 000, 4 000, 5 000 m² et 1 hectare), `/robot-tondeuse-4-roues-motrices-awd-top-5-2026`, `/robot-tondeuse-lidar-top-5-2026`.
  Contenu QRT les met à jour sur place avant février 2027 (prix datés, modèles 2027). Pages nouvelles au plan :
  `/meilleur-robot-tondeuse-haut-de-gamme`, `/meilleur-robot-tondeuse-grand-terrain` (pivot des guides par surface),
  `/meilleur-robot-tondeuse-forte-pente`, `/meilleur-robot-tondeuse-lidar-2000m2`, `/meilleur-robot-tondeuse-sans-antenne-rtk`,
  `/quel-robot-tondeuse-pour-6000m2-8000m2`, `/quel-robot-tondeuse-pour-2-hectares`, 11 avis de modèles et 12 duels.
- **Gabarits d'adresse** (nouvelles pages, jamais d'année dans l'adresse) :

| Type de page | Gabarit | Exemple |
|---|---|---|
| Classement | `/meilleur-robot-tondeuse-<critère>` | `/meilleur-robot-tondeuse-rtk` |
| Guide par surface ou besoin | `/quel-robot-tondeuse-pour-<cas>` | `/quel-robot-tondeuse-pour-800m2` |
| Duel de robots | `/<robot-a>-vs-<robot-b>-comparatif` | (62 existent, duels de marques compris) |
| Duel de marques | `/<marque-a>-vs-<marque-b>-quelle-marque-choisir` | `/kress-vs-husqvarna-quelle-marque-choisir` |
| Guide de gamme | `/quel-<marque>-choisir-guide-gamme` | (9 existent, avec « 2026 ») |
| Avis de marque | `/avis-robot-tondeuse-<marque>` | `/avis-robot-tondeuse-stiga` |
| Avis d'un robot à plus de 1 000 € | `/avis-<marque>-<modèle>` (une page par famille) | `/avis-mammotion-luba-3-awd` |
| Fiche d'un robot | `/choisir/<robot>` (lot 3, Dév) | `/choisir/dreame-a1-pro` |
| Guide, dépannage, réglementation | `/<sujet-en-clair>` | `/prix-installation-robot-tondeuse` |

- **Avis d'un robot** (règle changée le 18/11/2026) : la rédaction de nuit écrit un article « avis » pour les robots à
  **plus de 1 000 €**, une page par famille de modèles (`/avis-dreame-a3-awd-pro` couvre le 3500 et le 5000). L'article
  est la lecture longue (pour qui, défauts, presse citée) ; la fiche `/choisir/<robot>` garde le prix du jour et, plus
  tard, la note du lot 3. L'article renvoie aux fiches, sans note tant que le barème n'est pas public. Jamais « test »
  dans une nouvelle adresse. Sous 1 000 €, pas d'article avis : la fiche suffit. Les 8 articles `/test-…-avis` existants
  restent en ligne.
- **Avis de marque** : pour les marques déjà couvertes par un guide de gamme (Dreame, Mammotion, Husqvarna, Gardena, Worx,
  Bosch, Ecovacs, Segway, Mova), la page « Avis + marque » vient du lot 3 (Dév) : la rédaction ne la double pas. Le calendrier
  ne prévoit donc des avis de marque que pour les marques **absentes du site** : Stiga, Kress, Stihl iMOW, Sunseeker,
  Parkside (Lidl), Eufy, Anthbot, Einhell, Yard Force.

### 4.1 bis Tracteurs et tondeuses autoportées (ouverte le 18/11/2026)

Même lecteur que le robot pour grand terrain : il hésite entre les deux. Panier de 1 500 à 4 000 €.

- **Page de rubrique et page mère** : `/tracteur-tondeuse` (premier sujet de la rubrique). Elle commence comme un guide
  de choix ; le Dév pourra lui donner le gabarit « rubrique » du design V2 sans changer l'adresse.
- **Pages mères à écrire en premier** (novembre 2026, dans cet ordre) : `/robot-tondeuse-ou-tracteur-tondeuse` (le pont
  avec les robots), `/tracteur-tondeuse`, `/meilleur-tracteur-tondeuse` (mère des classements), puis
  `/quelle-marque-tracteur-tondeuse-choisir` (mère des avis de marque, janvier).
- **Gabarits d'adresse** (à la racine, jamais d'année) :

| Type de page | Gabarit | Exemple |
|---|---|---|
| Classement | `/meilleur-tracteur-tondeuse-<critère>` · `/meilleure-tondeuse-autoportee` | `/meilleur-tracteur-tondeuse-moins-3000-euros` |
| Guide par surface | `/quel-tracteur-tondeuse-pour-<surface>` | `/quel-tracteur-tondeuse-pour-5000m2` |
| Avis de marque | `/avis-tracteur-tondeuse-<marque>` | `/avis-tracteur-tondeuse-husqvarna` |
| Duel | `/<a>-vs-<b>-tracteur-tondeuse` · `/<a>-ou-<b>` | `/husqvarna-vs-john-deere-tracteur-tondeuse` |
| Guide | `/tracteur-tondeuse-<sujet>` | `/tracteur-tondeuse-terrain-en-pente` |

- **Honnêteté** : aucune note (pas de barème), machines décrites à partir de la fiche du fabricant, surfaces conseillées
  avec leur source, pente selon la notice seulement, prix relevés et datés chez deux marchands. Pas de fiche dans
  `content/produits/` (le quiz et le comparateur restent réservés aux robots).
- **Liens** : chaque page renvoie à `/tracteur-tondeuse` et, quand un robot ferait le travail, au guide robot de la même
  surface. Les guides robots de 3 000 m² et plus renverront à `/robot-tondeuse-ou-tracteur-tondeuse` (Contenu QRT, quand
  la page existe).
- **Hors champ** : tondeuses thermiques poussées ou tractées, débroussailleuses, motoculteurs, micro-tracteurs agricoles,
  matériel professionnel de plus de 10 000 €, pièces détachées et dépannage des tracteurs (pas avant que la rubrique
  ait fait ses preuves).
- **Critère de suite** : après les 10 premiers articles, le Chef regarde les visites venues de Google et les clics
  marchands. Sans visite trois mois après la page mère, on arrête d'ajouter des sujets (règle du point 5).

### 4.2 Autour du robot : accessoires et pièces

- **Derrière les produits chers depuis le 18/11/2026** : restent en décembre la page mère et le classement des garages ;
  abri à faire soi-même, lames et batterie Husqvarna, kit d'entretien sont en réserve. Câble, lames et antenne gardent
  leur place de saison, en fin de février et de mars.
- **Page de rubrique et page mère** : `/accessoires-robot-tondeuse` (décembre 2026). Elle commence comme
  un guide ; le Dév pourra lui donner le gabarit « rubrique » du design V2 sans changer l'adresse.
- **Sous-rubriques et pages mères** :

| Sous-rubrique | Page mère | État |
|---|---|---|
| Lames | `/lames-robot-tondeuse-quand-changer` | existe |
| Garages et abris | `/abri-garage-robot-tondeuse-faut-il-en-acheter-2026`, puis `/meilleur-garage-robot-tondeuse` | existe / décembre |
| Câble, cavaliers, connecteurs | `/cable-cavaliers-connecteurs-robot-tondeuse` | février |
| Batteries | `/batterie-robot-tondeuse-duree-vie-remplacement` | existe |
| Antenne RTK, supports | `/antenne-rtk-robot-tondeuse-support-rallonge` | février |
| Antivol, traceurs | `/robot-tondeuse-antivol-vol-protection` | existe |
| Nettoyage et entretien | `/kit-entretien-robot-tondeuse` | réserve |
| Station de charge, pièces | `/station-de-charge-robot-tondeuse-remplacement` | novembre 2027 |

- **Gabarits d'adresse** : `/lames-<marque>-<gamme>` · `/batterie-<marque>-<gamme>-remplacement` ·
  `/meilleur-<accessoire>-robot-tondeuse` · `/<accessoire>-robot-tondeuse` pour un guide.
- **Limite** : une page par marque pour les lames et les batteries, pas une page par modèle. Les modèles vont dans un tableau.

### 4.3 Gazon et pelouse

- **Page de rubrique** : `/blog/entretien-pelouse` (existe). **Outil pivot** : `/calendrier-du-gazon` (existe) : tout article
  gazon y renvoie.
- **Sous-rubriques** : soins de saison · semis et regarnissage · engrais et amendements · mousse, mauvaises herbes, maladies ·
  scarification et aération · **matériel du gazon : ce que le robot ne fait pas** (bordures, scarification, semences, engrais).
- **Pages qui servent déjà de page mère** : `/comment-avoir-un-beau-gazon-bien-vert` (soins), `/pelouse-abimee-comment-reparer-gazon`
  (réparer), `/quel-gazon-semer-pour-robot-tondeuse` (semences), `/quand-et-comment-scarifier-sa-pelouse` (scarifier),
  `/comment-enlever-mousse-gazon` (mousse), `/pourquoi-mon-gazon-jaunit` (problèmes), `/comment-bien-arroser-sa-pelouse` (eau).
- **Gabarits d'adresse** : guide `/<question-en-clair>` (`/micro-trefle-pelouse`) · classement de matériel ou de produit
  `/meilleur-<produit>` (`/meilleur-scarificateur-electrique`, `/meilleur-engrais-gazon-automne`).
- **Rien à créer avant d'écrire** : la rubrique fonctionne. 56 sujets gazon et dépannage sont déjà au plan ; le calendrier
  y ajoute surtout les classements de matériel.

### 4.4 Robots de piscine (avancés à décembre 2026)

Même acheteur, même logique de comparaison que le robot tondeuse. Le flux Cdiscount compte environ 1 200 robots de piscine.

- **Page de rubrique** : `/robot-piscine` (gabarit `piscine.html` de la maquette, pose « piscine » de la mascotte).
- **Ordre d'écriture depuis le 18/11/2026 : classements et duels d'abord, guides ensuite.**
  1. Décembre 2026 : `/robot-piscine/meilleur-robot-piscine` (classement général, page mère), `…/meilleur-robot-piscine-sans-fil`,
     `…/robot-piscine-sans-fil-ou-filaire`, `…/meilleur-robot-piscine-haut-de-gamme`, `…/dolphin-vs-zodiac`, `…/aiper-vs-wybot`,
     `…/meilleur-robot-piscine-moins-1000-euros`, `…/meilleure-marque-robot-piscine` (mère des avis de marque).
  2. Janvier 2027 : les autres duels, le classement « fond, parois et ligne d'eau », les avis Aiper et Dolphin, puis les
     deux guides `…/comment-choisir-robot-piscine` et `…/robot-piscine-electrique-ou-hydraulique`.
  3. Février et mars 2027 : avis Wybot, Beatbot, Zodiac, avis de produits haut de gamme (Aiper Scuba X1 Pro Max, Dolphin
     Liberty, Wybot S2 Solar Vision). Les guides d'usage et de panne restent d'avril à octobre.
  Tant que `…/comment-choisir-robot-piscine` n'existe pas, les pages qui l'ont pour mère renvoient à `…/meilleur-robot-piscine`.
- **Sous-rubriques et gabarits** :

| Type de page | Gabarit | Exemple |
|---|---|---|
| Classement | `/robot-piscine/meilleur-robot-piscine-<critère>` | `/robot-piscine/meilleur-robot-piscine-hors-sol` |
| Guide par bassin | `/robot-piscine/quel-robot-piscine-<cas>` | `/robot-piscine/quel-robot-piscine-8x4-10x5` |
| Avis de marque | `/robot-piscine/avis-<marque>` | `/robot-piscine/avis-wybot` |
| Duel | `/robot-piscine/<a>-vs-<b>` | `/robot-piscine/dolphin-vs-zodiac` |
| Usage, entretien, panne | `/robot-piscine/robot-piscine-<sujet>` | `/robot-piscine/hivernage-robot-piscine` |
| Accessoire | `/robot-piscine/<accessoire>-robot-piscine` | `/robot-piscine/filtre-robot-piscine` |

- **Pas de note** tant qu'un barème « robot de piscine » public n'existe pas. Pas de fiche produit piscine dans
  `content/produits/` (cette base alimente le quiz et le comparateur de robots tondeuses).
- **Hors champ** : traitement de l'eau, pompes, filtres à sable, chauffage, bâches, la piscine elle-même. On ne parle de
  l'eau que pour dire quand sortir le robot.

### 4.5 Arrosage

- **Page de rubrique** : `/arrosage`. **Pages mères à écrire en premier** (avril 2027) :
  `/arrosage/arrosage-automatique-pelouse` (guide), puis `/arrosage/meilleur-programmateur-arrosage-connecte` (classement).
- **Pages qui servent déjà de page mère** (elles restent à la racine) : `/comment-bien-arroser-sa-pelouse`,
  `/robot-tondeuse-arrosage-automatique-cohabitation-2026`, `/robot-tondeuse-canicule-secheresse-faut-il-tondre-ete`.
- **Sous-rubriques** : programmateurs · arroseurs · arrosage enterré · capteurs · tuyaux et enrouleurs · eau de pluie ·
  règles et restrictions.
- **Gabarits** : `/arrosage/meilleur-<produit>` · `/arrosage/<a>-vs-<b>` · `/arrosage/avis-<marque-ou-produit>` ·
  `/arrosage/<sujet-en-clair>`.
- **Hors champ** : arrosage du potager et du balcon pris pour eux-mêmes, plantes d'intérieur. La pelouse et le jardin
  autour du robot seulement.

### 4.6 Outils de jardin sur batterie

Point d'entrée : **la batterie que le lecteur possède déjà avec son robot** (Worx PowerShare, Power for All chez Gardena et
Bosch, Einhell Power X-Change, Kress).

- **Page de rubrique** : `/outils-jardin`. **Page mère à écrire en premier** (septembre 2027) :
  `/outils-jardin/batteries-outils-jardin-compatibles`. Page existante liée : `/robot-tondeuse-batterie-amovible-compatible-outils-2026`.
- **Sous-rubriques** : plateformes de batterie · coupe-bordures et débroussailleuses · taille-haies · souffleurs ·
  tondeuses de finition · sécateurs et élagueuses.
- **Gabarits** : `/outils-jardin/meilleur-<outil>-batterie` · `/outils-jardin/<plateforme>-outils-compatibles` ·
  `/outils-jardin/<a>-ou-<b>`.
- **Exception** : le coupe-bordure, le scarificateur et l'épandeur sont rangés dans **Gazon** (ce que le robot ne fait pas),
  parce qu'on les écrit dès mars 2027, avant l'ouverture de cette rubrique.
- **Hors champ** : tronçonneuses de bûcheronnage, motobineuses, broyeurs, nettoyeurs haute pression, outillage thermique.

### 4.7 Promos (service commun, pas une rubrique à articles)

- **Page de rubrique** : `/deals` (existe).
- **En ligne depuis le 15/11/2026, hors des articles** : `/code-promo` et `/code-promo/<marque>` (13 marques), `/black-friday-robot-tondeuse` et `/black-friday-robot-tondeuse/<marque>`. Leurs données sont dans `lib/promos.ts`, tenues par Croissance QRT. **La rédaction de nuit n'écrit pas ces pages** (retirées du plan le 16/11/2026).
- **Pages permanentes, une par événement, mises à jour chaque année, sans année dans l'adresse** :
  `/soldes-robot-tondeuse` · `/french-days-robot-tondeuse` · `/prime-day-robot-tondeuse` · `/black-friday-robot-piscine` ·
  `/quand-acheter-robot-piscine` (à écrire, au plan) ; `/black-friday-robot-tondeuse` (existe).
- **Pages qui existent et restent** : `/robot-tondeuse-black-friday-2026-prix-a-viser` (elle doit pointer vers la page permanente
  `/black-friday-robot-tondeuse` : lien à poser par Contenu QRT), `/quand-acheter-robot-tondeuse-meilleur-moment-prix-2026`.
- **Codes promo** : `/code-promo/<marque>`, une page par marque, 13 en ligne (Dreame, Husqvarna, Worx, Gardena, Segway Navimow,
  Mammotion, Stiga, Bosch, Ecovacs, Mova, Einhell, Sunseeker, Yard Force). Marques de piscine à ajouter à `lib/promos.ts` quand
  la rubrique sera ouverte : Aiper, Wybot, Beatbot. Règle stricte dans `tasks/plan-editorial.md`. **Chaque page code promo est revérifiée le 1er de chaque
  mois par Contenu QRT** (ou retirée du plan du site si personne ne peut le faire : une page de codes périmés trompe le lecteur).

## 5. Ordre d'ouverture et critère pour ouvrir la suivante

| Ordre | Rubrique | Ouverture | Pourquoi à ce moment |
|---|---|---|---|
| 0 | Robots tondeuses, Gazon | déjà ouvertes | 216 articles au 18/11/2026 |
| 0 bis | Tracteurs et autoportées | 18/11/2026 | décision du propriétaire : produit cher, même lecteur, adresses à la racine |
| 1 | Autour du robot | décembre 2026 | aucune attente : adresses à la racine ; derrière les produits chers |
| 2 | Robots de piscine | décembre 2026 (décision du 18/11/2026) | 4 mois d'avance sur la remise en eau d'avril |
| 3 | Arrosage | avril 2027 | 2 mois d'avance sur les premières chaleurs |
| 4 | Outils sur batterie | septembre 2027 | saison des haies et des feuilles ; **seulement si le critère est rempli** |

**Critère pour ouvrir la rubrique suivante** (vérifié par le Chef QRT, qui l'écrit dans le journal) :

1. Les pages mères de la rubrique précédente sont en ligne et reliées entre elles.
2. Au moins **10 articles** de la rubrique précédente sont publiés.
3. Sur les 30 derniers jours, la rubrique précédente a reçu **des visites venues de Google** et **au moins un clic marchand**
   (`/go/…`), lus dans le centre de contrôle.

Si le point 3 n'est pas rempli à la date prévue : on **n'ouvre pas** la suivante, on continue la rubrique en cours avec les
sujets déjà au plan, et le Chef refait le point le mois suivant. Si une rubrique ouverte ne reçoit toujours aucune visite
de Google **trois mois** après ses pages mères, le Chef arrête d'y ajouter des sujets et prévient le propriétaire.

## 6. Liens internes obligatoires

Dans une rubrique, toujours le même chemin :

```
guide  ──►  classement  ──►  avis (marque ou fiche robot)  ──►  duel
  ▲              │                      │                         │
  └──────────────┴────── tous renvoient à la page mère ───────────┘
```

| Depuis | Lien obligatoire vers |
|---|---|
| Guide | le classement de la même question, et la page mère |
| Classement | l'avis de chaque marque ou la fiche de chaque robot cité, et le classement général |
| Avis de marque | le guide de gamme, un duel de la marque, la page mère des marques |
| Duel | les deux avis (ou fiches) et le classement où le gagnant figure |
| Accessoire | l'article d'entretien ou de dépannage correspondant, et `/accessoires-robot-tondeuse` |
| Dépannage | l'accessoire qui répare (lames, câble, batterie) et `/panne-robot-tondeuse-diagnostic` |
| Promo, code promo | l'avis de la marque et le classement ; jamais vers une autre page promo seulement |

Entre rubriques (au moins un par article, toujours utile au lecteur) :

| Depuis | Vers |
|---|---|
| Gazon (tout article) | `/calendrier-du-gazon` ; un article robot seulement si le robot change le conseil |
| Gazon, matériel (bordures, scarificateur) | l'article robot correspondant (`/robot-tondeuse-coupe-bordure-integre-top-6-2026`…) |
| Arrosage | `/robot-tondeuse-arrosage-automatique-cohabitation-2026` et `/comment-bien-arroser-sa-pelouse` |
| Robots de piscine | la marque côté robots tondeuses quand elle existe (Dreame, Mammotion, Mova) et `/robot-tondeuse-jardin-avec-piscine-securite-2026` |
| Outils sur batterie | le guide de gamme du robot qui partage la batterie (Worx, Gardena, Bosch, Einhell) |
| Toute mention de surface | `/superficie` ; tout calcul de coût : `/calculateur-rentabilite-robot-tondeuse` |

Règles : pas de lien vers une page qui n'existe pas encore ; deux articles sur le même sujet ne se concurrencent pas, le plus
récent renvoie au plus ancien pour la partie déjà traitée.

## 7. Ce qu'on ne couvre pas

- **Mobilier de jardin, barbecues, éclairage extérieur, abris et serres, potager, plantes et graines** (hors gazon),
  anti-nuisibles pris pour eux-mêmes : trop loin du robot, même si le flux Cdiscount en est plein.
- **La piscine elle-même** (bassins, traitement de l'eau, pompes, chauffage) et les spas.
- **Les aspirateurs robots de maison**, même quand la marque est la même.
- **Le matériel thermique** et le matériel professionnel, sauf pour une comparaison ponctuelle. **Exception depuis le
  18/11/2026 : les tracteurs tondeuses et les tondeuses autoportées** (rubrique 4.1 bis). Le reste du thermique
  (tondeuses poussées, débroussailleuses, motoculteurs, tronçonneuses) reste hors champ.
- Les **pages « marchand »** (« robot tondeuse Leroy Merlin », « robot piscine Lidl ») : la demande existe, mais le lecteur
  cherche un magasin, pas un conseil. Exception : la marque Parkside, vendue seulement par Lidl.

## 8. Ne casser aucune adresse

- Les 213 articles restent à leur adresse. Aucun déplacement vers un dossier.
- **Adresses à ne jamais réutiliser** (elles redirigent déjà vers un article complet) : `/robot-tondeuse-pente`,
  `/robot-tondeuse-rtk`, `/robot-tondeuse-vision-ia`, `/robot-tondeuse-multi-zones`, `/robot-tondeuse-haut-de-gamme`,
  `/robot-tondeuse-connecte`, `/robot-tondeuse-grande-surface`, `/entretien-robot-tondeuse`, `/robot-tondeuse-rapport-qualite-prix`,
  `/robot-tondeuse-500m2`, `/installation-robot-tondeuse`, `/robot-tondeuse-bruit-voisinage`, `/depannage-robot-tondeuse`,
  `/hivernage-robot-tondeuse`, `/robot-tondeuse-pas-cher`, `/simulateur`.
- **Les pages datées « 2026 »** restent à leur adresse et sont mises à jour sur place (titre et contenu), sans nouvelle
  page « 2027 » sur le même sujet. Les nouvelles pages n'ont pas d'année dans l'adresse.
- Un nouveau dossier (`/robot-piscine/`, `/arrosage/`, `/outils-jardin/`) ne doit pas porter le nom d'un article existant :
  vérifié le 15/11/2026, aucun article ne s'appelle ainsi.

## 9. Ce qu'il faut pour que ça tourne (hors rédaction)

| Quoi | Qui | Avant le |
|---|---|---|
| Ouvrir `/robot-piscine` : page de rubrique, pages `/robot-piscine/<page>`, entrée de menu, plan du site, puis passer la ligne à « ouverte » au point 3 | Dév QRT | **01/12/2026** (avancé le 18/11/2026) |
| Consigne de nuit (`article-prompts/robot-tondeuse.md`, hors de ce dépôt) : ne plus exiger les deux images de robot tondeuse dans les articles tracteurs, piscine, arrosage et outils ; suivre la règle « Choix du sujet de la nuit » du plan | Claude en session | dès que possible (les tracteurs s'écrivent depuis le 18/11/2026) |
| Lien marchand des produits hors robots tondeuses (tracteurs compris) : passer par `/go/…` comme pour les robots, sans les ajouter au quiz ni au comparateur | Dév QRT | 01/12/2026 |
| Articles tracteurs : vérifier que la carte « Notre choix » et les encarts automatiques n'affichent pas un robot tondeuse à la place d'un tracteur (chantier CRO) | Dév QRT, contrôle du Chef | au premier article tracteur |
| Rubrique tracteurs : entrée de menu et gabarit « rubrique » pour `/tracteur-tondeuse` | Dév QRT | quand 5 articles tracteurs sont en ligne |
| Mettre à jour sur place les classements par budget, par surface, 4 roues motrices et LiDAR (prix datés, modèles 2027, lien vers les nouveaux avis) | Contenu QRT | 01/02/2027 |
| Trouver quel marchand partenaire vend des tracteurs tondeuses (Cdiscount, Amazon, autre) ; sans marchand, la rubrique ne rapporte rien | Croissance QRT, puis propriétaire s'il faut un nouveau programme | 15/12/2026 |
| Ouvrir `/arrosage` (même travail) | Dév QRT | 01/04/2027 |
| Ouvrir `/outils-jardin` si le critère est rempli | Dév QRT, sur avis du Chef | 01/09/2027 |
| Revérifier les pages code promo (`lib/promos.ts`) : chaque jour du 20/11 au 02/12/2026, puis le 1er du mois | Croissance QRT | dès maintenant |
| Ajouter Aiper, Wybot et Beatbot aux pages code promo | Croissance QRT | à l'ouverture de la rubrique piscine |
| Mettre à jour `/robot-tondeuse-coupe-bordure-integre-top-6-2026` quand les robots à bras coupe-bordure annoncés à l'IFA 2026 (Navimow H5 Pro, Dreame A4 AWD Pro, Mammotion Luba 4 AWD, Eufy S2 Max) auront un prix en France | Contenu QRT | printemps 2027 |
| Pages « Avis + marque » et fiches notées des robots tondeuses (lot 3) | Dév QRT | avant mars 2027 (pic d'achat) |
| Barème public « robot de piscine », si l'on veut un jour des notes | propriétaire, puis Dév | pas avant l'été 2027 |

Tant que la première ligne n'est pas faite, la rédaction de nuit saute les sujets piscine et écrit les autres : rien ne se bloque.

## 10. Comment la demande a été vérifiée

- **Suggestions de recherche de Google en français** (France), relevées le 15/11/2026 sur environ 360 débuts de requête
  (robots de piscine, marques, accessoires, gazon, arrosage, outils, promos). Une requête est dite « confirmée par les
  suggestions » quand elle sort telle quelle ou presque dans ces suggestions.
- **Pages concurrentes** lues sur six recherches (classements de robots de piscine sans fil et hors-sol, Aiper ou Wybot,
  hivernage du robot de piscine, batteries compatibles, code promo Mammotion) : guide-piscine.fr, mypiscine.com,
  piscine-center.net, futura-sciences.com, labomaison.com, maniaques.fr, selectra.info, sites de codes (igraal, savoo).
- **Non relevé** : les « autres questions posées » de Google (l'outil de recherche ne les montre pas) et **tout volume de
  recherche** (aucun chiffre à notre portée : aucun n'est écrit dans le plan).
- Deux sujets portent « à confirmer » dans le plan : `/panne-robot-tondeuse-diagnostic` (page mère utile au maillage même
  sans requête forte) et `/reglement-europeen-batterie-remplacable-robot-tondeuse` (la requête « batterie remplaçable 2027 »
  est traitée pour les téléphones, pas encore pour les robots).
- **Passage du lundi 16/11/2026 (Éditeur QRT)** : recherche web sur les annonces des marques (salon IFA de septembre 2026 :
  Mammotion Luba 4 AWD, Segway Navimow H5 Pro, Dreame A4 AWD Pro, Sunseeker S7 et S5, Eufy S2 Max ; Ecovacs Ultramarine P1
  côté piscine). Sources lues : Labo Maison, Mac4Ever, L'Éclaireur Fnac, Tom's Guide, Clubic, communiqués des marques.
  Aucun prix français publié pour le Luba 4 AWD au 16/11/2026.

- **Passage du mercredi 18/11/2026 (Éditeur QRT, décision « produits chers »)** : environ 190 débuts de requête relevés
  dans les suggestions de Google en français (60 sur les tracteurs et autoportées, 90 sur les robots chers, 40 sur la
  piscine), puis 11 recherches web. Lu : comparatifs de tracteurs (futura-sciences.com, meilleurtest.fr), guides
  d'enseignes (Truffaut, Bricomarché, Mr.Bricolage, Castorama), « robot ou tracteur » (Ecovacs, Yarbo, L'Avenir),
  prix de lancement de la série Navimow X4 (Tom's Guide, Labo Maison : 2 499, 2 799 et 3 199 €), fiche Husqvarna du
  435X AWD NERA (pente annoncée 70 %), comparatifs piscine haut de gamme (futura-sciences.com, piscine-center.net).
  Toujours sans prix français au 18/11/2026 : Mammotion Luba 4 AWD et Dreame A4 AWD Pro. Lymow One Plus : 2 699 à
  2 999 € selon les sources, à vérifier ; Yarbo : aucun prix français trouvé.
- Ce que les suggestions montrent pour les tracteurs : la demande se range par **surface** (2 000, 3 000, 5 000 m²,
  1 hectare), par **budget** (2 000 €, 3 000 €), par **marque** (Husqvarna, John Deere, Cub Cadet, Stiga, MTD, Alpina)
  et par **type** (électrique, rider, rayon de braquage zéro, pente). Pour les robots chers : **« avis + modèle »**
  (Luba 3 AWD, Dreame A3 AWD Pro, Navimow X4, 430X NERA) et **« A vs B »** entre ces mêmes modèles.

Ce que les suggestions montrent, en bref : la demande piscine se range par **type de bassin** (hors-sol, coque, liner,
carrelage, 8x4, 10x5), par **budget** (moins de 200, 500, 1 000 €), par **marque** (Dolphin, Zodiac, Aiper, Wybot, Beatbot,
Dreame) et par **panne** (ne monte plus aux parois, ne bouge plus). Côté robot tondeuse, les accessoires se cherchent
**par marque** (lames Husqvarna, garage Mammotion, batterie Worx) et les avis par **marque absente du site** (Stiga, Kress,
Stihl, Sunseeker, Parkside, Anthbot).
