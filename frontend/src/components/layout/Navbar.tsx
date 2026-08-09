import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Menu, User, ChevronDown, X, Bell, Settings as SettingsIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Logo from '@/components/ui/Logo'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  variant?: 'marketing' | 'app' | 'auth'
  onMenuClick?: () => void
}

export default function Navbar({ variant = 'marketing', onMenuClick }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setUserMenuOpen(false)
  }

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {variant === 'app' && (
              <button
                type="button"
                className="rounded-xl p-2 text-ink-muted transition-all hover:bg-surface-subtle hover:text-ink lg:hidden"
                onClick={onMenuClick}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <Logo size={variant === 'app' ? 'sm' : 'md'} />
          </div>

          {variant === 'marketing' && (
            <>
              <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink hover:bg-surface-subtle rounded-xl"
                  >
                    {link.label}
                  </a>
                ))}
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink hover:bg-surface-subtle rounded-xl"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink hover:bg-surface-subtle rounded-xl"
                    >
                      Login
                    </Link>
                    <Link to="/register">
                      <Button size="sm" variant="primary">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </nav>

              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  className="rounded-xl p-2 text-ink-muted transition-all hover:bg-surface-subtle hover:text-ink"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          )}

          {variant === 'app' && isAuthenticated && (
            <div className="flex items-center gap-3">
              <div className="relative" ref={notificationRef}>
                <button
                  type="button"
                  className="relative rounded-xl p-2 text-ink-muted transition-all hover:bg-surface-subtle hover:text-ink"
                  aria-label="Notifications"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  aria-expanded={notificationOpen}
                >
                  <Bell className="h-5 w-5" />
                </button>
                {notificationOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 origin-top-right animate-scale-in rounded-2xl border border-surface-border bg-white py-3 shadow-elevated"
                    role="menu"
                  >
                    <div className="px-4 py-2 border-b border-surface-border">
                      <p className="text-sm font-medium text-ink">Notifications</p>
                    </div>
                    <div className="px-4 py-6 text-center">
                      <Bell className="mx-auto h-10 w-10 text-ink-subtle mb-2" />
                      <p className="text-sm text-ink-muted">No new notifications</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  className={cn(
                    'flex items-center gap-2 rounded-xl border border-surface-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-all hover:shadow-md',
                    userMenuOpen && 'ring-2 ring-primary-500 ring-offset-2'
                  )}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white shadow-inner-glow">
                    <User className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="hidden max-w-[150px] truncate sm:inline">{user?.full_name || 'User'}</span>
                  <ChevronDown
                    className={cn('h-4 w-4 text-ink-subtle transition-transform', userMenuOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 origin-top-right animate-scale-in rounded-2xl border border-surface-border bg-white py-2 shadow-elevated"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-surface-border">
                      <p className="text-sm font-medium text-ink">{user?.full_name || 'User'}</p>
                      <p className="text-xs text-ink-subtle">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-surface-subtle transition-colors"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 text-ink-subtle" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-surface-subtle transition-colors"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <SettingsIcon className="h-4 w-4 text-ink-subtle" />
                      Settings
                    </Link>
                    <hr className="my-2 border-surface-border" />
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {variant === 'marketing' && mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden animate-fade-in-down border-t border-surface-border bg-white py-4"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-ink hover:bg-surface-subtle rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-ink hover:bg-surface-subtle rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-ink hover:bg-surface-subtle rounded-xl transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" fullWidth size="md">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
