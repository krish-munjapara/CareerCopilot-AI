import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScoreCardProps {
  title: string
  score: number
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}

export default function ScoreCard({ title, score, icon: Icon, color = 'primary', className }: ScoreCardProps) {
  const colorStyles = {
    primary: 'text-primary-600 bg-primary-50',
    secondary: 'text-secondary-600 bg-secondary-50',
    success: 'text-green-600 bg-green-50',
    warning: 'text-yellow-600 bg-yellow-50',
    danger: 'text-red-600 bg-red-50',
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'danger'
  }
  
  const scoreColor = getScoreColor(score)
  
  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-3 rounded-lg', colorStyles[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={cn('text-3xl font-bold', colorStyles[scoreColor].split(' ')[0])}>
          {score}%
        </span>
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
  )
}
