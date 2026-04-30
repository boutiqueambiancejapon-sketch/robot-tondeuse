// ============================================
// HUB CATEGORIE — par marque (UX-first)
// ============================================

const HubPage = ({ navigate }) => {
  const [selectedBrand, setSelectedBrand] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('rating');
  const [filters, setFilters] = React.useState({ surface: [0, 5000], slope: 0, price: [0, 4000] });

  const filteredRobots = ROBOTS
    .filter(r => selectedBrand === 'all' || r.brand.toLowerCase() === selectedBrand)
    .filter(r => r.surface >= filters.surface[0] && r.surface <= filters.surface[1])
    .filter(r => r.slope >= filters.slope)
    .filter(r => r.price >= filters.price[0] && r.price <= filters.price[1])
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'surface') return b.surface - a.surface;
      return 0;
    });

  return (
    <div style={{ background: 'var(--paper)' }}>
      <NavBar navigate={navigate} currentPage="hub" />
      <HubHero />
      <BrandsCarousel selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
          <FiltersSidebar filters={filters} setFilters={setFilters} />
          <div>
            <ResultsHeader count={filteredRobots.length} sortBy={sortBy} setSortBy={setSortBy} brand={selectedBrand} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredRobots.map((r, i) => <RobotRow key={r.id} robot={r} rank={i + 1} navigate={navigate} />)}
              {filteredRobots.length === 0 && (
                <div style={{ padding: 60, textAlign: 'center', background: 'var(--cream)', borderRadius: 16 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
                  <h3 style={{ fontSize: 22, marginBottom: 8 }}>Aucun robot ne correspond</h3>
                  <p style={{ color: 'var(--muted)' }}>Essayez d'élargir vos critères.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
      <StickyCTA navigate={navigate} />
    </div>
  );
};

const HubHero = () => (
  <section style={{ background: 'var(--cream)', padding: '80px 0 40px' }}>
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 12 }}>Tous les robots, toutes les marques</div>
      <h1 style={{ fontSize: 64, lineHeight: 1.15, marginBottom: 32, fontFamily: 'var(--serif)', paddingBottom: '0.18em' }}>
        Explorez par <em style={{ color: 'var(--copper)' }}>marque</em>.
      </h1>
      <p style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 640 }}>
        47 modèles répartis sur 6 marques, tous testés en conditions réelles. Filtrez selon vos critères pour trouver le vôtre.
      </p>
    </div>
  </section>
);

const BrandsCarousel = ({ selectedBrand, setSelectedBrand }) => (
  <section style={{ padding: '32px 0', background: 'var(--cream)', borderBottom: '1px solid var(--line-soft)', position: 'sticky', top: 76, zIndex: 30, backdropFilter: 'blur(20px)', backgroundColor: 'rgba(245, 239, 225, 0.92)' }}>
    <div className="container">
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
        <BrandPill id="all" name="Toutes" count={ROBOTS.length} country="🌍" color="var(--forest-deep)" selected={selectedBrand === 'all'} onClick={() => setSelectedBrand('all')} />
        {BRANDS.map(b => (
          <BrandPill key={b.id} {...b} selected={selectedBrand === b.id} onClick={() => setSelectedBrand(b.id)} />
        ))}
      </div>
    </div>
  </section>
);

const BrandPill = ({ id, name, count, country, color, selected, onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 20px',
    background: selected ? color : 'var(--ivory)',
    color: selected ? 'var(--ivory)' : 'var(--ink)',
    border: `1px solid ${selected ? color : 'var(--line)'}`,
    borderRadius: 100,
    transition: 'all 0.2s',
    flexShrink: 0,
    fontSize: 14,
    fontWeight: 500,
  }}>
    <span style={{ fontSize: 16 }}>{country}</span>
    <span>{name}</span>
    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.7, padding: '2px 6px', background: selected ? 'rgba(255,255,255,0.15)' : 'var(--sage-pale)', borderRadius: 100 }}>{count}</span>
  </button>
);

