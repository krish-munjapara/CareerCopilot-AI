import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  to?: string
}

const sizeMap = {
  sm: { icon: 'h-7 w-7', text: 'text-base' },
  md: { icon: 'h-8 w-8', text: 'text-lg' },
  lg: { icon: 'h-10 w-10', text: 'text-xl' },
}

export default function Logo({ className, showText = true, size = 'md', to = '/' }: LogoProps) {
  const sizes = sizeMap[size]

  const content = (
    <>
      <div
        className={cn(
          sizes.icon,
          'flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 shadow-glow'
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%] text-white" aria-hidden="true">
          <path
            d="M12 3L4 8v8l8 5 8-5V8l-8-5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 12l8-4M12 12L4 8M12 12v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <span className={cn('font-bold tracking-tight text-ink', sizes.text)}>
          Career<span className="text-primary-600">Copilot</span>
        </span>
      )}
    </>
  )

  return (
    <Link to={to} className={cn('inline-flex items-center gap-2.5', className)} aria-label="CareerCopilot AI home">
      {content}
    </Link>
  )
}
