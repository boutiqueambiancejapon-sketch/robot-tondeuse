import Image from 'next/image'
import { MASCOTTES, type Pose } from '@/lib/mascotte'

type Props = { pose: Pose; size: number; className?: string; priority?: boolean }

/** Le robot mascotte, dans la pose qui correspond à la page. Décoratif : alt vide. */
export function Mascotte({ pose, size, className, priority = false }: Props) {
  const [w, h] = MASCOTTES[pose]
  return (
    <Image
      src={`/images/mascotte/robot-${pose}.webp`}
      alt=""
      width={w}
      height={h}
      sizes={`${size}px`}
      className={className}
      priority={priority}
      style={{ width: size, height: 'auto' }}
    />
  )
}
