import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export default function ErrorState({ icon: Icon, title, description, action, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <Icon className="h-8 w-8 text-red-600" aria-hidden="true" />
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold text-ink">{title}</h3>
      <p className="mb-6 max-w-md text-ink-muted">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
