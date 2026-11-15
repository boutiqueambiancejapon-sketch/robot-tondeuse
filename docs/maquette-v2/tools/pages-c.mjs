// Outil coût, guide, calendrier, piscine, mon jardin, storyboard.
import { page, R, ring, buy, dated, pick, mini, news, marquee, acc, eur, note, nb, DATE } from './lib.mjs'

/* ---------------- Outil : coût sur 5 ans ---------------- */
page('outil-cout.html', {
  title: 'Robot tondeuse ou tondeuse thermique : le coût sur 5 ans',
  mascot: 'calcul',
  body: `
<div class="wrap" data-cost>
  <p class="crumb"><a href="accueil.html">Accueil</a> › Outils › Coût sur 5 ans</p>
  <h1 class="h-xl">Robot ou tondeuse : combien sur 5 ans ?</h1>
  <p class="dated" style="margin:-8px 0 16px">Calculateur</p>
  <div class="card card-p stack-lg">
    <div class="field"><label for="c-surface">Surface de pelouse · <b data-o="surface"></b></label><input class="range" id="c-surface" type="range" min="100" max="3000" step="50" value="800"></div>
    <div class="field"><label for="c-tontes">Tontes par an · <b data-o="tontes"></b></label><input class="range" id="c-tontes" type="range" min="10" max="40" step="1" value="25"></div>
    <div class="field"><label for="c-heure">Votre temps · <b data-o="heure"></b></label><input class="range" id="c-heure" type="range" min="0" max="40" step="5" value="15"></div>
  </div>
  <section class="sec stack-lg" style="padding-top:22px">
    <div class="card card-p stack-lg" style="background:var(--ink);color:#fff;border:0">
      <span class="tag">Sur 5 ans</span>
      <ul class="bars">
        <li style="border:0"><div class="row"><span>Robot tondeuse</span><b class="num" data-o="robot"></b></div><div class="bar" style="background:rgba(255,255,255,.14)"><i data-b="robot" style="background:var(--lime);transition-duration:.5s"></i></div></li>
        <li style="border-color:rgba(255,255,255,.14)"><div class="row"><span>Tondeuse thermique</span><b class="num" data-o="thermo"></b></div><div class="bar" style="background:rgba(255,255,255,.14)"><i data-b="thermo" style="background:var(--copper);transition-duration:.5s"></i></div></li>
        <li style="border-color:rgba(255,255,255,.14)"><div class="row"><span>Heures de tonte rendues</span><b class="num" data-o="heures" style="color:var(--lime)"></b></div></li>
      </ul>
      <p class="verdict" data-o="phrase"></p>
    </div>
    <a class="btn btn--full" href="classement.html"><span data-o="cta">Voir les robots</span></a>
    <div>
      ${acc('Comment ce calcul est-il fait ?', 'Robot : prix moyen des robots notés pour cette surface, un jeu de lames par an et l’électricité. Thermique : prix moyen, essence, huile et révision annuelle. Les chiffres de cette maquette sont des exemples.')}
      ${acc('Et une tondeuse à batterie ?', 'Elle coûte moins cher à l’usage qu’une thermique, mais vous passez toujours le même temps derrière.')}
    </div>
  </section>
</div>`,
})

