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
| Dév QRT | **D5 fait le 17/11** : au plus un encart au milieu et un en fin d'article, choisis par `pageType` (`lib/utils/encarts.ts`) ; les 2 encarts produit ajoutés d'office sont retirés. À contrôler en ligne | `/robot-piscine` (avant le 01/01/2027) | D7 (encart « la pièce qu'il faut » au milieu des articles de dépannage). D6 : sans doute réglé par l'accueil V2, à confirmer en une ligne. Trou vide d'environ 100 px sous les 4 gestes de `/calendrier-du-gazon` à 390 px. Petit ménage restant : variables sans usage de `app/globals.css`, `PriceTag` et `AffiliateButton` non affichés, `content/page-home.jsx`, `lib/article-ctas.ts` | Affichage des chiffres : centre de contrôle (Claude en session) |
| Contenu QRT | C2 lot 5 fait le 16/11 : 179 liens « test » renommés « avis » dans 86 articles, suites « saison complète » et « retour terrain » du site réécrites, lien vers `/black-friday-robot-tondeuse` posé. À contrôler en ligne | **C2 lot 6** : relire les 8 pages `/test-…-avis` une par une (25 passages « en pratique » ou « en conditions réelles » : dire qui l'affirme, fiche, presse nommée ou propriétaires), y compris « J'ai analysé des retours terrain de propriétaires » dans l'avis 450X NERA | « Mesuré » sans auteur (255 passages, 99 articles) par lots de 10 : « annoncé » si le chiffre vient de la fiche, nom du média sinon. Prix « au lieu de … € » (8 passages). Batterie 50-70 % (23 fichiers). C3 : maillage vers les outils et `/calendrier-du-gazon` (0 lien depuis les articles). Les 20 titres d'articles les plus longs : proposer un H1 court sans changer l'adresse | — |
| Croissance QRT | Lot 6 fait le 16/11 : 3 e-mails de bienvenue et la lettre des 12 mois prêts dans `lib/emails/lettre-jardin.ts`, aperçu dans `docs/lettre-du-jardin.md`, aucun envoi. G5 (PDF + formulaire) fait par la session du matin, contrôlé en ligne | **Du 20/11 au 02/12, chaque jour** : contrôle des codes et offres de `lib/promos.ts` sur les sites des marques et des marchands (dernier contrôle : 15/11) | Lettre de décembre : la relire le 30/11 avec l'offre confirmée s'il y en a une. E-mail sur `/confidentialite` quand bonjour@ reçoit. Calendrier et fiches : relecture des sources au printemps | Envoi réel : accord du propriétaire, adresse bonjour@ et programme d'envoi (Claude en session) |
| Éditeur QRT | Passage du lundi 16/11 fait : 4 nuits sur 4 conformes, nuit du 15/11 sans article (quota), plan nettoyé, 185 sujets dont 57 ouverts. **17/11** : ajout d'Aiper, Wybot et Beatbot aux pages code promo non fait (rubrique piscine encore fermée, pages écrites pour les robots tondeuses) ; reste à Croissance à l'ouverture de `/robot-piscine` | **Lundi 23/11** : cocher les nuits du 16 au 22/11, vérifier que `/nouveautes-robot-tondeuse` est écrit et sourcé, relever les prix français du Luba 4 AWD et du Dreame A4 AWD Pro s'ils sont publiés | Lundi 30/11 : vérifier que « Décembre 2026 » démarre le 01/12. Janvier : sujets du salon CES. Ouverture de la piscine à juger avec le Chef fin décembre | Ouverture de `/robot-piscine` : Dév QRT (avant le 01/01/2027) |

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
