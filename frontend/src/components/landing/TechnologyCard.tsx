import Card from '@/components/ui/Card'

interface TechnologyCardProps {
  name: string
  description: string
}

export default function TechnologyCard({ name, description }: TechnologyCardProps) {
  return (
    <Card variant="elevated" hover className="text-center">
      <h3 className="text-lg font-semibold text-ink">{name}</h3>
      <p className="mt-2 text-sm text-ink-muted">{description}</p>
    </Card>
  )
}
