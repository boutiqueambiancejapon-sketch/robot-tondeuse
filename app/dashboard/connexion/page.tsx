import { notFound, redirect } from 'next/navigation'
import { anySession } from '@/lib/dashboard/guard'
import { safeNext, stageHref } from '@/lib/dashboard/policy'
import { factorsSummary } from '@/lib/server/login/factors'
import { loginConfigured } from '@/lib/server/login/secrets'
import { LoginFrame } from '@/components/dashboard/login/LoginFrame'
import { PasskeyButton } from '@/components/dashboard/login/PasskeyButton'
import { SecretForm } from '@/components/dashboard/login/SecretForm'

export const dynamic = 'force-dynamic'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ suivant?: string }> }) {
  if (!loginConfigured()) notFound()
  const next = safeNext((await searchParams).suivant)
  const session = await anySession()
  if (session) redirect(stageHref(session.stage, next))
  const factors = await factorsSummary().catch(() => ({ passkeys: 0, totp: false }))
  return (
    <LoginFrame title="Tableau de bord" intro="Réservé au propriétaire de 10minlanguages.com.">
      {factors.passkeys > 0 && (
        <>
          <PasskeyButton next={next} direct />
          <p className="or">ou avec le mot de passe</p>
        </>
      )}
      <SecretForm action="mot-de-passe" next={next} />
    </LoginFrame>
  )
}
