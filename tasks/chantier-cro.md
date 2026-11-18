# Chantier CRO — faire cliquer vers les marchands (lancé le 18/11/2026)

Demande du propriétaire : « le site convertit vraiment pas en affiliation, on doit vraiment bosser le CRO ».
Revenu Amazon : 0 € par mois. Règles d'honnêteté inchangées : aucune note, aucun classement ajusté pour vendre,
aucun prix inventé, aucune fausse urgence.

## Déjà en ligne (Claude en session, 18/11)
- Carte « Notre choix » en haut de chaque guide d'achat et comparatif : premier robot cité, ses prix Amazon, Cdiscount, Fnac,
  un bouton vers l'offre datée la moins chère (`components/blog/NotreChoix.tsx`).
- Encarts produits : une ligne par vendeur quand le robot est chez Cdiscount ou Fnac (`components/blog/PriceRows.tsx`).
- Tableau « Où acheter ces robots au meilleur prix ? » en fin d'article (`components/blog/PrixCompares.tsx`).
- Liens Amazon : une adresse qui n'est pas Amazon devient une recherche Amazon du robot avec l'étiquette
  (`amazonHref`, `lib/utils/affiliate.ts`) ; les fiches fausses ou mortes passent par `content/offres/amazon-corrections.json`.

Tout repose sur les encarts `<ProductCTA name="…" url="https://www.amazon.fr/dp/ASIN" price="…" hook="…" />` :
un article sans encart n'a ni carte, ni tableau, ni bouton. **Le nom doit être le nom exact du modèle** (le relevé Cdiscount
et Fnac du lundi le cherche tel quel).

## À faire

### Contenu QRT — priorité 1 : les 32 articles d'achat sans aucun encart produit
Pour chacun : 2 à 5 `<ProductCTA>` des robots dont l'article parle déjà (aucun robot nouveau ajouté pour vendre),
ASIN vérifié sur la page Amazon (titre = bon modèle, sinon pas d'ASIN : mettre `url="https://www.amazon.fr/s?k=<nom>"`),
le premier encart = le robot conseillé par l'article. Un lot de 8 articles par passage, cochés ici.
- [ ] comment-choisir-robot-tondeuse (guide-achat)
- [ ] dreame-a2-3000-vs-dreame-a3-awd-pro-3500-comparatif (comparatif)
- [ ] dreame-a2-3000-vs-mammotion-luba-3-awd-3000-comparatif (comparatif)
- [ ] ecovacs-goat-a1600-lidar-pro-vs-segway-navimow-i220-lidar-comparatif (comparatif)
- [ ] ecovacs-goat-a3000-vs-dreame-a2-comparatif (comparatif)
- [ ] ecovacs-goat-a3000-vs-mammotion-luba-3-awd-3000-comparatif (comparatif)
- [ ] gardena-sileno-vs-worx-landroid-comparatif (comparatif)
- [ ] mammotion-yuka-1500-vs-segway-navimow-i215-lidar-comparatif (comparatif)
- [ ] mammotion-yuka-mini-2-1000-vs-husqvarna-automower-310-mark-ii-comparatif (comparatif)
- [ ] meilleur-robot-tondeuse-pas-cher-top-2026 (guide-achat)
- [ ] quel-robot-tondeuse-jardin-500-1000-m2-moyen (guide-achat)
- [ ] quel-robot-tondeuse-pour-1000m2-grand-terrain (guide-achat)
- [ ] quel-robot-tondeuse-pour-mon-jardin (guide-achat)
- [ ] robot-tondeuse-500m2 (guide-achat)
- [ ] robot-tondeuse-antivol-vol-protection (guide-achat)
- [ ] robot-tondeuse-combien-ca-coute-vraiment (guide-achat)
- [ ] robot-tondeuse-connecte-wifi-smart-home-guide (guide-achat)
- [ ] robot-tondeuse-connecte (guide-achat)
- [ ] robot-tondeuse-grande-surface (guide-achat)
- [ ] robot-tondeuse-haut-de-gamme (guide-achat)
- [ ] robot-tondeuse-lidar-top-5-2026 (guide-achat)
- [ ] robot-tondeuse-multi-zones (guide-achat)
- [ ] robot-tondeuse-ou-tondeuse-classique-comparatif (comparatif)
- [ ] robot-tondeuse-pas-cher (guide-achat)
- [ ] robot-tondeuse-rapport-qualite-prix (guide-achat)
- [ ] robot-tondeuse-rtk (guide-achat)
- [ ] robot-tondeuse-securite-enfants-animaux (guide-achat)
- [ ] robot-tondeuse-terrain-complexe-pentes-obstacles (guide-achat)
- [ ] robot-tondeuse-terrain-complexe (guide-achat)
- [ ] test-husqvarna-automower-450x-nera-avis (guide-achat)
- [ ] test-mammotion-luba-2-awd-avis (guide-achat)
- [ ] test-segway-navimow-i-series-avis (guide-achat)

### Contenu QRT — priorité 2 : les 6 fiches Amazon fausses ou mortes
Dans `content/offres/amazon-corrections.json`, chaque ligne est un ASIN qui ouvre un autre modèle ou une page morte
(vérification du 18/11). Pour chacune : trouver le bon ASIN sur Amazon.fr (titre = bon modèle), le remplacer dans
les articles et `content/produits`, puis retirer la ligne. Attention : B0GJRDXKBH est le bon ASIN du Dreame A3 AWD Pro **5000**,
seul l'usage pour le modèle 3500 est faux.

### Dév QRT
- Compter les clics Cdiscount et Fnac : aujourd'hui seuls les clics Amazon passent par `/go/` (journaux). Faire passer les liens Awin
  par une adresse `/go/<slug-ou-nom>/<cdiscount|fnac>` qui redirige vers le lien Awin relevé, et les afficher dans le centre de contrôle
  avec les clics par bloc (`choix-haut`, encart, tableau).
- Articles gazon et dépannage : un seul encart utile en fin d'article (pièce, robot adapté), jamais la carte « Notre choix ».

### Croissance QRT
- Chaque premier lundi du mois : relancer `python3 -I ~/tools/asin-check.py` sur les ASIN du site et signaler les nouvelles fiches mortes.

### Chef QRT
- Contrôler à 390 px, sur 3 articles d'achat par passage : carte en haut, prix lisibles, bouton dans le premier écran, tableau en fin.
- Suivre chaque lundi les clics vers les marchands par bloc et écrire dans le bilan ce qui marche.
