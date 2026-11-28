/**
 * VignetteProduit — photo du produit (next/image), ou l'initiale de la marque sur fond ivoire quand il n'y en a pas.
 * prioritaire : photo du haut de fiche, chargée tout de suite (c'est le plus grand élément du premier écran).
 */
import Image from 'next/image'

type Props = { nom: string; img?: string | null; format?: 'carre' | 'large'; sizes?: string; prioritaire?: boolean }

export function VignetteProduit({ nom, img, format = 'carre', sizes = '84px', prioritaire = false }: Props) {
  return (
    <div className={`g-pic g-pic--${format}${img ? '' : ' g-pic--vide'}`}>
      {img ? (
        <Image src={img} alt={nom} fill sizes={sizes} loading={prioritaire ? 'eager' : 'lazy'} fetchPriority={prioritaire ? 'high' : undefined} />
      ) : (
        <span aria-hidden="true">{nom.charAt(0)}</span>
      )}
    </div>
  )
}
