import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  AlertCircle,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Target,
  FileText,
  CheckSquare,
  Compass,
} from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import Button from '@/components/ui/Button'
import { MotionPage } from '@/components/ui/Motion'
import { cn } from '@/lib/utils'

const TOP_RECOMMENDATIONS = [
  {
    title: 'Add More Measurable Achievements',
    priority: 'High',
    priorityColor: 'bg-red-50 text-red-700 border-red-200',
    description: 'Add numbers, percentages, performance improvements, or measurable outcomes to your project and experience descriptions.',
    whyItMatters: 'Quantified achievements make your resume more impactful and easier for recruiters to evaluate.',
    buttonText: 'Improve Resume',
    actionRoute: '/upload-resume',
  },
  {
    title: 'Strengthen Missing Skills',
    priority: 'High',
    priorityColor: 'bg-red-50 text-red-700 border-red-200',
    description: 'Focus on the most important skills identified in your skill-gap analysis.',
    whyItMatters: 'Bridging critical skill gaps directly increases your compatibility score for target roles.',
    buttonText: 'View Skill Gap',
    actionRoute: '/skill-gap',
  },
  {
    title: 'Improve ATS Keywords',
    priority: 'High',
    priorityColor: 'bg-red-50 text-red-700 border-red-200',
    description: 'Add relevant keywords from the target job description naturally throughout your resume.',
    whyItMatters: 'Optimized keyword distribution ensures your resume passes initial automated ATS filters.',
    buttonText: 'View ATS Results',
    actionRoute: '/ats-results',
  },
  {
    title: 'Strengthen Project Descriptions',
    priority: 'Medium',
    priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Highlight your technical contributions, technologies used, and measurable project outcomes.',
    whyItMatters: 'Detailed project descriptions demonstrate practical engineering capability to hiring managers.',
    buttonText: 'Review Projects',
    actionRoute: '/resume-analysis',
  },
  {
    title: 'Build Cloud & Deployment Skills',
    priority: 'Medium',
    priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Develop practical experience with cloud platforms, Docker, deployment, and CI/CD.',
    whyItMatters: 'Cloud and DevOps capabilities are highly demanded across modern engineering jobs.',
    buttonText: 'View Skill Gap',
    actionRoute: '/skill-gap',
  },
]

const CATEGORY_DATA = {
  Resume: [
    'Improve summary statement with targeted career focus',
    'Quantify achievements with concrete metrics and outcomes',
    'Strengthen technical project bullet points and roles',
  ],
  Skills: [
    'Learn AWS fundamentals (EC2, S3, IAM)',
    'Improve System Design concepts and architectural patterns',
    'Practice advanced DSA algorithms and problem solving',
  ],
  'ATS Optimization': [
    'Add missing role-specific keywords from job description',
    'Improve keyword distribution across experience sections',
    'Avoid complex tables or graphics that hinder ATS parsing',
  ],
  Projects: [
    'Add measurable impact metrics to every project item',
    'Explain technical architecture and design choices',
    'Highlight individual contributions and leadership',
  ],
  Career: [
    'Target relevant engineering roles that match skill set',
    'Improve technical interview preparation and mock practice',
    'Build role-specific portfolio projects demonstrating skills',
  ],
}

const QUICK_WINS = [
  'Add LinkedIn URL to contact info',
  'Add GitHub URL to header',
  'Quantify project results with metrics',
  'Add relevant missing keywords',
  'Improve summary section text',
  'Highlight strongest technical skills',
]

const ACTION_PLAN = [
  { step: '01', title: 'Optimize Resume', desc: 'Refine structure, summary statement, and experience bullet points.' },
  { step: '02', title: 'Close Skill Gaps', desc: 'Focus on high-priority missing technical skills such as AWS and System Design.' },
  { step: '03', title: 'Improve ATS Match', desc: 'Incorporate targeted job description keywords naturally throughout.' },
  { step: '04', title: 'Build Relevant Projects', desc: 'Create hands-on portfolio demonstrations highlighting practical skills.' },
  { step: '05', title: 'Apply to Target Roles', desc: 'Submit your optimized profile and resume to target positions.' },
]

