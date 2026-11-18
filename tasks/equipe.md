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

Mis à jour par le Chef le 17/11/2026 : 2 points, inchangés. Réglés le 15/11 et retirés de la liste : DNS chez Cloudflare, clé Brevo, revenu Amazon (0 € par mois), nom du responsable des données (en ligne sur `/confidentialite`, contrôlé le 17/11).

- **Adresse bonjour@quel-robot-tondeuse.com** : activer le renvoi chez Cloudflare (avec Claude en session). Dès que Claude confirme qu'elle reçoit, l'équipe l'affiche sur `/confidentialite`. Les e-mails de la lettre sont écrits (`docs/lettre-du-jardin.md`) : rien ne part sans cette adresse et sans votre accord.
- **Mentions légales** : 4 champs « [À compléter] » visibles en ligne (nom ou raison sociale, adresse postale, e-mail, directeur de la publication). Le propriétaire doit dire quoi écrire ; l'équipe ne devine pas une adresse.
- **Avec Claude en session, quand vous voulez** (rien à décider) : affichage des chiffres du site dans le centre de contrôle (4 compteurs prêts), prix du jour Cdiscount et Fnac, compte « Mon jardin » (base de données), dashboard.quel-robot-tondeuse.com.
- ~~Question sur les vrais essais de robots~~ : refusée le 12/11, ne plus la poser. L'équipe écrit partout « nous n'essayons pas les robots ».

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du mardi 17/11 fait : 28 adresses lues en ligne, 8 captures à 390 px, D5 et les 2 articles de la nuit contrôlés, rien à annuler. Cases cochées : Design V2 et Lot 6 | Contrôler en ligne le travail du 17/11 : D8 (plus de barre d'achat sur un article gazon, dépannage, réglementation), 2 pages d'avis du C2 lot 6, les offres Dreame et Mammotion sur `/black-friday-robot-tondeuse` | Lundi 23/11 : bilan de la semaine. Rejuger « Honnêteté » après le C2 lot 6 et le premier lot « mesuré ». Cocher le lot 1 après D7 et D8, le lot 2 après la preuve d'inscription | — |
| Dév QRT | **Ménage fait le 18/11** : 50 variables sans usage retirées de `app/globals.css`, `PriceTag` et `AffiliateButton` supprimés avec leurs tests (93 tests), feuille de style construite inchangée hors ces variables. **À contrôler en ligne par le Chef.** D8 fait le 17/11 : la ligne d'achat du haut et la barre collée en bas ne s'affichent plus que sur les guides d'achat et les comparatifs (165 articles la gardent, 30 la perdent). D6 confirmé. **À contrôler en ligne par le Chef** | **D7** : encart « la pièce qu'il faut » (lames, câble, batterie) au milieu des articles de dépannage, via `/go/...`, avec un test. Il ferme le lot 1 | 1. **Piscine, étape 1** : la route `/robot-piscine/<page>` qui lit `content/articles/robot-piscine/`, plan du site, liens marchands par `/go/...`, sans entrée de menu et sans changer « fermée ». 2. **Piscine, étape 2** : page `/robot-piscine` (modèle `piscine.html`, pose `piscine`), menu, ligne « ouverte » dans `tasks/arborescence.md`, prévenir Croissance (avant le 01/01/2027). 3. Lot 3, premier pas : barème public sur 100 écrit et testé, rien d'affiché. Petits restes : trou vide sous les 4 gestes de `/calendrier-du-gazon` à 390 px, 3 lignes `.pricetag` de `app/v2-articles.css`, `content/page-home.jsx`, `lib/article-ctas.ts` | Affichage des chiffres : centre de contrôle (Claude en session) |
| Contenu QRT | **C2 lot 6 fait le 17/11** : les 8 pages d'avis relues, 48 passages réécrits, 0 « en pratique » restant, prix barré « -28 % » du Gardena retiré, `lib/testimonials.ts` (faux témoignages non affichés) supprimé. **À contrôler en ligne par le Chef** | **« Mesuré » lot 1** : 10 articles, « annoncé » si le chiffre vient de la fiche, nom du média sinon. D'abord : trancher avec la page Mammotion si le Yuka Mini 2 navigue en RTK ou par caméra (l'avis Worx et l'avis Yuka se contredisent) | 1. « Mesuré », lots suivants (255 passages, 99 articles). 2. **Encarts produit hors achat** (décision du Chef) : dans les 19 articles gazon, dépannage ou réglementation, garder au plus un `<ProductCTA>` et seulement si le produit règle le problème de l'article ; retirer les robots posés là pour vendre. 3. Prix « au lieu de … € » (8 passages) : source et date, ou retrait. 4. Batterie 50-70 % (23 fichiers). 5. C3 : maillage vers les outils et `/calendrier-du-gazon`. 6. Les 20 titres les plus longs : H1 court sans changer l'adresse | — |
| Croissance QRT | **Fait le 17/11** : Dreame, Mammotion et Mova lus sur leurs boutiques, 9 prix datés dans `lib/promos.ts` (`releves`), affichés sur les pages Black Friday sans prix barré ; `offers` reste vide (pas de plus bas des 30 jours). Aucun code promo trouvé. **À contrôler en ligne par le Chef** | **Du 20/11 au 02/12, chaque jour** : relire les 9 prix relevés (corriger ou retirer), faire le tour des 13 marques de `lib/promos.ts`, mettre à jour `PROMOS_CHECKED_AT` | 1. **Preuve pour le lot 2** : montrer qu'une inscription faite sur le site arrive dans la liste Brevo n° 6 (compter les contacts avant et après un essai avec une adresse d'essai, sans afficher la clé), et l'écrire dans le journal. 2. Lettre de décembre à relire le 30/11. 3. Après le 30/11 : retirer les relevés Black Friday périmés. 4. À l'ouverture de `/robot-piscine` : Aiper, Wybot, Beatbot sur les pages code promo, avec des textes « robot de piscine » et un contrôle daté | Envoi réel : accord du propriétaire, adresse bonjour@ et programme d'envoi (Claude en session) |
| Éditeur QRT | Passage du lundi 16/11 fait : 4 nuits sur 4 conformes, nuit du 15/11 sans article (quota), plan nettoyé, 185 sujets dont 57 ouverts. **17/11** : ajout d'Aiper, Wybot et Beatbot aux pages code promo non fait (rubrique piscine encore fermée, pages écrites pour les robots tondeuses) ; reste à Croissance à l'ouverture de `/robot-piscine` | **Lundi 23/11** : cocher les nuits du 16 au 22/11, vérifier que `/nouveautes-robot-tondeuse` est écrit et sourcé, relever les prix français du Luba 4 AWD et du Dreame A4 AWD Pro s'ils sont publiés | Lundi 30/11 : vérifier que « Décembre 2026 » démarre le 01/12. Janvier : sujets du salon CES. Ouverture de la piscine à juger avec le Chef fin décembre | Ouverture de `/robot-piscine` : Dév QRT (avant le 01/01/2027) |

