# Gabarits d'un site d'affiliation : types de pages, arborescence, SEO et widgets de conversion (usine produits, 28/11/2026)

Demande du propriétaire (28/11/2026) : « QRT est trop bourrin niveau gabarit et typologie. Recense les pages qu'un site d'affiliation
a besoin, un gabarit par typologie, et pense au SEO, à l'arborescence liée à la typologie et aux widgets CRO de chaque page. »
Ce fichier est la référence de l'usine produits (`tasks/usine-produits.md`) ; QRT garde ses adresses actuelles (aucune adresse indexée ne
change, sinon 301), les nouvelles pages et les nouvelles niches suivent les modèles ci-dessous. Design : plus d'air, un seul accent, la
réponse et le bouton marchand d'abord ; maquette au propriétaire avant tout changement de gabarit en ligne.

## 1. Arborescence (silo par catégorie, adresses sans année)

```
/                                         accueil
/{categorie}/                             hub de catégorie (pilier)                      ex. /robot-tondeuse/
/{categorie}/{criteres}/                  collection par critères (1 à 3)               ex. /robot-tondeuse/sans-fil-1000-m2/
/meilleur-{categorie}/                    classement général (l'année est dans le titre) ex. /meilleur-robot-tondeuse/
/meilleur-{categorie}-moins-{prix}-euros/ classement par budget
/{categorie}/{marque}-{modele}/           fiche produit et avis
/{categorie}/{marque}-{modele}/alternatives/
/comparatif/{a}-vs-{b}/                   duel
/comparer/                                comparateur 3-4 modèles (adresse partageable ?m=a,b,c ; canonical sans paramètre)
/marque/{marque}/                         page marque
/guide/{slug}/                            guide d'achat, question, dépannage, entretien
/bons-plans/  ·  /bons-plans/{categorie}/ bons plans (vraies baisses datées)
/code-promo/{marque}/                     code promo (seulement si un code réel ou une offre officielle existe)
/black-friday/{categorie}/                saison (Black Friday, soldes, printemps)
/outils/{slug}/                           calculateur, quiz
/mon-espace/  ·  /alertes/                favoris, projets, alertes de prix (noindex)
/auteur/{slug}/ · /a-propos/ · /contact/ · mentions, confidentialité   confiance (noindex sauf auteur et à propos)
```

Fil d'Ariane partout = l'arborescence (BreadcrumbList). Une intention = une page : deux pages ne visent jamais la même requête.

## 2. Fiche de chaque type

Pour chaque type : **intention**, **SEO** (titre, H1, indexation, données structurées), **maillage** (liens sortants obligatoires),
**gabarit** (ordre des blocs, du haut vers le bas), **widgets CRO**.

### 1. Accueil
- Intention : la marque, l'orientation. SEO : titre = promesse + catégorie ; Organization, WebSite (SearchAction).
- Maillage : hubs, classement principal, outil phare, bons plans, derniers avis.
- Gabarit : promesse en une phrase · 3 entrées (choisir par jardin, meilleurs, bons plans) · outil · classement du moment · catégories avec nombres.
- CRO : outil « quel modèle pour moi » en haut ; podium ; inscription aux alertes.

### 2. Hub de catégorie
- Intention : « robot tondeuse » (large). SEO : CollectionPage + ItemList des sous-pages ; FAQ.
- Maillage : toutes les collections de 1er niveau avec leur nombre de modèles, classements, marques, guides clés.
- Gabarit : réponse courte (pour qui, prix typique) · les 4 critères qui comptent, chacun vers sa collection · podium · marques · guides.
- CRO : podium avec boutons marchands ; calculateur ; alerte de prix de la catégorie.

### 3. Collection par critères
- Intention : longue traîne (critère × critère). SEO : naît en noindex ; indexée quand texte, FAQ et illustration sont relus ; ItemList,
  FAQPage ; titre = la question exacte ; anti-doublon (≥ 70 % de modèles communs = pas de page).
