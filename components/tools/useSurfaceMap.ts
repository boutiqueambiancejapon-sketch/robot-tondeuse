'use client'

/**
 * useSurfaceMap — carte satellite et mesure de surface.
 *   • Leaflet — carte et interactions
 *   • Tuiles Esri World Imagery — satellite, sans clé API
 *   • @turf/area — aire géodésique (m² réels au sol)
 * Tout est importé dans le navigateur : Leaflet a besoin de window et document.
 */

import { useEffect, useRef, useState } from 'react'
import type { Layer, LayerGroup, Map as LeafletMap } from 'leaflet'
import { signaler } from '@/lib/utils/mesure'

type LatLng = [number, number]
type LeafletLib = typeof import('leaflet')

const LEAFLET_CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
const ESRI_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const ESRI_ATTR = 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS'
const OSM_LABELS = 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'

async function aire(pts: LatLng[]): Promise<number> {
  const [turf, helpers] = await Promise.all([import('@turf/area'), import('@turf/helpers')])
  const ring = pts.map(([lat, lng]) => [lng, lat]) // turf attend [lng, lat]
  ring.push(ring[0])
  return Math.round(turf.default(helpers.polygon([ring])))
}

export function useSurfaceMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [area, setArea] = useState(0)
  const [count, setCount] = useState(0)
  const points = useRef<LatLng[]>([])
  const lib = useRef<LeafletLib | null>(null)
  const map = useRef<LeafletMap | null>(null)
  const polygon = useRef<Layer | null>(null)
  const markers = useRef<LayerGroup | null>(null)
  const mesureSignalee = useRef(false)

  async function tracer(pts: LatLng[]) {
    const L = lib.current
    if (!L || !map.current || !mapRef.current) return
    points.current = pts
    setCount(pts.length)
    polygon.current?.remove()
    polygon.current = null
    markers.current?.remove()

    // Les couleurs du tracé viennent des variables du design, lues sur la carte.
    const css = getComputedStyle(mapRef.current)
    const trait = css.getPropertyValue('--copper').trim() || 'currentColor'
    const fond = css.getPropertyValue('--white').trim() || 'currentColor'

    const groupe = L.layerGroup().addTo(map.current)
    pts.forEach((p, i) => {
      L.circleMarker(p, { radius: 6, color: trait, fillColor: fond, fillOpacity: 1, weight: 2 })
        .addTo(groupe)
        .bindTooltip(String(i + 1), { permanent: true, direction: 'top', offset: [0, -8], className: 'surface-marker-label' })
    })
    markers.current = groupe

    if (pts.length < 3) return setArea(0)
    polygon.current = L.polygon(pts, { color: trait, weight: 2, fillColor: trait, fillOpacity: 0.18 }).addTo(map.current)
    setArea(await aire(pts))
    if (!mesureSignalee.current) {
      mesureSignalee.current = true
      signaler('surface-mesuree')
    }
  }

  useEffect(() => {
    let cancelled = false
    async function init() {
      // CSS de Leaflet injectée à l'exécution (la CSP autorise unpkg.com en style-src)
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = LEAFLET_CSS_URL
        document.head.appendChild(link)
      }
      const L = (await import('leaflet')).default
      if (cancelled || !mapRef.current) return
      lib.current = L
      const m = L.map(mapRef.current, { zoomControl: true, attributionControl: true }).setView([46.7, 2.5], 6) // centre de la France
      L.tileLayer(ESRI_TILES, { attribution: ESRI_ATTR, maxZoom: 19 }).addTo(m)
      L.tileLayer(OSM_LABELS, { maxZoom: 19, opacity: 0.85 }).addTo(m)
      m.on('click', (e) => void tracer([...points.current, [e.latlng.lat, e.latlng.lng]]))
      map.current = m
    }
    void init()
    return () => {
      cancelled = true
      map.current?.remove()
      map.current = null
    }
  }, [])

  return {
    mapRef,
    area,
    count,
    centrer: (lat: number, lng: number) => map.current?.setView([lat, lng], 18),
    annuler: () => void tracer(points.current.slice(0, -1)),
    effacer: () => void tracer([]),
  }
}
