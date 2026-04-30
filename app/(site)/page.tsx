import { HeroSection } from '@/components/home/HeroSection'
import { ArticleTicker } from '@/components/home/ArticleTicker'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { HomeTopRobots } from '@/components/home/HomeTopRobots'
import { RecentArticles } from '@/components/home/RecentArticles'
import { HomeQuizTeaser } from '@/components/home/HomeQuizTeaser'
import { HomeHubSection } from '@/components/home/HomeHubSection'
import { HomeMarques } from '@/components/home/HomeMarques'
import { HomeMethodology } from '@/components/home/HomeMethodology'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'
import {
  PAR_JARDIN_ITEMS,
  PAR_BESOIN_ITEMS,
  COMPARATIFS_ITEMS,
  GUIDES_ITEMS,
} from '@/lib/home-hubs'

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Hero forest-deep + dashboard MON_JARDIN.LIVE */}
      <HeroSection />
      {/* Bandeau articles récents marquee */}
      <ArticleTicker />
      {/* Outils interactifs (quiz · superficie · comparer · rentabilité) */}
      <FeaturedTools />
      {/* Le podium 2026 — 3 robots coups de cœur */}
      <HomeTopRobots />

      {/* Bloc forest-deep signature : "Le quiz qui ne se trompe jamais" */}
      <HomeQuizTeaser />

      {/* Comparatifs — top sélections par budget */}
      <HomeHubSection
        eyebrow="04 — Comparatifs"
        heading="Top sélections testées"
        emHighlight="testées"
        items={COMPARATIFS_ITEMS}
        background="cream"
        ctaHref="/comparatifs"
        ctaLabel="Tous les comparatifs →"
      />

      {/* Par taille / terrain de jardin */}
      <HomeHubSection
        eyebrow="05 — Par jardin"
        heading="Trouvez par votre jardin"
        emHighlight="votre jardin"
        items={PAR_JARDIN_ITEMS}
        background="paper"
      />

      {/* Toutes les marques — section consolidée avec featured + grid */}
      <HomeMarques />

      {/* Par technologie / besoin */}
      <HomeHubSection
        eyebrow="07 — Par technologie"
        heading="Filtrer par techno"
        emHighlight="techno"
        items={PAR_BESOIN_ITEMS}
        background="cream"
      />

      {/* Derniers articles éditoriaux toutes catégories */}
      <RecentArticles />

      {/* Guides & conseils */}
      <HomeHubSection
        eyebrow="08 — Guides & conseils"
        heading="Tout savoir avant d'acheter"
        emHighlight="avant"
        items={GUIDES_ITEMS}
        background="paper"
        ctaHref="/blog"
        ctaLabel="Tous les articles →"
      />

      {/* Méthodologie test (radar chart) */}
      <HomeMethodology />

      {/* Auteur */}
      <AuthorTeaser />
    </main>
  )
}
