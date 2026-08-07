import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, SearchX } from 'lucide-react'
import MarketingLayout from '@/components/layout/MarketingLayout'
import Button from '@/components/ui/Button'
import { fadeInUp } from '@/lib/motion'

export default function NotFound() {
  return (
    <MarketingLayout showFooter={false}>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <SearchX className="h-10 w-10" aria-hidden="true" />
          </div>
          <p className="text-6xl font-extrabold tracking-tight text-primary-600">404</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" aria-hidden="true" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" className="gap-2" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </MarketingLayout>
  )
}
