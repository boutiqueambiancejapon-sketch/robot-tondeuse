# Guide SEO & GEO — Rédaction

Ce fichier est la référence unique pour tout contenu rédigé sur le site.
Lire AVANT la première ligne de tout article ou page de contenu.

---

## 1. Philosophie rédactionnelle

Chaque contenu doit répondre à une seule question : **pourquoi lire cette page plutôt qu'une autre ?**

Trois piliers : **expertise, preuve, utilité.**

- **Expertise** : chaque affirmation est traçable (source, expérience, raisonnement)
- **Preuve** : données chiffrées, exemples concrets, cas réels
- **Utilité** : chaque paragraphe fait avancer le lecteur vers une décision ou une compétence

**Posture** : écrire comme un expert qui parle à un pair légèrement moins avancé. Voix directe, parfois opinionée, jamais neutre au point d'être creuse.

---

## 2. Anti-patterns IA — Ce qu'il faut bannir

### Patterns lexicaux interdits

**Adverbes et intensificateurs vides** : ~~crucial, essentiel, fondamental, incontournable, véritablement, réellement, littéralement~~

**Formules d'introduction creuses** :
- ~~"Dans le monde actuel / d'aujourd'hui..."~~
- ~~"Il est important de noter que..."~~
- ~~"Il convient de souligner que..."~~
- ~~"Nous allons voir dans cet article..."~~
- ~~"En conclusion, nous pouvons dire que..."~~

**Faux équilibre** : ~~"D'un côté... de l'autre côté..."~~ sans prise de position finale

**Méta-commentaires** : ~~"Cet article vous donnera toutes les clés pour..."~~

### Patterns structurels interdits

| Pattern IA | Alternative humaine |
|---|---|
| Introduction > 3 points > Conclusion | Narration avec tension > résolution |
| Chaque H2 suivi de 3 bullets identiques | Paragraphes de densité variable |
| Même longueur pour chaque section | Court si simple, long si complexe |
| Définition systématique de chaque terme | Définir uniquement si le lecteur ne connaît pas |
| Rappel de la question en conclusion | Conclusion qui ouvre, pas qui referme |
| Listes de 5 items parallèles parfaits | Items de longueur et structure variées |

### Test avant publication

Soumettre à au moins 2 détecteurs IA. Seuil : score "humain" >= 85%.

---

## 3. Avant de rédiger

### Analyse concurrentielle (obligatoire)
- Identifier les 3 premiers résultats Google sur le mot-clé cible
- Noter : angle, structure H2, longueur, FAQ, données structurées
- Trouver l'angle manquant ou l'info que personne ne donne
- Identifier le "content gap" : ce que les concurrents ne disent pas

### Intention de recherche
| Type | Signal | Réponse attendue |
|---|---|---|
| Informationnelle | "qu'est-ce que", "comment", "pourquoi" | Réponse directe dès le premier paragraphe |
| Transactionnelle | "meilleur", "comparatif", "acheter" | Tableau comparatif + CTA affilié |
| Navigationnelle | nom de marque, nom de produit | Fiche produit ou guide d'achat |
| Locale | "près de moi", ville | Non applicable (site national) |

### Questions satellites
Lister les 5 questions les plus cherchées autour du sujet (PAA, AlsoAsked, autocomplétion Google). Chacune doit être couverte dans le corps ou la FAQ.

---

## 4. Structure d'article

### Squelette obligatoire
```
H1 — mot-clé principal + année dynamique si "édition courante"
  Chapô — réponse directe en 2-3 phrases (position zéro)
  TL;DR — 3 bullets max (si article > 600 mots)

H2 — sous-thème 1 (question si possible)
  Réponse directe dès la première phrase (< 60 mots)
  Développement, données, exemples
  Lien interne contextuel

H2 — sous-thème 2
  ...

H2 — FAQ (6 questions minimum)
  JSON-LD FAQPage généré automatiquement

AuthorCard en bas d'article
```

### Longueur cible
| Type | Mots | FAQ min |
|---|---|---|
| Article blog | 1 200 – 2 000 | 6 |
| Page pilier / guide | 2 000 – 3 500 | 8 |
| Fiche produit | 300 – 600 | 4 |

