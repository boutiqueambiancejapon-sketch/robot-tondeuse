'use client'

/**
 * SurfaceMap — on centre la carte sur son adresse, on pose les coins de la pelouse,
 * la surface s'affiche. La carte et le calcul sont dans useSurfaceMap.
 */

import { useState } from 'react'
import { geocodeAdresse } from './geocode'
import { SurfaceResult } from './SurfaceResult'
import { useSurfaceMap } from './useSurfaceMap'

export function SurfaceMap() {
  const { mapRef, area, count, centrer, annuler, effacer } = useSurfaceMap()
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  async function geocode(e: React.FormEvent) {
    e.preventDefault()
    if (!search.trim()) return
    setSearching(true)
    setSearchError(null)
    try {
      const lieu = await geocodeAdresse(search)
      if (lieu) centrer(lieu[0], lieu[1])
      else setSearchError('Adresse introuvable. Essayez avec la commune ou le code postal.')
    } catch {
      setSearchError('Erreur réseau. Réessayez.')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="stack-lg">
      <form onSubmit={geocode} className="card card-p search-row">
        <div className="field">
          <label htmlFor="adresse">Votre adresse</label>
          <input
            id="adresse"
            className="input"
            type="text"
            autoComplete="street-address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rue, code postal, ville"
          />
        </div>
        <button type="submit" className="btn btn--ink" disabled={searching}>
          {searching ? 'Recherche…' : 'Centrer la carte'}
        </button>
        {searchError ? (
          <p className="warn" role="alert">
            {searchError}
          </p>
        ) : null}
      </form>

      <p className="small muted">
        Touchez la carte pour poser les coins de votre pelouse (au moins 3 points). Zoomez pour plus de précision.
      </p>

      <div ref={mapRef} className="surface-map" />

      <div className="row-btns">
        <button type="button" className="btn btn--ivory btn--sm" onClick={annuler} disabled={count === 0}>
          Annuler le dernier point
        </button>
        <button type="button" className="btn btn--ivory btn--sm" onClick={effacer} disabled={count === 0}>
          Tout effacer
        </button>
      </div>

      <SurfaceResult area={area} />
    </div>
  )
}
