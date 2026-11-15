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

Mis à jour par le Chef le 15/11/2026 (matin). Rien de nouveau depuis le 14/11 : les 6 points ci-dessous attendent toujours.

- **dashboard.quel-robot-tondeuse.com** et l'expéditeur e-mail du site : le DNS du domaine est chez Vercel,
  dont le compte est bloqué. Il faut déplacer le DNS vers Cloudflare (comme Toutou le 11/11). En attendant,
  les chiffres du site sont dans le centre de contrôle. **Bloque l'envoi du guide par e-mail (lot 2).**
- **Compte « Mon jardin »** (lot 5) : il demande une base de données sur le serveur → à faire avec Claude
  en session, pas par un agent.
- ~~Question sur les vrais essais de robots~~ : **le propriétaire a choisi de ne pas répondre (12/11). Ne plus
  la poser.** L'équipe applique donc la règle d'honnêteté partout : toutes les formules « testé »,
  « sur mon terrain », « après 6 mois » sont reformulées (73 articles au 12/11, plus l'accueil et le menu).
- **Clé Brevo du site** : ajouter `BREVO_API_KEY` (celle de Toutou) dans l'environnement du site sur le serveur (`/srv`, hors portée des agents) → le formulaire d'inscription s'affiche. À faire avec Claude en session.
- **Nom et e-mail du responsable du traitement** pour la page `/confidentialite` (2 champs « [À compléter] » visibles en ligne : nom et e-mail) :
  à donner par le propriétaire. Sans eux, la page reste incomplète, mais le formulaire G3 peut être préparé.
- **Revenus Amazon** : combien rapporte le site par mois ? Ce chiffre sert à classer les priorités.
- **Affichage des chiffres du lot 0 dans le centre de contrôle** : le centre de contrôle est hors du dossier
  du projet. Les agents préparent le comptage côté site ; le branchement se fait avec Claude en session.

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du 15/11 matin fait : 8 pages vérifiées en ligne (5 captures à 390 px), D3, C2 lot 3 et G3 contrôlés en ligne, rien à annuler. Case « Honnêteté » **non cochée** : 11 articles disent encore « testé en conditions réelles » ou racontent un achat | Contrôler en ligne D4, C2 lot 4 et G4 (`/calendrier-du-gazon` : 200, 1 H1, vue à 390 px, sources visibles) ; revenir en arrière si cassé | Rejuger « Honnêteté » après C2 lot 4, avec la recherche notée dans les constats du 15/11 | — |
| Dév QRT | **D3 fait, contrôlé en ligne le 15/11** (`POST /api/m/quiz-termine` → 204, inconnu → 404, `GET` → 405). Lot 0 fini côté site | **D4 = lot 1, étape 1** : champ `pageType` par article, avec un test, rien d'affiché. Attention : la catégorie seule ne suffit pas (le comparatif `dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif` est rangé en « astuces ») → regarder aussi l'adresse (`-vs-`, `comparatif`, `quel-robot-tondeuse-pour`, `meilleur-`) | D5, D6, D7. UX à 390 px : panneau flottant de l'accueil (2 boutons, couvre le contenu en bas d'écran ; réglé par D6), barre de défilement sous les filtres de `/blog`, titre d'onglet de `/deals` en double (« Quel Robot Tondeuse » deux fois) | Affichage des chiffres : centre de contrôle (Claude en session) |
| Contenu QRT | **C2 lot 3 fait, contrôlé en ligne le 15/11** (2 des 11 pages et la FAQ Black Friday : propres). Mais il reste des essais et achats racontés ailleurs (voir constats du 15/11) | **C2 lot 4 (passe avant la batterie)** : les 11 articles listés dans les constats du 15/11 (« On a testé 12 modèles pendant 6 mois », « testés en conditions réelles », « notre top 5 testé », « j'ai acheté / installé / constaté »). Reformuler comme au lot 1 : fiches des fabricants et retours de propriétaires. Titres et descriptions compris | **Batterie 50-70 %** en hiver → « suivez la notice ». Puis **C3** : maillage vers `/superficie`, `/quiz`, `/calculateur-rentabilite-robot-tondeuse`, `/fiche-hivernage-robot-tondeuse`. Fusion `hivernage-robot-tondeuse` → `comment-hiverner-son-robot-tondeuse`. Page `/deals` : elle promet une sélection « chaque semaine » alors qu'elle est vide → texte à rendre exact. Lien vers `/calendrier-du-gazon` quand la page existera | — |
| Croissance QRT | **G3 fait, contrôlé en ligne le 15/11** : `/confidentialite` en 200 avec 1 H1 ; `/api/inscription` sans consentement → 400. Formulaire encore caché (clé non posée) : normal | **G4** : outil `/calendrier-du-gazon` (12 mois, région, exposition), contenu tiré de `tasks/calendrier-gazon-sources.md`, sources visibles sur la page, repères « à relire » signalés comme tels ; ajout au plan du site ; vue à 390 px | Guide PDF du calendrier (style `.fiche-print`) + formulaire sur la page ; puis textes du lot 6 (bienvenue ×3, lettre du mois) dans le dépôt | Clé Brevo dans l'environnement du site (Claude en session). Envoi : DNS (propriétaire). Nom et e-mail du responsable : propriétaire |

### Constats du Chef (15/11 matin) à garder en tête

- En ligne, vérifié : accueil, article de la nuit `/cable-peripherique-robot-tondeuse-hiver-laisser-ou-retirer`, `/confidentialite`, `/quiz`,
  `/dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif`, `/comment-enlever-mousse-gazon`, `/fiche-hivernage-robot-tondeuse`, Black Friday.
  Tout en 200, 1 H1, zéro « testé ». `/go/B0GCZSSZRZ/amazon` en 302 avec l'étiquette. `/deals` : aucun prix barré, aucun compte à rebours. Rien à annuler.
- **Honnêteté, pas encore cochable.** Le lot 3 a bien nettoyé ses 11 articles, mais 11 autres affirment un essai ou un achat :
  `meilleur-robot-tondeuse` (l. 3 et 40 : « On a testé 12 modèles pendant 6 mois »), `robot-tondeuse-pas-cher` (l. 3), `robot-tondeuse-sans-fil-peripherique` (l. 40),
  `robot-tondeuse-petit-jardin` (l. 40), `robot-tondeuse-1000m2` (l. 40), `robot-tondeuse-2000m2` (l. 42), `robot-tondeuse-ou-tondeuse-classique-comparatif` (l. 38),
  `robot-tondeuse-combien-ca-coute-vraiment` (l. 40), `comment-installer-robot-tondeuse-soi-meme` (l. 38 et 70), `comment-avoir-un-beau-gazon-bien-vert` (l. 40 et 62),
  `quel-gazon-semer-pour-robot-tondeuse` (l. 36). À vérifier aussi : « 94 % des Automower fonctionnent encore après 7 ans » sans source
  (`quel-robot-tondeuse-pour-200m2-guide-achat-2026`, l. 142).
- Recherche à refaire après le lot 4 (elle doit ne plus rien trouver d'affirmé par l'auteur) :
  `grep -rnE "(n a testé|testés? en conditions réelles|top [0-9]+ testé|ous avons (testé|essayé)|'ai (testé|acheté|installé|constaté|gardé|mesuré)|m'a coûté)" content/articles`
  (29 fichiers sortent aujourd'hui ; une partie est honnête, à trier).
- Prix « au lieu de … € » : 9 passages, surtout dans `quand-acheter-robot-tondeuse-meilleur-moment-prix-2026`. À dater et sourcer, ou retirer (→ Contenu, après le lot 4).
- Lint : 0 erreur, 9 avertissements. Types OK. Build OK.

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
- [ ] UX/UI revue sur téléphone (accueil, article, fiche robot, outils), DA inchangée

Hors équipe (propriétaire ou Claude en session) : DNS du domaine vers Cloudflare, dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
