// Écrit l'aperçu lisible des e-mails de la lettre du jardin dans docs/lettre-du-jardin.md.
// Usage, depuis la racine du site : node_modules/.bin/tsx scripts/lettre-apercu.ts
// N'envoie rien et n'appelle aucun service. À relancer après un changement des textes ou du calendrier.
import { writeFileSync } from 'node:fs'
import { BIENVENUE, EXPEDITEUR, enTexte, lettreDuMois, type Email } from '../lib/emails/lettre-jardin'

const bloc = (e: Email) =>
  [`### ${e.id} — ${e.quand}`, `- Objet : ${e.objet}`, `- Aperçu : ${e.apercu}`, '', '```text', enTexte(e), '```'].join('\n')

const lettres = Array.from({ length: 12 }, (_, i) => lettreDuMois(i))
const doc = [
  '# La lettre du jardin — textes prêts',
  '',
  'Fichier fabriqué par `scripts/lettre-apercu.ts` à partir de `lib/emails/lettre-jardin.ts`. Ne pas le corriger à la main.',
  `Expéditeur prévu : ${EXPEDITEUR.nom} <${EXPEDITEUR.email}>. **Aucun envoi sans l’accord du propriétaire.**`,
  '',
  '## Suite de bienvenue (3 e-mails)',
  '',
  ...BIENVENUE.map(bloc).flatMap((b) => [b, '']),
  '## Lettre du mois (12 lettres, tirées du calendrier du gazon)',
  '',
  'Une offre n’apparaît dans une lettre que si elle est confirmée dans `lib/promos.ts`, avec sa date de contrôle.',
  '',
  ...lettres.map(bloc).flatMap((b) => [b, '']),
].join('\n')

writeFileSync('docs/lettre-du-jardin.md', doc)
console.log(`écrit docs/lettre-du-jardin.md (${BIENVENUE.length + lettres.length} e-mails)`)
