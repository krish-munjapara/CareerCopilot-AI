import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BarChart3,
  Target,
  Lightbulb,
  User,
} from 'lucide-react'

interface SidebarItem {
  title: string
  path: string
  icon: any
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Upload Resume', path: '/upload-resume', icon: FileText },
  { title: 'Upload Job', path: '/upload-job', icon: Briefcase },
  { title: 'ATS Results', path: '/ats-results', icon: BarChart3 },
  { title: 'Resume Analysis', path: '/resume-analysis', icon: Target },
  { title: 'Skill Gap', path: '/skill-gap', icon: Lightbulb },
  { title: 'Recommendations', path: '/recommendations', icon: Lightbulb },
  { title: 'Profile', path: '/profile', icon: User },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden lg:block">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Menu</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
