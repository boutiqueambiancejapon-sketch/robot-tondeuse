import 'server-only'
import { notFound } from 'next/navigation'
import { dashboardAllowed } from './guard'
import { parsePeriod, type Period } from './period'

// Shared opening of the tabs: the session is checked again on every page (proxy.ts can be
// bypassed, see guard.ts), then the period is read from the URL.

export interface TabPageProps {
  searchParams: Promise<{ periode?: string | string[] }>
}

export async function openTab({ searchParams }: TabPageProps): Promise<Period> {
  if (!(await dashboardAllowed())) notFound()
  return parsePeriod((await searchParams).periode)
}

export const READ_FAILED = 'Une partie des chiffres n’a pas pu être lue : les blocs concernés restent vides.'

export const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v)
