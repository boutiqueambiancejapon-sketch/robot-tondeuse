// Menu du design V2 : trois groupes courts, lus de haut en bas sur téléphone.
export type MenuGroup = { title: string; links: { href: string; label: string }[] }

export const MENU_V2: MenuGroup[] = [
  {
    title: 'Choisir',
    links: [
      { href: '/quiz', label: 'Le quiz' },
      { href: '/comparatifs', label: 'Les comparatifs' },
      { href: '/comparer', label: 'Le comparateur' },
      { href: '/marques', label: 'Les marques' },
      { href: '/robot-piscine', label: 'Robots de piscine' },
    ],
  },
  {
    title: 'Lire',
    links: [
      { href: '/blog', label: 'Guides et dépannage' },
      { href: '/calendrier-du-gazon', label: 'Calendrier du gazon' },
      { href: '/fiche-hivernage-robot-tondeuse', label: 'Fiche hivernage' },
    ],
  },
  {
    title: 'Prix',
    links: [
      { href: '/black-friday-robot-tondeuse', label: 'Black Friday' },
      { href: '/code-promo', label: 'Codes promo et coupons' },
      { href: '/deals', label: 'Bons plans vérifiés' },
    ],
  },
  {
    title: 'Calculer',
    links: [
      { href: '/superficie', label: 'Mesurer ma pelouse' },
      { href: '/calculateur-rentabilite-robot-tondeuse', label: 'Robot ou tondeuse : le coût' },
    ],
  },
]

export const FOOTER_V2 = [
  { href: '/comparatifs', label: 'Comparatifs' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/comparer', label: 'Comparateur' },
  { href: '/marques', label: 'Marques' },
  { href: '/robot-piscine', label: 'Robots de piscine' },
  { href: '/blog', label: 'Guides' },
  { href: '/calendrier-du-gazon', label: 'Calendrier du gazon' },
  { href: '/fiche-hivernage-robot-tondeuse', label: 'Fiche hivernage' },
  { href: '/black-friday-robot-tondeuse', label: 'Black Friday' },
  { href: '/code-promo', label: 'Codes promo et coupons' },
  { href: '/deals', label: 'Bons plans' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
]
