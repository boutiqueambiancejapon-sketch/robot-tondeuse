# Chantier « Deals » (demande du propriétaire, 28/11/2026)

> « Ajouter Deals dans le menu et faire un truc comme Dealabs : on suit toutes les offres flash Cdiscount, Fnac, Amazon de tous les
> produits liés au robot tondeuse, avec un filtre. » · « Analyse des deals à 12 h et à 00 h pour être certain de ne rien rater. »

## Déjà en place
- Relevé des flux Awin Cdiscount et Fnac : `~/Toutou/deploy/sites/qrt-offres.sh`, **toutes les 4 heures (0 h, 4 h, 8 h, 12 h, 16 h, 20 h, heure de Paris) depuis le 28/11**
  (timer `qrt-offres.timer`), écrit `content/offres/offres.json` (scripts/offres-awin.mjs) et pousse sur la branche en ligne.
- Page `/deals` et `lib/deals.ts` : règle « prix sous le plus bas des 30 jours précédents chez le même marchand », jamais de prix barré,
  de stock ni de compte à rebours. Liste vide aujourd'hui (pas d'historique).

## À faire (Dév QRT, par petites étapes vérifiées ; Chef QRT découpe et suit)
1. **Historique** : à chaque relevé, garder le prix daté de chaque produit et de chaque marchand (fichier `content/offres/historique/*.json`
   ou table de la base `qrt`), 90 jours glissants. Le plus bas des 30 jours se calcule sur cet historique, jamais sur un prix « conseillé ».
2. **Périmètre élargi** : tout l'univers robot tondeuse des flux, pas seulement nos fiches : robots, lames, batteries, garages et abris,
   câbles périphériques, stations et antennes RTK, pièces, plus tondeuses autoportées et robots de piscine (produits chers d'abord).
   Filtre par catégorie du flux et par marques suivies ; un produit hors sujet n'entre pas.
3. **Détection** : à chaque relevé, un produit entre dans les deals si prix < plus bas des 30 jours précédents (même marchand) ; il sort
   quand le prix remonte ou disparaît du flux. Chaque deal garde : prix, ancien plus bas, date et heure du relevé, marchand, lien affilié.
4. **Page Deals** (design V2, maquette au propriétaire avant mise en ligne) : liste par nouveauté ; filtres marchand, type de produit,
   marque, budget, surface de jardin (pour les robots), ampleur de la baisse ; badge « plus bas prix depuis 30 jours » ; « relevé le … à … ».
   **Ajout de « Deals » au menu.** Données structurées ItemList/Offer, titre et méta selon les règles de l'usine (≤ 60 caractères).
5. **Alerte e-mail** (Croissance QRT) : « préviens-moi si ce robot baisse » (liste Brevo QRT, double confirmation, désinscription en un clic).
6. **Amazon** : aucun prix automatique (lecture des pages interdite par Amazon) ; bouton « comparer chez Amazon » avec le lien affilié.
   Prix Amazon seulement avec l'API officielle (3 ventes en 180 jours) ou Keepa (payant) : décision du propriétaire en attente.
7. **Nouveaux marchands Awin** (Darty, Boulanger, ManoMano, Leroy Merlin, Castorama…) : inscription à faire par le propriétaire ;
   ajouter leur flux dans `awin.env` et `offres-awin.mjs` dès l'accord.

Interdits : prix barré non relevé par nous, pourcentage inventé, urgence (compte à rebours, stock), « meilleur prix garanti ».

## Amazon (28/11/2026)
Le propriétaire a des identifiants de l'API Amazon Creators (remplaçante de PA-API). Dépôt par `bash ~/Toutou/deploy/cle-amazon-creators.sh`
→ `~/.config/toutou/amazon.env` (AMAZON_CREATORS_ID, AMAZON_CREATORS_SECRET, AMAZON_PARTNER_TAG ; ne jamais afficher). Jeton :
POST https://api.amazon.co.uk/auth/o2/token (JSON, grant_type client_credentials, scope creatorsapi::default, 1 h, à mettre en cache) ;
prix : POST https://creatorsapi.amazon/catalog/v1/getItems, en-têtes Authorization Bearer, x-marketplace www.amazon.fr, corps
{itemIds (10 max), itemIdType ASIN, marketplace www.amazon.fr, partnerTag, resources ["offersV2.listings.price","offersV2.listings.availability"]}.
Accès au catalogue seulement avec 10 ventes qualifiées sur 30 jours : tant que l'API refuse, garder le bouton « comparer chez Amazon ».
