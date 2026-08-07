import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScoreCardProps {
  title: string
  score: number
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  unit?: 'percent' | 'count'
  className?: string
}

export default function ScoreCard({
  title,
  score,
  icon: Icon,
  color = 'primary',
  unit = 'percent',
  className,
}: ScoreCardProps) {
  const colorStyles = {
    primary: 'text-primary-600 bg-primary-50',
    secondary: 'text-secondary-600 bg-secondary-50',
    success: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
    danger: 'text-red-600 bg-red-50',
  }

  const getScoreColor = (value: number) => {
    if (unit === 'count') return color
    if (value >= 80) return 'success'
    if (value >= 60) return 'warning'
    return 'danger'
  }

  const scoreColor = getScoreColor(score)
  const displayValue = unit === 'percent' ? `${Math.round(score)}%` : Math.round(score).toString()

  return (
    <div
      className={cn(
        'rounded-2xl border border-surface-border bg-white p-6 shadow-soft transition-shadow hover:shadow-card',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={cn('rounded-xl p-3', colorStyles[color])}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <span
          className={cn('text-3xl font-bold tabular-nums tracking-tight', colorStyles[scoreColor].split(' ')[0])}
          aria-label={`${title}: ${displayValue}`}
        >
          {displayValue}
        </span>
      </div>
      <h3 className="text-sm font-medium text-ink-muted">{title}</h3>
    </div>
  )
}
