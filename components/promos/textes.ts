import type { FaqItem } from './Faq'

/** FAQ des pages « code promo ». Sans marque : page mère. */
export function faqCodePromo(marque?: string): FaqItem[] {
  const m = marque ? ` ${marque}` : ''
  return [
    {
      q: `Un code promo${m} trouvé sur un site de coupons fonctionne-t-il ?`,
      a: 'Nous n’en avons contrôlé aucun. Saisissez-le dans le panier avant de payer : si le total ne change pas, le code est périmé ou n’a jamais existé.',
    },
    {
      q: 'Un coupon Amazon est-il un code promo ?',
      a: 'Sur Amazon, un coupon est une case à cocher sur la fiche du produit, sans code à recopier. La remise s’applique à l’étape du paiement. Le vendeur peut le retirer d’un jour à l’autre.',
    },
    {
      q: `Peut-on cumuler un bon de réduction${m} avec une promotion en cours ?`,
      a: 'Le marchand en décide. Ses conditions figurent près du champ de saisie du code ou dans ses conditions de vente. Lisez-les avant de compter sur le cumul.',
    },
    {
      q: 'Quand cette page est-elle mise à jour ?',
      a: 'La date écrite en haut de la page est celle de notre dernier contrôle. Elle change seulement quand nous avons refait le tour des marques et des marchands.',
    },
  ]
}

/** FAQ des pages « Black Friday ». Sans marque : page mère. */
export function faqBlackFriday(dateBf: string, dateCm: string, marque?: string): FaqItem[] {
  const robot = marque ? `un robot tondeuse ${marque}` : 'un robot tondeuse'
  return [
    {
      q: 'Quelle est la date du Black Friday 2026 ?',
      a: `Le Black Friday tombe le vendredi ${dateBf} et le Cyber Monday le lundi ${dateCm}. Les marques lancent souvent leurs offres plusieurs semaines avant.`,
    },
    {
      q: 'Un prix barré de Black Friday est-il fiable ?',
      a: 'La loi impose au marchand d’indiquer le prix le plus bas pratiqué dans les 30 jours avant la réduction. Regardez ce prix avant le pourcentage affiché : un robot peut être vendu au même tarif depuis des semaines.',
    },
    {
      q: `Faut-il attendre le Black Friday pour acheter ${robot} ?`,
      a: 'Les baisses les plus nettes de l’année arrivent entre la fin août et novembre, et le Black Friday ne donne pas toujours le prix le plus bas. Si le prix du jour est déjà au niveau du plus bas que vous avez vu pour ce modèle, attendre ne rapporte rien de sûr.',
    },
    {
      q: `Peut-on renvoyer ${robot} acheté pendant le Black Friday ?`,
      a: 'Un achat en ligne ouvre un délai légal de rétractation de 14 jours. Déballez le robot tout de suite et lancez un cycle de tonte pendant ce délai, hors période de gel. La garantie légale de 2 ans court dès la livraison.',
    },
  ]
}
