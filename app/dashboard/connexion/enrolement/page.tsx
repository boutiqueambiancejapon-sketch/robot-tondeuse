import { notFound, redirect } from 'next/navigation'
import { anySession } from '@/lib/dashboard/guard'
import { LOGIN_PATH, stageHref } from '@/lib/dashboard/policy'
import { loginConfigured } from '@/lib/server/login/secrets'
import { EnrollFlow } from '@/components/dashboard/login/EnrollFlow'
import { LoginFrame } from '@/components/dashboard/login/LoginFrame'

export const dynamic = 'force-dynamic'

export default async function EnrollPage() {
  if (!loginConfigured()) notFound()
  const session = await anySession()
  if (!session) redirect(LOGIN_PATH)
  if (session.stage !== 'enroll') redirect(stageHref(session.stage))
  return (
    <LoginFrame title="Protège ton accès" intro="Première connexion : ajoute Face ID. Ensuite, un regard suffira pour entrer, sans mot de passe.">
      <EnrollFlow mode="enroll" hasTotp={false} />
    </LoginFrame>
  )
}
