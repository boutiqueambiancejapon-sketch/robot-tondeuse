// Accueil, avis d'un robot, classement, page marque.
import { page, R, ring, buy, dated, pick, mini, news, marquee, acc, eur, note, nb, DATE } from './lib.mjs'

const BRANDS = ['Dreame', 'Husqvarna', 'Worx', 'Gardena', 'Segway Navimow', 'Mammotion', 'Stiga', 'Bosch', 'Mova', 'Ecovacs', 'Einhell', 'Sunseeker']
const CRIT = [
  ['Navigation et installation', 25, 23, 'LiDAR 360°, carte du jardin faite en une vingtaine de minutes, aucune antenne à planter. Un point retiré : deux propriétaires cités en source le voient hésiter sous des arbres serrés.'],
  ['Surface et autonomie', 20, 17, '2 000 m² annoncés par Dreame. Avec la durée de batterie publiée, 1 200 m² se tondent sans y passer la journée.'],
  ['Terrain : pente et passages', 20, 13, '45 % de pente annoncés, mais deux roues motrices seulement. Le passage le plus étroit accepté fait 1 m.'],
  ['Sécurité et bruit', 15, 14, 'Capteurs de levage et d’obstacles, arrêt des lames en moins de 2 secondes selon la notice. 48,5 dB annoncés.'],
  ['Entretien et pièces', 10, 8, 'Lames standard à 3 vis, batterie vendue seule. Lavage au jet autorisé.'],
  ['Prix face aux rivaux', 10, 5, '250 € de plus que le Yuka Mini 2 pour une note proche.'],
]

