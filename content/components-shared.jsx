// ============================================
// Shared components: Logo, Nav, Footer, Sticky CTA, Robot SVG, etc.
// ============================================

const Logo = ({ dark = false, size = 'md' }) => {
  const color = dark ? 'var(--ivory)' : 'var(--forest-deep)';
  const accent = 'var(--copper)';
  const sz = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  return (
    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={sz} height={sz} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" fill="none" />
        <rect x="11" y="14" width="18" height="13" rx="3" fill={color} />
        <circle cx="15" cy="27" r="2.5" fill={accent} />
        <circle cx="25" cy="27" r="2.5" fill={accent} />
        <circle cx="20" cy="18" r="1.5" fill="var(--sage-light)" />
        <path d="M14 10 L14 14 M20 8 L20 14 M26 10 L26 14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 19, color, letterSpacing: '-0.02em' }}>
          Quel Robot Tondeuse
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: dark ? 'var(--sage-light)' : 'var(--moss)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3 }}>
          Tests · Comparatifs · Outils
        </span>
      </div>
    </a>
  );
};

const NavBar = ({ navigate, currentPage, dark = false }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Accueil' },
    { id: 'hub', label: 'Marques' },
    { id: 'tools', label: 'Outils', dropdown: ['quiz', 'superficie', 'compare', 'roi'] },
    { id: 'article', label: 'Tests' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(251, 248, 240, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px' }}>
        <Logo dark={dark && !scrolled} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              style={{
                padding: '8px 16px',
                fontSize: 14,
                fontWeight: 500,
                color: currentPage === l.id ? 'var(--copper)' : (dark && !scrolled ? 'var(--ivory)' : 'var(--ink)'),
                borderRadius: 100,
                transition: 'all 0.15s',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(58, 90, 61, 0.08)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate('quiz')}
            className="btn btn-primary"
            style={{ marginLeft: 12, padding: '11px 20px', fontSize: 14 }}
          >
            <span>🌱</span> Trouver mon robot
          </button>
        </nav>
      </div>
    </header>
  );
};

const Footer = ({ navigate }) => (
  <footer style={{ background: 'var(--forest-deep)', color: 'var(--sage-light)', padding: '72px 0 32px', position: 'relative', overflow: 'hidden' }}>
    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
        <div>
          <Logo dark size="lg" />
          <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6, color: 'var(--sage)', maxWidth: 320 }}>
            Le guide indépendant pour choisir le robot tondeuse parfait pour votre jardin. Tests rigoureux, outils intelligents, conseils de pro.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {['◐', '◑', '◒', '◓'].map((g, i) => (
              <button key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', color: 'var(--sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{g}</button>
            ))}
          </div>
        </div>
        {[
          { title: 'Outils', items: ['Quiz personnalisé', 'Calcul superficie', 'Comparateur', 'Calculateur ROI', 'Estimateur temps'] },
          { title: 'Marques', items: ['EcoMower', 'GreenBot', 'TerraCut', 'Verdura', 'Hexamow', 'Voir toutes'] },
          { title: 'Guides', items: ['Petit jardin (<500m²)', 'Grand jardin (>2000m²)', 'Pentes', 'Multi-zones', 'Sans fil périphérique'] },
        ].map(col => (
          <div key={col.title}>
            <div className="eyebrow" style={{ color: 'var(--sage)', marginBottom: 16 }}>{col.title}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map(i => (
                <li key={i}>
                  <a href="#" style={{ fontSize: 14, color: 'var(--sage-light)', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--copper-bright)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--sage-light)'}>{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--sage)', fontFamily: 'var(--mono)' }}>
          © 2026 QUEL ROBOT TONDEUSE · INDÉPENDANT DEPUIS 2019
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'var(--sage)' }}>
          <a href="#">Mentions légales</a>
          <a href="#">Politique d'affiliation</a>
          <a href="#">Méthodologie de test</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div style={{ marginTop: 24, padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 12, fontSize: 12, color: 'var(--sage)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '3px 7px', background: 'var(--copper)', color: 'var(--ivory)', borderRadius: 4, letterSpacing: '0.1em' }}>AFFILIATION</span>
        <span>Certains liens sur ce site sont des liens affiliés. Si vous achetez via ces liens, nous touchons une commission sans surcoût pour vous. Cela nous permet de financer notre travail de tests indépendants. Notre méthodologie reste totalement objective.</span>
      </div>
    </div>
    {/* Decorative grass at bottom */}
    <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 60, opacity: 0.15 }} viewBox="0 0 1200 60" preserveAspectRatio="none">
      {Array.from({ length: 60 }).map((_, i) => (
        <path key={i} d={`M${i * 20} 60 Q${i * 20 + 5} ${30 + (i % 3) * 8} ${i * 20 + 10} 60`} stroke="var(--sage)" strokeWidth="1.5" fill="none" />
      ))}
    </svg>
  </footer>
);

const StickyCTA = ({ navigate }) => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: visible ? 24 : -120,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--forest-deep)',
      color: 'var(--ivory)',
      padding: 8,
      borderRadius: 100,
      boxShadow: 'var(--shadow-xl)',
      display: 'flex',
      alignItems: 'stretch',
      gap: 8,
      zIndex: 60,
      transition: 'bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      maxWidth: '95vw',
    }}>
      {/* Option 1 — sure, buy */}
      <button
        onClick={() => navigate('article')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 8px 12px 18px',
          background: 'var(--copper)',
          color: 'var(--ivory)',
          borderRadius: 100,
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--copper-bright)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--copper)'; }}
      >
        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Sûr de votre choix ?</div>
          <div style={{ fontSize: 11, opacity: 0.85, fontFamily: 'var(--mono)' }}>MEILLEUR PRIX</div>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--ivory)',
          color: 'var(--copper)',
          fontSize: 16,
        }}>→</span>
      </button>

      {/* Divider */}
      <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', margin: '6px 0' }}></div>

      {/* Option 2 — not sure, quiz */}
      <button
        onClick={() => navigate('quiz')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 18px 12px 14px',
          background: 'transparent',
          color: 'var(--ivory)',
          borderRadius: 100,
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#7fd47f', animation: 'pulseRing 1.8s ease-out infinite' }}></div>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#7fd47f' }}></div>
        </div>
        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Pas sûr ? Faites le quiz</div>
          <div style={{ fontSize: 11, color: 'var(--sage)', fontFamily: 'var(--mono)' }}>2 MIN · GRATUIT</div>
        </div>
      </button>
    </div>
  );
};

