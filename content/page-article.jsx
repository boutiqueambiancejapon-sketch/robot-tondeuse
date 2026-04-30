// ============================================
// ARTICLE PAGE — single robot test review (CRO heavy)
// ============================================

const ArticlePage = ({ navigate }) => {
  const robot = ROBOTS[0]; // Verdura X9 Pro
  const [activeTab, setActiveTab] = React.useState('verdict');

  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="article" />
      <ArticleHero robot={robot} navigate={navigate} />
      <ArticleVerdictBox robot={robot} />
      <ArticleSticky robot={robot} navigate={navigate} />
      <ArticleContent robot={robot} navigate={navigate} />
      <ArticleAlternatives navigate={navigate} />
      <Footer navigate={navigate} />
      <StickyCTA navigate={navigate} />
    </div>
  );
};

const ArticleHero = ({ robot, navigate }) => (
  <section style={{ background: 'var(--cream)', padding: '60px 0 40px', borderBottom: '1px solid var(--line-soft)' }}>
    <div className="container-narrow">
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>
        <a onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>ACCUEIL</a> /
        <a onClick={() => navigate('hub')} style={{ cursor: 'pointer' }}>TESTS</a> /
        <a onClick={() => navigate('hub')} style={{ cursor: 'pointer' }}>{robot.brand.toUpperCase()}</a> /
        <span style={{ color: 'var(--ink)' }}>{robot.model.toUpperCase()}</span>
      </div>
      <span className="chip chip-copper" style={{ marginBottom: 20 }}>★ {robot.badge}</span>
      <h1 style={{ fontSize: 72, lineHeight: 1.2, marginBottom: 48, fontFamily: 'var(--serif)', paddingBottom: '0.15em' }}>
        {robot.fullName} : <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>le test complet</em>
      </h1>
      <p style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 28, maxWidth: 700 }}>
        {robot.tagline}. Après 8 semaines de test sur 3 jardins différents — dont un avec 2200m² et une pente raide — voici notre verdict détaillé.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--moss)' }}></div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Marc Dubois</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Testeur en chef · 12 ans d'XP</div>
          </div>
        </div>
        <span style={{ width: 1, height: 32, background: 'var(--line)' }}></span>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>PUBLIÉ LE</div>
          <div style={{ fontSize: 13 }}>15 mars 2026 · MAJ hier</div>
        </div>
        <span style={{ width: 1, height: 32, background: 'var(--line)' }}></span>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>LECTURE</div>
          <div style={{ fontSize: 13 }}>~ 8 min</div>
        </div>
      </div>
    </div>
  </section>
);

