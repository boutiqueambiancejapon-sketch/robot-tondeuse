import { FlashBar } from '@/components/home/FlashBar'
import { HeroSection } from '@/components/home/HeroSection'
import { ArticleTicker } from '@/components/home/ArticleTicker'
import { PressBand } from '@/components/home/PressBand'
import { ReassuranceStrip } from '@/components/home/ReassuranceStrip'
import { DealsSection } from '@/components/home/DealsSection'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { HomeTopRobots } from '@/components/home/HomeTopRobots'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { RecentArticles } from '@/components/home/RecentArticles'
import { HomeQuizTeaser } from '@/components/home/HomeQuizTeaser'
import { HomeHubSection } from '@/components/home/HomeHubSection'
import { HomeMarques } from '@/components/home/HomeMarques'
import { HomeMethodology } from '@/components/home/HomeMethodology'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'
import { StickyCTA } from '@/components/layout/StickyCTA'
import {
  PAR_JARDIN_ITEMS,
  PAR_BESOIN_ITEMS,
  COMPARATIFS_ITEMS,
  GUIDES_ITEMS,
  PELOUSE_JARDIN_ITEMS,
} from '@/lib/home-hubs'

export default function HomePage() {
  return (
    <>
      {/* 00 — Barre urgence deals (rouge, zIndex 60) */}
      <FlashBar />

      <main id="main-content">
        {/* 01 — Hero forest-deep + dashboard MON_JARDIN.LIVE */}
        <HeroSection />

        {/* 02 — Bandeau articles récents marquee */}
        <ArticleTicker />

        {/* 03 — Autorité externe : logos presse (fond forest-deep) */}
        <PressBand />

        {/* 04 — 4 engagements éditoriaux (fond paper/ivory) */}
        <ReassuranceStrip />

        {/* 05 — Ventes flash : 4 deal cards avec countdown (fond cream) */}
        <DealsSection />

        {/* 06 — Outils interactifs bento : quiz · comparateur · superficie · rentabilité */}
        <FeaturedTools />

        {/* 07 — Le podium 2026 — 3 robots coups de cœur (fond cream) */}
        <HomeTopRobots />

        {/* 08 — Avis lecteurs (dark break forest-deep) */}
        <TestimonialsSection />

        {/* 09 — Comparatifs FEATURED (Top 2026 en grand — fond cream) */}
        <HomeHubSection
          eyebrow="04 — Comparatifs"
          heading="Top sélections testées"
          emHighlight="testées"
          items={COMPARATIFS_ITEMS}
          background="cream"
          variant="featured"
          ctaHref="/comparatifs"
          ctaLabel="Tous les comparatifs →"
        />

        {/* 10 — Quiz signature (dark block forest-deep) */}
        <HomeQuizTeaser />

        {/* 11 — Par jardin — grille 8 cards (fond paper) */}
        <HomeHubSection
          eyebrow="05 — Par jardin"
          heading="Trouvez par votre jardin"
          emHighlight="votre jardin"
          items={PAR_JARDIN_ITEMS}
          background="paper"
        />

        {/* 12 — Toutes les marques : featured article + brand grid (fond cream) */}
        <HomeMarques />

        {/* 13 — Par technologie FEATURED (fond paper) */}
        <HomeHubSection
          eyebrow="07 — Par technologie"
          heading="Filtrer par techno"
          emHighlight="techno"
          items={PAR_BESOIN_ITEMS}
          background="paper"
          variant="featured"
        />

        {/* 14 — Derniers articles éditoriaux (fond cream) */}
        <RecentArticles />

        {/* 15 — Guides & conseils FEATURED (fond paper) */}
        <HomeHubSection
          eyebrow="08 — Guides & conseils"
          heading="Tout savoir avant d'acheter"
          emHighlight="avant"
          items={GUIDES_ITEMS}
          background="paper"
          variant="featured"
          ctaHref="/blog"
          ctaLabel="Tous les articles →"
        />

        {/* 16 — Pelouse & jardin grille (fond cream) */}
        <HomeHubSection
          eyebrow="09 — Pelouse & jardin"
          heading="Astuces pour un beau gazon"
          emHighlight="beau gazon"
          items={PELOUSE_JARDIN_ITEMS}
          background="cream"
          ctaHref="/blog/entretien-pelouse"
          ctaLabel="Tous nos conseils jardin →"
        />

        {/* 17 — Méthodologie test (radar chart — fond paper) */}
        <HomeMethodology />

        {/* 18 — Auteur / E-E-A-T (fond paper) */}
        <AuthorTeaser />
      </main>

      {/* Flottant — apparaît après 600px de scroll */}
      <StickyCTA />
    </>
  )
}