### Densité et lisibilité
| Élément | Valeur cible |
|---|---|
| Densité mot-clé principal | 0,5% – 1,5% |
| Longueur paragraphe | 3 – 5 phrases |
| Longueur phrase | 15 – 25 mots |
| Ratio texte / listes à puces | >= 70% texte courant |

**Règle des 3 premiers paragraphes** : le mot-clé principal, sa définition contextuelle et la promesse de valeur doivent apparaître avant le premier H2.

---

## 5. Règles SEO on-page

### Titres et meta
- `title` : mot-clé en début + différenciateur en fin — max 60 caractères
- `description` : réponse directe à l'intention, verbe d'action — max 155 caractères
- H1 unique par page, ne répète pas le title mot pour mot (variante naturelle)
- Hiérarchie stricte : H1 > H2 > H3, jamais de saut

### H2 formulés en questions
Les H2 interrogatifs correspondent aux requêtes réelles (PAA, recherche vocale) et signalent aux LLM que la section est une réponse extractible.

| Format | Exemple | Usage |
|---|---|---|
| Comment... | Comment choisir son robot tondeuse ? | Processus, décision |
| Pourquoi... | Pourquoi mon gazon jaunit ? | Argumentation, cause |
| Quelle est la différence... | Husqvarna ou Mammotion ? | Comparaison |
| Quand... | Quand scarifier sa pelouse ? | Temporalité |
| Faut-il... | Faut-il un fil périphérique ? | Recommandation directe |

**Règle** : le premier paragraphe sous un H2 interrogatif contient la réponse en moins de 60 mots. Les paragraphes suivants développent et illustrent.

### Années dynamiques
| Type | Exemple | Traitement |
|---|---|---|
| Edition courante | "Guide 2026", "Meilleur X 2026" | `currentYear()` côté serveur |
| Date historique | "Fondé en 2012", "Sorti le 14/03/2024" | String littérale |

### Mots-clés et enrichissement sémantique
- Mot-clé principal dans : H1, premier paragraphe, 1 H2, meta description, alt image
- 3 à 5 variantes sémantiques (LSI) dans les autres H2/H3
- Entités nommées attendues dans le champ sémantique (marques, concepts, lieux)
- Densité naturelle, jamais de bourrage

### Images
- `alt` descriptif obligatoire (pas "image de..." mais description du contenu)
- Nommage fichier : `slug-descriptif.webp`
- `next/image` uniquement, jamais de `<img>` nu
- `priority` uniquement sur l'image LCP above-fold

---

## 6. GEO — Optimisation pour les moteurs génératifs

Les moteurs génératifs (ChatGPT, Perplexity, Gemini, Claude) ne cherchent pas la page qui matche la requête. Ils cherchent la source qui mérite d'être citée. Le contenu doit être **extractible, citable et attribuable**.

### Les 6 critères GEO

**1. Citabilité directe**
Chaque section contient au moins une phrase autonome qui répond complètement à une question sans contexte externe. Format : `[Sujet] est/fait [attribut] parce que [raison concrète].`

**2. Autorité de source**
Mentionner des sources datées, des études nommées, des institutions reconnues. Format : `Selon [Source] ([année]), [stat ou conclusion].`

**3. Structuration Q&R**
Questions dans les H2/H3, réponses dans les 50 premiers mots. Correspondance avec le format FAQ Schema et les patterns de réponse des LLM.

**4. Définitions opérationnelles**
Pour tout concept central, une définition courte et originale dans les 200 premiers mots.

**5. Données originales ou synthèses chiffrées**
Au moins un tableau, une comparaison ou une statistique mise en contexte par article.

**6. Fraîcheur signalée**
Date de rédaction/mise à jour dans la page et dans les métadonnées (`dateModified` en JSON-LD).

### Architecture d'un article GEO-ready (chunks autonomes)

Chaque H2 doit pouvoir exister comme réponse standalone à sa propre question de titre.

```
[CHUNK 1] Paragraphe d'intro : réponse directe en < 80 mots
[CHUNK 2] H2 interrogatif + réponse (< 60 mots) + développement (100-200 mots)
[CHUNK 3] Tableau précis + phrase de verdict
[CHUNK 4] Liste numérotée d'étapes avec verbes d'action
[CHUNK 5] Nuance ou exception ("sauf quand...", "attention si...")
[CHUNK 6] FAQ : questions formulées comme les utilisateurs les tapent, réponses < 80 mots
```

