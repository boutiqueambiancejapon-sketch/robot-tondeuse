import type { FaqItem } from './Faq'

type Crumb = { name: string; path: string }

/** JSON-LD d'une page promo : fil d'Ariane, et FAQPage quand la page a une FAQ. */
export function JsonLd({ siteUrl, crumbs, faq }: { siteUrl: string; crumbs: Crumb[]; faq?: FaqItem[] }) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${siteUrl}${c.path}` })),
  }
  const faqPage = faq && faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }
    : null
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqPage ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} /> : null}
    </>
  )
}
