// SEO dashboard (ported from Toutou): automatic notes from the git history of the live branch (stable clone
// ~/sites-src/10minlanguages, fetched by deploy-site.sh): site features (« technique » dot), daily fiches batches and
// new posts (journal), deploys of the day. Unique key: a note is never written twice.
//   node --import ./scripts/lib/ts-register.mjs scripts/seo/notes-auto.ts [--jours=120]
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import pg from 'pg'

const REPO = process.env.DEPLOY_REPO || '/home/administrator/sites-src/10minlanguages'
const RELEASES = process.env.RELEASES_DIR || '/srv/sites/10minlanguages/releases'
const BRANCH = process.env.DEPLOY_BRANCH || 'main'
const jours = Number(process.argv.find((a) => a.startsWith('--jours='))?.split('=')[1] ?? 120)
// Dashboard or tooling changes: they don't touch the public site.
const INTERNAL = /^(feat|fix|perf|refactor)\((dashboard|safeguard|deploy|scripts|ci|deps|test|images|analytics|ops|sites|db|data|dns|email|emails|speech)\)/
// Features that change what Google sees (dot on the charts); the others stay in the journal.
const VISIBLE = /^(seo|nav|menu|layout|design|home|languages|phrases|fiches|tools|time|quiz|kits|og)$/

interface Note {
  ref: string
  day: string
  kind: 'tech' | 'maj' | 'pub'
  text: string
  source: 'auto' | 'journal'
}

function fromGit(): Note[] {
  const out = execFileSync('git', ['-C', REPO, 'log', `origin/${BRANCH}`, `--since=${jours}.days`, '--no-merges', '--date=short', '--format=%h|%ad|%s'], { encoding: 'utf8' })
  const notes: Note[] = []
  for (const line of out.split('\n')) {
    const [sha, day, ...rest] = line.split('|')
    const subject = rest.join('|')
    if (!sha || !subject || INTERNAL.test(subject)) continue
    if (!day) continue
    const seo = /^content\(seo\): (.+)$/.exec(subject)
    if (seo) {
      notes.push({ ref: `git:${sha}`, day, kind: 'maj', text: `SEO : ${seo[1] ?? ''}`, source: 'auto' })
      continue
    }
    // Nightly fiches job (tenmin-fiches, 02:40): a few pages a day, journal only.
    const daily = /^feat\(fiches\): (\d+) new fiches/.exec(subject)
    if (daily) {
      notes.push({ ref: `git:${sha}`, day, kind: 'pub', text: `${daily[1] ?? ''} nouvelles fiches How to say`, source: 'journal' })
      continue
    }
    const blog = /^content\(blog\): (.+)$/.exec(subject)
    if (blog) {
      notes.push({ ref: `git:${sha}`, day, kind: 'maj', text: `Articles : ${blog[1] ?? ''}`, source: 'journal' })
      continue
    }
    const feat = /^feat(?:\(([^)]+)\))?!?: (.+)$/.exec(subject)
    if (feat) notes.push({ ref: `git:${sha}`, day, kind: 'tech', text: `Nouveauté en ligne : ${feat[2] ?? ''}`, source: VISIBLE.test(feat[1] ?? '') && !/\(WIP\)/i.test(subject) ? 'auto' : 'journal' })
  }
  return notes
}

function fromReleases(): Note[] {
  const perDay = new Map<string, number>()
  try {
    for (const name of readdirSync(RELEASES)) {
      const day = new Date(statSync(`${RELEASES}/${name}`).mtimeMs).toISOString().slice(0, 10)
      perDay.set(day, (perDay.get(day) ?? 0) + 1)
    }
  } catch {
    return []
  }
  return [...perDay].map(([day, n]) => ({ ref: `deploys:${day}`, day, kind: 'tech' as const, text: `${n} mise${n > 1 ? 's' : ''} en ligne du site`, source: 'journal' as const }))
}

/** Batches of "How to say" fiches opened to Google (Dashboard › Google › Fiches, seo.page_index): a dot on the charts. */
async function fromIndex(db: pg.Pool): Promise<Note[]> {
  const { rows } = await db.query<{ day: string; n: number }>(
    `SELECT (changed_at AT TIME ZONE 'Europe/Brussels')::date::text AS day, count(*)::int AS n FROM seo.page_index WHERE indexed GROUP BY 1`,
  )
  return rows.map((r) => ({ ref: `index:${r.day}`, day: r.day, kind: 'pub' as const, text: `${r.n} fiche${r.n > 1 ? 's' : ''} ouverte${r.n > 1 ? 's' : ''} à Google`, source: 'auto' as const }))
}

async function main(): Promise<void> {
  const db = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 })
  const notes = [...fromGit(), ...fromReleases(), ...(await fromIndex(db))]
  let added = 0
  for (const n of notes) {
    const r = await db.query(
      `INSERT INTO analytics.seo_notes (day, kind, text, source, ref) VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (ref) DO UPDATE SET text = EXCLUDED.text, source = EXCLUDED.source WHERE analytics.seo_notes.source <> 'manuel'`,
      [n.day, n.kind, n.text.slice(0, 200), n.source, n.ref],
    )
    added += r.rowCount ?? 0
  }
  await db.end()
  console.log(`Notes automatiques : ${notes.length} lues, ${added} écrites ou mises à jour`)
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
