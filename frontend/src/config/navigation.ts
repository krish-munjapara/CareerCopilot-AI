import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BarChart3,
  FileSearch,
  GitCompare,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  title: string
  path: string
  icon: LucideIcon
  description?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const appNavigation: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
        description: 'Career intelligence overview',
      },
    ],
  },
  {
    label: 'Analyze',
    items: [
      {
        title: 'Upload Resume',
        path: '/upload-resume',
        icon: FileText,
        description: 'Parse and extract skills',
      },
      {
        title: 'Upload Job',
        path: '/upload-job',
        icon: Briefcase,
        description: 'Match against a role',
      },
    ],
  },
  {
    label: 'Insights',
    items: [
      {
        title: 'ATS Results',
        path: '/ats-results',
        icon: BarChart3,
        description: 'Compatibility scores',
      },
      {
        title: 'Resume Analysis',
        path: '/resume-analysis',
        icon: FileSearch,
        description: 'Structured resume view',
      },
      {
        title: 'Skill Gap',
        path: '/skill-gap',
        icon: GitCompare,
        description: 'Missing and matched skills',
      },
      {
        title: 'Recommendations',
        path: '/recommendations',
        icon: Sparkles,
        description: 'Personalized next steps',
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Profile',
        path: '/profile',
        icon: User,
        description: 'Settings and preferences',
      },
    ],
  },
]

export const flatNavItems: NavItem[] = appNavigation.flatMap((group) => group.items)
