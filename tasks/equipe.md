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

Mis à jour par le Chef le 16/11/2026. Réglés le 15/11 et retirés de la liste : DNS chez Cloudflare, clé Brevo, revenu Amazon (0 € par mois), nom du responsable des données (posé sur `/confidentialite` le 16/11).

- **Adresse bonjour@quel-robot-tondeuse.com** : activer le renvoi chez Cloudflare (avec Claude en session). Dès que Claude confirme qu'elle reçoit, l'équipe l'affiche sur `/confidentialite`.
- **Mentions légales** : 4 champs « [À compléter] » visibles en ligne (nom ou raison sociale, adresse postale, e-mail, directeur de la publication). Le propriétaire doit dire quoi écrire ; l'équipe ne devine pas une adresse.
- **Avec Claude en session, quand vous voulez** (rien à décider) : affichage des chiffres du site dans le centre de contrôle (4 compteurs prêts), prix du jour Cdiscount et Fnac, compte « Mon jardin » (base de données), dashboard.quel-robot-tondeuse.com.
- ~~Question sur les vrais essais de robots~~ : refusée le 12/11, ne plus la poser. L'équipe écrit partout « nous n'essayons pas les robots ».

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du lundi 16/11 fait : 20 pages lues en ligne, 9 captures à 390 px, design V2 conforme, lien vers la fiche d'hivernage en ligne, rien à annuler. Nom du responsable posé sur `/confidentialite`. Bilan de la semaine écrit | Contrôler en ligne `/nouveautes-robot-tondeuse` (200, 1 H1, une source par annonce, aucun « testé »), le nom sur `/confidentialite`, et le travail du Dév, du Contenu et de la Croissance du 16/11 | Rejuger « Honnêteté » après C2 lot 5 avec les 3 recherches des constats du 16/11. Cocher « Design V2 » après l'étape 13 | — |
| Dév QRT | D4 fait le 15/11. Étapes 1 à 12 du design V2 faites par Claude en session dans la nuit du 15 au 16/11 | **Étape 13 de `tasks/design-v2.md`** : supprimer `components/home` (31 fichiers, dont un bandeau qui défile et de la police machine à écrire, plus affichés), `components/effects`, l'ancien `Nav`, `Footer`, `BottomNav`, `ThemeToggle`, et les styles inutiles de `app/globals.css`. Avant : déplacer le type de `lib/home-hubs.ts`. Garder `.fiche-print` et `.surface-marker-label`. Dans le même envoi : rediriger `/quel-robot-tondeuse-pour-mon-jardin` vers `/quiz` (page de 106 mots en ligne qui annonce un guide « publié prochainement ») | **D5** (un encart au milieu, un en fin d'article, choisis par `pageType`), puis `/robot-piscine` avant le 01/01/2027, puis D7. D6 : sans doute réglé par l'accueil V2 (la question de surface mène au quiz), à confirmer en une ligne. Trou vide d'environ 100 px sous les 4 gestes de `/calendrier-du-gazon` à 390 px | Affichage des chiffres : centre de contrôle (Claude en session) |
| Contenu QRT | C2 lot 4 fait le 15/11, contrôlé en ligne le 16/11 (3 pages, propres) | **C2 lot 5** : les liens « notre [test …] » (125 passages, 70 articles) → « notre [avis sur …] », recette dans le journal du 15/11. Y ajouter : le lien « notre retour terrain après 3 mois de test » (`husqvarna-vs-mammotion-quelle-marque-choisir-2026`, l. 119) à renommer avec le vrai titre de la page, et les suites « saison complète » (42) et « retours terrain » (44) quand elles affirment un essai du site | Lien de `robot-tondeuse-black-friday-2026-prix-a-viser` vers `/black-friday-robot-tondeuse` (absent au 16/11, à poser avant le 20/11). Prix « au lieu de … € » (8 passages). Batterie 50-70 % (23 fichiers). C3 : maillage vers les outils et `/calendrier-du-gazon` (0 lien depuis les articles). Titres d'articles trop longs : le H1 de `comment-hiverner-son-robot-tondeuse` fait 7 lignes à 390 px, la règle dit 2 à 3 ; lister les 20 titres les plus longs et proposer un H1 court sans changer l'adresse. Les deux articles d'hivernage sont déjà fusionnés (l'ancien renvoie vers le nouveau) : rien à faire | — |
| Croissance QRT | G4 fait le 15/11, contrôlé en ligne le 16/11 (page 200, comptage 204). Lien vers la fiche d'hivernage posé le 16/11, contrôlé en ligne | **G5** : guide PDF du calendrier (page à imprimer, style `.fiche-print`, 2 à 3 pages A4) + formulaire sur la page | **Du 20/11 au 02/12, chaque jour** : contrôle des codes et offres de `lib/promos.ts` (la vérification mensuelle des pages code promo reste à la Croissance, décision du Chef). Puis textes du lot 6 (bienvenue ×3, lettre du mois). E-mail sur `/confidentialite` quand bonjour@ reçoit | Adresse bonjour@ : propriétaire avec Claude en session |
| Éditeur QRT | Passage du lundi 16/11 fait : 4 nuits sur 4 conformes, nuit du 15/11 sans article (quota), plan nettoyé, 185 sujets dont 57 ouverts | **Lundi 23/11** : cocher les nuits du 16 au 22/11, vérifier que `/nouveautes-robot-tondeuse` est écrit et sourcé, relever les prix français du Luba 4 AWD et du Dreame A4 AWD Pro s'ils sont publiés | Lundi 30/11 : vérifier que « Décembre 2026 » démarre le 01/12. Janvier : sujets du salon CES. Ouverture de la piscine à juger avec le Chef fin décembre | Ouverture de `/robot-piscine` : Dév QRT (avant le 01/01/2027) |

