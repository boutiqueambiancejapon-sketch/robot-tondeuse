# Quel Robot Tondeuse — Plan V2

Rédigé le 11 novembre 2026 par l'agent Innovateur, à la demande du propriétaire.
Statut : **adopté le 11/11/2026** par le propriétaire, avec les pleins pouvoirs donnés à l'équipe d'agents sur ce projet (voir `tasks/equipe.md`). Le lot 5 (compte, base de données) reste à faire en session avec Claude.

---

## 1. Ce qui marche sur Toutou Gourmet, et qu'on peut reprendre

J'ai lu le plan V2 de Toutou, ses décisions, sa carte des conversions et son tableau de bord. Voici les 9 briques qui comptent.

| # | Brique Toutou Gourmet | À quoi elle sert |
|---|---|---|
| 1 | **Un parcours en 3 temps** : une réponse précise → un e-mail ou un compte → des retours réguliers | Le visiteur ne passe plus une seule fois. Il revient, et c'est là que les offres rapportent. |
| 2 | **Carte des conversions** : un seul objectif par type de page | Fin des encarts empilés. Chaque page pousse une seule chose. |
| 3 | **Outils** (ration, poids, âge, budget…) avec « Garder ce résultat » | 11 % du trafic. La meilleure porte d'entrée vers le compte. |
| 4 | **Compte « Mon chien »** : profil, suivi du poids, scans, offres | Le cœur du retour des visiteurs. |
| 5 | **Scanner + fiches produit + barème public** | Une note maison, expliquée, sur chaque produit. Pages « Avis + marque » et une fiche par modèle. |
| 6 | **Guide PDF offert contre l'e-mail**, puis lettre mensuelle et suite de bienvenue | Remplace la « newsletter » nue, que personne ne demande. |
| 7 | **Tableau de bord** : trafic, conversions, contacts, robots IA, contenu, recherche Google | On décide sur des chiffres, pas au feeling. |
| 8 | **Usines de contenu** : plan éditorial par outil, réécriture SEO, passe de cohérence, passe de ton, chiffres à sourcer | La qualité monte chaque nuit, sans intervention. |
| 9 | **Règles d'honnêteté** : jamais « testé » si on n'a pas testé, prix datés, pas de faux avis | Protège la confiance, et le référencement. |

Briques Toutou que je **ne** propose **pas** de copier pour l'instant : l'assistant IA (Milo), le Premium payant (Stripe), la version anglaise. Trop tôt pour ce site.

---

## 2. Où en est Robot Tondeuse aujourd'hui

**Ce qui existe déjà**
- 200 articles : 107 astuces, 47 guides d'achat, 21 comparatifs, 13 sur l'entretien de la pelouse.
- 53 fiches robots dans la base produits (avec lien Amazon).
- 4 outils : quiz, comparateur, mesure de surface sur carte, calcul de rentabilité.
- Un menu, des pages « marques » et « comparatifs », une production d'articles et d'images automatique.

