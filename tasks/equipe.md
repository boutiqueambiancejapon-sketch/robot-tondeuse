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

Mis à jour par le Chef le 11/11/2026 (soir).

- **dashboard.quel-robot-tondeuse.com** et l'expéditeur e-mail du site : le DNS du domaine est chez Vercel,
  dont le compte est bloqué. Il faut déplacer le DNS vers Cloudflare (comme Toutou le 11/11). En attendant,
  les chiffres du site sont dans le centre de contrôle. **Bloque l'envoi du guide par e-mail (lot 2).**
- **Compte « Mon jardin »** (lot 5) : il demande une base de données sur le serveur → à faire avec Claude
  en session, pas par un agent.
- **Une question, réponse en un mot** : y a-t-il eu de vrais essais de robots (par vous ou par « Thomas ») ?
  Sans réponse, l'équipe applique la règle d'honnêteté : toutes les formules « testé », « sur mon terrain »,
  « après 6 mois » sont reformulées (8 articles « test-… », 22 articles au total, plus l'accueil).
- **Revenus Amazon** : combien rapporte le site par mois ? Ce chiffre sert à classer les priorités.
- **Affichage des chiffres du lot 0 dans le centre de contrôle** : le centre de contrôle est hors du dossier
  du projet. Les agents préparent le comptage côté site ; le branchement se fait avec Claude en session.

## Tableau des tâches

Chaque agent met à jour SA ligne à la fin de son passage. Le Chef ajuste les priorités.
Une étape = un passage. Si elle est finie, prendre la suivante dans « Ensuite ».

| Agent | En cours | Prochaine étape (un passage) | Ensuite | Bloqué par |
|---|---|---|---|---|
| Chef QRT | Passage du 11/11 soir fait : site vérifié, étapes écrites | Contrôler en ligne les 2 correctifs du Dév (images, mentions « testé ») et le plan éditorial ; revenir en arrière si cassé | Découper le lot 1 (carte des conversions) en étapes | — |
| Dév QRT | — | **Étape D0, en tout premier : remettre le lint au vert.** `npm run lint` sort 77 erreurs, donc personne ne peut envoyer (règle). 65 viennent des maquettes `content/*.jsx` (pas du site : les exclure dans `eslint.config.mjs`) ; 12 du vrai code (`app/admin/layout.tsx`, `TestimonialCard`, `LoginForm`, `blog/page.tsx`, `AutoProductCTAs`, `FlashBar`, `HomeRobotMower`, `ThemeToggle`, `packages/cms/lib/html-md.ts`) : les corriger, ou supprimer les composants qui ne servent plus (FlashBar, TestimonialCard). Types et build passent déjà. **Puis étape D1 (2 corrections courtes, avant le lot 0)** : a) images vides : `components/blog/ArticleCard.tsx` ligne 37 utilise `??` alors que 76 articles ont `featureImage: ""` → image cassée sur les pages de catégorie (vu sur /blog/husqvarna) ; utiliser l'image de secours quand le champ est vide, vérifier aussi la ligne ~181. b) Honnêteté sur les gabarits : retirer « On a testé des dizaines de modèles… », « 30+ modèles testés », « +1 200 tests réalisés ce mois-ci », « Tests terrain », « Tests · Comparatifs · Outils » (fichiers : `niche.config.ts` l.112, `HeroSection`, `HomeMethodology`, `HomeQuizTeaser`, `Nav`, `comparatifs/page`, `marques/page`, `blog/page`, `opengraph-image`). Remplacer par des faits vrais : 55 fiches robots comparées, 209 articles, barème public à venir. | **D2 = lot 0** : adresse `/go/<robot>/<marchand>` (redirection 302, lien `rel="sponsored nofollow"`, étiquette affiliée gardée, robots d'indexation exclus), puis `<AffiliateLink>` et le plugin MDX passent par elle. **D3** : compter quiz terminé, surface mesurée, calcul de rentabilité (même principe, sans cookie). | — |
| Contenu QRT | C1 fait le 12/11 (60 sujets vérifiés, en local, part avec le premier envoi du Dév) | **C2 lot 1** : les 8 articles « test-… » + 2 pages les plus vues (`meilleur-robot-tondeuse-2026`, `husqvarna-automower-vs-mammotion-luba`) : titre, description, résumé, corps reformulés en « avis sur fiche et sources », sans changer l'adresse | **C2 lots 2 à 8** : 66 autres articles (liste par `grep -l -i -E "testé|notre test|sur mon terrain|j'ai mesuré"`). **C3** : maillage vers `/superficie`, `/quiz`, `/calculateur-rentabilite-robot-tondeuse` et le futur Calendrier. Fusion `hivernage-robot-tondeuse` → `comment-hiverner-son-robot-tondeuse` | Envoi : lint (Dév, D0) |
| Croissance QRT | — | **Étape G1** : écrire `tasks/calendrier-gazon-sources.md` : les 12 mois, 3 gestes par mois, chaque conseil avec sa source (semencier, fabricant, organisme), variantes nord / sud / montagne. Ne rien envoyer, ne rien créer chez Brevo pendant ce passage. | **G2** : fiche « Hivernage du robot » à imprimer (texte sourcé, page du site, sans e-mail). **G3** : créer la liste Brevo séparée « Quel Robot Tondeuse » et le formulaire (inscription seulement). | Envoi d'e-mails : DNS (propriétaire) |

### Constats du Chef (11/11 soir) à garder en tête

- Site en ligne : accueil et 3 pages répondent (code 200), lisibles à 390 px, pas de débordement.
- Les retraits du 11/11 sont bien en ligne : plus de vente flash, plus de « Vu dans », plus d'avis « vérifiés ».
- Reste contraire à la règle d'honnêteté : accueil (« On a testé… », « 30+ modèles testés »), bandeau du
  menu « Tests », et 22 articles écrits comme des essais vécus.
- 76 articles sur 209 ont une image de couverture vide ; la carte d'article affiche alors une image cassée.
- Contrôles avant envoi : types OK, build OK (2 min), **lint en échec (77 erreurs, déjà là avant ce passage)**.
  Le Chef n'a donc rien envoyé : ses 2 fichiers sont enregistrés sur la branche en ligne **en local seulement**.
  Ils partiront avec le premier envoi du Dév, une fois le lint réparé (ne pas oublier l'étiquette de sauvegarde).

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
- [ ] Plan éditorial d'environ 60 sujets en place et suivi par la rédaction de nuit
- [ ] Honnêteté : plus aucun « testé » sans essai réel, prix datés, aucune fausse urgence
- [ ] UX/UI revue sur téléphone (accueil, article, fiche robot, outils), DA inchangée

Hors équipe (propriétaire ou Claude en session) : DNS du domaine vers Cloudflare, dashboard.quel-robot-tondeuse.com,
envoi réel des e-mails, compte « Mon jardin » (lot 5, base de données).
