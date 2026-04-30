// ============================================
// TOOLS PAGES — Quiz, Superficie, Compare, ROI
// ============================================

// --------------------------------------------
// QUIZ
// --------------------------------------------
const QuizPage = ({ navigate }) => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  const questions = [
    { id: 'surface', q: 'Quelle est la superficie de votre jardin ?', icon: '📐',
      options: [
        { v: 350, l: 'Petit', sub: 'moins de 500m²', emoji: '🏡' },
        { v: 1000, l: 'Moyen', sub: '500 à 1500m²', emoji: '🏠' },
        { v: 2000, l: 'Grand', sub: '1500 à 3000m²', emoji: '🌳' },
        { v: 4000, l: 'Très grand', sub: 'plus de 3000m²', emoji: '🌲' },
      ]},
    { id: 'slope', q: 'Votre terrain a-t-il des pentes ?', icon: '⛰',
      options: [
        { v: 5, l: 'Plat', sub: 'comme une crêpe', emoji: '➖' },
        { v: 25, l: 'Quelques bosses', sub: '10-25% inclinaison', emoji: '〰' },
        { v: 40, l: 'Vraies pentes', sub: '25-45% inclinaison', emoji: '📈' },
      ]},
    { id: 'budget', q: 'Quel est votre budget ?', icon: '💰',
      options: [
        { v: 500, l: 'Serré', sub: 'moins de 700€', emoji: '🪙' },
        { v: 1200, l: 'Confortable', sub: '700 à 1500€', emoji: '💵' },
        { v: 2000, l: 'Premium', sub: '1500 à 2500€', emoji: '💎' },
        { v: 4000, l: 'Sans limite', sub: 'le top du top', emoji: '👑' },
      ]},
    { id: 'priority', q: 'Votre priorité absolue ?', icon: '⭐',
      options: [
        { v: 'silence', l: 'Le silence', sub: 'voisinage tranquille', emoji: '🔇' },
        { v: 'app', l: 'La connectivité', sub: 'tout piloter du tél.', emoji: '📱' },
        { v: 'simple', l: 'La simplicité', sub: 'install. plug & play', emoji: '✨' },
        { v: 'perf', l: 'La performance', sub: 'le mieux fini possible', emoji: '🏆' },
      ]},
    { id: 'wire', q: 'Pose du fil périphérique ?', icon: '🔌',
      options: [
        { v: 'no', l: 'Plutôt sans', sub: 'navigation autonome (GPS)', emoji: '🛰' },
        { v: 'ok', l: 'Ça me va', sub: 'fil enterré, classique', emoji: '🔗' },
        { v: 'idk', l: 'Je ne sais pas', sub: 'je verrai au moment voulu', emoji: '🤷' },
      ]},
    { id: 'pets', q: 'Animaux ou enfants au jardin ?', icon: '🐕',
      options: [
        { v: 'yes', l: 'Oui souvent', sub: 'détection essentielle', emoji: '🐾' },
        { v: 'sometimes', l: 'Occasionnellement', sub: 'sécurité standard suffit', emoji: '👋' },
        { v: 'no', l: 'Non', sub: 'jardin tranquille', emoji: '🌿' },
      ]},
    { id: 'rain', q: 'Et la pluie ?', icon: '🌧',
      options: [
        { v: 'yes', l: 'Doit tondre sous pluie', sub: 'région humide', emoji: '☔' },
        { v: 'capable', l: 'Capteur pluie suffit', sub: 'rentre tout seul', emoji: '🌦' },
        { v: 'no', l: 'Pas important', sub: 'climat sec', emoji: '☀' },
      ]},
  ];

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const isComplete = step >= questions.length;

  if (isComplete) return <QuizResults answers={answers} navigate={navigate} restart={() => { setStep(0); setAnswers({}); }} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="quiz" />
      <section style={{ padding: '80px 0' }}>
        <div className="container-narrow">
          {/* Progress */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.15em' }}>QUESTION {step + 1} / {questions.length}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--copper)', fontWeight: 600 }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 4, background: 'var(--sage-pale)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--copper)', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
            </div>
          </div>

          <div key={step} style={{ animation: 'fadeUp 0.4s ease both' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{current.icon}</div>
            <h2 style={{ fontSize: 56, marginBottom: 56, fontFamily: 'var(--serif)', lineHeight: 1.2, paddingBottom: '0.18em' }}>{current.q}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: current.options.length === 4 ? '1fr 1fr' : '1fr 1fr 1fr', gap: 14 }}>
              {current.options.map((opt, i) => (
                <button key={opt.v} onClick={() => { setAnswers({...answers, [current.id]: opt.v}); setTimeout(() => setStep(step + 1), 200); }}
                  className="card"
                  style={{
                    padding: 28,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: 'var(--ivory)',
                    animation: `fadeUp 0.4s ${0.05 * i}s both`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--copper)'; e.currentTarget.style.background = 'var(--copper-pale)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.background = 'var(--ivory)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{opt.emoji}</div>
                  <div style={{ fontSize: 19, fontFamily: 'var(--serif)', marginBottom: 4 }}>{opt.l}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{ marginTop: 32, fontSize: 13, color: 'var(--muted)' }}>← Question précédente</button>
          )}
        </div>
      </section>
    </div>
  );
};

