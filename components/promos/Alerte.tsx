import { InscriptionLettre } from '@/components/tools/InscriptionLettre'
import { isNewsletterConfigured } from '@/lib/newsletter/brevo'

/** Inscription à la lettre du jardin depuis une page promo. Rien ne s'affiche tant que Brevo n'est pas réglé. */
export function Alerte({ titre, texte, source }: { titre: string; texte: string; source: string }) {
  if (!isNewsletterConfigured()) return null
  return (
    <section className="card card-p stack" aria-labelledby="alerte-titre">
      <h2 id="alerte-titre" className="h-md">{titre}</h2>
      <p className="small muted">{texte}</p>
      <InscriptionLettre source={source} />
    </section>
  )
}
