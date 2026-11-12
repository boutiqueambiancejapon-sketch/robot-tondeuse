# Journal de l'équipe — Quel Robot Tondeuse

Le plus récent en haut. Chaque agent ajoute 3 à 6 lignes datées à la fin de son passage.

## 12/11/2026, 7 h 15 (UTC) — Chef QRT

- Site en ligne vérifié à 390 px (captures) : accueil, `/faut-il-tondre-pelouse-hiver`, `/blog/husqvarna`, `/quiz`. Tout répond (200). **Rien de cassé, rien à annuler.** D0 du Dév est bien en ligne ; lint, types : OK chez moi aussi.
- La rédaction de nuit a suivi le plan éditorial (sujet coché, image en ligne, aucun « testé ») → case « Plan éditorial » cochée dans « Fin de mission » (1 sur 9).
- Toujours en ligne : cartes sans image et « On a testé… » sur l'accueil. → **Dév** : D1 reste la priorité, plus « LIVE 2026 · MIS À JOUR CETTE SEMAINE » et « comparées en direct » (fausse fraîcheur). À 390 px, le panneau flottant du bas couvre l'accueil (mis dans « Ensuite »).
- Le propriétaire ne dira pas s'il y a eu de vrais essais : question retirée de sa liste. → **Contenu** : C2 reformule tout « testé » vécu (73 articles).
- **Croissance** : pas encore passé ; G1 inchangé, avec l'adresse de la future page Calendrier en tête du fichier.

## 12/11/2026, 0 h 15 (UTC) — Dév QRT

- **D0 fait : le lint est au vert** (77 erreurs → 0 ; 9 avertissements anciens, non bloquants). Maquettes `content/*.jsx` exclues du lint. Supprimés car plus utilisés depuis le 11/11 : `FlashBar`, `TestimonialsSection`, `TestimonialCard`.
- Contrôles : types OK, 34 tests OK, build OK (686 pages), `/`, `/blog`, `/quiz` en 200 en local, `/blog` vu à 390 px. Étiquette `sauvegarde-20261112-lint-vert` posée avant l'envoi.
- **Tout le monde peut de nouveau envoyer.** Le plan éditorial était déjà en ligne (la rédaction de nuit l'a emporté avec son article du 11/11).
- Reste pour **Dév** au prochain passage : D1a (images vides des cartes) et D1b (« Tests » dans le sous-titre du logo, l'accueil, l'OG…). Petit défaut vu à 390 px : barre de défilement grise sous les filtres de `/blog`.
- **Chef** : contrôler le site en ligne vers 1 h 15 (UTC) ; `DealsSection` et `Countdown` (fausse urgence) ne sont plus affichés mais restent dans le code : à supprimer en D1b.

## 12/11/2026, nuit (UTC) — Contenu QRT

- **C1 fait** : `tasks/plan-editorial.md` contient 60 sujets (hiver, dépannage, puis fin d'hiver et printemps), chacun avec une requête vérifiée par recherche web le 12/11, ses sources et les articles à lier. Tous les liens internes pointent vers des articles existants. 2 sujets écartés car déjà traités (batterie et station en hiver, dans `comment-hiverner-son-robot-tondeuse`).
- **Pas envoyé en ligne** : le lint échoue toujours (77 erreurs anciennes). Le plan est enregistré en local sur la branche en ligne. **La rédaction de nuit lit le plan sur GitHub** : tant que rien n'est envoyé, elle choisit seule son sujet. → **Dév**, D0 en priorité : l'envoi emportera aussi ce plan.
- **Honnêteté, plus large que prévu** : 76 articles (pas 22) contiennent « testé », « notre test », « sur mon terrain » ou proches : 118 passages. Certains sont peut-être légitimes (essai d'un organisme cité). → **Contenu**, C2 en 8 lots de 10, en commençant par les 8 articles « test-… » et les pages les plus vues.
- Trouvé : `hivernage-robot-tondeuse` n'a que 21 lignes et double `comment-hiverner-son-robot-tondeuse` (243 lignes). À fusionner plus tard (redirection), sans rien supprimer avant l'accord du Chef.
- **Croissance** : le sujet 18 du plan (calendrier de la pelouse mois par mois) doit reprendre tes sources G1 ; dis-moi l'adresse de la future page Calendrier pour que je pose les liens.

## 11/11/2026, 22 h (UTC) — Chef QRT

- Site en ligne vérifié à 390 px : accueil, `/husqvarna-automower-vs-mammotion-luba`,
  `/quel-robot-tondeuse-facile-a-utiliser-senior-guide-2026`, `/blog/husqvarna`. Tout répond (200). Rien à annuler.
- Trouvé 1 : images cassées sur les cartes d'articles (76 articles ont `featureImage: ""`). → **Dév**, étape D1a.
- Trouvé 2 : l'accueil et le menu disent encore « On a testé », « 30+ modèles testés », « +1 200 tests » ;
  22 articles racontent un essai vécu. → **Dév** D1b (gabarits), **Contenu** C2 et C3 (articles).
- Le plan éditorial est vide : la rédaction de nuit n'a pas de sujet. → **Contenu**, étape C1 en premier.
- **Croissance** : commencer par les sources du calendrier (G1). L'envoi d'e-mails attend le DNS.
- **Rien envoyé en ligne** : le lint échoue (77 erreurs anciennes, dont 65 dans les maquettes `content/*.jsx`).
  Types et build passent. Mes 2 fichiers sont enregistrés en local sur la branche en ligne. → **Dév**, étape D0
  en tout premier : réparer le lint, puis envoyer (l'envoi emportera aussi ce passage).
- Tableau de `tasks/equipe.md` réécrit avec une étape par agent ; liste du propriétaire complétée (3 points ajoutés).

## 11/11/2026 — mise en place (Claude, en session avec le propriétaire)

- Sauvegardes avant tout travail : étiquette `sauvegarde-avant-equipe-20261111-2144` sur GitHub, et copies
  complètes (historique, sources, version en ligne) dans `/home/administrator/backups/robot-tondeuse/`.
- Déjà fait aujourd'hui : fausse vente flash, bandeau « Vu dans » et faux avis retirés ; vraies photos
  (catalogue Fnac) sur 22 fiches robots, affichées dans les cartes produits des articles.
- Équipe créée : Chef, Dév, Contenu, Croissance. Rôles et règles dans `tasks/equipe.md`.
- À faire en premier : Chef découpe le plan ; Dév attaque le lot 0 ; Contenu écrit le plan éditorial.
