# Usine produits : un moteur de sites comparateurs, QRT en pilote (décision du propriétaire, 28/11/2026)

> « Croise quel-canape.fr et QRT et vois ce qu'on peut faire pour créer un moteur comme le voyage, mais de produits avec Amazon ;
> quand ça décolle, on cherche d'autres programmes. » Accord : étude de niches d'abord, un nom de domaine par niche.

## Principe
- **Un seul code** (celui de QRT, déjà réglé par `niche.config.ts`), un réglage par site qui choisit la niche, comme `SITE_DEST` dans
  l'usine voyage (`~/sites-src/neko-voyage`). Ce qui est propre à la tonte sort du code commun vers les données de la niche ;
  preuve à chaque étape : QRT identique au caractère près (comme Miami et AJ lors du passage au moteur commun).
- **Par niche, seulement des données** : schéma des caractéristiques (`data/<niche>.json`, sources datées), barème de la note
  (critères et paliers), familles de critères des collections, menu, 1 ou 2 calculateurs, textes d'interface.
- **Fabriqué par le moteur** : fiche produit (note sur 10 + confiance, radar comparatif, données structurées), collections par critères
  (≥ 4 modèles, anti-doublon 70 %, nombre de modèles affiché dans le menu comme quel-canape.fr), classements, duels, bons plans avec
  historique de prix honnête (prix barré = plus bas des 30 derniers jours), « Mes projets » (mesures et budget gardés dans le navigateur).
- **Argent par paliers** : 1) Amazon (API Creators : recherche, prix, disponibilité, accessoires écartés, en cas de doute la fiche la plus
  chère) ; 2) quand une niche dépasse ~300 clics marchands par mois : programmes des enseignes et des marques (Awin, Effinity, programmes
  directs), chaque bouton vers le marchand qui rapporte le plus à prix égal pour le visiteur.
- **Contenu** : guides par les agents (une intention = une page, au plus quelques pages par nuit), GEO (réponse chiffrée en tête),
  IndexNow + Bing, mesure dans le tableau de bord commun du centre de contrôle. Jamais de page de méthode, jamais « testé ».

## Photos des produits (décision du propriétaire, 28/11/2026)
1. D'abord des photos qu'on a le droit d'héberger : flux marchands Awin (Fnac, déjà sur 22 fiches) et photos officielles des marques
   (kits presse / revendeurs), conditions de chaque programme ou marque vérifiées avant usage.
2. Sinon la photo Amazon, **jamais stockée chez nous** (règle du Partenariat Amazon : seule l'adresse peut être gardée, 24 h au plus,
   image servie depuis les serveurs d'Amazon). Son adresse est relevée dans la MÊME demande que le prix (getItems, ressource
   images.primary.large, 10 produits par demande) : aucun appel en plus ; relevé de nuit, adresse remplacée chaque jour.
3. Sans photo : l'initiale de la marque (comme la maquette), jamais une image inventée.

## Ce que quel-canape.fr fait et que QRT n'a pas encore (relevé du 28/11/2026)
1. Catalogue large (1 664 canapés, 112 fauteuils) tiré des flux marchands.
2. Méga-menu par critère avec le nombre de modèles (« Canapés d'angle 549 »).
3. Pages critère × critère avec note moyenne, nombre de modèles, prix médian en tête.
4. Calculateur (« tient-il entre vos murs ? »), quiz, « Mes projets ».
5. Promotions du moment.

## Ordre
1. **QRT pilote** (Dév QRT, après le radar et la note) : collections de `tasks/collections-v1.md` + menu avec nombres + calculateur de
   surface + bons plans avec historique ; catalogue complété par Catalogue QRT (toutes marques).
2. **Extraction du moteur** : ce qui est propre à la tonte → données de niche ; QRT identique.
3. **2e niche** choisie par l'étude (agent Étude niches produits → `tasks/etude-niches-produits.md`), nouveau domaine, même code.
