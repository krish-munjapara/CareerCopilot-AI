import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  actions?: ReactNode
  className?: string
}

export default function PageHeader({ title, description, badge, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div className="animate-fade-in-up">
        {badge && (
          <span className="mb-3 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            {badge}
          </span>
        )}
        <h1 className="section-title">{title}</h1>
        {description && <p className="section-subtitle max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3 animate-fade-in-up animation-delay-100">{actions}</div>}
    </div>
  )
}
