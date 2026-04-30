import { HeroSection } from '@/components/home/HeroSection'
import { ArticleTicker } from '@/components/home/ArticleTicker'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { HomeTopRobots } from '@/components/home/HomeTopRobots'
import { RecentArticles } from '@/components/home/RecentArticles'
import { HomeQuizTeaser } from '@/components/home/HomeQuizTeaser'
import { CategorySection } from '@/components/home/CategorySection'
import { HomeMethodology } from '@/components/home/HomeMethodology'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'
import { niche } from '@/niche.config'

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Hero forest-deep + robot animé MON_JARDIN.LIVE */}
      <HeroSection />
      {/* Bandeau articles récents marquee */}
      <ArticleTicker />
      {/* Outils interactifs (quiz · superficie · comparer · rentabilité) */}
      <FeaturedTools />
      {/* Le podium 2026 — 3 robots coups de cœur (signature) */}
      <HomeTopRobots />
      {/* Derniers articles éditoriaux */}
      <RecentArticles />
      {/* Bloc forest-deep signature : "Le quiz qui ne se trompe jamais" */}
      <HomeQuizTeaser />
      {/* Sections par marque */}
      {niche.categories.map((cat, i) => (
        <CategorySection key={cat.slug} slug={cat.slug} label={cat.label} index={i} />
      ))}
      {/* Méthodologie test (radar chart) */}
      <HomeMethodology />
      {/* Auteur */}
      <AuthorTeaser />
    </main>
  )
}