- Maillage : chaque fiche listée, collections sœurs (un critère de plus ou de moins), hub, classement voisin.
- Gabarit : H1 question · résumé chiffré (note moyenne, nombre de modèles, prix médian, mis à jour le) · « l'essentiel en 30 secondes » ·
  grille notée et triable · radar médian de la collection · FAQ.
- CRO : bouton marchand sur chaque carte avec prix daté ; « ajouter au comparateur » ; filtre ; alerte de prix.

### 4. Classement « meilleurs »
- Intention : « meilleur … » (commercial fort). SEO : ItemList ordonnée, Review éditoriale par produit, FAQ ; titre avec l'année.
- Maillage : fiche de chaque produit, duels entre voisins du classement, classements par budget, hub.
- Gabarit : podium (3 cartes : meilleur, meilleur prix, haut de gamme) visible sans faire défiler · tableau récapitulatif · un bloc par
  produit (pour qui, point fort, point faible, prix) · comment on a classé (2 lignes, pas de page de méthode) · FAQ.
- CRO : podium avec boutons ; barre collante « Notre n° 1 : X à 1 899 € » sur téléphone ; comparateur des 3 premiers.

### 5. Classement par budget
- Comme 4, avec « ce qu'on perd sous ce budget » et le meilleur choix juste au-dessus du budget.

