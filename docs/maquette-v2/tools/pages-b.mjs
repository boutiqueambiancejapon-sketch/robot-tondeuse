// Duel, quiz, résultat du quiz, comparateur, promos.
import { page, R, ring, buy, dated, pick, mini, news, marquee, acc, eur, note, nb, DATE } from './lib.mjs'

/* ---------------- Duel ---------------- */
const A = R.a1pro, B = R.yuka
const face = [['Navigation', 25, 23, 21], ['Surface et autonomie', 20, 17, 13], ['Terrain et pente', 20, 13, 17], ['Sécurité et bruit', 15, 14, 12], ['Entretien', 10, 8, 8], ['Prix', 10, 5, 8]]
page('duel.html', {
  title: 'Dreame A1 Pro ou Mammotion Yuka Mini 2',
  mascot: 'boxe',
  body: `
<div class="wrap" data-duel>
  <p class="crumb"><a href="accueil.html">Accueil</a> › Duels › A1 Pro / Yuka Mini 2</p>
  <h1 class="h-xl">Dreame A1 Pro ou Yuka Mini 2 ?</h1>
  <p class="dated" style="margin:-8px 0 16px">Duel mis à jour le 15 novembre</p>

  <div class="vs">
    <span class="vs-badge rv-pop" style="--i:3">VS</span>
    <a class="card side win rv" data-id="a" href="avis-robot.html"><span class="shot"><img src="img/cut/${A.img}" alt="${A.nom}" width="300" height="220"></span><h2>${A.court}</h2><p class="score"><span>${note(A.note)}</span><small>/10</small></p><p class="price num" style="font-size:19px">${eur(A.prix)}</p><span class="tag pill">Notre choix</span></a>
    <a class="card side rv" style="--i:1" data-id="b" href="avis-robot.html"><span class="shot"><img src="img/cut/${B.img}" alt="${B.nom}" width="300" height="220"></span><h2>${B.court}</h2><p class="score"><span>${note(B.note)}</span><small>/10</small></p><p class="price num" style="font-size:19px">${eur(B.prix)}</p><span class="tag pill">Notre choix</span></a>
  </div>

  <section class="sec stack-lg" style="padding-bottom:20px">
    <div class="sec-hd rv"><h2 class="h-md">Quelle est la taille de votre pelouse ?</h2></div>
    <div class="seg rv"><button class="on" data-win="a">Plus de 800 m²</button><button data-win="b">Moins de 800 m²</button></div>
    <div class="verdict-box stack">
      <span class="tag">Notre verdict</span>
      <p class="verdict" data-for="a">Prenez le Dreame A1 Pro. Sa batterie couvre 1 200 m² sans y passer la journée, et il fait 7 dB de moins.</p>
      <p class="verdict" data-for="b" hidden>Prenez le Yuka Mini 2. Vous gardez 250 € et il grimpe mieux : 50 % de pente annoncés contre 45 %.</p>
    </div>
  </section>
</div>

<section class="sec sec--dark">
  <div class="wrap stack-lg">
    <div class="sec-hd"><h2 class="h-lg">Lequel a la meilleure note ?</h2></div>
    <div class="race rv" data-fire>
      <div><span class="lane-l">${A.nom}</span><div class="lane"><i data-w="${A.note * 10}"></i><img data-left="${A.note * 10}" src="img/robot-side.webp" alt="" width="70" height="56"><b>${note(A.note)}</b></div></div>
      <div><span class="lane-l">${B.nom}</span><div class="lane"><i data-w="${B.note * 10}"></i><img data-left="${B.note * 10}" src="img/robot-side.webp" alt="" width="70" height="56"><b>${note(B.note)}</b></div></div>
    </div>
    <p class="small muted rv">Un dixième d’écart : la note ne les départage pas. La surface et la pente de votre jardin, si.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap stack-lg">
    <div class="sec-hd rv"><h2 class="h-lg">Où chacun prend-il l’avantage ?</h2><p class="dated">À gauche le Dreame, à droite le Yuka.</p></div>
    <ul class="face rv" data-fire>
      ${face.map(([l, max, a, b]) => `<li><div class="lbl"><b>${a}</b><span>${l} · sur ${max}</span><b>${b}</b></div><div class="two"><span><i data-w="${(a / max) * 100}"></i></span><span><i data-w="${(b / max) * 100}"></i></span></div></li>`).join('')}
    </ul>
    <div class="tbl-wrap rv"><div class="tbl-scroll"><table class="tbl" style="min-width:0">
      <thead><tr><th>Sur le papier</th><th>A1 Pro</th><th>Yuka Mini 2</th></tr></thead>
      <tbody><tr><td>Surface conseillée</td><td class="best">${nb('1 200 m²')}</td><td>${nb('800 m²')}</td></tr><tr><td>Pente annoncée</td><td>45 %</td><td class="best">50 %</td></tr><tr><td>Bruit annoncé</td><td class="best">48,5 dB</td><td>56 dB</td></tr><tr><td>Prix du jour</td><td class="num">${eur(A.prix)}</td><td class="num best">${eur(B.prix)}</td></tr></tbody>
    </table></div></div>
    <div class="grid2 rv">
      <a class="btn" style="padding:0 10px" href="#" rel="sponsored">A1 Pro · ${eur(A.prix)}</a>
      <a class="btn btn--ink" style="padding:0 10px" href="#" rel="sponsored">Yuka · ${eur(B.prix)}</a>
    </div>
    ${dated()}
    <p class="rv"><a class="btn btn--ivory btn--full" href="comparateur.html">Ajouter un troisième robot</a></p>
  </div>
</section>`,
})

