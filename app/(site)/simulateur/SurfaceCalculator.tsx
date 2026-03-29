'use client'

import { useState } from 'react'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

type Robot = {
  nom: string
  marque: string
  surfaceMax: number
  penteMax: string
  prix: number
  bruit: string
  sansFil: boolean
  url: string
  badge?: string
}

const ROBOTS: Robot[] = [
  // Mammotion
  { nom: 'Yuka 1500', marque: 'Mammotion', surfaceMax: 1500, penteMax: '45%', prix: 1099, bruit: '57 dB', sansFil: true, url: '', badge: 'Sans fil' },
  { nom: 'Yuka 2000', marque: 'Mammotion', surfaceMax: 2000, penteMax: '45%', prix: 1499, bruit: '57 dB', sansFil: true, url: '' },
  { nom: 'Luba 2 AWD 3000', marque: 'Mammotion', surfaceMax: 3000, penteMax: '75%', prix: 2499, bruit: '55 dB', sansFil: true, url: '', badge: 'Pentes extrêmes' },
  { nom: 'Luba 2 AWD 5000', marque: 'Mammotion', surfaceMax: 5000, penteMax: '75%', prix: 2999, bruit: '55 dB', sansFil: true, url: '' },
  // Husqvarna
  { nom: 'Automower 305', marque: 'Husqvarna', surfaceMax: 600, penteMax: '40%', prix: 999, bruit: '59 dB', sansFil: false, url: '' },
  { nom: 'Automower 415X', marque: 'Husqvarna', surfaceMax: 1500, penteMax: '40%', prix: 1899, bruit: '57 dB', sansFil: false, url: '', badge: 'Valeur sûre' },
  { nom: 'Automower 435X AWD', marque: 'Husqvarna', surfaceMax: 3500, penteMax: '70%', prix: 3499, bruit: '55 dB', sansFil: false, url: '' },
  // Gardena
  { nom: 'SILENO minimo 250', marque: 'Gardena', surfaceMax: 250, penteMax: '25%', prix: 649, bruit: '57 dB', sansFil: false, url: '', badge: 'Petit budget' },
  { nom: 'SILENO city 600', marque: 'Gardena', surfaceMax: 600, penteMax: '35%', prix: 899, bruit: '58 dB', sansFil: false, url: '' },
  { nom: 'SILENO life 1500', marque: 'Gardena', surfaceMax: 1500, penteMax: '35%', prix: 1499, bruit: '58 dB', sansFil: false, url: '' },
  // Worx
  { nom: 'Landroid S300', marque: 'Worx', surfaceMax: 300, penteMax: '35%', prix: 549, bruit: '65 dB', sansFil: false, url: '', badge: 'Meilleur prix' },
  { nom: 'Landroid M700', marque: 'Worx', surfaceMax: 700, penteMax: '35%', prix: 899, bruit: '65 dB', sansFil: false, url: '' },
  { nom: 'Landroid Vision L1600', marque: 'Worx', surfaceMax: 1600, penteMax: '30%', prix: 1699, bruit: '62 dB', sansFil: true, url: '', badge: 'Sans fil' },
  // Ecovacs
  { nom: 'GOAT G1', marque: 'Ecovacs', surfaceMax: 800, penteMax: '45%', prix: 999, bruit: '55 dB', sansFil: true, url: '', badge: 'Sans fil' },
  { nom: 'GOAT G1-2000', marque: 'Ecovacs', surfaceMax: 2000, penteMax: '45%', prix: 1499, bruit: '55 dB', sansFil: true, url: '' },
]

const labelStyle = {
  fontSize: '11px',
  color: 'var(--text-muted)',
  marginBottom: '2px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
}