/* ---------------- Guide ---------------- */
page('guide.html', {
  title: 'Mon robot tondeuse ne charge plus : que faire ?',
  mascot: 'outils',
  body: `
<article class="wrap" style="max-width:720px">
  <p class="crumb"><a href="accueil.html">Accueil</a> › Guides › Dépannage</p>
  <h1 class="h-xl">Mon robot tondeuse ne charge plus : que faire ?</h1>
  <p class="dated" style="margin:-8px 0 16px">Dépannage · 4 minutes · mis à jour le 15 novembre</p>
  <div class="tldr rv"><p>Nettoyez d’abord les contacts de charge avec un chiffon sec. Le plus souvent, la batterie n’y est pour rien.</p></div>
  <figure class="cover rv" style="margin-top:18px"><img src="img/cable-peripherique-robot-tondeuse-hiver-laisser-ou-retirer-cover.jpeg" alt="Robot tondeuse à sa station de charge" width="800" height="500"></figure>
  <nav class="toc rv" style="margin-top:22px" aria-label="Sommaire">
    <a href="#e1"><b>01</b>Comment nettoyer les contacts de charge ?</a>
    <a href="#e2"><b>02</b>La station est-elle bien alimentée ?</a>
    <a href="#e3"><b>03</b>Quand faut-il changer la batterie ?</a>
  </nav>
  <div class="prose" style="margin-top:8px">
    <h2 id="e1" class="rv">Comment nettoyer les contacts de charge ?</h2>
    <p>Le robot rentre à sa station des dizaines de fois par saison, les lamelles de cuivre couvertes d’herbe humide. Une pellicule verte se forme et le courant ne passe plus.</p>
    <p>Frottez les deux lamelles du robot et celles de la station avec un chiffon sec, puis avec le côté vert d’une éponge si elles restent ternes. Reposez le robot : le voyant doit passer au vert fixe en moins d’une minute.</p>
    <div class="warn rv"><b>Coupez le robot</b> avec son interrupteur principal avant de le retourner. Les lames tournent encore une seconde ou deux après l’arrêt.</div>
    <h2 id="e2" class="rv">La station est-elle bien alimentée ?</h2>
    <p>Regardez le voyant de la station. Éteint, le problème vient de la prise ou du transformateur, qui passe l’hiver dehors et n’aime pas l’eau stagnante. Branchez une lampe sur la même prise pour trancher.</p>
    <h2 id="e3" class="rv">Quand faut-il changer la batterie ?</h2>
    <p>Une batterie de robot tient 4 à 6 ans. Elle arrive en fin de vie quand le robot rentre se charger au bout de 20 minutes au lieu d’une heure. Comptez 80 à 160 € selon le modèle, et dix minutes avec un tournevis.</p>
  </div>
  <section class="sec stack-lg" style="padding-bottom:0">
    <a class="card door door--lime rv" href="classement.html"><img src="img/robot-outils.webp" alt="" width="150" height="150" loading="lazy"><h3>Robot en fin de vie ?</h3><p>Les modèles dont la batterie et les lames se changent sans passer par l’atelier.</p></a>
    ${news()}
  </section>
</article>`,
})