/* ---------------- Accueil ---------------- */
page('accueil.html', {
  title: 'Comparatif et avis robots tondeuses',
  body: `
<section class="lawn" aria-label="Quel robot pour votre pelouse ?">
  <p class="eyebrow">55 robots notés · prix relevés le ${DATE}</p>
  <button class="replay" type="button" aria-label="Rejouer l’animation">↻</button>
  <h1 class="lawn-title" aria-label="Quel robot pour votre pelouse ?">
    ${['Quel robot', 'pour votre', 'pelouse ?'].map((t) => `<span class="ln" aria-hidden="true"><span class="off">${nb(t)}</span><span class="on">${nb(t)}</span></span>`).join('')}
  </h1>
  <img class="bot" src="img/robot-top.webp" alt="" width="84" height="71">
  <div class="lawn-foot">
    <p>Tous les robots tondeuses notés avec le même barème. Leur prix est relevé chaque matin chez Cdiscount et Fnac.</p>
    <div class="dock" aria-hidden="true"></div>
  </div>
</section>

<div class="card quick rv">
  <span class="tag tag--copper">Question 1 sur 5</span>
  <h2 style="margin-top:10px">Quelle surface fait votre pelouse ?</h2>
  <div class="quick-opts">
    <a class="opt" href="quiz.html?surface=Moins%20de%20300%20m%C2%B2">Moins de 300 m²<small>cour, petit jardin</small></a>
    <a class="opt" href="quiz.html?surface=300%20%C3%A0%20800%20m%C2%B2">300 à 800 m²<small>jardin de pavillon</small></a>
    <a class="opt" href="quiz.html?surface=800%20%C3%A0%202%20000%20m%C2%B2">800 à 2 000 m²<small>grand jardin</small></a>
    <a class="opt" href="quiz.html?surface=Plus%20de%202%20000%20m%C2%B2">Plus de 2 000 m²<small>terrain, verger</small></a>
  </div>
  <p class="dated" style="margin-top:12px">Résultat en 2 minutes, sans inscription · <a class="lnk" href="outil-cout.html">Je ne connais pas ma surface</a></p>
</div>

<section class="sec">
  <div class="wrap">
    <div class="sec-hd"><h2 class="h-lg">Nos choix du moment</h2></div>
    <div class="snap">
      ${pick(R.i105, 'Notre choix · 500 m²', 0)}
      ${pick(R.m500, 'Le moins cher', 1)}
      ${pick(R.a1pro, 'Grand jardin', 2)}
      ${pick(R.yuka, 'Pour la pente', 3)}
    </div>
    <p class="rv" style="margin-top:8px"><a class="btn btn--ivory btn--full" href="classement.html">Tous les classements</a></p>
  </div>
</section>


<section class="sec">
  <div class="wrap">
    <div class="sec-hd"><h2 class="h-lg">Par où commencer</h2></div>
    <div class="stack cols" style="--n:3">
      <a class="card door door--lime rv" href="quiz.html"><img src="img/robot-loupe.webp" alt="" width="150" height="150" loading="lazy"><h3>Le quiz</h3><p>5 questions sur votre jardin, un robot conseillé et deux pistes moins chères.</p></a>
      <a class="card door door--copper rv" style="--i:1" href="comparateur.html"><img src="img/robot-balance.webp" alt="" width="150" height="150" loading="lazy"><h3>Le comparateur</h3><p>Jusqu’à 3 robots côte à côte, avec le coût sur 5 ans.</p></a>
      <a class="card door door--ink rv" style="--i:2" href="promos.html"><img src="img/robot-prix.webp" alt="" width="150" height="150" loading="lazy"><h3>Les vraies baisses</h3><p>Un prix n’apparaît que s’il passe sous son plus bas des 30 derniers jours.</p></a>
    </div>
  </div>
</section>

<section class="sec sec--dark">
  <div class="wrap stack-lg">
    <div class="sec-hd"><div class="ttl" style="margin:0"><h2 class="h-lg">Nous n’essayons pas les robots.</h2><img class="masc" src="img/robot-lecture.webp" alt="" width="150" height="150" loading="lazy"></div><p class="lede" style="color:#dfe9da">Personne ne peut essayer 55 robots sur le même terrain. Nous lisons les fiches des fabricants, les notices et les retours publiés, puis nous appliquons le même barème à tous.</p></div>
    <ul class="bars rv" data-fire>
      ${CRIT.map(([l, max]) => `<li><div class="row"><span>${l}</span><b>${max}<small> points</small></b></div><div class="bar"><i data-w="${max * 4}"></i></div></li>`).join('')}
    </ul>
    <p class="rv"><a class="btn btn--lime btn--full" href="avis-robot.html#methode">Lire le barème complet</a></p>
  </div>
</section>

<section class="sec">
  <div class="wrap stack-lg">
    <div class="sec-hd"><h2 class="h-lg">En novembre, on range le robot</h2></div>
    <div class="season"><img src="img/robot-hiver.webp" alt="" width="120" height="118" loading="lazy"><div class="stack"><h3 class="h-sm">3 gestes pour ce mois-ci</h3><p class="small muted">Nettoyer le robot, le charger, le stocker hors gel. Le détail est dans le calendrier.</p><a class="lnk" href="calendrier.html">Ouvrir le calendrier du gazon</a></div></div>
    ${news()}
  </div>
</section>

<section class="sec sec--cream">
  <div class="wrap">
    <div class="sec-hd"><h2 class="h-lg">Autour de la pelouse</h2></div>
    <div class="stack cols">
      <a class="card door door--pool rv" href="piscine.html"><img src="img/robot-piscine.webp" alt="" width="150" height="129" loading="lazy"><h3>Robots de piscine</h3><p>Même barème, même règle : aucun essai inventé.</p></a>
      <a class="card door rv" style="--i:1" href="guide.html"><img src="img/robot-jardinier.webp" alt="" width="150" height="150" loading="lazy"><h3>Bordures et gazon</h3><p>Coupe-bordures, semences, arrosage : ce que le robot ne fait pas.</p></a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-hd"><h2 class="h-lg">Lus cette semaine</h2></div>
    <div class="stack">
      <a class="card post rv" href="guide.html"><img src="img/cable-peripherique-robot-tondeuse-hiver-laisser-ou-retirer-cover.jpeg" alt="" width="216" height="216" loading="lazy"><div><h3>Mon robot tondeuse ne charge plus : que faire ?</h3><p>Dépannage · 4 min</p></div></a>
      <a class="card post rv" style="--i:1" href="guide.html"><img src="img/faut-il-tondre-pelouse-hiver-cover.jpeg" alt="" width="216" height="216" loading="lazy"><div><h3>Faut-il tondre la pelouse en hiver ?</h3><p>Gazon · 3 min</p></div></a>
      <a class="card post rv" style="--i:2" href="guide.html"><img src="img/feuilles-mortes-pelouse-ramasser-broyer-laisser-cover.jpeg" alt="" width="216" height="216" loading="lazy"><div><h3>Feuilles mortes : les ramasser, les broyer ou les laisser ?</h3><p>Gazon · 5 min</p></div></a>
    </div>
  </div>
</section>`,
})

