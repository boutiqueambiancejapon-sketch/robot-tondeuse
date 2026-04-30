// ============================================
// HOME PAGE — CRO aggressive, animated hero
// ============================================

const HomePage = ({ navigate }) => {
  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="home" dark />
      <HeroSection navigate={navigate} />
      <TrustBar />
      <ToolsSection navigate={navigate} />
      <TopRobotsSection navigate={navigate} />
      <QuizTeaser navigate={navigate} />
      <BrandsStrip navigate={navigate} />
      <MethodologySection />
      <Footer navigate={navigate} />
      <StickyCTA navigate={navigate} />
    </div>
  );
};

// ============================================
// HERO — animated robot mowing a garden
// ============================================
const HeroSection = ({ navigate }) => {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, var(--forest-deep) 0%, var(--forest) 100%)',
      color: 'var(--ivory)',
      paddingTop: 120,
      paddingBottom: 80,
      overflow: 'hidden',
    }}>
      {/* Ambient grass field */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <pattern id="hero-grass" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M5 20 L5 12 M10 20 L10 8 M15 20 L15 14" stroke="var(--sage-light)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grass)" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
        <div className="stagger">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span className="eyebrow" style={{ color: 'var(--copper-bright)' }}>● LIVE 2026 · MIS À JOUR HIER</span>
          </div>
          <h1 style={{ fontSize: 84, lineHeight: 1.1, marginBottom: 40, fontFamily: 'var(--serif)', paddingBottom: '0.18em' }}>
            Le robot qui tond<br/>
            <em style={{ color: 'var(--copper-bright)', fontStyle: 'italic' }}>vraiment</em> votre jardin.
          </h1>
          <p style={{ fontSize: 19, color: 'var(--sage-light)', lineHeight: 1.55, maxWidth: 520, marginBottom: 36 }}>
            On a testé 47 modèles dans la boue, sur des pentes, sous la pluie. Voici ceux qui méritent vraiment leur place dans votre jardin — et nos outils pour trouver le vôtre en 2 minutes.
          </p>

          <div style={{ display: 'flex', gap: 14, marginBottom: 40, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('quiz')} className="btn btn-primary" style={{ fontSize: 16, padding: '18px 28px' }}>
              <span style={{ fontSize: 18 }}>🌱</span>
              Trouver mon robot en 2 min
            </button>
            <button onClick={() => navigate('hub')} className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--ivory)', fontSize: 16, padding: '18px 28px', border: '1px solid rgba(255,255,255,0.15)' }}>
              Voir le top 2026 →
            </button>
          </div>

          <div style={{ display: 'flex', gap: 28, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { num: '47', label: 'modèles testés' },
              { num: '2.4M', label: 'lecteurs/an' },
              { num: '100%', label: 'indépendant' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 38, color: 'var(--ivory)' }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>

      <GrassDecor height={60} />
    </section>
  );
};

