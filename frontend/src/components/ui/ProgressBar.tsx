import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  className,
}: ProgressBarProps) {
  const percentage = (value / max) * 100
  
  const colorStyles = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  }
  
  return (
    <div className={cn('w-full bg-gray-200 rounded-full h-2', className)}>
      <div
        className={cn(colorStyles[color], 'h-2 rounded-full transition-all duration-300')}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}
