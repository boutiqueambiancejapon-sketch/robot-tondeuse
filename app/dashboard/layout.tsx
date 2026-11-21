import type { Metadata } from 'next'
import './dashboard.css'

// Private owner dashboard: no site header or footer, no click beacon, never indexed, never cached
// (proxy.ts adds no-store), absent from the sitemap and blocked in robots.txt. The root layout
// gives the <html> and the fonts; everything here is scoped under .dash (app/dashboard/dashboard.css).

export const metadata: Metadata = {
  title: { absolute: 'Tableau de bord · Quel Robot Tondeuse' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  openGraph: null,
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="dash">{children}</div>
}
