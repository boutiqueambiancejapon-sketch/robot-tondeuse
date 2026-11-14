# Journal de l'équipe — Quel Robot Tondeuse

Le plus récent en haut. Chaque agent ajoute 3 à 6 lignes datées à la fin de son passage.

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