const QuizResults = ({ answers, navigate, restart }) => {
  // Simple matching algo
  const matches = ROBOTS.map(r => {
    let score = 100;
    if (answers.surface && r.surface < answers.surface * 0.8) score -= 30;
    if (answers.surface && r.surface < answers.surface) score -= 15;
    if (answers.slope && r.slope < answers.slope) score -= 25;
    if (answers.budget && r.price > answers.budget * 1.1) score -= 40;
    if (answers.budget && r.price > answers.budget) score -= 15;
    return { ...r, matchScore: Math.max(20, Math.min(99, score)) };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const top = matches[0];

  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="quiz" />
      <section style={{ padding: '60px 0', background: 'var(--forest-deep)', color: 'var(--ivory)', textAlign: 'center' }}>
        <div className="container-narrow">
          <div style={{ animation: 'scaleIn 0.6s both' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
            <div className="eyebrow" style={{ color: 'var(--copper-bright)', marginBottom: 16 }}>VOTRE MATCH PARFAIT</div>
            <h1 style={{ fontSize: 64, fontFamily: 'var(--serif)', marginBottom: 12 }}>
              {top.fullName}
            </h1>
            <p style={{ fontSize: 18, color: 'var(--sage-light)', maxWidth: 540, margin: '0 auto' }}>
              D'après vos réponses, ce robot correspond à <strong style={{ color: 'var(--copper-bright)' }}>{top.matchScore}%</strong> à votre profil. Voici pourquoi.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container-narrow">
          <div className="card" style={{ padding: 0, overflow: 'hidden', animation: 'fadeUp 0.6s 0.2s both' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 0 }}>
              <div className="product-placeholder" style={{ borderRadius: 0, height: 'auto', background: `linear-gradient(135deg, ${top.color} 0%, ${top.color}aa 100%)` }}>
                <svg width="200" height="200" viewBox="0 0 120 120">
                  <ellipse cx="60" cy="60" rx="50" ry="38" fill="var(--ivory)" opacity="0.95" />
                  <circle cx="60" cy="58" r="5" fill={top.color} />
                </svg>
              </div>
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <span className="chip chip-copper">★ {top.matchScore}% MATCH</span>
                    <h2 style={{ fontSize: 36, fontFamily: 'var(--serif)', marginTop: 12 }}>{top.fullName}</h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {top.oldPrice && <div style={{ fontSize: 13, textDecoration: 'line-through', color: 'var(--muted)' }}>{top.oldPrice}€</div>}
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 32, fontWeight: 600, color: 'var(--forest-deep)' }}>{top.price}€</div>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <StarRating value={top.rating} /> <span style={{ fontSize: 13, color: 'var(--muted)' }}>{top.rating} · {top.reviewCount} avis</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 20 }}>{top.tagline}. Ses points forts collent à vos critères : surface couverte, gestion des pentes, et rapport qualité-prix.</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => navigate('article')} className="btn btn-primary">Voir le test complet →</button>
                  <button className="btn btn-ghost">Acheter à {top.price}€</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 28, fontFamily: 'var(--serif)', marginBottom: 24 }}>Vos autres options compatibles</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {matches.slice(1, 4).map(r => (
                <div key={r.id} className="card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span className="chip" style={{ fontSize: 10 }}>{r.matchScore}% match</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: 20, marginTop: 8 }}>{r.fullName}</h4>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 600, marginTop: 8, color: 'var(--copper)' }}>{r.price}€</div>
                  <button onClick={() => navigate('article')} style={{ fontSize: 12, color: 'var(--moss)', textDecoration: 'underline', marginTop: 8 }}>Voir →</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <button onClick={restart} className="btn btn-ghost">↻ Refaire le quiz</button>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
    </div>
  );
};

// --------------------------------------------
// SUPERFICIE — draw your garden
// --------------------------------------------
const SurfacePage = ({ navigate }) => {
  const [points, setPoints] = React.useState([]);
  const [closed, setClosed] = React.useState(false);
  const svgRef = React.useRef(null);

  const handleClick = (e) => {
    if (closed) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 600;
    const y = ((e.clientY - rect.top) / rect.height) * 400;
    if (points.length > 2) {
      const first = points[0];
      const dist = Math.hypot(x - first.x, y - first.y);
      if (dist < 20) { setClosed(true); return; }
    }
    setPoints([...points, { x, y }]);
  };

  // Shoelace formula
  const computeArea = () => {
    if (points.length < 3) return 0;
    let s = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      s += points[i].x * points[j].y - points[j].x * points[i].y;
    }
    // Pixel² → m² scale: 1px = 0.3m (arbitrary scale for demo)
    const pxArea = Math.abs(s) / 2;
    return Math.round(pxArea * 0.09);
  };

  const area = computeArea();
  const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const recommend = ROBOTS.filter(r => r.surface >= area && r.surface <= area * 2).slice(0, 3);

  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="superficie" />
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Outil · Calcul de superficie</div>
            <h1 style={{ fontSize: 56, fontFamily: 'var(--serif)', marginBottom: 32, lineHeight: 1.2, paddingBottom: '0.18em' }}>
              Dessinez votre jardin, <em style={{ color: 'var(--copper)' }}>on calcule</em>.
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)' }}>
              Cliquez sur la grille pour tracer le contour de votre jardin. Cliquez sur le premier point pour fermer la forme.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
            <div className="card" style={{ padding: 16, background: 'var(--ivory)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.15em' }}>● ZONE DE TRAÇAGE — 1 carreau ≈ 30m²</span>
                <button onClick={() => { setPoints([]); setClosed(false); }} style={{ fontSize: 12, color: 'var(--copper)' }}>↻ Effacer</button>
              </div>
              <svg ref={svgRef} viewBox="0 0 600 400" style={{ width: '100%', background: 'var(--cream)', borderRadius: 8, cursor: closed ? 'default' : 'crosshair', display: 'block' }} onClick={handleClick}>
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--sage)" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                  <pattern id="grid-fine" width="15" height="15" patternUnits="userSpaceOnUse">
                    <path d="M 15 0 L 0 0 0 15" fill="none" stroke="var(--sage)" strokeWidth="0.3" opacity="0.2" />
                  </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#grid-fine)" />
                <rect width="600" height="400" fill="url(#grid)" />

                {/* Filled polygon */}
                {closed && polyPoints && (
                  <polygon points={polyPoints} fill="var(--moss)" fillOpacity="0.25" stroke="var(--moss)" strokeWidth="2" />
                )}
                {/* Open path */}
                {!closed && points.length > 0 && (
                  <polyline points={polyPoints} fill="none" stroke="var(--copper)" strokeWidth="2" strokeDasharray="4 4" />
                )}
                {/* Vertices */}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={i === 0 && !closed ? 8 : 5} fill={i === 0 && !closed ? 'var(--copper)' : 'var(--forest-deep)'} stroke="var(--ivory)" strokeWidth="2" />
                    {i === 0 && !closed && points.length > 2 && (
                      <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="10" fill="var(--copper)" fontFamily="var(--mono)">FERMER</text>
                    )}
                  </g>
                ))}

                {points.length === 0 && (
                  <text x="300" y="200" textAnchor="middle" fontSize="14" fill="var(--moss)" fontFamily="var(--mono)" opacity="0.5">CLIQUEZ POUR COMMENCER</text>
                )}
              </svg>
            </div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 24, background: 'var(--forest-deep)', color: 'var(--ivory)', border: 'none' }}>
                <div className="eyebrow" style={{ color: 'var(--copper-bright)', marginBottom: 12 }}>VOTRE SURFACE</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 80, lineHeight: 1 }}>{area || '—'}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--sage)' }}>m²</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--sage)', marginTop: 8 }}>
                  {points.length} POINTS · {closed ? 'FORME FERMÉE' : 'EN COURS'}
                </div>
              </div>

              {area > 0 && (
                <div className="card" style={{ padding: 20 }}>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>💡 Notre recommandation</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16, lineHeight: 1.5 }}>
                    Pour un jardin de <strong>{area}m²</strong>, prenez un robot couvrant au moins <strong>{Math.round(area * 1.2)}m²</strong> pour garder de la marge.
                  </div>
                  {recommend.length > 0 && recommend.map(r => (
                    <button key={r.id} onClick={() => navigate('article')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--cream)', borderRadius: 8, marginBottom: 6, cursor: 'pointer' }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{r.model}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--moss)' }}>{r.surface}m² · {r.price}€</div>
                      </div>
                      <span style={{ color: 'var(--copper)' }}>→</span>
                    </button>
                  ))}
                </div>
              )}

              <button onClick={() => navigate('quiz')} className="btn btn-ghost" style={{ justifyContent: 'center' }}>
                Affiner avec le quiz →
              </button>
            </aside>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
      <StickyCTA navigate={navigate} />
    </div>
  );
};

