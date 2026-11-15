/**
 * ArticleImage — image dans le corps d'un article.
 * Usage MDX :
 *   <ArticleImage src="/images/blog/mon-image.webp" alt="Description de l'image" caption="Source : notice 2026" />
 * Server Component. Les attributs sont des chaînes (compileMDX ne passe pas d'expressions).
 */

import Image from 'next/image'

type ArticleImageProps = {
  src: string
  alt: string
  caption?: string
  width?: string
  height?: string
}

export function ArticleImage({ src, alt, caption, width = '760', height = '428' }: ArticleImageProps) {
  const w = parseInt(width, 10) || 760
  const h = parseInt(height, 10) || 428

  return (
    <figure className="fig">
      <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 760px) 720px, 100vw" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
