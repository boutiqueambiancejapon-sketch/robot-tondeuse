// Données d'exemple, gabarit commun et petits composants de la maquette V3.
import { writeFileSync } from 'node:fs'
export const OUT = '/home/administrator/drafts/qrt-v3'
export const DATE = '15/11 à 7 h'
export const nb = (s) => String(s).replace(/ (?=[:;?!»€%])/g, ' ').replace(/« /g, '« ').replace(/(\d) (\d{3})/g, '$1 $2').replace(/ m²/g, ' m²')
export const eur = (n) => `${n.toLocaleString('fr-FR').replace(/ /g, ' ')} €`
export const note = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 1 })

export const R = {
  a1pro: { id: 'a1pro', nom: 'Dreame A1 Pro', court: 'A1 Pro', img: 'dreame-a1-pro.webp', note: 8.0, prix: 1049, fnac: 1099, surface: 1200, pente: 45, cable: false, nav: 'LiDAR 3D', bruit: 48.5, entretien: 48, seg: 'Grand jardin plat', un: 'Carte du jardin en 20 minutes, sans antenne à planter.' },
  i105: { id: 'i105', nom: 'Segway Navimow i105E', court: 'Navimow i105E', img: 'segway-navimow-i105e.webp', note: 8.1, prix: 849, fnac: 899, surface: 500, pente: 30, cable: false, nav: 'GPS RTK + caméra', bruit: 54, entretien: 42, seg: 'Sans câble, jusqu’à 500 m²', un: 'Aucun câble à enterrer, 500 m² tondus en une charge.' },
  yuka: { id: 'yuka', nom: 'Mammotion Yuka Mini 2', court: 'Yuka Mini 2', img: 'mammotion-yuka-mini-2-1000.webp', note: 7.9, prix: 799, fnac: 829, surface: 800, pente: 50, cable: false, nav: 'Caméra 3D', bruit: 56, entretien: 44, seg: 'Terrain en pente', un: 'Annonce 50 % de pente pour moins de 800 €.' },
  m500: { id: 'm500', nom: 'Worx Landroid M500', court: 'Landroid M500', img: 'worx-landroid-m500-wr141e.webp', note: 7.4, prix: 399, fnac: 429, surface: 500, pente: 35, cable: true, nav: 'Câble périphérique', bruit: 67, entretien: 38, seg: 'Moins de 500 €', un: 'Le moins cher du classement, avec un câble à poser.' },
  indego: { id: 'indego', nom: 'Bosch Indego S+ 500', court: 'Indego S+ 500', img: 'bosch-indego-s-plus-500.webp', note: 7.2, prix: 649, fnac: 679, surface: 500, pente: 27, cable: true, nav: 'Câble périphérique', bruit: 61, entretien: 40, seg: 'Tonte en bandes', un: 'Tond en lignes parallèles au lieu de zigzaguer.' },
  sileno: { id: 'sileno', nom: 'Gardena Sileno Minimo 250', court: 'Sileno Minimo', img: 'gardena-sileno-minimo-250.webp', note: 7.1, prix: 549, fnac: 569, surface: 250, pente: 25, cable: true, nav: 'Câble périphérique', bruit: 57, entretien: 36, seg: 'Petit jardin', un: 'Passe dans les couloirs de 60 cm.' },
}

const NAV = [
  ['Choisir', [['quiz.html', 'Le quiz'], ['classement.html', 'Les classements'], ['comparateur.html', 'Le comparateur'], ['duel.html', 'Les duels']]],
  ['Lire', [['avis-robot.html', 'Avis robots'], ['marque.html', 'Avis marques'], ['guide.html', 'Guides et dépannage'], ['calendrier.html', 'Calendrier du gazon']]],
  ['Et aussi', [['promos.html', 'Promos vérifiées'], ['outil-cout.html', 'Coût sur 5 ans'], ['piscine.html', 'Robots de piscine'], ['mon-jardin.html', 'Mon jardin'], ['index.html', 'Storyboard de la maquette']]],
]

