import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  label?: string
  showValue?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  label,
  showValue = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const colorStyles = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    danger: 'bg-red-600',
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex justify-between text-sm">
          {label && <span className="font-medium text-ink">{label}</span>}
          {showValue && (
            <span className="text-ink-muted tabular-nums">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-surface-subtle"
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn(colorStyles[color], 'h-full rounded-full transition-all duration-500 ease-out')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