### Constats du Chef (16/11 matin) à garder en tête

- En ligne, 20 pages lues : toutes en 200 avec 1 H1, sauf `/nouveautes-robot-tondeuse` (404, normal : à écrire cette nuit) et `/hivernage-robot-tondeuse`
  (renvoi voulu vers `/comment-hiverner-son-robot-tondeuse`). Comptages 204, inscription sans consentement 400, `/go/...` 302 avec l'étiquette.
- Captures à 390 px (accueil, article, codes promo, Black Friday, calendrier, comparatifs, page marque `/choisir/husqvarna`, bons plans) :
  aucun débordement, aucun liseré, aucune flèche dans un bouton, aucun bandeau qui défile, mascotte différente selon la page. Accueil : le robot tond le titre, plus aucun faux chiffre.
- Le lien posé dans `hivernage-robot-tondeuse.mdx` ne se voit pas : cette adresse renvoie vers l'autre article. Celui de `comment-hiverner…` est bien en ligne.
- **Honnêteté, pas encore cochable.** Les 3 recherches à refaire après le lot 5 :
  1. `grep -rnE "(n a testé|testés? en conditions réelles|top [0-9]+ testé|ous avons (testé|essayé)|'ai (testé|acheté|installé|constaté|gardé|mesuré)|m'a coûté)" content/articles` → 0 aujourd'hui (bien) ;
  2. `grep -rnE "[Nn]otre \[test " content/articles` → 125 passages, 70 fichiers ;
  3. `grep -rniE "(retours? terrain|saison complète|mois de test)" content/articles` → à trier (les essais de presse cités sont honnêtes).
- 6 anciens articles de 100 mots (« guide publié prochainement ») : 5 renvoient déjà ailleurs, 1 est en ligne (`/quel-robot-tondeuse-pour-mon-jardin`, → Dév).
- Lint : 0 erreur, 21 avertissements (9 hier ; les 12 nouveaux viennent de la migration V2, le ménage de l'étape 13 devrait les faire baisser). Types OK.

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
- [ ] Lot 1 — carte des conversions appliquée (un objectif par type de page)
- [ ] Lot 2 — calendrier du gazon : outil + guide PDF offert contre l'e-mail, inscription vers la liste Brevo
- [ ] Lot 3 — fiches robots avec note sur 100 et barème public, pages « Avis + marque » (premier lot de 10 à 15)
- [ ] Lot 4 — « Ce robot convient-il à mon jardin ? » sur les fiches et les comparatifs
- [ ] Lot 6 — suite de bienvenue et lettre du mois rédigées et prêtes à partir
- [x] Plan éditorial d'environ 60 sujets en place et suivi par la rédaction de nuit (coché le 12/11 : 60 sujets, premier sujet pris et coché par la rédaction du 11/11)
- [ ] Honnêteté : plus aucun « testé » sans essai réel, prix datés, aucune fausse urgence
- [ ] Design V2 appliqué à toutes les pages (étapes 1 à 13 de `tasks/design-v2.md`) — **12 étapes sur 13 en ligne et contrôlées le 16/11** ; reste le ménage (étape 13)

Hors équipe (propriétaire ou Claude en session) : dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
