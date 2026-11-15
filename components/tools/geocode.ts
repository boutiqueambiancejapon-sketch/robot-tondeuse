/** Recherche d'adresse via Nominatim (OSM) : France, Belgique, Suisse, Luxembourg, Monaco d'abord, puis le monde. */

type Lieu = { lat: string; lon: string }

async function chercher(url: string): Promise<Lieu[] | null> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  return (await res.json()) as Lieu[] | null
}

/** Renvoie [lat, lng], ou null si l'adresse est introuvable. Une erreur réseau remonte à l'appelant. */
export async function geocodeAdresse(adresse: string): Promise<[number, number] | null> {
  const q = encodeURIComponent(adresse)
  const base = 'https://nominatim.openstreetmap.org/search?format=json'
  let lieux = await chercher(`${base}&limit=5&countrycodes=fr,be,ch,lu,mc&q=${q}`)
  if (!lieux || lieux.length === 0) {
    lieux = await chercher(`${base}&limit=1&q=${q}`).catch(() => null)
  }
  if (!lieux || lieux.length === 0) return null
  return [parseFloat(lieux[0].lat), parseFloat(lieux[0].lon)]
}
