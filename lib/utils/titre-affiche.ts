/**
 * Titre affiché dans la page (H1) d'un article.
 * Champ facultatif `h1` de l'en-tête MDX : un titre court (environ 30 signes) pour tenir
 * en 2 à 3 lignes à 390 px. Le `title` reste pour Google, l'onglet et les données structurées.
 */
export function titreAffiche(meta: { title: string; h1?: unknown }): string {
  return typeof meta.h1 === 'string' && meta.h1.trim() !== '' ? meta.h1.trim() : meta.title
}
