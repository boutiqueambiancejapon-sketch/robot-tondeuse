import { Header } from '@/components/v2/Header'
import { Footer } from '@/components/v2/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
