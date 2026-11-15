// Génère les illustrations de la maquette (Gemini), une image par emplacement. Clé lue dans ~/.config/toutou/gemini.env, jamais affichée.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
const HOME = process.env.HOME, OUT = path.join(HOME, 'drafts/qrt-v3/raw')
const key = /^GEMINI_API_KEY=(.+)$/m.exec(readFileSync(path.join(HOME, '.config/toutou/gemini.env'), 'utf8'))[1].trim().replace(/^["']|["']$/g, '')
const STYLE = 'Style: bold friendly flat vector illustration, thick confident dark forest-green outlines (#14241a), fills limited to warm cream (#fffdf7), moss green (#3c6b45), deep forest green (#1d3526) and copper orange (#b9532c), very subtle paper grain, no text, no letters, no logo, no ground shadow. The subject is centered with generous margin and nothing is cropped. The entire background is one perfectly flat pure magenta colour (#FF00FF), with no gradient and no other object.'
const BOT = 'a small friendly robotic lawn mower mascot: rounded cream body, a copper-orange band across the top, one round dark sensor "eye" with a tiny green light, two chunky dark wheels, a short antenna'
const jobs = {
  'robot-top': ['1:1', `${BOT}, drawn as a flat top-down game sprite seen from directly overhead (plan view, no perspective, no side visible). The shape is perfectly symmetrical between its upper half and lower half. The front points to the right, with the round sensor eye near the front on the centre line. Two wheels only, at the rear: one sticking out at the upper edge, one at the lower edge.`],
  'robot-side': ['4:3', `${BOT}, seen in a clean side profile, driving to the right, slightly bouncy and cheerful.`],
  'robot-fete': ['1:1', `${BOT}, three-quarter front view, proudly raising a tiny copper flag on its antenna, with a few fresh green grass clippings flying around it like confetti.`],
  'robot-hiver': ['1:1', `${BOT}, three-quarter front view, wearing a small knitted copper-orange scarf and a woolly hat, standing still, with a few white snowflakes around it.`],
  'robot-piscine': ['1:1', `a small friendly pool-cleaning robot mascot, cousin of a robotic lawn mower: rounded cream body, a copper-orange band, one round dark sensor "eye" with a tiny light, rubber tracks, a few round air bubbles rising around it. Add a soft teal blue (#2f7f8f) as the only extra colour, used for the tracks and bubbles.`],
  'robot-lecture': ['1:1', `${BOT}, three-quarter front view, wearing small round reading glasses and holding an open instruction booklet in front of it with two tiny mechanical arms.`],
  'robot-podium': ['1:1', `${BOT}, three-quarter front view, standing on the top step of a small winner's podium with a copper medal around its body.`],
  'robot-loupe': ['1:1', `${BOT}, three-quarter front view, wearing a small detective cap and holding a big magnifying glass with a tiny mechanical arm.`],
  'robot-boxe': ['1:1', `${BOT}, three-quarter front view, in a playful sparring pose with two small copper-orange boxing gloves on tiny mechanical arms.`],
  'robot-balance': ['1:1', `${BOT}, three-quarter front view, carefully holding a small two-pan balance scale with a tiny mechanical arm, looking at it attentively.`],
  'robot-prix': ['1:1', `${BOT}, three-quarter front view, inspecting a large copper-orange price tag (blank, no writing) through a magnifying glass.`],
  'robot-calcul': ['1:1', `${BOT}, three-quarter front view, typing on a chunky pocket calculator (blank keys and blank screen) with a tiny mechanical arm, a few coins stacked next to it.`],
  'robot-outils': ['1:1', `${BOT}, three-quarter front view, holding a wrench in a tiny mechanical arm, with a small open toolbox beside it.`],
  'robot-jardinier': ['1:1', `${BOT}, three-quarter front view, wearing a straw gardening hat and holding a small watering can with a tiny mechanical arm, a daisy growing beside it.`],
  'robot-printemps': ['1:1', `${BOT}, three-quarter front view, with a few small white daisies growing around its wheels and one daisy tucked behind its antenna.`],
  'robot-ete': ['1:1', `${BOT}, three-quarter front view, in summer: wearing sunglasses, resting under a small striped copper-and-cream parasol.`],
  'robot-automne': ['1:1', `${BOT}, three-quarter front view, in autumn: a few fallen copper-orange leaves on its body and around its wheels, pushing a tiny pile of leaves.`],
}
const only = process.argv.slice(2)
await Promise.all(Object.entries(jobs).filter(([n]) => !only.length || only.includes(n)).map(async ([name, [ratio, subject]]) => {
  const f = path.join(OUT, `${name}.png`)
  if (existsSync(f) && !only.length) return console.log('déjà là', name)
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents: [{ parts: [{ text: `Illustration of ${subject} ${STYLE}` }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: ratio } } }),
    signal: AbortSignal.timeout(180000),
  })
  const data = await res.json().catch(() => ({}))
  const img = (data.candidates?.[0]?.content?.parts ?? []).find((p) => p.inlineData?.data)
  if (!res.ok || !img) return console.log('ÉCHEC', name, res.status, data.candidates?.[0]?.finishReason ?? '')
  writeFileSync(f, Buffer.from(img.inlineData.data, 'base64')); console.log('ok', name)
}))
