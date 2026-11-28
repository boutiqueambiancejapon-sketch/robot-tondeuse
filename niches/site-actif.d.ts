// Module « @site-actif/fonts » : niches/<site>/fonts.ts du site choisi par NEXT_PUBLIC_SITE (alias de next.config.ts).
// Chaque fonts.ts doit exporter ces 3 polices (vérifié par tests/unit/modele.test.ts).
declare module '@site-actif/fonts' {
  type Police = { className: string; variable: string; style: { fontFamily: string } }
  export const fontDisplay: Police
  export const fontPrimary: Police
  export const fontMono: Police
}
