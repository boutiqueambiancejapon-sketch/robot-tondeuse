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

## Design V2 validé (15/11/2026)

Le propriétaire a validé la maquette V2 et demandé de l'appliquer à tout le site. **La consigne « garder la DA » est
remplacée** : couleurs, logo et robot restent, la mise en page, la typographie et les animations changent.
Tout est dans `tasks/design-v2.md` (règles, mascotte, ordre de migration) et `docs/maquette-v2/`.
Le socle, l'en-tête, le pied de page et l'accueil sont en ligne. **Dév QRT** : la migration des pages (étapes 1 à 13 de
`tasks/design-v2.md`) passe avant le reste, une étape par passage. **Chef QRT** : contrôler chaque page migrée contre la
maquette, à 390 px. **Contenu QRT** : préparer le plan éditorial « Robots de piscine ». **Croissance QRT** : formulaires au style V2.

## Ce qui attend le propriétaire (les agents ne peuvent pas le faire)

Mis à jour par le Chef le 18/11/2026 : 2 points, inchangés. Réglés le 15/11 et retirés de la liste : DNS chez Cloudflare, clé Brevo, revenu Amazon (0 € par mois), nom du responsable des données (en ligne sur `/confidentialite`, contrôlé le 17/11).

- **Adresse bonjour@quel-robot-tondeuse.com** : activer le renvoi chez Cloudflare (avec Claude en session). Dès que Claude confirme qu'elle reçoit, l'équipe l'affiche sur `/confidentialite`. Les e-mails de la lettre sont écrits (`docs/lettre-du-jardin.md`) : rien ne part sans cette adresse et sans votre accord.
- **Mentions légales** : 4 champs « [À compléter] » visibles en ligne (nom ou raison sociale, adresse postale, e-mail, directeur de la publication). Le propriétaire doit dire quoi écrire ; l'équipe ne devine pas une adresse.
- **Avec Claude en session, quand vous voulez** (rien à décider) : affichage des chiffres du site dans le centre de contrôle (4 compteurs prêts), prix du jour Cdiscount et Fnac, compte « Mon jardin » (base de données), dashboard.quel-robot-tondeuse.com.
- ~~Question sur les vrais essais de robots~~ : refusée le 12/11, ne plus la poser. L'équipe écrit partout « nous n'essayons pas les robots ».

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du mercredi 18/11 fait : 28 adresses lues en ligne, 7 captures à 390 px. Contrôlés en ligne : D8, ménage du Dév, C2 lot 6 (3 pages d'avis), prix relevés du Black Friday, article de la nuit. Rien à annuler | Contrôler en ligne D7 (encart « la pièce qu'il faut » sur 2 articles de dépannage, rien sur un article gazon), le lot 1 « mesuré » du Contenu (3 articles au hasard) et la date de contrôle des pages promo | Lundi 23/11 : bilan de la semaine. Cocher le lot 1 dès que D7 est en ligne, le lot 2 après la preuve d'inscription. Rejuger « Honnêteté » après 3 lots « mesuré » | — |
| Dév QRT | **D7 envoyé le 18/11** (à contrôler en ligne par le Chef) : encart « la pièce qu'il faut » au milieu de 5 articles de dépannage (batterie, câble, lames), via `/go/lames/amazon`, `/go/cable/amazon` et `/go/batterie/amazon`, vers une recherche Amazon, sans prix ni référence inventée, 10 tests. Rien sur l'article des lames (pièce déjà montrée par l'auteur) ni hors dépannage | **Piscine, étape 1** : la route `/robot-piscine/<page>` qui lit `content/articles/robot-piscine/`, plan du site, liens marchands par `/go/...`, sans entrée de menu et sans changer « fermée ». | 1. **Piscine, étape 2** : page `/robot-piscine` (modèle `piscine.html`, pose `piscine`), menu, ligne « ouverte » dans `tasks/arborescence.md`, prévenir Croissance (avant le 01/01/2027). 2. Lot 3, premier pas : barème public sur 100 écrit et testé, rien d'affiché. 3. Sur `/black-friday-robot-tondeuse`, la ligne « Dreame A2 3000 » n'a pas de vignette alors que les 8 autres en ont une : poser la photo du catalogue si elle existe, sinon aligner la ligne. Petits restes : trou vide sous les 4 gestes de `/calendrier-du-gazon` à 390 px, 3 lignes `.pricetag` de `app/v2-articles.css`, `content/page-home.jsx`, `lib/article-ctas.ts` | Affichage des chiffres : centre de contrôle (Claude en session) |
| Contenu QRT | C2 lot 6 **contrôlé en ligne par le Chef le 18/11** : plus de « -28 % » ni de « Prix habituel » sur l'avis Gardena, plus de récit de déballage sur l'avis Yuka Mini 2, phrase « nous n'essayons pas » sur l'avis 450X NERA | **1. D'abord, une contradiction en ligne** : `/robot-tondeuse-black-friday-2026-prix-a-viser` donne 1 199 € comme plus bas du Dreame A2 3000 (partie « le contre-exemple du Black Friday », résumé, FAQ, tableau), alors que `/black-friday-robot-tondeuse` affiche 939 € lus le 17/11 sur la boutique Dreame. Mettre l'article à jour avec la source et la date, sans écrire « plus bas de l'année » sans preuve. **2. Puis « Mesuré » lot 1** : 10 articles, « annoncé » si le chiffre vient de la fiche, nom du média sinon. Trancher avec la page Mammotion si le Yuka Mini 2 navigue en RTK ou par caméra (l'avis Worx et l'avis Yuka se contredisent) | 1. « Mesuré », lots suivants (environ 260 passages, 100 articles au 18/11). 2. **Encarts produit hors achat** (décision du Chef) : dans les 19 articles gazon, dépannage ou réglementation, garder au plus un `<ProductCTA>` et seulement si le produit règle le problème de l'article ; retirer les robots posés là pour vendre. 3. Prix « au lieu de … € » (15 passages au 18/11, dont ceux de `/nouveautes-robot-tondeuse` déjà sourcés) : source et date, ou retrait. 4. Batterie 50-70 % (23 fichiers). 5. C3 : maillage vers les outils et `/calendrier-du-gazon`. 6. Les 20 titres les plus longs : H1 court sans changer l'adresse. 7. Chiffres sans source dans les articles de dépannage (exemple : « dans 80 % des cas » en tête de `/robot-tondeuse-ne-charge-plus-diagnostic-solutions`) : citer la source ou écrire « le plus souvent » | — |
| Croissance QRT | Prix relevés du 17/11 **contrôlés en ligne par le Chef le 18/11** : 9 prix datés, source nommée, aucun prix barré, aucun compte à rebours, `/code-promo/mammotion` daté du 17/11 | **Aujourd'hui 18/11, petit point** : en haut de `/black-friday-robot-tondeuse`, « Dernier contrôle le 15 novembre » est placé au-dessus de prix « lus le 17 novembre ». Afficher la date du dernier relevé, ou faire le tour des 10 marques restantes et passer `PROMOS_CHECKED_AT` à la date du jour. **Puis du 20/11 au 02/12, chaque jour** : relire les 9 prix relevés (corriger ou retirer), faire le tour des 13 marques de `lib/promos.ts`, mettre à jour `PROMOS_CHECKED_AT` | 1. **Preuve pour le lot 2** : montrer qu'une inscription faite sur le site arrive dans la liste Brevo n° 6 (compter les contacts avant et après un essai avec une adresse d'essai, sans afficher la clé), et l'écrire dans le journal. 2. Lettre de décembre à relire le 30/11. 3. Après le 30/11 : retirer les relevés Black Friday périmés. 4. À l'ouverture de `/robot-piscine` : Aiper, Wybot, Beatbot sur les pages code promo, avec des textes « robot de piscine » et un contrôle daté | Envoi réel : accord du propriétaire, adresse bonjour@ et programme d'envoi (Claude en session) |
| Éditeur QRT | Passage du lundi 16/11 fait : 4 nuits sur 4 conformes, nuit du 15/11 sans article (quota), plan nettoyé, 185 sujets dont 57 ouverts. **17/11** : ajout d'Aiper, Wybot et Beatbot aux pages code promo non fait (rubrique piscine encore fermée, pages écrites pour les robots tondeuses) ; reste à Croissance à l'ouverture de `/robot-piscine` | **Lundi 23/11** : cocher les nuits du 16 au 22/11, vérifier que `/nouveautes-robot-tondeuse` est écrit et sourcé, relever les prix français du Luba 4 AWD et du Dreame A4 AWD Pro s'ils sont publiés | Lundi 30/11 : vérifier que « Décembre 2026 » démarre le 01/12. Janvier : sujets du salon CES. Ouverture de la piscine à juger avec le Chef fin décembre | Ouverture de `/robot-piscine` : Dév QRT (avant le 01/01/2027) |

### Constats du Chef (18/11 matin) à garder en tête

- En ligne, 28 adresses lues : 25 pages en 200 avec 1 H1, 1 renvoi voulu (`/robot-tondeuse-pente`), le plan du site et le PDF en 200. Aucun lien direct vers Amazon, aucun essai affirmé sur les 25 pages.
- **D8 en ligne** : 0 barre d'achat sur les 3 articles relevés le 17/11 et sur l'article de la nuit ; barre gardée sur le classement, le duel, les avis.
- **Ménage du Dév en ligne** : les variables retirées ne sont plus dans la feuille de style servie (72 Ko), rien n'a bougé à l'écran.
- **Article de la nuit** `/marcher-sur-pelouse-gelee` : 9 sources citées (RHS, Kansas State, Husqvarna…), tuile calendrier au milieu, tuile quiz à la fin, aucun encart produit, image posée.
- **Trois petits écarts confiés** : prix du Dreame A2 3000 qui se contredit entre deux pages (Contenu), date « 15 novembre » au-dessus de prix lus le 17 (Croissance), vignette manquante sur une ligne du Black Friday (Dév).
- **Honnêteté, pas encore cochable** : recherche large refaite sur les articles et le code → 0 essai affirmé. Restent « mesuré » sans auteur (environ 260 passages, 100 articles) et 15 « au lieu de … € » à trier.
- Mentions légales : les 4 champs « [À compléter] » sont toujours en ligne (liste du propriétaire).
- Lint : 0 erreur, 20 avertissements. Types OK. `AGENTS.md` (écrit par l'outil Next.js, non suivi) laissé tel quel.

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
- [ ] Lot 1 — carte des conversions appliquée (un objectif par type de page) — D4, D5 et D8 en ligne ; D7 envoyé le 18/11, à contrôler en ligne par le Chef
- [ ] Lot 2 — calendrier du gazon : outil + guide PDF offert contre l'e-mail, inscription vers la liste Brevo — outil, PDF et formulaire en ligne ; reste la preuve qu'une inscription arrive dans la liste (Croissance). Le PDF se télécharge sans e-mail : choix gardé
- [ ] Lot 3 — fiches robots avec note sur 100 et barème public, pages « Avis + marque » (premier lot de 10 à 15)
- [ ] Lot 4 — « Ce robot convient-il à mon jardin ? » sur les fiches et les comparatifs
- [x] Lot 6 — suite de bienvenue et lettre du mois rédigées et prêtes à partir (coché le 17/11 : 15 e-mails relus dans `docs/lettre-du-jardin.md`, sources citées, désinscription partout ; l'envoi réel est hors équipe)
- [x] Plan éditorial d'environ 60 sujets en place et suivi par la rédaction de nuit (coché le 12/11 : 60 sujets, premier sujet pris et coché par la rédaction du 11/11)
- [ ] Honnêteté : plus aucun « testé » sans essai réel, prix datés, aucune fausse urgence
- [x] Design V2 appliqué à toutes les pages (étapes 1 à 13 de `tasks/design-v2.md`) — coché le 17/11 : 13 étapes en ligne, contrôlées à 390 px les 16 et 17/11

Hors équipe (propriétaire ou Claude en session) : dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
