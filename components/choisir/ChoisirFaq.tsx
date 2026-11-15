import type { ChoisirFAQ } from '@/lib/choisir-content'

/** FAQ en accordéon V2, avec son JSON-LD FAQPage. Les réponses restent dans le HTML servi. */
export function ChoisirFaq({ faq }: { faq: ChoisirFAQ[] }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section id="faq">
      <h2>Questions fréquentes</h2>
      <div>
        {faq.map((item) => (
          <details className="acc" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  )
}
