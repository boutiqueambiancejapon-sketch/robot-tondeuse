import type { NextConfig } from 'next'

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  // unpkg.com pour le CSS Leaflet (chargé runtime sur /superficie)
  "style-src 'self' 'unsafe-inline' https://unpkg.com",
  "img-src 'self' data: https:",
  "font-src 'self'",
  // Tuiles satellite Esri + geocoding Nominatim pour /superficie
  "connect-src 'self' https://vitals.vercel-insights.com https://affiliate-api.amazon.fr https://api.github.com https://nominatim.openstreetmap.org https://server.arcgisonline.com https://services.arcgisonline.com",
].join('; ')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  redirects: async () => [
    // Migration DA Atelier Vert : /simulateur → /superficie (slug SEO-friendly)
    { source: '/simulateur', destination: '/superficie', permanent: true },

    // ── Stubs SEO → articles complets ────────────────────────────────────
    // Ces pages étaient des placeholders vides nuisant à l'indexation.
    // Chaque stub est redirigé 301 vers son article de fond correspondant.
    { source: '/robot-tondeuse-pente',           destination: '/comment-choisir-robot-tondeuse-terrain-en-pente',   permanent: true },
    { source: '/robot-tondeuse-rtk',             destination: '/robot-tondeuse-navigation-rtk-guide-complet',       permanent: true },
    { source: '/robot-tondeuse-vision-ia',        destination: '/robot-tondeuse-lidar-top-5-2026',                   permanent: true },
    { source: '/robot-tondeuse-multi-zones',      destination: '/robot-tondeuse-multi-zones-jardins-separes-2026',  permanent: true },
    { source: '/robot-tondeuse-haut-de-gamme',   destination: '/meilleur-robot-tondeuse-2026',                      permanent: true },
    { source: '/robot-tondeuse-connecte',         destination: '/robot-tondeuse-connecte-wifi-smart-home-guide',    permanent: true },
    { source: '/robot-tondeuse-grande-surface',   destination: '/quel-robot-tondeuse-pour-3000m2-grand-domaine-2026', permanent: true },
    { source: '/entretien-robot-tondeuse',        destination: '/comment-entretenir-son-robot-tondeuse-guide-complet', permanent: true },
    { source: '/robot-tondeuse-rapport-qualite-prix', destination: '/meilleur-robot-tondeuse-pas-cher-top-2026',   permanent: true },
    { source: '/robot-tondeuse-500m2',            destination: '/quel-robot-tondeuse-jardin-500-1000-m2-moyen',    permanent: true },
    { source: '/installation-robot-tondeuse',     destination: '/comment-installer-robot-tondeuse-soi-meme',       permanent: true },
    { source: '/robot-tondeuse-bruit-voisinage',  destination: '/robot-tondeuse-bruit-voisinage-reglementation',   permanent: true },
    { source: '/depannage-robot-tondeuse',        destination: '/robot-tondeuse-ne-charge-plus-diagnostic-solutions', permanent: true },
    { source: '/hivernage-robot-tondeuse',        destination: '/comment-hiverner-son-robot-tondeuse',              permanent: true },
    { source: '/robot-tondeuse-pas-cher',         destination: '/meilleur-robot-tondeuse-pas-cher-top-2026',        permanent: true },
  ],
  headers: async () => [
    {
      source: '/((?!admin|api/cms).*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: csp },
      ],
    },
  ],
}

export default nextConfig
