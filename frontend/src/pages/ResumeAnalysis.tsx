import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layout,
  Target,
  Briefcase,
  GraduationCap,
  Key,
  ArrowRight,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import Button from '@/components/ui/Button'
import { MotionPage } from '@/components/ui/Motion'
import { useAuth } from '@/contexts/AuthContext'

const BREAKDOWN_ITEMS = [
  {
    title: 'Resume Structure',
    score: 90,
    description: 'Clear structure and easy-to-follow sections.',
    icon: Layout,
    color: 'bg-blue-50 text-blue-600',
    barColor: 'bg-blue-600',
  },
  {
    title: 'Skills',
    score: 85,
    description: 'Strong technical skills relevant to your target roles.',
    icon: Target,
    color: 'bg-violet-50 text-violet-600',
    barColor: 'bg-violet-600',
  },
  {
    title: 'Experience',
    score: 78,
    description: 'Good project experience with opportunities for improvement.',
    icon: Briefcase,
    color: 'bg-amber-50 text-amber-600',
    barColor: 'bg-amber-600',
  },
  {
    title: 'Education',
    score: 92,
    description: 'Education details are clearly presented.',
    icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-600',
    barColor: 'bg-emerald-600',
  },
  {
    title: 'Keywords',
    score: 80,
    description: 'Good keyword coverage with some missing role-specific terms.',
    icon: Key,
    color: 'bg-indigo-50 text-indigo-600',
    barColor: 'bg-indigo-600',
  },
  {
    title: 'Formatting',
    score: 88,
    description: 'Clean and professional resume formatting.',
    icon: Sparkles,
    color: 'bg-teal-50 text-teal-600',
    barColor: 'bg-teal-600',
  },
]

const STRENGTHS = [
  'Strong technical skill set',
  'Good project experience',
  'Clear resume structure',
  'Relevant education details',
  'Good use of industry keywords',
]

const IMPROVEMENTS = [
  'Add more measurable achievements',
  'Improve keyword coverage for target roles',
  'Add stronger action verbs',
  'Quantify project impact',
  'Improve experience descriptions',
]

const INSIGHTS = [
  {
    title: 'Add measurable impact',
    description: 'Quantify your project outcomes with metrics, percentages, or performance improvements.',
  },
  {
    title: 'Include more role-specific keywords',
    description: 'Align technical terms directly with target job requirements to pass ATS filters easily.',
  },
  {
    title: 'Strengthen project descriptions',
    description: 'Focus on leadership, problem-solving, and architecture decisions in experience bullets.',
  },
  {
    title: 'Highlight relevant achievements',
    description: 'Position top achievements near the top of experience sections for maximum recruiter impact.',
  },
]

export default function ResumeAnalysis() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [filename, setFilename] = useState('Krish_Munjapara_Resume.pdf')

  useEffect(() => {
    const stored = sessionStorage.getItem('resumeAnalysis')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.file_name) setFilename(parsed.file_name)
      } catch {
        // use default filename
      }
    } else if (user?.full_name) {
      setFilename(`${user.full_name.replace(/\s+/g, '_')}_Resume.pdf`)
    }
  }, [user])

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-5xl space-y-8 pb-12">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Resume Analysis
          </h1>
          <p className="mt-2 text-base text-ink-muted sm:text-lg">
            Get a detailed analysis of your resume and discover your strengths and areas for improvement.
          </p>
        </div>

        {/* 1. Resume Summary Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-inner">
              <FileText className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold text-ink sm:text-xl">
                {filename}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-ink-muted font-medium">
                <span>Uploaded recently</span>
                <span>•</span>
                <span>PDF Document</span>
                <span>•</span>
                <span>2.4 MB</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/upload-resume')}
              className="font-medium rounded-xl"
            >
              <Eye className="mr-1.5 h-4 w-4" />
              View Resume
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/upload-resume')}
              className="font-semibold shadow-md shadow-glow rounded-xl"
            >
              <Download className="mr-1.5 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* 2. Overall Resume Score Section */}
        <div className="rounded-2xl border border-surface-border bg-white p-8 text-center shadow-card space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Resume Score
          </h2>

          <div className="flex flex-col items-center justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 text-white font-black text-3xl shadow-lg shadow-glow border-4 border-white">
              82%
            </div>
            <span className="mt-3 inline-block rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              Strong Resume
            </span>
          </div>

          <p className="text-sm leading-relaxed text-ink-muted max-w-md mx-auto">
            Your resume is well-structured and contains relevant skills, experience, and projects.
          </p>
        </div>

        {/* 3. Analysis Breakdown (6 Grid Cards) */}
        <div>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Analysis Breakdown
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BREAKDOWN_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-lg font-bold text-ink">
                        {item.score}%
                      </span>
                    </div>
                    <h3 className="mb-1 text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-ink-muted mb-4">
                      {item.description}
                    </p>
                  </div>
                  {/* Score Progress Bar */}
                  <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.barColor}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. Strengths & Areas for Improvement Side-by-Side */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Strengths Card */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              Resume Strengths
            </h2>
            <div className="space-y-3">
              {STRENGTHS.map((strength) => (
                <div key={strength} className="flex items-start gap-3 rounded-xl bg-emerald-50/50 p-3 border border-emerald-100/60">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-ink">
                    {strength}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement Card */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              Areas for Improvement
            </h2>
            <div className="space-y-3">
              {IMPROVEMENTS.map((improvement) => (
                <div key={improvement} className="flex items-start gap-3 rounded-xl bg-amber-50/50 p-3 border border-amber-100/60">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-ink">
                    {improvement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. AI Resume Insights */}
        <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-white via-primary-50/20 to-violet-50/30 p-6 sm:p-8 shadow-card space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                AI Resume Insights
              </h2>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Our AI analyzed your resume and identified the following opportunities to improve your chances of getting shortlisted.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INSIGHTS.map((insight) => (
              <div key={insight.title} className="rounded-xl border border-surface-border/80 bg-white p-4 shadow-xs">
                <h3 className="mb-1 text-sm font-bold text-ink">
                  {insight.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Quick Actions */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h3 className="text-base font-bold text-ink">
              Next Steps & Analysis
            </h3>
            <p className="text-xs text-ink-muted">
              Explore your detailed ATS scores, skill gaps, and recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/ats-results')}
              className="font-medium rounded-xl"
            >
              <BarChart3 className="mr-1.5 h-4 w-4 text-primary-600" />
              View ATS Results
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/skill-gap')}
              className="font-medium rounded-xl"
            >
              <Target className="mr-1.5 h-4 w-4 text-violet-600" />
              View Skill Gap
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/recommendations')}
              className="font-semibold shadow-md shadow-glow rounded-xl"
            >
              <TrendingUp className="mr-1.5 h-4 w-4" />
              View Recommendations
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </MotionPage>
    </AppLayout>
  )
}
