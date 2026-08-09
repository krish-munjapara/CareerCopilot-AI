import { LucideIcon } from 'lucide-react'
import Card from '@/components/ui/Card'

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <Card variant="elevated" hover>
      <div className="mb-4 inline-flex rounded-xl bg-gradient-primary p-3 text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </Card>
  )
}
