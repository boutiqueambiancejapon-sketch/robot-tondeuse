# Journal de l'équipe — Quel Robot Tondeuse

Le plus récent en haut. Chaque agent ajoute 3 à 6 lignes datées à la fin de son passage.

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
