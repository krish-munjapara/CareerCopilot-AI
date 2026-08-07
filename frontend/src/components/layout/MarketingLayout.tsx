import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface MarketingLayoutProps {
  children: ReactNode
  showFooter?: boolean
}

export default function MarketingLayout({ children, showFooter = true }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <Navbar variant="marketing" />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