/* ---------------- Quiz ---------------- */
const Q = [
  ['surface', 'Quelle surface fait votre pelouse ?', [['Moins de 300 m²', 'cour, petit jardin'], ['300 à 800 m²', 'jardin de pavillon'], ['800 à 2 000 m²', 'grand jardin'], ['Plus de 2 000 m²', 'terrain, verger']]],
  ['pente', 'Votre terrain est-il en pente ?', [['Plat', 'une bille n’y roule pas'], ['Un peu', 'on le sent en poussant une brouette'], ['Beaucoup', 'on y glisse quand l’herbe est mouillée']]],
  ['cable', 'Accepteriez-vous d’enterrer un câble ?', [['Oui, si c’est moins cher', 'un samedi après-midi de pose'], ['Non, sans câble', 'le robot se repère seul']]],
  ['zones', 'Combien de zones séparées ?', [['Une seule pelouse', ''], ['2 ou 3 zones', 'reliées par un passage'], ['Plus de 3', 'ou des passages de moins de 1 m']]],
  ['budget', 'Quel budget vous êtes-vous fixé ?', [['Moins de 500 €', ''], ['500 à 1 000 €', ''], ['Plus de 1 000 €', ''], ['Je ne sais pas encore', 'montrez-moi le meilleur rapport note/prix']]],
]
page('quiz.html', {
  title: 'Quel robot tondeuse pour mon jardin ?',
  body: `
<div class="wrap" data-quiz>
  <div class="quiz-top">
    <div class="track" aria-hidden="true"><i></i><img src="img/robot-side.webp" alt="" width="62" height="50"></div>
    <p class="dated" style="display:flex;justify-content:space-between;margin-top:14px"><span data-step>Question 1 sur 5</span><button data-back type="button" class="lnk" style="border:0;background:none;padding:0;cursor:pointer">Question précédente</button></p>
  </div>
  ${Q.map(([k, t, opts], i) => `<section class="q ${i === 0 ? 'on' : ''}" data-key="${k}">
    <h1>${nb(t)}</h1>
    <div class="opts">${opts.map(([l, s]) => `<button class="opt" type="button" data-v="${l}">${nb(l)}${s ? `<small>${nb(s)}</small>` : ''}</button>`).join('')}</div>
  </section>`).join('')}
  <p class="dated" style="padding-bottom:40px">Sans inscription. Vos réponses restent dans votre navigateur.</p>
</div>`,
})

