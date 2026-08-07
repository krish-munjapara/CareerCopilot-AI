import { LucideIcon, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick: () => void
  color?: 'primary' | 'secondary' | 'accent'
}

const colors = {
  primary: 'hover:border-primary-200 hover:bg-primary-50/80 group-hover:text-primary-700',
  secondary: 'hover:border-secondary-200 hover:bg-secondary-50/80 group-hover:text-secondary-700',
  accent: 'hover:border-amber-200 hover:bg-amber-50/80 group-hover:text-amber-800',
}

const iconColors = {
  primary: 'bg-primary-100 text-primary-600',
  secondary: 'bg-secondary-100 text-secondary-600',
  accent: 'bg-amber-100 text-amber-600',
}

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  color = 'primary',
}: QuickActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-4 rounded-xl border border-surface-border bg-white p-4 text-left shadow-soft transition-all duration-200',
        colors[color]
      )}
    >
      <div className={cn('rounded-xl p-2.5', iconColors[color])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink">{title}</p>
        <p className="text-sm text-ink-muted">{description}</p>
      </div>
      <ChevronRight
        className="h-5 w-5 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </button>
  )
}
