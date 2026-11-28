# Équipe d'agents — Quel Robot Tondeuse

Mise en place le 11/11/2026 à la demande du propriétaire (Mathias), qui a donné les **pleins pouvoirs
sur ce projet** : transformer Quel Robot Tondeuse sur le modèle de Toutou Gourmet, en gardant la DA.

Plan de référence : `tasks/plan-v2.md` (lots 0 à 7). Plan éditorial : `tasks/plan-editorial.md`.
Journal commun : `tasks/journal-equipe.md` (le plus récent en haut).

## Qui fait quoi

| Agent | Rôle | Passage (heure belge) |
|---|---|---|
| **Chef QRT** | Coordonne : lit le journal, choisit l'étape suivante de chaque agent et l'écrit dans le tableau ci-dessous, vérifie le site en ligne (accueil + 3 pages, téléphone 390 px), revient en arrière si quelque chose est cassé, liste ce qui attend le propriétaire. | 8 h 15 |
| **Dév QRT** | Code : mesure (lot 0), carte des conversions (lot 1), fiches robots et note (lot 3), « ce robot convient-il à mon jardin ? » (lot 4), amélioration UX/UI sans changer la DA. | 9 h |
| **Contenu QRT** | Plan éditorial informationnel (gazon, entretien, dépannage, saisons), qualité et honnêteté des articles existants, maillage interne. | 10 h 30 |
| **Croissance QRT** | Guide « Calendrier du gazon » offert contre l'e-mail (lot 2), liste Brevo et formulaires, suite de bienvenue et lettre du jardin (lot 6). | 15 h |
| **Éditeur QRT** | Thématiques et calendrier éditorial : tient `tasks/arborescence.md`, `tasks/plan-editorial.md` et `tasks/calendrier-editorial.md`. Vérifie que la rédaction de nuit suit le plan, garde 30 sujets d'avance, ajoute les sujets tirés des annonces des marques, ouvre la rubrique suivante quand le critère est atteint. N'écrit pas d'article, ne touche pas au code. | lundi matin |

Un seul agent tourne à la fois ; un agent attend que les rédactions et réécritures de nuit soient finies. Le propriétaire (ou Claude en session) peut lancer un passage supplémentaire depuis le centre de contrôle. Les articles de la nuit sont écrits par la tâche habituelle du serveur,
qui suit `tasks/plan-editorial.md`.

**Garder du quota pour la rédaction de nuit (validé le 20/11/2026).** La rédaction de nuit part à 23 h 37 UTC
(0 h 37, heure belge) et sert 4 sites. Le 15/11, la mise en ligne du design V2 a épuisé le quota Claude à 23 h 42 UTC :
aucun article cette nuit-là sur les 4 sites. Donc, les jours de gros chantier (mission longue, migration, plusieurs envois) :
finir le chantier avant 21 h 30 UTC (22 h 30, heure belge). Passé cette heure, aucun gros chantier ne démarre ; on
enregistre une étape propre et on décrit la suite dans le journal pour le lendemain.

## Décisions du propriétaire (11/11/2026)

- Orientation V2 adoptée : **« mon jardin, toute l'année »** (le gazon fait revenir chaque mois).
- **Brevo** : même compte que Toutou Gourmet, **liste séparée « Quel Robot Tondeuse »**. Clé et réglages dans
  `~/.config/toutou/brevo.env` (ne jamais les afficher ni les copier dans le dépôt, qui est public).
- **Honnêteté** : aucun « testé », « notre test », faux avis, fausse presse, fausse urgence ni prix barré
  non vérifié. La note d'un robot vient de ses caractéristiques et de sources lues, et le barème est public.
  Retirés le 11/11 : vente flash, bandeau « Vu dans », avis « vérifiés ».
- **Photos produits** : catalogue Fnac (Awin), déjà posées sur 22 fiches. Bouton « Voir chez Fnac » et
  vraies baisses de prix : lot à venir (le flux est téléchargé par le serveur, pas par les agents).
- **Mesure sans base de données ni cookie** (lot 0) : les clics sortants passent par une adresse de
  redirection du site (par exemple `/go/<robot>/<marchand>`), comptée dans les journaux du serveur et lue
  par le centre de contrôle.

