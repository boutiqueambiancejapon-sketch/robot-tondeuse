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
  // Mammotion — Yuka (vision, sans fil, 45%)
  { nom: 'YUKA Mini 2 500', marque: 'Mammotion', surfaceMax: 500, penteMax: '45%', prix: 699, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GCCLW2PL', badge: 'Sans fil' },
  { nom: 'YUKA Mini Vision', marque: 'Mammotion', surfaceMax: 700, penteMax: '45%', prix: 1099, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FKTBKDQ1' },
  { nom: 'YUKA Mini 2 1000', marque: 'Mammotion', surfaceMax: 1000, penteMax: '45%', prix: 1299, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GJ4TWVVV' },
  { nom: 'YUKA 2000', marque: 'Mammotion', surfaceMax: 2000, penteMax: '45%', prix: 1385, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FJFW87T4' },
  { nom: 'YUKA 3000', marque: 'Mammotion', surfaceMax: 3000, penteMax: '45%', prix: 1449, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DT47TX7V' },
  // Mammotion — Luba (LiDAR+RTK, sans fil, 80%)
  { nom: 'LUBA Mini AWD LiDAR', marque: 'Mammotion', surfaceMax: 1500, penteMax: '80%', prix: 1699, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FCFRC4HP', badge: 'Pentes extrêmes' },
  { nom: 'LUBA Mini 2 AWD 1000', marque: 'Mammotion', surfaceMax: 1000, penteMax: '80%', prix: 1799, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GJ5T8DRC' },
  { nom: 'LUBA 3 AWD 1500', marque: 'Mammotion', surfaceMax: 1500, penteMax: '80%', prix: 2299, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GHMGVHWN' },
  { nom: 'LUBA 3 AWD 3000', marque: 'Mammotion', surfaceMax: 3000, penteMax: '80%', prix: 2699, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GCZSSZRZ' },
  // Husqvarna
  { nom: 'Automower Aspire R4', marque: 'Husqvarna', surfaceMax: 400, penteMax: '40%', prix: 699, bruit: '59 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0D9BRY75Y' },
  { nom: 'Automower 310 Mark II', marque: 'Husqvarna', surfaceMax: 1000, penteMax: '40%', prix: 1173, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0BWKF1VWS', badge: 'Valeur sûre' },
  // Gardena
  { nom: 'SILENO city 500', marque: 'Gardena', surfaceMax: 500, penteMax: '35%', prix: 850, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B078BC3XDQ' },
  { nom: 'SILENO city 600', marque: 'Gardena', surfaceMax: 600, penteMax: '35%', prix: 880, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B09M75W6QD' },
  { nom: 'SILENO life 750', marque: 'Gardena', surfaceMax: 750, penteMax: '35%', prix: 700, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B07MXR9S5K', badge: 'Bon rapport qualité-prix' },
  { nom: 'SILENO life 1000 smart set', marque: 'Gardena', surfaceMax: 1000, penteMax: '35%', prix: 1000, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B09M76JPSB' },
  { nom: 'SILENO life 1250', marque: 'Gardena', surfaceMax: 1250, penteMax: '35%', prix: 825, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B07MXR49QW' },
  { nom: 'Smart SILENO Free 600', marque: 'Gardena', surfaceMax: 600, penteMax: '35%', prix: 1100, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DMF8HN4T', badge: 'Sans fil' },
  { nom: 'Smart SILENO Free 750', marque: 'Gardena', surfaceMax: 750, penteMax: '35%', prix: 1250, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DMF6FRCX' },
  // Worx
  { nom: 'Landroid Plus WR169E', marque: 'Worx', surfaceMax: 250, penteMax: '35%', prix: 424, bruit: '65 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0DPMTL3HZ', badge: 'Meilleur prix' },
  { nom: 'Landroid Plus WR165E', marque: 'Worx', surfaceMax: 500, penteMax: '35%', prix: 449, bruit: '65 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0913J9BTB' },
  { nom: 'Landroid Vision WR205E', marque: 'Worx', surfaceMax: 500, penteMax: '35%', prix: 812, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DHLM3NT5', badge: 'Sans fil' },
  { nom: 'Vision Cloud 2WD WR305E', marque: 'Worx', surfaceMax: 500, penteMax: '35%', prix: 799, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG2L52Q' },
  { nom: 'Vision Cloud 2WD WR308E', marque: 'Worx', surfaceMax: 800, penteMax: '35%', prix: 999, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG31S3K' },
  { nom: 'Vision Cloud 2WD WR312E', marque: 'Worx', surfaceMax: 1200, penteMax: '35%', prix: 1199, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG6VC6M' },
  { nom: 'Vision Cloud 2WD WR318E', marque: 'Worx', surfaceMax: 1800, penteMax: '35%', prix: 1499, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG4B9XR' },
  { nom: 'Vision Cloud 2WD WR330E', marque: 'Worx', surfaceMax: 3000, penteMax: '35%', prix: 2299, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG4WYT4' },
  { nom: 'Vision Cloud 4WD WR340E', marque: 'Worx', surfaceMax: 600, penteMax: '84%', prix: 1499, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG3XLBJ' },
  // Bosch
  { nom: 'VISIMOW 18V-100', marque: 'Bosch', surfaceMax: 100, penteMax: '25%', prix: 480, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0G4RDLH3R' },
  { nom: 'Indego S+ 500', marque: 'Bosch', surfaceMax: 500, penteMax: '27%', prix: 450, bruit: '63 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B08VJJKFBX' },
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