### Constats du Chef (17/11 matin) à garder en tête

- En ligne, 28 adresses lues : 24 pages en 200 avec 1 H1, 2 renvois voulus (`/robot-tondeuse-pente`, `/quel-robot-tondeuse-pour-mon-jardin` → `/quiz`), le plan du site et le PDF en 200.
  Inscription sans consentement : 400. Aucun lien direct vers Amazon dans les 5 articles regardés : tout passe par `/go/...`.
- **D5 en ligne** : gazon → tuile calendrier au milieu, tuile quiz à la fin ; dépannage et réglementation → calendrier ; comparatif et guide → quiz. Tuiles à fond uni, sans liseré ni flèche.
- **À corriger (D8)** : la barre d'achat collée en bas apparaît sur des articles dépannage, réglementation et gazon. La règle 7 de `tasks/design-v2.md` la réserve aux fiches et classements, et la carte du lot 1 ne veut pas d'achat sur ces pages.
- **Pages promo en retard sur l'article de la nuit** : `/nouveautes-robot-tondeuse` cite des offres Dreame et Mammotion en cours, avec leurs sources ; `lib/promos.ts` dit encore « non contrôlées » → Croissance, aujourd'hui.
- **Honnêteté, pas encore cochable.** Recherches du 16/11 refaites : n° 1 → 0, n° 2 → 0, n° 3 → 51 (lues par le Contenu : presse citée et retours de propriétaires). Recherche large sur les articles et le code : 0 essai affirmé.
  Restent : « mesuré » sans auteur (255 passages, 99 articles) et les 8 pages d'avis (25 « en pratique »).
- Mentions légales : les 4 champs « [À compléter] » sont toujours en ligne (liste du propriétaire).
- Lint : 0 erreur, 20 avertissements. Types OK.

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
- [ ] Lot 1 — carte des conversions appliquée (un objectif par type de page) — D4 et D5 en ligne ; restent D7 et D8
- [ ] Lot 2 — calendrier du gazon : outil + guide PDF offert contre l'e-mail, inscription vers la liste Brevo — outil, PDF et formulaire en ligne ; reste la preuve qu'une inscription arrive dans la liste (Croissance). Le PDF se télécharge sans e-mail : choix gardé
- [ ] Lot 3 — fiches robots avec note sur 100 et barème public, pages « Avis + marque » (premier lot de 10 à 15)
- [ ] Lot 4 — « Ce robot convient-il à mon jardin ? » sur les fiches et les comparatifs
- [x] Lot 6 — suite de bienvenue et lettre du mois rédigées et prêtes à partir (coché le 17/11 : 15 e-mails relus dans `docs/lettre-du-jardin.md`, sources citées, désinscription partout ; l'envoi réel est hors équipe)
- [x] Plan éditorial d'environ 60 sujets en place et suivi par la rédaction de nuit (coché le 12/11 : 60 sujets, premier sujet pris et coché par la rédaction du 11/11)
- [ ] Honnêteté : plus aucun « testé » sans essai réel, prix datés, aucune fausse urgence
- [x] Design V2 appliqué à toutes les pages (étapes 1 à 13 de `tasks/design-v2.md`) — coché le 17/11 : 13 étapes en ligne, contrôlées à 390 px les 16 et 17/11

Hors équipe (propriétaire ou Claude en session) : dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
