import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  container?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Section({ children, className, container = true, padding = 'md' }: SectionProps) {
  const paddingStyles = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  }

  return (
    <section className={cn(paddingStyles[padding], className)}>
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}
