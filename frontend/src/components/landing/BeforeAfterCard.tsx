import { X, Check } from 'lucide-react'
import Card from '@/components/ui/Card'

interface BeforeAfterCardProps {
  beforeItems: string[]
  afterItems: string[]
}

export default function BeforeAfterCard({ beforeItems, afterItems }: BeforeAfterCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card variant="elevated" className="p-6 border-surface-border">
        <h3 className="mb-4 text-lg font-semibold text-ink">Before CareerCopilot</h3>
        <ul className="space-y-3">
          {beforeItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
              <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
      
      <Card variant="elevated" className="p-6 border-primary-200 bg-gradient-to-br from-primary-50 to-white">
        <h3 className="mb-4 text-lg font-semibold text-ink">After CareerCopilot</h3>
        <ul className="space-y-3">
          {afterItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
              <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
