# Questions des acheteurs — stations électriques portables (étape 0, `tasks/usine-produits.md`)

Relevé du 28/11/2026 par l'agent Étude niches produits, avant toute page de la 2e niche. Même méthode que
`tasks/questions-acheteurs-robot-tondeuse.md`. Aucun message recopié, aucun pseudo : seulement la question, reformulée.

## Comment lire ce fichier

- **Fréquence approximative** : nombre de sources différentes, lues le 28/11, qui posent ou traitent la question.
  **Forte** = 5 sources ou plus · **moyenne** = 3 ou 4 · **faible** = 1 ou 2. Aucun volume de recherche mesuré (non vérifié).
- **Critère chiffré** : la donnée de la fiche officielle qui répond. Il n'existe pas encore de base `data/` pour cette niche :
  les noms de champs proposés sont entre crochets.
- Beaucoup de sources sont des blogs de marques (Anker SOLIX, Bluetti, Jackery, Oukitel). Elles montrent quelle question est posée,
  pas la bonne réponse : les chiffres de réponse viendront des fiches techniques.

- **Sources citées** : pages remontées par la recherche web sur la question, lues en extrait. Le détail n'a pas été lu page par page ;
  quand une source pose seulement la question sans y répondre, la réponse viendra des fiches officielles.

## Sources inaccessibles (à noter)

- **Reddit** (r/SolarDIY, r/preppers, r/vandwellers, r/homeautomation) : lecture directe refusée (erreur 403) et aucun fil remonté par
  la recherche. **Non vérifié.**
- **Questions-réponses Amazon.com et Amazon.fr** : non lues (lecture automatique d'Amazon refusée à l'agent).
- **« Autres questions posées » de Google** : non visibles depuis l'outil de recherche. **Non vérifié.**
- **Commentaires de vidéos** : non lus.
- **Forums français** : un fil Dealabs (frigo et capacité) et un article Neozone avec retours de lecteurs (van) remontés ; forums
  camping-car : aucun fil, seulement la boutique Camping-Car Plus.
- **Consumer Reports** : page payante, seul le titre est lisible.

**À refaire depuis un navigateur connecté** (Reddit, Amazon) avant de figer le radar. La liste ci-dessous suffit pour un premier jet.

## 30 questions des acheteurs français

