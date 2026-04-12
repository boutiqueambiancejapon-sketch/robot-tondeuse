import { HeroSection } from '@/components/home/HeroSection'
import { StatsRow } from '@/components/home/StatsRow'
import { ArticleTicker } from '@/components/home/ArticleTicker'
import { DealsStrip } from '@/components/home/DealsStrip'
import { RecentArticles } from '@/components/home/RecentArticles'
import { CategorySection } from '@/components/home/CategorySection'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { SeasonCarousel } from '@/components/home/SeasonCarousel'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'
import { niche } from '@/niche.config'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <StatsRow />
      <ArticleTicker />
      <DealsStrip />
      <FeaturedTools />
      <SeasonCarousel />
      <RecentArticles />
      {niche.categories.map((cat, i) => (
        <CategorySection key={cat.slug} slug={cat.slug} label={cat.label} index={i} />
      ))}
      <AuthorTeaser />
    </main>
  )
}
