/**
 * PriceTag — un prix en chiffres alignés, dans la police des titres.
 * Le prix habituel et l'écart ne s'affichent que si `priceOriginal` est fourni :
 * ne le passer que pour un prix relevé et vérifié.
 * Server Component.
 */

type PriceTagProps = {
  price: number           // prix actuel en euros
  priceOriginal?: number  // prix habituel, vérifié
  currency?: string       // défaut '€'
  size?: 'sm' | 'md' | 'lg'
  showBadge?: boolean     // affiche l'écart en % si priceOriginal est fourni
  className?: string
}

function computeSavings(price: number, original: number): number {
  return Math.round(((original - price) / original) * 100)
}

export function PriceTag({
  price,
  priceOriginal,
  currency = '€',
  size = 'md',
  showBadge = true,
  className,
}: PriceTagProps) {
  const savings = priceOriginal ? computeSavings(price, priceOriginal) : 0

  return (
    <span className={['pricetag', `pricetag--${size}`, className].filter(Boolean).join(' ')}>
      {priceOriginal !== undefined ? (
        <s className="num muted" aria-label={`Prix habituel : ${priceOriginal} ${currency}`}>
          {priceOriginal.toFixed(2)}{currency}
        </s>
      ) : null}
      <span className="price num" aria-label={`Prix actuel : ${price} ${currency}`}>
        {price.toFixed(2)}{currency}
      </span>
      {showBadge && priceOriginal !== undefined && savings > 0 ? (
        <span className="drop" aria-label={`Économie de ${savings}%`}>
          -{savings}%
        </span>
      ) : null}
    </span>
  )
}