const FiltersSidebar = ({ filters, setFilters }) => (
  <aside style={{ position: 'sticky', top: 160, alignSelf: 'flex-start' }}>
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontSize: 22, fontFamily: 'var(--serif)' }}>Filtres</h3>
        <button onClick={() => setFilters({ surface: [0, 5000], slope: 0, price: [0, 4000] })} style={{ fontSize: 12, color: 'var(--copper)', textDecoration: 'underline' }}>Réinit.</button>
      </div>

      <FilterGroup label="Surface du jardin" value={`${filters.surface[1]}m²`}>
        <input type="range" min="100" max="5000" step="100" value={filters.surface[1]}
          onChange={(e) => setFilters({...filters, surface: [0, +e.target.value]})}
          style={{ width: '100%', accentColor: 'var(--copper)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
          <span>100m²</span><span>5000m²</span>
        </div>
      </FilterGroup>

      <FilterGroup label="Pente max" value={`${filters.slope}%`}>
        <input type="range" min="0" max="50" step="5" value={filters.slope}
          onChange={(e) => setFilters({...filters, slope: +e.target.value})}
          style={{ width: '100%', accentColor: 'var(--copper)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
          <span>plat</span><span>50%</span>
        </div>
      </FilterGroup>

      <FilterGroup label="Budget max" value={`${filters.price[1]}€`}>
        <input type="range" min="200" max="4000" step="100" value={filters.price[1]}
          onChange={(e) => setFilters({...filters, price: [0, +e.target.value]})}
          style={{ width: '100%', accentColor: 'var(--copper)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
          <span>200€</span><span>4000€</span>
        </div>
      </FilterGroup>

      <div style={{ marginTop: 24, padding: 16, background: 'var(--sage-pale)', borderRadius: 12 }}>
        <div className="eyebrow" style={{ fontSize: 10, marginBottom: 6 }}>💡 Conseil</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>Prenez 20% de marge sur la surface annoncée — c'est ce qu'on observe en conditions réelles.</div>
      </div>
    </div>

    <div style={{ marginTop: 16, padding: 20, background: 'var(--forest-deep)', color: 'var(--ivory)', borderRadius: 16 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--copper-bright)', letterSpacing: '0.15em', marginBottom: 8 }}>● BESOIN D'AIDE ?</div>
      <div style={{ fontSize: 14, marginBottom: 12, lineHeight: 1.4 }}>Notre quiz vous trouve le bon robot en 2 minutes.</div>
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'quiz' }))} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '10px 16px' }}>Lancer le quiz →</button>
    </div>
  </aside>
);

const FilterGroup = ({ label, value, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--copper)', fontWeight: 600 }}>{value}</span>
    </div>
    {children}
  </div>
);

const ResultsHeader = ({ count, sortBy, setSortBy, brand }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.1em' }}>RÉSULTATS</div>
      <div style={{ fontSize: 20, fontFamily: 'var(--serif)', marginTop: 2 }}>
        <strong>{count}</strong> robot{count > 1 ? 's' : ''} {brand !== 'all' && `· ${BRANDS.find(b => b.id === brand)?.name}`}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>Trier par</span>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--ivory)', fontSize: 13, fontFamily: 'inherit' }}>
        <option value="rating">★ Note</option>
        <option value="price">Prix croissant</option>
        <option value="surface">Surface couverte</option>
      </select>
    </div>
  </div>
);

const RobotRow = ({ robot, rank, navigate }) => (
  <article className="card" style={{ display: 'grid', gridTemplateColumns: '160px 1fr 240px', gap: 24, padding: 20, alignItems: 'center', transition: 'all 0.2s', position: 'relative' }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--moss)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div className="product-placeholder" style={{ height: 140, background: `linear-gradient(135deg, ${robot.color}22, ${robot.color}11)` }}>
      <svg width="80" height="80" viewBox="0 0 120 120">
        <ellipse cx="60" cy="60" rx="48" ry="36" fill={robot.color} />
        <circle cx="60" cy="58" r="4" fill="var(--sage-light)" />
      </svg>
    </div>

    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss)', letterSpacing: '0.1em' }}>{robot.brand.toUpperCase()}</span>
        {robot.badge && <span className="chip chip-copper" style={{ fontSize: 9 }}>★ {robot.badge}</span>}
      </div>
      <h3 style={{ fontSize: 26, fontFamily: 'var(--serif)', marginBottom: 4 }}>{robot.model}</h3>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>{robot.tagline}</p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
        <StarRating value={robot.rating} />
        <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{robot.rating} · {robot.reviewCount} avis</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="chip">⌂ {robot.surface}m²</span>
        <span className="chip">↗ {robot.slope}% pente</span>
        <span className="chip">🔇 {robot.specs.noise}</span>
        <span className="chip">⚡ {robot.specs.battery}</span>
      </div>
    </div>

    <div style={{ textAlign: 'right' }}>
      {robot.oldPrice && <div style={{ fontSize: 12, textDecoration: 'line-through', color: 'var(--muted)' }}>{robot.oldPrice}€</div>}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 32, fontWeight: 600, color: 'var(--forest-deep)', lineHeight: 1, marginBottom: 4 }}>{robot.price}€</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--mono)' }}>dès — chez 3 vendeurs</div>
      <button onClick={() => navigate('article')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '11px 16px' }}>Meilleur prix →</button>
      <button onClick={() => navigate('article')} style={{ marginTop: 8, fontSize: 12, color: 'var(--moss)', textDecoration: 'underline' }}>Lire le test complet</button>
    </div>
  </article>
);

Object.assign(window, { HubPage });
