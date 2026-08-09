import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick?: () => void
    to?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    to?: string
  }
  className?: string
}

function ActionButton({
  action,
  variant = 'primary',
}: {
  action: { label: string; onClick?: () => void; to?: string }
  variant?: 'primary' | 'outline'
}) {
  if (action.to) {
    return (
      <Link to={action.to}>
        <Button variant={variant === 'outline' ? 'outline' : 'primary'} onClick={action.onClick}>
          {action.label}
        </Button>
      </Link>
    )
  }
  return (
    <Button variant={variant === 'outline' ? 'outline' : 'primary'} onClick={action.onClick}>
      {action.label}
    </Button>
  )
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white px-6 py-14 text-center shadow-soft',
        className
      )}
      role="status"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{description}</p>
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action && <ActionButton action={action} />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
        </div>
      )}
    </div>
  )
}
