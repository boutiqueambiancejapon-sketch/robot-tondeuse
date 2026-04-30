'use client'

/**
 * SurfaceMap — calculateur de surface via Leaflet + Esri + Nominatim + turf.js.
 *
 * Pile :
 *   • Leaflet — carte et interactions
 *   • Tuiles Esri World Imagery — satellite, sans clé API
 *   • Nominatim (OSM) — geocoding adresse → lat/lng (gratuit, fair-use)
 *   • @turf/area — aire géodésique précise (m² réels)
 *
 * Pattern : import dynamique côté client (window/document obligatoires pour Leaflet).
 */

import { useEffect, useRef, useState } from 'react'

type LatLng = [number, number]
const LEAFLET_CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'

const ESRI_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const ESRI_ATTR = 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS'
const OSM_LABELS = 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'

export function SurfaceMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [area, setArea] = useState<number>(0)
  const [points, setPoints] = useState<LatLng[]>([])
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const mapInstance = useRef<unknown>(null)
  const polygonLayer = useRef<unknown>(null)
  const markersLayer = useRef<unknown>(null)

  // Init Leaflet (client only)
  useEffect(() => {
    let cancelled = false
    let map: import('leaflet').Map | null = null

    async function init() {
      // Inject Leaflet CSS at runtime (CSP autorise unpkg.com en style-src)
      if (typeof document !== 'undefined' && !document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = LEAFLET_CSS_URL
        document.head.appendChild(link)
      }
      const L = (await import('leaflet')).default
      if (cancelled || !mapRef.current) return

      map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([46.7, 2.5], 6) // Centre France

      L.tileLayer(ESRI_TILES, { attribution: ESRI_ATTR, maxZoom: 19 }).addTo(map)
      L.tileLayer(OSM_LABELS, { maxZoom: 19, opacity: 0.85 }).addTo(map)

      const localPoints: LatLng[] = []

      // Click → ajoute un point
      map.on('click', async (e) => {
        const next = [...localPoints, [e.latlng.lat, e.latlng.lng] as LatLng]
        localPoints.length = 0
        localPoints.push(...next)
        setPoints([...next])
        await redraw(L, map!, next)
      })

      mapInstance.current = map
    }

    init()

    return () => {
      cancelled = true
      if (map) {
        map.remove()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Redraw polygon when points change
  async function redraw(L: typeof import('leaflet'), map: import('leaflet').Map, pts: LatLng[]) {
    if (polygonLayer.current) (polygonLayer.current as import('leaflet').Layer).remove()
    if (markersLayer.current) (markersLayer.current as import('leaflet').LayerGroup).clearLayers()

    const markers = L.layerGroup().addTo(map)
    pts.forEach((p, i) => {
      L.circleMarker(p, {
        radius: 6,
        color: '#b8623d',
        fillColor: '#fbf8f0',
        fillOpacity: 1,
        weight: 2,
      }).addTo(markers).bindTooltip(String(i + 1), { permanent: true, direction: 'top', offset: [0, -8], className: 'surface-marker-label' })
    })
    markersLayer.current = markers

    if (pts.length >= 3) {
      const poly = L.polygon(pts, {
        color: '#b8623d',
        weight: 2,
        fillColor: '#b8623d',
        fillOpacity: 0.18,
      }).addTo(map)
      polygonLayer.current = poly

      // Compute geodesic area via turf
      const turf = await import('@turf/area')
      const helpers = await import('@turf/helpers')
      // turf attend [lng, lat] format
      const ring = pts.map(([lat, lng]) => [lng, lat])
      ring.push(ring[0]) // close polygon
      const polygon = helpers.polygon([ring])
      const m2 = turf.default(polygon)
      setArea(Math.round(m2))
    } else {
      setArea(0)
    }
  }

  // Address search via Nominatim
  async function geocode(e: React.FormEvent) {
    e.preventDefault()
    if (!search.trim()) return
    setSearching(true)
    setSearchError(null)
    try {
      // countrycodes restreint aux pays francophones européens (FR + BE + CH + LU + MC)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=fr,be,ch,lu,mc&q=${encodeURIComponent(search)}`,
        { headers: { Accept: 'application/json' } },
      )
      const data = await res.json()
      if (!data || data.length === 0) {
        // Fallback : recherche mondiale si rien trouvé en FR/BE/CH/LU/MC
        const fallback = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(search)}`,
          { headers: { Accept: 'application/json' } },
        ).then((r) => r.json()).catch(() => null)
        if (!fallback || fallback.length === 0) {
          setSearchError('Adresse introuvable. Essayez avec la commune ou le code postal.')
          return
        }
        const { lat, lon } = fallback[0]
        const map = mapInstance.current as import('leaflet').Map | null
        if (map) map.setView([parseFloat(lat), parseFloat(lon)], 18)
        return
      }
      const { lat, lon } = data[0]
      const map = mapInstance.current as import('leaflet').Map | null
      if (map) map.setView([parseFloat(lat), parseFloat(lon)], 18)
    } catch {
      setSearchError('Erreur réseau. Réessayez.')
    } finally {
      setSearching(false)
    }
  }

  function reset() {
    const map = mapInstance.current as import('leaflet').Map | null
    if (polygonLayer.current && map) (polygonLayer.current as import('leaflet').Layer).remove()
    if (markersLayer.current) (markersLayer.current as import('leaflet').LayerGroup).clearLayers()
    polygonLayer.current = null
    setPoints([])
    setArea(0)
  }

  function undoLast() {
    if (points.length === 0) return
    const next = points.slice(0, -1)
    setPoints(next)
    if (mapInstance.current) {
      // Re-trigger a redraw via dynamic import
      void (async () => {
        const L = (await import('leaflet')).default
        await redraw(L, mapInstance.current as import('leaflet').Map, next)
      })()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search bar */}
      <form onSubmit={geocode} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Votre adresse (rue, code postal, ville)"
          style={{
            flex: 1,
            minWidth: 220,
            padding: '12px 16px',
            border: '1px solid var(--border-strong)',
            borderRadius: 100,
            background: 'var(--ivory)',
            fontSize: 14,
            fontFamily: 'inherit',
            color: 'var(--text-primary)',
          }}
        />
        <button
          type="submit"
          disabled={searching}
          style={{
            padding: '12px 20px',
            background: 'var(--copper)',
            color: 'var(--ivory)',
            border: 'none',
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {searching ? 'Recherche…' : 'Centrer la carte'}
        </button>
      </form>
      {searchError && (
        <p style={{ fontSize: 13, color: 'var(--copper)', margin: 0 }}>{searchError}</p>
      )}

      {/* Map */}
      <div
        ref={mapRef}
        style={{
          height: 'min(70vh, 520px)',
          width: '100%',
          borderRadius: 16,
          border: '1px solid var(--border)',
          overflow: 'hidden',
          background: 'var(--cream)',
        }}
      />

      {/* Controls + result */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={undoLast}
            disabled={points.length === 0}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              borderRadius: 100,
              color: 'var(--text-primary)',
              cursor: points.length === 0 ? 'not-allowed' : 'pointer',
              opacity: points.length === 0 ? 0.4 : 1,
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          >
            ← Annuler le dernier point
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={points.length === 0}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              borderRadius: 100,
              color: 'var(--text-primary)',
              cursor: points.length === 0 ? 'not-allowed' : 'pointer',
              opacity: points.length === 0 ? 0.4 : 1,
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          >
            Tout effacer
          </button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 11, color: 'var(--moss)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Surface tracée
          </div>
          <div style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 36, fontWeight: 400, color: 'var(--copper)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {area > 0 ? `${area.toLocaleString('fr-FR')} m²` : '—'}
          </div>
        </div>
      </div>

      {/* Indication d'usage */}
      {points.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, textAlign: 'center', padding: '8px 16px', background: 'var(--cream)', borderRadius: 12 }}>
          Cliquez sur la carte pour tracer le contour de votre jardin (au moins 3 points). Zoomez pour plus de précision.
        </p>
      )}
    </div>
  )
}