export function SurfaceCalculator() {
  const [surface, setSurface] = useState('')
  const [pente, setPente] = useState(false)
  const [sansFil, setSansFil] = useState(false)

  const surfaceNum = parseInt(surface, 10)
  const hasInput = !isNaN(surfaceNum) && surfaceNum > 0

  const results = hasInput
    ? ROBOTS
        .filter((r) => r.surfaceMax >= surfaceNum)
        .filter((r) => !sansFil || r.sansFil)
        .filter((r) => !pente || parseInt(r.penteMax) >= 35)
        .sort((a, b) => a.prix - b.prix)
    : []

  return (
    <div>
      {/* Formulaire */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'flex-end',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div>
          <label
            htmlFor="surface-input"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-2)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}
          >
            Surface de pelouse (m²)
          </label>
          <input
            id="surface-input"
            type="number"
            min="50"
            max="10000"
            step="50"
            placeholder="ex: 800"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: '18px',
              fontFamily: 'var(--next-font-primary), system-ui, sans-serif',
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--text-primary)',
              width: '180px',
            }}
          />
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 'var(--space-3) var(--space-4)',
            background: pente ? 'var(--bg-surface-2)' : 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <input
            type="checkbox"
            checked={pente}
            onChange={(e) => setPente(e.target.checked)}
            style={{ accentColor: 'var(--accent-1)' }}
          />
          Terrain en pente
        </label>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 'var(--space-3) var(--space-4)',
            background: sansFil ? 'var(--bg-surface-2)' : 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <input
            type="checkbox"
            checked={sansFil}
            onChange={(e) => setSansFil(e.target.checked)}
            style={{ accentColor: 'var(--accent-1)' }}
          />
          Sans fil uniquement
        </label>
      </div>

      {/* Résultats */}
      {hasInput && results.length === 0 && (
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', padding: 'var(--space-8) 0' }}>
          Aucun robot ne correspond à ces critères. Essayez de décocher les filtres.
        </p>
      )}

      {results.length > 0 && (
        <>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
            {results.length} robot{results.length > 1 ? 's' : ''} adapté{results.length > 1 ? 's' : ''} pour {surfaceNum} m²
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {results.map((r) => (
              <article
                key={`${r.marque}-${r.nom}`}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5) var(--space-6)',
                }}
              >
                {/* Row 1 : Nom + badge + prix */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: '2px' }}>
                      <h2
                        style={{
                          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {r.nom}
                      </h2>
                      {r.badge && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-1)',
                            background: 'rgba(22, 163, 74, 0.1)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid rgba(22, 163, 74, 0.2)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {r.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.marque}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--next-font-primary), system-ui, sans-serif',
                      fontVariantNumeric: 'tabular-nums',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--accent-2)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.prix.toLocaleString('fr-FR')} €
                  </div>
                </div>

                {/* Row 2 : Specs en grille 2x2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <div style={labelStyle}>Surface</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {r.surfaceMax.toLocaleString('fr-FR')} m²
                    </div>
                  </div>
                  <div>
                    <div style={labelStyle}>Pente max</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {r.penteMax}
                    </div>
                  </div>
                  <div>
                    <div style={labelStyle}>Bruit</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {r.bruit}
                    </div>
                  </div>
                  <div>
                    <div style={labelStyle}>Installation</div>
                    <div style={{ fontSize: '14px', color: r.sansFil ? 'var(--accent-1)' : 'var(--text-secondary)' }}>
                      {r.sansFil ? 'Sans fil (RTK)' : 'Fil périphérique'}
                    </div>
                  </div>
                </div>

                {/* Row 3 : Bouton */}
                <AffiliateLink
                  href={r.url || '#'}
                  style={{
                    display: 'inline-block',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'var(--accent-1)',
                    padding: 'var(--space-2) var(--space-5)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    opacity: r.url ? 1 : 0.5,
                    pointerEvents: r.url ? 'auto' : 'none',
                  }}
                >
                  Voir sur Amazon →
                </AffiliateLink>
              </article>
            ))}
          </div>

          <p
            style={{
              marginTop: 'var(--space-6)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            Prix indicatifs constatés en mars 2026. On recommande de prendre un robot avec au moins 20% de marge sur votre surface réelle.
          </p>
        </>
      )}

      {!hasInput && (
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            Entrez votre surface ci-dessus pour voir les robots adaptés.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Vous ne connaissez pas votre surface ? Mesurez avec{' '}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-1)', textDecoration: 'none' }}
            >
              Google Maps
            </a>{' '}
            (outil mesurer une distance) ou consultez votre plan cadastral.
          </p>
        </div>
      )}
    </div>
  )
}