**Ce qui manque (comparé à Toutou)**
- Aucune collecte d'e-mail. Aucun compte. Aucune raison de revenir.
- **Aucune mesure des conversions** : on ne sait pas combien de visiteurs cliquent vers Amazon, finissent le quiz ou utilisent un outil.
- Aucune base de données (le site ne fonctionne qu'avec des fichiers).
- Les 53 fiches robots n'ont pas de vraie page à elles, ni de note.
- L'entretien du gazon ne pèse que 13 articles sur 200, alors que c'est le sujet qui fait revenir toute l'année.

**Trafic relevé** (journaux du serveur, environ 3 jours disponibles, chiffres approximatifs)
- Environ 810 pages vues par des humains, 1 390 passages de robots.
- Google amène l'essentiel (185 arrivées repérées). Les IA passent souvent : ChatGPT 188 passages, Perplexity 60.
- Pages les plus vues : l'accueil (108), « quel robot pour 800 m² » (22), « meilleur robot 2026 » (20), « quand changer les lames » (19), « réparer une pelouse abîmée » (16), « horaires de tonte » (14).
- À retenir : **l'entretien et le dépannage attirent autant que les guides d'achat**. Or ces pages n'ont rien à proposer au visiteur.

**Le vrai problème de ce site**
On achète un robot tondeuse une fois tous les 8 à 10 ans. Un site qui ne vit que du clic « acheter le robot » perd le visiteur aussitôt. Le gazon, lui, demande quelque chose tous les mois : tonte, lames, engrais, scarification, hivernage. C'est là qu'est la V2.

---

## 3. L'idée de la V2 en une phrase

> Passer de « quel robot acheter » à **« mon jardin, toute l'année »** : le visiteur décrit son jardin une fois, le site lui dit quoi faire chaque mois, et lui propose le bon robot, les bonnes lames, le bon engrais au bon moment.

Le parcours visé, calqué sur Toutou :
1. Google ou une IA amène quelqu'un sur une réponse précise (une panne, une mousse, un choix de robot).
2. Il garde quelque chose d'utile : son **calendrier du gazon**, la surface mesurée, le résultat du quiz. Il laisse son e-mail ou crée un compte.
3. Chaque mois, le rappel « à faire ce mois-ci » le ramène. Les offres (robot, lames, engrais, abri) arrivent au moment où il en a besoin.

---

## 4. Le plan, lot par lot

Ordre choisi pour que chaque lot serve tout seul, même si on s'arrête après.

### Lot 0 — Mesurer (1 à 2 jours de travail)
*Équivalent Toutou : les événements « clic partenaire », « outil utilisé », « quiz terminé ».*

- Compter les clics vers Amazon, par page et par produit.
- Compter les quiz terminés, les surfaces mesurées, les calculs de rentabilité.
- Classer chaque page par type (guide d'achat, comparatif, dépannage, gazon, outil) pour lire les chiffres par famille.
- Afficher ces chiffres dans le Centre de contrôle, écran Robot Tondeuse.

Pourquoi d'abord : sans ça, impossible de savoir si la suite rapporte.
Risque : très faible. Aucun cookie, aucune donnée personnelle.

### Lot 1 — Carte des conversions (2 à 3 jours)
*Équivalent Toutou : `cro-carte`, un objectif par type de page.*

| Type de page | Ce que veut le visiteur | Objectif principal | Secondaire |
|---|---|---|---|
| Guide d'achat, « meilleur robot », « quel robot pour X m² » | choisir | **Clic Amazon** | quiz |
| Comparatif A contre B | trancher | **Clic Amazon** (le gagnant) | fiche du robot |
| Dépannage (ne charge plus, câble coupé, lames) | réparer vite | **La pièce qu'il faut** (lames, câble, batterie) | carnet d'entretien |
| Entretien du gazon (mousse, jaunissement, scarifier) | un beau gazon | **Calendrier du gazon** (e-mail) | produit utile |
| Réglementation, bruit, horaires | une réponse | **Calendrier du gazon** | — |
| Outils | un chiffre pour son jardin | **Garder ce résultat** (compte) | robot adapté |
| Accueil | découvrir | **Quiz** | calendrier |

Règles reprises de Toutou : un seul encart au milieu, un seul en fin d'article, jamais deux fois la même demande.

### Lot 2 — Le Calendrier du gazon : outil + guide offert (4 à 6 jours)
*Équivalent Toutou : le guide PDF contre l'e-mail, et l'outil ration.*

- **Outil « Mon calendrier du gazon »** : 4 questions (région, surface, exposition, robot ou non). Résultat : les 12 mois, avec quoi faire et quand (tonte, hauteur de coupe, engrais, scarification, regarnissage, arrosage, hivernage du robot).
- **Version PDF à imprimer**, envoyée par e-mail. C'est l'aimant à e-mails du site.
- **Fiche « Hivernage du robot »** à imprimer : sujet de saison dès maintenant.
- Le calendrier s'affiche en haut des articles gazon, une seule fois par page.

Pourquoi : j'ai cherché, je n'ai pas trouvé d'outil français qui fasse un calendrier personnalisé avec rappels. Les concurrents (Gamma, Hornbach, Forum Gazon) ne proposent que des calendriers fixes ou des PDF.
Risque : les conseils doivent être sourcés (semenciers, fabricants). Prévoir une relecture.
Besoin : un service d'envoi d'e-mails. Toutou utilise Brevo. **Décision du propriétaire.**

### Lot 3 — Les fiches robots et la note du site (6 à 8 jours)
*Équivalent Toutou : fiches produit, barème public, pages « Avis + marque ».*

- **Une vraie page par robot** (les 53 de la base, par lots de 10) : surface réelle conseillée, pente, navigation, bruit, prix relevé avec date, pour quel jardin, pour quel jardin non.
- **Une note sur 100, avec un barème public** : on explique comment on note. La note vient des caractéristiques et des sources lues, pas d'un essai.
- **Une page « Avis + marque »** par marque, avec le classement de ses modèles. Les comparatifs et les guides y renvoient.
- **Sous une certaine note, on propose mieux** au lieu de vendre le produit (règle Toutou « sous 55 »).
- Démarrer par 10 à 15 fiches, mesurer 4 à 6 semaines, puis élargir.

Pourquoi : capter les recherches sur un modèle précis (« avis Dreame A1 Pro »), très proches de l'achat.
Risque : pages trop semblables entre elles si on va trop vite. D'où le petit lot de départ.

### Lot 4 — « Ce robot convient-il à mon jardin ? » (3 à 4 jours)
*Équivalent Toutou : le scanner, « Vérifier pour mon chien ».*

- Sur chaque fiche robot et chaque comparatif : le visiteur entre sa surface, sa pente, ses zones. Réponse immédiate : **convient / limite / ne convient pas**, avec la raison.
- Branché sur l'outil de mesure de surface, qui existe déjà.
- Si le robot ne convient pas : 2 robots qui conviennent.

Pourquoi : c'est le « scanner » de ce site. Simple, rapide, et ça donne une raison de créer un compte pour garder son jardin.

### Lot 5 — Le compte « Mon jardin » (8 à 12 jours) — **le gros morceau**
*Équivalent Toutou : le compte « Mon chien ».*

Ce que le visiteur y trouve :
- **Mon jardin** : surface, pente, zones, région, type de gazon. Rempli tout seul par les outils.
- **Mon calendrier** : la tâche du mois, cochable.
- **Mon robot** : modèle, date d'achat, et un **carnet d'entretien** (dernier changement de lames, nettoyage, hivernage, batterie). Rappel quand les lames sont à changer.
- **Mes robots compatibles** et les offres du moment.

Ce que ça demande :
- Une **base de données** pour ce site (il n'en a pas). Solution logique : la même installation que Toutou, avec une base séparée. **Accord du propriétaire obligatoire.**
- La même brique de connexion que Toutou, déjà éprouvée.
- Pages légales à mettre à jour (données personnelles, suppression du compte).

Risque : c'est le lot le plus lourd, et le seul qui stocke des données personnelles. Je conseille de ne le lancer que si les lots 2 et 4 montrent que les visiteurs veulent garder leurs résultats.

### Lot 6 — La lettre du jardin (3 à 4 jours, après le lot 2)
*Équivalent Toutou : suite de bienvenue + lettre mensuelle.*

- 3 e-mails de bienvenue : le calendrier, le bon réglage de tonte, le choix du robot.
- **Une lettre par mois** : « À faire en [mois] », 3 gestes, 1 offre de saison.
- Calendrier commercial naturel : mars (première tonte, robots), mai (lames), septembre (scarification, engrais), novembre (hivernage, Black Friday), décembre (cadeau).

### Lot 7 — Les usines de contenu (en continu)
*Équivalent Toutou : plan éditorial par outil, réécriture, cohérence, ton.*

- **Plan éditorial par outil** : chaque nouvel article mène à un outil (calendrier, compatibilité, surface, rentabilité).
- **Rééquilibrer vers le gazon et le dépannage** : passer de 13 à environ 60 articles gazon en 3 mois. Requêtes à vérifier une par une avant d'écrire.
- **Passe de cohérence** : mêmes prix, mêmes surfaces, mêmes chiffres d'un article à l'autre.
- **Passe d'honnêteté** : 8 articles s'appellent « test-… » et 7 contiennent « nous avons testé » ou une formule proche. Si aucun essai réel n'a eu lieu, il faut reformuler. **Point à trancher par le propriétaire.**
- Corriger les catégories en double (« guide-achat » et « guides-achat », « tuto », « faq »).

### Lot 8 — Plus tard, si les chiffres suivent
- Outils en plus : dose d'engrais et de semences selon la surface, horaires de tonte autorisés par commune, diagnostic de panne pas à pas.
- Pages « code promo » par marque, si des partenariats directs existent.
- Version payante, assistant : pas avant d'avoir des comptes actifs.

---

## 5. Ordre conseillé et calendrier

| Quand | Quoi | Pourquoi maintenant |
|---|---|---|
| Novembre | Lot 0 (mesure) + fiche hivernage du lot 2 | Saison de l'hivernage et des cadeaux de Noël |
| Décembre | Lot 1 (carte des conversions) + lot 2 complet | Prêt avant la reprise |
| Janvier – février | Lots 3 et 4 (fiches, note, compatibilité) | **Le pic d'achat arrive en mars-avril.** Les fiches doivent être en ligne avant. |
| Mars | Lot 6 (lettre) + décision sur le lot 5 | On aura 2 mois de chiffres pour décider |
| Avril et après | Lot 5 (compte) si les chiffres le justifient | — |
| En continu | Lot 7 | — |

---

## 6. Ce que j'attends du propriétaire

1. **Accord sur l'idée centrale** : « mon jardin, toute l'année » plutôt que « quel robot acheter » seulement.
2. **Feu vert pour le lot 0** (mesure). Sans risque, et tout le reste en dépend.
3. **Service d'e-mails** : le même que Toutou (Brevo), ou un autre ?
4. **Base de données** pour le lot 5 : d'accord sur le principe, ou on reporte la question ?
5. **Les articles « test »** : y a-t-il eu de vrais essais ? Sinon, on reformule.
6. **Les revenus** : combien rapporte le site aujourd'hui via Amazon ? Y a-t-il d'autres partenaires possibles (marques en direct, jardineries) ? Sur Toutou, connaître la valeur d'un client a tout changé dans le classement des priorités.

---

## 7. Ce que je n'ai pas pu vérifier

- Le dossier de production de Toutou (`/srv/toutou`) m'est fermé. J'ai travaillé sur la copie de travail, ses documents et son historique. C'est suffisant pour ce plan.
- Le trafic de Robot Tondeuse : seulement environ 3 jours de journaux disponibles. Les chiffres donnent une tendance, pas une mesure.
- Les revenus Amazon du site : aucune donnée à ma portée.
- Les temps de travail sont des estimations.

## Sources extérieures consultées

- Calendriers gazon existants : [Gamma](https://www.gamma.be/fr/conseils-bricolage/a/entretien-pelouse-calendrier), [Hornbach](https://www.hornbach.ch/projets/entretien-du-gazon/), [Forum Gazon (PDF)](https://www.forumgazon.fr/images/doc/plan_de_fertilisation/Programme_gazon_longue_duree.pdf)
- Comparateurs de robots : [Test-Achats](https://www.test-achats.be/maison-energie/tondeuses-robots/comparateur), [Que Choisir](https://www.quechoisir.org/comparatif-tondeuse-robot-n443/), [Meilleurtest](https://meilleurtest.fr/comparatif-robot-tondeuse-sans-fil-peripherique/)