// Animated robot SVG (top-down view, with mowing path)
const AnimatedRobot = ({ size = 200, animate = true }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
    {/* Grass texture */}
    <defs>
      <pattern id="grass-pat" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="var(--sage-pale)" />
        <path d="M2 8 L2 5 M5 8 L5 4 M7 8 L7 6" stroke="var(--moss)" strokeWidth="0.5" opacity="0.4" />
      </pattern>
    </defs>
    <circle cx="100" cy="100" r="95" fill="url(#grass-pat)" />
    {/* Mow path */}
    <path
      d="M 30 50 Q 100 30, 170 60 T 160 110 Q 100 130, 40 110 T 60 160"
      stroke="var(--copper)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4 4"
      opacity="0.6"
      style={animate ? { strokeDasharray: '1000', strokeDashoffset: '1000', animation: 'mowPath 4s ease-out forwards' } : {}}
    />
    {/* Robot body */}
    <g style={{ transformOrigin: '100px 100px', animation: animate ? 'fadeIn 0.6s 1s both' : 'none' }}>
      <ellipse cx="100" cy="100" rx="32" ry="26" fill="var(--forest-deep)" />
      <ellipse cx="100" cy="98" rx="28" ry="22" fill="var(--moss)" />
      <rect x="92" y="85" width="16" height="3" rx="1" fill="var(--copper)" />
      <circle cx="100" cy="100" r="3" fill="var(--sage-light)" style={{ animation: animate ? 'blink 2s infinite' : 'none' }} />
      {/* wheels */}
      <rect x="65" y="92" width="8" height="14" rx="2" fill="var(--ink)" />
      <rect x="127" y="92" width="8" height="14" rx="2" fill="var(--ink)" />
    </g>
  </svg>
);

// Mini grass landscape SVG
const GrassDecor = ({ height = 80 }) => (
  <svg width="100%" height={height} viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ display: 'block' }}>
    {Array.from({ length: 80 }).map((_, i) => {
      const h = 30 + (i * 7 % 40);
      const x = i * 15;
      return <path key={i} d={`M${x} 80 Q${x + 3} ${80 - h} ${x + 6} 80`} stroke="var(--moss)" strokeWidth="1.5" fill="none" opacity={0.3 + (i % 3) * 0.2} />;
    })}
  </svg>
);

// Star rating display
const StarRating = ({ value = 4.5, size = 14, max = 5 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="stars" style={{ fontSize: size }}>
      {Array.from({ length: max }).map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i} style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', overflow: 'hidden', width: '50%', color: 'var(--copper)' }}>★</span>
          <span style={{ color: 'var(--line)' }}>★</span>
        </span>;
        return <span key={i} style={{ color: 'var(--line)' }}>★</span>;
      })}
    </span>
  );
};

// Affiliate price card (used everywhere)
const PriceCard = ({ vendor, price, oldPrice, label, primary = false }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    background: primary ? 'var(--forest-deep)' : 'var(--ivory)',
    color: primary ? 'var(--ivory)' : 'var(--ink)',
    borderRadius: 12,
    border: `1px solid ${primary ? 'var(--forest-deep)' : 'var(--line-soft)'}`,
    gap: 16,
  }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{vendor}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
        {oldPrice && <span style={{ fontSize: 13, textDecoration: 'line-through', opacity: 0.5 }}>{oldPrice}€</span>}
        <span style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 600 }}>{price}€</span>
      </div>
    </div>
    <button className={primary ? 'btn btn-primary' : 'btn btn-dark'} style={{ padding: '10px 16px', fontSize: 13 }}>
      Voir l'offre →
    </button>
  </div>
);

// Make sure these are available
Object.assign(window, {
  Logo, NavBar, Footer, StickyCTA, AnimatedRobot, GrassDecor, StarRating, PriceCard
});