| # | Question | Fréq. | Critère chiffré qui répond | Source (lue le 28/11/2026) |
|---|---|---|---|---|
| 1 | Combien de temps elle fait tourner mon frigo ou mon congélateur ? | forte | capacité en Wh [`capacite_wh`] ; puissance de crête en W [`crete_w`] | [Dealabs](https://www.dealabs.com/discussions/centrale-electrique-solaire-3367578), [TCS](https://www.tcs.ch/fr/le-tcs/presse/communiques-de-presse-2025/de-l-lectricit-partout-avec-vous-test-des-meilleures-stations-lectriques-portables.php) (1 000 Wh : frigo 43 h, congélateur 29 h, un cas), [Anker glacière](https://www.ankersolix.com/fr/blogs/kits-solaires/glaciere-solaire-et-alimentation-off-grid), [Daily Geek Show](https://dailygeekshow.com/coupure-de-courant-le-calcul-a-faire-avant-dacheter-une-station-electrique/), [Anker panne](https://www.ankersolix.com/fr/blogs/batterie-domestique/comment-alimenter-les-appareils-essentiels-pendant-une-panne) |
| 2 | Quelle capacité (Wh) choisir pour mon usage ? | forte | capacité [`capacite_wh`] | [Anker guide](https://www.ankersolix.com/fr/blogs/kits-solaires/stations-electriques-portables-le-guide-ultime), [Anker camping](https://www.ankersolix.com/fr/blogs/kits-solaires/comment-choisir-la-meilleure-station-energie-portable-pour-camping), [Tom's Guide FR](https://www.tomsguide.fr/stations-electriques-portables-comment-choisir-la-meilleure-batterie-pour-stocker-de-lenergie/), [Le Bon Roadtrip](https://www.lebonroadtrip.fr/article/quelle-est-la-meilleure-station-electrique-portable), [LeBonTri](https://lebontri.fr/blog/energie-eco-habitat/meilleure-station-electrique-portable) |
| 3 | En combien de temps la recharger au soleil, et avec quel panneau ? | forte | entrée solaire maxi en W [`solaire_w`] ; plage de tension en V [`solaire_v`] | Anker guide, Le Bon Roadtrip (River 2 Pro + 160 W : 4 à 6 h), [Neozone](https://www.neozone.org/innovation/vanlife-les-batteries-et-les-panneaux-solaires-portables-sont-ils-vraiment-indispensables/), [Anker énergie mobile](https://www.ankersolix.com/fr/blogs/kits-solaires/energie-mobile-panneau-solaire-station-energie-portable), [Korben](https://korben.info/test-poweroak-bluetti.html) |
| 4 | Peut-elle servir de secours pendant une coupure de courant ? | forte | capacité [`capacite_wh`] ; mode onduleur oui/non [`ups`] | Anker panne, [Anker coupure](https://www.ankersolix.com/fr/blogs/station-electrique-portable/batterie-de-secours-en-cas-de-coupure-de-courant), Daily Geek Show, TCS, LeBonTri |
| 5 | Station électrique ou groupe électrogène ? | moyenne | puissance continue [`continu_w`] ; bruit en dB [`bruit_db`] ; poids [`poids_kg`] | [Selectra](https://selectra.info/energie/actualites/marche/station-electrique-portable-ou-groupe-electrogene), [Anker comparatif](https://www.ankersolix.com/ca-fr/blogs/portable-power-stations/portable-generator-vs-solar-generator), [Selectra groupe](https://selectra.info/energie/actualites/marche/groupe-electrogene-choisir-securite-avant-achat) |
| 6 | Peut-elle alimenter une cafetière, une bouilloire, un sèche-cheveux ? | moyenne | puissance continue en W [`continu_w`] | Daily Geek Show (chauffage : environ 1 h), [Futura](https://www.futura-sciences.com/conso/guides-achat/guides-planete-top-stations-electriques-portables-solaires-source-energie-pratique-tout-lieu-210/), Tom's Guide FR |
| 7 | Garde-t-elle la box internet allumée sans coupure (bascule) ? | moyenne | temps de bascule en ms [`bascule_ms`] | [StorageReview](https://www.storagereview.com/fr/review/portable-power-stations-actually-work-pretty-well-as-a-ups) (près de 40 ms mesurés sur un modèle), [Selectra onduleur](https://selectra.info/energie/actualites/marche/onduleur-box-ordinateur-microcoupures), LeBonTri (< 10 ms annoncé Delta 3 Plus), [Selectra réseau mobile](https://selectra.info/telecom/actualites/marche/reseau-mobile-tombe-avec-electricite-autonomie-antennes) |
| 8 | Onduleur pur sinus : est-ce indispensable ? | moyenne | sortie pur sinus oui/non [`pur_sinus`] | Tom's Guide FR, Futura, [TechRadar FR](https://global.techradar.com/fr-fr/best/les-meilleures-stations-denergie-portables-de-2022) |
| 9 | Combien de temps dure la batterie (cycles), LiFePO4 ou pas ? | moyenne | chimie [`chimie`] ; cycles à 80 % [`cycles`] | Tom's Guide FR, LeBonTri, [Sitegeek AC180](https://www.sitegeek.fr/article-technologie/test-bluetti-ac180) |
| 10 | Quelle station pour le camping ou le van ? | forte | capacité, poids, prise 12 V [`capacite_wh`, `poids_kg`, `sortie_12v`] | Anker camping, [Anker nomade](https://www.ankersolix.com/fr/blogs/kits-solaires/stations-electriques-portables-batteries-nomades-pour-le-camping), Le Bon Roadtrip, Neozone, [Camping-Car Plus](https://www.camping-car-plus.com/high-tech-electricite/source-d-energie/stations-electriques-portables/), [Decathlon](https://www.decathlon.fr/vc/station-d-energie) |
| 11 | Peut-on ajouter une batterie pour augmenter la capacité ? | moyenne | capacité maxi avec extensions en Wh [`extension_max_wh`] | [Decathlon Delta Pro 3](https://www.decathlon.fr/p/mp/station-electrique-ecoflow-delta-pro-3-4096-wh-ideal-van-life-bivouac/4e872b43-d0cb-494e-a703-6517f3a3ad05/c251c1), LeBonTri, Tom's Guide FR |
| 12 | Peut-on la charger et s'en servir en même temps ? | faible | recharge traversante oui/non [`passthrough`] | Anker guide ; **non vérifié** sur forum |
| 13 | Combien de temps pour la recharger sur une prise ? | moyenne | temps 0–80 % sur secteur en min [`recharge_ac_min`] ; entrée AC en W | Anker guide, Le Bon Roadtrip, Korben |
| 14 | Combien pèse-t-elle, se transporte-t-elle d'une main ? | moyenne | poids en kg [`poids_kg`] | Le Bon Roadtrip, Camping-Car Plus, Decathlon |
| 15 | Combien de prises 230 V et USB-C ? | moyenne | nombre de prises AC [`prises_ac`], puissance USB-C maxi en W [`usbc_w`] | Futura, Tom's Guide FR, [Generation NT Vtoman](https://www.generation-nt.com/tests/vtoman-jump-2200-vs400-energie-test-2072142) |
| 16 | Peut-elle alimenter un chauffage d'appoint ? | faible | puissance continue [`continu_w`] + capacité | Daily Geek Show |
| 17 | Est-elle bruyante (ventilateur), peut-on dormir à côté ? | faible | bruit en dB [`bruit_db`] | Tom's Guide FR ; voir US n° 13 |
| 18 | Quelle marque choisir : EcoFlow, Jackery, Bluetti, Anker ? | forte | aucun chiffre seul (radar complet) | TCS (Bluetti AC180P en tête du test 2025), LeBonTri, Futura, [Meilleur Test](https://meilleurtest.fr/comparatif-generateur-portable/), [Moyens.net](https://www.moyens.net/guide-achat/5-meilleures-centrales-electriques-portables-pour-le-camping-et-lalimentation-de-secours/) |
| 19 | Peut-on la brancher sur l'installation de la maison ? | faible | sortie vers tableau / inverseur oui/non [`maison`] | Anker panne ; voir US n° 6 |
| 20 | Fonctionne-t-elle avec une glacière à compresseur ? | moyenne | sortie 12 V en A [`sortie_12v`], capacité | Anker glacière, Neozone, Le Bon Roadtrip |
| 21 | Panneau solaire pliant ou fixe, quelle puissance ? | moyenne | entrée solaire maxi [`solaire_w`] | Anker guide, Anker énergie mobile, Korben |
| 22 | Les entrées DC sont-elles fiables ? | faible | aucun chiffre (défaut relevé par un test) | TCS (2 modèles « non recommandé » pour leurs entrées CC) |
| 23 | Une petite station suffit-elle pour téléphone, ordinateur, lampe ? | moyenne | capacité 300–500 Wh [`capacite_wh`] | Anker camping, Anker guide, Futura |
| 24 | Peut-on la laisser branchée tout le temps ? | faible | mode stockage, charge maxi réglable (absent sur la plupart des fiches) | **non vérifié** ; voir US n° 18 |
| 25 | Dans une voiture : se recharge-t-elle sur l'allume-cigare ? | faible | entrée 12 V voiture en W [`entree_voiture_w`] | Le Bon Roadtrip, Camping-Car Plus |
| 26 | Quelle garantie ? | faible | garantie en années [`garantie_ans`] | LeBonTri, Decathlon |
| 27 | Une station de 3 000 W fait-elle tourner tout un atelier ou des outils ? | faible | puissance continue et crête [`continu_w`, `crete_w`] | [Anker 3 000 W](https://www.ankersolix.com/fr/blogs/kits-solaires/electrogene-3000w-guide-ultime-pour-autonomie-energetique) |
| 28 | Quelle différence de prix au kWh entre les modèles ? | faible | prix ÷ capacité en €/kWh (calcul) | LeBonTri (10 modèles, prix du 6/11/2026) |
| 29 | Peut-on la recharger avec un groupe électrogène ? | faible | entrée AC en W | Selectra, Anker comparatif |
| 30 | Se commande-t-elle depuis le téléphone ? | faible | application wifi/Bluetooth [`appli`] | [Castorama EcoFlow](https://www.castorama.fr/marques/ecoflow-dyn.cat), Generation NT Vtoman |

## 30 questions des acheteurs américains

| # | Question | Fréq. | Critère chiffré qui répond | Source (lue le 28/11/2026) |
|---|---|---|---|---|
| 1 | Will it run my refrigerator, and for how long? | forte | capacité [`capacite_wh`] ; crête [`crete_w`] (démarrage du compresseur) | [Anker frigo](https://www.ankersolix.com/blogs/portable-power-station/how-long-can-a-portable-power-station-run-a-refrigerator), [PowerOutage.us](https://poweroutage.us/home-battery-backup/how-long-power-station-run-refrigerator), [Bluetti frigo](https://www.bluettipower.com/blogs/power-solution/solar-power-for-refrigerator), [Cygnett](https://www.cygnett.com/blogs/tech-talk/portable-power-station-runtime), [PriusChat](https://priuschat.com/goto/post?id=3170716), [Jackery](https://www.jackery.com/blogs/emergency/how-to-keep-fridge-cold-without-power) |
| 2 | How many hours will it run X (CPAP, TV, laptop)? | forte | capacité [`capacite_wh`] (Wh ÷ W) | Cygnett, [Lowe's](https://www.lowes.com/n/buying-guide/how-does-a-portable-power-station-work), [This Old House](https://www.thisoldhouse.com/electrical/portable-power-stations), [Anker guide](https://www.ankersolix.com/blogs/portable-power-station/portable-power-station-buying-guide), [Norwall](https://norwall.com/power-expert/portable-power-stations-frequently-asked-questions/) |
| 3 | Can it back up my house during an outage? | forte | capacité, extension [`extension_max_wh`] ; kit maison [`maison`] | This Old House, [Consumer Reports](https://www.consumerreports.org/portable-power-stations/portable-power-stations-things-to-know-battery-inverter-generators), [Yahoo](https://www.yahoo.com/lifestyle/best-power-station-174016598.html), [AOL](https://www.aol.com/best-portable-power-stations-outages-205000713.html), [Duracell FAQ](https://powerstations.duracell.com/pages/faq) |
| 4 | Does it work as a UPS, how fast is the switchover? | moyenne | bascule [`bascule_ms`] ; mode onduleur [`ups`] | StorageReview, Duracell FAQ, [Choice](https://www.choice.com.au/outdoor/camping/equipment/buying-guides/portable-power-stations) |
| 5 | Power station or gas generator? | forte | continu [`continu_w`] ; bruit [`bruit_db`] | Consumer Reports, This Old House, [Anker vs](https://www.ankersolix.com/ca-fr/blogs/portable-power-station/portable-generator-vs-solar-generator), Lowe's, [The Manual](https://themanual.com/outdoors/how-to-choose-a-portable-power-station) |
| 6 | Do I need a transfer switch to power hardwired circuits? | moyenne | sortie 240 V / kit tableau [`maison`] | Consumer Reports, This Old House, [Oukitel](https://eu.oukitel.com/blogs/news/attribute-noise-and-thermal-management) |
| 7 | How long does it take to recharge (wall, solar, car)? | forte | recharge AC [`recharge_ac_min`] ; solaire [`solaire_w`] ; voiture [`entree_voiture_w`] | Norwall, Lowe's, Anker guide, Choice, [Anker usage](https://www.ankersolix.com/uk/blogs/power-station/how-to-use-portable-power-station) |
| 8 | What size solar panel do I need? | forte | solaire [`solaire_w`, `solaire_v`] | Anker guide, Bluetti frigo, [Anker solaire](https://www.ankersolix.com/blogs/solar/everything-you-need-to-know-about-a-portable-power-station), Norwall, Choice |
| 9 | LiFePO4 vs NMC: how many cycles, how many years? | moyenne | chimie [`chimie`] ; cycles [`cycles`] | [SlashGear entretien](https://www.slashgear.com/1893284/portable-power-station-care-lifespan/), Anker guide, [Oupes](https://oupes.com/a/blog/post/what-parameters-should-i-consider-when-purchasing-a-portable-power-station) |
| 10 | Surge vs running watts: will it start my compressor or power tool? | moyenne | crête et continu [`crete_w`, `continu_w`] | Anker frigo (crête de 3 000 à 3 400 W conseillée pour un frigo américain), Oupes, The Manual |
| 11 | Can I take it on a plane? | moyenne | capacité en Wh (limite 100 Wh, 101–160 Wh avec accord, > 160 Wh interdit) | [FAA](https://www.faa.gov/hazmat/packsafe/airline-passengers-and-batteries), [FAA PDF](https://www.faa.gov/sites/faa.gov/files/Power-Stations-landscape_0.pdf), [TSA](https://tsa.gov/travel/security-screening/whatcanibring/items/lithium-batteries-more-100-watt-hours), [Jackery avion](https://www.jackery.com/blogs/buying-advice/can-i-bring-jackery-on-a-plane-tsa-airline-rules-explained), [Anker avion](https://www.ankersolix.com/blogs/portable-power-station/are-portable-power-stations-allowed-on-planes) |
| 12 | Can I add expansion batteries? | moyenne | extension [`extension_max_wh`] | Consumer Reports, [GearJunkie](https://gearjunkie.com/technology/best-portable-power-stations), [OutdoorGearLab](https://www.outdoorgearlab.com/topics/camping-and-hiking/best-power-station) |
| 13 | How loud is the fan, can I sleep next to it? | moyenne | bruit en dB (et la charge mesurée) [`bruit_db`] | [Oukitel chambre](https://eu.oukitel.com/blogs/news/attribute-noise-levels-of-home-battery-systems-what-to-expect-and-how-to-minimiz), [Oukitel silencieux](https://eu.oukitel.com/blogs/news/attribute-super-quiet-portable-power-stations-what-to-look-for), [Bluetti silencieux](https://www.bluettipower.com/blogs/buying-guide/quiet-generator) |
| 14 | How heavy is it for the capacity? | moyenne | poids [`poids_kg`] ; Wh par kg (calcul) | GearJunkie, OutdoorGearLab, The Manual |
| 15 | Does it work in freezing cold / can I charge it below 0 °C? | faible | température de charge mini en °C [`charge_temp_min`] | **non vérifié** : aucune source lue ne répond ; question attendue (camping d'hiver) |
| 16 | Can I use it while charging (pass-through)? | faible | recharge traversante [`passthrough`] | Norwall (l'usage pendant la charge rallonge la recharge) |
| 17 | Which is best for camping / RV / van? | forte | capacité, poids, 12 V | GearJunkie, OutdoorGearLab, Choice, [Canadian Tire](https://canadiantire.ca/en/cat/outdoor-living/generators-accessories/portable-power-stations-DC0003070.html), The Manual |
| 18 | How should I store it, keep it plugged in or not? | moyenne | autodécharge, mode stockage (absent) | SlashGear entretien, [Fossibot FAQ](https://eu.fossibot.com/pages/general-questions-faq), Norwall |
| 19 | Is it safe indoors? | moyenne | aucun gaz d'échappement ; certification (UL, CE) [`certif`] | This Old House, Consumer Reports, [Bluetti AU FAQ](https://www.bluettipower.com.au/pages/faq) |
| 20 | Pure sine wave: does it matter for my laptop or CPAP? | faible | pur sinus [`pur_sinus`] | Norwall, Oupes |
| 21 | How many outlets, how much USB-C wattage? | moyenne | prises AC [`prises_ac`] ; USB-C [`usbc_w`] | Lowe's, Oupes, The Manual |
| 22 | EcoFlow vs Jackery vs Bluetti vs Anker? | forte | radar complet | GearJunkie, OutdoorGearLab, AOL, Yahoo, Consumer Reports |
| 23 | Is it worth it vs just a big power bank? | faible | capacité, sortie AC | The Manual, Anker usage |
| 24 | Can it run a space heater or AC unit? | faible | continu [`continu_w`] | This Old House, Consumer Reports |
| 25 | How long does it hold charge sitting unused? | faible | autodécharge par mois (absent) | SlashGear, Fossibot |
| 26 | Can I control it from an app? | faible | appli [`appli`] | GearJunkie, [Bob Vila Elite 200](https://bobvila.com/reviews/bluetti-elite-200-v2-review/) |
| 27 | What warranty, are replacement batteries available? | faible | garantie [`garantie_ans`] | Bluetti AU FAQ, Fossibot FAQ |
| 28 | Can I charge it from my car alternator while driving? | faible | entrée voiture [`entree_voiture_w`] | Canadian Tire, Anker usage |
| 29 | What does Wh vs Ah vs W mean? | moyenne | aucun (glossaire) | Norwall, Lowe's, [Aferiy FAQ](https://uk.aferiy.com/blogs/blog-center/the-ultimate-faq-for-portable-power-stations) |
| 30 | Can two units be linked for 240 V? | faible | mise en parallèle oui/non [`parallele`] | AOL (kit maison à 2 stations et boîtier double tension) |

## Ce qu'on en tire pour le site de la 2e niche

### Radar (6 axes, chacun noté par rang dans le catalogue comme `lib/radar.ts`)
1. **Capacité** (Wh) — questions n° 1, 2, 4 FR ; n° 1, 2, 3 US. La première de toutes.
2. **Puissance** (W continus ; la crête dans le tableau) — n° 6 FR ; n° 5, 10 US.
3. **Recharge solaire** (W d'entrée solaire) — n° 3, 21 FR ; n° 7, 8 US.
4. **Durée de vie** (cycles à 80 %, LFP) — n° 9 FR ; n° 9 US.
5. **Légèreté** (Wh par kg, inversé sur le poids) — n° 10, 14 FR ; n° 14, 17 US.
6. **Prix au kWh** (€ ÷ kWh, inversé) — n° 28 FR, et toutes les questions « laquelle choisir ».

Hors radar, dans le tableau : bascule (ms), bruit (dB), prises, USB-C, extension, garantie. Le bruit est peu publié et mesuré sans
conditions communes : pas un axe.

### Filtres et collections (critères éliminatoires)
Capacité (< 500 Wh, 500–1 000, 1 000–2 000, > 2 000 Wh) · LiFePO4 · mode onduleur (bascule ≤ 20 ms) · extensible · moins de X €
(500, 1 000, 1 500 €) · moins de 15 kg · pour camping-car (12 V + solaire ≥ 400 W) · pour coupure de courant · pour frigo.

### Calculateurs et jauges
- **« Combien d'heures pour mes appareils ? »** : liste d'appareils (frigo, box, CPAP, ordinateur…) avec leur puissance → heures par
  station, en tenant compte du rendement (taux publié par la marque, sinon « non publié »). Réponse aux questions n° 1, 2, 6, 16 FR.
- **« Quel panneau pour la recharger en X heures ? »** : entrée solaire et ensoleillement moyen de la région.
- **Jauge avion** : vert ≤ 100 Wh, orange 101–160 Wh, rouge au-delà (FAA ; règle française et compagnies à vérifier avant publication).

### FAQ (réponse chiffrée tirée des fiches)
Pur sinus, charge pendant l'usage, stockage, froid, avion, chauffage d'appoint, entrée voiture, garantie, Wh/Ah/W, groupe électrogène.

### Pièges à signaler (seulement avec source officielle)
Bascule onduleur annoncée parfois plus courte que mesurée (StorageReview : près de 40 ms sur un modèle) ; entrées DC défaillantes sur
2 modèles (TCS 2025) ; panneau trop puissant : la station limite l'entrée (Anker).
