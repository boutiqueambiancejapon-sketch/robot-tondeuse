/* Quel Robot Tondeuse — maquette V3 : comportements communs et par page. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const euro = (n) => `${Math.round(n).toLocaleString('fr-FR').replace(/ /g, ' ')} €`;

  /* Menu */
  const menu = $('.menu');
  $$('[data-menu]').forEach((b) => b.addEventListener('click', () => {
    menu.classList.toggle('open');
    $$('li', menu).forEach((li, i) => (li.style.transitionDelay = `${120 + i * 45}ms`));
  }));

  /* Barre de lecture tondue */
  const bar = $('.mowbar');
  if (bar) {
    const fill = $('b', bar), bot = $('img', bar);
    const upd = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      fill.style.width = `${p * 100}%`;
      bot.style.left = `calc(${p} * (100% - 30px))`;
    };
    addEventListener('scroll', upd, { passive: true });
    addEventListener('resize', upd);
    upd();
  }

  /* Apparitions, compteurs, anneaux, barres */
  const count = (el) => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), t0 = performance.now(), d = 1200;
    const fmt = (v) => v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (calm || !el.closest('.ring')) return (el.textContent = fmt(to));
    const step = (t) => {
      const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const fire = (el) => {
    el.classList.add('in');
    $$('[data-count]', el).concat(el.matches('[data-count]') ? [el] : []).forEach(count);
    $$('.ring .fg', el).forEach((c) => (c.style.strokeDashoffset = 289 * (1 - parseFloat(c.dataset.v) / 10)));
    $$('[data-w]', el).forEach((i) => (i.style.width = `${i.dataset.w}%`));
    $$('[data-left]', el).forEach((i) => (i.style.left = `${i.dataset.left}%`));
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { fire(e.target); io.unobserve(e.target); }
  }), { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  $$('.rv, .rv-pop, [data-fire]').forEach((el) => (calm ? fire(el) : io.observe(el)));

  /* Barre d'achat */
  const buy = $('.buybar'), sent = $('[data-buy-after]');
  if (buy && sent) {
    const t = () => buy.classList.toggle('show', sent.getBoundingClientRect().bottom < 60);
    addEventListener('scroll', t, { passive: true });
    t();
  }

  /* Filtres par pastilles */
  $$('[data-filter]').forEach((group) => {
    const target = $(group.dataset.filter);
    $$('.chip', group).forEach((chip) => chip.addEventListener('click', () => {
      $$('.chip', group).forEach((c) => c.classList.toggle('on', c === chip));
      const f = chip.dataset.f;
      $$('[data-tags]', target).forEach((row) => {
        const ok = !f || row.dataset.tags.split(' ').includes(f);
        row.classList.toggle('hide', !ok);
        row.style.display = ok ? '' : 'none';
        if (ok && !calm) row.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
      });
    }));
  });

  /* Brins d'herbe qui volent */
  const clippings = (host, x, y, n = 1, spread = 26) => {
    if (calm) return;
    for (let i = 0; i < n; i++) {
      const c = document.createElement('i');
      c.className = 'clip';
      c.style.background = Math.random() > 0.5 ? 'var(--lime)' : 'var(--grass)';
      host.appendChild(c);
      const a = Math.random() * Math.PI * 2, d = 10 + Math.random() * spread;
      c.animate([
        { transform: `translate(${x}px,${y}px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x + Math.cos(a) * d}px,${y + Math.sin(a) * d - 14}px) rotate(${Math.random() * 300}deg)`, opacity: 0 },
      ], { duration: 500 + Math.random() * 400, easing: 'ease-out' }).onfinish = () => c.remove();
    }
  };

  /* Accueil : le robot tond le titre */
  const lawn = $('.lawn');
  if (lawn) {
    const bot = $('.bot', lawn), lines = $$('.ln', lawn);
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      lawn.classList.remove('done');
      lines.forEach((l) => l.style.setProperty('--p', 0));
      const box = lawn.getBoundingClientRect(), W = box.width, bw = bot.offsetWidth, bh = bot.offsetHeight || bw * 0.84;
      const rows = lines.map((l, i) => {
        const r = l.getBoundingClientRect();
        return { el: l, y: r.top - box.top + r.height / 2 - bh / 2, rtl: i % 2 === 1 };
      });
      const st = $('.dock', lawn).getBoundingClientRect();
      const dock = { x: st.left - box.left + (st.width - bw) / 2, y: st.top - box.top + (st.height - bh) / 2 - 2 };
      if (calm) {
        lines.forEach((l) => l.style.setProperty('--p', 1));
        bot.style.transform = `translate(${dock.x}px,${dock.y}px) rotate(-90deg)`;
        return lawn.classList.add('done');
      }
      const LINE = 900, TURN = 240;
      const t0 = performance.now();
      let last = 0;
      const frame = (now) => {
        const t = Math.max(0, now - t0), seg = Math.floor(t / (LINE + TURN)), k = t - seg * (LINE + TURN);
        if (seg >= rows.length) {
          const kk = Math.min(1, (t - rows.length * (LINE + TURN)) / 700), e = 1 - Math.pow(1 - kk, 3);
          const from = rows[rows.length - 1], fx = from.rtl ? -bw * 0.3 : W - bw * 0.7;
          bot.style.transform = `translate(${fx + (dock.x - fx) * e}px,${from.y + (dock.y - from.y) * e}px) rotate(${from.rtl ? 180 - 270 * e : -90 * e}deg)`;
          if (kk < 1) return (raf = requestAnimationFrame(frame));
          return lawn.classList.add('done');
        }
        const row = rows[seg];
        if (k <= LINE) {
          const p = k / LINE, x = row.rtl ? W - bw * 0.7 - p * (W - bw * 0.4) : -bw * 0.3 + p * (W - bw * 0.4);
          row.el.style.setProperty('--p', Math.min(1, p * 1.04));
          bot.style.transform = `translate(${x}px,${row.y}px) rotate(${row.rtl ? 180 : 0}deg)`;
          if (now - last > 55) { last = now; clippings(lawn, x + (row.rtl ? bw : 0), row.y + bh / 2, 2); }
        } else {
          row.el.style.setProperty('--p', 1);
          const nx = rows[seg + 1];
          if (nx) {
            const p = (k - LINE) / TURN, x = row.rtl ? -bw * 0.3 : W - bw * 0.7;
            bot.style.transform = `translate(${x}px,${row.y + (nx.y - row.y) * p}px) rotate(${row.rtl ? 180 - 180 * p : 180 * p}deg)`;
          }
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };
    const start = () => (document.fonts && document.fonts.ready ? document.fonts.ready.then(run) : run());
    start();
    $('.replay', lawn)?.addEventListener('click', run);
    let w = innerWidth;
    addEventListener('resize', () => { if (innerWidth !== w) { w = innerWidth; run(); } });
  }

  /* Quiz en 5 questions */
  const quiz = $('[data-quiz]');
  if (quiz) {
    const qs = $$('.q', quiz), fill = $('.track i'), bot = $('.track img'), stepLbl = $('[data-step]');
    const answers = {};
    const go = (i) => {
      qs.forEach((q, j) => q.classList.toggle('on', j === i));
      const p = 16 + (i / qs.length) * 84;
      fill.style.width = `${p}%`;
      bot.style.left = `${p}%`;
      if (stepLbl) stepLbl.textContent = `Question ${i + 1} sur ${qs.length}`;
      scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
    };
    qs.forEach((q, i) => $$('.opt', q).forEach((o) => o.addEventListener('click', () => {
      $$('.opt', q).forEach((x) => x.classList.toggle('sel', x === o));
      answers[q.dataset.key] = o.dataset.v;
      setTimeout(() => {
        if (i + 1 < qs.length) return go(i + 1);
        fill.style.width = '100%'; bot.style.left = '100%';
        try { sessionStorage.setItem('qrt-quiz', JSON.stringify(answers)); } catch {}
        setTimeout(() => (location.href = 'quiz-resultat.html'), calm ? 0 : 650);
      }, calm ? 0 : 260);
    })));
    $$('[data-back]').forEach((b) => b.addEventListener('click', () => go(Math.max(0, qs.findIndex((q) => q.classList.contains('on')) - 1))));
    const pre = new URLSearchParams(location.search).get('surface');
    if (pre) { answers.surface = pre; go(1); }
  }

  /* Résultat : réponses rappelées et gerbe d'herbe */
  const res = $('[data-result]');
  if (res) {
    try {
      const a = JSON.parse(sessionStorage.getItem('qrt-quiz') || 'null');
      if (a) $$('[data-a]', res).forEach((el) => { if (a[el.dataset.a]) el.textContent = a[el.dataset.a]; });
    } catch {}
    const b = $('.burst', res);
    if (b && !calm) for (let i = 0; i < 46; i++) {
      const c = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 150;
      c.style.background = ['var(--lime)', 'var(--grass)', 'var(--copper)'][i % 3];
      b.appendChild(c);
      c.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d * 0.8 + 60}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 1100 + Math.random() * 900, delay: 250, easing: 'cubic-bezier(.1,.7,.3,1)', fill: 'both' });
    }
  }

  /* Duel : le gagnant change avec la surface */
  const duel = $('[data-duel]');
  if (duel) $$('.seg button', duel).forEach((b) => b.addEventListener('click', () => {
    $$('.seg button', duel).forEach((x) => x.classList.toggle('on', x === b));
    const w = b.dataset.win;
    $$('.side', duel).forEach((s) => s.classList.toggle('win', s.dataset.id === w));
    $$('[data-for]', duel).forEach((p) => (p.hidden = p.dataset.for !== w));
    const side = $(`.side[data-id="${w}"]`, duel);
    if (!calm) side.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.05) rotate(-1.5deg)' }, { transform: 'scale(1)' }], { duration: 450, easing: 'ease-out' });
  }));

  /* Comparateur */
  const cmp = $('[data-cmp]');
  if (cmp) {
    const data = JSON.parse($('#robots').textContent), body = $('tbody', cmp), head = $('thead tr', cmp), verdict = $('[data-cmp-verdict]');
    const rows = [
      ['Note', (r) => r.note.toLocaleString('fr-FR', { minimumFractionDigits: 1 }), (r) => r.note, 'max'],
      ['Prix du jour', (r) => euro(r.prix), (r) => r.prix, 'min'],
      ['Surface conseillée', (r) => `${r.surface.toLocaleString('fr-FR')} m²`, (r) => r.surface, 'max'],
      ['Pente annoncée', (r) => `${r.pente} %`, (r) => r.pente, 'max'],
      ['Installation', (r) => (r.cable ? 'Câble à poser' : 'Sans câble'), (r) => (r.cable ? 0 : 1), 'max'],
      ['Bruit annoncé', (r) => `${r.bruit.toLocaleString('fr-FR')} dB`, (r) => r.bruit, 'min'],
      ['Coût sur 5 ans', (r) => euro(r.prix + 5 * r.entretien), (r) => r.prix + 5 * r.entretien, 'min'],
    ];
    const draw = () => {
      const sel = $$('.chip.on', cmp).map((c) => data.find((r) => r.id === c.dataset.id));
      head.innerHTML = '<th>Critère</th>' + sel.map((r) => `<th>${r.court}</th>`).join('');
      body.innerHTML = rows.map(([l, f, v, m]) => {
        const vals = sel.map(v), best = m === 'max' ? Math.max(...vals) : Math.min(...vals), tie = vals.every((x) => x === vals[0]);
        return `<tr><td>${l}</td>${sel.map((r, i) => `<td class="${!tie && vals[i] === best ? 'best' : ''}">${f(r)}</td>`).join('')}</tr>`;
      }).join('');
      const top = [...sel].sort((a, b) => b.note - a.note)[0], cheap = [...sel].sort((a, b) => a.prix - b.prix)[0];
      verdict.innerHTML = sel.length < 2 ? 'Choisissez au moins deux robots.' : top === cheap ? `<b>${top.nom}</b> a la meilleure note et le prix le plus bas des ${sel.length}.` : `<b>${top.nom}</b> a la meilleure note. <b>${cheap.nom}</b> coûte ${euro(top.prix - cheap.prix)} de moins.`;
      if (!calm) body.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 300 });
    };
    $$('.chip', cmp).forEach((c) => c.addEventListener('click', () => {
      const on = $$('.chip.on', cmp);
      if (!c.classList.contains('on') && on.length >= 3) on[0].classList.remove('on');
      if (c.classList.contains('on') && on.length <= 2) return;
      c.classList.toggle('on');
      draw();
    }));
    draw();
  }

  /* Outil : coût sur 5 ans */
  const cost = $('[data-cost]');
  if (cost) {
    const out = (k) => $(`[data-o="${k}"]`, cost);
    const calc = () => {
      const s = +$('#c-surface').value, n = +$('#c-tontes').value, h = +$('#c-heure').value;
      const robot = (s <= 500 ? 600 : s <= 1200 ? 1000 : 1700) + 5 * (45 + s * 0.012);
      const thermo = (s <= 500 ? 280 : s <= 1200 ? 420 : 650) + 5 * (60 + n * s * 0.0011);
      const hours = Math.round(5 * n * (s / 1000) * 0.9);
      const max = Math.max(robot, thermo);
      out('surface').textContent = `${s.toLocaleString('fr-FR')} m²`;
      out('tontes').textContent = `${n} tontes`;
      out('heure').textContent = h ? `${h} € de l'heure` : 'non compté';
      out('robot').textContent = euro(robot); out('thermo').textContent = euro(thermo);
      $('[data-b="robot"]', cost).style.width = `${(robot / max) * 100}%`;
      $('[data-b="thermo"]', cost).style.width = `${(thermo / max) * 100}%`;
      out('heures').textContent = `${hours} h`;
      const diff = robot - thermo, gain = hours * h;
      out('phrase').innerHTML = diff > 0
        ? `Le robot coûte <b>${euro(diff)}</b> de plus sur 5 ans et vous rend <b>${hours} heures</b>${h ? `, soit ${euro(gain)} de votre temps` : ''}.`
        : `Le robot coûte <b>${euro(-diff)}</b> de moins sur 5 ans et vous rend <b>${hours} heures</b>.`;
      out('cta').textContent = `Voir les robots pour ${s.toLocaleString('fr-FR')} m²`;
    };
    $$('input', cost).forEach((i) => i.addEventListener('input', calc));
    calc();
  }

  /* Calendrier du gazon */
  const cal = $('[data-cal]');
  if (cal) {
    const data = JSON.parse($('#mois').textContent), list = $('[data-tasks]', cal), title = $('[data-mois]', cal), pic = $('[data-saison]', cal), txt = $('[data-saison-txt]', cal);
    const show = (i) => {
      const m = data[i];
      $$('.months button', cal).forEach((b, j) => b.classList.toggle('on', j === i));
      title.textContent = `En ${m.nom}`;
      pic.src = `img/robot-${m.saison}.webp`;
      txt.textContent = m.robot;
      list.innerHTML = m.gestes.map(([t, d], k) => `<li class="task"><span class="n">${k + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('');
      if (!calm) $$('li', list).forEach((li, k) => li.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: k * 80, easing: 'ease-out', fill: 'both' }));
    };
    $$('.months button', cal).forEach((b, i) => b.addEventListener('click', () => show(i)));
    show(10);
    $('.months button.on', cal)?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  /* Tuiles à choix unique (piscine, région) */
  $$('[data-pick]').forEach((g) => $$('.tile, .chip', g).forEach((t) => t.addEventListener('click', () => {
    $$('.tile, .chip', g).forEach((x) => x.classList.toggle('on', x === t));
    const target = g.dataset.pick && $(g.dataset.pick);
    if (target) $$('[data-tags]', target).forEach((el) => {
      const ok = el.dataset.tags.split(' ').includes(t.dataset.f);
      el.style.display = ok ? '' : 'none';
      if (ok && !calm) el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'ease-out' });
    });
  })));

  /* Formulaires de la maquette : rien n'est envoyé */
  $$('form[data-demo]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const b = $('button', f);
    b.textContent = 'Maquette : rien n’est envoyé';
  }));
})();
