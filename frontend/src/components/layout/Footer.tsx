import { Mail, Heart } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

interface FooterProps {
  variant?: 'default' | 'compact' | 'minimal'
}

export default function Footer({ variant = 'default' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer className="border-t border-surface-border/50 bg-white/50 backdrop-blur-sm px-4 py-3 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-ink-subtle">
          © {new Date().getFullYear()} CareerCopilot AI. All rights reserved.
        </p>
      </footer>
    )
  }

  if (variant === 'compact') {
    return (
      <footer className="border-t border-surface-border/50 bg-white/80 backdrop-blur-sm px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Logo size="sm" />
          <p className="text-sm text-ink-subtle">
            © {new Date().getFullYear()} CareerCopilot AI. Made with <Heart className="inline h-3 w-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </footer>
    )
  }

  const productLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
  ]

  return (
    <footer className="mt-auto border-t border-surface-border/50 bg-gradient-to-b from-white to-surface-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Logo className="mb-4" />
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              AI-powered career intelligence — ATS scoring, skill gap analysis, and personalized recommendations to help you land your dream role.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink">Product</h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-primary-600 hover:underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-surface-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-ink-subtle">
            © {new Date().getFullYear()} CareerCopilot AI. All rights reserved.
          </p>
          <a
            href="mailto:hello@careercopilot.ai"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-white text-ink-muted transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm'
            )}
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