export const ring = (v, extra = '') => `<div class="ring" ${extra}><svg viewBox="0 0 112 112"><circle class="tr" cx="56" cy="56" r="46"/><circle class="fg" data-v="${v}" cx="56" cy="56" r="46"/></svg><b><span><span data-count="${v}" data-dec="1">${note(v)}</span><small>sur 10</small></span></b></div>`
export const buy = (r, cls = '', label = 'Voir chez Cdiscount') => `<a class="btn btn--full ${cls}" href="#" rel="sponsored">${label} <span class="num">· ${eur(r.prix)}</span> <span class="ar">→</span></a>`
export const dated = (shop = 'Cdiscount') => `<p class="dated">${shop} · prix relevé le ${DATE} · lien partenaire</p>`
export const pick = (r, tag, i = 0, rank = '') => `<article class="card pick rv" style="--i:${i}">
  <a class="shot" href="avis-robot.html" aria-label="Avis ${r.nom}"><span class="tag">${tag}</span>${rank ? `<span class="rank">${rank}</span>` : ''}<img src="img/cut/${r.img}" alt="${r.nom}" width="600" height="420" loading="lazy"></a>
  <div class="pick-b">
    <div class="pick-top"><div><h3>${r.nom}</h3><p class="score"><span>${note(r.note)}</span><small>/10</small></p></div><p class="price num">${eur(r.prix)}</p></div>
    <p class="small">${nb(r.un)}</p>
    <ul class="facts"><li>${nb(r.surface.toLocaleString('fr-FR') + ' m²')}</li><li>pente ${r.pente} %</li><li>${r.cable ? 'câble à poser' : 'sans câble'}</li></ul>
    ${buy(r)}
    <p class="dated">prix du ${DATE} · <a class="lnk" href="avis-robot.html">Lire l’avis</a></p>
  </div>
</article>`
export const mini = (r, why, href = 'avis-robot.html') => `<a class="card mini rv" href="${href}"><img src="img/cut/${r.img}" alt="" width="152" height="116" loading="lazy"><div><h3>${r.nom}</h3><p>${nb(why)}</p></div><span class="price num">${eur(r.prix)}</span></a>`
export const news = (title = 'La lettre du jardin', sub = 'Une fois par mois : les gestes du moment et les baisses de prix vérifiées.', btn = 'Recevoir la lettre') => `<form class="card card-p stack rv" data-demo>
  <h3 class="h-md">${title}</h3><p class="small muted">${nb(sub)}</p>
  <div class="field"><label for="em">Votre e-mail</label><input class="input" id="em" type="email" placeholder="prenom@exemple.fr" autocomplete="email"></div>
  <label class="check"><input type="checkbox"> <span>J’accepte de recevoir cet e-mail. Désinscription en un lien, voir la <a class="lnk" href="#">confidentialité</a>.</span></label>
  <button class="btn btn--full btn--ink" type="submit">${btn} <span class="ar">→</span></button>
</form>`
export const marquee = (words, cls = '') => `<div class="marquee ${cls}" aria-hidden="true"><div>${[...words, ...words].map((w) => `<span>${w}</span>`).join('')}</div></div>`
export const acc = (q, a) => `<details class="acc"><summary>${nb(q)}</summary><p>${nb(a)}</p></details>`

export function page(file, { title, body, buybar = '', scripts = '', mascot = '' }) {
  body = body.replace(/(<h[123][^>]*>)([^<]*)(<\/h[123]>)/g, (m, o, t, c) => o + nb(t) + c)
  if (mascot) body = body.replace(/<h1 class="h-xl"[^>]*>([\s\S]*?)<\/h1>/, `<div class="ttl"><h1 class="h-xl">$1</h1><img class="masc" src="img/robot-${mascot}.webp" alt="" width="150" height="150"></div>`)
  else body = body.replace(/<h1 class="h-xl"[^>]*>/, '<h1 class="h-xl" style="margin:6px 0 16px">')
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow"><title>${title} · Quel Robot Tondeuse (maquette V2)</title>
<link rel="preload" href="fonts/schibsted.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="styles.css?v=6"></head>
<body>
<p class="demo">Maquette V2 · prix, notes et dates d’exemple · <a href="index.html">storyboard</a></p>
<header class="hd"><div class="wrap hd-in"><a class="logo" href="accueil.html"><img src="img/robot-side.webp" alt="" width="40" height="32">Quel Robot Tondeuse</a><button class="burger" data-menu aria-label="Ouvrir le menu"><i></i>Menu</button></div>
<div class="mowbar" aria-hidden="true"><b></b><img src="img/robot-top.webp" alt="" width="30" height="25"></div></header>
<nav class="menu" aria-label="Menu"><div class="menu-top"><span class="logo">Quel Robot Tondeuse</span><button class="burger" data-menu>Fermer</button></div>
${NAV.map(([g, links]) => `<h2>${g}</h2><ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>`).join('')}</nav>
<main>
${body}
</main>
<footer class="foot"><div class="wrap"><p class="foot-top"><img src="img/robot-side.webp" alt="" width="54" height="43">Quel Robot Tondeuse</p>
<ul><li><a href="classement.html">Classements</a></li><li><a href="quiz.html">Quiz</a></li><li><a href="comparateur.html">Comparateur</a></li><li><a href="calendrier.html">Calendrier du gazon</a></li><li><a href="promos.html">Promos vérifiées</a></li><li><a href="piscine.html">Robots de piscine</a></li><li><a href="avis-robot.html#methode">Notre méthode</a></li><li><a href="mon-jardin.html">Mon jardin</a></li></ul>
<p>Nous n’essayons pas les robots. Chaque note vient d’un barème public appliqué aux fiches des fabricants et à des sources lues. Les liens vers les marchands sont des liens partenaires.</p></div></footer>
${buybar}
${scripts}<script src="app.js?v=4" defer></script>
</body></html>`
  writeFileSync(`${OUT}/${file}`, html)
  console.log('écrit', file)
}
