# La lettre du jardin — textes prêts

Fichier fabriqué par `scripts/lettre-apercu.ts` à partir de `lib/emails/lettre-jardin.ts`. Ne pas le corriger à la main.
Expéditeur prévu : Quel Robot Tondeuse <bonjour@quel-robot-tondeuse.com>. **Aucun envoi sans l’accord du propriétaire.**

## Suite de bienvenue (3 e-mails)

### bienvenue-1 — Le jour de l’inscription
- Objet : Votre calendrier du gazon, mois par mois
- Aperçu : Le guide en PDF, et ce que vous recevrez ensuite.

```text
Bonjour,

Votre inscription à la lettre du jardin est enregistrée. Le calendrier du gazon vous attend : trois gestes par mois pour la pelouse, plus celui du robot.

[Ouvrir mon calendrier] https://quel-robot-tondeuse.com/calendrier-du-gazon

Sur la page, choisissez votre région et l’exposition de la pelouse : les gestes s’ajustent. Le guide en PDF (8 pages) est réglé pour l’ouest et la plaine, pelouse au soleil. Il s’imprime en A4.

[Télécharger le guide en PDF] https://quel-robot-tondeuse.com/guides/calendrier-du-gazon.pdf

## Ce que vous recevrez

Deux autres e-mails cette semaine : le réglage de la hauteur de tonte, puis le choix d’un robot. Ensuite, une lettre par mois au plus, au début du mois, avec les gestes du moment.

Chaque geste nomme sa source : SEMAE, FREDON, la Société nationale d’horticulture, Husqvarna pour le robot. Nous ne les avons pas essayés nous-mêmes. Les mois sont des repères, le vrai signal est la température du sol : la pousse démarre vers 8 °C.

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### bienvenue-2 — 3 jours après l’inscription
- Objet : Hauteur de tonte : la règle du tiers
- Aperçu : 5 à 6 cm en saison, 7 à 8 cm l’été, et un produit à laisser en rayon.

```text
Bonjour,

Une règle revient dans deux de nos sources, SEMAE et FREDON : ne jamais couper plus d’un tiers de la hauteur de l’herbe en une tonte.

## Quelle hauteur viser

Les sources ne sont pas d’accord entre elles. SEMAE donne 1 à 3 cm pour un gazon d’ornement, FREDON 5 cm au moins, Jardiner autrement 10 cm en été. Notre calendrier retient un milieu :

- 5 à 6 cm en saison ;
- 7 à 8 cm l’été ou en terrain sec ;
- 6 à 8 cm pour la dernière tonte avant l’hiver, selon Husqvarna.

Après l’hiver, commencez haut, puis baissez la coupe par paliers. Et laissez l’herbe coupée sur place : elle rend de l’azote au sol, d’après Jardiner autrement.

## À éviter

Le sulfate de fer contre la mousse. La fiche FREDON le déconseille et propose d’aérer le sol, puis de chauler légèrement à l’automne. D’après la même fiche, la mousse signale un sol acide, tassé ou à l’ombre.

## Si vous avez un robot

Une herbe effilochée ou blanchie au bout signale des lames usées, selon le guide Husqvarna. Sur un Automower, elles se changent toutes les 3 à 6 semaines en saison. Pour une autre marque, la notice du modèle passe avant ce conseil.

[Voir les gestes du mois] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### bienvenue-3 — 7 jours après l’inscription
- Objet : Choisir un robot tondeuse sans se tromper de taille
- Aperçu : 4 questions, 2 minutes, et la marge à prendre sur la surface.