// CRO box: score + verdict + price + 3 vendor CTAs
const ArticleVerdictBox = ({ robot }) => (
  <section style={{ padding: '40px 0', background: 'var(--paper)' }}>
    <div className="container-narrow">
      <div className="card" style={{ background: 'var(--ivory)', overflow: 'hidden', border: '2px solid var(--forest-deep)' }}>
        <div style={{ background: 'var(--forest-deep)', color: 'var(--ivory)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em' }}>● VERDICT EXPRESS</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--sage)' }}>SI VOUS ÊTES PRESSÉ ↓</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', width: 140, height: 140 }}>
              <svg viewBox="0 0 140 140" style={{ width: '100%', height: '100%' }}>
                <circle cx="70" cy="70" r="60" fill="none" stroke="var(--sage-pale)" strokeWidth="8" />
                <circle cx="70" cy="70" r="60" fill="none" stroke="var(--copper)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.92} ${2 * Math.PI * 60}`}
                  strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 70 70)" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1, color: 'var(--forest-deep)' }}>9.2</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--moss)', letterSpacing: '0.1em', marginTop: 2 }}>/ 10</div>
              </div>
            </div>
            <div className="chip chip-dark">★ Excellent</div>
          </div>
          <div>
            <h3 style={{ fontSize: 22, fontFamily: 'var(--serif)', marginBottom: 8 }}>Notre verdict en 3 lignes</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 20 }}>
              Le {robot.fullName} est <strong>tout simplement le meilleur robot tondeuse premium de 2026</strong>. Sans fil périphérique, IA d'évitement de pointe, et une finition qui justifie son prix. Si vous avez le budget et entre 1500 et 2500m², ne cherchez plus.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--moss)', letterSpacing: '0.1em', marginBottom: 8 }}>✓ POINTS FORTS</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {robot.pros.slice(0, 3).map(p => <li key={p} style={{ fontSize: 13, paddingLeft: 14, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--moss)' }}>+</span>{p}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--copper)', letterSpacing: '0.1em', marginBottom: 8 }}>− À NOTER</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {robot.cons.map(p => <li key={p} style={{ fontSize: 13, paddingLeft: 14, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--copper)' }}>−</span>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor strip */}
        <div style={{ background: 'var(--cream)', padding: 24, borderTop: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.15em' }}>★ MEILLEURS PRIX AUJOURD'HUI</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Comparé en temps réel · Mis à jour il y a 12 minutes</div>
            </div>
            <span className="aff-mark">LIENS AFFILIÉS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {robot.vendors.map((v, i) => (
              <PriceCard key={v.name} vendor={v.name} price={v.price} oldPrice={v.oldPrice} primary={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ArticleSticky = ({ robot, navigate }) => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed',
      top: show ? 80 : -100,
      left: 0,
      right: 0,
      background: 'var(--ivory)',
      borderBottom: '1px solid var(--line)',
      padding: '12px 0',
      zIndex: 40,
      transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: robot.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 40 40">
              <ellipse cx="20" cy="22" rx="14" ry="10" fill="var(--ivory)" opacity="0.9" />
              <circle cx="20" cy="22" r="2" fill={robot.color} />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{robot.fullName}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StarRating value={robot.rating} size={11} />
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{robot.rating}/5 · {robot.reviewCount} avis</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            {robot.oldPrice && <div style={{ fontSize: 11, textDecoration: 'line-through', color: 'var(--muted)' }}>{robot.oldPrice}€</div>}
            <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 600, color: 'var(--forest-deep)', lineHeight: 1 }}>{robot.price}€</div>
          </div>
          <button className="btn btn-primary">Meilleur prix sur Amazon →</button>
        </div>
      </div>
    </div>
  );
};

const ArticleContent = ({ robot, navigate }) => (
  <section style={{ padding: '40px 0 80px' }}>
    <div className="container-narrow" style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 60 }}>
      <article style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
        <h2 id="presentation" style={{ fontSize: 38, marginTop: 0, marginBottom: 20, color: 'var(--ink)' }}>Présentation</h2>
        <p style={{ marginBottom: 20 }}>
          Annoncé fin 2025 comme la nouvelle référence du segment premium, le {robot.fullName} succède au X8 qui dominait déjà notre comparatif. Sur le papier, Verdura promet beaucoup : navigation sans fil périphérique, IA d'évitement, et une autonomie revue à la hausse. Sur le terrain, qu'en est-il vraiment ?
        </p>

        {/* In-content CTA */}
        <div style={{ background: 'var(--sage-pale)', borderLeft: '4px solid var(--copper)', padding: '20px 24px', borderRadius: 8, margin: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.1em', marginBottom: 4 }}>★ OFFRE EN COURS</div>
            <div style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>Promotion -14% sur Amazon — économisez 300€</div>
          </div>
          <button className="btn btn-primary" style={{ flexShrink: 0 }}>Voir l'offre →</button>
        </div>

        <h2 id="design" style={{ fontSize: 38, marginTop: 48, marginBottom: 20, color: 'var(--ink)' }}>Design & finitions</h2>
        <p style={{ marginBottom: 20 }}>
          Le X9 Pro arrive dans un emballage à la hauteur de son tarif. À la sortie de la boîte, on est frappé par la qualité de fabrication : châssis en composite renforcé, lame en acier traité, capots magnétiques pour l'accès aux composants. Bref, ça respire le solide.
        </p>

        {/* Image placeholder */}
        <div className="product-placeholder" style={{ height: 380, marginBottom: 12 }}>
          <span>PHOTO PRODUIT — VUE 3/4</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 28 }}>Le X9 Pro dans son habitat naturel — testé chez Marc, Dordogne.</p>

        <h2 id="installation" style={{ fontSize: 38, marginTop: 48, marginBottom: 20, color: 'var(--ink)' }}>Installation : 27 minutes chrono</h2>
        <p style={{ marginBottom: 20 }}>
          Le gros argument du X9 Pro, c'est l'absence de fil périphérique. Concrètement, on télécharge l'app, on parcourt les contours du jardin avec le robot en mode "balade guidée", et c'est tout. La cartographie est ensuite affinée automatiquement au fil des passages.
        </p>

        {/* Spec table */}
        <div style={{ background: 'var(--ivory)', borderRadius: 12, padding: 24, margin: '32px 0', border: '1px solid var(--line-soft)' }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>📋 Fiche technique</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {Object.entries(robot.specs).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--line-soft)' }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'capitalize' }}>{k}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 id="performance" style={{ fontSize: 38, marginTop: 48, marginBottom: 20, color: 'var(--ink)' }}>Performance sur le terrain</h2>
        <p style={{ marginBottom: 20 }}>
          On l'a fait tourner sur trois terrains : un classique 800m² plat, un complexe de 2200m² avec arbres et arbustes, et — pour pousser le bouchon — un terrain en pente de 38°. Verdict : il s'en sort haut la main partout.
        </p>

        {/* Score breakdown */}
        <div style={{ background: 'var(--forest-deep)', color: 'var(--ivory)', borderRadius: 16, padding: 32, margin: '32px 0' }}>
          <div className="eyebrow" style={{ color: 'var(--copper-bright)', marginBottom: 20 }}>📊 Notre notation détaillée</div>
          {Object.entries(robot.score).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, textTransform: 'capitalize' }}>{k === 'ease' ? 'Facilité d\'usage' : k === 'value' ? 'Rapport qualité-prix' : k}</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--copper-bright)' }}>{v}/10</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: `${v * 10}%`, height: '100%', background: 'linear-gradient(90deg, var(--copper) 0%, var(--copper-bright) 100%)', borderRadius: 100 }}></div>
              </div>
            </div>
          ))}
        </div>

        <h2 id="conclusion" style={{ fontSize: 38, marginTop: 48, marginBottom: 20, color: 'var(--ink)' }}>Notre conclusion</h2>
        <p style={{ marginBottom: 20 }}>
          Le {robot.fullName} mérite sa place de leader. Si votre budget le permet et que vous voulez ce qui se fait de mieux en 2026, foncez sans hésiter. Pour un budget moindre, regardez plutôt l'EcoMower Volta 580 (notre meilleur rapport qualité-prix).
        </p>

        {/* Final CTA box */}
        <div style={{ background: 'var(--forest-deep)', color: 'var(--ivory)', padding: 40, borderRadius: 24, textAlign: 'center', marginTop: 48 }}>
          <div className="eyebrow" style={{ color: 'var(--copper-bright)', marginBottom: 12 }}>★ EN BREF</div>
          <h3 style={{ fontSize: 32, marginBottom: 16, fontFamily: 'var(--serif)' }}>Le meilleur robot premium de 2026</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 8, marginBottom: 24 }}>
            <span style={{ fontSize: 16, color: 'var(--sage)', textDecoration: 'line-through' }}>{robot.oldPrice}€</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 48, fontWeight: 600 }}>{robot.price}€</span>
            <span style={{ background: 'var(--copper)', padding: '4px 8px', borderRadius: 6, fontSize: 12 }}>-14%</span>
          </div>
          <button className="btn btn-primary" style={{ fontSize: 16, padding: '18px 32px' }}>Acheter au meilleur prix →</button>
          <div style={{ fontSize: 11, color: 'var(--sage)', marginTop: 14, fontFamily: 'var(--mono)' }}>LIVRAISON GRATUITE · GARANTIE 5 ANS · RETOUR 30 JOURS</div>
        </div>
      </article>

      {/* TOC + sticky CTA sidebar */}
      <aside style={{ position: 'sticky', top: 100, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>📑 Sommaire</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['presentation', 'Présentation'],
              ['design', 'Design'],
              ['installation', 'Installation'],
              ['performance', 'Performance'],
              ['conclusion', 'Conclusion'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{ fontSize: 13, color: 'var(--ink-soft)', padding: '6px 8px', borderRadius: 6, transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--sage-pale)'; e.target.style.color = 'var(--copper)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--ink-soft)'; }}
              >· {label}</a>
            ))}
          </nav>
        </div>

        <div className="card" style={{ padding: 20, background: 'var(--copper)', color: 'var(--ivory)', border: 'none' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', marginBottom: 8 }}>● PROMO ACTIVE</div>
          <div style={{ fontSize: 14, marginBottom: 12, lineHeight: 1.4 }}>Économisez 300€ sur Amazon ce mois-ci.</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{robot.price}€</div>
          <button style={{ width: '100%', padding: 12, background: 'var(--ivory)', color: 'var(--copper)', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Voir l'offre →
          </button>
          <div style={{ fontSize: 10, opacity: 0.8, marginTop: 10, textAlign: 'center', fontFamily: 'var(--mono)' }}>FIN: 30 AVRIL · 23H59</div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>🤔 Pas sûr ?</div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>Lancez notre quiz pour vérifier que ce modèle vous correspond.</div>
          <button onClick={() => navigate('quiz')} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: 13 }}>
            Quiz personnalisé →
          </button>
        </div>
      </aside>
    </div>
  </section>
);

const ArticleAlternatives = ({ navigate }) => (
  <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
    <div className="container">
      <div style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Ou alors</div>
        <h2 style={{ fontSize: 44, fontFamily: 'var(--serif)' }}>Si ce n'est <em style={{ color: 'var(--copper)' }}>pas tout à fait</em> votre cas</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {ROBOTS.slice(1, 4).map((r, i) => <RobotCard key={r.id} robot={r} rank={i + 2} navigate={navigate} />)}
      </div>
    </div>
  </section>
);

Object.assign(window, { ArticlePage });