// --------------------------------------------
// COMPARE — side by side
// --------------------------------------------
const ComparePage = ({ navigate }) => {
  const [selected, setSelected] = React.useState([ROBOTS[0].id, ROBOTS[1].id, ROBOTS[2].id]);

  const robots = selected.map(id => ROBOTS.find(r => r.id === id)).filter(Boolean);

  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="compare" />
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Outil · Comparateur</div>
            <h1 style={{ fontSize: 56, fontFamily: 'var(--serif)', marginBottom: 32, lineHeight: 1.2, paddingBottom: '0.18em' }}>
              Comparez <em style={{ color: 'var(--copper)' }}>côte à côte</em>.
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)' }}>Jusqu'à 3 modèles. Toutes les specs alignées. Le verdict en bas.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '12px 0' }}>
              <thead>
                <tr>
                  <th style={{ width: 200 }}></th>
                  {robots.map((r, idx) => (
                    <th key={r.id} style={{ padding: 0, verticalAlign: 'top' }}>
                      <div className="card" style={{ padding: 20, position: 'relative' }}>
                        <select value={r.id} onChange={(e) => { const newSel = [...selected]; newSel[idx] = e.target.value; setSelected(newSel); }}
                          style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', fontSize: 11, border: '1px solid var(--line)', borderRadius: 6, background: 'var(--ivory)' }}>
                          {ROBOTS.map(o => <option key={o.id} value={o.id}>{o.fullName}</option>)}
                        </select>
                        <div className="product-placeholder" style={{ height: 120, marginBottom: 12, background: `linear-gradient(135deg, ${r.color}33, ${r.color}11)` }}>
                          <svg width="80" height="80" viewBox="0 0 120 120">
                            <ellipse cx="60" cy="60" rx="48" ry="36" fill={r.color} />
                            <circle cx="60" cy="58" r="4" fill="var(--sage-light)" />
                          </svg>
                        </div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--moss)', letterSpacing: '0.1em' }}>{r.brand.toUpperCase()}</div>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 8 }}>{r.model}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 600, color: 'var(--copper)' }}>{r.price}€</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Note globale', key: 'rating', format: v => <><StarRating value={v} /> <span style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>{v}</span></>, best: 'max' },
                  { label: 'Surface max', key: 'surface', format: v => `${v}m²`, best: 'max' },
                  { label: 'Pente max', key: 'slope', format: v => `${v}%`, best: 'max' },
                  { label: 'Poids', key: 'specs.weight', best: 'min' },
                  { label: 'Bruit', key: 'specs.noise', best: 'min' },
                  { label: 'Autonomie', key: 'specs.battery', best: 'max' },
                  { label: 'Recharge', key: 'specs.charging', best: 'min' },
                  { label: 'Hauteur de coupe', key: 'specs.cutHeight' },
                  { label: 'Largeur de coupe', key: 'specs.cuttingWidth', best: 'max' },
                ].map(row => {
                  const getVal = (r) => row.key.includes('.') ? r.specs[row.key.split('.')[1]] : r[row.key];
                  return (
                    <tr key={row.label}>
                      <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)' }}>{row.label}</td>
                      {robots.map(r => (
                        <td key={r.id} style={{ padding: '14px 16px', background: 'var(--ivory)', borderBottom: '1px solid var(--line-soft)', fontSize: 14, fontFamily: 'var(--mono)', fontWeight: 500 }}>
                          {row.format ? row.format(getVal(r)) : getVal(r)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td style={{ padding: '20px 0' }}></td>
                  {robots.map(r => (
                    <td key={r.id} style={{ padding: '20px 16px', background: 'var(--forest-deep)', color: 'var(--ivory)', borderRadius: 12 }}>
                      <button className="btn btn-primary" onClick={() => navigate('article')} style={{ width: '100%', justifyContent: 'center' }}>Meilleur prix →</button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
    </div>
  );
};

// --------------------------------------------
// ROI — savings calculator
// --------------------------------------------
const RoiPage = ({ navigate }) => {
  const [years, setYears] = React.useState(5);
  const [hourlyRate, setHourlyRate] = React.useState(15);
  const [hoursPerWeek, setHoursPerWeek] = React.useState(2);
  const [robotPrice, setRobotPrice] = React.useState(1200);

  const weeksPerYear = 28; // mowing season
  const manualCost = years * weeksPerYear * hoursPerWeek * hourlyRate;
  const electricityCost = years * 60; // ~12€/yr
  const robotTotal = robotPrice + electricityCost;
  const savings = manualCost - robotTotal;
  const breakEven = Math.ceil(robotPrice / (weeksPerYear * hoursPerWeek * hourlyRate));

  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="roi" />
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Outil · Calculateur ROI</div>
            <h1 style={{ fontSize: 56, fontFamily: 'var(--serif)', marginBottom: 32, lineHeight: 1.2, paddingBottom: '0.18em' }}>
              Combien <em style={{ color: 'var(--copper)' }}>économisez-vous</em> ?
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)' }}>Le robot tondeuse n'est pas qu'un gadget : c'est un investissement qui se rentabilise. Voyons en combien de temps.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div className="card" style={{ padding: 32 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 24 }}>Vos paramètres</h3>

              <SliderRow label="Prix du robot" value={`${robotPrice}€`} sub="modèle visé">
                <input type="range" min="300" max="3500" step="50" value={robotPrice} onChange={e => setRobotPrice(+e.target.value)} style={{ width: '100%', accentColor: 'var(--copper)' }} />
              </SliderRow>

              <SliderRow label="Heures/semaine de tonte manuelle" value={`${hoursPerWeek}h`} sub="incluant ramassage">
                <input type="range" min="0.5" max="6" step="0.5" value={hoursPerWeek} onChange={e => setHoursPerWeek(+e.target.value)} style={{ width: '100%', accentColor: 'var(--copper)' }} />
              </SliderRow>

              <SliderRow label="Valeur de votre temps" value={`${hourlyRate}€/h`} sub="ou tarif jardinier">
                <input type="range" min="5" max="40" step="1" value={hourlyRate} onChange={e => setHourlyRate(+e.target.value)} style={{ width: '100%', accentColor: 'var(--copper)' }} />
              </SliderRow>

              <SliderRow label="Période" value={`${years} ans`} sub="durée d'amortissement">
                <input type="range" min="1" max="10" step="1" value={years} onChange={e => setYears(+e.target.value)} style={{ width: '100%', accentColor: 'var(--copper)' }} />
              </SliderRow>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 32, background: savings > 0 ? 'var(--forest-deep)' : 'var(--copper)', color: 'var(--ivory)', border: 'none' }}>
                <div className="eyebrow" style={{ color: 'var(--copper-bright)', marginBottom: 12 }}>VOS ÉCONOMIES SUR {years} ANS</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 96, lineHeight: 1, marginBottom: 8 }}>
                  {savings > 0 ? '+' : ''}{savings.toLocaleString('fr-FR')}€
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--sage-light)' }}>
                  RENTABILISÉ EN <strong style={{ color: 'var(--copper-bright)' }}>{breakEven} AN{breakEven > 1 ? 'S' : ''}</strong>
                </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 16 }}>📊 Le détail</div>
                <RoiRow label={`Coût main-d'œuvre sur ${years} ans`} value={`${manualCost.toLocaleString('fr-FR')}€`} />
                <RoiRow label="Coût robot (achat)" value={`${robotPrice.toLocaleString('fr-FR')}€`} />
                <RoiRow label={`Électricité (${years} ans)`} value={`${electricityCost}€`} />
                <RoiRow label="Total robot" value={`${robotTotal.toLocaleString('fr-FR')}€`} bold />
                <div style={{ height: 1, background: 'var(--line)', margin: '12px 0' }}></div>
                <RoiRow label="Vos économies" value={`${savings.toLocaleString('fr-FR')}€`} highlight />
                <RoiRow label="Heures gagnées" value={`${(years * weeksPerYear * hoursPerWeek).toFixed(0)}h`} highlight />
              </div>

              <button onClick={() => navigate('quiz')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Trouvez le robot rentable pour vous →
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
      <StickyCTA navigate={navigate} />
    </div>
  );
};

const SliderRow = ({ label, value, sub, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600, color: 'var(--copper)' }}>{value}</span>
        <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{sub}</div>
      </div>
    </div>
    {children}
  </div>
);

const RoiRow = ({ label, value, bold, highlight }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
    <span style={{ color: highlight ? 'var(--copper)' : 'var(--ink-soft)', fontWeight: bold || highlight ? 600 : 400 }}>{label}</span>
    <span style={{ fontFamily: 'var(--mono)', fontWeight: bold || highlight ? 700 : 500, color: highlight ? 'var(--copper)' : 'var(--ink)' }}>{value}</span>
  </div>
);

Object.assign(window, { QuizPage, SurfacePage, ComparePage, RoiPage });
