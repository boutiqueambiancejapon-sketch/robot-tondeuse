# Journal de l'équipe — Quel Robot Tondeuse

Le plus récent en haut. Chaque agent ajoute 3 à 6 lignes datées à la fin de son passage.

## 28/11/2026, samedi 14 h (heure belge) — Catalogue QRT (1er passage : base produits, Mammotion)

- **Fait** : `data/robots-tondeuses.json` ouvert avec **Mammotion, 21 modèles** (Luba 4, Luba 3, Luba mini 2, Luba mini AWD LiDAR, Luba 2, Yuka, Yuka mini, Yuka mini 2). Source : le tableau technique officiel du site FR (fichier de données de la page « Comparez », lu le 28/11) et les fiches `fr.mammotion.com/products/…`. `prix_eur` = prix normal affiché par la boutique (hors promotion du Black Friday), 15 modèles ; Luba 4 et Yuka mini (1re génération) n'y sont pas en vente, prix vide. `bruit_db` vide : Mammotion ne publie pas de chiffre par modèle. Champ ajouté `option_4g: true` quand le module 4G est vendu à part (pas compté « 4G »).
- **Contrôle** : `node scripts/catalogue-check.mjs` (format, doublons, champs obligatoires, valeurs permises, modèles par marque, collections possibles). Il trouve 729 combinaisons à 4 modèles ou plus, chiffre gonflé tant qu'il n'y a qu'une marque (« Mammotion » et « sans fil » valent tout le fichier) et avant le filtre anti-doublon.
- **Fiches du site qui contredisent Mammotion** (pour **Contenu**) : `lib/comparateur.ts` (Yuka Mini 2 1000 donné « Vision IA » 180 min, c'est LiDAR + vision 135 min ; Yuka 2000 210 min → 65 ; Yuka 3000 240 → 130 ; Luba mini 2 AWD 1000 « LiDAR + RTK » → vision + NetRTK, sans LiDAR ; Luba 3 AWD 1500 « LiDAR + RTK + vision » 180 min → LiDAR + vision 135 ; Luba 3 AWD 3000 240 → 175 ; Luba mini AWD LiDAR 180 → 150). `mammotion-luba-mini-2-awd-1000.yaml` : 20 zones → 10. `mammotion-luba-mini-awd-lidar-1500.yaml` : « sans RTK » → LiDAR + NetRTK + vision. Absents de la gamme FR : Yuka 1500, Yuka mini 700, « Yuka Mini Vision 700 », Luba mini AWD 800, Luba 2X AWD 10000, Luba 2 AWD 5000 (non X).
- **Claude en session** : ASIN des 21 modèles (l'API Amazon est refusée aux agents). **Catalogue, prochain passage** : Segway Navimow (tableau chargé par script : lire fiche par fiche), puis Husqvarna.

## 28/11/2026, samedi 11 h 15 (heure belge) — Éditeur QRT (2e passage en plus : plan après les envois du matin)

- **Doublon évité** : Contenu a écrit ce matin `/robot-piscine/meilleur-robot-piscine`, 1er sujet de décembre. Il est coché dans `tasks/plan-editorial.md` (« Écrits », 28/11). Sans cela, la nuit du 01/12 l'aurait réécrit. Le 01/12 prendra l'avis Husqvarna 430X NERA. À 11 h 07 la page était encore en 404 : fusion de 11 h 05, mise en ligne attendue dans l'heure (**Chef, 29/11** : la lire).
- **Calendrier** : novembre à jour, 9 sujets sur 12 écrits (20 au 27/11, dans l'ordre), 3 restent pour 3 nuits.
- **Abris** : suggestions Google relevées (abri de jardin, bois, métal, résine, 20 m², 10 m², composite, moins de 5 m², bureau isolé). Les 11 sujets sont confirmés. 2 ajoutés en mars : `/abri-jardin/abri-de-jardin-10m2` et `/abri-jardin/meilleur-abri-de-jardin-composite`. Le bureau de jardin en réserve n'est plus « à confirmer ». 258 sujets d'avance, 0 doublon.
- **Éditeur, lundi 30/11** : cocher les nuits du 28 et 29/11, relever les prix français du Luba 4 AWD, du Dreame A4 AWD Pro et du Husqvarna 430V NERA.

## 28/11/2026, samedi après-midi (heure belge) — Contenu QRT (premier article piscine, priorité du propriétaire)

- **Fait** : `/robot-piscine/meilleur-robot-piscine` (page mère des classements piscine, sujet de décembre avancé selon la consigne du 28/11). 6 robots, 5 profils : Dolphin E40i 1 399 € (« Notre choix »), E35 1 139 €, E10 699 €, E25 929 €, Liberty 600 1 199 € (prix conseillés Maytronics lus le 28/11), Beatbot AquaSense 2 Pro 1 799 € (boutique Beatbot, 28/11 ; prix barrés non repris), Zodiac Alpha RA 6900 iQ (prix non affiché par Zodiac). Aucune note, 7 boutons d'achat, défaut et anti-conseil par robot, 7 questions de FAQ. Lien ajouté depuis l'article sécurité piscine.
- **Limite** : la recherche Amazon par l'API m'a été refusée (lecture de la clé dans /srv bloquée). Les 7 boutons ouvrent donc une **recherche** Amazon, et le prix affiché dit sa source (« chez Maytronics »). Aiper (pas de prix sur ses fiches) et Wybot (boutique UE en 429) sont cités sans classement.
- Copie `content/authors/thomas.yaml` : « J'ai testé plus de 30 robots » retiré (la bio en ligne était déjà honnête). Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 156 tests OK, construction OK, 1 H1. Étiquette `sauvegarde-20261128-contenu-piscine`.
- **Claude en session** : passer les 7 boutons sur la fiche Amazon exacte avec le prix du jour (`scripts/amazon-cherche.mjs` « Dolphin E40i », « Dolphin E35 », « Dolphin E10 », « Dolphin E25 », « Dolphin Liberty 600 », « Beatbot AquaSense 2 Pro », « Zodiac RA 6900 iQ »). **Éditeur** : cocher ce sujet dans le plan. **Contenu, prochain passage** : article sécurité piscine (note « 9 » sans barème, « 90 % des cas documentés », 48,5 dB « Labo Maison » à vérifier, prix sans date), puis le 2e article piscine (sans fil).

## 28/11/2026, samedi 11 h (heure belge) — Contenu QRT (avis Luba 3 AWD 3000 : prix et superlatifs)

- **Fait** : avis `/avis-mammotion-luba-3-awd-3000`. Retirés : 3 prix sans date (« 2 299-2 699 € », « 2 499-2 999 € », « 1 999-2 499 € »), 2 « le plus capable du marché », « la moins chère du marché », « meilleur rapport performances/prix », « pas de concurrent sérieux », « choix évident », « le roi des terrains complexes », 2 « 800+ revendeurs », un faux ratio de charge du 450X, un « +30 % d'autonomie » sans source, 3 phrases qui se lisaient comme un essai (bandes « comme un stade », coupe « nette », pas d'ornières).
- **Prix posés, datés** : 2 149 € (boutique Mammotion, relevé du 27/11 ; Cdiscount 28/11), 450X NERA 5 829 € chez Cdiscount le 28/11 et « modèle arrêté » (page Husqvarna lue le 28/11 : 5 000 m², 50 %, 24 cm, 58 dB), Yuka Mini 2 1000 949 € (Cdiscount 28/11). Worx WR330E : « non relevé ». Fiche `mammotion-luba-3-awd-3000.yaml` : prix « à vérifier chez le marchand ». « Le site n'a pas essayé ce robot » ajouté. 3 liens : 2 duels Luba 3 AWD 3000 et le classement moins de 3 000 €.
- **Pas vérifié** : page Mammotion du Luba 3 (refus temporaire du site, 429) et page Worx (404). Les chiffres Mammotion restent marqués « annoncés ». La note « 9 » du verdict n'a pas de barème : laissée, à voir avec le lot 3 (Dév).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 156 tests OK, construction OK, 1 H1. Étiquette `sauvegarde-20261128-contenu-luba3`.
- **Chef, 29/11** : lire l'avis en ligne (plus de « 2 299 », plus de « marché »). **Contenu, prochain passage** : relire la page Mammotion du Luba 3 (batterie, bruit, poids, 30 zones), puis le classement autonomie (450X NERA).

## 28/11/2026, samedi 10 h 50 (heure belge) — Dév QRT (Deals, étape DL2 : détection des baisses)

- **Fait** : `lib/deals-detection.ts` lit l'historique Awin. Un produit entre si son prix passe sous le plus bas des 30 jours précédents chez le même marchand, avec au moins 30 jours d'historique avant la baisse. Il sort si le prix remonte, s'il quitte le flux, ou si la baisse dure depuis 30 jours (c'est alors son prix habituel). `lib/deals.ts` en tire la liste de `/deals`, avec lien et nom du dernier relevé, seulement si ce relevé porte le même prix.
- 10 tests ajoutés (entrée, égalité, sortie par hausse, par sortie du flux, après 30 jours, historique trop court, marchands séparés). Types OK, lint 0 erreur (20 avertissements anciens), 156 tests OK, construction OK. `/deals` à 390 px : inchangée (« Aucune baisse… »), normal tant que l'historique est vide. Étiquette `sauvegarde-20261128-deals-dl2`.
- **Toujours bloquant (Claude en session)** : `historique-awin.json` est encore vide en ligne. `qrt-offres.sh` n'enregistre que `offres.json` (ligne 23). Sans ce petit ajout, DL2 ne trouvera jamais rien.
- **Dév, prochain passage** : DL3 (périmètre élargi : lames, batteries, garages, câbles, RTK, tracteurs, piscine, avec liste de mots exclus). Le texte de `RegleBaisse` (« Ce relevé n'est pas encore branché ») sera revu à DL4.

## 28/11/2026, samedi 10 h 45 (heure belge) — Chef QRT (passage en plus : contrôle des envois de la matinée)

- **En ligne** : 10 adresses lues, 9 pages en 200 avec 1 H1, `/test-mammotion-luba-2-awd-avis` en 308. 5 captures à 390 px (accueil, avis Luba 3 AWD 3000, duel Luba 3 AWD / Navimow X4, `/deals`, `/robot-piscine`) : rien de cassé, rien à annuler. Mes 2 corrections de 10 h sont en ligne (carte « Notre choix » = Luba 3 AWD 3000, Cdiscount 2 149 € relevé le 28/11 ; plus de « J'ai tourné »).
- **Corrigé** : classement moins de 3 000 €, « Construction robuste, testée sur trois mois sans blocage majeur » (sans auteur, se lit comme un essai du site) → « Le Café du Geek, qui l'a gardé trois mois, ne signale aucun blocage. Le site, lui, ne l'a pas essayé. »
- **Décision du propriétaire du 28/11 prise en compte** : abris de jardin et autres produits chers du jardin sur ce site (Éditeur). Liste du propriétaire : prix Amazon retiré (API ouverte) ; ajouté le script du serveur `qrt-offres.sh` qui doit enregistrer `historique-awin.json` (Claude en session), sinon les Deals n'auront jamais de baisse à montrer.
- **Dév** : DL2, puis les 3 liens Amazon indisponibles. **Contenu** : prix de l'avis Luba 3 AWD 3000 (« le plus capable du marché » toujours en ligne). **Chef, 29/11** : relire le classement moins de 3 000 € et vérifier que l'historique Awin grossit.

## 28/11/2026, samedi midi (heure belge) — Éditeur QRT (passage en plus : décision du propriétaire « jardin haut de gamme »)

- **Fait** : rubrique « Abris et cabanes de jardin » (500 à 3 000 €) écrite dans `tasks/arborescence.md` (fiche 4.4 bis, gabarits d'adresse, dossier `/abri-jardin/`, état **fermée**). Ancienne règle « pas de cabanons » barrée dans les 3 fichiers. Pergolas, serres, barbecues, spas et mobilier : notés comme cluster 3, un à la fois, après les abris.
- **Plan** : 11 sujets datés (janvier : page mère `/abri-jardin/meilleur-abri-de-jardin`, démarches, bois/métal/résine ; février : bois ; mars : métal, résine, fondation, taxe d'aménagement, 20 m², limite de propriété, moins de 5 m²) + 1 en réserve (bureau de jardin, à confirmer). Requêtes vérifiées par 11 recherches web (service-public.gouv.fr F662, economie.gouv.fr, comparatifs). Consigne « Abris de jardin » ajoutée aux règles du plan. 0 doublon avec les articles et les pages de `app/`.
- **Nuits du 23 au 27/11** : 5 articles, tous du plan et cochés par la rédaction. Novembre : 3 sujets restent pour 3 nuits. 257 sujets d'avance.
- **Dév** : ouvrir `/abri-jardin` avant le 01/01/2027 (page de rubrique, entrée sous « Jardin », plan du site, ligne « ouverte »), puis filtre « Abris » dans `/deals`. Sans cela, la nuit saute ces sujets, rien ne bloque. **Éditeur, 30/11** : suggestions Google sur les abris, cocher les nuits du 28 et 29/11.

## 28/11/2026, samedi 9 h 50 (heure belge) — Dév QRT (Deals, étape DL1 : historique des prix Awin)

- **Fait** : `scripts/offres-awin.mjs` ajoute à chaque relevé une ligne par produit et par marchand (clé, marchand, prix, date et heure UTC à la minute) dans `content/offres/historique-awin.json`, 90 jours glissants. Le calcul est dans `scripts/historique-awin.mjs`. Un relevé relancé à la même minute remplace le précédent. `historique-prix.json` n'est pas touché. Rien d'affiché.
- **Essai** : script lancé sur un petit faux flux dans une copie à part : 2 lignes écrites, puis toujours 2 au second lancement. 4 tests ajoutés (coupe à 90 jours comprise).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 146 tests OK, construction OK. Étiquette `sauvegarde-20261128-deals-dl1`.
- **Bloquant, pour Claude en session (script du serveur, hors de nos droits)** : `~/Toutou/deploy/sites/qrt-offres.sh` n'enregistre que `offres.json`, et s'arrête si ce fichier n'a pas changé. Il faut y ajouter `content/offres/historique-awin.json` (dans `git add` et dans le test « inchangés »). Sans cela, l'historique se perd à chaque relevé et DL2 n'aura rien à lire.
- En ligne à 9 h 47 : accueil, avis Luba 3 AWD 3000 et `/deals` en 200 avec 1 H1, ancien lien Luba en 308. La carte « Notre choix » montre encore le LUBA 2 : la correction du Chef date de 9 h 44, pas encore publiée. **Chef, 29/11** : la relire. **Dév, prochain passage** : DL2 (détection dans `lib/deals.ts`).

## 28/11/2026, samedi 10 h (heure belge) — Chef QRT (passage en plus : contrôle et découpage du chantier Deals)

- **En ligne** : 10 adresses lues, 9 pages en 200 avec 1 H1, `/test-mammotion-luba-2-awd-avis` → `/avis-mammotion-luba-3-awd-3000` en 308 (travail du Dév conforme). 6 captures à 390 px : accueil, avis Luba 3 AWD 3000, 2 duels corrigés ce matin (H1 sur 3 lignes, plus de « 195 »), `/deals`, `/tracteur-tondeuse`. Rien à annuler.
- **Corrigé par le Chef** : avis Luba 3 AWD 3000, la carte « Notre choix » montrait le LUBA 2 AWD 5000 (le premier encart de l'article) : les 2 encarts sont inversés. Duel Yuka Mini 2 / 310 Mark II (en ligne depuis mai) : « J'ai tourné les deux robots cette saison… en test prolongé… suivi long terme depuis 2023 » remplacé par « Le site n'a essayé aucun de ces deux robots ».
- **Chantier Deals** (demande du propriétaire du 28/11, `tasks/deals-v1.md`) découpé en 5 étapes d'un passage dans `tasks/equipe.md` : DL1 à DL4 pour le Dév (passent avant les adresses `/test-…`), DL5 pour le Croissance. Règle ajoutée : pas de baisse affichée sans 30 jours d'historique, donc pas avant le 28/12 environ. 2 décisions ajoutées à la liste du propriétaire (prix Amazon : outil officiel ou Keepa payant ; nouveaux marchands Awin).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 2 pages construites lues (1 H1, bonne carte, plus de « J'ai tourné »). Étiquette `sauvegarde-20261128-chef-2`.
- **Dév** : DL1. **Contenu** : prix et superlatifs de l'avis Luba 3 AWD 3000. **Chef, 29/11** : lire ces 2 corrections en ligne et `offres.json` daté du 28/11 ou après.

## 28/11/2026, samedi 9 h 30 (heure belge) — Chef QRT (prix Cdiscount datés du 23/11, proposition validée par le propriétaire)

- **Lu, rien changé** : la tâche du serveur `qrt-offres.timer` part **une fois par semaine, le lundi à 2 h 15 (UTC)**. Dernier passage : lundi 23/11, terminé sans erreur à 2 h 19 ; l'enregistrement « weekly Cdiscount and Fnac prices » du 23/11 est bien là. Prochain passage prévu : **lundi 30/11 à 2 h 15 UTC**.
- **Conclusion** : rien n'est bloqué. La date du 23/11 est normale pour un relevé hebdomadaire. Le relevé du 20/11 était un envoi en plus, fait à la main.
- Le journal détaillé de la tâche n'est pas lisible par notre compte : seul son état (« réussi ») a été lu.
- **Chef, 30/11** : vérifier que `content/offres/offres.json` porte la date du 30/11. Sinon, Claude en session.

## 28/11/2026, samedi 9 h (heure belge) — Dév QRT (adresse 3 sur 8 : Luba 3 AWD 3000)

- **Constat** : la page `/test-mammotion-luba-2-awd-avis` ne parle pas du Luba 2 : c'est l'avis d'avril sur le **Luba 3 AWD 3000**. L'adresse prévue `/avis-mammotion-luba-2-awd` aurait trompé. Elle devient donc `/avis-mammotion-luba-3-awd-3000`, avec un renvoi permanent dans `next.config.ts`. 5 liens mis à jour dans 5 articles, plus le sujet du plan éditorial. Le lien du duel Dreame A1 Pro disait « avis LUBA 2 AWD » : texte corrigé. `h1:` « Avis Luba 3 AWD 3000 » : 2 lignes à 390 px (la version avec « Mammotion » en faisait 4).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. En local : ancienne adresse → nouvelle (308), nouvelle en 200 avec 1 H1 et la bonne adresse canonique, plan du site avec la nouvelle seulement. Renvoi 450X d'hier contrôlé en ligne (308). Étiquette `sauvegarde-20261128-avis-luba-3-awd-3000`.
- **Pour le Contenu (vu, pas touché)** : dans cet avis, l'encart « Notre choix » montre le **LUBA 2 AWD 5000** (1 999-2 499 €, lien Amazon B0CQRGMKSR) au lieu du Luba 3 AWD 3000. Et cette page double en partie `/avis-mammotion-luba-3-awd` (20/11, toutes versions) : à fusionner un jour (renvoi vers la page du 20/11) ou à recentrer sur la seule version 3000.
- **Chef, 29/11** : lire en ligne le renvoi `/test-mammotion-luba-2-awd-avis` et le H1. **Dév, prochain passage** : `/test-segway-navimow-i-series-avis` (restent 5 : Navimow i, Bosch S+ 500, 310 Mark II, Life 750, Worx WR205E).

## 28/11/2026, samedi 8 h 15 (heure belge) — Chef QRT (contrôle du samedi)

- **En ligne** : 12 adresses lues, 11 pages en 200 avec 1 H1, aucun lien Amazon sans étiquette. Renvoi `/test-husqvarna-automower-450x-nera-avis` → `/avis-…` (308) et H1 « Avis Husqvarna 450X NERA » conformes. `/black-friday-robot-tondeuse` daté du 27/11. 6 captures à 390 px. Article de la nuit `/mammotion-luba-3-awd-vs-segway-navimow-x4-comparatif` conforme (H1 sur 2 lignes, prix datés, note avec barème, aucun vécu).
- **Corrigé par le Chef** : duel Dreame A3 / 450X NERA, H1 sur 7 lignes → `h1:` « Dreame A3 AWD Pro ou 450X NERA ? » ; « meilleur ratio autonomie/charge du marché » et « ratio 195/40 min » (encart) retirés, remplacés par les 145 min de la fiche Husqvarna (oubliés hier). Duel 450X / Luba 3 AWD 5000 : « mesurés selon plusieurs tests » → les deux sources nommées (Maniaques, Neozone) ; « l'état de l'art selon plusieurs testeurs » retiré.
- Recherche large « testé », « j'ai », « mon terrain » : seulement des « J'ai croisé les fiches… » (lecture de sources, pas un faux vécu). Encarts : Cdiscount « relevé le 23/11 », attendu (flux hebdomadaire).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 2 pages construites lues. Étiquette `sauvegarde-20261128-chef`.
- **Contenu** : le duel Dreame A3 / 450X garde 4 « 800+ revendeurs » et le prix « 4 699-4 999 € » sans source (points 4 et 7). **Chef, 29/11** : lire en ligne les 2 duels corrigés.

## 27/11/2026, vendredi soir (heure belge) — Contenu QRT (chiffres du 450X NERA dans les autres pages, validé par le Secrétaire)

- **Source** : fiche Husqvarna française relue le 27/11 : 50 % de pente au travail, 25 % en limite de fil, 145 min de tonte par charge. Pas de temps de charge, pas de prix (« Produit abandonné »).
- **Corrigé dans 7 fichiers** : les 2 duels (Dreame A3 et Luba 3 AWD 5000 : « 70 % », « 45-55 % réel », « 195 min / 40 min, meilleur ratio du marché » retirés ; la ligne autonomie du duel Luba passe au Mammotion, 215 min contre 145) ; guide 5 000 m² ; guide 1 hectare (45 % → 50 %) ; classement autonomie (195 → 145 min) ; tableau de l'avis Luba 2 AWD (70 % → 50 %) ; fiche `husqvarna-automower-450x-nera.yaml` (45 % → 50 %). Les 8 autres pages de la liste donnent 70 % à un autre robot (535 AWD, 435X AWD) ou parlent d'autre chose : rien à changer.
- **Doute laissé au Contenu** : le classement autonomie garde « 40 min de charge » et « 7,5 Ah ». La fiche Husqvarna ne donne ni l'un ni l'autre, et tout le n° 4 repose dessus (« meilleur ratio »). À sourcer, ou à revoir la place du robot (abandonné). Les prix du 450X (3 699 €+, 4 699-4 999 €) restent aussi dans ces pages, sans source.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 3 pages construites lues (0 « 195 min », 1 H1). Étiquette `sauvegarde-20261127-450x-chiffres`.
- **Chef, 28/11** : lire en ligne les 2 duels (pente 50 % / 25 %, 145 min).

## 27/11/2026, vendredi 15 h (heure belge) — Croissance QRT (Black Friday : relevé et tour promo du 27/11)

- **Relevé** : `npm run releve-prix` donne 13 prix, 0 échec, tous identiques au 26/11. Dates de `lib/promos.ts` passées au 27/11.
- **Tour des 13 marques** : aucune offre confirmée, aucun code valable pour un robot. Bosch `BLACKFRIDAY26` toujours limité aux outils 18 V (jusqu'au 02/12). Ecovacs A1600 à 799 €, plus bas des 30 jours toujours 999 € (lu dans la page). Husqvarna : les mêmes 8 robots, sans prix. Stiga (899, 1 079, 1 249 €) et Einhell (299,95 et 349,95 €, « indisponibles ») inchangés. Gardena : page « Cyber Week » toujours en erreur 404 chez nous, sense 400 relu à 899,99 €.
- **Sunseeker** : son vrai site français est `sunseekertech.com/fr`. Il ne vend pas en ligne ; sa page « Où acheter » renvoie vers 8 magasins (Amazon, Leroy Merlin, Castorama, Darty, Bricomarché, Brico Dépôt, ManoMano, Joybuy). Note ajoutée sur `/code-promo/sunseeker`, avec la source.
- **Fichier `content/offres/offres.json`** : daté du 23/11 (envois du 16, 20 et 23/11). Le flux part une fois par semaine : le prochain est attendu vers le 30/11. Il n'est pas bloqué. S'il n'avance pas le 01/12 : Claude en session.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, pages construites lues (« Dernier contrôle le 27 novembre 2026 »). Étiquette `sauvegarde-20261127-promos`.
- **Croissance, 28/11** : vérifier en ligne l'envoi du 27/11, puis relevé et tour promo (jusqu'au 02/12). **Chef, 28/11** : `/black-friday-robot-tondeuse` daté du 27/11.

## 27/11/2026, vendredi après-midi (heure belge) — Dév QRT (prix et pente du 450X NERA, proposition validée par le Secrétaire)

- **Vérifié** : la fiche Husqvarna française, relue ce jour, marque le 450X NERA « Produit abandonné », sans prix. Elle donne 50 % de pente au travail, 25 % en limite de fil et 145 min de tonte.
- **En ligne** : `/avis-husqvarna-automower-450x-nera` en 200 avec 1 H1. Plus de « 3 699 € », de « 45 % » ni de « 195 min ». Le seul « 70% » est la colonne Mammotion du tableau. Le Contenu avait déjà tout corrigé ce matin (commit 3bc0516, en ligne).
- **Rien modifié** dans l'article : les deux contradictions signalées n'existent plus. Seuls ce journal et le tableau changent.
- **Reste pour le Contenu** (déjà noté ce matin) : les autres pages qui donnent 70 % ou 195 min au 450X NERA.

## 27/11/2026, vendredi 10 h 30 (heure belge) — Contenu QRT (190 m² sourcé, avis 450X NERA corrigé)

- **Duel MOVA LiDAX Ultra 800 / Goat A1600** : le « 190 m² par charge » d'un « test terrain » sans nom vient de l'essai de Presse-citron (16/08/2026, page lue) : 7 passages attribués au média, « autonomie mesurée » retiré, pente de l'Ecovacs sur sol humide créditée à Presse-citron.
- **Avis 450X NERA** (signalé par le Dév) : page Husqvarna lue le 27/11. Le modèle y est marqué « Produit abandonné », sans prix. Pente corrigée : 50 % au travail et 25 % au câble (et non 70 % ni 45 %). Tonte par charge : 145 min (et non 195). Retirés : « 40 min de charge », « meilleur ratio du marché », « notre estimation », 6 « 800+ revendeurs ». Encart sans prix inventé, prix d'avril 2026 datés « non revérifiés ». 4 liens ajoutés (classement grand terrain, 2 duels, guide de gamme).
- Article de la nuit `/meilleur-robot-tondeuse-grand-terrain` relu : conforme (prix datés, sources nommées, aucun vécu).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page construite. Étiquette `sauvegarde-20261127-contenu-honnetete`.
- **Chef, 28/11** : lire en ligne « Produit abandonné » sur `/avis-husqvarna-automower-450x-nera`. **Contenu, prochain passage** : H1 courts lot 3, puis recherche large « j'ai ». Les autres pages qui donnent 70 % ou 195 min au 450X NERA restent à corriger.

## 27/11/2026, vendredi 9 h (heure belge) — Dév QRT (adresse 2 sur 8 : 450X NERA)

- **Fait** : `/test-husqvarna-automower-450x-nera-avis` devient `/avis-husqvarna-automower-450x-nera`, renvoi permanent dans `next.config.ts`. 21 liens mis à jour dans 19 articles. `h1:` court « Avis Husqvarna 450X NERA » : 3 lignes à 390 px avec la mascotte (la version avec « Automower » en faisait 4).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. En local : ancienne adresse → nouvelle (308), nouvelle en 200 avec 1 H1 et la bonne adresse canonique, plan du site avec la nouvelle seulement. Étiquette `sauvegarde-20261127-avis-450x-nera`.
- **Pour le Contenu (vu, pas touché)** : dans cet avis, le prix de l'encart « Notre choix » (3 699 €+) contredit le résumé (4 699-4 999 €), et la pente annoncée dit 70 % en FAQ mais 45 % dans l'encart. À vérifier sur la fiche Husqvarna. La page garde aussi 6 « 800+ revendeurs ».
- **Chef, 28/11** : lire en ligne le renvoi `/test-husqvarna-automower-450x-nera-avis` et le H1 à 390 px. **Dév, prochain passage** : `/test-mammotion-luba-2-awd-avis` (restent 6).

## 27/11/2026, vendredi 8 h 15 (heure belge) — Chef QRT (contrôle du Black Friday)

- **En ligne** : 11 pages en 200 avec 1 H1, 6 captures à 390 px, aucun lien Amazon sans étiquette, rien à annuler. Conformes : renvoi `/test-mammotion-yuka-mini-2-avis` → `/avis-mammotion-yuka-mini-2` (308) ; H1 de `/robot-tondeuse-silencieux` sur 3 lignes ; `/black-friday-robot-tondeuse` et `/code-promo/husqvarna` datés du 26/11 ; article de la nuit `/meilleur-robot-tondeuse-grand-terrain` (prix datés du 26/11, sources nommées, aucun « testé »).
- **Corrigé par le Chef** : H1 de l'avis Yuka Mini 2 sur 6 lignes (`h1:` « Avis Mammotion Yuka Mini 2 ») ; « J'ai un terrain de 720 m² depuis 10 ans. J'y ai installé quatre robots » (guide 500-1 000 m², signalé hier par le Croissance) remplacé par « Le site n'a essayé aucun de ces robots… » ; légende d'image « testé sur pelouse » (article occasion).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, textes lus dans les pages construites. Étiquette `sauvegarde-20261127-chef`.
- **À voir** : les encarts affichent Cdiscount « relevé le 23/11 » (fichier `content/offres/offres.json`, flux du serveur) : daté donc honnête, mais vieux de 4 jours un jour de Black Friday. **Croissance** : noter la date du fichier ; si elle n'avance plus, Claude en session.
- **Prochaines étapes** écrites au tableau : Dév → `/test-husqvarna-automower-450x-nera-avis` en `/avis-…` ; Contenu → source du 190 m², H1 lot 3, recherche du vécu inventé (« j'ai ») ; Croissance → relevé et tour promo du 27/11. **Chef, 28/11** : lire les 3 corrections en ligne.

## 26/11/2026, jeudi soir (heure belge) — Chef QRT (adresse /test- → /avis-, proposition validée par le Secrétaire)

- **Fait (page 1 sur 8)** : `/test-mammotion-yuka-mini-2-avis` devient `/avis-mammotion-yuka-mini-2`, avec renvoi permanent de l'ancienne adresse (`next.config.ts`). 54 liens mis à jour dans 43 articles, plus l'exemple du skill boileau. Plus aucun lien vers l'ancienne adresse.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. En local : ancienne adresse → nouvelle (308), nouvelle en 200 avec 1 H1 et la bonne adresse canonique, plan du site sans l'ancienne. Étiquette `sauvegarde-20261126-avis-yuka-mini-2`.
- **Restent 7 pages** `/test-…` (Bosch S+ 500, Husqvarna 310 Mark II et 450X NERA, Navimow i, Luba 2 AWD, Gardena Life 750, Worx Vision WR205E) : **Dév QRT**, une par passage, même méthode (renommer le fichier, renvoi dans `next.config.ts`, remplacer `](/test-…)`).
- **Chef, 27/11** : lire en ligne `/test-mammotion-yuka-mini-2-avis` (doit renvoyer) et `/avis-mammotion-yuka-mini-2` (200, 1 H1).

## 26/11/2026, jeudi 15 h (heure belge) — Croissance QRT (relevé et tour promo du 26/11)

- **Relevé** : `npm run releve-prix` donne 13 prix, 0 échec, tous identiques au 25/11 (fichier enregistré). Dates de `lib/promos.ts` passées au 26/11.
- **Tour des 13 marques** : aucune offre confirmée, aucun code valable pour un robot. Bosch : `BLACKFRIDAY26` toujours limité aux outils 18 V (jusqu'au 02/12). Ecovacs : A1600 à 799 €, plus bas des 30 jours toujours 999 €. Stiga (899, 1 079, 1 249 €) et Einhell (299,95 et 349,95 €, « indisponibles à la vente ») inchangés.
- **Nouveau** : Husqvarna range maintenant 8 robots dans « Offres en cours » (ajout des 305E NERA, 310E NERA, 430V NERA et 435X AWD NERA), toujours sans prix lisible : note mise à jour. Gardena : la page « Cyber Week » renvoie une erreur chez nous, seul le sense 400 est relu (899,99 €) ; la note et la source le disent.
- **Pour le Contenu** : `quel-robot-tondeuse-jardin-500-1000-m2-moyen.mdx`, ligne 38 : « J'ai un terrain de 720 m² depuis 10 ans. J'y ai installé quatre robots différents » laisse croire à un essai personnel. À réécrire sans vécu inventé. Je n'y ai pas touché (pas mon rôle).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 4 pages locales en 200 avec 1 H1 et « 26 novembre ». Étiquette `sauvegarde-20261126-promos`. **Chef, 27/11** : lire « 26 novembre » sur `/black-friday-robot-tondeuse` et « huit robots » sur `/code-promo/husqvarna`. **Croissance, 27/11** : Black Friday, passage le matin si possible.

## 26/11/2026, jeudi 10 h 30 (heure belge) — Contenu QRT (H1 courts lot 2)

- **Fait** : `h1:` court sur 23 articles (24 à 32 signes), dont `/robot-tondeuse-silencieux` (« Robots tondeuses silencieux ») et `/robot-tondeuse-sans-abonnement-top-5-2026` raccourci en « Robots sans abonnement ». Les 21 autres : les titres les plus longs (surtout des duels de robots à plus de 1 000 €).
- **Dans les mêmes pages** : « 800+ revendeurs » retiré partout (reste 56 fichiers sur le site), délais de réparation sans source retirés (« 48-72 h », « moins de 72 h », « 48 h sur cas documenté »), 14 « mesuré / testé / constaté » sans source remplacés par « autour de … (ordre de grandeur) », « annoncé » ou le média déjà nommé.
- **Laissé, à reprendre** : duel MOVA LiDAX Ultra 800 / Goat A1600 : « environ 190 m² par charge » vient d'un « test terrain » sans nom, cité 5 fois. Trouver la source ou retirer le chiffre (Contenu, prochain passage).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page lue. Étiquette `sauvegarde-20261126-h1-courts-lot2`.
- **Chef, 27/11** : H1 de `/robot-tondeuse-silencieux` à 390 px (doit tenir sur 2 lignes). **Contenu, prochain passage** : source du 190 m², puis H1 lot 3 (164 titres de plus de 45 signes sans `h1:`).

## 26/11/2026, jeudi 9 h (heure belge) — Dév QRT (petits restes)

- **Fait** : trou sous les 4 gestes de `/calendrier-du-gazon` réduit (la section du calendrier ne garde plus sa marge du bas, la suivante garde la sienne) : environ 40 px de vide en moins à 390 px, capture faite. Règle limitée au calendrier (`app/v2-promos.css`).
- **Retiré, inutilisés** : 3 lignes `.pricetag` (`app/v2-articles.css`), `lib/article-ctas.ts` (aucun fichier ne l'importait), `content/styles.css` (seule l'ancienne maquette supprimée hier s'en servait).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 4 pages locales en 200 avec 1 H1. Étiquette `sauvegarde-20261126-petits-restes`.
- **Chef, 27/11** : regarder `/calendrier-du-gazon` à 390 px, sous le geste n° 4. **Dév, prochain passage** : adresses `/test-…` → `/avis-…` avec redirection 301, en commençant par `/test-mammotion-yuka-mini-2-avis`.

## 26/11/2026, jeudi 8 h 15 (heure belge) — Chef QRT (contrôle)

- **En ligne** : 12 pages en 200 avec 1 H1, 7 captures à 390 px, aucun lien Amazon sans étiquette. Rien de cassé, rien à annuler. Types OK, lint 0 erreur (20 avertissements).
- **Conformes** : « Notre choix » pleine largeur sur `/robot-tondeuse-sans-abonnement-top-5-2026` ; H1 court et FAQ bruit (59 dB nommé Que Choisir) sur le duel Aspire R4/S+ 500 ; avis Navimow X4 de la nuit (H1 sur 2 lignes, prix datés du 25/11, sources nommées, « le site n'a pas essayé ce robot ») ; Black Friday et Einhell datés du 25/11.
- **Corrigé par le Chef** : « Le Life 750 est testé sur notre site » (`quel-robot-tondeuse-jardin-massifs-potager-zones-interdites-2026`) et « configuration testée » (duel Ecovacs A3000/Navimow i220). Trouvés par la recherche large, absents des listes de l'équipe.
- **Défauts confiés** : H1 de `/robot-tondeuse-silencieux` sur 6 lignes et `/robot-tondeuse-sans-abonnement-top-5-2026` sur 4 (Contenu, en tête du lot 2) ; 8 adresses `/test-…` liées depuis 95 articles, à passer en `/avis-…` avec redirection (Dév, après les petits restes).
- **Croissance, 26/11** : relevé et tour promo comme prévu ; vendredi 27/11 le matin si possible. **Chef, 27/11** : contrôle Black Friday.

## 25/11/2026, mercredi soir (heure belge) — Contenu QRT (bruit sans source, proposition validée par le Secrétaire)

- **Fait** : « mesuré à … dB selon les tests » retiré des 6 duels (Aspire R4/S+ 500, Yuka Mini 2 1000/310 Mark II, Luba Mini 2/Yuka Mini 2, XS 300/M500, S+ 500/M500, Yuka 1500/i215). 10 lignes changées : FAQ et tableaux disent « autour de … dB (ordres de grandeur) » ou « annoncé » quand la fiche de la marque est nommée. Les chiffres ne bougent pas.
- **Pas de média ajouté** : je n'ai lu aucune source pendant ce passage, donc aucun « selon … » nouveau. Restent tels quels, car ils nomment déjà un média : Que Choisir (Aspire R4, 59 dB) et Clubic (Yuka Mini 2, 57-58 dB). À relire un jour.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, nouveau texte lu dans la page construite. Étiquette `sauvegarde-20261125-bruit-sans-source`.
- **Chef, 26/11** : lire la FAQ bruit de `/husqvarna-aspire-r4-vs-bosch-indego-s-plus-500-comparatif` en ligne. **Contenu, prochain passage** : H1 courts lot 2, comme prévu.

## 25/11/2026, mercredi 15 h (heure belge) — Croissance QRT (relevé et tour promo du 25/11)

- **Relevé** : `npm run releve-prix` donne 13 prix, 0 échec, tous identiques au 24/11 (fichier enregistré). Dates de `lib/promos.ts` passées au 25/11.
- **Tour des 13 marques** : aucune offre confirmée, aucun code valable pour un robot. Bosch : `BLACKFRIDAY26` toujours limité aux outils 18 V (jusqu'au 02/12). Ecovacs : A1600 à 799 €, plus bas prix des 30 jours toujours 999 € (reste en « prix relevé »). Stiga : A 6v, A 8v, A 10v aux mêmes prix. Husqvarna : les 4 robots toujours en « Offres en cours ».
- **Notes corrigées** : Einhell marque ses 2 robots « indisponibles à la vente sur le site » (écrit dans la note). Gardena : seul le prix du sense 400 a pu être relu le 25 (899,99 €), la note le dit et garde les 2 autres prix datés du 24.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page lue. Étiquette `sauvegarde-20261125-promos`. En ligne : l'envoi d'hier est arrivé (« 24 novembre » sur 4 pages, 1 H1 chacune).
- **Chef, 26/11** : lire « 25 novembre » sur `/black-friday-robot-tondeuse` et la note Einhell. **Croissance, 26/11** : relevé et tour promo ; vendredi 27/11, passage le matin si possible.

## 25/11/2026, mercredi soir (heure belge) — Dév QRT (ancienne maquette, proposition validée par le Secrétaire)

- **Supprimé** : les 7 `.jsx` de `content/` (`components-shared`, `data`, `design-canvas`, `page-article`, `page-hub`, `page-tools`, `tweaks-panel`) et `content/Quel Robot Tondeuse.html`. Vérifié avant : aucun fichier du site ne les importe (seule mention : une règle « ignorer » du lint). Ils contenaient 2 « testé » (`page-article`, `page-hub`).
- **Laissé** : `content/styles.css`, que seul le `.html` utilisait. Hors de la proposition, donc gardé ; à retirer au prochain passage si le Chef est d'accord.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. Étiquette `sauvegarde-20261125-retrait-maquette`.
- **Chef, 26/11** : contrôle habituel, rien de visible ne doit changer. **Dév, prochain passage** : petits restes (`.pricetag`, trou de `/calendrier-du-gazon`).

## 25/11/2026, mercredi 10 h 30 (heure belge) — Contenu QRT (H1 courts, lot 1)

- **Fait** : champ `h1:` court (24 à 32 signes) sur 20 articles aux titres les plus longs : `robot-tondeuse-sans-abonnement-top-5-2026` (« Robots tondeuses sans abonnement »), `robot-tondeuse-lidar-top-5-2026`, l'avis Bosch S+ 500 (« Avis Bosch Indego S+ 500 »), le duel Aspire R4/Bosch S+ 500 (« Aspire R4 ou Indego S+ 500 ? ») et 16 duels. Le `title:` long reste pour Google. Vérifié dans la construction : 1 H1 court par page.
- **Relu sur les mêmes pages** : « 800+ revendeurs » retiré des 20 pages (36 endroits, dont `robot-tondeuse-sans-abonnement-top-5-2026` et le duel Aspire R4/Bosch S+ 500 signalés par le Chef), avec les délais « 24-48 h » et « 48-72 h » sans source. Reste **71 fichiers** avec « 800+ revendeurs » ailleurs.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. Étiquette `sauvegarde-20261125-h1-courts`.
- **Vu en relisant, laissé pour le lot « mesuré »** : ces duels disent « mesuré à … dB selon les tests » sans nommer le test (Aspire R4/S+ 500, Yuka Mini 2 1000/310 Mark II, Luba Mini 2/Yuka Mini 2, XS 300/M500, S+ 500/M500, Yuka 1500/i215). **Chef, 26/11** : lire à 390 px les 3 pages ci-dessus (H1 sur 2 lignes au plus). **Contenu, prochain passage** : H1 courts lot 2 (titres de 99 signes et moins, environ 194 articles sans `h1:`), puis « 800+ ».

## 25/11/2026, mercredi 9 h (heure belge) — Dév QRT (« Notre choix » sans photo, ancienne maquette)

- **Fait** : l'encart « Notre choix » sans photo met le texte sur toute la largeur (une règle dans `app/v2-articles.css`). À 390 px sur `/robot-tondeuse-sans-abonnement-top-5-2026`, « Mammotion Yuka Mini 2 500 » tient sur 1 ligne au lieu de 4. Carte avec photo (`/robot-tondeuse-silencieux`) inchangée. 31 fiches sur 55 n'ont pas de photo : toutes en profitent.
- **Supprimé** : `content/page-home.jsx` (ancienne maquette, « 47 modèles testés »). Aucun fichier du site ne l'importait ; seul `content/Quel Robot Tondeuse.html`, maquette jamais servie, le citait.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. Étiquette `sauvegarde-20261125-choix-sans-photo`.
- **Chef, 26/11** : lire l'encart à 390 px sur `/robot-tondeuse-sans-abonnement-top-5-2026`. **Dév, prochain passage** : retirer le reste de l'ancienne maquette (`content/*.jsx` et `content/Quel Robot Tondeuse.html`) après recherche « testé » dedans, ou les petits restes (`.pricetag`, trou de `/calendrier-du-gazon`).

## 25/11/2026, mercredi 8 h 30 (heure belge) — Chef QRT (contrôle)

- **En ligne** : 15 pages en 200 avec 1 H1 (`/comparateur` en 404 : mauvaise adresse de ma part, la vraie est `/comparer`). 6 captures à 390 px. Rien de cassé, rien à annuler. Aucun lien Amazon sans étiquette.
- **Conformes** : article de la nuit `/meilleur-tracteur-tondeuse` (H1 sur 3 lignes, prix datés du 24/11, sources Stiga, Husqvarna, Truffaut, aucun robot en encart, « le site n'essaie pas les tracteurs ») ; « 48,5 dB(A) relevés par Labo Maison » et 0 « 56-57 » sur les pages du Contenu ; « 24 novembre » sur le Black Friday et `/code-promo/einhell` ; 0 « 800+ » sur `/robot-tondeuse-2000m2` et la page jardin ombragé.
- **Recherche large « testé »** : 14 articles, tous citent l'essai d'un autre média (Clubic, Que Choisir, Presse-citron…), aucun ne parle d'un essai du site. Seul reste : `content/page-home.jsx` (Dév). Lint : 0 erreur, 20 avertissements.
- **Défauts confiés** : encart « Notre choix » tassé à gauche sur `/robot-tondeuse-sans-abonnement-top-5-2026` (Dév) ; H1 de cette page sur 5 lignes et « 800+ revendeurs » encore en ligne dessus, 83 fichiers au total (Contenu).
- **Croissance, 25/11** : relevé et tour promo comme prévu. **Chef, 26/11** : contrôler ces 2 corrections en ligne.

## 24/11/2026, mardi après-midi (heure belge) — Contenu QRT (bruit de l'A1 Pro, suite)

- **Fait** (proposition validée par le Secrétaire) : les chiffres de bruit sans source de l'A1 Pro (« 56-57 dB », « 56 dB », « 55 dB » annoncés par Dreame, « 48,5-57 dB ») sont remplacés par « 48,5 dB(A) relevés par Labo Maison » dans 7 articles : 2 duels `dreame-a1-pro-vs-…` (Segway i210, Luba 3 AWD), `robot-tondeuse-sans-abonnement-top-5-2026`, `quel-dreame-choisir-2026-guide-gamme`, `yuka-mini-2-1000-vs-navimow-i210-lidar-pro-comparatif`, `ecovacs-goat-a3000-vs-mammotion-luba-3-awd-3000-comparatif`, `mammotion-luba-mini-2-awd-1000-vs-yuka-mini-2-1000-comparatif`. Les 3 autres de la liste (duels Yuka Mini 2 et Ecovacs A3000, `robot-tondeuse-silencieux`) étaient déjà justes.
- Les chiffres des autres robots (A2 3000, Luba 3 AWD « 55 dB annoncés par Mammotion », Yuka) n'ont pas été touchés. 2 badges « LiDAR 56-57 dB » deviennent « LiDAR 2 000 m² ».
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page lue. Étiquette `sauvegarde-20261124-a1-pro-56-57-db`.
- **Chef, 25/11** : lire en ligne `/robot-tondeuse-sans-abonnement-top-5-2026` et `/dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif` (0 « 56-57 », « 48,5 dB(A) » présent). **Contenu, prochain passage** : H1 courts (point 1 du tableau).

## 24/11/2026, mardi 15 h (heure belge) — Croissance QRT (relevé et tour promo du 24/11)

- **Relevé** : `npm run releve-prix` donne 13 prix, 0 échec, tous identiques au 23/11 (fichier enregistré). Dates de `lib/promos.ts` passées au 24/11.
- **Tour des 13 marques** : aucune offre confirmée, aucun code valable pour un robot. Bosch : `BLACKFRIDAY26` toujours limité aux outils 18 V. Ecovacs : A1600 à 799 € (et une 2e version à 849 €), plus bas prix des 30 jours toujours 999 € : reste en « prix relevé ».
- **Nouveau** : note Einhell datée (« Black Friday Week » : Freelexo 1200 LCD BT à 299,95 €, Freelexo CAM 500 à 349,95 €, sans dates, sans contrôle des 30 jours, prix barré non repris). Navimow : la phrase « en rupture » est retirée, le stock n'était plus lisible ; la page écrit « prix garanti pendant 30 jours ».
- **Adresses** : Worx = `eu.worx.com/fr-fr/` (aucune offre lue), Yard Force = `fr.yardforce.eu` (aucune offre). Sunseeker : aucun site officiel français trouvé (`sunseekerrobotics.com` est un domaine parqué). Stiga vend aussi des tracteurs en Black Friday (Estate 384, Tornado 398), mais Stiga n'est pas partenaire.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page. Étiquette `sauvegarde-20261124-promos`. **Chef, 25/11** : lire `/code-promo/einhell` (note Einhell) et la date du 24/11 sur `/black-friday-robot-tondeuse`.

## 24/11/2026, mardi 10 h 30 (heure belge) — Contenu QRT (bruit du Dreame A1 Pro sourcé)

- **Fait** : le travail laissé sur `content/a1-pro-bruit-labo-maison` est repris, fini et fusionné (branche `content/a1-pro-bruit-fin`). Plus aucun « 55-57 dB » ni « 55 et 57 dB » dans `content/` : 7 articles écrivent « 48,5 dB(A) relevés par Labo Maison », avec le lien vers son test quand la phrase cite le chiffre. La page de Labo Maison avait été lue le 15/11.
- **Relu sur les mêmes pages** : récit d'essai inventé retiré (« on l'a vu tondre sous des tilleuls… », classement ombragé) ; « je recommande depuis six mois » réécrit ; fiche `dreame-a1-pro.yaml` et duel Dreame/Ecovacs : « 48,5 dB mesurés » devient « relevés par Labo Maison » ; « 800+ revendeurs » retiré de 6 articles (13 endroits).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page. Étiquette `sauvegarde-20261124-a1-pro-bruit`. En ligne à 10 h 50 : l'envoi d'hier est arrivé (0 « 26,5 % » sur 5 pages) ; celui d'aujourd'hui pas encore.
- **Reste (Contenu, prochain passage)** : variante « 56-57 dB » ou « 56 dB » sans source pour l'A1 Pro dans 10 articles (les 4 duels `dreame-a1-pro-vs-…`, `robot-tondeuse-silencieux`, `robot-tondeuse-sans-abonnement-top-5-2026`, `quel-dreame-choisir-2026-guide-gamme`, `yuka-mini-2-1000-vs-navimow-i210-lidar-pro-comparatif`, `ecovacs-goat-a3000-vs-mammotion-luba-3-awd-3000-comparatif`, `mammotion-luba-mini-2-awd-1000-vs-yuka-mini-2-1000-comparatif`). **Chef, 25/11** : lire en ligne `/robot-tondeuse-2000m2` et `/quel-robot-tondeuse-jardin-ombrage-sous-arbres-2026` (0 « 55-57 », 0 « 800+ »). La branche `content/a1-pro-bruit-labo-maison` est remplacée et peut être ignorée.

## 24/11/2026, mardi 9 h (heure belge) — Dév QRT (vignette du Gardena Sileno sense 400)

- **Fait** : photo du Gardena Smart Sileno sense 400 posée (`public/images/produits/gardena-smart-sileno-sense-400.webp`, 704 × 528, fond blanc comme les autres). Absent du flux Fnac (seuls des accessoires Gardena) : photo prise sur la page produit Gardena, une seule lecture, image sans encart promo.
- **Effet** : la ligne Gardena de `/black-friday-robot-tondeuse` et de `/black-friday-robot-tondeuse/gardena` a sa vignette, le texte ne se décale plus. Vu à 390 px en local sur les 2 pages, aucun débordement.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page. Étiquette `sauvegarde-20261124-vignette-sileno`.
- **Travail du Contenu rangé** : les 6 articles « 55-57 dB » → « 48,5 dB(A) (Labo Maison) », laissés non enregistrés depuis le 23/11 à 19 h, sont enregistrés sur la branche `content/a1-pro-bruit-labo-maison` (commit `da7d9e9`), **pas fusionnés**. Il reste 1 « 55-57 dB » dans `meilleur-robot-tondeuse-moins-2000-euros-2026` (FAQ). **Contenu, 24/11** : finir, contrôler, fusionner.
- **Chef, 25/11** : lire la vignette Gardena en ligne sur les 2 pages. **Dév, prochain passage** : supprimer `content/page-home.jsx` (fichier inutilisé qui dit « 47 modèles testés »).

## 24/11/2026, mardi 8 h 15 (heure belge) — Chef QRT (contrôle)

- **En ligne** : 20 adresses lues, 18 en 200 avec 1 H1 (2 adresses mal tapées par moi, pas des pages du site). 6 captures à 390 px. Rien de cassé, rien à annuler. Aucun lien Amazon sans étiquette, aucun prix barré.
- **Conformes** : « 23 novembre » sur `/black-friday-robot-tondeuse`, `/code-promo/stiga` et `/code-promo/gardena` ; ligne Gardena Sileno sense 400 datée ; vignette du Dreame A2 3000 sur le classement silencieux ; « Premier robot de l’article » sur les 2 pages Bosch S+ 500 ; article de la nuit `/avis-dreame-a3-awd-pro` (H1 sur 2 lignes, prix du 23/11, « le site n'a pas essayé ce robot »).
- **Corrigé par le Chef** : « modèles testés » encore en ligne dans 2 articles (`/robot-tondeuse-lidar-top-5-2026`, FAQ avec des chiffres de consommation sans source, et `/quel-robot-tondeuse-du-jour-mai-2026`, description) et dans la source de `robot-tondeuse-500m2` (redirigé). Phrases réécrites sans essai ni chiffre inventé.
- **Défauts confiés** : H1 du Bosch S+ 500 sur 5 lignes et du duel Aspire R4/Bosch S+ 500 trop long (Contenu, H1 courts) ; « 800+ » encore sur ce duel (Contenu, point 2) ; fiche `content/produits/dreame-a2-3000.yaml` : Amazon « 1 599-2 499 € » alors que Dreame vend 939 € (Contenu) ; ligne Gardena sans vignette sur le Black Friday (Dév).
- **Note** : une autre session travaille dans le dossier principal (branche `content/a1-pro-bruit-labo-maison`, 6 articles « 55-57 dB » modifiés, non enregistrés). Je n'y ai pas touché ; j'ai travaillé dans une copie à côté.

## 23/11/2026, lundi 19 h 30 (heure belge) — Croissance QRT (Sileno sense 400 au relevé)

- **Fait** (proposition validée par le Secrétaire) : le Gardena Smart Sileno sense 400 entre au relevé quotidien. 13 robots suivis au lieu de 12. Premier prix enregistré : 899,99 € le 23/11, référence affichée 999,99 €, en stock.
- **Script** : `scripts/releve-prix.mjs` lit maintenant la balise Product rangée dans un « @graph » (cas de Gardena) et le prix de référence affiché à côté. Ecovacs relu par la même méthode : 799 €, inchangé.
- **Effet en ligne** : une ligne Gardena datée, sans prix barré, sur `/black-friday-robot-tondeuse` et `/black-friday-robot-tondeuse/gardena`. Le test des boutiques accepte `www.gardena.com`.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK, 1 H1 par page. Étiquette `sauvegarde-20261123-releve-sileno`.
- **Croissance, chaque jour** : `npm run releve-prix` donne 13 prix. Une vraie offre Sileno ne pourra être confirmée qu'après 30 jours relevés (vers le 23/12), donc pas pour ce Black Friday. **Chef, 24/11** : lire la ligne Gardena en ligne sur les 2 pages.

## 23/11/2026, lundi 18 h (heure belge) — Dév QRT (« Notre choix » sous 55)

- **Fait** (proposition validée par le Secrétaire) : la carte du haut des pages d'achat n'écrit plus « Notre choix » au-dessus d'un robot noté sous 55. Elle écrit « Premier robot de l’article ». La note et les 2 robots mieux notés restent affichés.
- **Effet** : 10 pages sur 178 changent. 6 avec le Bosch S+ 500 (48/100), 4 avec l'Aspire R4 (lui aussi sous 55 depuis le relevé des prix). Les autres gardent « Notre choix ».
- Test ajouté dans `tests/unit/notes-fiches.test.ts`. Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 142 tests OK, construction OK. Étiquette `sauvegarde-20261123-notre-choix-sous-55`.
- **Chef, 24/11** : lire « Premier robot de l’article » en ligne sur `/test-bosch-indego-s-plus-500-avis` et `/husqvarna-aspire-r4-vs-bosch-indego-s-plus-500-comparatif`. **Contenu, plus tard** : sur ces 10 pages, voir s'il faut mettre en premier encart un robot mieux noté.

## 23/11/2026, lundi 15 h (heure belge) — Croissance QRT (tour promo du 23/11)

- **Relevé quotidien** : `npm run releve-prix`, 12 prix sur 12, tous identiques au 22/11. Le Dreame A2 3000 n'est plus noté « en rupture ».
- **Tour promo** : 13 marques relues. Aucune offre confirmée, aucun code valable pour un robot. Ecovacs donne toujours 999 € comme plus bas des 30 jours pour le Goat A1600 (vendu 799 €) : reste en « prix relevé ». Navimow i208, i215 et i220 LiDAR : toujours en rupture.
- **Nouveau, en notes sourcées** : Stiga ouvre son Black Friday du 23 au 30/11 (A 6v 899 €, A 8v 1 079 €, A 10v 1 249 €) ; Gardena ouvre une « Cyber Week » du 23 au 30/11 (Sileno sense 400 m² 899,99 €, 600 m² 989,99 €, Sileno life 1 500 m² 649,99 €). Plus bas des 30 jours non contrôlé, écrit tel quel. Worx et Yard Force : pages d'accueil en 404, Sunseeker sans réponse.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 141 tests OK, construction OK, 1 H1 par page, date du 23/11 lue sur les pages construites. Étiquette `sauvegarde-20261123-promos`. En ligne à 14 h, le Black Friday affichait bien le 22/11 (envoi d'hier arrivé).
- **Chef, 24/11** : lire « 23 novembre » sur `/black-friday-robot-tondeuse` et les notes de `/code-promo/stiga` et `/code-promo/gardena`. **Croissance, 24/11** : relevé puis tour promo ; retrouver les adresses Worx, Yard Force et Sunseeker. **Dév, plus tard** : le Gardena Sileno sense 400 a une fiche ; s'il doit entrer au relevé quotidien, il faut lire la boutique Gardena (pas une boutique Shopify).

## 23/11/2026, lundi 10 h 30 (heure belge) — Contenu QRT (pente du Dreame A2, fiches Husqvarna)

- **Fait** : pente du Dreame A2 3000 passée à 50 % dans les 5 articles du compte du Chef, plus `/meilleur-robot-tondeuse-moins-2500-euros-2026` (qui écrivait « 45 % (26,5°) »). Plus aucun « 26,5 % » dans `content/`. Dans `/meilleur-robot-tondeuse-moins-2000-euros-2026`, le Dreame A1 Pro passe aussi de 26,5 % à 45 %, comme sur le reste du site.
- **Relu sur les mêmes pages** : « 58 dB » de l'A2 remplacé par « moins de 55 dB annoncés » (classement LiDAR) ; « 55-57 dB mesurés » de l'A1 Pro remplacé par les 48,5 dB(A) de Labo Maison (déjà vérifiés le 15/11) ; récit « il patine au-delà de 25-30 % » et « talus de 35 % mesuré » retirés ; faute « mitogen » corrigée.
- **Fiches Husqvarna** 310 Mark II, 430X NERA, 450X NERA : « 800+ revendeurs » devient « réseau de revendeurs ». L'accueil construit n'affiche plus « 800+ ». Fait aussi dans un encart du classement LiDAR.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 141 tests OK, construction OK, 1 H1 par page. Étiquette `sauvegarde-20261123-pente-a2-husqvarna`.
- **Reste (Contenu)** : « 55-57 dB » sans source pour l'A1 Pro dans 6 autres articles (`robot-tondeuse-2000m2`, `quel-robot-tondeuse-pour-2000m2-guide-achat`, `robot-tondeuse-vs-thermique`, `comment-choisir-robot-tondeuse`, `robot-tondeuse-jardin-avec-piscine-securite-2026`, `quel-robot-tondeuse-jardin-ombrage-sous-arbres-2026`). Puis H1 courts. **Chef, 24/11** : contrôler l'accueil (carte Husqvarna 310) et le classement LiDAR en ligne.

## 23/11/2026, lundi 9 h (heure belge) — Dév QRT (vignette du Dreame A2 3000)

- **Fait** : photo du Dreame A2 3000 posée (`public/images/produits/dreame-a2-3000.webp`, 704 × 528, comme les 22 autres). Le flux Fnac ne vend pas ce modèle : photo prise sur la boutique Dreame (données publiques de la fiche, une seule requête), **encart promo de la boutique (« +1 € », garage 149 €) coupé**, pour ne montrer aucune fausse promo.
- **Effet** : la carte « Notre choix » de `/robot-tondeuse-silencieux-top-6-2026` a sa photo, le texte ne tient plus dans une colonne de 3 mots ; la ligne Dreame A2 3000 de `/black-friday-robot-tondeuse` a sa vignette. Vu à 390 px en local sur les 2 pages.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 141 tests OK, construction OK, 1 H1 par page. Étiquette `sauvegarde-20261123-vignette-a2`.
- **Chef, mardi 24/11** : contrôler la vignette en ligne sur ces 2 pages. **Dév, prochain passage** : carte « Notre choix » au-dessus d'un robot noté sous 55 (Bosch S+ 500).

## 23/11/2026, lundi 8 h 15 (heure belge) — Chef QRT : BILAN DE LA SEMAINE (16 au 22/11) pour le propriétaire

- **Sorti** : le design V2 sur tout le site (17/11) ; la rubrique Robots de piscine (18/11) ; la rubrique tracteurs avec 2 articles (`/robot-tondeuse-ou-tracteur-tondeuse`, `/tracteur-tondeuse`) ; 7 articles de nuit ; une note sur 100 pour 4 robots avec son barème public ; des titres plus courts ; un relevé des prix de 12 robots chaque jour ; les mentions légales remplies.
- **Cassé** : aucune page cassée en ligne, aucun retour en arrière. Le 19/11, plus de crédits : aucun passage d'agent, et aucun article les nuits du 18 et du 19/11. Une faute dans les mentions légales a bloqué les envois le 21/11, réparée le jour même.
- **Défauts encore en ligne** : la pente du Dreame A2 reste fausse dans 5 articles (26,5 % au lieu de 50 %) ; « 800+ revendeurs » sans source chez Husqvarna, jusque sur l'accueil ; 1 robot noté 48/100 sous un bandeau « Notre choix ». Les trois corrections sont confiées.
- **Ce qui vient** : le Black Friday du 27/11, avec un tour des prix chaque jour ; les premiers articles piscine le 01/12 ; plus de robots notés.
- **Pour vous** : toujours 1 seul point, l'e-mail d'essai vers bonjour@ (avec Claude en session). Revenu d'affiliation : toujours 0 €.

## 23/11/2026, lundi 8 h 15 (heure belge) — Chef QRT (contrôle)

- **En ligne** : 17 adresses lues, toutes en 200 avec 1 H1 (dont `/tracteur-tondeuse`, en ligne depuis la nuit). 5 captures à 390 px (accueil, tracteur, classement silencieux, duel Bosch S+ 500/Yuka Mini 2 500, Black Friday). Aucun lien Amazon sans étiquette, aucun « testé », aucun faux chiffre sur le robot animé. **Rien à annuler.** Types OK, lint 0 erreur (20 avertissements).
- **Conformes** : les 2 duels A2 (pente 50 % partout, Lavelab cité) ; `/tracteur-tondeuse` (prix datés du 21/11, notice Stiga, « le site n'essaie pas les machines », pas de note, aucun robot dans les encarts) ; « Sous 55 » sur le duel Bosch S+ 500 (2 robots mieux notés, prix Cdiscount du 23/11) ; Black Friday daté du 22/11.
- **Défauts trouvés** : carte « Notre choix » au-dessus du Bosch S+ 500 noté 48/100 (Dév, point 1 de « Ensuite ») ; H1 du même duel sur 8 lignes à 390 px (Contenu) ; « 800+ revendeurs » sur la carte Husqvarna 310 de l'accueil, qui vient de 3 fiches `content/produits/` (Contenu) ; vignette du Dreame A2 3000 toujours absente (Dév, prochaine étape).
- **Compte refait** : 5 articles disent encore « 26,5 % » ou « 14,8° » pour la pente (et non 8). Liste exacte dans le tableau.
- **Propriétaire** : la ligne « prix du jour Cdiscount et Fnac » est retirée de sa liste, car les cartes affichent maintenant « Cdiscount, relevé le 23/11 ».

## 23/11/2026, lundi matin (heure belge) — Éditeur QRT (passage du lundi)

- **Nuits du 16 au 22/11 vérifiées** : 7 articles, tous pris dans l'ordre du plan et cochés par la rédaction de nuit (dernier : `/tracteur-tondeuse`, nuit du 22/11, avec `h1:` de 32 signes). Aucun article daté du 18 ni du 19/11 (quota épuisé). Novembre : 4 sujets écrits sur 12, 8 restent pour 8 nuits. Prochain sujet : `/avis-dreame-a3-awd-pro`.
- **Plan** : consigne de nuit « `h1:` d'environ 30 signes » écrite dans `tasks/plan-editorial.md`. Titre de l'avis Dreame A3 AWD Pro changé (« pour quel jardin, et quels défauts ») : l'ancien visait la même requête que le guide 3500/5000 déjà en ligne.
- **Marques** : Luba 4 AWD et Dreame A4 AWD Pro toujours sans prix français (recherches du 23/11). Ajouté en mars 2027 : duel Dreame A4/A3 AWD Pro, seulement si Dreame affiche un prix en France. Husqvarna remplace le 430X NERA par le 430V NERA (vision IA, fiche lue) : section ajoutée à l'avis 430X de décembre, pas de page en plus.
- **Avance** : 250 sujets non cochés (dont 196 avec adresse), 0 adresse déjà prise par un article ou une page de `app`. Aucune rubrique à ouvrir (Arrosage : avant le 01/04/2027).
- **Pour le Dév** : quand le 430V NERA ou l'A4 AWD Pro seront vendus en France, il faudra leur fiche. **Pour le Chef** : rien à contrôler en ligne de ma part (fichiers de l'équipe seulement).

## 22/11/2026, dimanche soir (heure belge) — Croissance QRT (proposition validée : un prix par jour pour les 12 robots du relevé)

- **Fait** : `npm run releve-prix` (`scripts/releve-prix.mjs`) lit chaque jour le prix des 12 robots du relevé sur les adresses de données publiques des boutiques (Dreame, Navimow, Mammotion, Mova : données Shopify `.js` ; Ecovacs : balise Product de la page). Gratuit, 12 requêtes. Une ligne par robot et par jour dans `content/offres/historique-prix.json`, jamais deux fois le même jour ; page muette = rien d'écrit, échec signalé.
- **Premier relevé, 22/11** : 12 prix sur 12, identiques au relevé à la main du jour. Dreame A2 3000 noté « en rupture » par la boutique (939 €).
- `lib/historique-prix.ts` donne le plus bas des 30 jours et le nombre de jours relevés. **Rien n'est affiché** : une offre ne se confirme qu'avec 30 jours relevés (au plus tôt le 22/12). Liste des robots : `content/offres/releve-quotidien.json` (un test vérifie qu'elle suit `lib/promos.ts`).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 141 tests OK, build OK. Étiquette `sauvegarde-20261122-releve-prix`.
- **Qui le lance** : le Croissance, à chaque tour promo (chaque jour), avant de relire les pages, puis il enregistre le fichier. Aucune tâche du serveur créée (hors de nos droits). Un jour manqué = un trou : le noter dans le journal. **Dév** : si un robot entre au relevé, ajouter sa ligne (numéro de variante si la page en a plusieurs).

## 22/11/2026, dimanche soir (heure belge) — Contenu QRT (proposition validée : retrait des « je recommanderais »)

- **Fait** : 2 phrases retirées. Duel `/ecovacs-goat-a3000-vs-husqvarna-automower-430x-nera-comparatif` : « c'est le robot que je recommanderais à environ 65-70 % des propriétaires… » (la phrase finit maintenant à « hauteur jusqu'à 90 mm. »). `/meilleur-robot-tondeuse-pas-cher-top-2026` : « C'est le robot que je recommanderais à un proche… » supprimée. Plus aucun « recommanderais » dans `content/`.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 137 tests OK, build OK, 0 « recommanderais » dans les 2 pages construites. Étiquette `sauvegarde-20261122-retrait-recommanderais`.
- **Pas fait ce passage** : les 8 articles « 26,5 % » (pente Dreame A2), le Secrétaire n'a validé que le retrait. **Contenu, prochain passage** : ces 8 articles. **Chef** : contrôler les 2 pages en ligne.

## 22/11/2026, dimanche soir, 19 h (heure belge) — Dév QRT (proposition validée : sous 55, 2 robots mieux notés)

- **Fait** : sous 55, la ligne de note montre maintenant 2 robots mieux notés (note de 55 ou plus), de surface la plus proche, avec leur note, leur surface, leur prix daté et un lien marchand. Code : `mieuxNotes()` dans `lib/notes-fiches.ts`, affichage dans `components/blog/NoteLigne.tsx`, 2 tests de plus.
- **Seul concerné aujourd'hui** : Bosch Indego S+ 500 (48). Il montre le Luba Mini 2 AWD 1000 (90, 1 199 € chez Cdiscount le 20/11) et le Yuka Mini 2 1000 (76, 949 € chez Cdiscount le 20/11). Sans robot mieux noté disponible, l'ancien lien vers `/comparer` reste.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 137 tests OK, build OK, texte lu dans la page construite du duel Bosch S+ 500/Yuka Mini 2 500. Étiquette `sauvegarde-20261122-sous-55`.
- **Chef, lundi 23/11** : contrôler en ligne la phrase « Sous 55 » sur `/bosch-indego-s-plus-500-vs-mammotion-yuka-mini-2-500-comparatif`, à 390 px.

## 22/11/2026, dimanche soir (heure belge) — Dév QRT (proposition validée : caractéristiques sourcées au comparateur) — ARRÊTÉ, rien changé dans le code

- **Pourquoi j'arrête** : la note demande 5 chiffres par robot (surface, pente, bruit, navigation, connexion). Pages lues ce soir : aucun des 6 robots (A2 3000, A1 Pro, i105E, LiDAX Ultra 800 et 1200, Goat A1600) n'a ses 5 chiffres sourcés. Pages Dreame, Mova et une page Navimow : erreur 429 ou 403.
- **Sourcé (page lue)** : A2 3000 : 3 000 m², pente 50 % (LDLC, fiche PB00744248), LiDAR + caméra sans fil ni RTK. A1 Pro : 2 000 m² (LDLC PB00744249), pente 45 % (Labo Maison). LiDAX Ultra 1200 : 1 200 m², pente 45 %, Wi-Fi + Bluetooth, module 4G vendu à part (Notebookcheck, test du 31/05/2026). Goat A1600 : pente 50 % (27°), 62 dB(A) (fiche Ecovacs FR).
- **Manque** : bruit annoncé de l'A2, de l'A1 Pro et du LiDAX 1200 ; connexion de l'A2, de l'A1 Pro et du Goat ; surface du Goat ; tout pour le LiDAX 800 et l'i105E (seulement des extraits de recherche : 500 m², 30 %, 58 dB, 4G en option). **Conflit** : notre fiche A2 dit « 58 dB », un extrait dit « < 55 dB ».
- **3 décisions à prendre (Chef)** : 1. 4G en option (module vendu à part) : compter « Wi-Fi » ? Attention, `lireConnexion` lit « 4G » dans le texte, donc écrire « 4G en option » donnerait 15 points à tort. 2. Bruit mesuré par un test (57 dB à 1 m, Notebookcheck) au lieu du chiffre de la marque : accepté ou non ? 3. Ajouter un champ « source » aux modèles du comparateur (il n'en a aucun aujourd'hui).
- **Suite** : Contenu ou Claude en session relit les fiches des marques (Dreame, Mova, Navimow : réessayer plus tard, ou notice PDF) et remplit les trous. Le Dév ajoute ensuite les modèles et la correspondance dans `lib/notes-fiches.ts` en un passage.

## 22/11/2026, dimanche 15 h (heure belge) — Croissance QRT (tour promo du 22/11)

- **Tour promo fait** : 13 marques et 12 prix relus sur les boutiques officielles. Les 12 prix n'ont pas bougé depuis le 20/11. `PROMOS_CHECKED_AT` et `DATE_RELEVES` passent au 22/11 : les pages Black Friday et code promo affichent « Dernier contrôle le 22 novembre 2026 ».
- **Toujours aucune offre confirmée** : aucun plus bas des 30 jours contrôlé par nous. Ecovacs A1600 : 799 €, la boutique donne encore 999 € comme plus bas des 30 jours (décision du Secrétaire : reste en « prix relevé »). Navimow : i208, i215 et i220 LiDAR toujours en rupture. Bosch : BLACKFRIDAY26 toujours limité aux outils 18 V.
- **Nouveau** : Mova donne le garage à 1 € (à ajouter au panier) avec le LiDAX Ultra 1200, ajouté au relevé. Husqvarna range 4 robots (Aspire R6V, 320 NERA, Aspire R4, 305) dans « Offres en cours », sans prix lisible, et annonce 5 % contre la lettre : note sourcée posée, rien d'autre.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 135 tests OK, build OK. Étiquette `sauvegarde-20261122-promos`.
- **Chef** : contrôler la date du 22/11 en ligne sur `/black-friday-robot-tondeuse`. **Croissance, demain 23/11** : nouveau tour, puis chaque jour jusqu'au 02/12 ; ensuite, le marchand qui vend des tracteurs.

## 22/11/2026, dimanche 10 h 30 (heure belge) — Contenu QRT (pente du Dreame A2, décision du Chef)

- **2 duels corrigés** selon la décision du 22/11 : Goat A3000/A2 et Husqvarna 430X/A2. Pente de l'A2 : 50 % (27°, Lavelab) partout dans ces deux pages (résumé, FAQ, fiche, tableau, section pente, profils, verdict). Tableau : « Égalité » sur la pente ; score du duel Goat passé de 9-2-1 à 8-2-2.
- **Verdicts réécrits** : plus de « sans hésiter » ni « sans appel » sur la pente. Nuance de Lavelab gardée (le châssis allongé de l'A2 peut bloquer sur le passage le plus raide). Le Goat garde son avantage sourcé : vitesse et bordures (version Pro).
- **Retirés au passage** : « le robot que je recommanderais à 70 % des propriétaires qui m'interrogent » (2 fois), « 56-57 dB mesurés » sur l'encart Dreame A1 Pro, « 800+ revendeurs » et « intervenir en 48-72 h » dans le duel Husqvarna (5 endroits, remplacés par « réseau de revendeurs »).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 135 tests OK, build OK, les 2 pages construites avec 1 H1 et le nouveau texte. Étiquette `sauvegarde-20261122-pente-dreame-a2`.
- **Chef** : contrôler les 2 duels en ligne. **Contenu, ensuite** : les 8 autres fichiers (« 26,5 % » dans 8 articles, dont `/meilleur-robot-tondeuse-moins-2500-euros-2026` qui dit aussi « autour de 45 % »).

## 22/11/2026, dimanche 9 h (heure belge) — Dév QRT (lot 3, pas 3 : note sur les fiches)

- **Note sur 100 affichée** sur les cartes produit (« Notre choix », encart, carrousel), avec le prix qui a servi, sa date et un lien vers `/comment-nous-notons`. Code : `lib/notes-fiches.ts`, `components/blog/NoteLigne.tsx`, 4 tests. La page du barème dit maintenant où voir les notes.
- **4 notes sur les 10 fiches du lot, pas 10.** Règle tenue : caractéristiques du comparateur (déjà publiées sur `/comparer`) + prix Cdiscount ou Fnac daté. Luba 3 AWD 3000 : 95 ; Luba Mini 2 AWD 1000 : 90 ; Yuka Mini 2 1000 : 76 ; Bosch Indego S+ 500 : 48 (« Sous 55 : comparez d'abord avec un robot mieux noté »). 6 fiches sans prix daté restent sans note (Yuka Mini 2 500, Luba Mini AWD 800 et LiDAR 1500, Husqvarna 310 Mark II et Aspire R4, Worx WR340E). Le prix Amazon n'a pas de date : non utilisé.
- **Manque** : Dreame, Segway, Ecovacs et Mova ne sont pas dans le comparateur. Ils ont des prix datés, mais aucune caractéristique publiée chez nous. Pas de note devinée.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 135 tests OK, build OK, rendu à 390 px vu sur `/avis-mammotion-luba-3-awd` et le duel Bosch S+ 500/Yuka Mini 2 500. Étiquette `sauvegarde-20261122-note-fiches`. Serveur local du port 3917 : plus actif.
- **Chef** : contrôler en ligne la note 95 sur `/avis-mammotion-luba-3-awd` et la note 48 sur `/bosch-indego-s-plus-500-vs-mammotion-yuka-mini-2-500-comparatif`. **Contenu** : pour élargir, ajouter au comparateur, avec source, les caractéristiques des Dreame A2 3000, A1 Pro, Navimow i105E, Mova LiDAX et Ecovacs A1600 (pente 50 % pour l'A2). **Dév, ensuite** : carte « Notre choix » sans photo (texte serré à 390 px).

## 22/11/2026, dimanche 8 h 15 (heure belge) — Chef QRT

- **Site en ligne contrôlé** : 13 adresses lues (12 pages en 200 avec 1 H1 ; `/tracteur-tondeuse` en 404, normal : pas encore écrite, aucun lien vers elle), 6 captures à 390 px (accueil, article tracteur, classement silencieux, blog, Black Friday, piscine). Aucun « testé », aucun lien Amazon sans étiquette, aucun faux chiffre sur le robot animé. **Rien à annuler.** Types OK, lint 0 erreur (20 avertissements).
- **Contrôlés et conformes** : champ `h1` court (4 articles, 2 à 4 lignes à 390 px), nom du site une seule fois dans les titres, classement silencieux reclassé, premier article tracteur de la nuit (prix datés, pente selon la notice, pas de note). **Défauts** : carte « Notre choix » du Dreame A2 3000 sans photo, texte serré à 390 px (Dév) ; Black Friday encore daté du 20/11 (Croissance).
- **Décision : pente du Dreame A2.** On écrit 50 % (environ 27°), source Lavelab, partout. Les verdicts qui reposaient sur « 26,5 % » sont réécrits : sur la fiche, égalité de pente ; on garde la nuance sourcée de Lavelab (le format allongé peut bloquer sur la pente la plus raide). On ne garde « sans hésiter » ou « sans appel » que si un autre écart sourcé le justifie. **Contenu** : les 2 duels d'abord, puis les 7 autres fichiers.
- **Clics `/go/`** : la version dans le tableau de bord du site est validée, mais après la note des 10 fiches et quand Claude en session aura fini le tableau de bord.
- **Propriétaire** : toujours 1 seul point (e-mail d'essai vers bonjour@, Claude en session). Bilan de la semaine demain lundi.

## 21/11/2026, samedi 19 h (heure belge) — Dév QRT (proposition validée : clics `/go/` dans le centre de contrôle) — ARRÊTÉ, rien changé dans le code

- **Pourquoi j'arrête** : la proposition demande d'afficher les clics dans le centre de contrôle du serveur. Ce centre est hors du projet : je n'ai pas le droit d'y toucher. Il faut Claude en session.
- **Vérifié** : les données existent. La tâche `qrt-ingest` tourne chaque minute (vue à 18 h 10 UTC) et range chaque `/go/` dans `analytics.hits`, avec la page d'origine (`ref_path`).
- **Déjà dans le tableau de bord du site** (`/dashboard/conversions`) : clics par robot, mais seulement pour Amazon (`/go/<asin>/amazon`). Ni Cdiscount ni Fnac, et rien par page pour les `/go/`.
- **Pour le propriétaire ou le Chef** : soit Claude en session branche le centre de contrôle sur `analytics.hits` (lecture seule), soit on valide une autre proposition : ajouter « clics `/go/` par page et par robot, tous marchands » dans le tableau de bord du site (dans le projet, faisable par le Dév en un passage).

## 21/11/2026, samedi (heure belge) — Contenu QRT (proposition validée : pente du Dreame A2) — ARRÊTÉ, rien changé dans les articles

- **Chiffre vérifié** : Lavelab (test du Dreame A2) écrit « pentes de 50 % d'inclinaison, soit 27° ». Le calcul le confirme : 26,5 % ne ferait que 14,8°. Pages Dreame : erreur 429, pas relues.
- **Relevé** : 9 articles donnent une autre valeur pour l'A2 : « 26,5 % » (8 articles, souvent « 14,8° ») et « autour de 45 % » (`/meilleur-robot-tondeuse-moins-2500-euros-2026`). Les autres disent déjà 50 %.
- **Pourquoi je n'ai rien changé** : changer le chiffre retourne deux verdicts. Duel Goat A3000/A2 : « le Goat sans hésiter », « presque le double », profils « pente > 25 % → Goat ». Duel Husqvarna 430X/A2 : « l'écart est sans appel ». Même chose pour les phrases « pente qui disqualifie le Dreame » dans 4 classements. C'est plus qu'un chiffre à corriger, et l'outil a refusé l'écriture. Il faut une décision.
- **Chef** : décider si le Contenu réécrit ces passages (égalité sur la fiche à 50 % ; nuance sourcée de Lavelab : le format allongé se bloque sur la pente la plus raide). Liste des passages : chercher « 26,5 % » et « 14,8° » dans `content/articles/`.
- À vérifier au passage, hors sujet A2 : pente du Dreame A1 Pro (26,5 %, 45 % ou 50 % selon les articles) et du Husqvarna 430X (50 % ou 45 %).

## 21/11/2026, samedi 15 h (heure belge) — Dév QRT (proposition validée : titres courts d'environ 30 signes)

- **Consigne changée de 40 à environ 30 signes** pour le champ `h1` des articles, aux 2 endroits qui disaient encore 40 : le commentaire de `lib/utils/titre-affiche.ts` et la tâche de l'Éditeur dans `tasks/equipe.md`. Aucun article ni code de page touché.
- Raison : 38 signes font 4 lignes à 390 px, la mascotte prenant la droite du titre ; vers 30 signes, 2 à 3 lignes comme le veut le design V2.
- Contrôles : types OK, lint 0 erreur (21 avertissements anciens), 131 tests OK, build OK. Étiquette `sauvegarde-20261121-consigne-h1-30`.
- **Éditeur** : écrire dans `tasks/plan-editorial.md` la consigne de nuit « `h1:` court, environ 30 signes ». **Contenu** : garder environ 30 signes pour les H1 des 20 titres les plus longs.

## 21/11/2026, samedi 13 h 50 (heure belge) — Dév QRT (proposition validée : nom du site en double dans le titre)

- **Doublon retiré** : 17 pages écrivaient déjà « | Quel Robot Tondeuse » et le gabarit commun l'ajoutait une deuxième fois. Elles passent en titre « absolu » : le nom n'apparaît plus qu'une fois. Touchés : articles (racine, blog, piscine), catégories et accueil du blog, auteurs, comparer, choisir, quiz, simulateur, superficie, mentions, confidentialité, barème, `/robot-piscine`, page introuvable. Texte des titres inchangé.
- **Contrôlé en local après build** sur 13 adresses (article, page fixe, catégorie du blog, page introuvable, Black Friday, calendrier, accueil) : nom une seule fois partout. Les pages déjà justes n'ont pas bougé.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 131 tests OK, build OK. Étiquette `sauvegarde-20261121-titre-nom-double`.
- **Faute** : j'ai envoyé juste après avoir récupéré le tableau de bord d'un autre passage (envoyé à 13 h 52), sans revérifier. Revérifié ensuite, après installation de ses modules : types OK, lint 0 erreur, 131 tests, build OK. Rien de cassé.
- **Reste** : un serveur d'essai local (port 3917) n'a pas pu être arrêté, l'outil a refusé. Sans effet sur le site en ligne. **Dév, prochain passage** : relire 3 titres en ligne (article, `/mentions-legales`, `/blog`) et arrêter ce serveur.

## 21/11/2026, samedi 10 h 30 (heure belge) — Contenu QRT (décision du Chef : classement silencieux)

- **`/robot-tondeuse-silencieux-top-6-2026` reclassé** selon la décision du Chef : ordre par le bruit annoncé par la marque, critère écrit en tête d'article, mesures de Labo Maison dans une colonne à part. Nouvel ordre : Dreame A2 3000 (< 55 dB), Gardena Minimo 250 (57 dB(A) perçus), Yuka Mini 2 1000 (57 dB, égalité tranchée par le prix), Navimow i105E (58 dB(A)), Husqvarna 310 Mark II (59 dB(A) perçus), Dreame A1 Pro en dernier (aucun chiffre trouvé chez Dreame, raison écrite).
- **Relu en ligne aujourd'hui** : Mammotion (57 dB, pente 45 %, batterie 6,1 Ah : l'article disait 3,2 Ah), Husqvarna (59 dB(A), 60 min par charge, **« produit abandonné »** : écrit dans l'article), Gardena UK (57 dB(A) perçus). **Pas relus** (erreur 429) : pages Dreame et fiche i105E de Segway ; les chiffres gardés viennent des passages précédents.
- **Retirés** : « le modèle que je recommande depuis six mois », « publié hier », « ~15 h pour 1 000 m² selon Labomaison » (non relisible), chiffres de revendeurs (600+, 800+), pente A2 « 26,5 % » (c'est 26,5°, soit 50 %). Les « Points forts / Pour qui » répétés deviennent des questions H3. Maillage : 3 avis et 4 duels.
- **Champ `h1` posé** sur 4 articles (silencieux, haut de gamme, Luba 3 AWD, câble rongé), 25 à 34 signes. Contrôles : types OK, lint 0 erreur (20 avertissements), 131 tests OK, build OK. **Faute** : un autre build tournait déjà quand j'ai lancé le mien ; les deux ont réussi.
- **Chef** : contrôler l'article à 390 px. **Dév** : `<title>` en double visible sur cet article. **Contenu, ensuite** : relire les pages Dreame (A1 Pro, A2) et i105E dès que la lecture passe, puis « mesuré » lot 3 et H1 des 20 titres les plus longs.

## 21/11/2026, samedi 9 h (heure belge) — Dév QRT (champ `h1` des articles)

- **Champ `h1` facultatif en ligne** dans l'en-tête des articles (racine, blog, piscine) : s'il existe, il remplace le titre affiché dans la page. Le `title` reste pour Google, l'onglet, le fil d'Ariane et les données structurées. Code : `lib/utils/titre-affiche.ts`, 2 tests. Aucun article modifié.
- **Essai local, non enregistré** : `h1: "Robots tondeuses haut de gamme en 2026"` (38 signes) sur `/meilleur-robot-tondeuse-haut-de-gamme` → H1 changé, `<title>` et `headline` inchangés. À 390 px : **4 lignes**, pas 2 à 3, car la mascotte prend la droite du titre. **Il faut viser environ 30 signes**, pas 40.
- Vu en passant : le `<title>` des articles à la racine se termine par « | Quel Robot Tondeuse | Quel Robot Tondeuse » (nom du site en double). À réparer au prochain passage du Dév.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 131 tests OK, build OK. Étiquette `sauvegarde-20261121-article-h1`.
- **Contenu** : poser `h1:` (environ 30 signes) sur les 4 articles de ta liste. **Éditeur** : consigne de nuit « `h1:` court, environ 30 signes ». **Chef** : contrôler un article avec `h1` à 390 px.

## 21/11/2026, samedi 8 h 15 (heure belge) — Chef QRT

- **Site en ligne contrôlé** : 13 adresses lues (12 pages en 200 avec 1 H1, plan du site en 200), 6 captures à 390 px (accueil, article de la nuit, Black Friday Dreame, `/comment-nous-notons`, mentions légales, avis Luba 3 AWD). Aucun « testé », aucun faux chiffre sur le robot animé. **Rien à annuler.** Contrôlés et conformes : duels du lot 2 « mesuré », date du 20/11 sur `/black-friday-robot-tondeuse`, mentions légales remplies, page du barème.
- **Réparé** : le lint avait 1 erreur (apostrophe dans les mentions légales du 20/11), ce qui bloquait tout envoi. Corrigée ; 0 erreur.
- **Décision : classement silencieux.** Un classement « silencieux » suit un seul type de chiffre : le bruit annoncé par la marque, comme notre barème. Les mesures de la presse (Labo Maison) vont à côté, en complément, jamais mélangées au critère. Un robot sans chiffre annoncé passe après, avec la raison écrite. **Contenu** : appliquer et écrire le critère en haut de l'article.
- **Décision : barème accordé** (30/25/15/15/15, aucun partenaire avantagé, pas de note si un chiffre manque). **Dév** : d'abord un champ `h1` court pour les articles (H1 de 5 lignes encore cette nuit), ensuite la note sur 10 fiches, avec la date du prix et un lien vers le barème. **Décision : Ecovacs A1600** reste en « prix relevé » (le plus bas des 30 jours est celui d'Ecovacs, pas le nôtre).
- **Propriétaire** : il ne reste qu'un point, l'e-mail d'essai vers bonjour@ (Claude en session). Contrôles avant envoi : types, lint (0 erreur) et build OK, étiquette de sauvegarde posée.

## 20/11/2026, vendredi 19 h 30 (heure belge, après le Dév) — Contenu QRT (proposition validée : « le Chef décide de l'ordre du classement silencieux »)

- **Arrêté sur un doute, article non touché.** La proposition validée dit que **le Chef** décide l'ordre de `/robot-tondeuse-silencieux-top-6-2026`, et que le Contenu l'applique ensuite.
- Relu ce soir : aucune décision du Chef dans le journal. La question est déjà dans sa ligne du tableau depuis ce matin (commit `204adf0`), prévue lundi 23/11. Décider à sa place sortirait de la proposition et de mon rôle.
- **Chef** : écrire la décision dans le journal (garder l'ordre et dire le critère en clair, ou remonter les deux Dreame). **Contenu** : l'appliquer au passage qui suit cette décision ; sinon lot 3 « mesuré ».

## 20/11/2026, vendredi 19 h 30 (heure belge) — Dév QRT (proposition validée : page « Comment nous notons »)

- **Page `/comment-nous-notons` écrite**, ajoutée au plan du site. Elle lit `CRITERES` et `SEUIL_PROPOSER_MIEUX` de `lib/bareme.ts` : 5 critères sur 100, chaque palier avec ses points, un exemple de calcul du prix pour 100 m², la règle « caractéristique absente, pas de note », ce que la note ne dit pas (fiabilité, coupe, SAV).
- **Aucune note de robot affichée**, ni sur cette page ni sur les fiches. La page dit en clair que les notes viendront après relecture du barème. Pas de lien dans le menu ni le pied de page pour l'instant.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 129 tests OK, build OK (H1 « Comment nous notons » dans le HTML sans JS). Étiquette `sauvegarde-20261120-comment-nous-notons`.
- **Chef** : relire les poids du barème sur la page en ligne (390 px), puis dire si la note peut aller sur les 10 premières fiches. **Dév, ensuite** : contrôler la page en ligne au prochain passage ; puis note sur les 10 fiches après accord du Chef.

## 20/11/2026, vendredi 19 h 20 (heure belge) — Dév QRT (proposition validée « premier article piscine » : arrêtée, doute)

- **Rien écrit, aucun code changé.** La proposition validée dit « dès le 01/12 ». Nous sommes le 20/11 : l'écrire ce soir ne suit pas la date validée.
- **Doublon possible** : la rédaction de nuit commence la piscine le 01/12 avec `/robot-piscine/meilleur-robot-piscine` (sujet 1 de décembre). Le classement hors-sol est prévu en février (sujet 17), comme page fille de ce classement. Un guide hors-sol écrit à la main maintenant passerait devant le plan et devant sa page mère.
- **Rôles** : les articles relèvent de la rédaction de nuit et du Contenu, pas du Dév.
- **Suite** : rien à faire pour le premier article, il arrive seul le 01/12. **Dév** : le 01/12, contrôler en ligne la carte « Notre choix », le tableau des prix et la page `/robot-piscine` (déjà dans ma ligne). **Propriétaire** : s'il veut quand même un article hors-sol avant le 01/12, le dire, et la rédaction de nuit le prendra en premier.

## 20/11/2026, vendredi 15 h (heure belge) — Croissance QRT (tour promo du jour + preuve du lot 2)

- **Tour promo du 20/11 envoyé** : 12 prix relus sur les boutiques des marques, aucun changement (Dreame 599, 939 et 1 999 € ; Navimow 699 et 1 199 € ; Mammotion 1 199, 2 149 et 2 599 € ; Ecovacs 799 € ; Mova 479, 699 et 749 €). Pages Black Friday de Dreame, Navimow, Mova et Bosch toujours en ligne ; code Bosch `BLACKFRIDAY26` toujours affiché, jusqu'au 02/12. Aucune offre ni code confirmé : tableaux vides. Dates passées au 20/11. Étiquette `sauvegarde-20261120-promos`.
- **Preuve du lot 2** : inscription d'essai envoyée au formulaire du site en ligne (réponse 200), la liste Brevo n° 6 passe de 1 à 2 contacts, source `qrt:essai-croissance`. Clé jamais affichée. Le contact d'essai reste dans la liste : à exclure de tout envoi.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 129 tests OK, build OK.
- **Chef** : contrôler en ligne que `/black-friday-robot-tondeuse` affiche « Dernier contrôle le 20 novembre 2026 » (il affichait encore le 18 à 15 h, avant la mise à jour). Cocher le lot 2 si la preuve te suffit.
- **Croissance, ensuite** : tour promo chaque jour jusqu'au 02/12 ; relire Stiga et le stock Navimow.

## 20/11/2026, vendredi 10 h 45 (heure belge) — Contenu QRT (« mesuré » lot 2)

- **Lot 2 fait sur 10 articles** (40 passages) : les 4 duels prévus (A2/Luba 3 AWD, 430X NERA/A2, A2/A3 AWD Pro, Goat A3000/A2), puis guide A3 AWD Pro, 2 500 m², 1 000 m², moins de 2 000 €, meilleur robot 2026, sans fil périphérique. Le Dreame A2 passe partout de « 58 dB » à « moins de 55 dB annoncés par Dreame ». Lavelab relu en ligne ce jour : « 50 à 60 dB à 1 mètre », cité avec son lien.
- **Faux récit retiré** sur `/ecovacs-goat-a3000-vs-dreame-a2-comparatif` : « le Dreame en test prolongé, le Goat sur un prêt constructeur » remplacé par « nous n'avons essayé ni l'un ni l'autre ».
- **Chiffres inventés retirés** : pente « 65-75 % réels » du Luba 3 AWD prêtée à Maniaques (la page, relue, dit seulement « jusqu'à 80 % », sans mesure) ; bruit « 58-60 dB » du Luba 3 AWD et « 61-63 dB » du Goat A3000, sans source : remplacés par « aucune mesure sourcée lue ».
- **Non touché** : `/robot-tondeuse-silencieux-top-6-2026` (attend la décision du Chef). Labo Maison refuse nos lectures (erreur 403) : les chiffres d'autonomie « selon Labomaison » du duel Goat/A2 (6 h 30 contre 15 h) restent à relire. `/quel-robot-tondeuse-pour-3000m2-grand-domaine-2026` écrit encore « A2 58 dB » (5 passages) : premier de mon lot 3.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 129 tests OK, build OK. Étiquette `sauvegarde-20261120-mesure-lot2`.
- **Chef** : contrôler en ligne `/ecovacs-goat-a3000-vs-dreame-a2-comparatif` et `/dreame-a2-3000-vs-mammotion-luba-3-awd-3000-comparatif` (plus de « 58 dB » pour l'A2, plus de « prêt constructeur »). Toujours attendu : ta décision sur l'ordre du classement silencieux.

## 20/11/2026, vendredi 9 h (heure belge) — Dév QRT (lot 3, premier pas : barème sur 100)

- **Barème public écrit** dans `lib/bareme.ts`, rien d'affiché. 5 critères, tirés des caractéristiques annoncées par la marque : navigation 30, prix pour 100 m² 25, pente 15, bruit annoncé 15, connexion 15. Les paliers sont écrits en clair dans `CRITERES`, la même source servira à la page publique du barème.
- **Règles** : une caractéristique manque → pas de note (aucune note devinée). Sous 55 → la fiche proposera mieux (`SEUIL_PROPOSER_MIEUX`).
- **Essai sur les 31 robots du comparateur** : notes de 44 (Automower Aspire R4) à 95 (Luba 3 AWD 3000) ; 9 robots sous 55, surtout des robots à câble. Tests : 8 nouveaux, 129 au total, tous verts. Types, lint (0 erreur) et build OK.
- **Dév, ensuite** : page publique « Comment nous notons » qui lit `CRITERES`, puis la note sur les 10 premières fiches. **Chef** : relire le barème (poids des critères) avant qu'il soit affiché ; rien à contrôler en ligne cette fois.

## 20/11/2026, vendredi (heure belge) — Contenu QRT (proposition validée par le suppléant : ordre du classement silencieux)

- **Question confiée au Chef**, écrite dans sa ligne du tableau : l'ordre de `/robot-tondeuse-silencieux-top-6-2026` doit-il changer ?
- Les faits, relus dans l'article : 1er Gardena SILENO Minimo 250, 57 dB annoncés par Gardena. 2e Dreame A1 Pro, 48,5 dB(A) relevés par Labo Maison. 4e Dreame A2 3000, « moins de 55 dB » annoncés et 46,2 dB(A) à 1 m relevés par Labo Maison. Le classement ne suit donc pas ses propres chiffres.
- Deux choix pour le Chef : garder l'ordre et écrire en clair le critère du classement, ou remonter les deux Dreame. **Aucun changement dans l'article** : la décision revient au Chef.
- **Chef** : écrire la décision dans le journal. **Contenu** : l'appliquer au passage suivant, puis reprendre le lot 2 « mesuré ».

## 20/11/2026, vendredi (heure belge) — Dév QRT (proposition validée par le suppléant : contrôle D7)

- **D7 contrôlé en ligne sur les 3 pages demandées**, toutes en 200 avec 1 H1. `/robot-tondeuse-ne-charge-plus-diagnostic-solutions` : encart « Une batterie de rechange ». `/cable-peripherique-robot-tondeuse-ronge-mulots` : encart « Du câble et des connecteurs étanches ». `/comment-bien-arroser-sa-pelouse` : aucun encart « pièce » (seulement le calendrier et le quiz).
- Liens des encarts : `/go/batterie/amazon` et `/go/cable/amazon` renvoient vers la recherche Amazon, avec l'étiquette affiliée. **Rien à annuler.**
- **Lot 1** : déjà coché par le Chef ce matin ; ce contrôle le confirme sur la page batterie et sur un article gazon. Aucun code changé.
- **Dév, ensuite** : inchangé (lot 3, barème sur 100 dans `lib/`, rien d'affiché). **Chef** : rien de neuf à contrôler pour D7.

## 20/11/2026, vendredi 8 h 30 (heure belge) — Éditeur QRT (proposition validée par le suppléant)

- **Règle écrite** dans `tasks/equipe.md`, sous « Qui fait quoi » : les jours de gros chantier, le finir avant 21 h 30 UTC (22 h 30 belge), pour laisser du quota Claude à la rédaction de nuit de 23 h 37 UTC. Cause : nuit du 15/11 sans article sur 4 sites.
- Heure de la rédaction de nuit relue dans les tâches du serveur : 23 h 37 UTC, inchangée. Rien d'autre modifié, aucun code.
- **Tous les agents et Claude en session** : appliquer la règle dès aujourd'hui. **Chef** : la rappeler si un passage tardif s'allonge.

## 20/11/2026, vendredi (heure belge) — Chef QRT

- **Site en ligne contrôlé** : 11 adresses lues (10 pages en 200 avec 1 H1), 6 captures à 390 px (accueil, avis Luba 3 AWD, piscine, Black Friday, câble rongé, classement silencieux). Aucun lien Amazon sans étiquette, aucun « testé », aucun faux chiffre sur le robot animé. **Rien à annuler.**
- **Contrôlés** : D7 en ligne (encart « pièce » sur 2 articles câble, rien sur l'article mousse) → **lot 1 coché**. Lot 1 « mesuré » du Contenu : 0 « sonomètre », 0 récit de mesure sur 3 articles. Pages promo datées du 18/11. Article de la nuit `/avis-mammotion-luba-3-awd` conforme à la règle « avis à plus de 1 000 € ».
- **Confié** : Contenu → H1 trop longs remontés en priorité (5 à 6 lignes à 390 px, règle 4 du design V2) après le lot 2 « mesuré ». Dév → lot 3 (barème), puis vignette du Dreame A2 3000. Croissance → tour promo quotidien dès aujourd'hui 15 h. Éditeur → inchangé (lundi 23/11).
- **Claude en session** : les prix Cdiscount affichés datent du 16/11 ; relancer le relevé pendant la semaine du Black Friday. Aucun passage d'agent le 19/11 (crédits épuisés).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), build OK. Seuls `tasks/equipe.md` et ce journal changent.

## 20/11/2026, vendredi 8 h 25 (heure belge) — Dév QRT (mission piscine : contrôle en ligne)

- **Rubrique piscine contrôlée en ligne** (envoyée le 18/11) : `/robot-piscine` en 200 avec 1 H1 et les 4 tuiles (hors-sol, enterrée, ligne d'eau, sans fil) ; adresse inconnue `/robot-piscine/inexistant` en 404 ; `/robot-piscine` présent dans `/sitemap.xml` ; lien présent sur l'accueil (menu et pied de page). Capture à 390 px regardée : mascotte piscine, phrase « aucun article publié », encart « nous n'essayons aucun robot », aucun débordement. **Rien à annuler.**
- **Ce qui reste** : aucun article piscine n'existe encore (`content/articles/robot-piscine/` vide). La carte « Notre choix » et le tableau des prix ne pourront être contrôlés qu'au premier article.
- **Rédaction de nuit** : les 8 sujets piscine de décembre peuvent s'écrire dès le 01/12 dans `content/articles/robot-piscine/<adresse>.mdx`. **Claude en session** : relancer le relevé Cdiscount et Fnac au premier article. **Croissance** : Aiper, Wybot, Beatbot sur les pages code promo. **Dév, ensuite** : lot 3 (barème sur 100, rien d'affiché), puis vignette manquante du Dreame A2 3000 sur `/black-friday-robot-tondeuse`.

## 18/11/2026, mercredi 22 h 35 (heure belge) — Dév QRT (mission du propriétaire : rubrique Robots de piscine)

- **Rubrique ouverte.** Page `/robot-piscine` au design V2 (bandeau bleu, mascotte piscine, quatre tuiles : hors-sol, enterrée, ligne d'eau, sans fil ; chaque tuile affiche un conseil sans modèle ni prix, puis les articles du bassin). Lien dans le menu « Choisir », dans le pied de page et dans le plan du site. La liste est vide tant qu'aucun article n'existe : la page le dit en une phrase.
- **Articles** : un fichier posé dans `content/articles/robot-piscine/<adresse>.mdx` s'affiche sous `/robot-piscine/<adresse>`, avec le gabarit d'article habituel. Guide d'achat ou comparatif d'office (sauf entretien, panne, hivernage) : carte « Notre choix » et tableau des prix dès que l'article contient des `<ProductCTA>`. Jamais de calendrier du gazon ni de pièce de tondeuse dedans ; la tuile du quiz reste en fin d'article. Ces articles ne se mêlent pas à `/blog`, `/comparatifs` ni à l'accueil. Aucune adresse existante ne change (test).
- **Contrôles** : types OK, lint 0 erreur (20 avertissements anciens), 121 tests OK (14 nouveaux), build OK, aucun autre build. En local à 390 px : page de rubrique vide et avec un article d'essai (retiré avant l'envoi), article d'essai, menu ; aucun débordement, 1 H1, adresse inconnue en 404. Étiquette `sauvegarde-20261118-robot-piscine`. Travail fait dans un dossier séparé (`~/.cache/qrt-dev-wt`).
- **Rédaction de nuit et Contenu** : la ligne « Robots de piscine » de `tasks/arborescence.md` dit « ouverte » et donne le dossier. Champ facultatif `bassins:` dans l'en-tête ; sinon le bassin est lu dans l'adresse. Sans `featureImage`, l'article n'a pas de couverture.
- **Chef** : contrôler en ligne `/robot-piscine` (200, 1 H1, 4 tuiles), le menu, le pied de page et `/sitemap.xml`. **Claude en session** : au premier article piscine, relancer le relevé des prix Cdiscount et Fnac et vérifier qu'il trouve les robots de piscine (le script lit déjà les noms cités dans le nouveau dossier ; sans relevé, seule la colonne Amazon se remplit). **Croissance** : dire quel marchand partenaire vend des robots de piscine. **Dév, ensuite** : lot 3 (barème), puis contrôle du premier article piscine.

## 18/11/2026, mercredi 22 h 30 (heure belge) — Éditeur QRT (mission du propriétaire : produits chers)

- **Calendrier refait autour des produits chers** (décision du propriétaire écrite en haut de `tasks/calendrier-editorial.md`). 182 sujets datés, dont 128 sur les robots tondeuses (52), les tracteurs (27) et la piscine (49) ; 18 en réserve ; les 53 sujets anciens (gazon, dépannage) passent derrière. 71 sujets ajoutés : 33 robots à plus de 1 000 € (11 avis de modèles, 12 duels, 10 classements et guides), 26 tracteurs et autoportées, 7 piscine haut de gamme, 5 en réserve.
- **Rédaction de nuit** : la section « Novembre 2026 » du plan est ouverte depuis ce soir et passe avant les sections anciennes. 12 sujets, tous à la racine : avis Luba 3 AWD, classement haut de gamme, robot ou tracteur, page mère `/tracteur-tondeuse`, avis Dreame A3 AWD Pro, meilleur tracteur, avis Navimow X4, grand terrain, duel Luba 3 / Navimow X4, tracteur 3 000 puis 5 000 m², Dreame ou Husqvarna. Deux règles ajoutées au plan : « avis d'un robot à plus de 1 000 € » (une page par famille, jamais « test », pas de note) et « tracteurs » (fiche du fabricant, pente selon la notice, pas de note).
- **Vérification** : environ 190 débuts de requête relevés dans les suggestions Google en français, 11 recherches web. Les classements par budget (1 000 à 3 000 €), par surface (1 500 à 5 000 m²), 4 roues motrices et LiDAR **existaient déjà** : pas de doublon, les nouveaux sujets prennent les angles qui manquaient. Luba 4 AWD et Dreame A4 AWD Pro : toujours aucun prix français. Trois sujets ne s'écrivent que si un prix français existe (Luba 4, Yarbo, Lymow).
- **Dév** : `/robot-piscine` est à ouvrir **avant le 01/12/2026** (8 sujets piscine attendent en décembre ; d'ici là la rédaction les saute). Au premier article tracteur, vérifier que la carte « Notre choix » et les encarts automatiques ne montrent pas un robot. **Contenu** : mettre à jour sur place, avant février, les classements par budget, par surface, 4 roues motrices et LiDAR ; ajouter un lien vers `/robot-tondeuse-ou-tracteur-tondeuse` dans les guides de 3 000 m² et plus quand la page existe. **Croissance** : dire avant le 15/12 quel marchand partenaire vend des tracteurs (sans marchand, la rubrique ne rapporte rien). **Chef** : exception écrite dans l'arborescence (trois ouvertures en deux mois, sur décision du propriétaire) ; premier bilan de la rubrique tracteurs après 10 articles.
- **Claude en session** : la consigne de nuit (hors dépôt) exige encore deux images de robot tondeuse ; à lever pour les tracteurs, qui s'écrivent dès maintenant.
- Seuls 5 fichiers de `tasks/` changent, aucun code. Travail fait dans un dossier séparé (`~/.cache/qrt-editeur-wt`), contrôles et étiquette `sauvegarde-20261118-calendrier-produits-chers` notés dans le compte rendu.

## 18/11/2026 — Claude en session

- **Chantier CRO lancé** (`tasks/chantier-cro.md`) : carte « Notre choix » avec prix Amazon, Cdiscount et Fnac en haut des 175 articles d'achat, lignes de prix par vendeur dans les encarts, tableau des prix en fin d'article, liens Amazon toujours affiliés (recherche Amazon à défaut de fiche).
- 86 fiches Amazon vérifiées : 6 ouvrent un autre modèle ou une page morte, redirigées vers la recherche du bon modèle en attendant le bon ASIN.
- **Contenu QRT, prochain passage** : 8 premiers articles de la liste « sans encart ».
- Leçon : ne jamais `git commit -a` dans le dossier partagé ; un agent peut y avoir un fichier en cours.

## 18/11/2026, mercredi 15 h 15 (heure belge) — Croissance QRT

- **Date mise d'accord (demande du Chef)** : tour complet des 13 marques fait aujourd'hui sur leurs sites officiels. `PROMOS_CHECKED_AT` passe au 18/11 ; les pages `/black-friday-robot-tondeuse` et `/code-promo` affichent « Dernier contrôle le 18 novembre » au-dessus de prix « lus le 18 novembre ».
- **12 prix relevés (9 hier)**. Les 9 d'hier relus, aucun n'a bougé (Dreame 599, 939 et 1 999 € ; Mammotion 1 199, 2 149 et 2 599 € ; Mova 479, 699 et 749 €). 3 nouveaux : Navimow i105E 699 € et i210 LiDAR Pro 1 199 € (campagne du 10 au 30/11 ; i208, i215 et i220 LiDAR en rupture sur la boutique), Ecovacs Goat A1600 LiDAR Pro 799 € (campagne du 9 au 30/11). Toujours sans prix barré ni montant de remise ; `offers` reste vide.
- **Codes** : aucun code pour un robot tondeuse. Bosch publie `BLACKFRIDAY26` (13/11 au 02/12) pour des outils 18 V, sans Indego dans la sélection affichée : écrit tel quel sur la page Bosch, avec la source, pas dans `codes`. Stiga annonce 10 % sur un premier achat contre l'inscription à sa lettre (noté, non vérifié sur un robot). Husqvarna affiche « Newsletter : -5 % » (non écrit sur le site, conditions non lues). Rien chez Worx, Gardena, Einhell, Yard Force ; pour Sunseeker, seul le site allemand a répondu.
- **À juger par le Chef** : la boutique Ecovacs affiche elle-même « prix le plus bas des 30 derniers jours : 999 € » à côté des 799 €. Ce serait la première « offre confirmée », mais le chiffre vient du marchand, pas de nous : je l'ai laissé en prix relevé, avec la phrase d'Ecovacs dans la note de la marque. Dreame annonce aussi des ventes flash chaque soir de 20 h à minuit : nos relevés sont faits l'après-midi.
- **Incident sans dégât, à connaître de tous** : une autre session (hors équipe, branche `feature/cro-prix`, non envoyée) travaillait en même temps dans le dossier du projet. Son second commit a avalé mes 2 fichiers. J'ai remis le dossier sur sa branche avec ses 2 commits, sans changer un fichier, et j'ai fini dans un dossier séparé (`git worktree`, `~/.cache/qrt-croissance-wt`), parti de la branche en ligne : seuls `lib/promos.ts`, son test et ce journal sont envoyés. Rien de `feature/cro-prix` n'est en ligne. Cette branche contient aussi mes 2 fichiers promos, identiques : sa fusion ne créera pas de conflit.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 103 tests OK, build OK, aucun autre build. En local : 8 pages promo en 200 avec 1 H1, 0 prix barré. Site en ligne avant l'envoi : 6 pages en 200 avec 1 H1 (relevés du 17/11 bien en ligne). Étiquette `sauvegarde-20261118-promos-tour`. **Chef** : contrôler en ligne `/black-friday-robot-tondeuse` (date du 18, 12 prix), `/code-promo/bosch` et `/black-friday-robot-tondeuse/ecovacs`. **Croissance, ensuite** : tour quotidien dès le 20/11, puis la preuve d'inscription Brevo.

## 18/11/2026, mercredi 10 h 39 (heure belge) — Contenu QRT

- **Dreame A2 3000, contradiction réglée** : `/robot-tondeuse-black-friday-2026-prix-a-viser` ne dit plus « 1 199 € plus bas ». J'ai relu la boutique Dreame aujourd'hui : **939 €** (référence de la marque 1 999 €, non contrôlée). Résumé, FAQ, tableau, titre de partie, encart et verdict sont à jour, avec la phrase « le plus bas que nous ayons lu, sans garantie qu'il soit le plus bas de l'année ». Même correction dans `/quand-acheter-robot-tondeuse-meilleur-moment-prix-2026` (une phrase).
- **Yuka Mini 2, tranché avec la fiche Mammotion** (lue le 18/11) : le 800 navigue par trois caméras + NetRTK, sans antenne, « quelles que soient les conditions d'éclairage » ; le 1000 passe au LiDAR. L'avis Worx ne dit plus « RTK, tond la nuit ». Les deux avis disent la même chose : caméras, tonte en journée.
- **« Mesuré » lot 1 (10 articles)** : les 2 pages « silencieux », 6 duels, le classement LiDAR, `/robot-tondeuse-pente`. Environ 135 passages réécrits. Sources relues en ligne : Labo Maison a relevé **48,5 dB(A)** sur le Dreame A1 Pro (essai du 21/05/2025, distance non précisée) et **46,2 dB(A) à 1 m** sur le Dreame A2 (26/03/2025) ; Dreame annonce « moins de 55 dB » pour l'A2 3000 ; Mammotion annonce 57 dB pour le Yuka Mini 2 1000. Les deux pages « silencieux » affirmaient l'inverse (« aucun robot mesuré sous 55 dB », « 58 dB mesurés par Labomaison », « 55-57 dB selon Labomaison ») : corrigé, chaque chiffre porte sa source.
- **Faux récits retirés** : « mes propres relevés au sonomètre » (classement silencieux), « 58-59 dB mesurés au sonomètre » (jardin ombragé), « J'ai chronométré : 2 min sur un Husqvarna » (guide d'entretien), « J'ai vu des acheteurs… » (moins de 1 500 €). Chiffres sans source retirés : « lames usées = +3 à 5 dB », « haie = -3 à 5 dB », « désamorce 90 % des conflits ».
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 103 tests OK, build OK, aucun autre build. 6 pages construites lues : 1 H1 chacune. Étiquette `sauvegarde-20261118-c2-mesure-lot1`. Article de la nuit : déjà lu par le Chef ce matin, rien à corriger.
- **Chef** : contrôler en ligne après 10 h 45 UTC `/robot-tondeuse-black-friday-2026-prix-a-viser` (939 €), `/robot-tondeuse-silencieux-top-6-2026` (plus de « sonomètre ») et `/test-worx-landroid-vision-wr205e-avis`. **À juger par le Chef** : le classement « silencieux » garde son ordre (Gardena en tête) alors que les deux Dreame ont les chiffres les plus bas ; je n'ai pas changé l'ordre, seulement les sources. **Contenu, ensuite** : lot 2 « mesuré », en commençant par les 4 duels qui écrivent « A2 3000 annoncé à 58 dB par Dreame » (la fiche dit « moins de 55 dB ») ; l'avis Yuka et l'avis Worx ne s'accordent pas non plus sur la largeur de coupe (18 ou 22 cm) et la boutique Mammotion ne vend plus le Yuka Mini 2 500 (800 à 999 €, 1000 à 949 €).

## 18/11/2026, mercredi 9 h (heure belge) — Dév QRT

- **D7 fait** : les articles de dépannage ont, au milieu du texte, un encart « la pièce qu'il faut ». Trois pièces : lames, câble et connecteurs, batterie. La règle est dans `lib/utils/pieces.ts` (pièce choisie d'après l'adresse de l'article) et `lib/utils/encarts.ts` (dépannage → pièce au milieu, calendrier à la fin).
- **Où il apparaît (5 articles)** : batterie sur `/robot-tondeuse-ne-charge-plus-diagnostic-solutions` et `/batterie-robot-tondeuse-duree-vie-remplacement` ; câble sur les 2 articles `/cable-peripherique-…` (rongé par les mulots, coupé) ; lames sur `/comment-entretenir-son-robot-tondeuse-guide-complet`. **Où il n'apparaît pas** : `/lames-robot-tondeuse-quand-changer` (l'auteur y montre déjà un pack de lames, pas de doublon), nettoyage, hivernage, installation, station de charge (aucune pièce ne s'impose), et tout article gazon, réglementation, guide ou comparatif.
- **Honnêteté** : aucun prix, aucune référence inventée. Le bouton passe par `/go/lames/amazon`, `/go/cable/amazon` ou `/go/batterie/amazon`, qui mène à une **recherche** Amazon avec l'étiquette partenaire : une pièce dépend du modèle, et le dépôt ne contient qu'une seule référence de pièce vérifiée. Le texte dit quoi relever avant de commander (cotes des lames, référence de la batterie) et la mention « Lien partenaire · compatibilité à vérifier avec votre modèle ». La route `/go` n'accepte que ces 3 mots et les références Amazon : tout le reste répond 404.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 103 tests OK dont 10 nouveaux (un test relit les vrais articles : aucune pièce hors dépannage), build OK, aucun autre build. En local : 10 pages en 200 avec 1 H1, 3 captures à 390 px regardées (batterie, câble, lames), sans débordement. Un bouton trop long à 390 px a été raccourci avant l'envoi. Site en ligne lu avant de commencer : 5 pages en 200 avec 1 H1. Étiquette `sauvegarde-20261118-d7-piece-depannage`.
- **Chef** : contrôler en ligne après 9 h 15 UTC `/robot-tondeuse-ne-charge-plus-diagnostic-solutions` (batterie) et `/cable-peripherique-robot-tondeuse-ronge-mulots` (câble), rien sur `/comment-bien-arroser-sa-pelouse` ; puis cocher le lot 1. Les clics se lisent dans les journaux sous `/go/lames|cable|batterie/amazon`. **Contenu** : l'article câble coupé garde 5 encarts de robots écrits dans le texte (votre point 2). **Dév, prochain passage** : piscine, étape 1.

## 18/11/2026, mercredi 8 h 15 (heure belge) — Chef QRT

- **Site en ligne contrôlé** : 28 adresses lues (25 pages en 200 avec 1 H1, 1 renvoi voulu, plan du site, PDF), 7 captures à 390 px (accueil, classement, article gazon de la nuit, avis, Black Friday, calendrier, dépannage). Design V2 conforme, aucun essai affirmé, aucun lien direct vers Amazon. **Rien à annuler.**
- **Travail contrôlé en ligne** : D8 (plus de barre d'achat sur les articles gazon, dépannage, réglementation ; gardée sur classement, duel, avis), ménage du Dév (variables absentes de la feuille de style servie, rien ne bouge), C2 lot 6 (avis Gardena sans « -28 % », avis Yuka sans récit de déballage, avis 450X avec « nous n'essayons pas »), 9 prix relevés du Black Friday (datés, sourcés, non barrés), article de la nuit `/marcher-sur-pelouse-gelee` (9 sources, tuiles calendrier et quiz).
- **Contenu, d'abord** : le Dreame A2 3000 est à 1 199 € « plus bas » dans `/robot-tondeuse-black-friday-2026-prix-a-viser` et à 939 € lus le 17/11 sur `/black-friday-robot-tondeuse`. Corriger l'article avec source et date. Puis « mesuré » lot 1.
- **Croissance, aujourd'hui** : la page Black Friday affiche « Dernier contrôle le 15 novembre » au-dessus de prix lus le 17. Mettre la date d'accord, puis le tour quotidien dès le 20/11.
- **Dév** : D7, inchangé (il ferme le lot 1). Ajouté à la suite : la ligne « Dreame A2 3000 » du Black Friday n'a pas de vignette. **Éditeur** : lundi 23/11, inchangé.
- Fin de mission : 3 cases sur 9, inchangé. Liste du propriétaire : 2 points, inchangés (bonjour@ et mentions légales).

## 18/11/2026, mercredi 7 h 40 (heure belge) — Dév QRT (passage supplémentaire)

- **Petit ménage fait** (proposition validée par le suppléant du propriétaire, rien de plus). `app/globals.css` : 50 variables sans aucun usage retirées (13 couleurs du bloc `@theme`, 37 de `:root` : couleurs, espacements, rayons, verre, ombres). Le fichier passe de 229 à 172 lignes. Gardées : les 3 polices du bloc `@theme` (la police des blocs de code en dépend) et toute variable lue quelque part, y compris par les anciennes maquettes de `content/`.
- **Deux composants supprimés avec leurs tests** : `components/ui/PriceTag.tsx` et `components/ui/AffiliateButton.tsx` (appelés nulle part), `tests/unit/PriceTag.test.tsx` et `tests/unit/AffiliateButton.test.tsx`. Les tests passent de 105 à 93 : les 12 retirés ne testaient que ces deux composants.
- **Preuve que rien ne bouge à l'écran** : la feuille de style construite avant et après a été comparée ligne à ligne. Seules les déclarations des variables retirées ont disparu (820 octets), aucune règle n'a changé. 6 captures pleine page à 390 px, en local et en ligne : 4 identiques au pixel près (accueil, classement, article gazon, page d'avis). Les 2 autres (`/calendrier-du-gazon`, `/black-friday-robot-tondeuse`) ne diffèrent que par le formulaire de la lettre, absent en local faute de réglages Brevo ; le reste du texte est identique.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 93 tests OK, build OK, aucun autre build. En local : 8 pages en 200 avec 1 H1, dont l'article de la nuit `/marcher-sur-pelouse-gelee`. Étiquette `sauvegarde-20261118-menage-variables`.
- **Pas touché, hors de la proposition** : 3 lignes `.pricetag` dans `app/v2-articles.css` (elles ne servent plus), `content/page-home.jsx`, `lib/article-ctas.ts`. `AGENTS.md` (fichier non suivi, pas de moi) laissé tel quel.
- **Chef** : contrôler en ligne après 7 h 45 UTC l'accueil, `/meilleur-robot-tondeuse-2026` et `/calendrier-du-gazon` ; rien ne doit avoir changé. **Dév, passage de 9 h** : D7, inchangé.

## 17/11/2026, mardi 15 h 08 (heure belge) — Croissance QRT

- **Dreame, Mammotion et Mova contrôlés sur leurs boutiques officielles** (demande du Chef). 9 prix lus le 17/11 et écrits dans `lib/promos.ts` (nouveau champ `releves`) : Dreame A1 Pro 599 €, A2 3000 939 €, A3 AWD Pro 3500 1 999 € ; Mammotion Luba Mini 2 AWD 1000 1 199 €, Luba 3 AWD 3000 2 149 €, Luba 3 AWD 5000 2 599 € ; Mova ViAX 250 479 €, LiDAX Ultra 800 699 € (garage offert selon la marque), LiDAX Ultra 1200 749 €. Fins de campagne lues sur les pages des marques : 30/11 pour les trois.
- **Ce ne sont pas des « offres confirmées »** : nous n'avons pas le plus bas des 30 jours. Les pages `/black-friday-robot-tondeuse` et `/black-friday-robot-tondeuse/<marque>` les affichent comme « prix lus le 17 novembre sur la boutique », avec le prix de référence de la marque cité en toutes lettres (« non contrôlé »), sans prix barré, sans montant de remise, sans compte à rebours. Le tableau `offers` reste vide. Les notes « non contrôlées » de Dreame, Mammotion et Mova sont remplacées par les dates lues sur leurs pages.
- **Codes promo** : aucun code pour un robot tondeuse sur les pages Black Friday de Dreame et de Mova ni sur la boutique Mammotion. Date de contrôle de ces 3 marques : 17/11. Les 10 autres restent au 15/11 (prochain tour complet le 20/11).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 105 tests OK dont 1 nouveau (un prix relevé vient de la boutique de la marque, porte sa date, ne peut pas se glisser dans les offres confirmées), build OK, aucun autre build. En local : 8 pages en 200 avec 1 H1, 0 prix barré, 390 px sans débordement. Étiquette `sauvegarde-20261117-promos-releves`.
- **Chef** : contrôler en ligne `/black-friday-robot-tondeuse`, `/black-friday-robot-tondeuse/dreame` et `/code-promo/mammotion`. **Contenu** : la boutique Dreame affiche le A2 3000 à 939 € le 17/11, sous les 1 199 € d'août que `/robot-tondeuse-black-friday-2026-prix-a-viser` donne comme plus bas de l'année (titre « le contre-exemple du Black Friday », résumé, FAQ, tableau) : à mettre à jour avec la source et la date. Le Luba 3 AWD 3000 à 2 149 € et l'A3 AWD Pro 3500 à 1 999 € de `/nouveautes-robot-tondeuse` sont confirmés sur les boutiques.
- **Croissance, ensuite** : du 20/11 au 02/12, relire chaque jour les 9 prix (les corriger ou les retirer s'ils changent) et faire le tour des 13 marques ; puis la preuve d'inscription Brevo pour le lot 2.

## 17/11/2026, mardi 10 h 35 (heure belge) — Contenu QRT

- **C2 lot 6 fait (les 8 pages `/test-…-avis`)** : 48 passages réécrits. Les 25 « en pratique » et « en conditions réelles » ont disparu (recherche → 0). Chaque chiffre dit maintenant d'où il vient : « annoncé » (fiche), « selon des propriétaires », ou « notre estimation ».
- **Récits d'essai retirés** : « On a sorti le robot du carton et on tondait 25 minutes plus tard » (Yuka Mini 2), « on entend un léger bourdonnement à 2 mètres, à 10 mètres on ne l'entend plus » (310 Mark II), « l'app que j'ouvre sans soupirer », « la carte s'affiche en 2 secondes contre 5-8 » et « dévie à 25-30 cm » (Navimow), « 15 minutes, c'est un record » (Worx). Avis 450X NERA : « J'ai analysé des retours terrain… » devient « Cet avis s'appuie sur la fiche Husqvarna et sur les retours publiés (automower-fans.com, Trustpilot FR). Nous n'essayons pas les robots nous-mêmes. »
- **Prix barré non vérifié retiré** (Gardena SILENO life 750) : badge « Bon plan -28 % », « Prix habituel : 980 € » et « Prix actuel de 700 € (-28 %) ». L'encart dit « Prix indicatif, à vérifier chez le marchand ».
- **Fichier de faux témoignages supprimé** : `lib/testimonials.ts` (prénoms, villes, « j'ai pris le Yuka Mini 2 »). Il n'était affiché nulle part ; il ne peut plus l'être par erreur.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 104 tests OK, build OK, aucun autre build. Les 8 pages construites ont 1 H1. Étiquette `sauvegarde-20261117-c2-lot6`. Rédaction de nuit : les 2 articles du 16/11 ont déjà été lus par le Chef, rien à corriger.
- **Chef** : contrôler en ligne après 10 h 15 UTC `/test-gardena-sileno-life-750-avis` (plus de « -28 % »), `/test-mammotion-yuka-mini-2-avis` et `/test-husqvarna-automower-450x-nera-avis`. **À trancher au prochain passage Contenu, avec la page Mammotion** : l'avis Worx dit que le Yuka Mini 2 navigue en RTK et tond la nuit ; l'avis Yuka dit caméra seule et pas de nuit. Le site Mammotion a refusé ma lecture (trop de demandes) : je n'ai rien changé sans source. **Contenu, ensuite** : « mesuré » lot 1 (10 articles).

## 17/11/2026, mardi 9 h (heure belge) — Dév QRT

- **D8 fait** : la ligne d'achat du haut et la barre collée en bas ne s'affichent plus que sur les guides d'achat et les comparatifs. La règle est une seule fonction, `showsBuyBar` dans `lib/utils/page-type.ts`, utilisée par `components/blog/ArticleView.tsx`. La ligne du haut suivait déjà cette règle ; la barre du bas ne la suivait pas.
- **Effet** : 30 articles perdent la barre (19 gazon, 8 dépannage, 3 réglementation), 165 la gardent (101 guides, 64 comparatifs). Leurs en-têtes ne changent pas : le lien `stickyCta` reste écrit, il n'est plus affiché.
- **D6 confirmé** : sur l'accueil, le premier bloc sous le titre mène au quiz (4 choix de surface), et plus rien n'est collé en bas de l'écran.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 104 tests OK dont 3 nouveaux (les 3 articles relevés par le Chef y sont), build OK, aucun autre build. En local, 9 pages en 200 avec 1 H1 ; les 3 articles du Chef n'ont plus de barre, un classement, un guide et un duel la gardent ; 4 captures à 390 px sans débordement. Site en ligne lu avant l'envoi : 9 pages en 200 avec 1 H1. Étiquette `sauvegarde-20261117-d8-barre-achat`.
- **Chef** : contrôler en ligne après 9 h 15 UTC `/robot-tondeuse-ne-charge-plus-diagnostic-solutions`, `/robot-tondeuse-bruit-voisinage-reglementation`, `/comment-bien-arroser-sa-pelouse` (plus de barre) et `/meilleur-robot-tondeuse-2026` (barre gardée). **Contenu** : les `<ProductCTA>` écrits dans le texte de ces 30 articles ne sont pas touchés, c'est votre point 2. **Dév, prochain passage : D7**, puis la piscine.

## 17/11/2026, mardi 8 h 15 (heure belge) — Chef QRT

- **Site en ligne contrôlé** : 28 adresses lues (24 pages en 200 avec 1 H1, 2 renvois voulus, plan du site, PDF), 8 captures à 390 px. Design V2 conforme, aucun essai affirmé, inscription sans consentement refusée (400). **Rien à annuler.**
- **Travail contrôlé en ligne** : D5 (5 types d'articles, tuiles au bon endroit), C2 lot 5 (recherches n° 1 et n° 2 à 0), nom du responsable sur `/confidentialite`, les 2 articles de la nuit (`/nouveautes-robot-tondeuse` : 13 sources, prix « au lieu de » datés et sourcés ; `/cable-peripherique-robot-tondeuse-ronge-mulots`).
- **Cases cochées** : Design V2 (13 étapes sur 13) et Lot 6 (15 e-mails relus). Fin de mission : 3 cases sur 9. Le lot 2 attend une preuve : une inscription qui arrive vraiment dans la liste Brevo.
- **Dév** : D8 d'abord. La barre d'achat collée en bas vend un robot sur des articles dépannage, réglementation et gazon ; elle ne doit rester que sur les guides d'achat et les comparatifs. Puis D7, puis la piscine en 2 étapes (détail dans le tableau).
- **Croissance** : dès aujourd'hui, Dreame et Mammotion dans `lib/promos.ts`. Les pages promo disent « non contrôlées » alors que l'article de la nuit cite des offres en cours. **Contenu** : C2 lot 6 inchangé ; j'ai tranché la question du Dév sur les 59 encarts produit hors achat (au plus un, et seulement s'il règle le problème de l'article).
- **Éditeur** : inchangé, lundi 23/11. Votre arrêt sur les marques de piscine était le bon choix. Liste du propriétaire : 2 points, inchangés.

## 17/11/2026, mardi 7 h 50 (heure belge) — Éditeur QRT (passage supplémentaire)

- **Proposition validée par le suppléant, non exécutée : je me suis arrêté sur un doute.** Elle demandait d'ajouter Aiper, Wybot et Beatbot aux pages code promo **« à l'ouverture de la rubrique piscine »**. La rubrique n'est pas ouverte : `tasks/arborescence.md` la marque « fermée », et `/robot-piscine` n'existe pas dans le code (prévu par le Dév avant le 01/01/2027).
- **Pourquoi ne pas le faire quand même aujourd'hui** : les pages `/code-promo/<marque>` parlent de robots tondeuses dans leurs titres et leurs textes. Une page `/code-promo/aiper` afficherait « Quel est le prix des robots tondeuses Aiper ? » et « Quand les robots tondeuses Aiper sont-ils les moins chers ? », pour trois marques ajoutées ici comme marques de robots de piscine. Elle porterait aussi « vérifié au 15 novembre 2026 », alors que personne n'a contrôlé ces trois marques ce jour-là. La page mère annoncerait « 16 marques suivies » pour un robot tondeuse.
- Le faire bien demande donc plus que 3 lignes dans `lib/promos.ts` : un champ « famille » (tondeuse ou piscine) par marque, des textes adaptés dans `app/(site)/code-promo/[marque]/page.tsx`, `components/promos/Sections.tsx` et la page mère, et un vrai contrôle des trois marques avant d'écrire une date. C'est du code : hors de mon rôle, et la proposition le destinait à Croissance ou au Dév.
- **Rien n'a changé sur le site** : aucun code touché, seuls ce journal et ma ligne du tableau. La tâche reste notée dans `tasks/arborescence.md` (tableau du point 9, « à l'ouverture de la rubrique piscine »).
- **Dév** : quand `/robot-piscine` ouvre, prévenir Croissance. **Croissance** : ajouter alors les trois marques avec des textes « robot de piscine » et un contrôle daté. **Éditeur, lundi 23/11** : passage habituel, inchangé.

## 17/11/2026, mardi 7 h 45 (heure belge) — Dév QRT (passage supplémentaire)

- **D5 fait** (proposition validée par le suppléant du propriétaire, rien de plus) : chaque article a au plus un encart au milieu et un en fin, choisis par `pageType`. La carte est dans `lib/utils/encarts.ts` : guide d'achat et comparatif → marchand au milieu, quiz à la fin ; gazon → calendrier au milieu, quiz à la fin ; réglementation → calendrier au milieu ; dépannage → calendrier à la fin (le milieu est réservé à D7, « la pièce qu'il faut »).
- **Doublons retirés** : les 2 encarts produit ajoutés d'office après le 2ᵉ et le 4ᵉ titre (produits génériques de la catégorie, prix non daté) n'existent plus. L'encart marchand du milieu ne s'ajoute que si l'auteur n'a posé aucun `<ProductCTA>` (22 articles) ; il reprend le lien de l'en-tête de l'article, sans prix. L'encart de fin ne s'affiche pas si la dernière partie du texte mène déjà au quiz (132 articles). L'encart du milieu est posé côté serveur (plus de saut d'affichage). `AutoProductCTAs` et `ToolCTA` supprimés.
- Résultat sur les 215 articles construits : 62 avec le quiz, 28 avec le calendrier, 11 avec les deux, 114 sans tuile (leur texte mène déjà au quiz). Jamais plus de 2, jamais deux fois le même, 1 H1 partout.
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 101 tests OK dont 8 nouveaux, build OK. 7 pages vues à 390 px en local (les 5 types, plus un guide avec encarts de l'auteur et un sans) : aucun débordement, tuiles de 350 px. Étiquette `sauvegarde-20261117-d5-encarts`.
- **Pas touché, à juger** : les `<ProductCTA>` écrits dans le texte restent (610 en tout, dont 59 dans 19 articles gazon, dépannage ou réglementation, où l'objectif n'est pas l'achat). La ligne d'achat du haut et la barre du bas (maquette V2) restent aussi, y compris sur les articles gazon. `lib/article-ctas.ts` n'est plus appelé.
- **Chef** : contrôler en ligne après 7 h 15 UTC un article de chaque type (`/faut-il-tondre-pelouse-hiver`, `/robot-tondeuse-ne-charge-plus-diagnostic-solutions`, `/robot-tondeuse-bruit-voisinage-reglementation`, `/robot-tondeuse-pente`, `/dreame-a2-3000-vs-dreame-a3-awd-pro-3500-comparatif`). **Contenu** : si vous retirez la phrase « Encore un doute ? … quiz » d'un article, la tuile du quiz apparaît toute seule ; dire si les 59 encarts produit des articles hors achat doivent partir. **Dév, prochain passage** : `/robot-piscine`, puis D7.

## 16/11/2026, lundi 15 h 10 (heure belge) — Croissance QRT

- **G5 : déjà fait, rien à refaire.** La session du matin a mis en ligne les deux PDF (`/guides/calendrier-du-gazon.pdf` 8 pages, `/guides/fiche-hivernage-robot-tondeuse.pdf` 4 pages) et le formulaire est sur la page du calendrier. Contrôlé en ligne : 8 adresses en 200. Les PDF se téléchargent sans e-mail (choix de la session, je ne l'ai pas changé).
- **Lot 6, textes prêts dans le dépôt** : `lib/emails/lettre-jardin.ts` contient les 3 e-mails de bienvenue (jour 0 : le calendrier et le PDF ; jour 3 : la règle du tiers et la hauteur de tonte ; jour 7 : choisir un robot) et une fonction qui fabrique la lettre de chacun des 12 mois à partir du calendrier du gazon. Chaque geste garde sa source. Une promotion n'apparaît que si on lui passe une offre confirmée avec sa date. **Rien n'est envoyé, aucun appel à Brevo.**
- Aperçu lisible des 15 e-mails : `docs/lettre-du-jardin.md` (fabriqué par `scripts/lettre-apercu.ts`, à relancer après un changement du calendrier).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 93 tests OK dont 6 nouveaux (désinscription dans chaque e-mail, boutons vers des pages qui existent, aucun « testé », aucune urgence, aucun pourcentage), build OK. Étiquette `sauvegarde-20261116-g6-lettre`.
- **Chef** : le lot 6 peut être coché si les textes vous conviennent (relire `docs/lettre-du-jardin.md`). L'envoi réel reste hors équipe : il manque l'accord du propriétaire, l'adresse bonjour@ qui reçoit, et le programme d'envoi (Claude en session, modèle : `scripts/welcome-sequence.ts` de Toutou). **Contenu** : si vous corrigez un geste dans `lib/content/calendrier-gazon.ts`, la lettre suit toute seule.
- **Croissance, prochain passage** : contrôle des codes et offres (`lib/promos.ts`), chaque jour du 20/11 au 02/12 ; dernier contrôle le 15/11.

## 16/11/2026, lundi 10 h 35 (heure belge) — Contenu QRT

- **C2 lot 5 fait (86 articles)** : les 126 liens « notre [test …] » s'appellent maintenant « notre [avis sur …] » (70 articles). Trouvés en plus, hors de la recherche du Chef : 50 liens de liste « [Test X] » vers les pages d'avis (28 articles), renommés « [Avis X] », et 3 « notre propre [test …] ». Les adresses `/test-…-avis` ne changent pas.
- **Suites qui affirmaient un essai, réécrites** : « couvre l'usage sur saison complète », « détaille 6 mois d'utilisation », « retours terrain sur 18 mois » → « détaille le modèle ». Aussi : « notre retour terrain après 3 mois de test » (2 fois dans `husqvarna-vs-mammotion…`), « notre propre test le ramène à 45-55 % » (devient « les retours de propriétaires »), « nos relevés au sonomètre » (`robot-tondeuse-silencieux` dit maintenant « nous ne mesurons pas les robots nous-mêmes »), « six semaines sur 650 m² », « deux mois de test sans un seul blocage ». Deux citations rattachées à leur source (Les Alexiens).
- **Liens faux corrigés** : 4 liens annonçaient le « Luba 2 AWD » alors que la page parle du LUBA 3 AWD 3000 ; 1 lien « M700 Plus » menait à l'avis du Vision WR205E ; 1 lien « test du Mova ViAX 250 » menait à un comparatif.
- **Lien Black Friday posé** : `robot-tondeuse-black-friday-2026-prix-a-viser` → `/black-friday-robot-tondeuse` (une phrase sous le calendrier, une ligne dans « Pour aller plus loin »).
- Contrôles : types OK, lint 0 erreur (20 avertissements anciens), 87 tests OK, build OK. Les 86 pages construites ont 1 H1. Recherches du Chef : n° 1 → 0, n° 2 → 0, n° 3 → 51, toutes lues : presse citée, « 30 ans de retour terrain Husqvarna », retours de propriétaires, et 6 anciens articles renvoyés ailleurs. Étiquette `sauvegarde-20261116-c2-lot5`.
- **Chef** : rejuger « Honnêteté ». Contrôler en ligne après 10 h 15 UTC `/comment-choisir-robot-tondeuse`, `/robot-tondeuse-silencieux` et `/husqvarna-vs-mammotion-quelle-marque-choisir-2026`. Deux réserves avant de cocher : le mot « mesuré » reste dans 99 articles (255 passages, souvent sans dire qui a mesuré), et les 8 pages d'avis gardent des « en pratique » (25 passages) à relire une par une. **Contenu, prochain passage (lot 6)** : les 8 pages d'avis, puis « mesuré » par lots, puis prix « au lieu de ». Rédaction de nuit : rien à relire (aucun article la nuit du 15/11).

## 16/11/2026, lundi 9 h (heure belge) — Dév QRT

- **Étape 13 du design V2 faite (ménage)** : 35 fichiers de l'ancien style supprimés (`components/home`, `components/effects`, anciens `Nav`, `Footer`, `BottomNav`, `ThemeToggle`, `layout/StickyCTA`, `DragScroll`, la liste de la barre du bas dans `lib/menu.ts`). Le type `HubSectionItem` vit maintenant dans `lib/home-hubs.ts`. `app/globals.css` passe de 1 366 à 229 lignes : 181 règles et 17 animations sans usage retirées (dont le bandeau qui défile). Gardés : `.fiche-print`, `.surface-marker-label`, les règles de la carte, le lien d'évitement.
- **Renvoi** : `/quel-robot-tondeuse-pour-mon-jardin` → `/quiz` (définitif), page sortie du plan du site, lien du menu retiré (le quiz y est déjà), 2 liens d'articles pointés vers le quiz.
- **Trouvé et corrigé en passant** : 126 articles et le menu annonçaient un quiz en « 7 questions ». Il en a 4. Corrigé partout où le lien mène au quiz. Le lint échouait sur la branche en ligne (1 erreur dans `scripts/guides-pdf.cjs`) : réglé dans `eslint.config.mjs`, sans toucher au script.
- Contrôles : types OK, lint 0 erreur (20 avertissements, 21 avant), 87 tests OK, build OK, aucun autre build. En local : 13 pages en 200 avec 1 H1, le renvoi répond 308 vers `/quiz`. 8 pages capturées à 390 px en local et en ligne, comparées point par point : 5 identiques, 3 ne diffèrent que par le robot animé de l'en-tête et la carte. Étiquette `sauvegarde-20261116-menage-v2`.
- **Pas fait, volontairement** : la limite `.v2` reste (elle ne gêne rien) ; une cinquantaine de variables de couleur et d'espacement sans usage restent dans `app/globals.css` (les retirer demande un passage à part) ; `PriceTag` et `AffiliateButton` ne sont plus affichés mais ont encore leurs tests ; `content/page-home.jsx` (ancienne maquette, non affichée, contient « 47 modèles testés ») est à supprimer.
- **Chef** : contrôler en ligne après 9 h 15 UTC l'accueil, un article, `/superficie` (carte) et `/quel-robot-tondeuse-pour-mon-jardin` (doit mener au quiz) ; l'étape 13 peut être cochée si le rendu est bon. **Éditeur** : `tasks/arborescence.md` (l. 82) et un sujet de réserve du plan citent encore l'ancienne adresse comme page mère. **Contenu** : la carte de cet ancien article apparaît peut-être encore dans les listes du blog, comme les 15 autres pages renvoyées (non vérifié). **Dév, prochain passage : D5.**

## 16/11/2026, lundi 8 h 15 (heure belge) — Chef QRT

**Bilan de la semaine du 9 au 15/11, pour le propriétaire**
- **Sorti** : le design V2 sur tout le site (213 articles et toutes les pages), le calendrier du gazon, la fiche d'hivernage, l'inscription à la lettre, les pages codes promo et Black Friday, le comptage des clics et des outils. 6 articles neufs.
- **Honnêteté** : 33 articles nettoyés de leurs faux récits d'essai. Il reste 125 liens appelés « notre test » dans 70 articles, à renommer « notre avis » cette semaine.
- **Cassé** : rien sur le site, aucun retour en arrière. Une seule nuit sans article (15/11, quota Claude atteint, 4 sites touchés) ; la rédaction reprend ce soir.
- **Cette semaine** : ménage de l'ancien style, guide PDF du calendrier, article sur les nouveautés 2027, suivi quotidien des offres Black Friday à partir du 20/11.
- **Pour vous** : 2 points seulement. Activer bonjour@quel-robot-tondeuse.com, et dire quoi écrire dans les mentions légales (4 champs vides en ligne).

**Passage du jour**
- Site en ligne contrôlé : 20 pages lues, 9 captures à 390 px (8 pages de types différents). Tout répond, 1 H1 partout, design V2 conforme aux règles, zéro « testé » affirmé par le site. **Rien à annuler.**
- Travail contrôlé en ligne : C2 lot 4 (3 pages propres), G4 (`/calendrier-du-gazon` 200, comptage 204), lien vers la fiche d'hivernage (visible dans `comment-hiverner…` ; l'autre article renvoie déjà vers celui-ci, donc son lien ne se voit pas).
- **Corrigé par moi** : `/confidentialite` affichait encore « Nom : [À compléter] » alors que le propriétaire a donné le nom le 15/11. Nom posé ; l'e-mail attend la confirmation de réception.
- **Dév** : étape 13 (ménage) + renvoi de `/quel-robot-tondeuse-pour-mon-jardin` vers `/quiz`. **Contenu** : C2 lot 5, élargi (détail dans le tableau). **Croissance** : G5, puis promos chaque jour du 20/11 au 02/12 ; la vérification des pages code promo reste chez vous. **Éditeur** : inchangé.
- **À savoir** : pendant mon passage, une autre session travaillait dans le même dossier sur la branche `feature/guides-pdf` (PDF de la fiche d'hivernage et du guide 12 mois, donc G5 en cours). Son fichier `scripts/guides-pdf.cjs` fait échouer le lint (1 erreur : `require()` interdit) : à corriger avant son envoi. J'ai fini mon travail dans une copie séparée pour ne pas la gêner. **Croissance** : lire cette branche avant de commencer G5, pour ne pas le refaire.
- Fin de mission : 1 case sur 9 ; design V2 à 12 étapes sur 13. Liste du propriétaire ramenée de 6 points à 2 (plus ce qui se fait avec Claude en session).

## 16/11/2026, lundi 7 h 35 (heure belge) — Croissance QRT (passage supplémentaire)

- **Proposition validée par le suppléant du propriétaire, exécutée, rien de plus** : un lien vers `/fiche-hivernage-robot-tondeuse` posé dans `comment-hiverner-son-robot-tondeuse` (une phrase sous le titre « Checklist récapitulative ») et dans `hivernage-robot-tondeuse` (une ligne dans « Articles liés disponibles »).
- Faits cités dans la phrase, vérifiés sur la page de la fiche : 7 étapes à cocher, impression sans e-mail.
- Contrôles : types OK, lint 0 erreur (21 avertissements anciens), build OK, lien présent dans les deux pages construites. Étiquette `sauvegarde-20261116-lien-fiche-hivernage`.
- **Contenu** : ces deux liens du C3 sont faits, ne pas les reposer. Le reste du C3 et la fusion des deux articles restent à vous. **Chef** : contrôler en ligne que les deux articles répondent 200 et que le lien ouvre la fiche.
- **Croissance, prochain passage** : inchangé, G5 (guide PDF du calendrier).

## 16/11/2026, lundi 6 h 40 (heure belge) — Éditeur QRT

- **Rédaction de nuit contrôlée** : les 4 articles du 11 au 14/11 suivent le plan et sont cochés. **Nuit du 15/11 : aucun article.** Cause lue dans le journal du serveur : quota Claude atteint à 23 h 42 UTC (après la mise en ligne du design V2). Quatre sites sont touchés, dont le nôtre. Rien à réparer côté projet : la rédaction reprend ce soir à 23 h 37 UTC.
- **Plan nettoyé** (`tasks/plan-editorial.md`, format inchangé, 185 sujets à 4 champs) : 9 sujets retirés car les pages existent depuis le 15/11 (`/code-promo/<marque>`, `/black-friday-robot-tondeuse`). Un article de nuit à ces adresses aurait fait doublon. Aiper, Wybot et Beatbot iront dans `lib/promos.ts`, pas en article.
- **Annonces des marques** (recherche web du 16/11, salon IFA de septembre 2026) : Mammotion Luba 4 AWD, Navimow H5 Pro, Dreame A4 AWD Pro, Sunseeker S7 et S5, Eufy S2 Max ; Ecovacs Ultramarine P1 côté piscine. Sujets ajoutés : `/nouveautes-robot-tondeuse` **passé en tête** (à écrire cette nuit, avant le Black Friday du 27/11), règle européenne sur les batteries (janvier, « à confirmer »), duel Luba 4 / Luba 3 (février, seulement si le prix français est publié), avis Ecovacs Ultramarine P1 (mai).
- **Avance** : 57 sujets ouverts aujourd'hui (15 hiver, 17 dépannage, 25 fin d'hiver), puis 120 sujets datés de décembre 2026 à novembre 2027 et 8 en réserve. Aucune adresse du plan n'existe déjà dans les articles ni dans les pages du site (contrôle par script).
- **Rubrique suivante (robots de piscine) : pas ouverte.** Le critère n'est pas atteint : « Autour du robot » démarre le 01/12 et n'a encore ni page mère ni article. À rejuger fin décembre avec le Chef.
- **Chef** : contrôler demain que l'article de la nuit est `/nouveautes-robot-tondeuse` (200, 1 H1, chaque annonce avec sa source, aucun « testé »). **Croissance** : je vous ai attribué la vérification mensuelle des pages code promo dans l'arborescence (elles vivent dans `lib/promos.ts`) ; au Chef de trancher si Contenu doit la garder. **Contenu** : lien de `robot-tondeuse-black-friday-2026-prix-a-viser` vers `/black-friday-robot-tondeuse` toujours à poser ; au printemps, mettre à jour le top 6 coupe-bordure avec les robots à bras. **Dév** : `/robot-piscine` avant le 01/01/2027, inchangé.

## 16/11/2026 (nuit) — Claude en session

- **Design V2 en ligne sur tout le site** : articles (213), blog, comparatifs, marques, auteur, pages légales, quiz, comparateur, outils, calendrier, fiche hivernage, bons plans. Contrôle en ligne de 22 pages à 390 px : aucun débordement, aucun bouton sur deux lignes, aucune police à chasse fixe, H1 à 32 px.
- **Nouvelles pages** : `/code-promo` (13 marques) et `/black-friday-robot-tondeuse` (12 marques), données dans `lib/promos.ts`, aucune offre inventée. Ajoutées au menu, au pied de page et au plan du site.
- **Arborescence et calendrier éditorial** : `tasks/arborescence.md`, `tasks/calendrier-editorial.md`, 127 sujets ajoutés à `tasks/plan-editorial.md`. La rédaction de nuit suit maintenant le mois en cours.
- Biographie de l'auteur réécrite sans « je teste ». Sauvegarde avant la mise en ligne : étiquette `sauvegarde-20261115-avant-v2-complet`.
- **Dév QRT, prochain passage** : étape 13 de `tasks/design-v2.md` (ménage de l'ancien style ; garder les règles d'impression `.fiche-print` et `.surface-marker-label`, déplacer le type de `lib/home-hubs.ts` avant de supprimer `components/home`). Ensuite : rubrique `/robot-piscine` avant le 1er janvier.
- **Croissance QRT** : contrôle des codes et offres dans `lib/promos.ts` tous les jours du 20/11 au 2/12 (Mova annonce des remises à partir du 16/11). **Contenu QRT** : lien de l'article `robot-tondeuse-black-friday-2026-prix-a-viser` vers `/black-friday-robot-tondeuse`.

## 15/11/2026 (soir) — Claude en session, avec le propriétaire

- **Design V2 validé par le propriétaire** et à appliquer à tout le site. Maquette : https://maquette-qrt.85-190-127-13.sslip.io, sources dans `docs/maquette-v2/`, règles et ordre de migration dans `tasks/design-v2.md`.
- En ligne : socle `app/v2.css` (limité à `.v2`), en-tête, menu et pied de page V2 sur tout le site, accueil V2 avec le robot qui tond le titre, mascotte en 17 poses, police à chasse fixe retirée, barre d'onglets du bas retirée.
- Réponses du propriétaire du même jour : DNS déplacé chez Cloudflare, domaine authentifié chez Brevo, clé Brevo posée (formulaire en ligne), revenu Amazon = 0 € par mois, responsable des données = Mathias Cetani avec une adresse dédiée (à venir).
- **Dév QRT, prochain passage : étape 1 de `tasks/design-v2.md`** (gabarit d'article). **Chef** : contrôler l'accueil en ligne à 390 px.

## 15/11/2026, 15 h (heure belge) — Croissance QRT

- **G4 fait** : outil `/calendrier-du-gazon`. 3 choix (4 régions, 3 expositions, robot ou non), 12 mois, 3 gestes par mois plus le geste robot. Chaque geste affiche sa source [S1 à S8] ; les 5 gestes sans source et les décalages entre régions portent la mention « repère indicatif », expliquée sur la page. Les 8 sources sont en lien en bas. La page dit aussi que les sources divergent sur la hauteur de tonte. Sans JavaScript, le calendrier de référence est déjà dans la page.
- La question « surface » du plan n'est pas posée : aucune source ne fait varier les gestes selon la surface (dit sur la page, avec un lien vers `/superficie`). S9 (Barenbrug, lue chez un revendeur) n'est pas citée.
- Aussi : page dans le plan du site, colonne « Entretenir » dans le menu Outils (calendrier + fiche hivernage), comptage `POST /api/m/calendrier-gazon` au premier choix (1 par visite), formulaire de la lettre prêt sur la page (caché tant que la clé Brevo manque). Contenu : `lib/content/calendrier-gazon.ts`.
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), **62 tests OK** (5 nouveaux), build OK. En local, navigateur à 390 px : 200, 1 H1, aucun débordement, mois en cours encadré, les choix changent bien les gestes, 1 seul appel de comptage, 0 erreur. Étiquette `sauvegarde-20261115-g4-calendrier`.
- **Contenu** : la page existe, vous pouvez poser les liens vers `/calendrier-du-gazon` depuis les articles gazon (pas avant la mise à jour de 15 h 15 UTC). **Dév (D5)** : l'encart « Calendrier » peut pointer vers cette adresse. **Centre de contrôle (Claude en session)** : un 4ᵉ événement à compter, `calendrier-gazon`. **Chef** : contrôler en ligne `/calendrier-du-gazon` (200, 1 H1, sources visibles, vue à 390 px) et `curl -X POST .../api/m/calendrier-gazon` → 204.
- **Croissance, prochain passage : G5** = guide PDF du calendrier (page à imprimer en style `.fiche-print`, 12 mois sur 2 à 3 pages A4), puis textes du lot 6. À relire un jour : une source Météo-France ou INRAE pour chiffrer les décalages régionaux.

## 15/11/2026, 10 h 30 (heure belge) — Contenu QRT

- **C2 lot 4 fait (22 articles)** : les 11 de la liste du Chef, plus 11 trouvés avec une recherche plus large (`robot-tondeuse-et-pluie…`, `batterie-…-duree-vie`, `lames-…-quand-changer`, `robot-tondeuse-connecte-wifi…`, `pelouse-abimee…`, `robot-tondeuse-ne-charge-plus…`, `robot-tondeuse-securite-enfants-animaux`, `robot-tondeuse-bruit-voisinage…`, `robot-tondeuse-antivol…`, `pourquoi-mon-gazon-jaunit`, `robot-tondeuse-terrain-complexe…`). Retirés : « On a testé 12 modèles pendant 6 mois », « testés en conditions réelles », « mes 11 robots testés depuis 2018 », « j'ai acheté mon premier robot en 2019 », « j'ai pesé 120 g », le beau-père, le voisin, etc. Remplacés par des cas généraux et les chiffres déjà donnés dans l'article. Les « dB mesurés » deviennent « dB annoncés ».
- Aussi : « 94 % des Automower fonctionnent encore après 7 ans » retiré (sans source) ; 17 liens « top 10 testés » renommés « top 10 comparés et classés » (le vrai titre de la page) ; 2 liens posés vers `/calculateur-rentabilite-robot-tondeuse` et `quand-acheter…`.
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), 57 tests OK, build OK. Les 40 pages touchées ont 1 H1. La recherche du Chef ne trouve plus rien. Étiquette `sauvegarde-20261115-c2-lot4`.
- **Reste pour cocher « Honnêteté » → C2 lot 5** : 126 liens « notre [test …] » dans 70 articles (les pages liées s'appellent déjà « … avis »). Recette : `notre [test du X]` → `notre [avis sur le X]` (`de la` → `sur la`), et remplacer les suites qui affirment un essai (« couvre l'usage sur saison complète », « retours terrain sur 12 mois », « en saison complète ») par « détaille le modèle ». Liste : `grep -rnE "[Nn]otre \[test " content/articles`. Les adresses `/test-…-avis` ne changent pas.
- Restent honnêtes et gardés : « j'ai croisé les fiches », « mon premier choix », essais de presse cités (Stiftung Warentest, UFC-Que Choisir, QUATRE PATTES).
- **Chef** : contrôler en ligne `/meilleur-robot-tondeuse`, `/robot-tondeuse-combien-ca-coute-vraiment` et `/robot-tondeuse-securite-enfants-animaux` (200, 1 H1, plus de récit). **Contenu, prochain passage : C2 lot 5**, puis prix « au lieu de », puis batterie 50-70 %.

## 15/11/2026, 9 h (heure belge) — Dév QRT

- **D4 fait (lot 1, étape 1)** : chaque article porte maintenant un champ `pageType` (guide-achat, comparatif, depannage, gazon, reglementation). Rien n'est affiché, le rendu est inchangé. Code : `lib/utils/page-type.ts`, branché dans `lib/blog.ts` et `lib/articles.ts`.
- Le type vient d'abord de l'adresse, puis de la catégorie (« astuces » mélange tout). Classement des 213 articles, relu ligne par ligne : **110 guides d'achat, 64 comparatifs, 21 gazon, 14 dépannage, 4 réglementation**. Les 30 comparatifs rangés en « astuces » et les 9 duels de marques rangés en « guide-achat » sont bien reconnus. Entretien du robot, installation et hivernage sont rangés en « dépannage » (objectif : la pièce qu'il faut).
- Pour corriger un article mal classé : ajouter `pageType: "gazon"` (ou un autre des 5 types) dans son en-tête. Cette ligne passe avant tout le reste.
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), **57 tests OK** (9 nouveaux), build OK. En local : 5 pages en 200 avec 1 H1, le mot `pageType` absent du HTML, comparatif Dreame/Mammotion et article mousse vus à 390 px. Étiquette `sauvegarde-20261115-d4-page-type`.
- **Chef** : rien de visible à contrôler, seulement que le site répond (accueil + 1 article en 200, 1 H1). **Contenu** : rien à faire. **Dév, prochain passage : D5** (un encart au milieu, un en fin d'article, choisis par `pageType` ; retirer les doublons).

## 15/11/2026, 8 h 15 (heure belge) — Chef QRT

- Site en ligne vérifié (5 captures à 390 px) : accueil, article de la nuit sur le câble périphérique en hiver, `/confidentialite`, `/quiz`, comparatif Dreame/Mammotion ; plus 3 pages en lecture simple. Tout en 200, 1 H1, zéro « testé ». **Rien de cassé, rien à annuler.**
- Travail du 14/11 contrôlé en ligne : **D3** (`POST /api/m/quiz-termine` → 204, inconnu → 404, `GET` → 405), **C2 lot 3** (2 pages sur 11 et la FAQ Black Friday : propres), **G3** (`/api/inscription` sans consentement → 400 ; formulaire caché tant que la clé manque). `/go/...` toujours en 302.
- **Honnêteté non cochée** : le « 0 récit restant » du 14/11 ne valait que pour les 11 articles du lot 3. J'en ai trouvé 11 autres qui affirment un essai ou un achat (« On a testé 12 modèles pendant 6 mois », « testés en conditions réelles », « j'ai acheté mon premier robot »). Liste et recherche dans `tasks/equipe.md`, constats du 15/11.
- **Contenu : C2 lot 4** (ces 11 articles) passe avant la batterie 50-70 %. **Dév : D4**, en regardant aussi l'adresse (un comparatif est rangé en « astuces »). **Croissance : G4** inchangé.
- Fin de mission : 1 case sur 9. Lot 0 : la part de l'équipe est finie, il manque l'affichage dans le centre de contrôle (Claude en session). Liste du propriétaire : 6 points, inchangés.

## 14/11/2026, 15 h (heure belge) — Croissance QRT

- **G3 fait** : liste Brevo séparée « Quel Robot Tondeuse » créée (numéro 6, vide, compte de Toutou). Adresse `POST /api/inscription` : case de consentement obligatoire, champ piège, rien stocké par le site ; 503 tant que la clé Brevo manque sur le serveur. Formulaire en bas de `/fiche-hivernage-robot-tondeuse` (case non cochée, lien vers la confidentialité), **affiché seulement quand la clé est posée**. Aucun e-mail envoyé.
- `/confidentialite` réécrite : lettre du jardin, Brevo (UE), désinscription, suppression après 3 ans sans ouverture, comptage sans cookie, journaux. Les 2 « [À compléter] » (nom, e-mail du responsable) restent pour le propriétaire.
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), **48 tests OK** (5 nouveaux), build OK. En local, construction avec clé factice, navigateur à 390 px : sans case → « Cochez la case… » ; clé refusée par Brevo → message d'erreur. Étiquette `sauvegarde-20261114-g3-inscription`.
- **Claude en session (propriétaire)** : ajouter `BREVO_API_KEY` (la même que Toutou) dans l'environnement du site sur le serveur, puis relancer la mise à jour : le formulaire apparaît. Les agents n'ont pas accès à `/srv`. **Chef** : contrôler en ligne `/confidentialite` (200, 1 H1) et `curl -X POST .../api/inscription` → 400 sans consentement.
- **Croissance, prochain passage : G4** (`/calendrier-du-gazon`, contenu sourcé 12 mois, puis guide PDF). La règle « 3 ans sans ouverture » sera à appliquer dans Brevo quand les envois démarreront.

## 14/11/2026, 10 h 30 (heure belge) — Contenu QRT

- **C2 lot 3 fait (11 articles à récit vécu)** : les 11 de la liste du Chef. Retirés : « mon terrain de 2 400 m² », « j'ai mesuré 56-57 dB », « j'ai gardé les deux robots », « 3 ans de tests sur mon terrain », « depuis 2018 sur quatre terrains », « mon sol à pH 5,2 », etc. Remplacés par les chiffres annoncés par les fabricants et les retours de propriétaires. Le comparatif Dreame/Mammotion dit maintenant que la rédaction n'a essayé aucun des deux robots ; le « prix promo 2 299 € » non daté du LUBA 3 est retiré.
- **FAQ Black Friday** (ligne 21) : « 699 € du 27 octobre au 12 novembre, offre terminée ». Liens ajoutés vers `/superficie` (×3) et `/quiz` (×1) en fin d'article.
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), 43 tests OK, build OK ; HTML des 11 pages : 1 H1 chacune, zéro « testé », « sur mon terrain », « j'ai mesuré ». Étiquette `sauvegarde-20261114-c2-lot3`.
- **Récits vécus restants : 0** (seule trace : une question de lecteur « Mon jardin de 200 m² », normale). Compte brut « testé » : 51 articles, 67 passages, surtout des essais de presse cités. **Chef** : la case « Honnêteté » peut être jugée maintenant ; contrôler en ligne 2 des 11 pages et la FAQ Black Friday.
- **Contenu, prochain passage** : batterie « 50-70 % » en hiver → « suivez la notice » (23 fichiers contiennent « 50-70 % », à trier), puis C3 (maillage vers les outils).

## 14/11/2026, 9 h (heure belge) — Dév QRT

- **D3 fait (lot 0, outils mesurés)** : à la fin du quiz, à la première surface tracée sur `/superficie` et au premier réglage du calculateur de rentabilité, la page appelle `POST /api/m/quiz-termine`, `/api/m/surface-mesuree` ou `/api/m/calcul-rentabilite`. Le site répond 204 sans rien stocker, sans cookie ; un seul signal par visite pour la surface et le calcul. Événement inconnu → 404, `GET` → 405 (les robots d'indexation ne comptent pas).
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), **43 tests OK** (4 nouveaux), build OK. En local, navigateur à 390 px : fin du quiz → 1 appel `quiz-termine` ; 2 réglages du calculateur → 1 seul appel `calcul-rentabilite`. Rendu inchangé. La carte `/superficie` n'a pas été tracée dans le navigateur (même code, couvert par le test). Étiquette `sauvegarde-20261114-d3-mesure`.
- **Chef** : contrôler en ligne `curl -X POST https://quel-robot-tondeuse.com/api/m/quiz-termine` → 204. **Centre de contrôle (Claude en session)** : compter les lignes `POST /api/m/<evenement>` des journaux (avec `GET /go/` pour les clics) ; la page d'origine est dans le Referer.
- **Dév, prochain passage : D4** (`pageType` par article, avec un test). Lot 0 côté site : fini ; reste l'affichage dans le centre de contrôle.

## 14/11/2026, 8 h 15 (heure belge) — Chef QRT

- Site en ligne vérifié (4 captures à 390 px) : accueil, fiche hivernage (G2), article de la nuit sur le nettoyage au Kärcher, Black Friday ; plus `comment-hiverner-son-robot-tondeuse`. Tout en 200, 1 H1, zéro « testé ». `/go/B0GCZSSZRZ/amazon` répond en 302 vers Amazon avec l'étiquette. **Rien de cassé, rien à annuler.**
- C2 lot 2 confirmé : plus d'offre Mova présentée comme en cours. Reste 1 phrase au présent dans la FAQ Black Friday (ligne 21) → **Contenu**.
- **Récits vécus restants (11 articles)** → **Contenu, C2 lot 3** : `comment-enlever-mousse-gazon`, `comment-bien-arroser-sa-pelouse`, `quel-robot-tondeuse-sans-fil-choisir`, `quand-et-comment-scarifier-sa-pelouse`, `robot-tondeuse-navigation-rtk-guide-complet`, `quel-robot-tondeuse-pour-1000m2-grand-terrain`, `dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif`, `quel-robot-tondeuse-pour-200m2-guide-achat-2026`, `premiere-tonte-printemps-robot-tondeuse`, `quel-robot-tondeuse-pour-petit-jardin`, `comment-choisir-robot-tondeuse-terrain-en-pente` (recherche : « sur mon terrain », « chez moi », « mon jardin de N », « j'ai testé », « notre test »).
- **Dév : D3** inchangé. **Croissance : G3** inchangé. Ajouté pour le propriétaire : nom et e-mail du responsable du traitement (`/confidentialite`).
- Fin de mission : toujours 1 case sur 9. Lint 0 erreur (9 avertissements), types OK.

## 13/11/2026, 15 h (heure belge) — Croissance QRT

- **G2 fait et envoyé** : page `/fiche-hivernage-robot-tondeuse`, fiche à imprimer sans e-mail. 7 étapes à cocher (dernières tontes, nettoyage, lames, batterie, rangement, câbles, remise en route), chaque geste avec sa source (Husqvarna S2/S3 relus ce jour, Hubo S8). Autres marques : « la notice passe avant ». Bouton « Imprimer » ; à l'impression, menu, pied de page et boutons disparaissent (PDF de 3 pages A4 vérifié). Dans le plan du site (sitemap).
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), 39 tests OK, build OK (690 pages). En local : page en 200, 1 H1, zéro « testé », vue à 390 px. Étiquette `sauvegarde-20261113-g2-hivernage`.
- **Contenu** : vous pouvez lier la fiche depuis `comment-hiverner-son-robot-tondeuse`, `hivernage-robot-tondeuse` et les articles de novembre (lien interne simple). Les deux articles et la fiche disent la même chose sur la batterie.
- **Pour G3, trouvé** : la page `/confidentialite` contient encore 3 « [À compléter] » (nom et e-mail du responsable) et ne parle pas de lettre d'information ni de Brevo. Je l'ajoute au prochain passage avant d'ouvrir le formulaire ; le nom du responsable est à confirmer par le propriétaire (voir sa liste).
- **Chef** : contrôler en ligne `/fiche-hivernage-robot-tondeuse` (200, 1 H1). **Croissance, prochain passage : G3** (liste Brevo + formulaire + page confidentialité).

## 13/11/2026, 10 h 30 (heure belge) — Contenu QRT

- **C2 lot 2 fait et envoyé (10 articles).** Offre Mova « jusqu'au 12 novembre » retirée de 5 articles (les 4 prévus + `robot-tondeuse-cadeau-noel-2026-lequel-offrir`) : prix gardés, datés et marqués « offre terminée », bandeaux collants neutres (« Prix relevés en novembre 2026, à vérifier »). Aucun prix du 16 novembre publié (recherche faite) : rien d'inventé.
- **2 contradictions corrigées** : `hauteur-coupe-robot-tondeuse-saison` (6-8 cm avant l'hiver, source Husqvarna ; récit « mes 720 m² » retiré) et `comment-hiverner-son-robot-tondeuse` (batterie selon la notice, charge complète chez Husqvarna ; « mon erreur à 150 € » et « depuis 5 ans » retirés). Plus `gardena-sileno-vs-worx-landroid-comparatif`, `pourquoi-mon-gazon-jaunit` (badge « -28 % » non vérifié retiré), `robot-tondeuse-herbe-haute-pelouse-negligee-2026`.
- Contrôles : types OK, lint 0 erreur, 39 tests OK, build OK ; HTML des 10 pages : 1 H1 chacune, zéro offre « jusqu'au 12 ». Étiquette `sauvegarde-20261113-c2-lot2`. Site en ligne en 200 juste après l'envoi.
- Reste au compte `grep` : **60 articles, 82 passages**. Une partie est honnête (« testé par Tom's Guide », « testez le signal du fil ») : le compte ne tombera pas à 0 seul. **Chef** : pour cocher « Honnêteté », juger sur les récits vécus, pas sur le compte brut.
- Vu en passant : **10 articles** conseillent encore une batterie « à 50-70 % » pour l'hiver (liste : `grep -rlE "50[-–à ]+70 ?%" content/articles`) → je les aligne sur « suivez la notice » au lot 3. 1 autre badge « -xx % » à vérifier. **Chef** : contrôler en ligne le Black Friday et l'hivernage.

## 13/11/2026, 9 h (heure belge) — Dév QRT

- **D2 fait (lot 0, clics marchands)** : toute fiche Amazon.fr passe par `/go/<ASIN>/amazon` (redirection 302 vers Amazon avec l'étiquette, sans cache, `noindex`, interdite dans robots.txt, absente du sitemap). Dans les pages construites : **1 197 liens `/go/`, 0 lien direct vers une fiche Amazon**. 26 liens Amazon de recherche gardent l'étiquette en direct (pas de fiche à compter).
- Branchés : `<AffiliateLink>`, `AffiliateButton`, plugin MDX (ajoute aussi `rel="sponsored nofollow"` aux liens du corps), bandeau collant, colonne latérale, encarts produits, cartes produits de l'accueil (ancien `Link` remplacé par un lien simple : le préchargement aurait compté de faux clics).
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), **39 tests OK** (5 nouveaux : redirection, refus d'un marchand inconnu ou d'une adresse piégée), build OK. En local : 7 pages en 200 avec 1 H1, `/go/...` en 302. Accueil et `/meilleur-robot-tondeuse-2026` vus à 390 px. Étiquette `sauvegarde-20261113-d2-go`.
- **Chef** : contrôler en ligne qu'un `/go/B0GCZSSZRZ/amazon` répond en 302 vers Amazon. **Centre de contrôle (Claude en session)** : compter les lignes `GET /go/` des journaux du serveur ; la page d'origine est dans le Referer.
- Vu à 390 px sur l'accueil : sous le grand titre, la phrase « 55 robots… » est coupée à mi-largeur (déjà là avant D2). Ajouté à mes tâches UX. **Dév, prochain passage : D3.**

## 13/11/2026, 8 h 15 (heure belge) — Chef QRT

- Site en ligne vérifié à 390 px (captures) : accueil, article de la nuit sur les feuilles mortes, `/test-mammotion-luba-2-awd-avis`, comparatif Mova/Worx. Tout en 200, 1 H1, zéro « testé ». **Rien de cassé, rien à annuler.** D1, C2 lot 1 et G1 sont en ligne.
- **Fausse urgence en ligne** : l'offre Mova « jusqu'au 12 novembre 2026 » est périmée depuis ce matin (4 articles, avec bandeau). → **Contenu** : C2 lot 2 commence par là, puis les 2 contradictions trouvées par Croissance.
- **Dév** : D2 inchangé (adresse `/go/...`). J'ai découpé le lot 1 en 4 étapes (D4 à D7) dans `tasks/equipe.md`. **Croissance** : G2 inchangé.
- Fin de mission : 1 case sur 9 (rien de neuf à cocher). Lint 0 erreur, types OK. Reste 64 articles avec « testé » & co.

## 12/11/2026, 15 h (heure belge) — Croissance QRT

- **G1 fait** : `tasks/calendrier-gazon-sources.md` : 12 mois, 3 gestes par mois plus le geste robot, variantes nord / sud / montagne et soleil / mi-ombre / ombre. 9 sources lues (SEMAE, Husqvarna ×2, Jardiner autrement/SNHF, FREDON, ministère + VigiEau, RHS, Hubo, Barenbrug via revendeur). Ce qui n'a pas de source est marqué « repère équipe, à relire » (dont les décalages régionaux chiffrés).
- **Adresse prévue de l'outil : `/calendrier-du-gazon`.** Contenu : ne pas poser de lien avant que la page existe (je le dirai ici).
- **Contenu, 2 contradictions trouvées** : `hauteur-coupe-robot-tondeuse-saison` dit « 30-40 mm en novembre », Husqvarna dit laisser 6-8 cm avant l'hiver ; `comment-hiverner-son-robot-tondeuse` dit batterie à 50-70 %, Husqvarna dit charge complète (et l'article contient « mon erreur à 150 € », récit vécu).
- Rien créé chez Brevo, rien envoyé par e-mail. **Croissance, prochain passage : G2** (fiche « Hivernage du robot », page du site).

## 12/11/2026, 9 h 45 (UTC) — Contenu QRT

- **C2 lot 1 fait et envoyé** : les 8 articles « test-… », `meilleur-robot-tondeuse-2026` et `husqvarna-automower-vs-mammotion-luba`. Titres, descriptions, résumés, FAQ et corps reformulés en « avis d'après la fiche du fabricant et les retours de propriétaires ». Retirés : récits d'essai (« 6 mois sur mon terrain », « j'ai gardé le Mammotion »), mesures inventées (dB, pentes), fausse méthode « 4 semaines sur 3 jardins », promo « 700 € au lieu de 980 € » (Gardena). Adresses inchangées.
- **Cause corrigée** : le guide d'écriture `boileau` (suivi par la rédaction de nuit) demandait d'écrire « en testeur » et de citer des « mesures perso ». Il impose maintenant la règle d'honnêteté.
- Contrôles : types OK, lint 0 erreur, 34 tests OK, build OK ; HTML des 10 pages : 1 titre H1 chacune, zéro « testé ». Étiquette `sauvegarde-20261112-c2-lot1`.
- Reste : **64 articles, 97 passages** (lots 2 à 7). **Lot 2 en premier** : 4 articles annoncent une offre Mova « jusqu'au 12 novembre 2026 » (périmée dès demain = fausse urgence).
- **Chef** : contrôler en ligne `/test-mammotion-luba-2-awd-avis` et `/meilleur-robot-tondeuse-2026` vers 10 h 45 (UTC). **Dév** : les étiquettes « Test » des cartes, si elles restent, viennent du tag `test` des articles (je n'y ai pas touché pour ne casser aucune adresse).

## 12/11/2026, 8 h 10 (UTC) — Dév QRT

- **D1 fait et envoyé.** a) Cartes d'articles : une image de secours s'affiche quand `featureImage` est vide (76 articles concernés). b) Gabarits honnêtes : plus aucun « testé », « On teste pour de vrai », « 6 semaines de test », « +1 200 tests », « Live · mis à jour cette semaine », « en direct ». À la place : 55 fiches robots, 210 articles, barème public. Étiquette des cartes « Test » → « Avis ». `DealsSection` et `Countdown` supprimés.
- Contrôles : types OK, lint 0 erreur (9 avertissements anciens), 34 tests OK, build OK. En local : `/`, `/blog`, `/blog/husqvarna`, `/comparatifs`, `/marques` en 200, zéro « testé » dans le HTML ; accueil et `/blog/husqvarna` vus à 390 px. Étiquette `sauvegarde-20261112-d1-honnetete`.
- Les adresses `/tests/...` ne changent pas (aucun lien cassé).
- **Contenu** : les titres et résumés des articles disent encore « Test… », « test complet après 6 mois » (vu sur `/blog/husqvarna`) → C2 lot 1.
- **Chef** : contrôler en ligne vers 9 h 15 (UTC). **Dév**, prochain passage : D2 (lot 0, adresse `/go/...`).

## 12/11/2026, 7 h 15 (UTC) — Chef QRT

- Site en ligne vérifié à 390 px (captures) : accueil, `/faut-il-tondre-pelouse-hiver`, `/blog/husqvarna`, `/quiz`. Tout répond (200). **Rien de cassé, rien à annuler.** D0 du Dév est bien en ligne ; lint, types : OK chez moi aussi.
- La rédaction de nuit a suivi le plan éditorial (sujet coché, image en ligne, aucun « testé ») → case « Plan éditorial » cochée dans « Fin de mission » (1 sur 9).
- Toujours en ligne : cartes sans image et « On a testé… » sur l'accueil. → **Dév** : D1 reste la priorité, plus « LIVE 2026 · MIS À JOUR CETTE SEMAINE » et « comparées en direct » (fausse fraîcheur). À 390 px, le panneau flottant du bas couvre l'accueil (mis dans « Ensuite »).
- Le propriétaire ne dira pas s'il y a eu de vrais essais : question retirée de sa liste. → **Contenu** : C2 reformule tout « testé » vécu (73 articles).
- **Croissance** : pas encore passé ; G1 inchangé, avec l'adresse de la future page Calendrier en tête du fichier.

## 12/11/2026, 0 h 15 (UTC) — Dév QRT

- **D0 fait : le lint est au vert** (77 erreurs → 0 ; 9 avertissements anciens, non bloquants). Maquettes `content/*.jsx` exclues du lint. Supprimés car plus utilisés depuis le 11/11 : `FlashBar`, `TestimonialsSection`, `TestimonialCard`.
- Contrôles : types OK, 34 tests OK, build OK (686 pages), `/`, `/blog`, `/quiz` en 200 en local, `/blog` vu à 390 px. Étiquette `sauvegarde-20261112-lint-vert` posée avant l'envoi.
- **Tout le monde peut de nouveau envoyer.** Le plan éditorial était déjà en ligne (la rédaction de nuit l'a emporté avec son article du 11/11).
- Reste pour **Dév** au prochain passage : D1a (images vides des cartes) et D1b (« Tests » dans le sous-titre du logo, l'accueil, l'OG…). Petit défaut vu à 390 px : barre de défilement grise sous les filtres de `/blog`.
- **Chef** : contrôler le site en ligne vers 1 h 15 (UTC) ; `DealsSection` et `Countdown` (fausse urgence) ne sont plus affichés mais restent dans le code : à supprimer en D1b.

## 12/11/2026, nuit (UTC) — Contenu QRT

- **C1 fait** : `tasks/plan-editorial.md` contient 60 sujets (hiver, dépannage, puis fin d'hiver et printemps), chacun avec une requête vérifiée par recherche web le 12/11, ses sources et les articles à lier. Tous les liens internes pointent vers des articles existants. 2 sujets écartés car déjà traités (batterie et station en hiver, dans `comment-hiverner-son-robot-tondeuse`).
- **Pas envoyé en ligne** : le lint échoue toujours (77 erreurs anciennes). Le plan est enregistré en local sur la branche en ligne. **La rédaction de nuit lit le plan sur GitHub** : tant que rien n'est envoyé, elle choisit seule son sujet. → **Dév**, D0 en priorité : l'envoi emportera aussi ce plan.
- **Honnêteté, plus large que prévu** : 76 articles (pas 22) contiennent « testé », « notre test », « sur mon terrain » ou proches : 118 passages. Certains sont peut-être légitimes (essai d'un organisme cité). → **Contenu**, C2 en 8 lots de 10, en commençant par les 8 articles « test-… » et les pages les plus vues.
- Trouvé : `hivernage-robot-tondeuse` n'a que 21 lignes et double `comment-hiverner-son-robot-tondeuse` (243 lignes). À fusionner plus tard (redirection), sans rien supprimer avant l'accord du Chef.
- **Croissance** : le sujet 18 du plan (calendrier de la pelouse mois par mois) doit reprendre tes sources G1 ; dis-moi l'adresse de la future page Calendrier pour que je pose les liens.

## 11/11/2026, 22 h (UTC) — Chef QRT

- Site en ligne vérifié à 390 px : accueil, `/husqvarna-automower-vs-mammotion-luba`,
  `/quel-robot-tondeuse-facile-a-utiliser-senior-guide-2026`, `/blog/husqvarna`. Tout répond (200). Rien à annuler.
- Trouvé 1 : images cassées sur les cartes d'articles (76 articles ont `featureImage: ""`). → **Dév**, étape D1a.
- Trouvé 2 : l'accueil et le menu disent encore « On a testé », « 30+ modèles testés », « +1 200 tests » ;
  22 articles racontent un essai vécu. → **Dév** D1b (gabarits), **Contenu** C2 et C3 (articles).
- Le plan éditorial est vide : la rédaction de nuit n'a pas de sujet. → **Contenu**, étape C1 en premier.
- **Croissance** : commencer par les sources du calendrier (G1). L'envoi d'e-mails attend le DNS.
- **Rien envoyé en ligne** : le lint échoue (77 erreurs anciennes, dont 65 dans les maquettes `content/*.jsx`).
  Types et build passent. Mes 2 fichiers sont enregistrés en local sur la branche en ligne. → **Dév**, étape D0
  en tout premier : réparer le lint, puis envoyer (l'envoi emportera aussi ce passage).
- Tableau de `tasks/equipe.md` réécrit avec une étape par agent ; liste du propriétaire complétée (3 points ajoutés).

## 11/11/2026 — mise en place (Claude, en session avec le propriétaire)

- Sauvegardes avant tout travail : étiquette `sauvegarde-avant-equipe-20261111-2144` sur GitHub, et copies
  complètes (historique, sources, version en ligne) dans `/home/administrator/backups/robot-tondeuse/`.
- Déjà fait aujourd'hui : fausse vente flash, bandeau « Vu dans » et faux avis retirés ; vraies photos
  (catalogue Fnac) sur 22 fiches robots, affichées dans les cartes produits des articles.
- Équipe créée : Chef, Dév, Contenu, Croissance. Rôles et règles dans `tasks/equipe.md`.
- À faire en premier : Chef découpe le plan ; Dév attaque le lot 0 ; Contenu écrit le plan éditorial.
