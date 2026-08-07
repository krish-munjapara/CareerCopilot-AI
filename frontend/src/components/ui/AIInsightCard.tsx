import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIInsightCardProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
  className?: string
}

const variantStyles = {
  default: 'border-primary-200 bg-primary-50/50',
  success: 'border-success-200 bg-success-50/50',
  warning: 'border-warning-200 bg-warning-50/50',
  info: 'border-secondary-200 bg-secondary-50/50',
}

const iconStyles = {
  default: 'text-primary-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  info: 'text-secondary-600',
}

export default function AIInsightCard({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
  className,
}: AIInsightCardProps) {
  return (
    <div
      className={cn(
        'flex gap-4 rounded-2xl border p-5 transition-all duration-200 hover:shadow-md',
        variantStyles[variant],
        className
      )}
    >
      <div className={cn('flex shrink-0 items-center justify-center rounded-xl p-2.5', iconStyles[variant])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h4 className="font-semibold text-ink">{title}</h4>
        <p className="text-sm text-ink-muted">{description}</p>
      </div>
      {action && <div className="flex shrink-0 items-start">{action}</div>}
    </div>
  )
}
