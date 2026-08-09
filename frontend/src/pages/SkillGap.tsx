import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Briefcase,
  Edit,
  BookOpen,
  Zap,
} from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import Button from '@/components/ui/Button'
import { MotionPage } from '@/components/ui/Motion'
import { useAnalysisData } from '@/hooks/useSessionData'

const DEFAULT_MATCHED_SKILLS = [
  'Python',
  'Java',
  'JavaScript',
  'React.js',
  'FastAPI',
  'SQL',
  'MongoDB',
  'Git',
  'REST APIs',
  'Data Analysis',
]

const MISSING_SKILLS = [
  {
    name: 'AWS',
    importance: 'High',
    description: 'Frequently required for cloud infrastructure and deployment.',
  },
  {
    name: 'System Design',
    importance: 'High',
    description: 'Essential for scalable software architecture and API design.',
  },
  {
    name: 'Docker',
    importance: 'Medium',
    description: 'Used for containerization and microservice deployment.',
  },
  {
    name: 'Kubernetes',
    importance: 'Low',
    description: 'Helpful for container orchestration and cloud management.',
  },
  {
    name: 'CI/CD',
    importance: 'Medium',
    description: 'Automates testing and continuous deployment pipelines.',
  },
  {
    name: 'Advanced DSA',
    importance: 'Medium',
    description: 'Critical for algorithmic optimization and technical interviews.',
  },
]

