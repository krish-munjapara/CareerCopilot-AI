import { Lightbulb, TrendingUp, BookOpen, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    tip: 'text-yellow-600 bg-yellow-50',
    general: 'text-gray-600 bg-gray-50',
  }
  
  const priorityStyles = {
    high: 'border-l-4 border-red-500',
    medium: 'border-l-4 border-yellow-500',
    low: 'border-l-4 border-green-500',
  }
  
  const Icon = typeIcons[type]
  
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 p-4', priorityStyles[priority], className)}>
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg', typeColors[type])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}
