import { cn } from '@/lib/utils'

type SkillChipVariant = 'matched' | 'missing' | 'extra' | 'neutral'

interface SkillChipProps {
  label: string
  variant?: SkillChipVariant
  className?: string
}

const variants: Record<SkillChipVariant, string> = {
  matched: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  missing: 'bg-red-50 text-red-800 ring-red-200',
  extra: 'bg-sky-50 text-sky-800 ring-sky-200',
  neutral: 'bg-primary-50 text-primary-800 ring-primary-200',
}

export default function SkillChip({ label, variant = 'neutral', className }: SkillChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  )
}

export function SkillChipList({
  skills,
  variant = 'neutral',
  emptyMessage = 'None found',
}: {
  skills: string[]
  variant?: SkillChipVariant
  emptyMessage?: string
}) {
  if (!skills.length) {
    return <p className="text-sm text-ink-subtle">{emptyMessage}</p>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillChip key={skill} label={skill} variant={variant} />
      ))}
    </div>
  )
}