/* ---------------- Résultat du quiz ---------------- */
page('quiz-resultat.html', {
  title: 'Votre robot tondeuse',
  buybar: `<div class="buybar"><div><b>A1 Pro · <span class="num">${eur(A.prix)}</span></b><span>Cdiscount · prix du ${DATE}</span></div><a class="btn" href="#" rel="sponsored">Voir l’offre</a></div>`,
  body: `
<div data-result>
<section class="sec sec--dark" style="padding:18px 0 28px;overflow:hidden">
  <div class="wrap">
    <div class="result-hero"><div class="burst"></div><img src="img/robot-fete.webp" alt="" width="190" height="161"></div>
    <h1 class="h-xl">Pour votre jardin : le Dreame A1 Pro</h1>
  <p class="dated" style="margin:-8px 0 16px">Il coche vos 5 réponses</p>
    <div class="chips" style="margin-top:18px;justify-content:flex-start">
      <span class="chip" data-a="surface">800 à 2 000 m²</span><span class="chip" data-a="pente">Un peu</span><span class="chip" data-a="cable">Non, sans câble</span><span class="chip" data-a="zones">2 ou 3 zones</span><span class="chip" data-a="budget">Plus de 1 000 €</span>
    </div>
    <p style="margin-top:8px"><a class="lnk" href="quiz.html" style="color:#fff">Modifier mes réponses</a></p>
  </div>
</section>

<section class="sec" style="padding-top:26px">
  <div class="wrap stack-lg">
    <div class="phero rv" data-fire data-buy-after>
      <span class="tag tag--ink">5 critères sur 5</span>${ring(A.note)}
      <img class="ph" src="img/cut/${A.img}" alt="${A.nom}" width="600" height="420">
    </div>
    <ul class="why rv">
      <li>${nb('Sa batterie couvre 1 200 m² : votre pelouse rentre dedans avec de la marge.')}</li>
      <li>${nb('45 % de pente annoncés, pour un terrain que vous décrivez comme un peu pentu.')}</li>
      <li>Aucun câble à enterrer : il dessine sa carte au LiDAR.</li>
      <li>Il gère plusieurs zones depuis l’application, si le passage fait au moins 1 m.</li>
    </ul>
    <div class="stack rv">${buy(A)}<a class="btn btn--ivory btn--full" href="avis-robot.html">Lire l’avis complet</a>${dated()}</div>

    <div class="sec-hd"><h2 class="h-lg">Deux pistes moins chères</h2></div>
    <div class="stack">
      ${mini(R.yuka, '250 € de moins · un peu juste au-delà de 800 m²', 'duel.html')}
      ${mini(R.i105, '200 € de moins · prévu pour 500 m², il tournera plus souvent')}
    </div>
    ${news('Garder ce résultat', 'Recevez-le par e-mail, avec une alerte si le prix du Dreame A1 Pro baisse.', 'Envoyer mon résultat')}
  </div>
</section>
</div>`,
})

/* ---------------- Comparateur ---------------- */
page('comparateur.html', {
  title: 'Comparateur de robots tondeuses',
  mascot: 'balance',
  scripts: `<script type="application/json" id="robots">${JSON.stringify(Object.values(R))}</script>`,
  body: `
<div class="wrap" data-cmp>
  <p class="crumb"><a href="accueil.html">Accueil</a> › Comparateur</p>
  <h1 class="h-xl">Comparer des robots tondeuses</h1>
  <p class="dated" style="margin:-8px 0 16px">55 robots · prix du ${DATE}</p>
  <p class="lede">Touchez deux ou trois robots. Le tableau se met à jour, le meilleur de chaque ligne passe en vert.</p>
  <div class="chips" style="margin-top:16px;flex-wrap:wrap;overflow:visible">
    ${Object.values(R).map((r, i) => `<button class="chip ${i < 2 ? 'on' : ''}" data-id="${r.id}">${r.court}</button>`).join('')}
  </div>
  <section class="sec stack-lg" style="padding-top:20px">
    <div class="tbl-wrap"><div class="tbl-scroll"><table class="tbl" style="min-width:0"><thead><tr></tr></thead><tbody></tbody></table></div></div>
    <div class="tldr stack"><span class="tag tag--ink">En une phrase</span><p class="verdict" data-cmp-verdict></p></div>
    <p class="dated">Pente et bruit annoncés par les fabricants. Coût sur 5 ans : prix du jour, lames et électricité.</p>
    <a class="card door door--copper" href="quiz.html"><img src="img/robot-loupe.webp" alt="" width="150" height="150" loading="lazy"><h3>Trop de choix ?</h3><p>Le quiz en garde un seul, selon votre jardin.</p></a>
  </section>
</div>`,
})