### 6. Fiche produit et avis
- Intention : « avis X », « X prix ». SEO : Product + additionalProperty + Offer/AggregateOffer + Review éditoriale (note sur 10, jamais
  d'aggregateRating) + FAQ ; indexée si confiance ≥ 60 %.
- Maillage : collections du produit, marque, 2 duels, alternatives, classement où il figure.
- Gabarit : note + rang + prix du jour (marchand, date) · « l'essentiel en 30 secondes » (pour qui, pas pour qui, fort, faible, alternative) ·
  radar comparatif (2 concurrents par défaut) · caractéristiques · avis détaillé · FAQ.
- CRO : comparateur de prix multi-marchands (« prix le plus bas ») ; barre collante avec le prix ; alerte de prix ; favori ; alternatives.

### 7. Duel A contre B
- Intention : « A vs B ». SEO : titre « A ou B : lequel choisir ? » ; ItemList de 2 ; FAQ.
- Maillage : les 2 fiches, un 3e modèle souvent comparé, collection commune.
- Gabarit : verdict en une phrase (« A si…, B si… ») · radar à 2 couleurs · tableau des différences seulement · prix des deux.
- CRO : deux boutons marchands côte à côte ; « comparer avec un 3e ».

### 8. Comparateur 3-4 modèles
- Outil (noindex pour les combinaisons ; seules les combinaisons demandées deviennent des duels indexés).
- CRO : radar superposé, tableau, bouton par modèle, adresse partageable.

### 9. Page marque
- Intention : « robot tondeuse Mammotion ». SEO : Brand, ItemList de la gamme.
- Gabarit : la gamme en une ligne par modèle (pour quel jardin) · le modèle recommandé · codes promo réels · SAV et garantie (sources).
- CRO : boutons par modèle ; lien vers le code promo s'il existe.

### 10. Alternatives
- Intention : « alternative à X ». Gabarit : 3 à 5 modèles (moins cher, mieux noté, même usage) avec ce qu'on gagne et perd.

### 11-12. Guide d'achat, question, dépannage
- SEO : Article (auteur réel), FAQ ou HowTo quand il y a des étapes ; réponse en tête (2 lignes).
- Maillage : 1 lien vers la collection ou le classement qui achète, 2 guides voisins.
- CRO : encart « les modèles qui règlent ce problème » (3 cartes) au milieu du texte, pas en tête ; guide offert contre e-mail.

### 13-15. Bons plans, code promo, saison
- SEO : bons plans indexés par catégorie, pas de page par offre ; code promo indexé seulement avec un code réel ; saison : une page par
  catégorie et par saison, mise à jour, adresse stable d'une année sur l'autre.
- Gabarit : vraies baisses (prix barré = plus bas des 30 derniers jours), date de relevé, aucune fausse urgence.
- CRO : alerte de prix ; inscription « bons plans de la semaine ».

### 16. Outil, calculateur, quiz
- SEO : la page explique en 3 lignes ce que calcule l'outil (citable) ; WebApplication.
- CRO : le résultat = 3 modèles avec boutons ; enregistrer le résultat dans « mon espace ».

### 17-19. Mon espace, alertes, lettre
- noindex ; e-mail demandé seulement contre un service réel (alerte, résultat sauvegardé, guide).

### 20-22. Confiance et pratiques
- Auteur réel (Mathias, avatar illustré) et à propos indexés ; mentions, confidentialité, contact en noindex ; recherche et 404 qui proposent
  hub, classement et outil. **Aucune page de méthode** (décision du 28/11/2026).

## 2 bis. Les bonnes pratiques du e-commerce, à la sauce affiliation (propriétaire, 28/11/2026)

> « En gros on mixe les bonnes recos e-commerce, tournées à la sauce affiliation. »

| Pratique e-commerce | Version affiliation |
|---|---|
| Méga-menu par rayon avec nombres | méga-menu par critère avec le nombre de modèles (« Sans fil · 52 ») |
| Filtres à facettes + tri | filtres (surface, pente, guidage, budget, marque) et tri (note, prix, surface) sur les collections et le hub |
| Fiche produit : galerie, prix, stock, « ajouter au panier » collant | photo, note, prix du jour daté, disponibilité relevée, bouton marchand collant |
| Comparaison de prix / options | comparateur multi-marchands, « prix le plus bas » à taille égale |
| Guide des tailles | calculateur (« quelle surface, quelle pente ») qui filtre les modèles |
| « Souvent achetés ensemble » / « vous aimerez aussi » | « souvent comparé avec » (duels) et alternatives ; accessoires utiles (garage, lames) |
| Vus récemment | « vus récemment » et favoris gardés dans le navigateur |
| Panier | comparateur (jusqu'à 4) et « mon espace » |
| Avis clients | jamais de faux avis : note du site sur dossier + liens vers les avis publiés chez les marchands |
| Badges promo, compte à rebours | vraie baisse datée (plus bas des 30 jours) ; pas de compte à rebours |
| Relance panier abandonné | alerte de prix et e-mail « baisse sur ton favori » |
| Vue rapide | aperçu en un toucher depuis une grille (note, prix, pour qui) sans quitter la liste |

## 3. Bibliothèque de widgets de conversion (un composant chacun, réutilisé partout)

| Widget | Pages |
|---|---|
| Bouton marchand avec prix et date du relevé | 3, 4, 5, 6, 7, 9, 13 |
| Comparateur de prix multi-marchands, « prix le plus bas » | 6, 7 |
| Barre collante téléphone (produit ou n° 1 + prix) | 4, 5, 6 |
| Podium (3 cartes) | 1, 2, 4, 5 |
| « Pour qui / pas pour qui » | 6, 7, 10 |
| Radar comparatif | 3, 6, 7, 8 |
| Ajouter au comparateur / favori | 3, 4, 6 |
| Alerte de prix | 2, 3, 6, 13 |
| Outil d'orientation (quiz, calculateur) | 1, 2, 16 |
| Encart « modèles qui règlent ce problème » | 11, 12 |
| Guide offert contre e-mail | 11, 12, 13 |
| Alternatives (moins cher, mieux noté) | 6, 10 |

Règles : aucune fausse urgence, aucun faux avis, prix toujours daté, un seul bouton principal par écran, boutons jamais sur deux lignes.

## 4. Ordre de travail
1. Maquettes (vrais écrans sur iPhone, données QRT) des 4 types qui rapportent le plus : fiche produit, classement, collection, duel.
2. Après accord : composants de la bibliothèque, puis gabarits, puis bascule de QRT type par type (adresses inchangées).
3. Les autres types, puis la 2e niche directement sur ces gabarits.