// Stylized garden with robot mowing in real-time
const HeroVisual = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const animate = () => {
      setProgress(p => (p + 0.3) % 100);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Robot path (lawnmower pattern)
  const pathPoints = [];
  const rows = 8;
  const cols = 12;
  for (let r = 0; r < rows; r++) {
    const y = 60 + r * 30;
    if (r % 2 === 0) {
      for (let c = 0; c < cols; c++) pathPoints.push([60 + c * 25, y]);
    } else {
      for (let c = cols - 1; c >= 0; c--) pathPoints.push([60 + c * 25, y]);
    }
  }
  const totalSteps = pathPoints.length;
  const idx = Math.floor((progress / 100) * totalSteps);
  const robotPos = pathPoints[Math.min(idx, totalSteps - 1)];
  const cutPath = pathPoints.slice(0, idx + 1).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');

  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1', background: 'rgba(255,255,255,0.02)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', padding: 24 }}>
      {/* Garden viewport label */}
      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, alignItems: 'center', zIndex: 5 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--sage)', letterSpacing: '0.15em' }}>
          MON_JARDIN.LIVE — 247m²
        </span>
      </div>

      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 6, zIndex: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7fd47f', animation: 'blink 1.5s infinite' }}></span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#7fd47f', letterSpacing: '0.1em' }}>EN MARCHE</span>
      </div>

      {/* Garden SVG */}
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="lawn-uncut" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#3a5a3d" />
            <path d="M1 6 L1 3 M3 6 L3 2 M5 6 L5 4" stroke="#5a8a5d" strokeWidth="0.5" />
          </pattern>
          <pattern id="lawn-cut" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#5a8a5d" />
          </pattern>
        </defs>

        {/* Garden plot — irregular shape */}
        <path d="M 30 30 L 380 40 L 390 270 Q 380 290, 350 290 L 60 285 Q 35 285, 30 260 Z" fill="url(#lawn-uncut)" stroke="var(--copper)" strokeWidth="1" strokeDasharray="3 3" opacity="0.95" />

        {/* Cut area — follow path with thick stroke */}
        {cutPath && (
          <path d={cutPath} stroke="url(#lawn-cut)" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        )}

        {/* Obstacles */}
        <circle cx="180" cy="160" r="18" fill="#6b4a2a" opacity="0.7" />
        <circle cx="180" cy="160" r="22" fill="#3a5a3d" opacity="0.5" />
        <text x="180" y="195" textAnchor="middle" fontSize="9" fill="var(--sage)" fontFamily="var(--mono)">arbre</text>

        <rect x="280" y="200" width="60" height="40" rx="4" fill="#8a7a6a" opacity="0.6" />
        <text x="310" y="225" textAnchor="middle" fontSize="9" fill="var(--cream)" fontFamily="var(--mono)">terrasse</text>

        {/* Charging station */}
        <g transform="translate(50, 50)">
          <rect x="-8" y="-8" width="16" height="16" rx="2" fill="var(--copper)" />
          <rect x="-5" y="-5" width="10" height="10" rx="1" fill="var(--copper-bright)" />
          <text x="0" y="22" textAnchor="middle" fontSize="9" fill="var(--sage-light)" fontFamily="var(--mono)">⚡ base</text>
        </g>

        {/* Robot */}
        {robotPos && (
          <g transform={`translate(${robotPos[0]}, ${robotPos[1]})`}>
            {/* pulse ring */}
            <circle r="20" fill="none" stroke="var(--copper-bright)" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" from="12" to="28" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle r="11" fill="var(--ink)" />
            <circle r="9" fill="var(--copper)" />
            <circle r="3" fill="var(--ivory)" />
          </g>
        )}
      </svg>

      {/* Live stats */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', gap: 8, justifyContent: 'space-between' }}>
        {[
          { l: 'TONDU', v: `${Math.round(progress)}%` },
          { l: 'TEMPS', v: `${Math.round(progress * 0.9)}m` },
          { l: 'BATT.', v: `${Math.max(20, 100 - Math.round(progress * 0.6))}%` },
          { l: 'BRUIT', v: '54dB' },
        ].map(s => (
          <div key={s.l} style={{ flex: 1, padding: '8px 10px', background: 'rgba(0,0,0,0.4)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--sage)', letterSpacing: '0.1em' }}>{s.l}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 600, color: 'var(--copper-bright)' }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrustBar = () => (
  <section style={{ background: 'var(--cream)', padding: '24px 0', borderBottom: '1px solid var(--line-soft)' }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        ★ Recommandé par
      </span>
      {['Le Monde Jardin', 'Maison & Co', '60 Millions', 'Que Choisir', 'France Bricolage'].map(p => (
        <div key={p} style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--moss)', opacity: 0.6 }}>{p}</div>
      ))}
    </div>
  </section>
);

// ============================================
// TOOLS SECTION — interactive entry points
// ============================================
const ToolsSection = ({ navigate }) => {
  const tools = [
    { id: 'quiz', icon: '🌱', title: 'Trouvez votre robot', desc: '7 questions, votre match parfait', tag: 'POPULAIRE', tagColor: 'copper', time: '2 min' },
    { id: 'superficie', icon: '📐', title: 'Mesurez votre jardin', desc: 'Dessinez ou saisissez votre surface', tag: 'PRÉCIS', tagColor: 'dark', time: '1 min' },
    { id: 'compare', icon: '⚖️', title: 'Comparateur direct', desc: 'Confrontez 3 modèles côte à côte', tag: 'EXPERT', tagColor: 'outline', time: '5 min' },
    { id: 'roi', icon: '💰', title: 'Calculez vos économies', desc: 'Rentabilité vs tondeuse classique', tag: 'NOUVEAU', tagColor: 'copper', time: '30 s' },
  ];

  return (
    <section style={{ padding: '120px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>02 — Outils intelligents</div>
            <h2 style={{ fontSize: 56, maxWidth: 700, fontFamily: 'var(--serif)' }}>
              Trouvez le vôtre en quelques clics, <em style={{ color: 'var(--copper)' }}>pas en heures</em>.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 280 }}>
            Plutôt que de lire 30 articles, utilisez nos outils pensés par des jardiniers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {tools.map((t, i) => (
            <button key={t.id} onClick={() => navigate(t.id)} className="card tool-card" style={{
              padding: 28,
              textAlign: 'left',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--ivory)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--moss)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--line-soft)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 44, lineHeight: 1 }}>{t.icon}</div>
                  <span className={`chip chip-${t.tagColor}`} style={{ fontSize: 9 }}>{t.tag}</span>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 26, marginBottom: 8, fontFamily: 'var(--serif)' }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>{t.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--moss)', letterSpacing: '0.1em' }}>⏱ {t.time}</span>
                  <span style={{ fontSize: 13, color: 'var(--copper)', fontWeight: 500 }}>Lancer →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TOP ROBOTS — featured cards with affiliate CTAs
// ============================================
const TopRobotsSection = ({ navigate }) => {
  const top = ROBOTS.slice(0, 3);
  return (
    <section style={{ background: 'var(--cream)', padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>03 — Le podium 2026</div>
            <h2 style={{ fontSize: 56, fontFamily: 'var(--serif)' }}>
              Nos 3 robots <em style={{ color: 'var(--copper)' }}>coups de cœur</em>
            </h2>
          </div>
          <button onClick={() => navigate('hub')} className="btn btn-ghost">Voir le top 10 →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {top.map((r, i) => (
            <RobotCard key={r.id} robot={r} rank={i + 1} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RobotCard = ({ robot, rank, navigate }) => (
  <article className="card" style={{
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--ivory)',
    transition: 'all 0.3s ease',
    position: 'relative',
  }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    {robot.badge && (
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2, padding: '5px 11px', background: 'var(--copper)', color: 'var(--ivory)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', borderRadius: 100 }}>
        ★ {robot.badge}
      </div>
    )}
    <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, width: 36, height: 36, borderRadius: '50%', background: 'var(--forest-deep)', color: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 18 }}>
      {rank}
    </div>

    <div className="product-placeholder" style={{ height: 220, borderRadius: 0, background: `linear-gradient(135deg, ${robot.color}22 0%, ${robot.color}11 100%)` }}>
      {/* Stylized robot icon */}
      <svg width="120" height="120" viewBox="0 0 120 120">
        <ellipse cx="60" cy="60" rx="50" ry="38" fill={robot.color} />
        <ellipse cx="60" cy="56" rx="42" ry="30" fill={robot.color} opacity="0.7" />
        <rect x="50" y="40" width="20" height="3" rx="1" fill="var(--copper)" />
        <circle cx="60" cy="58" r="4" fill="var(--sage-light)" />
        <text x="60" y="105" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill={robot.color} opacity="0.6">{robot.brand.toUpperCase()}</text>
      </svg>
    </div>

    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.1em', marginBottom: 4 }}>{robot.brand.toUpperCase()}</div>
        <h3 style={{ fontSize: 26, fontFamily: 'var(--serif)' }}>{robot.model}</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{robot.tagline}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StarRating value={robot.rating} />
        <span style={{ fontSize: 13, fontWeight: 500 }}>{robot.rating}</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>· {robot.reviewCount} avis</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>SURFACE</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{robot.surface}m²</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>PENTE</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{robot.slope}%</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
        <div>
          {robot.oldPrice && <div style={{ fontSize: 13, textDecoration: 'line-through', color: 'var(--muted)' }}>{robot.oldPrice}€</div>}
          <div style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>{robot.price}€</div>
          {robot.oldPrice && <div style={{ fontSize: 11, color: 'var(--copper)', fontFamily: 'var(--mono)' }}>-{Math.round((1 - robot.price/robot.oldPrice) * 100)}% éco. {robot.oldPrice - robot.price}€</div>}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('article')} style={{ fontSize: 13, padding: '10px 16px' }}>
          Meilleur prix →
        </button>
      </div>
      <button onClick={() => navigate('article')} style={{ fontSize: 12, color: 'var(--moss)', textAlign: 'center', textDecoration: 'underline', marginTop: 4 }}>
        Lire le test complet
      </button>
    </div>
  </article>
);

// ============================================
// QUIZ TEASER — call to action
// ============================================
const QuizTeaser = ({ navigate }) => (
  <section style={{ padding: '120px 0', background: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        background: 'var(--forest-deep)',
        color: 'var(--ivory)',
        borderRadius: 32,
        padding: 64,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--copper-bright)', marginBottom: 16 }}>● Outil signature</div>
          <h2 style={{ fontSize: 52, marginBottom: 24, fontFamily: 'var(--serif)' }}>
            Le quiz qui<br/>
            <em style={{ color: 'var(--copper-bright)' }}>ne se trompe jamais</em>.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--sage-light)', maxWidth: 460, marginBottom: 32 }}>
            7 questions sur votre jardin, votre budget, vos contraintes. Notre algorithme croise 47 modèles testés et vous sort LE robot fait pour vous. C'est tout.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32 }}>
            <button onClick={() => navigate('quiz')} className="btn btn-primary" style={{ fontSize: 16, padding: '16px 24px' }}>
              Lancer le quiz →
            </button>
            <span style={{ fontSize: 13, color: 'var(--sage)' }}>2 min · 100% gratuit · sans email</span>
          </div>
          <div style={{ display: 'flex', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: ['var(--copper)', 'var(--sage)', 'var(--moss)', 'var(--copper-bright)'][i-1], marginLeft: i > 1 ? -10 : 0, border: '2px solid var(--forest-deep)' }}></div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--sage)' }}>+187k tests réalisés</div>
            </div>
          </div>
        </div>

        {/* Mini quiz preview */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 32, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--sage)', letterSpacing: '0.1em' }}>QUESTION 3 / 7</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--copper-bright)' }}>43%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden', marginBottom: 28 }}>
              <div style={{ width: '43%', height: '100%', background: 'var(--copper)', borderRadius: 100 }}></div>
            </div>
            <h3 style={{ fontSize: 28, marginBottom: 24, fontFamily: 'var(--serif)' }}>Votre jardin a-t-il des pentes ?</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { l: 'Plat comme une crêpe', sub: '< 10% inclinaison' },
              { l: 'Quelques bosses', sub: '10-25%', selected: true },
              { l: 'Vrai relief', sub: '> 25%' },
            ].map((opt, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                background: opt.selected ? 'var(--copper)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${opt.selected ? 'var(--copper)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{opt.l}</div>
                  <div style={{ fontSize: 11, color: opt.selected ? 'rgba(255,255,255,0.7)' : 'var(--sage)', marginTop: 2 }}>{opt.sub}</div>
                </div>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${opt.selected ? 'var(--ivory)' : 'rgba(255,255,255,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {opt.selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ivory)' }}></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// BRANDS STRIP
// ============================================
const BrandsStrip = ({ navigate }) => (
  <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>04 — Par marque</div>
        <h2 style={{ fontSize: 48, fontFamily: 'var(--serif)' }}>Toutes les marques, <em style={{ color: 'var(--copper)' }}>décortiquées</em></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
        {BRANDS.map(b => (
          <button key={b.id} onClick={() => navigate('hub')} style={{
            padding: 24,
            background: 'var(--ivory)',
            borderRadius: 16,
            border: '1px solid var(--line-soft)',
            transition: 'all 0.2s',
            textAlign: 'center',
            cursor: 'pointer',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = b.color; e.currentTarget.style.color = 'var(--ivory)'; e.currentTarget.style.borderColor = b.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ivory)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{b.country}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{b.name}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.6, marginTop: 4, letterSpacing: '0.1em' }}>{b.count} MODÈLES</div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

// ============================================
// METHODOLOGY — trust building
// ============================================
const MethodologySection = () => (
  <section style={{ padding: '120px 0', background: 'var(--paper)' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>05 — Notre méthode</div>
        <h2 style={{ fontSize: 56, marginBottom: 28, fontFamily: 'var(--serif)' }}>
          On teste pour de vrai.<br/><em style={{ color: 'var(--copper)' }}>Dans la boue.</em>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 28, lineHeight: 1.6 }}>
          Pas de fiches techniques recyclées. Chaque robot passe 6 semaines minimum dans un vrai jardin (le nôtre, ou celui de notre réseau de testeurs). On note 47 critères. On filme. On documente.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          {[
            { n: '47', l: 'critères évalués' },
            { n: '6 sem.', l: 'de test minimum' },
            { n: '0€', l: 'reçu des marques' },
            { n: '12', l: 'jardins testeurs' },
          ].map(s => (
            <div key={s.l} style={{ paddingBottom: 16, borderBottom: '1px solid var(--line-soft)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--forest)' }}>{s.n}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-ghost">Lire notre méthodologie →</button>
      </div>

      {/* Score wheel decoration */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', aspectRatio: '1 / 1' }}>
        <svg viewBox="0 0 400 400" style={{ width: '100%' }}>
          <circle cx="200" cy="200" r="150" fill="none" stroke="var(--line-soft)" strokeWidth="2" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="var(--line-soft)" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="var(--line-soft)" strokeWidth="1" />
          {[
            { angle: 0, label: 'Performance', value: 9.2 },
            { angle: 72, label: 'Autonomie', value: 8.8 },
            { angle: 144, label: 'Bruit', value: 9.5 },
            { angle: 216, label: 'App', value: 7.8 },
            { angle: 288, label: 'Prix', value: 8.4 },
          ].map((s, i) => {
            const rad = (s.angle - 90) * Math.PI / 180;
            const r = 90 + (s.value / 10) * 60;
            const x = 200 + Math.cos(rad) * r;
            const y = 200 + Math.sin(rad) * r;
            const lx = 200 + Math.cos(rad) * 175;
            const ly = 200 + Math.sin(rad) * 175;
            return (
              <g key={i}>
                <line x1="200" y1="200" x2={x} y2={y} stroke="var(--copper)" strokeWidth="1.5" opacity="0.5" />
                <circle cx={x} cy={y} r="6" fill="var(--copper)" />
                <text x={lx} y={ly} textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill="var(--moss)">{s.label}</text>
                <text x={lx} y={ly + 14} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fontWeight="600" fill="var(--copper)">{s.value}/10</text>
              </g>
            );
          })}
          {/* Polygon */}
          <polygon
            points={[
              { angle: 0, value: 9.2 },
              { angle: 72, value: 8.8 },
              { angle: 144, value: 9.5 },
              { angle: 216, value: 7.8 },
              { angle: 288, value: 8.4 },
            ].map(s => {
              const rad = (s.angle - 90) * Math.PI / 180;
              const r = 90 + (s.value / 10) * 60;
              return `${200 + Math.cos(rad) * r},${200 + Math.sin(rad) * r}`;
            }).join(' ')}
            fill="var(--copper)"
            opacity="0.15"
            stroke="var(--copper)"
            strokeWidth="2"
          />
          <circle cx="200" cy="200" r="40" fill="var(--forest-deep)" />
          <text x="200" y="195" textAnchor="middle" fontFamily="var(--serif)" fontSize="22" fill="var(--ivory)">8.7</text>
          <text x="200" y="215" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--sage)" letterSpacing="0.1em">SCORE</text>
        </svg>
      </div>
    </div>
  </section>
);

Object.assign(window, { HomePage });
