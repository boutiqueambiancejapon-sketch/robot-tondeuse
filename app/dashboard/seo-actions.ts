'use server'

import { revalidatePath } from 'next/cache'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import type { NoteKind } from '@/lib/seo-dash/chart-types'
import { addNote, deleteNote } from '@/lib/seo-dash/server/notes'
import { markDone } from '@/lib/seo-dash/server/today'
import { getPool } from '@/lib/server/db'

// SEO dashboard server actions: "Fait" on an action of the day, manual notes. The session is checked again here
// (Next.js already refuses a server action from another origin).

async function assertDashboardAction(): Promise<void> {
  if (!(await dashboardAllowed())) throw new Error('Non autorisé')
}

const KINDS: NoteKind[] = ['tech', 'pub', 'maj', 'google']

export async function markActionDone(form: FormData): Promise<void> {
  await assertDashboardAction()
  const key = String(form.get('key') ?? '')
  const title = String(form.get('title') ?? '')
  const pool = getPool()
  if (!pool || !key) return
  await markDone(pool, key, title)
  revalidatePath('/dashboard')
}

export async function saveNote(form: FormData): Promise<void> {
  await assertDashboardAction()
  const day = String(form.get('day') ?? '')
  const text = String(form.get('text') ?? '').trim()
  const kind = String(form.get('kind') ?? 'tech') as NoteKind
  const pool = getPool()
  if (!pool || !/^\d{4}-\d\d-\d\d$/.test(day) || !text || !KINDS.includes(kind)) return
  await addNote(pool, day, kind, text)
  revalidatePath('/dashboard/contenu')
}

export async function removeNote(form: FormData): Promise<void> {
  await assertDashboardAction()
  const id = Number(form.get('id'))
  const pool = getPool()
  if (!pool || !Number.isInteger(id)) return
  await deleteNote(pool, id)
  revalidatePath('/dashboard/contenu')
}