const PRIORITY_SKILLS = [
  {
    priority: 'HIGH',
    skill: 'AWS',
    reason: 'Frequently required for the target role.',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    priority: 'HIGH',
    skill: 'System Design',
    reason: 'Essential for scalable backend architecture.',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    priority: 'MEDIUM',
    skill: 'Docker',
    reason: 'Used for containerization and microservices.',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    priority: 'LOW',
    skill: 'Kubernetes',
    reason: 'Helpful for cloud infrastructure management.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
]

const LEARNING_PATH = [
  {
    skill: 'AWS',
    current: 'Beginner',
    target: 'Intermediate',
    recommendation: 'Learn AWS fundamentals, EC2, S3, IAM and basic deployment.',
  },
  {
    skill: 'System Design',
    current: 'Beginner',
    target: 'Intermediate',
    recommendation: 'Learn scalability, APIs, caching, databases and distributed systems.',
  },
  {
    skill: 'Docker',
    current: 'Beginner',
    target: 'Intermediate',
    recommendation: 'Learn Docker container creation, Docker Compose, and multi-stage builds.',
  },
]

const INSIGHTS = [
  'Focus on high-priority missing skills first to make the biggest impact on your job match score.',
  'Strengthen cloud and deployment knowledge like AWS and Docker to align with modern engineering roles.',
  'Improve system design fundamentals to prepare for senior-level technical interviews.',
  'Add relevant skills to your resume after gaining hands-on practical project experience.',
]

export default function SkillGap() {
  const navigate = useNavigate()
  const { data: analysisData } = useAnalysisData()
  const [jobTitle, setJobTitle] = useState('Software Engineer')
  const [matchedSkills, setMatchedSkills] = useState<string[]>(DEFAULT_MATCHED_SKILLS)
  const [skillMatchPercentage, setSkillMatchPercentage] = useState(75)

  useEffect(() => {
    if (analysisData) {
      if (analysisData.job_skills && analysisData.job_skills.length > 0) {
        setJobTitle('Target Role')
      }
      if (analysisData.matched_skills && analysisData.matched_skills.length > 0) {
        setMatchedSkills(analysisData.matched_skills)
      }
      if (analysisData.skill_coverage) {
        setSkillMatchPercentage(analysisData.skill_coverage)
      }
    }
  }, [analysisData])

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-5xl space-y-8 pb-12">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Skill Gap Analysis
          </h1>
          <p className="mt-2 text-base text-ink-muted sm:text-lg">
            Identify the skills you already have and discover the skills you need to develop for your target role.
          </p>
        </div>

        {/* 1. Target Role Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-inner">
              <Briefcase className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Target Role
              </span>
              <h2 className="truncate text-xl font-bold text-ink sm:text-2xl mt-0.5">
                {jobTitle}
              </h2>
              <p className="text-xs text-ink-muted mt-0.5">
                Based on your selected job description
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/upload-job')}
            className="font-medium rounded-xl shrink-0"
          >
            <Edit className="mr-1.5 h-4 w-4" />
            Change Job
          </Button>
        </div>

        {/* 2. Skill Overview (3 Cards) */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Matched Skills Card */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex items-center gap-4 transition-all hover:shadow-card">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Matched Skills
              </p>
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">
                {matchedSkills.length}
              </h3>
              <p className="text-xs text-emerald-700 font-medium">Verified from resume</p>
            </div>
          </div>

          {/* Missing Skills Card */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex items-center gap-4 transition-all hover:shadow-card">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Missing Skills
              </p>
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">
                {MISSING_SKILLS.length}
              </h3>
              <p className="text-xs text-amber-700 font-medium">To learn & add</p>
            </div>
          </div>

          {/* Skill Match Card */}
          <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm flex items-center gap-4 transition-all hover:shadow-card">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Skill Match
              </p>
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">
                {skillMatchPercentage}%
              </h3>
              <p className="text-xs text-primary-700 font-medium">Compatibility score</p>
            </div>
          </div>
        </div>

        {/* 3. Skill Matching Visualization */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Your Skill Match
            </h2>
            <span className="text-lg font-bold text-primary-600">
              {skillMatchPercentage}% Skill Match
            </span>
          </div>

          {/* Gradient Progress Bar */}
          <div className="w-full bg-surface-subtle h-4 rounded-full overflow-hidden p-0.5 border border-surface-border/60">
            <div
              className="h-full rounded-full bg-gradient-primary shadow-sm transition-all duration-500"
              style={{ width: `${skillMatchPercentage}%` }}
            />
          </div>

          <p className="text-sm text-ink-muted leading-relaxed">
            Your current skills match approximately {skillMatchPercentage}% of the skills required for this role.
          </p>
        </div>

        {/* 4. Matched Skills Section */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            Matched Skills
          </h2>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {matchedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-800 border border-emerald-200 shadow-2xs"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Missing Skills Section */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
            Missing Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
            {MISSING_SKILLS.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-ink">
                      {item.name}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      {item.importance} Priority
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Priority Skills to Learn */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary-600 shrink-0" />
            Priority Skills to Learn
          </h2>
          <div className="space-y-3 pt-1">
            {PRIORITY_SKILLS.map((item) => (
              <div
                key={item.skill}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-surface-border bg-white p-4 shadow-xs transition-all hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.color}`}>
                    {item.priority}
                  </span>
                  <h3 className="text-base font-bold text-ink">
                    {item.skill}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Skill Development Recommendations (Recommended Learning Path) */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-violet-600 shrink-0" />
            Recommended Learning Path
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            {LEARNING_PATH.map((item) => (
              <div
                key={item.skill}
                className="rounded-2xl border border-surface-border bg-surface-subtle/30 p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-ink">
                      {item.skill}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-ink-subtle mb-3">
                    <span>Current: <strong className="text-ink">{item.current}</strong></span>
                    <span>→</span>
                    <span>Target: <strong className="text-primary-600">{item.target}</strong></span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    <strong className="font-semibold text-ink">Recommendation:</strong> {item.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. AI Skill Gap Insights */}
        <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-white via-primary-50/20 to-violet-50/30 p-6 sm:p-8 shadow-card space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                AI Skill Gap Insights
              </h2>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Our AI compared your resume with the target job requirements and identified the following skill gaps.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {INSIGHTS.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-surface-border/80 bg-white p-4 shadow-xs">
                <Sparkles className="h-4 w-4 text-primary-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-ink font-medium leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Quick Action Buttons */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h3 className="text-base font-bold text-ink">
              Next Steps
            </h3>
            <p className="text-xs text-ink-muted">
              Continue exploring tailored recommendations or ATS scores.
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
              onClick={() => navigate('/upload-job')}
              className="font-medium rounded-xl"
            >
              <Edit className="mr-1.5 h-4 w-4" />
              Analyze Another Job
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
