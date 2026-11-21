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

## Chantier CRO (18/11/2026) — priorité de l'équipe

Le site ne rapporte rien en affiliation. Tout est dans `tasks/chantier-cro.md` : **Contenu QRT** ajoute les encarts produits aux 32 articles d'achat qui n'en ont pas et corrige les 6 fiches Amazon fausses ; **Dév QRT** compte les clics Cdiscount et Fnac ; **Chef QRT** contrôle et suit les clics par bloc. Passe avant le ménage du design (étape 13).

## Priorité aux produits chers (décision du propriétaire, 18/11/2026)

On écrit d'abord ce qui rapporte le plus par vente. Tout est dans `tasks/calendrier-editorial.md` (décision en haut) et `tasks/arborescence.md`.

- **Robots tondeuses à plus de 1 000 €** : avis de modèles (`/avis-<marque>-<modèle>`), duels, classements haut de gamme et grand terrain, avant le printemps.
- **Nouvelle rubrique « Tracteurs et tondeuses autoportées »** (1 500 à 4 000 €), ouverte le 18/11/2026, adresses à la racine, page mère `/tracteur-tondeuse`. Seule exception à la règle « pas de thermique ».
- **Robots de piscine avancés à décembre 2026** : rubrique `/robot-piscine` **ouverte par le Dév le 18/11/2026** (articles dans `content/articles/robot-piscine/`).
- Gazon, dépannage et accessoires bon marché passent derrière ; ceux de saison restent. Cabanons, pergolas, mobilier : pas sur ce site.
- **Contenu QRT** : mettre à jour sur place, avant février, les classements par budget, par surface, 4 roues motrices et LiDAR. **Croissance QRT** : trouver quel marchand partenaire vend des tracteurs. **Chef QRT** : au premier article tracteur, contrôler qu'aucun encart automatique ne montre un robot à la place d'un tracteur.

## Design V2 validé (15/11/2026)

Le propriétaire a validé la maquette V2 et demandé de l'appliquer à tout le site. **La consigne « garder la DA » est
remplacée** : couleurs, logo et robot restent, la mise en page, la typographie et les animations changent.
Tout est dans `tasks/design-v2.md` (règles, mascotte, ordre de migration) et `docs/maquette-v2/`.
Le socle, l'en-tête, le pied de page et l'accueil sont en ligne. **Dév QRT** : la migration des pages (étapes 1 à 13 de
`tasks/design-v2.md`) passe avant le reste, une étape par passage. **Chef QRT** : contrôler chaque page migrée contre la
maquette, à 390 px. **Contenu QRT** : préparer le plan éditorial « Robots de piscine ». **Croissance QRT** : formulaires au style V2.

## Ce qui attend le propriétaire (les agents ne peuvent pas le faire)

Mis à jour par le Chef le 21/11/2026 : 1 point. Réglés et retirés : DNS chez Cloudflare, clé Brevo, revenu Amazon (0 € par mois), nom du responsable des données (en ligne sur `/confidentialite`, contrôlé le 17/11), mentions légales (remplies le 20/11, contrôlées en ligne par le Chef le 21/11).