**Transitions** : pas de phrases-ponts génériques ("Maintenant que nous avons vu X, passons à Y"). Terminer le chunk sur sa propre conclusion. Commencer le suivant directement.

### E-E-A-T appliqué au GEO

- **Experience** : référence à une expérience terrain, un test réel, un cas vécu
- **Expertise** : vocabulaire technique maîtrisé, nuances, limites exposées
- **Authoritativeness** : citations de pairs, liens entrants, présence sur des sources tierces
- **Trustworthiness** : sources citées, date visible, auteur identifié

---

## 7. Listes et tableaux — Doctrine d'usage

### Quand utiliser un tableau
- Comparaison de 3+ items sur 3+ critères
- Données chiffrées (prix, specs, scores)
- Toujours un header row descriptif
- Suivi d'une phrase de verdict qui guide la décision

### Quand utiliser une liste à puces
- Enumération sans ordre naturel, 4 à 8 items
- En dessous de 4 items, écrire en prose
- Items de longueur et structure variées (pas parallèles parfaits)
- Au moins un item contient une nuance ou contredit l'intuition

```
Mauvais (robotique) :
- Optimiser les balises meta
- Améliorer la vitesse de chargement
- Créer du contenu de qualité

Bon (humain) :
- Balises meta : title et description en priorité, les autres ensuite
- Vitesse : LCP < 2,5s est le seuil critique, le reste est du bonus
- Contenu : la longueur ne fait pas la qualité, mais la couverture sémantique si
```

### Quand utiliser une liste numérotée
- Processus où l'ordre compte (étapes, priorités, classements)
- Tutoriels
- Top N avec justification de rang

### Format featured snippet
- Listes à puces pour les "top X" et "comment faire"
- Tableaux pour les comparatifs
- Paragraphe court (40-60 mots) pour les définitions

---

## 8. Maillage interne

### Règles
- Chaque article contient 2-4 liens internes contextuels
- Lien vers la page pilier de la catégorie
- Lien vers 1-2 articles de la même catégorie
- Lien vers 1 article d'une autre catégorie (maillage transversal)
- Ancres descriptives, jamais "cliquez ici" ou "lire la suite"
- Pas plus de 1 lien externe par 500 mots (vers sources de référence)

### Pages piliers
Les pages `/comparer/[categorie]` et `/choisir/[categorie]` sont les pages piliers.
Tout article de la catégorie doit pointer vers sa page pilier.

### Breadcrumbs
Format : Accueil > Catégorie > Article
JSON-LD BreadcrumbList sur toutes les pages sauf Home.

---

## 9. Liens externes et sources

### Règles de sourcing
- Chiffres et statistiques : toujours sourcés avec lien vers la source
- Préférer les sources primaires (études, rapports officiels, sites constructeurs)
- Sources d'autorité : sites gouvernementaux, études publiées, médias reconnus
- Liens externes en `target="_blank" rel="noopener"` (sauf affiliés)

### Liens affiliés
- Tous les liens Amazon passent par `addAffiliateTag()` ou `<AffiliateLink>`
- Tag affilié configuré dans `niche.config.ts`
- Attribut `rel="nofollow noopener sponsored"` obligatoire
- Disclosure visible sur chaque page contenant des liens affiliés

---

## 10. Données structurées (JSON-LD)

| Page | Schemas obligatoires | Schema complémentaire |
|---|---|---|
| Home | WebSite | |
| Article | Article + Person + BreadcrumbList + FAQPage | |
| Page auteur | Person | |
| Page pilier | BreadcrumbList | |
| Comparatif | ItemList | Product |
| Tutoriel | HowTo | Article |
| FAQ | FAQPage | Article |

