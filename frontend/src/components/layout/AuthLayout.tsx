import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside
        className="relative hidden w-[45%] overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-between"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.07]" />
        <div className="relative z-10 p-10">
          <Logo showText className="text-white [&_span]:text-white [&_span_span]:text-primary-300" />
        </div>
        <div className="relative z-10 p-10">
          <blockquote className="max-w-md">
            <p className="text-xl font-medium leading-relaxed text-white/90">
              &ldquo;Understand your fit, close skill gaps, and land the role with AI-powered career intelligence.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/60">CareerCopilot AI Platform</footer>
          </blockquote>
        </div>
        <div className="relative z-10 flex gap-8 p-10 text-sm text-white/50">
          <span>ATS Scoring</span>
          <span>Skill Gaps</span>
          <span>Smart Recommendations</span>
        </div>
      </aside>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-16">
        <motion.div
          className="mx-auto w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
            <p className="mt-2 text-ink-muted">{subtitle}</p>
          </div>
          <div className={cn('rounded-2xl border border-surface-border bg-white p-6 shadow-card sm:p-8')}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
