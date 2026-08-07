import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export default function Loader({ size = 'md', label, className }: LoaderProps) {
  const sizeStyles = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)} role="status" aria-live="polite">
      <div
        className={cn('animate-spin rounded-full border-primary-200 border-t-primary-600', sizeStyles[size])}
        aria-hidden="true"
      />
      {label && <p className="text-sm text-ink-muted">{label}</p>}
    </div>
  )
}