- **Adresse bonjour@quel-robot-tondeuse.com** : le renvoi Cloudflare semble posé (3 serveurs de courrier Cloudflare lus le 21/11) et l'adresse est déjà affichée sur `/mentions-legales`. Reste à envoyer un e-mail d'essai pour prouver qu'elle reçoit (Claude en session). Ensuite l'équipe l'ajoute sur `/confidentialite`. Les e-mails de la lettre sont écrits (`docs/lettre-du-jardin.md`) : rien ne part sans votre accord.
- **Avec Claude en session, quand vous voulez** (rien à décider) : prix du jour Cdiscount et Fnac (dernier relevé affiché : 16/11, en pleine semaine du Black Friday), affichage des chiffres du site dans le centre de contrôle (4 compteurs prêts), compte « Mon jardin » (base de données), dashboard.quel-robot-tondeuse.com.
- ~~Question sur les vrais essais de robots~~ : refusée le 12/11, ne plus la poser. L'équipe écrit partout « nous n'essayons pas les robots ».

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du samedi 21/11 fait : 13 adresses lues en ligne (12 pages en 200 avec 1 H1), 6 captures à 390 px. Lint réparé (1 erreur venue des mentions légales du 20/11). **Décidés** : ordre du classement silencieux, barème du Dév (accordé), Ecovacs A1600 (pas d'« offre confirmée »). Rien à annuler | **Lundi 23/11** : bilan de la semaine en haut du journal (NIVEAU attention). Contrôler en ligne : le classement silencieux corrigé par le Contenu, le champ `h1` du Dév, le tour promo du Croissance (date du 21/11 ou plus), les articles des nuits du 21 au 23/11 (premier article tracteur : aucun robot dans les encarts) | Rejuger « Honnêteté » après 3 lots « mesuré ». Premier article piscine (01/12) : carte « Notre choix » et tableau des prix. Contrôler les 10 premières notes à 390 px | — |
| Dév QRT | **21/11** : champ `h1` facultatif des articles envoyé (le `title` reste pour Google). Essai local : 38 signes = 4 lignes à 390 px à cause de la mascotte, donc viser **environ 30 signes** | **Nom du site en double dans le `<title>`** des articles à la racine (« … \| Quel Robot Tondeuse \| Quel Robot Tondeuse ») : le retirer, contrôler 3 types de pages. Puis contrôler en ligne un article avec `h1` | 1. **Lot 3, pas 3** : note sur les 10 premières fiches, avec à côté la date du prix utilisé et un lien vers `/comment-nous-notons`. 2. Vignette manquante du Dreame A2 3000 sur `/black-friday-robot-tondeuse/dreame`. 3. Premier article piscine (01/12) et premier article tracteur : contrôles. Petits restes : trou sous les 4 gestes de `/calendrier-du-gazon`, `.pricetag` de `app/v2-articles.css`, `content/page-home.jsx`, `lib/article-ctas.ts` | Prix Cdiscount et Fnac : relevé lancé par Claude en session (dernier : 16/11) |
| Contenu QRT | **21/11** : classement silencieux reclassé selon la décision du Chef (bruit annoncé par la marque, critère en tête, A1 Pro dernier faute de chiffre Dreame). `h1` court posé sur 4 articles | **Relire les pages Dreame A1 Pro et A2 et la fiche Navimow i105E** (erreur 429 le 21/11) et corriger le classement silencieux si un chiffre change. Puis **H1 des 20 titres les plus longs** (environ 30 signes) | 1. « Mesuré » lot 3 : `/quel-robot-tondeuse-pour-3000m2-grand-domaine-2026` (A2 « 58 dB »), autonomie « selon Labomaison » du duel Goat/A2, Yuka Mini 2 1000 (57 dB annoncés). 2. Pente du Dreame A2 : « 26,5 % » ou « 50 % (26,5°) » selon les articles, à mettre d'accord. 3. Avis Yuka Mini 2 et Worx : largeur de coupe et prix. 4. Encarts produit hors achat : au plus un. 5. Prix « au lieu de … € » : source et date, ou retrait. 6. Batterie 50-70 %. 7. Maillage vers les outils. 8. Chiffres sans source en dépannage | — |
| Croissance QRT | **20/11** : tour promo envoyé, **contrôlé en ligne par le Chef le 21/11** (« Dernier contrôle le 20 novembre 2026 » sur `/black-friday-robot-tondeuse`). Preuve du lot 2 faite (liste n° 6). **Décision du Chef le 21/11** : l'Ecovacs A1600 LiDAR Pro reste en « prix relevé », pas en « offre confirmée » (le plus bas des 30 jours vient d'Ecovacs, pas de notre relevé) | **Du 21/11 au 02/12, chaque jour** : relire les 12 prix relevés (corriger ou retirer), faire le tour des 13 marques de `lib/promos.ts`, mettre à jour `PROMOS_CHECKED_AT` et `DATE_RELEVES`. Relire Stiga (source du 18/11) et le stock Navimow i208/i215/i220 | 1. Lettre de décembre à relire le 30/11. 2. Après le 30/11 : retirer les relevés Black Friday périmés. 3. À l'ouverture de `/robot-piscine` : Aiper, Wybot, Beatbot sur les pages code promo, textes « robot de piscine », contrôle daté. 4. Dire quel marchand partenaire vend des tracteurs | Envoi réel : accord du propriétaire et e-mail d'essai vers bonjour@ (Claude en session). Contact d'essai `essai-inscription-20261120@` (liste n° 6) à exclure de tout envoi |
| Éditeur QRT | **20/11** : règle « garder du quota pour la rédaction de nuit » écrite en haut de ce fichier (gros chantier fini avant 21 h 30 UTC). **18/11 (mission du propriétaire, produits chers)** : calendrier refait. 182 sujets datés (128 sur les robots tondeuses, les tracteurs et la piscine), 18 en réserve, 53 anciens derrière. 71 sujets ajoutés, tous avec une requête relevée le 18/11. Section « Novembre 2026 » ouverte : 12 sujets chers à écrire dès cette nuit. Rubrique tracteurs ouverte, piscine avancée à décembre | **Lundi 23/11** : cocher les nuits du 16 au 22/11, vérifier que la rédaction de nuit a bien pris la section « Novembre 2026 » (premier sujet : `/avis-mammotion-luba-3-awd`) et que le premier article tracteur respecte la règle (pas de note, pente selon la notice, pas d'image de robot). Relever les prix français du Luba 4 AWD et du Dreame A4 AWD Pro s'ils sont publiés. Dès que le champ `h1` du Dév est en ligne : écrire dans `tasks/plan-editorial.md` la consigne de nuit « `h1:` court, environ 40 signes » | Lundi 30/11 : vérifier que « Décembre 2026 » démarre le 01/12 et que `/robot-piscine` est ouverte. Janvier : sujets du salon CES. Fin février : point avec le Chef sur les visites et les clics de la rubrique tracteurs | Ouverture de `/robot-piscine` : Dév QRT (avant le 01/12/2026). Consigne de nuit sur les images hors robots : Claude en session |

### Constats du Chef (21/11 matin) à garder en tête

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