/* ---------------- Avis d'un robot ---------------- */
const a = R.a1pro
page('avis-robot.html', {
  title: 'Avis Dreame A1 Pro',
  mascot: 'lecture',
  buybar: `<div class="buybar"><div><b class="num">${eur(a.prix)}</b><span>Cdiscount · prix du ${DATE}</span></div><a class="btn" href="#" rel="sponsored">Voir l’offre</a></div>`,
  body: `
<div class="wrap">
  <p class="crumb"><a href="accueil.html">Accueil</a> › <a href="marque.html">Dreame</a> › A1 Pro</p>
  <h1 class="h-xl">Avis Dreame A1 Pro</h1>
  <p class="dated" style="margin:-8px 0 16px">Mis à jour le 15 novembre · 9 sources lues</p>
  <div class="phero" data-fire>
    <span class="tag tag--ink">Notre choix · grand jardin plat</span>
    ${ring(a.note)}
    <img class="ph" src="img/cut/${a.img}" alt="Robot tondeuse Dreame A1 Pro" width="600" height="420">
  </div>
  <div class="buyrow" data-buy-after>
    <div><p class="price num">${eur(a.prix)}</p><p class="dated">Cdiscount · prix du ${DATE}</p></div>
    <a class="btn" href="#" rel="sponsored">Voir l’offre</a>
  </div>
</div>

<section class="sec" style="padding-top:24px">
  <div class="wrap stack-lg">
    <p class="verdict">Un robot précis et discret pour une pelouse plate de 800 à 1 500 m². En dessous de 600 m², vous payez une batterie dont vous n’avez pas besoin.</p>
    <div class="stack">
      <div class="shops">
        <a class="shop best" href="#" rel="sponsored"><span>Cdiscount<small>en stock · livraison offerte</small></span><b class="num">${eur(a.prix)}</b></a>
        <a class="shop" href="#" rel="sponsored"><span>Fnac<small>en stock · retrait en magasin</small></span><b class="num">${eur(a.fnac)}</b></a>
      </div>
      <button class="btn btn--ivory btn--full" type="button">M’alerter si le prix baisse</button>
      ${dated('Cdiscount et Fnac')}
    </div>
    <dl class="specs">
      <div><dt>Surface conseillée</dt><dd>${nb('1 200 m²')}</dd></div>
      <div><dt>Pente annoncée</dt><dd>45 %</dd></div>
      <div><dt>Navigation</dt><dd>LiDAR 3D</dd></div>
      <div><dt>Bruit annoncé</dt><dd>48,5 dB</dd></div>
      <div><dt>Installation</dt><dd>Sans câble</dd></div>
      <div><dt>Garantie</dt><dd>3 ans</dd></div>
    </dl>
  </div>
</section>

<section class="sec sec--dark" id="methode">
  <div class="wrap stack-lg">
    <div class="sec-hd"><h2 class="h-lg">Comment se décompose le ${note(a.note)} du Dreame A1 Pro ?</h2></div>
    <ul class="bars rv" data-fire>
      ${CRIT.map(([l, max, got, why]) => `<li><div class="row"><span>${l}</span><b>${got}<small> / ${max}</small></b></div><div class="bar"><i data-w="${Math.round((got / max) * 100)}"></i></div><p>${nb(why)}</p></li>`).join('')}
    </ul>
    <div class="note-box rv"><p><b>Nous n’avons pas essayé ce robot.</b> La note applique notre barème à 9 sources : la fiche et la notice de Dreame, 2 fiches marchands et 5 retours de propriétaires publiés. <a class="lnk" href="#">Voir les sources</a></p></div>
  </div>
</section>

<section class="sec">
  <div class="wrap stack-lg">
    <div class="sec-hd rv"><h2 class="h-lg">Le Dreame A1 Pro est-il fait pour votre jardin ?</h2></div>
    <div class="duo rv">
      <div class="yes"><h3>Oui, si</h3><ul><li>Votre pelouse fait de 800 à 1 500 m² et reste plutôt plate.</li><li>Vous ne voulez ni câble à enterrer ni antenne dans le jardin.</li><li>Le robot tourne près d’une terrasse ou d’un voisin.</li></ul></div>
      <div class="no"><h3>Non, si</h3><ul><li>Votre terrain dépasse 35 % de pente par endroits.</li><li>Votre pelouse fait moins de 600 m².</li><li>Des passages de moins de 1 m relient deux zones.</li></ul></div>
    </div>
    <div class="sec-hd rv"><h2 class="h-md">Quelles alternatives au Dreame A1 Pro ?</h2></div>
    <div class="stack">
      ${mini(R.yuka, '250 € de moins · meilleur en pente', 'duel.html')}
      ${mini(R.i105, 'Notre choix sous 500 m²')}
      ${mini(R.m500, 'Le moins cher, avec câble')}
    </div>
    <p class="rv"><a class="btn btn--ivory btn--full" href="duel.html">A1 Pro ou Yuka Mini 2 : le duel</a></p>
  </div>
</section>

<section class="sec sec--cream">
  <div class="wrap">
    <div class="sec-hd rv"><h2 class="h-lg">Questions fréquentes sur le Dreame A1 Pro</h2></div>
    ${acc('Le Dreame A1 Pro fonctionne-t-il sans fil périphérique ?', 'Oui. Il dessine la carte du jardin avec son LiDAR lors d’un premier tour guidé depuis le téléphone. Il n’y a ni câble à enterrer ni antenne à installer.')}
    ${acc('Peut-il tondre sous la pluie ?', 'Il est classé IPX6 et se lave au jet. Dreame conseille quand même de couper la tonte sous la pluie : l’herbe mouillée colle sous le carter et la coupe est moins nette.')}
    ${acc('Combien coûte son entretien par an ?', 'Comptez un jeu de lames à 20 € par saison. La batterie se remplace au bout de 4 à 6 ans pour environ 140 €.')}
    ${acc('Que faire du robot en hiver ?', 'Le nettoyer, le charger à moitié et le ranger au sec, hors gel. La station peut rester dehors si elle est débranchée.')}
  </div>
</section>`,
})

