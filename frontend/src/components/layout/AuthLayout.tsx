import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, BarChart3, Box } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  showBackLink?: boolean
}

function AuthIllustration() {
  return (
    <div className="relative w-full h-[35vh] max-h-[260px] min-h-[140px] flex items-center justify-center select-none mx-auto">
      {/* Subtle Background Decorative Circles */}
      <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary-100/50 blur-3xl" />
      <div className="absolute -right-12 bottom-12 h-48 w-48 rounded-full bg-secondary-100/50 blur-3xl" />

      {/* SVG Illustration */}
      <svg
        viewBox="0 0 500 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-auto max-w-full max-h-full drop-shadow-[0_12px_24px_rgba(139,92,246,0.06)]"
      >
        <defs>
          <linearGradient id="violet-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Large faint background circle */}
        <circle cx="250" cy="180" r="110" fill="#f5f3ff" opacity="0.6" />
        <circle cx="160" cy="220" r="60" fill="#eff6ff" opacity="0.6" />

        {/* Thin purple horizontal line near the bottom */}
        <line x1="40" y1="310" x2="460" y2="310" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* Potted Plant */}
        <g id="plant" transform="translate(10, 0)">
          {/* Pot */}
          <path d="M 75 310 L 83 275 L 107 275 L 115 310 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="80" y1="280" x2="110" y2="280" stroke="#cbd5e1" strokeWidth="1" />
          {/* Plant Leaves */}
          <path d="M 95 275 C 80 240, 65 245, 55 255 C 65 265, 80 270, 95 275 Z" fill="#10b981" />
          <path d="M 95 275 C 95 230, 110 235, 115 248 C 110 258, 105 268, 95 275 Z" fill="#059669" />
          <path d="M 95 275 C 110 250, 130 255, 135 268 C 125 272, 112 272, 95 275 Z" fill="#34d399" />
        </g>

        {/* Floating Analytics Card 1 (Top Left) */}
        <g transform="translate(60, 60)" className="animate-pulse-slow">
          {/* Card Shadow and Background */}
          <rect width="130" height="75" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          {/* Decorative bar */}
          <rect x="12" y="14" width="55" height="7" rx="3.5" fill="#e2e8f0" />
          <rect x="12" y="27" width="35" height="5" rx="2.5" fill="#f1f5f9" />
          {/* Minimalist Bar Chart */}
          <rect x="12" y="46" width="9" height="15" rx="2" fill="#3b82f6" opacity="0.8" />
          <rect x="25" y="38" width="9" height="23" rx="2" fill="#8b5cf6" />
          <rect x="38" y="49" width="9" height="12" rx="2" fill="#e2e8f0" />
          <rect x="51" y="43" width="9" height="18" rx="2" fill="#3b82f6" />
          {/* Match Score Badge */}
          <rect x="75" y="46" width="43" height="16" rx="8" fill="#ecfdf5" />
          <text x="96" y="56" fill="#059669" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">92% Match</text>
        </g>

        {/* Floating Analytics Card 2 (Top Right) */}
        <g transform="translate(310, 75)">
          <rect width="135" height="80" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="12" y="14" width="45" height="7" rx="3.5" fill="#8b5cf6" opacity="0.2" />
          <rect x="12" y="27" width="25" height="5" rx="2.5" fill="#f1f5f9" />
          {/* Line Chart */}
          <path d="M 12 60 Q 40 35, 68 50 T 123 30" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 12 60 Q 40 35, 68 50 T 123 30 L 123 68 L 12 68 Z" fill="url(#violet-gradient)" />
          <circle cx="123" cy="30" r="4.5" fill="#8b5cf6" />
          <circle cx="123" cy="30" r="2" fill="white" />
        </g>

        {/* Floating Analytics Card 3 (Middle Right) */}
        <g transform="translate(305, 195)">
          <rect width="130" height="65" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          {/* User Icon container */}
          <circle cx="26" cy="32" r="14" fill="#f5f3ff" />
          <circle cx="26" cy="27" r="4.5" fill="#7c3aed" />
          <path d="M 17 41 C 17 36, 35 36, 35 41" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
          {/* Progress Indicators */}
          <rect x="48" y="18" width="65" height="6" rx="3" fill="#f1f5f9" />
          <rect x="48" y="18" width="48" height="6" rx="3" fill="#10b981" />
          <rect x="48" y="32" width="55" height="5" rx="2.5" fill="#cbd5e1" opacity="0.6" />
          <rect x="48" y="44" width="35" height="5" rx="2.5" fill="#cbd5e1" opacity="0.3" />
        </g>

        {/* Sitting Person */}
        <g id="sitting-person">
          {/* Simple Seat/Pouf */}
          <rect x="185" y="255" width="90" height="55" rx="16" fill="#8b5cf6" opacity="0.12" />
          <rect x="185" y="255" width="90" height="55" rx="16" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.25" strokeDasharray="3 3" />
          
          {/* Legs */}
          <path d="M 215 260 L 175 285 L 182 310" stroke="#475569" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 235 260 L 195 290 L 202 310" stroke="#334155" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

          {/* Torso / Clothes */}
          <path d="M 220 200 C 215 200, 222 255, 238 260" stroke="#3b82f6" strokeWidth="24" strokeLinecap="round" />

          {/* Head */}
          <circle cx="218" cy="168" r="15" fill="#ffedd5" />
          {/* Hair */}
          <path d="M 205 163 C 205 146, 232 146, 230 163 C 224 156, 212 156, 205 163 Z" fill="#1e293b" />

          {/* Arms holding laptop */}
          <path d="M 224 212 L 255 224 L 265 214" stroke="#ffedd5" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Laptop */}
          {/* Screen */}
          <polygon points="280,196 295,220 297,221 282,197" fill="#bae6fd" opacity="0.9" />
          <line x1="281" y1="195" x2="296" y2="220" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          {/* Base */}
          <line x1="255" y1="225" x2="295" y2="225" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        {/* Extra Decorative Sparkles/Blobs */}
        <path d="M 125 190 L 127 194 L 131 195 L 127 196 L 125 200 L 123 196 L 119 195 L 123 194 Z" fill="#fbbf24" opacity="0.75" />
        <path d="M 270 120 L 271 123 L 274 124 L 271 125 L 270 128 L 269 125 L 266 124 L 269 123 Z" fill="#8b5cf6" opacity="0.6" />
        <circle cx="55" cy="180" r="5" fill="#3b82f6" opacity="0.25" />
        <circle cx="445" cy="165" r="7" fill="#8b5cf6" opacity="0.2" />
        <circle cx="285" cy="300" r="3.5" fill="#10b981" opacity="0.3" />
      </svg>
    </div>
  )
}