/* ---------------- Calendrier du gazon ---------------- */
const M = [
  ['janvier', 'J', 1, 'Le robot hiverne. Vérifiez sa charge une fois dans le mois.', [['Ne pas marcher sur l’herbe gelée', 'Les brins cassent et laissent des traces jaunes jusqu’en mars.'], ['Vérifier la batterie du robot', 'Rechargez-la si elle est tombée sous la moitié.']]],
  ['février', 'F', 1, 'Encore un mois au sec. Commandez les lames de la saison.', [['Commander un jeu de lames', 'Vous l’aurez sous la main pour la première tonte.'], ['Ramasser les branches tombées', 'Le robot butera dessus dès sa sortie.']]],
  ['mars', 'M', 0, 'Le robot ressort quand l’herbe repousse et que le sol porte.', [['Sortir le robot', 'Lames neuves, mise à jour de l’application, premier tour surveillé.'], ['Première tonte haute', 'Réglez la coupe à 5 ou 6 cm pour ne pas affaiblir l’herbe.'], ['Scarifier si la mousse a gagné', 'Sur sol ressuyé, jamais détrempé.']]],
  ['avril', 'A', 0, 'Le robot tourne un jour sur deux.', [['Apporter un engrais de printemps', 'Riche en azote, juste avant une pluie.'], ['Regarnir les zones nues', 'Semez, tassez, arrosez en pluie fine.']]],
  ['mai', 'M', 0, 'Pleine saison : une tonte par jour suffit rarement à le fatiguer.', [['Descendre la coupe à 4 cm', 'L’herbe pousse vite, le robot suit.'], ['Nettoyer le dessous du robot', 'Une fois par semaine, brosse sèche.']]],
  ['juin', 'J', 0, 'Le robot tond tôt le matin, quand la rosée a séché.', [['Arroser moins souvent, plus longtemps', 'Une à deux fois par semaine, 15 à 20 litres par m².'], ['Tailler les bordures', 'Le robot laisse 5 à 10 cm le long des murs.']]],
  ['juillet', 'J', 0, 'En cas de canicule, mettez le robot en pause.', [['Remonter la coupe à 6 cm', 'L’herbe haute garde le sol frais.'], ['Suspendre la tonte au-dessus de 30 °C', 'Une pelouse jaune repart avec les pluies.']]],
  ['août', 'A', 0, 'Le robot tourne au ralenti.', [['Laisser l’herbe jaunir', 'Elle dort. L’arroser tous les jours la fatigue.'], ['Changer les lames', 'À mi-saison, la coupe redevient nette.']]],
  ['septembre', 'S', 0, 'Deuxième pic de pousse : le robot reprend son rythme.', [['Semer ou regarnir', 'Le sol est chaud, les pluies reviennent : le meilleur mois.'], ['Apporter un engrais d’automne', 'Riche en potasse, pour passer l’hiver.']]],
  ['octobre', 'O', 0, 'Les dernières tontes. Espacez-les.', [['Ramasser les feuilles', 'Une couche de feuilles étouffe l’herbe en deux semaines.'], ['Dernière tonte à 5 cm', 'Ni rase, ni haute.']]],
  ['novembre', 'N', 1, 'Le robot rentre : nettoyé, chargé à moitié, au sec et hors gel.', [['Rentrer le robot', 'Nettoyez-le à la brosse, chargez-le à moitié, rangez-le au sec.'], ['Ramasser les dernières feuilles', 'Elles étouffent l’herbe et gardent l’humidité.'], ['Ne plus tondre après une gelée', 'L’herbe gelée casse au passage des roues.']]],
  ['décembre', 'D', 1, 'Le robot hiverne. La station peut rester dehors, débranchée.', [['Débrancher la station', 'Rangez le transformateur à l’abri.'], ['Laisser la pelouse tranquille', 'Elle ne pousse plus sous 5 °C.']]],
].map(([nom, l, hiver, robot, gestes], i) => ({ nom, l, saison: ['hiver', 'hiver', 'printemps', 'printemps', 'printemps', 'ete', 'ete', 'ete', 'automne', 'automne', 'hiver', 'hiver'][i], robot, gestes: gestes.map(([t, d]) => [nb(t), nb(d)]) }))
page('calendrier.html', {
  title: 'Calendrier du gazon',
  scripts: `<script type="application/json" id="mois">${JSON.stringify(M)}</script>`,
  body: `
<div class="wrap" data-cal>
  <p class="crumb"><a href="accueil.html">Accueil</a> › Calendrier du gazon</p>
  <h1 class="h-xl">Calendrier du gazon</h1>
  <p class="dated" style="margin:-8px 0 16px">Quoi faire ce mois-ci</p>
  <div class="chips" data-pick><button class="chip on">Nord</button><button class="chip">Ouest</button><button class="chip">Centre et Est</button><button class="chip">Sud</button><button class="chip">Montagne</button></div>
  <div class="months" style="margin-top:10px">${M.map((m, i) => `<button type="button" class="${i === 10 ? 'on' : ''}">${['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'][i]}</button>`).join('')}</div>
  <section class="sec stack-lg" style="padding-top:18px">
    <div class="season"><img data-saison src="img/robot-hiver.webp" alt="" width="120" height="118"><div><h2 class="h-md" data-mois>En novembre</h2><p class="small" style="margin-top:8px" data-saison-txt></p></div></div>
    <ul class="stack" data-tasks></ul>
    <a class="card door door--ink rv" href="guide.html"><img src="img/robot-hiver.webp" alt="" width="150" height="148" loading="lazy"><h3>Fiche hivernage</h3><p>Une page à imprimer et à accrocher dans le garage.</p></a>
    ${news('Le calendrier dans votre boîte', 'Le premier du mois, les gestes à faire chez vous, selon votre région.', 'Recevoir la lettre du jardin')}
  </section>
</div>`,
})

