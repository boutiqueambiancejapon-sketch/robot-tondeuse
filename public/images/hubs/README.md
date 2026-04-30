# Images des hubs

Dépose ici une image par hub/article au format `<slug>.<ext>` :

```
public/images/hubs/
├── robot-tondeuse-petit-jardin.jpg
├── robot-tondeuse-sans-fil-peripherique.jpg
├── meilleur-robot-tondeuse-2026.jpg
└── ...
```

**Formats supportés** : `.jpg`, `.png`, `.webp` (préférer WebP, ~150-300 KB).
**Dimensions recommandées** : 1600 × 900 (16:9) pour bonne qualité retina.

## Activation

Ouvrir le MDX du hub correspondant dans `content/articles/<slug>.mdx` et
ajouter au frontmatter :

```yaml
featureImage: /images/hubs/<slug>.jpg
```

L'image apparaîtra automatiquement :
- en grand sur la **carte featured** de la home (ArticleCard featured)
- en **backdrop fade** dans le header de l'article (avec H1 par-dessus)
- dans les balises Open Graph (partage social)

## Sans image

Tant qu'aucune image n'est définie, un **placeholder SVG génératif unique** est
affiché (composant `HubArtwork`, dérivé du slug). Aucune action requise — le
remplacement est instantané dès que tu ajoutes une vraie image et le frontmatter.