## Pas de page de méthode (propriétaire, 28/11/2026)

> « Ta page comment nous notons, c'est typique d'un site fait à l'IA : supprime-la. »

`/comment-nous-notons` supprimée (301 vers l'accueil), plus aucun lien « notre barème » ni « voir le barème ». La note et son détail
critère par critère restent sur les fiches.

## Collections longue traîne (décision du propriétaire, 28/11/2026) — PRIORITÉ N° 1

Tout est dans `tasks/collections-v1.md`. **Catalogue QRT** (nouvel agent) construit la base des robots tondeuses ; **Dév QRT** met
IndexNow et la mesure des visites IA, puis le moteur de collections ; **Contenu QRT** écrit et relit chaque collection avant indexation.
Le reste (CRO, haut de gamme, piscine, jardin) continue derrière.

## Chantier CRO (18/11/2026) — priorité de l'équipe

Le site ne rapporte rien en affiliation. Tout est dans `tasks/chantier-cro.md` : **Contenu QRT** ajoute les encarts produits aux 32 articles d'achat qui n'en ont pas et corrige les 6 fiches Amazon fausses ; **Dév QRT** compte les clics Cdiscount et Fnac ; **Chef QRT** contrôle et suit les clics par bloc. Passe avant le ménage du design (étape 13).

## Priorité aux produits chers (décision du propriétaire, 18/11/2026)

On écrit d'abord ce qui rapporte le plus par vente. Tout est dans `tasks/calendrier-editorial.md` (décision en haut) et `tasks/arborescence.md`.

- **Robots tondeuses à plus de 1 000 €** : avis de modèles (`/avis-<marque>-<modèle>`), duels, classements haut de gamme et grand terrain, avant le printemps.
- **Nouvelle rubrique « Tracteurs et tondeuses autoportées »** (1 500 à 4 000 €), ouverte le 18/11/2026, adresses à la racine, page mère `/tracteur-tondeuse`. Seule exception à la règle « pas de thermique ».
- **Robots de piscine avancés à décembre 2026** : rubrique `/robot-piscine` **ouverte par le Dév le 18/11/2026** (articles dans `content/articles/robot-piscine/`).
- Gazon, dépannage et accessoires bon marché passent derrière ; ceux de saison restent. ~~Cabanons, pergolas, mobilier : pas sur ce site.~~ **Remplacé le 28/11/2026, voir ci-dessous.**
- **Contenu QRT** : mettre à jour sur place, avant février, les classements par budget, par surface, 4 roues motrices et LiDAR. **Croissance QRT** : trouver quel marchand partenaire vend des tracteurs. **Chef QRT** : au premier article tracteur, contrôler qu'aucun encart automatique ne montre un robot à la place d'un tracteur.



## CRO et piscine : priorité absolue (propriétaire, 28/11/2026) — « tu mets aucun CRO sur ces pages ? … piscine est vide, comment tu veux que je fasse des ventes »
1. **Chaque produit cité = un bouton d'achat.** Toute page qui nomme un produit (guides d'achat, classements, avis, duels, tracteurs) porte un `<ProductCTA>`
   par produit, juste sous son intertitre, vers Amazon (page exacte trouvée avec `scripts/amazon-cherche.mjs`, prix et date du relevé dans `hook`),
   sinon Cdiscount ou Fnac (flux Awin), sinon la boutique de la marque si elle a un programme partenaire. Exemple fait le 28/11 :
   `/meilleur-tracteur-tondeuse` (4 blocs ; TC 112 et Estate 7122 W absents d'Amazon). En cas de doute entre plusieurs fiches valables : la plus chère.
   **Contenu QRT** : passer toutes les pages de produits, les plus visitées d'abord (Search Console), et lister celles sans bouton.
2. **Robots de piscine maintenant, pas en décembre** : 5 premiers articles cette semaine (meilleur robot piscine, sans fil, pas cher, fond et parois,
   Dolphin ou Beatbot), chacun avec ses `<ProductCTA>` Amazon ; la page `/robot-piscine` liste les articles et un tableau « nos choix » avec boutons.
   **Éditeur** : avancer ces sujets en tête du plan de nuit. **Contenu QRT** : écrire le premier dès son prochain passage.
3. Prix toujours lus le jour même (API Amazon, flux Awin, site de la marque), datés ; jamais de prix barré non relevé, jamais d'urgence inventée.

## Jardin haut de gamme grâce à Amazon (décision du propriétaire, 28/11/2026) — remplace « pas de cabanons sur ce site »

> « Grâce à Amazon, on peut attaquer un max de nouveaux clusters high ticket : robot piscine, mais aussi cabane et tout ce qui concerne le jardin. »

L'API Amazon Creators est ouverte (clés dans le coffre, `/srv/toutou/shared/.env`, voir `tasks/deals-v1.md`) : prix, disponibilité et page exacte
de tout produit Amazon.fr, sans recherche d'ASIN à la main (règle : en cas de doute entre plusieurs fiches valables, la plus chère).
Ordre des rubriques (Éditeur : `tasks/arborescence.md`, `tasks/plan-editorial.md`, `tasks/calendrier-editorial.md`) :
1. **Robots de piscine** (rubrique `/robot-piscine` déjà ouverte) : classements par budget et taille de bassin, avis de modèles, duels.
2. **Abris et cabanes de jardin** (bois, métal, résine ; 500 à 3 000 €) : page mère, guides par taille et matériau, permis de construire/déclaration préalable (sources officielles service-public.fr), classements.
3. **Autres produits chers du jardin**, un cluster à la fois, après les deux premiers : pergolas et carports, serres, barbecues et planchas haut de gamme, spas gonflables et rigides, nettoyeurs haute pression, débroussailleuses et taille-haies sur batterie, mobilier de jardin.
Chaque cluster : page mère, une page par intention (règle « des articles de blog existent = on rédige »), deals Amazon/Cdiscount/Fnac
dans la page Deals avec un filtre par catégorie, prix et disponibilité lus à l'API, jamais inventés. Le menu reste celui du design V2 :
nouvelles rubriques sous « Jardin » sans refonte (maquette au propriétaire si le menu change de forme).

## Design V2 validé (15/11/2026)

Le propriétaire a validé la maquette V2 et demandé de l'appliquer à tout le site. **La consigne « garder la DA » est
remplacée** : couleurs, logo et robot restent, la mise en page, la typographie et les animations changent.
Tout est dans `tasks/design-v2.md` (règles, mascotte, ordre de migration) et `docs/maquette-v2/`.
Le socle, l'en-tête, le pied de page et l'accueil sont en ligne. **Dév QRT** : la migration des pages (étapes 1 à 13 de
`tasks/design-v2.md`) passe avant le reste, une étape par passage. **Chef QRT** : contrôler chaque page migrée contre la
maquette, à 390 px. **Contenu QRT** : préparer le plan éditorial « Robots de piscine ». **Croissance QRT** : formulaires au style V2.

## Ce qui attend le propriétaire (les agents ne peuvent pas le faire)

Mis à jour par le Chef le 28/11/2026 (10 h 45) : 3 points. Réglé et retiré le 28/11 : prix Amazon des Deals (le propriétaire a ouvert l'API Amazon Creators, voir `tasks/deals-v1.md`). Réglés avant : DNS chez Cloudflare, clé Brevo, revenu Amazon (0 € par mois), nom du responsable des données (en ligne sur `/confidentialite`, contrôlé le 17/11), mentions légales (remplies le 20/11, contrôlées en ligne par le Chef le 21/11).

- **Adresse bonjour@quel-robot-tondeuse.com** : le renvoi Cloudflare semble posé (3 serveurs de courrier Cloudflare lus le 21/11) et l'adresse est déjà affichée sur `/mentions-legales`. Reste à envoyer un e-mail d'essai pour prouver qu'elle reçoit (Claude en session). Ensuite l'équipe l'ajoute sur `/confidentialite`. Les e-mails de la lettre sont écrits (`docs/lettre-du-jardin.md`) : rien ne part sans votre accord.
- **Deals, historique des prix** (nouveau, 28/11, Claude en session, 2 lignes) : le script du serveur `qrt-offres.sh` n'enregistre que `offres.json`. Il doit aussi enregistrer `content/offres/historique-awin.json` (dans `git add` et dans le test « prix inchangés »). Sans cela, l'historique se perd à chaque relevé et les baisses de prix ne pourront jamais s'afficher.
- **Deals, nouveaux marchands** (nouveau, 28/11) : vous inscrire chez Awin auprès de Darty, Boulanger, ManoMano, Leroy Merlin ou Castorama. L'équipe ajoute leur flux dès l'accord.
- **Avec Claude en session, quand vous voulez** (rien à décider) : affichage des chiffres du site dans le centre de contrôle (4 compteurs prêts), compte « Mon jardin » (base de données), dashboard.quel-robot-tondeuse.com.
- ~~Question sur les vrais essais de robots~~ : refusée le 12/11, ne plus la poser. L'équipe écrit partout « nous n'essayons pas les robots ».

## Chantier « Deals » (28/11/2026) — priorité
Demande du propriétaire : page Deals façon Dealabs, menu compris, relevé toutes les 4 heures. Détail et étapes : `tasks/deals-v1.md`. Le Chef découpe en étapes d'un passage pour le Dév (historique, périmètre, détection, page) et la Croissance (alerte e-mail).

Découpage du Chef (28/11, 10 h), une étape par passage, **avant** les adresses `/test-…` :
- **DL1 (Dév)** : historique. `scripts/offres-awin.mjs` ajoute à chaque relevé une ligne par produit et par marchand (clé, marchand, prix, date et heure) dans `content/offres/historique-awin.json`, 90 jours glissants. Ne pas mêler avec `historique-prix.json` (prix des fabricants, relevé du Croissance). Un test vitest pour la coupe à 90 jours. Rien d'affiché.
- **DL2 (Dév)** : détection. `lib/deals.ts` lit cet historique : un produit entre si son prix passe sous le plus bas des 30 jours précédents chez le même marchand, **et seulement s'il a au moins 30 jours d'historique** (premières baisses possibles vers le 28/12). Tests : entrée, sortie, historique trop court.
- **DL3 (Dév)** : périmètre élargi (lames, batteries, garages, câbles, RTK, tracteurs, piscine) par catégorie du flux et marques suivies, avec une liste de mots exclus et un test.
- **DL4 (Dév)** : page `/deals` au design V2 avec filtres, puis « Deals » dans le menu. Maquette dans `docs/maquette-v2/` d'abord ; le Chef la contrôle à 390 px.
- **DL5 (Croissance)** : alerte « préviens-moi si ce robot baisse » (Brevo, double confirmation), après DL4.

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | **28/11, 10 h 45** : 10 adresses lues en ligne (9 pages en 200 avec 1 H1, ancien lien Luba en 308), 5 captures à 390 px. Les 2 corrections de 10 h sont en ligne (carte « Notre choix » = Luba 3 AWD 3000 à 2 149 € Cdiscount du 28/11 ; « Le site n'a essayé aucun de ces deux robots »). **Corrigé** : classement moins de 3 000 €, « Construction robuste, testée sur trois mois » (sans auteur) → essai du Café du Geek nommé, « le site ne l'a pas essayé ». Liste du propriétaire : Amazon retiré (API ouverte), script `qrt-offres.sh` ajouté | **Dimanche 29/11** : lire en ligne la correction du classement moins de 3 000 € ; article de la nuit (H1, prix datés, aucun vécu) ; recherche large « testé », « j'ai », « test prolongé », « testée sur » ; `historique-awin.json` a-t-il plus d'un relevé (sinon le script du serveur n'est toujours pas réglé) | **Lundi 30/11 : bilan de la semaine (NIVEAU attention)**. Contrôler DL2 du Dév. Premier article piscine (01/12) : carte « Notre choix » et tableau des prix. Premier article abri (janvier) : aucun robot dans les encarts | — |
| Dév QRT | **28/11, 18 h 15** (mission du propriétaire : liens partenaires protégés) : `lib/go.ts` (jeton, liste blanche Awin/Amazon/amzn), `lib/go-filtre.ts` (403 robots et navigateurs sans langue, 204 préchargements, 429 au-delà de 8 clics en 10 min par adresse ou 3 vers le même lien), `/go/<jeton>` ajouté, `/go/<asin>/amazon` gardé et filtré. Plus aucun lien Awin, amzn.to ni étiquette Amazon dans le HTML construit (avant : 947 Awin, 61 Amazon, 6 amzn.to). Mesure par marchand gardée. 215 tests. Avant : photos des produits (17 h 45) | **Gabarits, étape 2** : gabarit fiche produit (ordre de la maquette, `PhotoFiche` en haut) branché sur les 6 avis reliés à `data/robots-tondeuses.json`, adresses inchangées ; capture 390 px, contrôle en ligne (200, H1, JSON-LD) | 1. DL4 (page `/deals` V2 avec filtres, puis « Deals » au menu ; revoir le texte « relevé pas encore branché »). 2. Adresses `/test-…` : Navimow i, puis Bosch S+ 500, 310 Mark II, Life 750, Worx WR205E. 3. Note : élargir quand le comparateur aura les caractéristiques sourcées. 4. Clics `/go/` par page dans `/dashboard/conversions`, après Claude en session | Claude en session : `qrt-offres.sh` (historique Awin) ; installer `qrt-photos-amazon` |
| Contenu QRT | **28/11, après-midi** : premier article piscine `/robot-piscine/meilleur-robot-piscine` (6 robots, prix des marques lus le 28/11, 7 boutons d'achat vers la recherche Amazon, aucune note) ; « J'ai testé plus de 30 robots » retiré de `thomas.yaml` | 1. Article sécurité piscine : note « 9 » sans barème, « 90 % des cas documentés », 48,5 dB « Labo Maison », prix sans date. 2. 2e article piscine : `/robot-piscine/meilleur-robot-piscine-sans-fil`. 3. Lire la page Mammotion du Luba 3 (refus 429 le 28/11). 4. Classement autonomie : « 40 min de charge » et « 7,5 Ah » du 450X NERA. 5. Recherche large « j'ai », « test prolongé », « suivi long terme », « testée sur » | 4. « 800+ revendeurs » : ~53 fichiers. 5. Fiche `dreame-a2-3000.yaml` : Amazon « 1 599-2 499 € » alors que Dreame vend 939 €. 6. « Mesuré » lot 3. 7. Prix « au lieu de … € » : source et date, ou retrait. 8. Caractéristiques sourcées de Dreame, Navimow, Mova, Ecovacs au comparateur. 9. Avis Luba 3 AWD 3000 qui double `/avis-mammotion-luba-3-awd` : fusion à décider avec le Dév | — |
| Croissance QRT | **28/11, 15 h** : relevé (13 prix, inchangés) et tour promo des 13 marques, dates au 28/11. Husqvarna publie le code BF2026 (−30 % Aspire R6V, jusqu'au 30/11) : affiché comme « annoncé, pas saisi dans un panier » sur `/code-promo/husqvarna`, pas compté comme vérifié. Stiga A 15v et Einhell Smart 750 ajoutés aux notes | **Dimanche 29/11** : vérifier en ligne l'envoi du 28/11, puis `npm run releve-prix` et tour promo (13 prix, 13 marques), dates au 29/11. Puis chaque jour jusqu'au 02/12. Le 01/12 : `offres.json` doit dépasser le 23/11, sinon Claude en session | 1. **DL5 (Deals)** : préparer l'alerte « préviens-moi si ce robot baisse » (liste Brevo QRT, double confirmation), seulement après la page DL4 du Dév. 2. Dire quel marchand partenaire vend des tracteurs (`/tracteur-tondeuse` est en ligne depuis le 22/11, sans aucun lien marchand ; Stiga en vend en direct, non partenaire). 2. Lettre de décembre à relire le 30/11. 3. Après le 30/11 : retirer les relevés et notes Black Friday périmés (Stiga, Gardena et Einhell compris). 4. Piscine (01/12) : Aiper, Wybot, Beatbot sur les pages code promo | Envoi réel : accord du propriétaire et e-mail d'essai vers bonjour@ (Claude en session). Contact d'essai `essai-inscription-20261120@` (liste n° 6) à exclure de tout envoi |
| Éditeur QRT | **28/11, 11 h** (2e passage en plus) : guide `/robot-piscine/meilleur-robot-piscine`, écrit ce matin par Contenu, coché dans le plan (sinon la nuit du 01/12 l'aurait réécrit) ; calendrier de novembre à jour (9 sur 12 écrits). Suggestions Google des abris relevées : les 11 sujets confirmés, 2 ajoutés (10 m², composite), bureau de jardin confirmé. 258 sujets d'avance, 0 doublon | **Lundi 30/11** : cocher les nuits du 28 et 29/11 ; vérifier que le 01/12 prend l'avis Husqvarna 430X NERA (1er sujet piscine déjà écrit) ; relever les prix français du Luba 4 AWD, du Dreame A4 AWD Pro et du Husqvarna 430V NERA | Janvier : CES. Fin février : point rubrique tracteurs. Avant le 01/01/2027 : rappeler au Dév d'ouvrir `/abri-jardin/`. Avant le 01/04/2027 : `/arrosage/` | Consigne de nuit sur les images hors robots : Claude en session |
| Catalogue QRT | **28/11, 17 h** : **121 modèles** (Worx 24, Mammotion 21, Segway Navimow 18, Husqvarna 16 dont 2 arrêtés, Ecovacs 13, Gardena 12, Stiga 8, Dreame 7, Bosch 2). Fiches officielles FR lues le 28/11 ; prix normal de la marque. **180 collections** réelles. 93 `asin` vides sur 121 | **Ambrogio, Kress, Sunseeker**, puis Yarbo | les autres marques (2 à 3 par passage) ; Husqvarna pro (5xx, CEORA) à décider | ASIN des nouveaux modèles : Claude en session (`scripts/catalogue-asin.mjs`) | Contenu : écarts de `lib/comparateur.ts` et fiches hors gamme (journal du 28/11, 15 h 40 et 17 h) | — |
| Étude niches produits | **28/11, 17 h 30** : `tasks/etude-niches-produits.md` écrit (7 niches, 29 recherches). Verdict : stations électriques portables, `quelle-station-electrique.com` semble libre | Attendre le choix du propriétaire (niche et domaine) | Après la 2e niche lancée : étude de la 3e (robots aspirateurs laveurs en tête) | Prix Amazon.fr : Claude en session (API) |

### Constats du Chef (22/11 matin) à garder en tête

- Premier article tracteur (`/robot-tondeuse-ou-tracteur-tondeuse`, nuit du 21/11) : prix datés, pente selon la notice Stiga, « le site n'a essayé ni ces robots ni ces tracteurs », pas de note. Ses encarts montrent 2 robots : normal pour un « robot ou tracteur ». Pour un article 100 % tracteur, aucun robot ne doit apparaître.
- `/black-friday-robot-tondeuse` : « Dernier contrôle le 20 novembre », pas de tour promo le 21/11.
- 89 fichiers disent « 800+ revendeurs » pour Husqvarna, chiffre de revendeur déjà retiré du classement silencieux. Confié au Contenu (point 4).

### Constats du Chef (21/11 matin)

- Nuit du 20/11 : article `/meilleur-robot-tondeuse-haut-de-gamme` en ligne (prix datés du 20/11, sources nommées, aucun « testé », pas de note maison). Seul défaut : H1 sur 5 lignes à 390 px, comme les avis de la nuit d'avant. D'où le champ `h1` confié au Dév.
- Envoi du 20/11 au soir (session) : bloc « haut de gamme » sur les pages Black Friday par marque, prix Amazon « indicatif », Cdiscount daté. Conforme.
- Lint : 1 erreur venue des mentions légales du 20/11 (apostrophe), réparée par le Chef le 21/11.

### Constats du Chef (20/11 matin)

- Aucun passage d'agent le 19/11 (crédits épuisés, y compris celui du Chef). Le Dév a repris le 20/11 à 8 h 25.
- En ligne, 11 adresses lues : 10 pages en 200 avec 1 H1, plan du site en 200. Aucun lien Amazon sans étiquette, aucun « testé » ni faux chiffre du robot animé.
- **Article de la nuit** `/avis-mammotion-luba-3-awd` (premier sujet « produits chers ») : prix datés et sourcés, note de Tom's Guide citée comme telle, pas de note maison, carte « Notre choix » visible au premier écran. Seul défaut : H1 sur 5 lignes à 390 px (confié au Contenu).
- **Prix Cdiscount affichés « relevé le 16/11 »** en pleine semaine du Black Friday : datés donc honnêtes, mais vieux de 4 jours. Le relevé dépend de Claude en session.
- Vignette du Dreame A2 3000 toujours absente sur `/black-friday-robot-tondeuse` (Dév). Mentions légales : 4 champs « [À compléter] » toujours en ligne (propriétaire).
- Lint : 0 erreur, 20 avertissements. Types OK. `AGENTS.md` (non suivi) laissé tel quel.

### Lot 1 découpé (carte des conversions) — pour le Dév, après D2 et D3

1. **D4** : un champ `pageType` par article (guide-achat, comparatif, depannage, gazon, reglementation) déduit de la catégorie, avec un test ; rien d'affiché.
2. **D5** : un seul encart au milieu et un seul en fin d'article, choisis par `pageType` (clic marchand via `/go/...`, quiz, ou Calendrier quand il existe). Retirer les doublons d'encarts.
3. **D6** : accueil → objectif principal le quiz (le panneau flottant devient ce seul appel). Vérifier à 390 px.
4. **D7** : dépannage → encart « la pièce qu'il faut » (lames, câble, batterie) via `/go/...`.

## Fin de mission

L'équipe est **temporaire** : elle sert à amener Quel Robot Tondeuse au niveau de Toutou Gourmet, puis elle
s'arrête. Le Chef coche ce qui est fini. Quand tout ce qui dépend de l'équipe est coché, il écrit
« MISSION TERMINÉE » en haut du journal, prévient le propriétaire et propose de mettre l'équipe en pause.
Le site continue ensuite comme les autres : un article par nuit, suivant le plan éditorial.

- [ ] Lot 0 — clics vers les marchands, quiz, outils mesurés et lisibles dans le centre de contrôle (part de l'équipe **finie et contrôlée en ligne le 15/11** ; reste l'affichage dans le centre de contrôle, hors équipe)
- [x] Lot 1 — carte des conversions appliquée (un objectif par type de page) — coché le 20/11 : D4 à D8 en ligne, D7 contrôlé par le Chef (encart « pièce » sur les articles câble, rien sur un article gazon)
- [ ] Lot 2 — calendrier du gazon : outil + guide PDF offert contre l'e-mail, inscription vers la liste Brevo — outil, PDF et formulaire en ligne ; preuve faite le 20/11 par le Croissance (liste n° 6 : 1 contact avant l'essai, 2 après). Le PDF se télécharge sans e-mail : choix gardé
- [ ] Lot 3 — fiches robots avec note sur 100 et barème public, pages « Avis + marque » (premier lot de 10 à 15)
- [ ] Lot 4 — « Ce robot convient-il à mon jardin ? » sur les fiches et les comparatifs
- [x] Lot 6 — suite de bienvenue et lettre du mois rédigées et prêtes à partir (coché le 17/11 : 15 e-mails relus dans `docs/lettre-du-jardin.md`, sources citées, désinscription partout ; l'envoi réel est hors équipe)
- [x] Plan éditorial d'environ 60 sujets en place et suivi par la rédaction de nuit (coché le 12/11 : 60 sujets, premier sujet pris et coché par la rédaction du 11/11)
- [ ] Honnêteté : plus aucun « testé » sans essai réel, prix datés, aucune fausse urgence
- [x] Design V2 appliqué à toutes les pages (étapes 1 à 13 de `tasks/design-v2.md`) — coché le 17/11 : 13 étapes en ligne, contrôlées à 390 px les 16 et 17/11

Hors équipe (propriétaire ou Claude en session) : dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
