import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Search, Brain, ArrowDown } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  showBackLink?: boolean
}

export default function AuthLayout({ children, title, subtitle, showBackLink = false }: AuthLayoutProps) {
  const valueProps = [
    {
      icon: FileText,
      title: 'Resume Intelligence',
      description: 'Extract skills, experience and education with AI.',
    },
    {
      icon: Search,
      title: 'Semantic Job Matching',
      description: 'Understand how well your profile fits your target role.',
    },
    {
      icon: Brain,
      title: 'Personalized Career Insights',
      description: 'Discover skill gaps and your next best career move.',
    },
  ]

  return (
    <div className="flex min-h-[100dvh]">
      <aside
        className="relative hidden w-[45%] overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-between"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.07]" />
        <div className="relative z-10 p-10 max-h-[800px]:p-8">
          <Logo showText className="text-white [&_span]:text-white [&_span_span]:text-primary-300" />
        </div>
        <div className="relative z-10 flex-1 p-10 max-h-[800px]:p-8">
          <blockquote className="mb-6 max-w-md max-h-[800px]:mb-4">
            <p className="text-xl font-medium leading-relaxed text-white/90 max-h-[800px]:text-lg">
              &ldquo;Understand your fit, close skill gaps, and land the role with AI-powered career intelligence.&rdquo;
            </p>
          </blockquote>
          <div className="space-y-3 max-h-[800px]:space-y-2">
            {valueProps.map((prop) => {
              const Icon = prop.icon
              return (
                <div key={prop.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/80">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white/90">{prop.title}</p>
                    <p className="text-sm text-white/60">{prop.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="relative z-10 p-10 max-h-[800px]:p-6">
          <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm max-h-[800px]:p-3">
            <p className="mb-3 text-xs font-medium text-white/50 uppercase tracking-wider max-h-[800px]:mb-2">AI Workflow</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70 max-h-[800px]:text-xs">
              <span>Resume</span>
              <ArrowDown className="h-3 w-3" />
              <span>NLP</span>
              <ArrowDown className="h-3 w-3" />
              <span>Semantic Matching</span>
              <ArrowDown className="h-3 w-3" />
              <span>Skill Gaps</span>
              <ArrowDown className="h-3 w-3" />
              <span>AI Insights</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="relative flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-16 max-h-[800px]:py-8 bg-gradient-to-br from-surface via-white to-surface-muted/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[100px]" />
        </div>
        <motion.div
          className="mx-auto w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {showBackLink && (
            <Link to="/" className="mb-4 inline-flex items-center text-sm text-ink-muted hover:text-primary-600 transition-colors">
              ← Back to CareerCopilot
            </Link>
          )}
          <div className="mb-6 max-h-[800px]:mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl max-h-[800px]:text-2xl">{title}</h1>
            <p className="mt-2 text-ink-muted max-h-[800px]:mt-1">{subtitle}</p>
          </div>
          <div className={cn('rounded-2xl border border-surface-border bg-white p-6 shadow-card sm:p-8 max-h-[800px]:p-5')}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
