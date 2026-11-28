/** Site modèle : à copier en niches/<site>/ pour créer un site. Sert des fiches d'exemple, jamais indexé. */
import type { ProduitCatalogue, SiteNiche } from '../types'
import { bareme } from './bareme'
import { caracteristiques } from './caracteristiques'
import catalogue from './catalogue.json'
import { collections } from './collections'
import { partenaires } from './partenaires'
import { site } from './site'

export const modele: SiteNiche = {
  id: '_modele',
  site,
  indexable: false,
  partenaires,
  fiches: { catalogue: catalogue as ProduitCatalogue[], caracteristiques, bareme, collections },
}
