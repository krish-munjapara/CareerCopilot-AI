import { ReactNode } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { SkeletonScoreGrid, PageLoader } from '@/components/ui/Skeleton'
import { MotionPage } from '@/components/ui/Motion'

interface PageShellProps {
  children: ReactNode
  loading?: boolean
  loadingLabel?: string
  maxWidth?: 'md' | 'lg' | 'xl' | 'full'
}

const maxWidthClass = {
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-full',
}

export default function PageShell({
  children,
  loading = false,
  loadingLabel = 'Loading...',
  maxWidth = 'xl',
}: PageShellProps) {
  return (
    <AppLayout>
      {loading ? (
        <div className="space-y-8">
          <PageLoader label={loadingLabel} />
          <SkeletonScoreGrid />
        </div>
      ) : (
        <MotionPage className={maxWidthClass[maxWidth]}>{children}</MotionPage>
      )}
    </AppLayout>
  )
}