```text
Bonjour,

Dernier e-mail de bienvenue. Si vous tondez encore à la main ou si votre robot arrive en fin de vie, voici comment nous aidons à choisir.

D’abord, ce que nous ne faisons pas : nous n’essayons pas les robots. Nos avis comparent les fiches des fabricants, les essais publiés par la presse et les retours de propriétaires, et le disent à chaque fois.

## Commencer par le jardin

Le quiz pose 4 questions sur votre terrain et donne un résultat en 2 minutes.

[Faire le quiz] https://quel-robot-tondeuse.com/quiz

La surface annoncée par un fabricant est un maximum. Prenez 20 à 30 % de marge : pour 600 m² de pelouse, visez un robot donné pour 750 m² environ. L’outil de surface fait le calcul pour vous.

[Mesurer ma surface] https://quel-robot-tondeuse.com/superficie

## À éviter

Acheter sur une promotion sans regarder le prix des semaines d’avant. Notre page des codes promo n’affiche un code qu’après l’avoir contrôlé, avec sa date. Quand nous n’avons rien de confirmé, elle l’écrit.

[Voir les codes contrôlés] https://quel-robot-tondeuse.com/code-promo

La suite arrive au début du mois prochain : les gestes du mois pour la pelouse.

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

## Lettre du mois (12 lettres, tirées du calendrier du gazon)

Une offre n’apparaît dans une lettre que si elle est confirmée dans `lib/promos.ts`, avec sa date de contrôle.

### lettre-01 — Début janvier
- Objet : À faire en janvier : repos
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de janvier pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Ne pas marcher sur le gazon gelé : les brins cassent et brunissent. (source : Jardiner autrement, Hubo)
- Ramasser les feuilles et les branches restées sur la pelouse. (source : Royal Horticultural Society)
- Repérer les zones de mousse ou d’eau qui stagne. Elles diront où aérer au printemps. (source : FREDON)

## Pour le robot

Robot et station rangés à l’intérieur, au-dessus de 0 °C. Vérifier la charge comme le demande la notice. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Le robot passe l’hiver à l’intérieur. La fiche à imprimer reprend les 7 étapes.

[La fiche hivernage] https://quel-robot-tondeuse.com/fiche-hivernage-robot-tondeuse

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-02 — Début février
- Objet : À faire en février : préparer
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de février pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- En fin de mois, si le sol n’est ni gelé ni détrempé : compost fin, 0,5 kg/m², sur les zones à trèfle. (source : FREDON)
- Ramasser les débris laissés par l’hiver. (source : Husqvarna)
- Acheter les semences de regarnissage et l’engrais pour gazon, sans encore les épandre. (repère indicatif, sans source lue)

## Pour le robot

Commander lames et vis si elles n’ont pas été changées à l’automne. Elles se changent ensemble. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

C’est le bon mois pour choisir un robot avant la reprise de la tonte.

[Faire le quiz] https://quel-robot-tondeuse.com/quiz

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-03 — Début mars
- Objet : À faire en mars : reprise
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de mars pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Première tonte quand l’herbe atteint 5 à 7 cm. La pousse démarre quand le sol approche 8 °C. (source : Husqvarna, Hubo)
- Commencer haut, puis baisser la coupe par paliers. (source : Husqvarna)
- Scarifier si le feutre est épais, sur 2 à 4 mm de profondeur. Une fois par an suffit. (source : SEMAE, Jardiner autrement, FREDON)

## Pour le robot

Réinstaller la station, charger le robot, dégager son chemin (branches, pommes de pin). (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

La tonte reprend. Si vous hésitez encore sur un robot, le quiz pose 4 questions.

[Faire le quiz] https://quel-robot-tondeuse.com/quiz

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-04 — Début avril
- Objet : À faire en avril : nourrir et regarnir
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes d’avril pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Épandre un engrais pour gazon, puis arroser pour faire fondre les granulés. (source : SEMAE, FREDON)
- Regarnir les trous après la scarification, dans un sol à 10 °C au moins. (source : SEMAE)
- Tondre 1 à 2 fois par semaine, sans jamais couper plus d’un tiers de la hauteur. (source : SEMAE, FREDON)

## Pour le robot

Exclure les parties semées du parcours du robot jusqu’à leur première tonte. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-05 — Début mai
- Objet : À faire en mai : pleine pousse
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de mai pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Garder 5 à 6 cm de hauteur. (source : SEMAE, FREDON)
- Par temps sec, arroser 1 fois par semaine, le soir, 4 à 5 L/m². (source : SEMAE)
- Laisser les déchets de tonte sur place : ils rendent de l’azote au sol. (source : Jardiner autrement)

## Pour le robot

Vérifier les lames. Une herbe effilochée ou blanchie au bout signale des lames usées. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-06 — Début juin
- Objet : À faire en juin : avant la chaleur
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de juin pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Remonter la coupe vers 7 à 8 cm avant les fortes chaleurs. (source : SEMAE)
- Arroser le soir ou la nuit, jamais en plein jour. (source : SEMAE)
- Consulter VigiEau avant d’arroser : les restrictions changent d’un département à l’autre. (source : ministère de la Transition écologique)

## Pour le robot

Placer la station à l’ombre. Réduire les passages si l’herbe pousse moins. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-07 — Début juillet
- Objet : À faire en juillet : protéger
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de juillet pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Coupe haute : 7 à 8 cm, ou 10 cm pour laisser de la place aux insectes. (source : SEMAE, Jardiner autrement)
- Respecter les restrictions d’eau du département, de l’alerte à la crise. (source : ministère de la Transition écologique)
- Ne pas semer ni mettre d’engrais en pleine sécheresse. (repère indicatif, sans source lue)

## Pour le robot

Moins de passages par temps sec. Sur un Automower, lames à changer toutes les 3 à 6 semaines en saison. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-08 — Début août
- Objet : À faire en août : patienter
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes d’août pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Une pelouse jaunie par la sécheresse n’est pas forcément morte. Attendre les pluies avant de juger. (repère indicatif, sans source lue)
- Garder la coupe haute. (source : SEMAE, Jardiner autrement)
- En fin de mois, préparer les semences : la meilleure période de semis commence. (source : SEMAE)

## Pour le robot

Nettoyer lames, roues et capteurs. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-09 — Début septembre
- Objet : À faire en septembre : le mois des semis
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de septembre pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Semer ou regarnir : de fin août à septembre, le sol est encore chaud et les pluies reviennent. (source : SEMAE, Jardiner autrement)
- Scarifier si ce n’est pas fait au printemps, puis regarnir. (source : SEMAE, Jardiner autrement)
- Tondre un semis pour la première fois vers 5 semaines, coupe haute. (source : SEMAE)

## Pour le robot

Redescendre la coupe par paliers. Exclure les zones semées du parcours. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-10 — Début octobre
- Objet : À faire en octobre : préparer l’hiver
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes d’octobre pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Engrais d’automne, pauvre en azote : trop d’azote en fin de saison favorise les maladies. (source : Royal Horticultural Society)
- Si la mousse revient, chaulage léger à la dolomie. La mousse signale un sol acide, tassé ou ombragé. (source : FREDON)
- Ramasser les feuilles sans attendre. (source : Royal Horticultural Society, Hubo)

## Pour le robot

Laisser l’herbe à 6 à 8 cm avant l’hiver. Sur un Automower, la protection antigel garde le robot à la station sous 5 °C. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Le rangement du robot approche. La fiche à imprimer reprend les 7 étapes.

[La fiche hivernage] https://quel-robot-tondeuse.com/fiche-hivernage-robot-tondeuse

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-11 — Début novembre
- Objet : À faire en novembre : dernière tonte
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de novembre pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Dernière tonte quand la pousse s’arrête, herbe laissée à 6 à 8 cm. (source : Husqvarna, Hubo)
- Retirer les feuilles mortes. (source : Hubo)
- Aérer les zones où l’eau stagne, pour que la pelouse sèche vite. (source : Royal Horticultural Society)

## Pour le robot

Nettoyer, poser des lames neuves, charger la batterie selon la notice, ranger robot et station à l’intérieur. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

C’est le mois du rangement. La fiche à imprimer reprend les 7 étapes.

[La fiche hivernage] https://quel-robot-tondeuse.com/fiche-hivernage-robot-tondeuse

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```

