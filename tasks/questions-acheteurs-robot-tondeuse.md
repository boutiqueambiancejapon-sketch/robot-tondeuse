# Questions des acheteurs — robots tondeuses (étape 0, `tasks/usine-produits.md`)

Relevé du 28/11/2026 par l'agent Étude niches produits. 15 recherches web pour les deux niches (robots tondeuses et stations électriques).
Aucun message recopié, aucun pseudo : seulement la question, reformulée.

## Comment lire ce fichier

- **Fréquence approximative** : nombre de sources différentes, lues le 28/11, qui posent ou traitent la question.
  **Forte** = 5 sources ou plus · **moyenne** = 3 ou 4 · **faible** = 1 ou 2. Ce n'est pas un volume de recherche :
  aucun volume n'a été mesuré (non vérifié).
- **Critère chiffré** : la donnée de la fiche officielle qui répond. Le nom de champ entre crochets est celui de `data/robots-tondeuses.json`
  (190 modèles) ; « absent » = le champ n'existe pas encore dans la base.
- **Date** : date de lecture (28/11/2026). La date de publication de la page n'est indiquée que lorsqu'elle était visible.

- **Sources citées** : pages remontées par la recherche web sur la question, lues en extrait. Le détail n'a pas été lu page par page ;
  quand une source pose seulement la question sans y répondre, la réponse viendra des fiches officielles.

## Sources inaccessibles (à noter)

- **Reddit** (r/RoboticLawnmowers, r/lawncare, r/homeautomation, r/automower) : lecture directe refusée (erreur 403), et le moteur de
  recherche ne renvoie presque aucun fil Reddit. Seuls 3 titres de r/RoboticLawnmowers ont été vus (via un miroir), tous sur
  « quel robot sans câble pour mon terrain (surface, pente) ». **Non vérifié** pour le reste.
- **Questions-réponses Amazon.com et Amazon.fr** : non lues. Lecture automatique des pages Amazon refusée à l'agent.
- **« Autres questions posées » de Google** : non visibles depuis l'outil de recherche. Les questions marquées « PAA » ci-dessous ont la forme
  exacte d'une question en titre de page (fabricants, guides), ce qui laisse penser qu'elles y figurent, sans preuve. **Non vérifié.**
- **Commentaires de vidéos** : non lus (YouTube ne se lit pas sans navigateur).
- **Forums français** : ForumConstruire lu en résultat de recherche (1 fil sur l'avis et le vol). Jardinage.net, Futura forum : aucun fil
  remonté. Une question sans réponse vue sur une fiche Leroy Merlin (largeur de couloir).

Conséquence : la liste US s'appuie surtout sur les guides et FAQ en anglais (Which?, Tom's Guide, Reviewed, Consumer NZ, Choice,
Husqvarna US, Gardena AU, Worx, Bosch, tractorbynet), pas sur Reddit. **À refaire depuis un navigateur connecté** (Claude en session
ou propriétaire) pour Reddit et les questions-réponses Amazon.

## 30 questions des acheteurs français

