import { LucideIcon } from 'lucide-react'

interface PipelineStepProps {
  icon: LucideIcon
  title: string
  description: string
  isLast?: boolean
}

export default function PipelineStep({ icon: Icon, title, description, isLast = false }: PipelineStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        {!isLast && (
          <div className="my-2 h-8 w-0.5 bg-gradient-to-b from-primary-300 to-primary-100" />
        )}
      </div>
      <div className="flex-1 pt-2">
        <h4 className="font-semibold text-ink">{title}</h4>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
    </div>
  )
}