### lettre-12 — Début décembre
- Objet : À faire en décembre : repos
- Aperçu : Trois gestes pour la pelouse, un pour le robot.

```text
Bonjour,

Voici les gestes de décembre pour la pelouse. Ils valent pour l’ouest et la plaine. Dans le nord, le sud ou en montagne, le calendrier du site décale les dates.

## Pour la pelouse

- Laisser la neige en place : elle isole le gazon. (source : Hubo)
- Ne pas marcher sur le gazon gelé. (source : Jardiner autrement)
- Noter le bilan de l’année : zones à regarnir, mousse, ombre. (repère indicatif, sans source lue)

## Pour le robot

Robot rangé au sec, au-dessus de 0 °C. (source : Husqvarna)

[Régler le calendrier sur ma région] https://quel-robot-tondeuse.com/calendrier-du-gazon

Le robot passe l’hiver à l’intérieur. La fiche à imprimer reprend les 7 étapes.

[La fiche hivernage] https://quel-robot-tondeuse.com/fiche-hivernage-robot-tondeuse

Vous recevez cet e-mail parce que vous vous êtes inscrit à la lettre du jardin sur quel-robot-tondeuse.com. Responsable des données : Mathias Cetani. Nous n’essayons pas les robots : nos conseils rapportent ce qu’écrivent les sources citées.

Se désinscrire en un clic : {{ unsubscribe }}
```
