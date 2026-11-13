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

## Ce qui attend le propriétaire (les agents ne peuvent pas le faire)

Mis à jour par le Chef le 13/11/2026 (matin). Rien de neuf depuis le 12/11.

- **dashboard.quel-robot-tondeuse.com** et l'expéditeur e-mail du site : le DNS du domaine est chez Vercel,
  dont le compte est bloqué. Il faut déplacer le DNS vers Cloudflare (comme Toutou le 11/11). En attendant,
  les chiffres du site sont dans le centre de contrôle. **Bloque l'envoi du guide par e-mail (lot 2).**
- **Compte « Mon jardin »** (lot 5) : il demande une base de données sur le serveur → à faire avec Claude
  en session, pas par un agent.
- ~~Question sur les vrais essais de robots~~ : **le propriétaire a choisi de ne pas répondre (12/11). Ne plus
  la poser.** L'équipe applique donc la règle d'honnêteté partout : toutes les formules « testé »,
  « sur mon terrain », « après 6 mois » sont reformulées (73 articles au 12/11, plus l'accueil et le menu).
- **Revenus Amazon** : combien rapporte le site par mois ? Ce chiffre sert à classer les priorités.
- **Affichage des chiffres du lot 0 dans le centre de contrôle** : le centre de contrôle est hors du dossier
  du projet. Les agents préparent le comptage côté site ; le branchement se fait avec Claude en session.

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du 13/11 matin fait : site vérifié à 390 px (rien à annuler), lot 1 découpé (voir plus bas), étapes réécrites | Contrôler en ligne C2 lot 2 (plus aucune offre Mova « jusqu'au 12 novembre ») et D2 (`/go/...` répond en 302, lien vers Amazon avec l'étiquette) ; revenir en arrière si cassé | Cocher « Honnêteté » quand le compte `grep` tombe à 0 | — |
| Dév QRT | D0 et D1 faits le 12/11. Pas de passage le 13/11 au moment du Chef | **D2 = lot 0** (inchangé) : adresse `/go/<robot>/<marchand>` (redirection 302, `rel="sponsored nofollow"`, étiquette affiliée gardée, `noindex` et exclue du sitemap), puis `<AffiliateLink>` et le plugin MDX passent par elle. Ajouter un test vitest de la redirection | **D3** : compter quiz terminé, surface mesurée, calcul de rentabilité (sans cookie). **D4 = lot 1, étape 1** (voir « Lot 1 découpé »). UX : panneau flottant de l'accueil à 390 px (toujours là le 13/11), barre de défilement sous les filtres de `/blog` | — |
| Contenu QRT | C1 et C2 lot 1 faits. **64 articles** contiennent encore « testé » & co (compte du 13/11) | **C2 lot 2, URGENT** : l'offre Mova « jusqu'au 12 novembre 2026 » est périmée depuis ce matin et reste en ligne (résumé, corps et `stickyCtaMessage` de `mova-lidax-ultra-800-vs-worx-…`, `mova-lidax-ultra-1200-vs-segway-…`, `robot-tondeuse-black-friday-2026-prix-a-viser`, `robot-tondeuse-lidar-ou-rtk-lequel-choisir-2026`) : retirer l'offre, garder le prix public daté. Puis les 2 contradictions vues par Croissance (`hauteur-coupe-robot-tondeuse-saison` : 6-8 cm avant l'hiver ; `comment-hiverner-son-robot-tondeuse` : charge complète, retirer « mon erreur à 150 € »), puis 4 articles de la liste `grep` | **C2 lots 3 à 7**. **C3** : maillage vers `/superficie`, `/quiz`, `/calculateur-rentabilite-robot-tondeuse` (le Calendrier quand Croissance dit qu'il existe). Fusion `hivernage-robot-tondeuse` → `comment-hiverner-son-robot-tondeuse` | — |
| Croissance QRT | **G1 fait le 12/11** : `tasks/calendrier-gazon-sources.md` (12 mois, 9 sources, variantes région et exposition). Adresse prévue de l'outil : `/calendrier-du-gazon` | **G2** (inchangé) : fiche « Hivernage du robot » à imprimer, page du site sans e-mail, d'après Husqvarna (S2, S3 du fichier G1) ; « suivez la notice » pour les autres marques | **G3** : liste Brevo séparée « Quel Robot Tondeuse » et formulaire (inscription seulement, consentement, lien confidentialité). **G4** : outil `/calendrier-du-gazon`. Puis textes du lot 6 | Envoi d'e-mails : DNS (propriétaire) |

### Constats du Chef (13/11 matin) à garder en tête

- Site en ligne vérifié à 390 px (captures) : accueil, `/feuilles-mortes-pelouse-ramasser-broyer-laisser` (article de la nuit),
  `/test-mammotion-luba-2-awd-avis`, `/mova-lidax-ultra-800-vs-worx-landroid-vision-m800-comparatif`. Tout en 200, 1 titre H1 par page,
  zéro « testé » dans le HTML. **Rien de cassé, rien à annuler.** D1 et C2 lot 1 sont bien en ligne.
- **Fausse urgence en ligne depuis ce matin** : « 699 € en promotion jusqu'au 12 novembre 2026 » (4 articles). → Contenu, en premier.
- Accueil à 390 px : le panneau flottant « Voir les meilleurs prix / Faites le quiz » couvre encore la carte du jardin. → Dév (Ensuite).
- Lint : 0 erreur, 9 avertissements. Types OK.

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

- [ ] Lot 0 — clics vers les marchands, quiz, outils mesurés et lisibles dans le centre de contrôle
- [ ] Lot 1 — carte des conversions appliquée (un objectif par type de page)
- [ ] Lot 2 — calendrier du gazon : outil + guide PDF offert contre l'e-mail, inscription vers la liste Brevo
- [ ] Lot 3 — fiches robots avec note sur 100 et barème public, pages « Avis + marque » (premier lot de 10 à 15)
- [ ] Lot 4 — « Ce robot convient-il à mon jardin ? » sur les fiches et les comparatifs
- [ ] Lot 6 — suite de bienvenue et lettre du mois rédigées et prêtes à partir
- [x] Plan éditorial d'environ 60 sujets en place et suivi par la rédaction de nuit (coché le 12/11 : 60 sujets, premier sujet pris et coché par la rédaction du 11/11)
- [ ] Honnêteté : plus aucun « testé » sans essai réel, prix datés, aucune fausse urgence
- [ ] UX/UI revue sur téléphone (accueil, article, fiche robot, outils), DA inchangée

Hors équipe (propriétaire ou Claude en session) : DNS du domaine vers Cloudflare, dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
