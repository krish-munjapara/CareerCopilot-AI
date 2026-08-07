import { Lightbulb, TrendingUp, BookOpen, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface RecommendationCardProps {
  title: string
  description: string
  type: 'skill' | 'project' | 'tip' | 'general'
  priority?: 'high' | 'medium' | 'low'
  className?: string
}

export default function RecommendationCard({
  title,
  description,
  type,
  priority = 'medium',
  className,
}: RecommendationCardProps) {
  const typeIcons = {
    skill: Target,
    project: TrendingUp,
    tip: Lightbulb,
    general: BookOpen,
  }

  const typeColors = {
    skill: 'text-primary-600 bg-primary-50',
    project: 'text-secondary-600 bg-secondary-50',
    tip: 'text-amber-600 bg-amber-50',
    general: 'text-ink-muted bg-surface-subtle',
  }

  const priorityBadge = {
    high: 'danger' as const,
    medium: 'warning' as const,
    low: 'success' as const,
  }

  const Icon = typeIcons[type]

  return (
    <article
      className={cn(
        'rounded-xl border border-surface-border bg-white p-5 shadow-soft transition-all hover:border-primary-100 hover:shadow-card',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('rounded-xl p-2.5', typeColors[type])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-ink">{title}</h4>
            <Badge variant={priorityBadge[priority]}>{priority}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        </div>
      </div>
    </article>
  )
}