export default function AuthLayout({ children, title, subtitle, showBackLink = false }: AuthLayoutProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent insights about your resume and job match',
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/50',
    },
    {
      icon: TrendingUp,
      title: 'Improve & Optimize',
      description: 'Get personalized recommendations to improve your chances',
      iconBg: 'bg-violet-50 text-violet-600 border border-violet-100/50',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your progress and improvement over time',
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100/50',
    },
  ]

  return (
    <div className="flex min-h-[100dvh] bg-white">
      {/* Left Side - Branding and Features */}
      <aside
        className="relative hidden w-1/2 h-[100dvh] max-h-[100vh] overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_20%_25%,rgba(139,92,246,0.12),transparent_35%),linear-gradient(180deg,#ffffff_0%,#eef2ff_100%)] lg:flex lg:flex-col sticky top-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]" />
        <div className="relative z-10 flex flex-col h-full p-8 xl:p-12 justify-between overflow-hidden">
          {/* Top content wrapper */}
          <div className="space-y-6 xl:space-y-8">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
                  <Box className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-ink">Career</span>
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Copilot</span>
                </span>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="max-w-xl">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">Welcome back!</h1>
              <p className="text-sm xl:text-base leading-relaxed text-ink-muted">
                Login to your account and continue your journey towards your dream job.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 xl:space-y-5 max-w-xl">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-all duration-300 hover:scale-105',
                      feature.iconBg
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-0.5 text-sm xl:text-base font-semibold text-ink">{feature.title}</h3>
                      <p className="text-xs xl:text-sm leading-relaxed text-ink-muted">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Illustration at bottom */}
          <div className="w-full mt-4 flex items-center justify-center">
            <AuthIllustration />
          </div>
        </div>
      </aside>

      {/* Right Side - Form */}
      <div className="relative flex flex-1 flex-col justify-center px-8 py-10 sm:px-12 lg:px-16 bg-white">
        <motion.div
          className="mx-auto w-full max-w-[464px]"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {showBackLink && (
            <Link to="/" className="mb-6 inline-flex items-center text-[15px] font-normal text-ink-muted hover:text-primary-600 transition-colors">
              ← Back to CareerCopilot
            </Link>
          )}
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
            <p className="mt-2 text-[15px] text-ink-muted">{subtitle}</p>
          </div>
          <div className={cn('rounded-[2rem] border border-surface-border bg-white p-8 shadow-card')}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
