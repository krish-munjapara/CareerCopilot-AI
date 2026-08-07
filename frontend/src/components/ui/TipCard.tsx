import { LucideIcon } from 'lucide-react'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface TipCardProps {
  title: string
  tips: string[]
  icon?: LucideIcon
  variant?: 'primary' | 'success' | 'neutral'
}

const variantStyles = {
  primary: 'border-primary-100 bg-primary-50/50',
  success: 'border-emerald-100 bg-emerald-50/50',
  neutral: 'border-surface-border bg-surface-subtle/50',
}

const titleStyles = {
  primary: 'text-primary-900',
  success: 'text-emerald-900',
  neutral: 'text-ink',
}

const listStyles = {
  primary: 'text-primary-800',
  success: 'text-emerald-800',
  neutral: 'text-ink-muted',
}

export default function TipCard({ title, tips, icon: Icon, variant = 'primary' }: TipCardProps) {
  return (
    <Card padding="md" className={cn('border', variantStyles[variant])}>
      <div className="mb-3 flex items-center gap-2">
        {Icon && <Icon className={cn('h-5 w-5', titleStyles[variant])} aria-hidden="true" />}
        <h3 className={cn('font-semibold', titleStyles[variant])}>{title}</h3>
      </div>
      <ul className={cn('space-y-2 text-sm', listStyles[variant])}>
        {tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