/* ---------------- Classement ---------------- */
const rows = [
  [R.i105, 'sans-cable', '1'], [R.yuka, 'sans-cable pente', '2'], [R.m500, 'cable moins-500 pente', '3'], [R.indego, 'cable', '4'], [R.sileno, 'cable', '5'],
]
const best = { note: 8.1, prix: 399, pente: 50, bruit: 54 }
page('classement.html', {
  title: 'Meilleurs robots tondeuses pour 500 m²',
  mascot: 'podium',
  buybar: `<div class="buybar"><div><b>Navimow i105E · <span class="num">${eur(R.i105.prix)}</span></b><span>Notre choix · prix du ${DATE}</span></div><a class="btn" href="#" rel="sponsored">Voir l’offre</a></div>`,
  body: `
<div class="wrap">
  <p class="crumb"><a href="accueil.html">Accueil</a> › Classements › 500 m²</p>
  <h1 class="h-xl">Les meilleurs robots tondeuses pour 500 m²</h1>
  <p class="dated" style="margin:-8px 0 16px">14 robots comparés · 4 écartés · mis à jour le 15 novembre</p>
</div>

<section class="sec" style="padding-top:24px">
  <div class="wrap stack-lg">
    <div data-buy-after>${pick(R.i105, 'Notre choix', 0, '1')}</div>
    <div class="stack cols">
      ${pick(R.m500, 'Le moins cher', 1, '2')}
      ${pick(R.yuka, 'Si le terrain penche', 2, '3')}
    </div>
  </div>
</section>

<section class="sec sec--cream">
  <div class="wrap stack-lg">
    <div class="sec-hd"><h2 class="h-lg">Quel robot choisir pour 500 m² ?</h2></div>
    <div class="chips rv" data-filter="#cl-body">
      <button class="chip on" data-f="">Tous</button><button class="chip" data-f="sans-cable">Sans câble</button><button class="chip" data-f="moins-500">Moins de 500 €</button><button class="chip" data-f="pente">Pente de 35 % ou plus</button>
    </div>
    <div class="tbl-wrap rv"><div class="tbl-scroll"><table class="tbl">
      <thead><tr><th>Robot</th><th>Note</th><th>Prix</th><th>Pente</th><th>Installation</th><th>Bruit</th></tr></thead>
      <tbody id="cl-body">
      ${rows.map(([r, tags]) => `<tr data-tags="${tags}"><td><a href="avis-robot.html">${r.court}</a></td><td class="num ${r.note === best.note ? 'best' : ''}">${note(r.note)}</td><td class="num ${r.prix === best.prix ? 'best' : ''}">${eur(r.prix)}</td><td class="num ${r.pente === best.pente ? 'best' : ''}">${r.pente} %</td><td class="${r.cable ? '' : 'best'}">${r.cable ? 'Câble' : 'Sans câble'}</td><td class="num ${r.bruit === best.bruit ? 'best' : ''}">${r.bruit} dB</td></tr>`).join('')}
      </tbody></table></div></div>
    <p class="dated rv">En vert, le meilleur de chaque colonne. Prix Cdiscount du ${DATE}. Pente et bruit annoncés par les fabricants.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap stack-lg">
    <div class="sec-hd rv"><h2 class="h-lg">Pourquoi 4 robots sont-ils écartés ?</h2><p class="lede">Un classement dit aussi ce qu’il laisse de côté.</p></div>
    <div class="rv">
      ${acc('Dreame A1 Pro', 'Prévu pour 1 200 m². Sur 500 m², sa batterie et son prix (1 049 €) sont en trop.')}
      ${acc('Gardena Sileno Minimo 250', 'Annoncé pour 250 m². Il lui faudrait tourner presque tous les jours pour tenir 500 m².')}
      ${acc('Mova ViAX 250', 'Même limite de surface que le Gardena.')}
      ${acc('Stiga A 1500', 'Trop grand et trop cher pour cette surface : 1 500 m² annoncés.')}
    </div>
    <a class="card door door--lime rv" href="quiz.html"><img src="img/robot-loupe.webp" alt="" width="150" height="150" loading="lazy"><h3>Pas sûr ?</h3><p>5 questions sur votre jardin, et le classement se réduit à un robot.</p></a>
  </div>
</section>`,
})

