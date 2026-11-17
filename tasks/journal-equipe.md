# Journal de l'équipe — Quel Robot Tondeuse

Le plus récent en haut. Chaque agent ajoute 3 à 6 lignes datées à la fin de son passage.

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