/* ---------------- Promos ---------------- */
const spark = (pts, low) => {
  const max = Math.max(...pts), min = Math.min(...pts) - 20, W = 300, H = 58
  const xy = pts.map((p, i) => [Math.round((i / (pts.length - 1)) * W), Math.round(H - 6 - ((p - min) / (max - min)) * (H - 14))])
  const ly = Math.round(H - 6 - ((low - min) / (max - min)) * (H - 14)), [ex, ey] = xy[xy.length - 1]
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Prix des 30 derniers jours"><line x1="0" x2="${W}" y1="${ly}" y2="${ly}"/><path d="M${xy.map((p) => p.join(' ')).join(' L')}"/><circle cx="${ex}" cy="${ey}" r="5"/></svg>`
}
const deal = (r, now, low, pts, tags, i) => `<article class="card rv" data-tags="${tags}" style="--i:${i};overflow:hidden">
  <div style="display:grid;grid-template-columns:112px 1fr;gap:12px;padding:14px 14px 0;align-items:center">
    <img src="img/cut/${r.img}" alt="${r.nom}" width="224" height="168" loading="lazy" style="border-radius:12px;background:var(--sage);padding:8px;aspect-ratio:4/3;object-fit:contain">
    <div class="stack" style="--g:6px"><h3 class="h-sm">${r.nom}</h3><p style="display:flex;gap:10px;align-items:center;margin-top:8px"><span class="price num">${eur(now)}</span><span class="drop num">−${eur(low - now)}</span></p></div>
  </div>
  <div style="padding:10px 14px 0">${spark(pts, low)}<p class="dated" style="display:flex;justify-content:space-between"><span>il y a 30 jours</span><span>plus bas avant aujourd’hui : ${eur(low)}</span></p></div>
  <div style="padding:14px">${buy({ prix: now })}</div>
</article>`
page('promos.html', {
  title: 'Black Friday robots tondeuses : les vraies baisses',
  mascot: 'prix',
  body: `
<section class="sec sec--dark" style="padding-bottom:34px">
  <div class="wrap stack-lg">
    <h1 class="h-xl">Black Friday : les vraies baisses</h1>
  <p class="dated" style="margin:-8px 0 16px">Prix relevés le ${DATE}</p>
    <p class="lede" style="color:#dfe9da">Nous relevons le prix de 55 robots chaque matin. Un robot entre dans cette page le jour où son prix passe sous le plus bas des 30 jours précédents, chez le même marchand. Pas de compte à rebours, pas de prix barré inventé.</p>
    <dl class="specs" data-fire>
      <div><dt>Robots suivis</dt><dd><span data-count="55">55</span></dd></div>
      <div><dt>Vraies baisses ce matin</dt><dd><span data-count="3">3</span></dd></div>
    </dl>
  </div>
</section>
<section class="sec">
  <div class="wrap stack-lg">
    <div class="chips" data-filter="#deals"><button class="chip on" data-f="">Toutes</button><button class="chip" data-f="sans-cable">Sans câble</button><button class="chip" data-f="moins-500">Moins de 500 €</button></div>
    <div class="stack" id="deals">
      ${deal(R.a1pro, 949, 1049, [1099, 1099, 1079, 1049, 1049, 1069, 1049, 1049, 949], 'sans-cable', 0)}
      ${deal(R.m500, 349, 399, [429, 429, 399, 399, 419, 399, 399, 399, 349], 'moins-500', 1)}
      ${deal(R.i105, 799, 849, [899, 879, 849, 849, 849, 869, 849, 849, 799], 'sans-cable', 2)}
    </div>
  </div>
</section>
<section class="sec sec--cream">
  <div class="wrap stack-lg">
    <div class="sec-hd rv"><h2 class="h-lg">Affichés en promo ailleurs, au même prix depuis 30 jours</h2><p class="lede">Ces robots portent une étiquette « Black Friday » chez leur marchand. Leur prix n’a pas bougé.</p></div>
    <div class="stack">
      ${mini(R.yuka, 'étiquette −20 % · 799 € depuis le 12 octobre')}
      ${mini(R.indego, 'étiquette −15 % · 649 € depuis le 3 octobre')}
    </div>
    ${news('Votre robot n’est pas dans la liste ?', 'Laissez votre e-mail : nous vous écrivons le jour où son prix baisse pour de bon.', 'Créer mon alerte')}
  </div>
</section>`,
})
