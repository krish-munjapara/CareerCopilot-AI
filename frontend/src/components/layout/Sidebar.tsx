import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Home, FileText, Upload, BarChart3, Target, TrendingUp, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const navigation = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    title: 'Upload Resume',
    path: '/upload-resume',
    icon: Upload,
  },
  {
    title: 'Upload Job',
    path: '/upload-job',
    icon: FileText,
  },
  {
    title: 'ATS Results',
    path: '/ats-results',
    icon: BarChart3,
  },
  {
    title: 'Resume Analysis',
    path: '/resume-analysis',
    icon: FileText,
  },
  {
    title: 'Skill Gap',
    path: '/skill-gap',
    icon: Target,
  },
  {
    title: 'Recommendations',
    path: '/recommendations',
    icon: TrendingUp,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
  },
]

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()

  return (
    <nav className="flex flex-col gap-2" aria-label="App navigation">
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-gradient-primary text-white shadow-md shadow-glow'
                : 'text-ink-muted hover:bg-surface-subtle hover:text-ink'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              className={cn(
                'h-5 w-5 shrink-0 transition-colors',
                isActive ? 'text-white' : 'text-ink-subtle group-hover:text-ink-muted'
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.title}</span>
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="ml-auto h-2 w-2 rounded-full bg-white"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-surface-border/50 bg-white/50 backdrop-blur-sm lg:block">
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Main Menu</p>
          </div>
          <NavContent />
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-80 flex-col bg-white shadow-elevated lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between border-b border-surface-border p-6">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="rounded-xl p-2 text-ink-muted hover:bg-surface-subtle transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Main Menu</p>
                </div>
                <NavContent onNavigate={onMobileClose} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