/* ---------------- Robots de piscine ---------------- */
const pool = (nom, seg, n, prix, tags, why, i) => `<article class="card rv" data-tags="${tags}" style="--i:${i};padding:16px;display:grid;gap:12px">
  <div class="pick-top"><div><span class="tag" style="background:var(--pool-pale)">${seg}</span><h3 class="h-md" style="margin-top:10px">${nom}</h3><p class="score"><span>${note(n)}</span><small>/10</small></p></div><p class="price num">${eur(prix)}</p></div>
  <p class="small">${nb(why)}</p>
  <a class="btn btn--full" style="background:var(--pool);box-shadow:0 3px 0 #1d5f6c" href="#" rel="sponsored">Voir chez Cdiscount <span class="num">· ${eur(prix)}</span></a>
</article>`
page('piscine.html', {
  title: 'Robots de piscine : lequel choisir ?',
  body: `
<section class="sec--pool" style="padding:8px 0 0;overflow:hidden">
  <div class="wrap">
    <p class="crumb" style="color:#d8eef0"><a href="accueil.html">Accueil</a> › Robots de piscine</p>
    <span class="tag" style="background:#fff">Nouvelle rubrique</span>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 112px;align-items:center;gap:8px;margin-top:12px">
      <h1 class="h-xl">Quel robot pour votre piscine ?</h1>
      <img src="img/robot-piscine.webp" alt="" width="132" height="114">
    </div>
    <p class="lede" style="color:#fff;margin:14px 0 26px">Le choix dépend du bassin avant de dépendre du robot. Commencez par là.</p>
  </div>
  <svg class="wave" viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true" style="background:var(--paper)"><path d="M-40 0H440V14C400 30 360 30 320 14S240 -2 200 14 120 30 80 14 0 -2 -40 14Z"/></svg>
</section>

<section class="sec" style="padding-top:26px">
  <div class="wrap stack-lg">
    <div class="sec-hd"><h2 class="h-lg">Quel type de piscine avez-vous ?</h2></div>
    <div class="grid2 rv" data-pick="#pools">
      <button class="tile on" data-f="hors-sol"><b>Hors-sol</b><small>fond plat, liner</small></button>
      <button class="tile" data-f="enterree"><b>Enterrée</b><small>fond et parois</small></button>
      <button class="tile" data-f="ligne"><b>Ligne d’eau</b><small>traces de calcaire</small></button>
      <button class="tile" data-f="batterie"><b>Sans fil</b><small>sur batterie</small></button>
    </div>
    <div class="stack" id="pools">
      ${pool('Robot exemple A', 'Hors-sol', 7.6, 279, 'hors-sol batterie', 'Fond seul, 90 minutes d’autonomie. Suffit pour un bassin de 8 × 4 m.', 0)}
      ${pool('Robot exemple B', 'Hors-sol, grand bassin', 7.9, 449, 'hors-sol', 'Filtre fin pour le sable et les pollens, câble de 12 m.', 1)}
      ${pool('Robot exemple C', 'Enterrée', 8.2, 899, 'enterree ligne', 'Monte aux parois et brosse la ligne d’eau, cycle de 2 h 30.', 0)}
      ${pool('Robot exemple D', 'Enterrée, sans fil', 8.0, 1099, 'enterree batterie ligne', 'Sur batterie, se gare au bord pour être sorti de l’eau.', 1)}
    </div>
    <div class="note-box rv"><p><b>Même règle que pour les tondeuses.</b> Aucun robot de piscine n’est essayé par nous. La note applique un barème public aux fiches des fabricants.</p></div>
    <a class="card door door--lime rv" href="accueil.html"><img src="img/robot-jardinier.webp" alt="" width="150" height="150" loading="lazy"><h3>Et la pelouse ?</h3><p>55 robots tondeuses notés avec la même méthode.</p></a>
  </div>
</section>`,
})
// Seules les fiches du bassin choisi s'affichent au départ.
import { readFileSync, writeFileSync } from 'node:fs'
{
  const f = '/home/administrator/drafts/qrt-v3/piscine.html'
  writeFileSync(f, readFileSync(f, 'utf8').replace(/data-tags="(enterree[^"]*)" style="/g, 'data-tags="$1" style="display:none;'))
}

/* ---------------- Mon jardin ---------------- */
page('mon-jardin.html', {
  title: 'Mon jardin',
  mascot: 'jardinier',
  body: `
<div class="wrap">
  <p class="crumb"><a href="accueil.html">Accueil</a> › Mon jardin</p>
  <h1 class="h-xl">Bonjour Camille</h1>
  <p class="dated" style="margin:-8px 0 16px">Compte gratuit</p>
  <div class="card rv" style="overflow:hidden">
    <div class="plot"><img src="img/robot-top.webp" alt="" width="54" height="46"></div>
    <div class="card-p stack">
      <div class="pick-top"><div><p class="dated">Mon robot</p><h2 class="h-md">Dreame A1 Pro</h2></div><span class="tag">garanti jusqu’en avril 2029</span></div>
      <ul class="facts"><li>${nb('800 m²')}</li><li>pente 30 %</li><li>2 zones</li><li>Nord</li></ul>
      <a class="lnk" href="#">Modifier mon jardin</a>
    </div>
  </div>
  <section class="sec stack-lg" style="padding-top:28px">
    <div class="sec-hd rv"><h2 class="h-lg">À faire</h2></div>
    <div class="stack">
      <div class="card remind hot rv"><div><h3>Cette semaine : rentrer le robot</h3><p>Gelées annoncées à partir de jeudi · <a class="lnk" href="guide.html">fiche hivernage</a></p></div><button class="chip">Fait</button></div>
      <div class="card remind rv" style="--i:1"><div><h3>En mars : changer les lames</h3><p>Jeu de 9 lames compatibles dès 19 €</p></div><a class="chip" href="#">Voir</a></div>
      <div class="card remind rv" style="--i:2"><div><h3>En septembre : regarnir</h3><p>Rappel envoyé par e-mail le 1er</p></div><button class="chip on">Activé</button></div>
    </div>
    <div class="sec-hd rv"><h2 class="h-lg">Mes alertes de prix</h2></div>
    <div class="card card-p stack rv">
      <div class="pick-top"><div><h3 class="h-sm">Batterie de rechange A1 Pro</h3><p class="dated">Alerte sous 120 € · aujourd’hui</p></div><p class="price num">139 €</p></div>
      <svg class="spark" viewBox="0 0 300 58" preserveAspectRatio="none" aria-hidden="true"><line x1="0" x2="300" y1="46" y2="46"/><path d="M0 12 L38 12 L75 18 L112 18 L150 30 L188 26 L225 30 L262 30 L300 34"/><circle cx="300" cy="34" r="5"/></svg>
      <p class="dated">En pointillé, votre seuil. Prix Cdiscount des 30 derniers jours.</p>
    </div>
    <a class="card door door--lime rv" href="calendrier.html"><img src="img/robot-hiver.webp" alt="" width="150" height="148" loading="lazy"><h3>Novembre</h3><p>3 gestes pour votre pelouse ce mois-ci.</p></a>
    <p class="dated">Vous ne recevez un e-mail que pour les rappels et les alertes que vous avez activés.</p>
  </section>
</div>`,
})

