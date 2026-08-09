import { LucideIcon } from 'lucide-react'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color?: string
  comingSoon?: boolean
  className?: string
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = 'text-primary-600 bg-primary-50',
  comingSoon = false,
  className,
}: FeatureCardProps) {
  return (
    <Card variant="elevated" hover className={cn('relative', className)}>
      <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        {comingSoon && (
          <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            Coming Soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </Card>
  )
}
