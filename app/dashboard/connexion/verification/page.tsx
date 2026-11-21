import { notFound, redirect } from 'next/navigation'
import { anySession } from '@/lib/dashboard/guard'
import { LOGIN_PATH, stageHref } from '@/lib/dashboard/policy'
import { factorsSummary } from '@/lib/server/login/factors'
import { loginConfigured } from '@/lib/server/login/secrets'
import { LoginFrame } from '@/components/dashboard/login/LoginFrame'
import { PasskeyButton } from '@/components/dashboard/login/PasskeyButton'
import { SecretForm } from '@/components/dashboard/login/SecretForm'

export const dynamic = 'force-dynamic'

export default async function VerifyPage() {
  if (!loginConfigured()) notFound()
  const session = await anySession()
  if (!session) redirect(LOGIN_PATH)
  if (session.stage !== 'second_factor') redirect(stageHref(session.stage))
  const factors = await factorsSummary()
  return (
    <LoginFrame title="Deuxième étape" intro="Mot de passe accepté. Confirme que c’est bien toi.">
      {factors.passkeys > 0 && <PasskeyButton next="/dashboard" direct={false} />}
      {factors.passkeys > 0 && factors.totp && <p className="or">ou</p>}
      {factors.totp && <SecretForm action="code" next="/dashboard" />}
    </LoginFrame>
  )
}