/* ---------------- Storyboard ---------------- */
const ph = (file, title, sub) => `<a class="phone" href="${file}.html"><span class="scr"><img src="shots/${file}.webp" alt="Écran ${title}" width="390" height="780" loading="lazy"></span><b>${title}</b><small>${sub}</small></a>`
const step = (n, t, d, phones) => `<section class="sb-step"><div class="wrap" style="display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start"><span class="sb-n">${n}</span><div><h2 class="h-md">${t}</h2><p class="small muted" style="margin-top:6px">${nb(d)}</p></div></div><div class="wrap"><div class="sb-row">${phones.join('')}</div></div></section>`
page('index.html', {
  title: 'Storyboard',
  body: `
<section class="sec sec--dark" style="padding:30px 0 34px">
  <div class="wrap stack-lg">
    <h1 class="h-xl">Le parcours d’un visiteur</h1>
  <p class="dated" style="margin:-8px 0 16px">Maquette V2 · 14 écrans réels</p>
    <p class="lede" style="color:#dfe9da">De Google au marchand, puis au retour le mois suivant. Touchez un écran pour l’ouvrir : tout bouge et se touche comme sur le vrai site.</p>
    <a class="btn btn--lime btn--full" href="accueil.html">Commencer par l’accueil</a>
  </div>
</section>
${step(1, 'Il arrive de Google', 'Selon sa recherche, il tombe sur l’une de ces pages. Chacune donne la réponse et le prix dans le premier écran.', [ph('accueil', 'Accueil', '« robot tondeuse »'), ph('classement', 'Classement', '« meilleur robot tondeuse 500 m² »'), ph('avis-robot', 'Avis d’un robot', '« dreame a1 pro avis »'), ph('marque', 'Avis d’une marque', '« avis dreame »'), ph('duel', 'Duel', '« a1 pro ou yuka mini 2 »'), ph('guide', 'Guide', '« robot tondeuse ne charge plus »')])}
${step(2, 'Il hésite : on l’aide à trancher', 'Le quiz, le comparateur et le calculateur ramènent 55 robots à un seul.', [ph('quiz', 'Quiz', '5 questions, le robot avance'), ph('comparateur', 'Comparateur', '2 ou 3 robots côte à côte'), ph('outil-cout', 'Coût sur 5 ans', 'curseurs en direct')])}
${step(3, 'Il a sa réponse', 'Un robot, les raisons, le prix du jour et deux pistes moins chères.', [ph('quiz-resultat', 'Résultat du quiz', 'gerbe d’herbe, note animée'), ph('promos', 'Promos vérifiées', 'courbe de prix sur 30 jours')])}
${step(4, 'Il part chez le marchand', 'Un seul bouton, avec le prix et sa date. La barre d’achat reste collée en bas des fiches.', [ph('avis-robot-bas', 'Barre d’achat', 'visible dès qu’on défile')])}
${step(5, 'Il revient le mois suivant', 'La lettre du jardin, le calendrier et le compte donnent une raison de revenir, puis de racheter lames et batterie.', [ph('calendrier', 'Calendrier du gazon', '12 mois, par région'), ph('mon-jardin', 'Mon jardin', 'rappels et alertes de prix'), ph('piscine', 'Robots de piscine', 'nouvelle rubrique')])}
<div class="wrap" style="padding:20px var(--pad) 0"><p class="dated">Prix, notes et modèles de piscine sont des exemples. Les illustrations du robot ont été dessinées pour la maquette.</p></div>`,
})