| # | Question | Fréq. | Critère chiffré qui répond | Source (lue le 28/11/2026) |
|---|---|---|---|---|
| 1 | Quel robot pour ma surface (500, 1 000, 1 500 m²…) ? | forte | surface maxi en m² [`surface_m2`] | [Boulanger](https://www.boulanger.com/aide/guide/choisir-robot-tondeuse), [Que Choisir comparatif](https://www.quechoisir.org/comparatif-tondeuse-robot-n443/), [Futura 1 000 m²](https://www.futura-sciences.com/conso/guides-achat/guides-jardin-tondeuse-choisir-terrain-pelouse-1000-m2-553/), Bricomarché, ManoMano |
| 2 | Est-ce qu'il monte ma pente ? | forte | pente maxi en % [`pente_pct`] | [Gardena pentes](https://gardena.com/be-fr/c/assistance/planification-conseils/tondeuse-robot/information/tondeuse-robot-et-pentes), [Husqvarna pentes](https://www.husqvarna.com/fr/support/husqvarna-self-service/optimisez-l-installation-de-votre-automower-sur-les-pentes-raides-ka-01431/), [Ecovacs](https://www.ecovacs.com/fr/blog/robot-tondeuse-pour-pente), [Eufy](https://www.eufy.com/eu-fr/blogs/lawn-mower/best-robot-mower-for-hills), [ManoMano pente 45](https://manomano.fr/cat/tondeuse+robot+pente+45) |
| 3 | Faut-il encore poser un câble périphérique ? | forte | guidage : fil / RTK / LiDAR / vision [`guidage`, `sans_fil`] | [Ecovacs RTK ou LiDAR](https://www.ecovacs.com/fr/blog/robot-tondeuse-lidar-vs-rtk), [Electro Dépôt](https://www.electrodepot.fr/conseils/rtk-robot-tondeuse), [Presse-citron](https://www.presse-citron.net/comment-bien-choisir-un-robot-tondeuse-en-2026-notre-guide-dachat-complet/), [Que Choisir guide](https://www.quechoisir.org/guide-d-achat-tondeuse-robot-n25188/), Eufy |
| 4 | Est-ce qu'il coupe le long des bordures, ou faut-il repasser le coupe-bordure ? | forte | distance de coupe au bord en cm, mode bordure oui/non (absent) | [Ecovacs bordures](https://www.ecovacs.com/fr/blog/robot-tondeuse-pour-bordure), [Husqvarna FAQ](https://www.husqvarna.com/fr/apprendre-et-decouvrir/questions-fr%C3%A9quemment-pos%C3%A9es-robots-tondeuses/), [Que Choisir comparatif bordures](https://www.quechoisir.org/comparatif-coupe-bordures-n165908/top/), Eufy inconvénients |
| 5 | Le RTK marche-t-il sous les arbres ou près de la maison ? | forte | guidage combiné (RTK + vision ou LiDAR) [`guidage`] ; correction par réseau (NetRTK) oui/non (absent) | [Husqvarna EPOS signal](https://www.husqvarna.com/fr/support/husqvarna-self-service/pourquoi-l-automower-s-arrete-t-il-sans-cesse-problemes-de-signal-epos-sans-cable-ka-70353/), [Mammotion signal RTK](https://fr.mammotion.com/blogs/news/can-luba-get-well-rtk-signal-in-my-lawn), [Meilleure Innovation](https://meilleure-innovation.com/maison/robot-tondeuse/robot-tondeuse-sans-fil-sous-arbres-technologie-navigation/), Ecovacs, Eufy |
| 6 | Peut-il tondre sous la pluie ? Rentre-t-il seul ? | forte | indice IP [`ip`] ; capteur de pluie oui/non (absent) | [Eufy pluie](https://www.eufy.com/eu-fr/blogs/lawn-mower/robot-lawn-mower-in-the-rain), [Ecovacs pelouse humide](https://www.ecovacs.com/fr/blog/peut-on-tondre-une-pelouse-humide), [Gardena 8 erreurs](https://www.gardena.com/fr/c/discover/gardening/magazine/8-erreurs-a-eviter-avec-une-tondeuse-robot), Husqvarna saisons |
| 7 | Est-il dangereux pour les hérissons ? Peut-on l'empêcher de tondre la nuit ? | forte | plage horaire réglable, mode faune (absent) ; hauteur de coupe mini en mm [`hauteur_coupe_mm`] | [Que Choisir 5 conseils](https://www.quechoisir.org/conseils-jardinage-5-conseils-pour-choisir-une-tondeuse-robot-n174278/), [Husqvarna sécurité](https://www.husqvarna.com/be-fr/apprendre-et-decouvrir/salle-de-presse/qa-about-robotic-mower-safety/), [Boulanger entretien](https://www.boulanger.com/aide/guide/entretenir-robot-tondeuse), Que Choisir guide |
| 8 | Combien de temps dure la batterie, et combien coûte une neuve ? | forte | durée de vie annoncée (cycles), prix de la batterie (absents) ; autonomie en min [`autonomie_min`] | [Husqvarna batterie](https://www.husqvarna.com/fr/assistance/husqvarna-self-service/batterie-de-l-automower-signes-de-vieillissement-et-comment-maximiser-sa-duree-de-vie-ka-01420/), [Ecovacs durée de vie](https://www.ecovacs.com/fr/blog/duree-de-vie-robot-tondeuse), [Eufy batterie](https://www.eufy.com/eu-fr/blogs/lawn-mower/how-long-do-lawn-mower-batteries-last), [HelloSafe](https://hellosafe.fr/blog/duree-vie-robot-tondeuse) |
| 9 | Est-ce qu'il fait du bruit ? Les voisins vont-ils l'entendre ? | moyenne | bruit en dB(A) [`bruit_db`] | [Que Choisir protocole](https://www.quechoisir.org/comment-nous-testons-tondeuses-a-gazon-robots-le-protocole-n14921/), [Que Choisir glossaire](https://www.quechoisir.org/glossaire-tondeuse-a-gazon-glossaire-n15951), Boulanger |
| 10 | Peut-on me le voler ? Quelle protection ? | moyenne | 4G et localisation [`connectivite`, `option_4g`] ; alarme et code PIN (absents) | [ForumConstruire](https://www.forumconstruire.com/construire/topic-459531-voudrais-avis-robots-tondeuse.php), Which?, Lawn Love (voir US) |
| 11 | Mon jardin a plusieurs zones séparées : comment fait-il ? | moyenne | nombre de zones [`zones_max`] ; chemins de transport oui/non (absent) | [Husqvarna zones](https://www.husqvarna.com/fr/assistance/husqvarna-self-service/comment-creer-des-zones-de-travail-des-zones-d-exclusion-et-des-chemins-de-transport-a-l-aide-de-la--ka-70385/), [Que Choisir guide](https://www.quechoisir.org/guide-d-achat-tondeuse-robot-n25188/), [Hornbach](https://www.hornbach.ch/projets/meilleure-tondeuse-robot-pour-ton-gazon/) |
| 12 | Quelle largeur minimale pour un passage ou un couloir ? | moyenne | largeur de passage mini en cm (absent ; 60 cm à 2 m selon marque et pose) | [Husqvarna couloir](https://www.husqvarna.com/fr/assistance/husqvarna-self-service/comment-regler-la-largeur-de-couloir-dans-une-installation-automower-ka-01717/), [Husqvarna passage](https://www.husqvarna.com/fr/support/husqvarna-self-service/comment-creer-un-passage-dans-une-installation-a-cable-peripherique-automower-ka-01710/), [Gardena FAQ](https://www.gardena.com/be-fr/service/service-tondeuse-robotique/faq/), question sans réponse sur une fiche [Leroy Merlin](https://www.leroymerlin.fr/produits/robot-tondeuse-sans-fil-800-m2-rtk-vision-cartographie-evitement-des-obstacles-pentes-30-controle-via-app-sunseeker-s3-79737093.html) |
| 13 | Quelle marge prendre sur la surface annoncée ? | moyenne | surface maxi [`surface_m2`] ÷ surface réelle (règle +20 à 30 % vue dans un guide US) | [Futura comparatif](https://www.futura-sciences.com/maison/comparatifs/meilleur-robot-tondeuse-comparatif/), Lawn Love (US) |
| 14 | Robot ou tondeuse classique : est-ce rentable ? | moyenne | prix [`prix_eur`] ; coût sur 5 ans (lames, batterie : absent) | [Eufy inconvénients](https://www.eufy.com/eu-fr/blogs/lawn-mower/robotic-lawnmower-disadvantages), Que Choisir guide (prix de 400 à 3 000 €) |
| 15 | Combien de temps pour recharger ? | moyenne | temps de charge en min (absent ; Gardena : 60 à 75 min) | [Gardena 8 erreurs](https://www.gardena.com/fr/c/discover/gardening/magazine/8-erreurs-a-eviter-avec-une-tondeuse-robot), Husqvarna saisons |
| 16 | Comment l'hiverner, faut-il le rentrer ? | moyenne | aucun chiffre (stockage batterie chargée, hors gel) | [Gardena hivernage](https://gardena.com/be-fr/c/assistance/planification-conseils/tondeuse-robot/entretien/hivernage-robots-tondeuses), [Selectra remisage](https://selectra.info/energie/actualites/marche/robot-tondeuse-remisage-fin-saison), Husqvarna saisons |
| 17 | Passe-t-il sur un terrain bosselé ou des racines ? | moyenne | 4 roues motrices [`transmission`] ; franchissement en cm (absent) | Gardena pentes, Eufy pentes, [Leroy Merlin Kärcher RCX 4](https://www.leroymerlin.fr/produits/robot-tondeuse-karcher-rcx-4-sans-fil-peripherique-1500-m2-4-roues-motrices-gps-rtk-camera-ia-98992102.html) |
| 18 | Évite-t-il les obstacles (jouets, crottes, tuyau) ? | moyenne | détection : caméra / LiDAR / ultrasons / choc [`guidage`] | Ecovacs RTK ou LiDAR, [Generation NT Sunseeker](https://www.generation-nt.com/tests/test-sunseeker-elite-x5-robot-tondeuse-2059273), Eufy |
| 19 | Quelle hauteur de coupe, et se règle-t-elle depuis l'application ? | moyenne | hauteur mini–maxi en mm [`hauteur_coupe_mm`] ; réglage électrique oui/non (absent) | [Leroy Merlin Worx](https://www.leroymerlin.fr/produits/robot-tondeuse-connecte-worx-landroid-plus-jusqu-a-800m2-wr148e-82888480.html), Boulanger, Que Choisir protocole |
| 20 | Faut-il ramasser l'herbe ? (mulching) | moyenne | aucun chiffre (tous les robots broient) ; fréquence de tonte | Que Choisir guide, Boulanger, Husqvarna FAQ |
| 21 | Où placer la station de charge ? | faible | dégagement devant la base en m (absent) | Husqvarna FAQ, Gardena FAQ |
| 22 | L'installation est-elle difficile, faut-il un installateur ? | moyenne | temps de pose, service de pose payant (absent) | Que Choisir guide, Which? (US), Gardena pentes |
| 23 | Le câble se coupe : comment le réparer ? | faible | aucun chiffre (prix du kit de réparation, absent) | [Husqvarna pas de signal boucle](https://www.husqvarna.com/be-fr/assistance/husqvarna-self-service/pas-de-signal-boucle-sur-l-automower-causes-et-solutions-ka-01417/) |
| 24 | Wifi, Bluetooth ou 4G : qu'est-ce qu'il me faut ? | moyenne | connectivité [`connectivite`] ; abonnement 4G (prix et durée offerte, absent) | Husqvarna EPOS, Ecovacs, Kärcher RCX 4 |
| 25 | Faut-il un abonnement pour la 4G ou le RTK ? | faible | durée de 4G offerte en années, prix ensuite (absent) | Husqvarna US (voir US n° 17) ; **non vérifié** pour les marques chinoises |
| 26 | Quel est le poids, peut-on le porter d'une zone à l'autre ? | faible | poids en kg [`poids_kg`] | Que Choisir guide (transport à la main), Husqvarna zones |
| 27 | Quelle durée de vie pour le robot lui-même ? | moyenne | garantie en années (absent) | [Ecovacs durée de vie](https://www.ecovacs.com/fr/blog/duree-de-vie-robot-tondeuse), [HelloSafe](https://hellosafe.fr/blog/duree-vie-robot-tondeuse), Eufy |
| 28 | Combien coûtent les lames et à quelle fréquence les changer ? | faible | prix d'un jeu de lames, durée conseillée (absents) | Gardena (3 lames à changer ensemble), Reviewed (US) |
| 29 | Est-il sûr avec des enfants ou des animaux ? | faible | capteur de levage et d'inclinaison, arrêt des lames en s (absents) | Husqvarna sécurité, [Que Choisir brève sécurité](https://www.quechoisir.org/breve-tondeuse-robot-installation-performances-de-coupe-securite-seuls-nos-tests-en-laboratoire-revelent-les-vraies-performances-n175306/) |
| 30 | Coupe-t-il l'herbe haute (après vacances, première tonte) ? | faible | hauteur de coupe maxi en mm [`hauteur_coupe_mm`] | Que Choisir glossaire ; Homeserve et Reviewed (US) |

## 30 questions des acheteurs américains

| # | Question | Fréq. | Critère chiffré qui répond | Source (lue le 28/11/2026) |
|---|---|---|---|---|
| 1 | Which wire-free mower for my lot (¼ acre, ½ acre, 1 acre +)? | forte | surface maxi (m², à convertir en acres) [`surface_m2`] ; prix [`prix_eur`] | r/RoboticLawnmowers (3 titres vus via [miroir](https://reddit.sudovanilla.org/r/RoboticLawnmowers)), [tractorbynet](https://www.tractorbynet.com/forums/threads/robot-mowers.564096/post-7132888), [Tom's Guide](https://www.tomsguide.com/home/lawn-care/i-love-my-robot-lawn-mower-and-early-black-friday-sales-will-make-buying-yours-more-affordable), [Lawn Love](https://lawnlove.com/blog/best-robotic-lawn-mowers/) |
| 2 | Is it actually worth the money? | forte | prix [`prix_eur`] ; coût annuel (absent) | [Digital Trends](https://www.digitaltrends.com/home/is-a-lawn-mower-robot-worth-it/), [Homes & Gardens](https://www.homesandgardens.com/gardens/is-it-ever-worth-buying-a-robot-lawn-mower), [Expert Reviews](https://www.expertreviews.co.uk/home-garden/lawn-mowers/are-robot-lawn-mowers-worth-it), [Worx](https://www.worx.com/blog/do-robotic-mowers-work/), [Fast Company](https://www.fastcompany.com/91557465/i-tried-out-a-robot-lawn-mower-it-didnt-go-as-planned), [Top Ten Reviews](https://www.toptenreviews.com/should-i-buy-a-robot-lawn-mower) |
| 3 | Can it handle my slope / hills? | forte | pente maxi en % [`pente_pct`] ; 4 roues motrices [`transmission`] | Lawn Love, [Pura Vida (pentes)](https://www.puravidabybrandt.com/?p=124665), [Argos](https://www.argos.co.uk/features/robot-lawn-mower-buying-guide), r/RoboticLawnmowers (Yuka 1500, 45 %), Digital Trends |
| 4 | RTK, vision or lidar: which works with trees and shade? | forte | guidage [`guidage`] | Lawn Love, tractorbynet, [Mammotion UK](https://uk.mammotion.com/blogs/news/robot-lawn-mower-guide), [Tom's Guide 5 ans](https://www.tomsguide.com/uk/home/lawn-care/ive-been-reviewing-robot-lawnmowers-for-half-a-decade-here-are-five-things-you-should-know-before-buying-one-yourself), [Lymow review](https://www.gadgetreview.com/lymow-one-plus-robotic-lawn-mower-review) |
| 5 | How much edging will I still have to do? | forte | distance de coupe au bord (absent) | Lawn Love, [Which? un mois](https://www.which.co.uk/news/article/i-used-a-robot-lawnmower-for-a-month-heres-what-surprised-me-an8u70B5D4f3), [Gardenista](https://www.gardenista.com/posts/robotic-lawn-mowers-worth), Homes & Gardens, Gardena AU |
| 6 | Can it mow in the rain / is it waterproof? | forte | indice IP [`ip`] ; capteur de pluie (absent) | [Anker](https://www.anker.com/uk/blogs/lawn-mower/are-robot-lawn-mowers-waterproof), [T3](https://www.t3.com/home-living/garden/are-robot-lawn-mowers-actually-waterproof-and-where-should-they-be-stored), [Eufy](https://www.eufy.com/uk/blogs/lawn-mower/are-robot-lawn-mowers-waterproof), [Eufy herbe mouillée](https://www.eufy.com/au/blogs/lawn-mower/robot-lawn-mower-wet-grass), Husqvarna US |
| 7 | Will someone steal it? Anti-theft? | moyenne | 4G, GPS [`connectivite`] ; alarme, PIN (absents) | [Which? 5 questions](https://www.which.co.uk/news/article/five-questions-you-should-ask-before-buying-a-robot-lawn-mower-aQx1D3B2pdBb), [Lawn Love](https://lawnlove.com/blog/what-is-a-robot-mower/), Husqvarna US |
| 8 | How long does the battery last, can I replace it, what does it cost? | forte | autonomie [`autonomie_min`] ; batterie remplaçable, prix (absents) | Which? 5 questions (batterie souvent > 100 £), [Husqvarna UK](https://www.husqvarna.com/uk/learn-and-discover/robotic-mower-faq/), Eufy entretien, Lawn Love |
| 9 | Do I still need to install a boundary wire? | forte | guidage, sans fil [`sans_fil`] | Which? 5 questions, tractorbynet, Lawn Love, r/RoboticLawnmowers, [Choice](https://choice.com.au/outdoor/gardening/lawnmowers-and-trimmers/buying-guides/robot-lawnmowers) |
| 10 | Can it handle tall or thick grass? | moyenne | hauteur de coupe maxi [`hauteur_coupe_mm`] | [Homeserve](https://www.homeserve.com/blog/cost-guide/robot-lawn-mower), [Reviewed](https://reviewed.com/home-outdoors/features/what-to-know-about-robot-lawn-mowers), Husqvarna US, Worx |
| 11 | How many zones / can it go from front yard to back yard? | moyenne | zones [`zones_max`] ; chemins de transport (absent) | r/RoboticLawnmowers (jardins complexes), Husqvarna US, [Bosch Indego FAQ](https://www.bosch-diy.com/ie/en/landing/robotic-lawnmowers/indego-faq) |
| 12 | How narrow a passage can it go through? | moyenne | largeur de passage mini (absent) | Gardena AU (1,5 m sans câble guide), Husqvarna (60 cm avec câble guide), Gardena FAQ |
| 13 | What size of mower: how much margin over my lawn area? | moyenne | surface maxi [`surface_m2`] (+20 à 30 %) | Lawn Love, [Coolblue](https://coolblue.nl/en/advice/choose-robot-lawn-mower.html) (surface = batterie + logiciel + largeur de coupe) |
| 14 | How long do blades last and how much are they? | moyenne | prix des lames (absent ; Reviewed : 20 à 50 $) | Reviewed, Gardena AU, Husqvarna US, Eufy entretien |
| 15 | Does it work at night / wildlife safety? | faible | plage horaire, capteurs (absents) | Husqvarna sécurité ; **non vérifié** sur Reddit |
| 16 | How noisy is it? | moyenne | bruit dB(A) [`bruit_db`] | [Consumer NZ](https://www.consumer.org.nz/products/robot-lawn-mowers/robot-lawn-mowers/guide), Which? méthode, Digital Trends |
| 17 | Are there subscription fees (app, 4G, RTK network)? | faible | abonnement en €/an, durée offerte (absent) | Husqvarna US (inclus pour l'EPOS), Reviewed (mises à jour gratuites) ; **non vérifié** pour les autres marques |
| 18 | Does it need an RTK base station, where to put it? | moyenne | antenne fournie oui/non, NetRTK (absent) | Mammotion signal RTK, Lawn Love, Lymow review |
| 19 | How does it handle obstacles, kids' toys, dog poop? | moyenne | type de détection [`guidage`] | Tom's Guide 5 ans, Lymow review (titres vus, détail non lu) |
| 20 | Wire vs wire-free: which is more reliable under heavy trees? | moyenne | guidage [`guidage`] | Lawn Love (fil encore conseillé en jardin très ombragé), tractorbynet |
| 21 | Will it cut a lawn with roots, bumps, holes? | faible | 4 roues motrices [`transmission`] | Husqvarna US (l'ondulation du terrain réduit l'autonomie) |
| 22 | How long to set up and map the yard? | moyenne | temps de cartographie (absent) | Fast Company (« de la patience pour la mise en route ») |
| 23 | Can I control it from my phone / Alexa / Google / Home Assistant? | faible | connectivité [`connectivite`] ; assistants vocaux (absent) | [Tom's Guide maison connectée](https://www.tomsguide.com/home/smart-home/robot-lawn-mowers-the-next-big-frontier-for-smart-homes) ; r/homeautomation **non lu** |
| 24 | Will it work on uneven, sloped edges near a ditch or pool? | faible | pente maxi au bord (absent) | Husqvarna pentes (FR), Pura Vida |
| 25 | Does it cut in stripes like a pro lawn? | faible | motif de tonte (absent) | **non vérifié** : question attendue sur Reddit, aucune source lue |
| 26 | How heavy is it, can I carry it? | faible | poids [`poids_kg`] | **non vérifié** : aucune source lue ne la pose |
| 27 | What happens when GPS signal drops? | moyenne | guidage combiné [`guidage`] | Husqvarna EPOS (FR), Mammotion, Lymow review |
| 28 | How long does the mower itself last, warranty? | moyenne | garantie (absent) | [Global News](https://globalnews.ca/the-curator/11863562/is-a-robot-lawn-mower-worth-it-everything-you-need-to-know-before-you-buy/) (titre vu, détail non lu) ; Husqvarna US (2 à 5 ans pour la batterie) |
| 29 | Does the app need internet / work without wifi? | faible | Bluetooth seul possible [`connectivite`] | Bosch Indego FAQ, [Worx support](https://www.worx.com/landroid-support) |
| 30 | Robot vs paying a lawn service? | faible | prix [`prix_eur`] | Worx (rentable en 1 an face à un service payant, selon la marque), Global News |

## Comparaison avec le radar et les filtres de QRT

**Radar actuel** (`lib/radar.ts`, 6 axes) : surface, pente, silence, autonomie, connexion et antivol, prix.
**Filtres actuels** (`lib/gabarits.ts` → `FACETTES_ROBOTS`, 4 filtres) : pente ≥ 45 %, sans câble, 4G antivol, moins de 1 000 €.
**Familles prévues** (`tasks/collections-v1.md` § 2) : surface, pente, guidage, 4 roues motrices, 4G/antivol, silencieux, budget, marque, usage.
**Base** : 190 modèles le 28/11 ; champs remplis : `surface_m2` 190, `pente_pct` 189, `largeur_coupe_cm` 182, `hauteur_coupe_mm` 171,
`poids_kg` 162, `connectivite` 159, `prix_eur` 156, `ip` 151, `bruit_db` 138, `autonomie_min` 95, `transmission` 69, `zones_max` 67.

### Ce qui colle (garder)
- **Surface, pente, prix** : questions n° 1, 2 et 14 (FR) et n° 1, 2, 3 (US). Les trois premières questions des deux pays. Bien vu.
- **Guidage** (dans les filtres, pas dans le radar) : n° 3 et 5 FR, n° 4, 9, 20 US. C'est la question n° 3 des deux côtés.
- **Silence** : question moyenne (n° 9 FR, n° 16 US). Utile, mais moins demandée que le guidage ou les bordures.
- **Antivol / 4G** : question moyenne (n° 10 FR, n° 7 US). Garder comme filtre.

### Ce qui manque
1. **Guidage sur le radar** : c'est la 3e question des deux pays, et elle n'est pas un axe. Proposition : remplacer « Connexion et antivol » par
   **« Navigation »** (fil 0, un repère 1, deux repères ou plus 2 ; la même logique que `navigationDe` dans `lib/note-objective.ts`),
   et garder la 4G comme filtre. 190 modèles sur 190 ont la donnée.
2. **Bordures** : 4e question en France, 5e aux États-Unis, et **aucun champ** dans la base. À ajouter : `bord_cm` (distance de coupe au bord,
   publiée par certaines marques) et `mode_bordure` (oui/non). Sans source officielle : « non publié », jamais deviné.
3. **Pluie** : forte des deux côtés. `ip` existe (151 modèles), mais aucun filtre. À ajouter : filtre « IPX5 ou plus » et champ `capteur_pluie`.
4. **Hérissons et nuit** : forte en France, rare aux États-Unis. Champ `mode_nuit_faune` (oui/non) et une page « robot tondeuse hérisson ».
5. **Couloirs et zones** : question moyenne. `zones_max` n'est rempli que sur 67 modèles. Ajouter `passage_min_cm`. C'est la base de la jauge
   « pour ton jardin » (point 4 du positionnement).
6. **Batterie et coût sur 5 ans** : forte (n° 8 FR, n° 8 et 14 US). Champs `batterie_remplacable`, `prix_batterie_eur`, `prix_lames_eur`,
   `garantie_ans`, `abonnement_4g` (durée offerte et prix). C'est la donnée du graphique « coût sur 5 ans » ; tant qu'elle n'est pas sourcée,
   le graphique reste caché (règle déjà écrite).
7. **Herbe haute** : `hauteur_coupe_mm` existe (171 modèles) mais ne sert à rien à l'écran. Un tableau suffit, pas un axe.

### Ce qui sert peu
- **Autonomie** comme axe du radar : question faible en tant que telle (les acheteurs demandent la surface, pas les minutes) et donnée
  remplie sur **95 modèles sur 190** seulement. Le radar trace donc la moitié des robots avec un axe vide. Proposition : sortir
  l'autonomie du radar (la garder dans le tableau) et mettre **« Bordures »** à sa place dès que `bord_cm` couvre au moins 60 % de la base.
  En attendant, un radar à 5 axes (surface, pente, navigation, silence, prix) vaut mieux qu'un axe vide une fois sur deux.
- **Wifi et Bluetooth** dans les points de connexion : presque aucune question ne porte dessus. Seule la 4G (vol) revient.

### Radar proposé (à valider par le propriétaire, Dév QRT ensuite)
Surface · Pente · Navigation · Silence · Prix · **Bordures** (quand la donnée existe). Filtres : + « IPX5 ou plus », « mode nuit/hérisson »,
« 4 roues motrices », « passage étroit (≤ 1 m) » quand les champs sont remplis.

### FAQ à écrire (réponse chiffrée tirée des fiches)
Pluie (IP, capteur), hérissons (plage horaire), recharge (min), hivernage, câble coupé, durée de vie de la batterie (cycles), lames,
abonnement 4G, installateur, station de charge.

### Pièges à signaler (seulement avec source officielle)
Batterie non remplaçable sur certains modèles (Which?) ; 4G offerte un temps puis payante (**non vérifié**, à lire marque par marque) ;
signal RTK perdu sous les arbres (Husqvarna le dit lui-même : arrêts normaux, reprise quand le signal revient).