/* ---------------- Page marque ---------------- */
const models = [[R.a1pro, 'Grand jardin plat', '1'], [{ ...R.a1pro, nom: 'Dreame A3 AWD Pro 3500', img: 'dreame-a3-awd-pro-3500.webp', note: 7.8, prix: 2199, un: '4 roues motrices pour les terrains en pente.', surface: 3500, pente: 80 }, 'Pour la pente', '2'], [{ ...R.a1pro, nom: 'Dreame A3 AWD Pro 5000', img: 'dreame-a3-awd-pro-5000.webp', note: 7.5, prix: 2699, un: 'Le même, avec une batterie pour 5 000 m².', surface: 5000, pente: 80 }, 'Très grand terrain', '3']]
page('marque.html', {
  title: 'Avis Dreame : quel robot tondeuse choisir ?',
  mascot: 'loupe',
  body: `
<section class="sec sec--dark" style="padding:10px 0 30px">
  <div class="wrap"><p class="crumb" style="color:#b9c9b7;padding-top:0"><a href="accueil.html">Accueil</a> › Marques › Dreame</p></div>
  <div class="wrap stack-lg">
    <h1 class="h-xl">Avis Dreame : quel robot tondeuse choisir ?</h1>
    <p class="lede" style="color:#dfe9da">La marque chinoise a mis le LiDAR dans des robots à moins de 1 100 €. Son service après-vente en France reste plus lent que celui de Husqvarna.</p>
    <dl class="specs" data-fire>
      <div><dt>Modèles notés</dt><dd><span data-count="13">13</span></dd></div>
      <div><dt>Note moyenne</dt><dd><span data-count="7.7" data-dec="1">7,7</span><small> /10</small></dd></div>
      <div><dt>Prix</dt><dd>1 049 à 2 699 €</dd></div>
      <div><dt>Garantie</dt><dd>3 ans</dd></div>
    </dl>
  </div>
</section>

<section class="sec">
  <div class="wrap stack-lg">
    <div class="sec-hd"><h2 class="h-lg">Quels sont les meilleurs robots Dreame ?</h2></div>
    <div class="snap">${models.map(([r, t, k], i) => pick(r, t, i, k)).join('')}</div>
    <div class="warn rv"><b>À éviter :</b> le Dreame A1 Pro sur un terrain à plus de 35 % de pente. Ses deux roues motrices patinent. Le Mammotion Yuka Mini 2 annonce 50 % pour 250 € de moins.</div>
  </div>
</section>

<section class="sec sec--cream">
  <div class="wrap stack-lg">
    <div class="sec-hd rv"><h2 class="h-lg">Dreame face aux autres marques</h2></div>
    <div class="stack">
      <a class="card mini rv" href="duel.html"><div><h3>Dreame A1 Pro ou Mammotion Yuka Mini 2 ?</h3><p>Le duel le plus lu</p></div></a>
      <a class="card mini rv" href="duel.html"><div><h3>Dreame ou Husqvarna ?</h3><p>LiDAR contre réseau de réparateurs</p></div></a>
      <a class="card mini rv" href="duel.html"><div><h3>Dreame ou Segway Navimow ?</h3><p>Deux façons de se passer du câble</p></div></a>
    </div>
    <div class="sec-hd rv"><h2 class="h-md">Questions fréquentes sur Dreame</h2></div>
    <div class="rv">
      ${acc('Où sont réparés les robots Dreame en France ?', 'Le robot repart par transporteur vers un centre agréé. Comptez deux à trois semaines d’après les retours de propriétaires que nous avons lus.')}
      ${acc('Les robots Dreame fonctionnent-ils sans abonnement ?', 'Oui pour la tonte et la carte. Le suivi antivol par réseau mobile est offert trois ans, puis payant.')}
    </div>
  </div>
</section>`,
})