export default function Recommendations() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORY_DATA>('Resume')

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-5xl space-y-8 pb-12">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            AI Recommendations
          </h1>
          <p className="mt-2 text-base text-ink-muted sm:text-lg">
            Get personalized recommendations to improve your resume, skills, and chances of landing your target role.
          </p>
        </div>

        {/* 1. AI Summary Card */}
        <div className="rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-purple-500/10 p-6 sm:p-8 shadow-card flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-inner">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink sm:text-2xl">
              Your Personalized Career Plan
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Based on your resume, target job description, ATS results, and skill gaps, our AI identified the following actions to strengthen your profile.
            </p>
          </div>
        </div>

        {/* 2. Priority Summary (3 Cards) */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* High Priority */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex items-center gap-4 transition-all hover:shadow-card">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                High Priority
              </p>
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">4</h3>
              <p className="text-xs text-red-700 font-medium">Critical improvements</p>
            </div>
          </div>

          {/* Medium Priority */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex items-center gap-4 transition-all hover:shadow-card">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Medium Priority
              </p>
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">6</h3>
              <p className="text-xs text-amber-700 font-medium">Secondary enhancements</p>
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex items-center gap-4 transition-all hover:shadow-card">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Completed
              </p>
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">3</h3>
              <p className="text-xs text-emerald-700 font-medium">Actions implemented</p>
            </div>
          </div>
        </div>

        {/* 3. Top Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Top Recommendations
          </h2>

          <div className="space-y-4">
            {TOP_RECOMMENDATIONS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-card"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${item.priorityColor}`}>
                      {item.priority} Priority
                    </span>
                    <h3 className="text-base font-bold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-xs text-ink-subtle font-medium">
                    <strong className="text-ink">Why it matters:</strong> {item.whyItMatters}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(item.actionRoute)}
                  className="font-semibold shadow-md shadow-glow rounded-xl shrink-0 self-start sm:self-center"
                >
                  {item.buttonText}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Recommendations by Category */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Recommendations by Category
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-surface-border pb-4">
            {(Object.keys(CATEGORY_DATA) as Array<keyof typeof CATEGORY_DATA>).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer',
                  activeCategory === cat
                    ? 'bg-gradient-primary text-white shadow-md shadow-glow'
                    : 'bg-surface-subtle text-ink-muted hover:bg-surface-subtle/80 hover:text-ink'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Category Items */}
          <div className="space-y-3 pt-1">
            {CATEGORY_DATA[activeCategory].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl bg-surface-subtle/40 p-4 border border-surface-border/60 transition-all hover:bg-surface-subtle/80"
              >
                <CheckSquare className="h-5 w-5 text-primary-600 shrink-0" />
                <span className="text-sm font-medium text-ink">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Quick Wins */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Quick Wins
            </h2>
            <p className="text-xs text-ink-muted mt-1">
              Small changes you can make immediately to improve your profile.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2">
            {QUICK_WINS.map((win) => (
              <div
                key={win}
                className="flex items-center gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5 shadow-2xs"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-ink">
                  {win}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. AI Career Insight */}
        <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-white via-primary-50/20 to-violet-50/30 p-6 sm:p-8 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              AI Career Insight
            </h2>
          </div>
          <p className="text-sm text-ink font-medium leading-relaxed max-w-3xl">
            Your profile has a strong technical foundation. Your biggest opportunity is to improve measurable impact, strengthen a few role-specific skills, and optimize your resume keywords for the target position.
          </p>
        </div>

        {/* 7. Recommended Action Plan (Timeline Stepper) */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Recommended Action Plan
          </h2>

          <div className="grid gap-4 sm:grid-cols-5 pt-2">
            {ACTION_PLAN.map((step) => (
              <div
                key={step.step}
                className="flex flex-col justify-between rounded-xl border border-surface-border bg-surface-subtle/30 p-4 shadow-2xs space-y-3"
              >
                <div>
                  <span className="text-xs font-black text-primary-600 tracking-wider uppercase">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-ink mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Recommendation Progress */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-ink">
              Recommendation Progress
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              3 of 10 recommendations completed
            </span>
          </div>

          <div className="w-full bg-surface-subtle h-3 rounded-full overflow-hidden p-0.5 border border-surface-border/60">
            <div
              className="h-full rounded-full bg-emerald-500 shadow-sm transition-all duration-500"
              style={{ width: '30%' }}
            />
          </div>

          <p className="text-xs text-ink-muted">
            Keep improving your profile step by step.
          </p>
        </div>

        {/* 9. Bottom Action Buttons */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h3 className="text-base font-bold text-ink">
              Explore More Results
            </h3>
            <p className="text-xs text-ink-muted">
              Review detailed scores, skill gaps, or test another role.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/resume-analysis')}
              className="font-medium rounded-xl"
            >
              <FileText className="mr-1.5 h-4 w-4 text-primary-600" />
              View Resume Analysis
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
              variant="outline"
              size="sm"
              onClick={() => navigate('/ats-results')}
              className="font-medium rounded-xl"
            >
              <BarChart3 className="mr-1.5 h-4 w-4 text-blue-600" />
              View ATS Results
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/upload-job')}
              className="font-semibold shadow-md shadow-glow rounded-xl"
            >
              <TrendingUp className="mr-1.5 h-4 w-4" />
              Analyze Another Job
            </Button>
          </div>
        </div>
      </MotionPage>
    </AppLayout>
  )
}
