import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  unit?: 'percent' | 'count' | 'none'
  trend?: string
  className?: string
}

const colorStyles = {
  primary: 'text-primary-600 bg-primary-50 ring-primary-100',
  secondary: 'text-secondary-600 bg-secondary-50 ring-secondary-100',
  success: 'text-emerald-600 bg-emerald-50 ring-emerald-100',
  warning: 'text-amber-600 bg-amber-50 ring-amber-100',
  danger: 'text-red-600 bg-red-50 ring-red-100',
}

function formatValue(value: number | string, unit: StatCardProps['unit']) {
  if (typeof value === 'string') return value
  if (unit === 'percent') return `${Math.round(value)}%`
  return Math.round(value).toString()
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = 'primary',
  unit = 'percent',
  trend,
  className,
}: StatCardProps) {
  const display = formatValue(value, unit)

  return (
    <article
      className={cn(
        'rounded-2xl border border-surface-border bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={cn('rounded-xl p-3 ring-1 ring-inset', colorStyles[color])}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        {trend && <span className="text-xs font-medium text-emerald-600">{trend}</span>}
      </div>
      <p
        className="text-3xl font-bold tabular-nums tracking-tight text-ink"
        aria-label={`${title}: ${display}`}
      >
        {display}
      </p>
      <h3 className="mt-1 text-sm font-medium text-ink-muted">{title}</h3>
    </article>
  )
}

export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      {children}
    </div>
  )
}
