# Étude niches produits : choix de la 2e niche de l'usine (28/11/2026)

> Demande du propriétaire du 28/11/2026, plan : `tasks/usine-produits.md`. Agent « Étude niches produits ».
> Méthode : 29 recherches web le 28/11/2026 (limite 30), 1 page officielle Amazon lue, WHOIS public pour les domaines.
> Rien n'a été acheté. Ce qui n'a pas été vu dans une source est écrit **« non vérifié »**.

## Ce qui n'a pas pu être vérifié, pour toutes les niches

- **Prix sur Amazon.fr et part des modèles à plus de 300 €** : l'agent ne peut pas lire Amazon.fr (API refusée à l'agent, pages
  de recherche non lisibles). Les prix ci-dessous viennent des marques ou d'autres enseignes, avec leur source. La part exacte
  à plus de 300 € **sur Amazon.fr** est donc **non vérifiée** pour les 7 niches. À relever par Claude en session avec l'API
  (`scripts/catalogue-asin.mjs` ou équivalent), 50 premiers résultats par niche.
- **Volumes de recherche** : non relevés (règle du propriétaire : le volume n'est pas un filtre).
- **Rang de chaque requête dans Google** : la recherche utilisée ne donne pas l'ordre exact de Google France. « Qui tient le haut »
  = qui revient en tête des résultats de la recherche faite, pas un classement Google vérifié.

## Taux Amazon.fr (page officielle, lue le 28/11/2026)

Source : « Taux de Rémunération Standard sur le Site FR d'Amazon »,
https://partenaires.amazon.fr/help/node/topic/GRXPHT8U84RAYDXZ (aucune date d'effet affichée, pied de page « © 1996-2025 »).

| Catégorie Amazon (texte de la page) | Taux |
|---|---|
| Automobile, Meubles, Maison, Bricolage, Cuisine & Arts de la table, Outils électriques et manuels… | 5,0 % |
| Beauté, Bagages, Appareils de soins personnels, **Sports & Fitness** | 4,0 % |
| **Gros électroménager**, Appareils Fire TV, Électronique mobile | 2,5 % |
| **Toutes les autres catégories** | 3,0 % |

La page ne dit pas dans quelle catégorie tombe chaque produit (station électrique, machine à café, robot aspirateur, vélo,
trottinette, spa). Le rattachement indiqué plus bas pour chaque niche est donc **non vérifié** ; il se lit dans le rapport de
commissions Amazon après les premières ventes.

---

## 1. Stations électriques portables (EcoFlow, Jackery, Bluetti, Anker SOLIX…)

**1. Prix.** Prix chez Decathlon pour EcoFlow : TRAIL 200 DC 149 €, RIVER 3 Plus 286 Wh 299 €, RIVER 3 Max Plus 858 Wh 549 €,
DELTA 3 Max 2 048 Wh 1 299 €, DELTA Pro 3 4 096 Wh 3 299 € (https://www.decathlon.fr/brands/ecoflow). DELTA 3 Classic : prix public
conseillé 599 € (communiqué EcoFlow,
https://www.prnewswire.com/fr/communiques-de-presse/ecoflow-lance-la-delta-3-classic--une-station-denergie-portable-haute-performance-sans-complexite-inutile-302712165.html).
Repère d'un guide : 300 à 600 Wh = 300 à 600 € (https://conseils.hellopro.fr/combien-coute-une-station-electrique-portable-4875.html).
Panier moyen annoncé par EcoFlow sur Awin : 1 000 € (https://ui.awin.com/merchant-profile/51799).
Sur 7 prix EcoFlow relevés, 5 dépassent 300 €. Part à plus de 300 € **sur Amazon.fr : non vérifiée**.

**2. Modèles et caractéristiques.** EcoFlow seul : 3 séries (TRAIL, RIVER, DELTA), au moins 8 modèles sur sa page française
(https://www.ecoflow.com/fr/series/power-solutions). Anker SOLIX : de la 521 (256 Wh) à la F2000 (2 048 Wh)
(https://ankersolix.com/fr/collections/portable-power-stations). Jackery (Explorer 300 Plus, 2000 V2…) et Bluetti (AC50P, Elite
300, Elite 400…) vendus chez Decathlon et MediaMarkt. Nombre total de modèles comparables : **non vérifié** (estimation prudente :
plus de 40 chez les 4 grandes marques, plus Allpowers, Vtoman, Dabbsson).
Caractéristiques chiffrées publiées sur les fiches : capacité (Wh), puissance continue et crête (W), chimie (LFP ou non), nombre
de cycles, poids (kg), entrée solaire (W), temps de recharge, extension de capacité (kWh), bruit (dB, ex. « 30 dB » DELTA Pro 3),
temps de bascule onduleur (ex. « 10 ms » Bluetti Elite 300). **Le meilleur jeu de chiffres des 7 niches pour le radar.**

**3. Longue traîne (20 recherches).**

| Recherche | Articles ? | Exemple | Qui tient le haut |
|---|---|---|---|
| station électrique pour camping-car | oui | https://www.ankersolix.com/fr/blogs/station-electrique-portable/batterie-externe-camping-car | marque (Anker) |
| station électrique pour congélateur | oui | https://www.tomsguide.fr/stations-electriques-portables-comment-choisir-la-meilleure-batterie-pour-stocker-de-lenergie/ | grand média (Tom's Guide, TCS) |
| station électrique pour coupure de courant | oui | https://dailygeekshow.com/coupure-de-courant-le-calcul-a-faire-avant-dacheter-une-station-electrique/ | grand média |
| station électrique pour le camping | oui | https://www.ankersolix.com/fr/blogs/station-electrique-portable/batterie-camping | marque |
| station électrique 2 000 W | oui | https://www.ecoflow.com/fr/blog/batterie-nomade | marque (EcoFlow) |
| station électrique ou groupe électrogène | oui | https://selectra.info/energie/actualites/marche/station-electrique-portable-ou-groupe-electrogene | comparateur d'énergie (Selectra) |
| station électrique avec panneau solaire | oui | https://www.futura-sciences.com/conso/guides-achat/guides-planete-top-stations-electriques-portables-solaires-source-energie-pratique-tout-lieu-210/ | grand média |
| station électrique avec panneau solaire moins de 1 000 € | oui | https://www.hellowatt.fr/panneaux-solaires-photovoltaiques/station-solaire | comparateur d'énergie, petits blogs solaires |
| station électrique rechargeable | oui | https://www.ankersolix.com/fr/blogs/station-electrique-portable/station-electrique-rechargeable | marque |
| meilleure station électrique portable | oui | https://lebontri.fr/blog/energie-eco-habitat/meilleure-station-electrique-portable | petit blog, grands médias |
| EcoFlow DELTA 2 Max ou DELTA 3 Max Plus | oui | https://www.ecoflow.com/fr/blog/ecoflow-delta-2-max-vs-delta-3-max | marque |
| station électrique pour van aménagé | oui | https://www.lebonroadtrip.fr/article/quelle-est-la-meilleure-station-electrique-portable | petit blog |
| station électrique LiFePO4 moins de 500 € | non vérifié | — | — |
| station électrique pour chauffage d'appoint | oui (sujet traité) | https://dailygeekshow.com/?p=1017348 | grand média |
| station électrique avec onduleur (UPS) pour box internet | non vérifié | — | — |
| station électrique silencieuse pour la chambre | non vérifié | — | — |
| station électrique pour réfrigérateur | oui (repères par usage) | https://www.ankersolix.com/fr/blogs/station-electrique-portable/station-electrique-rechargeable | marque |
| station électrique légère moins de 10 kg | non vérifié | — | — |
| station électrique extensible 5 kWh | oui (fiche) | https://lebontri.fr/blog/energie-eco-habitat/meilleure-station-electrique-portable | petit blog |
| station électrique pour chantier | oui (repères) | https://www.ankersolix.com/fr/blogs/station-electrique-portable/station-electrique-rechargeable | marque |

Lecture : 16 recherches sur 20 ont des articles (4 non vérifiées). **Les marques tiennent une grande partie du haut** (Anker,
EcoFlow) : leurs articles ne comparent que leurs propres modèles. Place nette pour un comparateur toutes marques.

**4. Argent.**
- Amazon.fr : catégorie **non vérifiée** (« Toutes les autres catégories » 3 % ou « Bricolage » 5 %, page ci-dessus).
- **EcoFlow FR (Awin)** : 5 %, cookie 7 jours, panier moyen 1 000 € (https://ui.awin.com/merchant-profile-terms/51799 ;
  https://eu.ecoflow.com/pages/affiliate-program « au moins 5 % »). Aussi EcoFlow EU chez Tradedoubler, 5 %
  (https://directory.tradedoubler.com/fr/programs/361331-EcoFlow-EU).
- **Bluetti FR (Awin)** : cookie 30 jours, « jusqu'à 10 % » pour les bons affiliés (https://ui.awin.com/merchant-profile/59181 ;
  https://bluettipower.eu/pages/affiliate-program). Taux de départ français : **non vérifié** (4 % cité sur un autre réseau).
- **Jackery** : « au moins 5 % » (https://www.jackery.com/pages/affiliate-program), programme français : **non vérifié**
  (Awin seulement Royaume-Uni et États-Unis trouvés).
- Anker SOLIX : **non vérifié**. Boulanger « jusqu'à 7 % » toutes catégories (https://www.boulanger.com/info/corporate/afiliation.htm).

**5. Concurrence.** Aucun comparateur toutes marques avec filtres trouvé
(recherche « comparateur toutes les stations électriques portables tableau Wh W cycles prix »). Le plus proche : le tableau de
LeBonTri (10 modèles, 288 Wh à 4 kWh, prix du 6/11) ; ailleurs des listes de 4 à 10 modèles (Futura, Meilleurtest, TechRadar)
et les blogs des marques. **Faiblesse commune** : peu de modèles, pas de filtres, cycles souvent absents, et articles de marque
qui ne citent jamais un concurrent.

**6. Saison et risques.** Deux pics probables (non vérifiés en volume) : été (camping, van) et hiver (coupures, chauffage).
Black Friday très fort (prix barrés partout : notre règle du plus bas des 30 jours sera utile). Risques : batteries lithium,
rappel Santé Canada de l'EcoFlow Delta Max 2000 pour risque de brûlure et d'incendie
(https://recalls-rappels.canada.ca/fr/avis-rappel/stations-alimentation-portatives-ecoflow-delta-max-2000-rappelees-en-raison-risques) ;
aucune fiche RappelConso trouvée (non vérifié en direct). Gammes renouvelées chaque année (RIVER 2 → RIVER 3, DELTA 2 → DELTA 3).
Promesses d'autonomie à recouper (une résistance de chauffage tire 1 000 à 2 500 W).

**7. Domaines (WHOIS public, 28/11/2026, rien acheté).**
| Domaine | État |
|---|---|
| quelle-station-electrique.com | semble libre |
| quelle-station-electrique.fr | pris |
| quelle-station-energie.fr / .com | semblent libres |
| quel-generateur-solaire.fr / .com | semblent libres |
| quelle-batterie-nomade.com | semble libre (.fr pris) |
| quelle-power-station.fr / .com | semblent libres |

---

## 2. Machines à café à grain

**1. Prix.** Info.fr : « à partir de 419 € sur Amazon » (https://info.fr/comparateurs/machine-a-cafe-a-grains/) ; De'Longhi
Magnifica S entre 200 et 400 € selon le vendeur (même page) ; Magnifica Evo avec carafe « souvent inférieur à 300 € »
(https://labomaison.com/cuisine/cafetiere-expresso-broyeur/quelle-machine-a-cafe-a-grains-choisir-a-moins-de-400-euros) ;
« dès 112 € » chez Graindexpert (https://graindexpert.fr/comparatifs/machine-cafe-grain-pas-cher) ; Coolblue jusqu'à 639 €
et plus. Panier moyen De'Longhi sur Awin : plus de 200 € (https://ui.awin.com/merchant-profile/22916).
Part à plus de 300 € sur Amazon.fr : **non vérifiée** (probablement la moitié environ, à mesurer).

**2. Modèles et caractéristiques.** Comparateur Test-Achats dédié aux automatiques à grain
(https://www.test-achats.be/electromenager/machines-expresso/comparateur/caracteristique/automatique-a-grain) ; Info.fr compare
20 modèles ; Futura 12. Marques : De'Longhi, Philips, Krups, Siemens, Melitta, Jura, Sage, Saeco. Nombre total : **non vérifié**.
Chiffres publiés : pression (bar), réglages de mouture (ex. « 5 positions » Krups), réservoir d'eau (L), bac à grains (g),
nombre de boissons, système lait (carafe, LatteGo, buse), puissance (W), dimensions, bruit (rarement). Bon radar, moins riche que
les stations.

**3. Longue traîne (20 recherches).**

| Recherche | Articles ? | Exemple | Qui tient le haut |
|---|---|---|---|
| machine à café à grain moins de 400 € | oui | https://labomaison.com/cuisine/cafetiere-expresso-broyeur/meilleures-machines-cafe-grains-choisir-moins-400-euros | média spécialisé (Labo Maison) |
| machine à café à grain pas chère | oui | https://graindexpert.fr/comparatifs/machine-cafe-grain-pas-cher | petit site spécialisé |
| machine à café à grain moins de 200 € | oui | https://www.futura-sciences.com/conso/bons-plans/guides-maison-trouver-machine-cafe-grains-moins-200-2284/ | grand média |
| machine à café à grain avec mousseur à lait moins de 500 € | oui | https://graindexpert.fr/tests/philips-5400 | petit site spécialisé, enseignes |
| machine à café à grain avec broyeur | oui | https://www.futura-sciences.com/maison/comparatifs/meilleure-machine-a-cafe-avec-broyeur-comparatif/ | grand média |
| meilleure machine à café à grain | oui | https://www.quechoisir.org/comparatif-cafetiere-a-expresso-avec-broyeur-a-grains-n829/top/ | association (Que Choisir), grands médias |
| bien choisir son expresso broyeur | oui | https://leclaireur.fnac.com/article/cp48527-guide-dachat-bien-choisir-son-expresso-broyeur-a-cafe/ | enseigne (Fnac) |
| machine à café à grain pour faire des économies | oui | https://www.test-achats.be/electromenager/machines-expresso/news/meilleure-machine-expresso-belgique | association (Test-Achats) |
| machine à café à grain De'Longhi ou Philips | non vérifié | — | — |
| machine à café à grain silencieuse | non vérifié | — | — |
| machine à café à grain pour le bureau | non vérifié | — | — |
| machine à café à grain avec application | non vérifié | — | — |
| machine à café à grain compacte pour petite cuisine | non vérifié | — | — |
| machine à café à grain deux tasses en même temps | non vérifié | — | — |
| machine à café à grain avec carafe à lait | oui (fiches) | https://labomaison.com/cuisine/cafetiere-expresso-broyeur/quelle-machine-a-cafe-a-grains-choisir-a-moins-de-400-euros | média spécialisé |
| machine à café à grain facile à détartrer | non vérifié | — | — |
| machine à café à grain pour café filtre (long) | non vérifié | — | — |
| machine à café à grain bons plans | oui | https://www.dealabs.com/discussions/machine-a-cafe-a-grain-3333282 | site de bons plans |
| machine à café à grain Krups ou Siemens | non vérifié | — | — |
| machine à café à grain durée de vie | oui (sujet traité, 7 à 10 ans) | https://leclaireur.fnac.com/article/cp48527-guide-dachat-bien-choisir-son-expresso-broyeur-a-cafe/ | enseigne |

Lecture : 11 sur 20 vérifiées avec articles, 9 non vérifiées. Haut des résultats tenu par Que Choisir, Test-Achats, Futura,
Labo Maison et un site spécialisé (Graindexpert).

**4. Argent.** Amazon.fr : « Cuisine & Arts de la table » 5 % si la machine y est rangée, **non vérifié**.
**De'Longhi FR (Awin)** : 6 % sur les ventes au prix plein, cookie 15 jours, rien sur certains lancements
(https://ui.awin.com/merchant-profile-terms/22916). Boulanger « jusqu'à 7 % » (lien plus haut). Darty : Effinity selon sa page
(https://www.darty.com/services/partenaires/affiliation), taux **non vérifié**. Philips, Krups, Jura, Sage : **non vérifié**.

**5. Concurrence.** Forte : Que Choisir et Test-Achats (essais en laboratoire, comparateur filtrable payant en partie), Les
Numériques (**non vérifié** dans cette étude), Info.fr (20 modèles), Graindexpert (site dédié). **Faiblesse** : Que Choisir et
Test-Achats sont derrière un abonnement ; les autres ne listent que 10 à 20 modèles.

**6. Saison et risques.** Pics probables Black Friday et Noël (non vérifié en volume). Faible risque produit (pas de batterie,
pas de norme routière). Gammes stables (une machine dure 7 à 10 ans d'après la Fnac). Aucun lien avec le jardin ni avec QRT.

**7. Domaines.** quelle-machine-a-cafe.com semble libre (.fr pris) ; quelle-machine-cafe-grain.fr / .com semblent libres ;
quel-expresso-broyeur.fr / .com semblent libres.

---

## 3. Robots aspirateurs laveurs

**1. Prix.** « de 100 € à plus de 1 500 € » (Que Choisir, https://www.quechoisir.org/comparatif-aspirateur-robot-n387/).
Ecovacs T90 Pro Omni ~549 € (Clubic, https://www.clubic.com/image-et-son/article-851110-1-meilleur-aspirateur-robot-comparatif.html) ;
Dreame L10s Ultra Gen 3 499 €, Lubluelu L20 Max moins de 114 €, Roborock QV 35A ~350 € sur Amazon (avril 2026), Mova P50 Pro Ultra
~485 € sur Amazon (relevés de Futura et d'autres sites, lien :
https://www.futura-sciences.com/conso/guides-achat/guides-entretien-sols-meilleurs-robot-aspirateurs-laveurs-station-vidage-automatique-770/).
Part à plus de 300 € sur Amazon.fr : **non vérifiée**.

**2. Modèles et caractéristiques.** Très nombreux (Dreame, Roborock, Ecovacs, Mova, Narwal, iRobot, Eufy, Xiaomi, Lubluelu…),
nombre total **non vérifié**. Chiffres publiés : aspiration (Pa, ex. 25 000 Pa), autonomie (min), réservoirs (mL), hauteur (cm),
franchissement (cm), lavage de la serpillière à l'eau chaude (°C, ex. 80 °C Roborock), bruit (dB). Très bon radar.
**Mêmes marques que QRT** (Dreame, Ecovacs, Mova, Roborock, Segway Navimow chez Segway) : pages marques et contacts réutilisables.

**3. Longue traîne (20 recherches).**

| Recherche | Articles ? | Exemple | Qui tient le haut |
|---|---|---|---|
| robot aspirateur pour poils d'animaux | oui | https://meilleurtest.fr/comparatif/robot-aspirateur-pour-poils-danimaux/ | comparateur éditorial (Meilleurtest), enseigne (Coolblue) |
| robot aspirateur laveur avec station de vidage automatique | oui | https://www.futura-sciences.com/conso/guides-achat/guides-entretien-sols-meilleurs-robot-aspirateurs-laveurs-station-vidage-automatique-770/ | grand média |
| robot aspirateur laveur moins de 400 € | oui | https://www.futura-sciences.com/conso/bons-plans/guides-entretien-sols-cet-aspirateur-robot-laveur-ecovacs-passe-sous-barre-400-avant-noel-8726/ | grand média |
| robot aspirateur avec station moins de 350 € | oui | https://www.futura-sciences.com/conso/bons-plans/guides-entretien-sols-cet-aspirateur-robot-station-automatique-simplifie-menage-moins-350-9764/ | grand média |
| robot aspirateur pas cher | oui | https://www.futura-sciences.com/conso/guides-achat/guides-entretien-sols-robots-aspirateurs-pas-chers-modele-acheter-2024-156/ | grand média |
| robot aspirateur pour parquet | oui | https://meilleurtest.fr/comparatif-robot-aspirateur-pour-parquet/ | comparateur éditorial |
| robot aspirateur haut de gamme | oui | https://maniaques.fr/meilleurs-aspirateurs-robots-haut-de-gamme/ | petit blog |
| robot laveur de sol | oui | https://meilleurtest.fr/comparatif/robot-aspirateur-laveur-de-sol/ | comparateur éditorial |
| meilleur aspirateur robot laveur iRobot | oui | https://info.fr/comparateurs/aspirateur-laveur-robot/marque/irobot/ | comparateur éditorial |
| meilleur robot aspirateur laveur | oui | https://www.clubic.com/image-et-son/article-851110-1-meilleur-aspirateur-robot-comparatif.html | grand média, site dédié |
| robot aspirateur pour allergiques (filtre HEPA) | oui (sujet traité) | https://www.test-achats.be/electromenager/aspirateurs/comment-choisir | association |
| robot aspirateur pour tapis épais | non vérifié | — | — |
| robot aspirateur pour escaliers / étages | non vérifié | — | — |
| robot aspirateur avec lavage à l'eau chaude | oui (sujet traité) | https://mac4ever.com/193745 | média tech |
| robot aspirateur silencieux | non vérifié | — | — |
| robot aspirateur pour grande maison 150 m² | non vérifié | — | — |
| robot aspirateur sans application / sans Wi-Fi | non vérifié | — | — |
| robot aspirateur avec bras articulé (chaussettes, câbles) | non vérifié | — | — |
| Dreame ou Roborock | non vérifié | — | — |
| robot aspirateur bas pour passer sous le canapé | non vérifié | — | — |

Lecture : 13 sur 20 vérifiées avec articles. Haut tenu par Futura, Clubic, Meilleurtest et un site dédié
(meilleur-robot-aspirateur-laveur.fr).

**4. Argent.** Amazon.fr : catégorie **non vérifiée** (« Maison » 5 % ou « Toutes les autres » 3 %).
Dreame : « au moins 6 % » (page mondiale, https://www.dreametech.com/pages/affiliate-program), programme France **non vérifié**.
Roborock : 4 à 8 % (page Royaume-Uni, https://uk.roborock.com/pages/roborock-affiliate-partnerprogramme), un programme Roborock FR
existe chez FlexOffers (https://www.flexoffers.com/affiliate-programs/roborock-fr-affiliate-program/), taux **non vérifié**.
Narwal FR sur Awin, cookie 30 jours, taux **non vérifié**. Ecovacs France : parrainage client seulement
(https://www.ecovacs.com/fr/ecovacs-club/referral). Eufy : programme français (https://www.eufy.com/eu-fr/affiliate), taux
**non vérifié**.

**5. Concurrence.** **Forte** : Clubic a un comparateur filtrable de tous les modèles essayés par la rédaction
(https://www.clubic.com/robot-vacuum/comparatif/) ; Les Numériques (**non vérifié** dans cette étude) ; Que Choisir ; un site
dédié meilleur-robot-aspirateur-laveur.fr. **Faiblesse** : Clubic ne compare que les modèles qu'il a essayés (pas tout le
catalogue) ; les autres sont des listes.

**6. Saison et risques.** Pics probables Black Friday, Prime Day, Noël (non vérifié). **Gammes renouvelées plusieurs fois par an**
(beaucoup de fiches à tenir). Batteries lithium (risque faible). Prix barrés très fréquents. Aucun obstacle légal.

**7. Domaines.** quel-robot-aspirateur.fr / .com semblent libres ; quel-robot-laveur.fr / .com semblent libres ;
quel-aspirateur-robot.com semble libre (.fr pris).

---

## 4. Vélos électriques

**1. Prix.** Guides « moins de 1 000 € » nombreux (Cleanrider, Futura, Tom's Guide), donc le cœur du marché est au-dessus.
ENGWE P20 999 € (https://www.generation-nt.com/tests/test-engwe-p20-velo-electrique-avis-2050534). Decathlon : 3 757 articles
« vélos électriques » (https://www.decathlon.fr/tous-les-sports/velo-cyclisme/velos-electriques). Presque tout dépasse 300 € ;
part sur Amazon.fr **non vérifiée**, et **les grandes marques (Bosch, Shimano sur vélo de marque) passent surtout par les
vélocistes, peu par Amazon** (constat non chiffré).

**2. Modèles et caractéristiques.** Très nombreux. Chiffres publiés : couple (Nm, ex. 65 Nm), batterie (Wh, ex. 702 Wh), moteur
(central ou roue), poids (kg), charge maximale (kg), autonomie annoncée (km), taille des roues. Bon radar, mais **la taille du
cadre et l'essai en magasin pèsent lourd** dans la décision.

**3. Longue traîne (20 recherches).**

| Recherche | Articles ? | Exemple | Qui tient le haut |
|---|---|---|---|
| vélo électrique moins de 1 000 € | oui | https://www.cleanrider.com/actus/guide-achat-velos-electriques-pas-chers/ | média spécialisé (Cleanrider), revendeur (Upway) |
| vélo électrique pliant moins de 1 000 € | oui | https://meilleurtest.fr/comparatif-velo-electrique-a-moins-de-1000-euros/ | comparateur éditorial |
| vélo électrique pas cher | oui | https://meilleurtest.fr/comparatif-velo-electrique-pas-cher/ | comparateur éditorial |
| vélo électrique pliant | oui (catalogue) | https://www.decathlon.fr/C-854154-velos-pliants-electriques | enseigne |
| meilleur vélo électrique | oui | https://www.futura-sciences.com/conso/comparatifs/meilleur-velo-electrique-comparatif/ | grand média |
| vélo électrique moteur central moins de 1 500 € | oui (fiche) | https://meilleurtest.fr/comparatif-velo-electrique/ | comparateur éditorial |
| vélo électrique pas cher sélection Tom's Guide | oui | https://www.tomsguide.fr/meilleur-velo-electrique-pas-cher-notre-selection-des-vae-a-moins-de-1000-euros/ | grand média |
| choisir son vélo électrique (moteur, batterie) | oui | https://www.alltricks.fr/surl/choix_velo_electrique | enseigne |
| vélo électrique femme | oui (catalogue) | https://www.decathlon.fr/tous-les-sports/velo-cyclisme/velos-electriques/f-gender_femme?from=320 | enseigne |
| vélo électrique pour 120 kg | non vérifié | — | — |
| vélo électrique pour monter les côtes | non vérifié | — | — |
| vélo électrique longue autonomie 100 km | non vérifié | — | — |
| vélo cargo électrique pour enfants | non vérifié | — | — |
| vélo électrique pour aller au travail 20 km | non vérifié | — | — |
| VTT électrique moins de 2 000 € | non vérifié | — | — |
| vélo électrique fat bike | oui (fiche) | https://www.decathlon.fr/p/mp/swan-fat-blanche-18x-3-0-autonomie-70-km-fourche-avec-suspension/4e37dace-7094-4c93-9622-108a9cc747fb/c4 | enseigne |
| vélo électrique reconditionné | non vérifié | — | — |
| vélo électrique bons plans | oui | https://www.dealabs.com/groupe/velos-electriques-commentes | site de bons plans |
| vélo électrique léger moins de 20 kg | non vérifié | — | — |
| vélo électrique avec aide de l'État | non vérifié | — | — |

Lecture : 12 sur 20 vérifiées avec articles. Haut tenu par Cleanrider, Futura, Meilleurtest, Decathlon.

**4. Argent.** Amazon.fr : « Sports & Fitness » 4 % si les vélos y sont rangés, **non vérifié**. Decathlon France : programme chez
Rakuten Advertising, taux non publié (https://www.decathlon.fr/affiliation_lp-PBUQMW). Upway : programme propre, taux non publié
(https://upway.co/pages/creators-and-affiliates). Taux publiés en France : **aucun trouvé**.

**5. Concurrence.** Cleanrider (média dédié à la mobilité électrique, comparatifs et guides) ; Meilleurtest (pages critère par
critère). Pas de comparateur à filtres trouvé. **Faiblesse** : pas de filtre toutes marques ; mais le visiteur achète souvent
en magasin.

**6. Saison et risques.** Printemps et été (non vérifié). Norme EN 15194, 25 km/h et 250 W au plus, marquage CE (Decathlon,
page catalogue ci-dessus). Débridage interdit. Batteries. Faible présence des grandes marques sur Amazon : **mauvais départ
pour un catalogue « Amazon d'abord »**.

**7. Domaines.** quel-velo-electrique.com semble libre (.fr pris) ; quel-vae.fr / .com semblent libres ;
quel-velo-assistance.fr / .com semblent libres.

---

## 5. Trottinettes électriques

**1. Prix.** Sélections « moins de 500 € » et « pas chère » nombreuses
(https://meilleurtest.fr/comparatif-trottinette-electrique-a-moins-de-500-euros/) ; Segway ZT3 Pro 680 € chez Decathlon Belgique
(https://www.decathlon.be/fr/deals/promo-trottinettes-electriques?type=opeco) ; Dualtron Forever Ultra 1 290 € chez Wee-Bot
(https://www.wee-bot.com/collections/trottinette-electrique-120-kg). Part à plus de 300 € sur Amazon.fr : **non vérifiée**
(beaucoup de modèles sous 500 €).

**2. Modèles et caractéristiques.** Nombreux (Segway-Ninebot, Xiaomi, Navee, iScooter, Dualtron, Kaabo, E-Twow…), nombre
**non vérifié**. Chiffres publiés : autonomie (km), poids (kg, ex. 19,5 kg G30D II), charge maximale (kg), puissance (W), vitesse
(km/h), taille des pneus, suspension, IP. Bon radar.

**3. Longue traîne (20 recherches).** Meilleurtest a une page pour presque chaque critère (relevé du 28/11) :

| Recherche | Articles ? | Exemple | Qui tient le haut |
|---|---|---|---|
| trottinette électrique autonomie | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-autonomie/ | comparateur éditorial |
| trottinette électrique puissante | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-puissante/ | comparateur éditorial |
| trottinette électrique pour enfant | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-pour-enfant/ | comparateur éditorial |
| trottinette électrique 120 kg | oui | https://meilleurtest.fr/comparatif-trottinette-120-150/ | comparateur éditorial, revendeur (Wee-Bot) |
| trottinette électrique moins de 500 € | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-a-moins-de-500-euros/ | comparateur éditorial |
| trottinette électrique avec selle | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-avec-selle/ | comparateur éditorial |
| trottinette électrique à gros pneus | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-a-gros-pneus/ | comparateur éditorial |
| trottinette électrique pas chère | oui | https://meilleurtest.fr/comparatif-trottinette-electrique-pas-chere/ | comparateur éditorial |
| trottinette électrique rapport qualité-prix | oui | https://meilleurtest.fr/comparatif-trottinettes-electriques-rapport-qualite-prix/ | comparateur éditorial |
| trottinette électrique pour adulte | oui | https://meilleurtest.fr/comparatif-trottinettes-electriques-pour-adulte/ | comparateur éditorial |
| trottinette électrique avec suspension | oui (catalogue) | https://www.wee-bot.com/collections/trottinette-electrique-avec-suspension?page=2 | revendeur |
| trottinette électrique pour personne corpulente | oui | https://www.market.com/fr/sports/trottinettes-electriques/pour-personnes-corpulentes/ | comparateur commercial |
| meilleure trottinette électrique | oui | https://www.futura-sciences.com/conso/comparatifs/meilleurs-trottinettes-electriques-comparatif/ | grand média |
| top 5 trottinettes électriques | oui | https://leclaireur.fnac.com/selection/cp70593-trottinettes-electriques-le-top-5-des-meilleurs-modeles-a-acheter-en-2026/ | enseigne (Fnac) |
| trottinette électrique réglementation | oui | https://www.economie.gouv.fr/dgccrf/trottinettes-electriques-les-conseils-pour-un-achat-et-une-utilisation-en-toute-securite | État (DGCCRF), assureurs |
| trottinette électrique pliable légère moins de 15 kg | non vérifié | — | — |
| trottinette électrique étanche pour la pluie | non vérifié | — | — |
| trottinette électrique pour monter les côtes | non vérifié | — | — |
| trottinette électrique Xiaomi ou Ninebot | non vérifié | — | — |
| trottinette électrique pour le train (pliable) | non vérifié | — | — |

Lecture : 15 sur 20 vérifiées avec articles. **Meilleurtest tient déjà presque toutes les pages critère.**

**4. Argent.** Amazon.fr : catégorie **non vérifiée** (« Sports & Fitness » 4 % probable). **iScooter FR (Awin)** : 3 % par
défaut, plus pour les gros paniers (profil Awin vu dans la recherche ; adresse exacte du profil **non vérifiée**). Navee France sur Awin, taux **non vérifié**. Segway-Ninebot et Xiaomi : programme France **non trouvé**.

**5. Concurrence.** Meilleurtest (plus de 10 pages critère), Futura, enseignes. **Faiblesse** : listes courtes, pas de filtres,
pas de lien avec la réglementation par modèle (mode > 25 km/h = interdit sur la route).

**6. Saison et risques.** Printemps et rentrée (non vérifié). **Risque juridique le plus fort des 7 niches** : 25 km/h par
construction, un mode plus rapide rend l'engin interdit sur la voie publique, débridage puni (jusqu'à 1 500 €), assurance
obligatoire, publicité « bridé / débridé » trompeuse (DGCCRF, lien ci-dessus ; Allianz,
https://www.allianz.fr/assurance-particulier/vehicules/assurance-2-roues/conseils-pratiques/code-route-trottinette-electrique.html).
Proposition de loi pour durcir les amendes (statut **non vérifié**). Batteries (incendies). Beaucoup de modèles vendus sur Amazon
dépassent 25 km/h : tri obligatoire.

**7. Domaines.** quelle-trottinette.com et quelle-trottinette-electrique.com semblent libres (les deux .fr sont pris).

---

## 6. Piste trouvée : spas gonflables

**1. Prix.** Guide « moins de 400 € » chez Futura
(https://www.futura-sciences.com/conso/guides-achat/guides-piscine-spa-meilleurs-spa-gonflables-moins-400-1489/) : beaucoup de
modèles autour de 300 à 400 €. Part à plus de 300 € sur Amazon.fr : **non vérifiée**.
**2. Modèles et caractéristiques.** Intex, Bestway (Lay-Z-Spa), Arebos… Chiffres : places, nombre de jets (ex. 120 jets Intex Sahara),
volume (L), chauffage (°C), antigel (ex. > 6 °C Bestway Bahamas). Radar maigre (peu de chiffres comparables).
**3. Longue traîne (10 recherches étudiées sur 20, les autres non vérifiées).** 4 places (oui, Futura,
https://www.futura-sciences.com/conso/guides-achat/guides-piscine-spa-sont-meilleurs-spa-gonflable-4-places-1493/, grand média) ;
6 places (oui, https://meilleurtest.fr/comparatif-spa-gonflable-6-places/) ; 2 places (oui,
https://meilleurtest.fr/comparatif-spas-gonflable-2-places/) ; moins de 400 € (oui, Futura) ; pas cher (oui,
https://meilleurtest.fr/comparatif-spa-pas-cher/) ; extérieur (oui, https://meilleurtest.fr/comparatif-spa-exterieur/) ;
pour l'hiver (oui, sujet traité par Futura) ; comment choisir (oui, https://www.guide-piscine.fr/spa-gonflable/, site spécialisé) ;
meilleur spa gonflable (oui, https://www.guide-piscine.fr/guide-d-achat/spa/comparatif-spa-gonflable-quel-est-le-meilleur-spa-annee-5390_A) ;
sur Amazon (oui, https://bonsplansmania.fr/article/selection-meilleurs-spas-gonflables-amazon-printemps-2026, petit blog).
**4. Argent.** Amazon.fr : catégorie **non vérifiée**. Programmes Intex, Bestway : **non vérifié**.
**5. Concurrence.** Guide-Piscine (site dédié), Meilleurtest, Futura. Faiblesse : listes, pas de filtres.
**6. Saison et risques.** Très saisonnier (printemps-été). Consommation électrique du chauffage, fuites. Peu de risque légal.
**Plutôt une rubrique de QRT** (à côté de la piscine) qu'un nouveau site.
**7. Domaines.** quel-spa.fr / .com et quel-spa-gonflable.fr / .com semblent libres.

## 7. Piste trouvée : tapis de course

**1. Prix.** Citysports WP9 192 €, Zipro Forma 249 €, Domyos RUN500 599,99 €, NordicTrack T Series 7 849 € (relevés été 2026,
https://www.sport-passion.fr/comparatifs/tapis-de-course-en-promotion.php et pages Decathlon). Part à plus de 300 € sur
Amazon.fr : **non vérifiée**.
**2. Modèles et caractéristiques.** Domyos, NordicTrack, Reebok, Moovyoo, Cecotec, Zipro… Chiffres : vitesse (km/h), pente (%),
puissance (CV ou W), charge maximale (kg, ex. 140 kg Reebok Jet 300), poids (kg, ex. 87 kg), surface de course, pliage. Bon radar.
**3. Longue traîne (6 recherches vues, le reste non vérifié).** Pliable (oui, https://meilleurtest.fr/comparatif-tapis-de-course-pliable/) ;
compact (oui, sport-passion.fr) ; pour appartement (oui, https://fflose.com/meilleur-tapis-course-pliable, petit blog) ;
moins de 2 000 € (oui, https://www.nordictrack.com/fr/blog/meilleurs-tapis-de-course-moins-de-2000, marque) ; meilleur tapis de
course (oui, https://www.alltricks.fr/blog/article/comparatif-meilleur-tapis-course, enseigne) ; tapis de marche (oui, fiches
Decathlon).
**4. Argent.** Amazon.fr : « Sports & Fitness » 4 % probable, **non vérifié**. Programmes des marques : **non vérifié**.
**5. Concurrence.** Decathlon domine (marque Domyos et place de marché), Meilleurtest, Futura. Faiblesse : pas de filtres.
**6. Saison et risques.** Pic de janvier probable (bonnes résolutions, non vérifié). Objets lourds (livraison), peu de risque légal.
**7. Domaines.** quel-tapis-course.fr / .com et quel-tapis-de-course.com semblent libres (quel-tapis-de-course.fr pris).

---

## Tableau de synthèse (notes de l'agent, sur 5 ; 5 = le plus favorable)

Notes = jugement de l'agent à partir des sources ci-dessus, pas une mesure. « Concurrence » et « Risque » : 5 = faibles.

| Niche | Panier (> 300 €) | Commissions publiées | Chiffres pour le radar | Longue traîne avec articles | Concurrence | Risque | Lien avec QRT | **Total /35** |
|---|---|---|---|---|---|---|---|---|
| **Stations électriques portables** | 5 | 4 (EcoFlow 5 %, Bluetti ≤ 10 %) | 5 | 4 (16/20) | 4 | 3 | 4 (solaire, jardin, batteries) | **29** |
| Robots aspirateurs laveurs | 4 | 3 (Dreame, Roborock hors France) | 5 | 4 (13/20) | 2 | 3 | 5 (mêmes marques) | **26** |
| Machines à café à grain | 3 | 4 (De'Longhi 6 %) | 4 | 3 (11/20) | 2 | 5 | 1 | **22** |
| Vélos électriques | 5 | 1 (aucun taux publié) | 4 | 3 (12/20) | 3 | 2 | 2 | **20** |
| Spas gonflables | 3 | 1 (non vérifié) | 2 | 3 (10 vues) | 3 | 4 | 4 | **20** |
| Tapis de course | 3 | 1 (non vérifié) | 4 | 2 (6 vues) | 3 | 4 | 1 | **18** |
| Trottinettes électriques | 2 | 2 (iScooter 3 %) | 4 | 5 (15/20) | 2 | 1 | 2 | **18** |

## Verdict

1. **Niche recommandée : les stations électriques portables**, domaine **quelle-station-electrique.com** (semble libre, .fr pris).
2. Panier élevé (5 des 7 prix EcoFlow relevés dépassent 300 €, panier moyen EcoFlow sur Awin 1 000 €) et programmes français ouverts avec un taux publié : EcoFlow 5 %, Bluetti jusqu'à 10 %.
3. Fiches officielles riches en chiffres (Wh, W, cycles, LFP, poids, solaire, dB) : collections et radar se font comme pour les robots, avec le même code.
4. Aucun comparateur toutes marques trouvé : le haut des résultats est tenu par les blogs des marques (Anker, EcoFlow), qui ne comparent que leurs propres modèles.
5. Risques à cadrer : batteries (rappel EcoFlow Delta Max 2000 au Canada), gammes renouvelées chaque année, prix barrés du Black Friday. 2e choix : robots aspirateurs laveurs (mêmes marques que QRT, mais Clubic et Les Numériques sont déjà forts).

## Suite (pour Claude en session et le propriétaire)

- Claude en session : relever sur Amazon.fr (API) les 50 premiers résultats « station électrique portable » : prix, part à plus
  de 300 €, accessoires écartés. Même relevé pour les robots aspirateurs laveurs (2e choix).
- Propriétaire : décider du domaine (rien n'a été acheté ; WHOIS du 28/11, à revérifier le jour de l'achat).
- Avant de lancer : vérifier la catégorie Amazon d'une station électrique (rapport de commissions) et s'inscrire à EcoFlow FR et
  Bluetti FR sur Awin (le compte Awin de QRT existe déjà).