### Article (champs obligatoires)
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "...", "url": "/auteurs/..." },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "publisher": { "@type": "Organization", "name": "..." },
  "description": "..."
}
```

### Person (page auteur)
```json
{
  "@type": "Person",
  "name": "...",
  "jobTitle": "...",
  "url": "https://domain/auteurs/slug",
  "description": "...",
  "sameAs": ["URL_LINKEDIN"]
}
```

---

## 11. FAQ

### Règles
- 6 questions minimum par article, 8 pour les pages piliers
- Questions formulées comme les utilisateurs les tapent (langage naturel)
- Réponse directe en première phrase (< 60 mots), développement ensuite
- JSON-LD FAQPage généré côté serveur
- Pas de FAQ générique, chaque question apporte une info unique

### Sources de questions
1. Google "People Also Ask" sur le mot-clé cible
2. Autocomplétion Google
3. Forums et commentaires (Reddit, forums spécialisés)
4. Questions réelles des utilisateurs du site

---

## 12. Gabarits de structure par format

### Article informatif (guide, définition)
```
H1 — Qu'est-ce que [sujet] / Comment [faire X]
  Intro (100-150 mots) : définition + contexte + promesse
H2 — Définition ou concept central
  H3 — Origine / ce que ce n'est pas
H2 — Comment ça fonctionne concrètement
  H3 — Mécanisme + exemple réel
H2 — Cas d'usage principaux
H2 — Limites et points de vigilance
H2 — FAQ (H3 par question)
Conclusion (80-120 mots) : synthèse + prochaine étape
```

### Article comparatif
```
H1 — [Option A] vs [Option B] : comparaison complète (année)
  Intro : contexte + critères annoncés
H2 — Présentation [Option A]
H2 — Présentation [Option B]
H2 — Comparaison critère par critère (tableau)
H2 — Pour quel profil choisir [A] ?
H2 — Pour quel profil choisir [B] ?
H2 — Notre verdict
FAQ
```

### Article tutoriel (HowTo)
```
H1 — Comment [accomplir X] en [Y étapes]
  Intro : problème + prérequis + résultat attendu
H2 — Ce dont vous avez besoin
H2 — Étape 1 : [Verbe + résultat]
H2 — Étape 2 : [Verbe + résultat]
...
H2 — Erreurs courantes à éviter
H2 — Aller plus loin
Conclusion
```

---

## 13. Checklist avant publication

### SEO technique
- [ ] Meta title unique, < 60 chars, mot-clé en début
- [ ] Meta description unique, < 155 chars, verbe d'action
- [ ] H1 unique, variante du title (pas identique)
- [ ] Hiérarchie H1 > H2 > H3 stricte, aucun saut
- [ ] JSON-LD Article + Person + BreadcrumbList + FAQPage
- [ ] Canonical défini
- [ ] Images : alt descriptif, next/image, format WebP

### Contenu
- [ ] Réponse directe dès le premier paragraphe (< 60 mots)
- [ ] Mot-clé principal dans : H1, intro, 1 H2, meta description
- [ ] 3-5 variantes sémantiques dans les H2/H3
- [ ] 2-4 liens internes contextuels
- [ ] Sources externes d'autorité citées
- [ ] FAQ 6+ questions, JSON-LD serveur
- [ ] Aucune année hardcodée pour "édition courante"
- [ ] Liens affiliés via addAffiliateTag() / AffiliateLink
- [ ] >= 1 200 mots (article blog)

### Anti-patterns IA
- [ ] Zéro formule creuse (section 2)
- [ ] Paragraphes de longueur variable
- [ ] Listes à puces avec items variés (pas parallèles parfaits)
- [ ] Au moins 1 prise de position ou nuance non évidente
- [ ] Au moins 1 retour d'expérience ou anecdote terrain
- [ ] Score détection IA >= 85% humain

### GEO
- [ ] Chaque H2 = chunk autonome (extractible sans contexte)
- [ ] >= 3 phrases citables par article
- [ ] >= 1 tableau avec verdict textuel
- [ ] Sources datées mentionnées
- [ ] dateModified dans JSON-LD

### E-E-A-T
- [ ] AuthorByline en haut d'article (nom + date + temps lecture)
- [ ] AuthorCard en bas d'article
- [ ] Page /auteurs/[slug] publiée et indexable
- [ ] Author JSON-LD dans l'article
- [ ] Référence à une expérience terrain dans l'article

### Rendu
- [ ] `curl` retourne le H1 sans JS
- [ ] Pas de contenu dans useEffect/useState
