import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import AppLayout from '@/components/layout/AppLayout'
import Card from '@/components/ui/Card'
import { MotionPage } from '@/components/ui/Motion'
import { useDashboardStats } from '@/hooks/useSessionData'
import {
  ArrowRight,
  FileText,
  BarChart3,
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Upload,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface DashboardNoAnalysisProps {
  firstName: string
  onUploadResume: () => void
  onAddJob: () => void
  onAnalyze: () => void
  analyzing: boolean
}

function DashboardNoAnalysis({
  firstName,
  onUploadResume,
  onAddJob,
  onAnalyze,
  analyzing,
}: DashboardNoAnalysisProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="mt-2 text-base text-ink-muted sm:text-lg">
          Let&apos;s get you ready for your dream job.
        </p>
      </div>

      {/* Get started in 3 simple steps */}
      <div>
        <h2 className="mb-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Get started in 3 simple steps
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-6 shadow-sm transition-all hover:shadow-card">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 font-bold text-primary-700 text-base">
                1
              </div>
              <h3 className="mb-1 text-base font-semibold text-ink">Upload your Resume</h3>
              <p className="mb-6 text-sm leading-relaxed text-ink-muted">
                Upload your resume to get started.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onUploadResume} className="w-full font-medium">
              Upload Resume
            </Button>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-6 shadow-sm transition-all hover:shadow-card">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-700 text-base">
                2
              </div>
              <h3 className="mb-1 text-base font-semibold text-ink">Add a Job Description</h3>
              <p className="mb-6 text-sm leading-relaxed text-ink-muted">
                Add a job description you&apos;re targeting.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onAddJob} className="w-full font-medium">
              Add Job Description
            </Button>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-6 shadow-sm transition-all hover:shadow-card">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700 text-base">
                3
              </div>
              <h3 className="mb-1 text-base font-semibold text-ink">Analyze Your Match</h3>
              <p className="mb-6 text-sm leading-relaxed text-ink-muted">
                Analyze your resume against the job requirements.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onAnalyze}
              loading={analyzing}
              disabled={analyzing}
              className="w-full font-medium"
            >
              Analyze Your Match
            </Button>
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Left Action Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-6 shadow-sm transition-all hover:shadow-card">
          <div className="mb-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-ink">Upload your Resume</h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              Upload your latest resume to get started.
            </p>
          </div>
          <Button variant="primary" onClick={onUploadResume} className="w-full font-semibold">
            Upload Resume
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Right Action Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-6 shadow-sm transition-all hover:shadow-card">
          <div className="mb-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-ink">Add a Job Description</h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              Paste the job description you&apos;re targeting.
            </p>
          </div>
          <Button variant="primary" onClick={onAddJob} className="w-full font-semibold">
            Add Job Description
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* What You'll Get Section */}
      <div>
        <h2 className="mb-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">
          What you&apos;ll get
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-ink">ATS Score</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              Get your optimized resume score.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-ink">Skill Matching</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              See how your skills match with the job.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-ink">Missing Skills</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              Identify skills you need to add.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-ink">Recommendations</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              Get AI-powered suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { hasAnalysis, jobTitle, analysisDate, stats, loading, error, recentAnalyses } = useDashboardStats()
  const [analyzing, setAnalyzing] = useState(false)

  const firstName = user?.full_name?.split(' ')[0] ?? 'there'
  const matchedSkills = stats.matchedSkillsList.slice(0, 8)
  const remainingMatchedSkills = Math.max(0, stats.matchedSkillsList.length - 8)

  const handleAnalyze = async () => {
    setAnalyzing(true)
    try {
      // Navigate to the existing upload job page to complete the analysis flow
      navigate('/upload-job')
    } catch (error) {
      console.error('Navigation failed:', error)
      toast.error('Failed to navigate. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  // Get ATS score status
  const getATSScoreStatus = () => {
    const score = stats.atsScore
    if (score >= 90) return { label: 'Excellent Match', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
    if (score >= 75) return { label: 'Strong Match', color: 'bg-blue-100 text-blue-700 border-blue-200' }
    if (score >= 60) return { label: 'Good Match', color: 'bg-primary-100 text-primary-700 border-primary-200' }
    if (score >= 40) return { label: 'Moderate Match', color: 'bg-amber-100 text-amber-700 border-amber-200' }
    return { label: 'Needs Improvement', color: 'bg-red-100 text-red-700 border-red-200' }
  }

  const atsStatus = getATSScoreStatus()

  // Get top missing skills (max 6)
  const topMissingSkills = stats.missingSkillsList.slice(0, 6)
  const remainingSkills = Math.max(0, stats.missingSkills - 6)

  // Get score history for trend chart (max 5)
  const scoreHistory = recentAnalyses.slice(0, 5).map(a => a.ats_score || 0).reverse()
  const hasScoreHistory = scoreHistory.length > 1

  // Helper function to extract job title from job description
  const extractJobTitle = (jobDescription: string): string | null => {
    if (!jobDescription) return null

    const lines = jobDescription.split('\n').filter(line => line.trim())
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      const title = firstLine
        .replace(/^(job title|position|role|title):\s*/i, '')
        .replace(/^(we are looking for|we're hiring|seeking):\s*/i, '')
        .trim()

      if (title.length > 0 && title.length < 100) {
        return title
      }
    }

    return null
  }


  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-6xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
            <p className="mt-4 text-sm text-ink-muted">Loading dashboard...</p>
          </div>
        ) : error ? (
          <Card variant="elevated" className="border-red-200 bg-red-50">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-4 text-base font-semibold text-ink">Could not load dashboard</h3>
              <p className="mt-2 text-sm text-ink-muted">Please try again later.</p>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </Card>
        ) : !hasAnalysis ? (
          <DashboardNoAnalysis
            firstName={firstName}
            onUploadResume={() => navigate('/upload-resume')}
            onAddJob={() => navigate('/upload-job')}
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
          />
        ) : (
          <>
            {/* STATE D - EXISTING USER / ANALYSIS COMPLETE */}
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-ink">Dashboard</h1>
              <p className="text-lg text-ink-muted">
                Track your resume performance and improve your chances of getting hired.
              </p>
            </div>

            {/* Welcome Section */}
            <Card variant="elevated" className="mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-ink">
                  Welcome back, {firstName}! 👋
                </h2>
                <p className="mt-2 text-base text-ink-muted">
                  Here's how your latest resume is performing.
                </p>
              </div>
            </Card>

            {/* Latest Analysis Summary */}
            <Card variant="elevated" className="mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ink">Latest Analysis</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Analyzed on {analysisDate || new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-white">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="mb-1 text-3xl font-bold text-ink">{Math.round(stats.atsScore)}%</div>
                    <div className="text-sm text-ink-muted">ATS Score</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ink">{jobTitle || 'Target Job'}</div>
                  <div className="text-xs text-ink-muted">{stats.matchedSkillsList.length} matched skills</div>
                </div>
              </div>
            </Card>

            {/* ATS Score Visualization */}
            <Card variant="elevated" className="mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ink">ATS Score</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Your resume's compatibility with the job requirements
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="mb-4 h-4 w-full rounded-full bg-surface-subtle">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        stats.atsScore >= 80 ? 'bg-emerald-500' : stats.atsScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${stats.atsScore}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-muted">0%</span>
                    <span className="font-semibold text-ink">{Math.round(stats.atsScore)}%</span>
                    <span className="text-ink-muted">100%</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <Badge className={atsStatus.color}>{atsStatus.label}</Badge>
                </div>
              </div>
            </Card>

            {/* Key Metrics */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card variant="elevated">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="mb-1 text-2xl font-bold text-ink">{Math.round(stats.atsScore)}%</div>
                <div className="text-sm text-ink-muted">ATS Score</div>
              </Card>
              <Card variant="elevated">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="mb-1 text-2xl font-bold text-ink">{stats.matchedSkillsList.length}</div>
                <div className="text-sm text-ink-muted">Matched Skills</div>
              </Card>
              <Card variant="elevated">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50 text-warning-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="mb-1 text-2xl font-bold text-ink">{stats.missingSkills}</div>
                <div className="text-sm text-ink-muted">Missing Skills</div>
              </Card>
              <Card variant="elevated">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="mb-1 text-2xl font-bold text-ink">{stats.recommendationsCount}</div>
                <div className="text-sm text-ink-muted">Recommendations</div>
              </Card>
            </div>

            {/* Skills Section */}
            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              {/* Matched Skills */}
              <Card variant="elevated">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Matched Skills</h3>
                  <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {stats.matchedSkillsList.length} skills
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.length > 0 ? (
                    <>
                      {matchedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 border border-emerald-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {remainingMatchedSkills > 0 && (
                        <span className="rounded-full bg-surface-subtle px-3 py-1.5 text-sm text-ink-muted">
                          +{remainingMatchedSkills} more
                        </span>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-ink-muted">No matched skills found.</p>
                  )}
                </div>
              </Card>

              {/* Missing Skills */}
              <Card variant="elevated">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Missing Skills</h3>
                  <Badge variant="warning" className="bg-amber-50 text-amber-700 border-amber-200">
                    {stats.missingSkills} skills
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topMissingSkills.length > 0 ? (
                    <>
                      {topMissingSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-700 border border-amber-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {remainingSkills > 0 && (
                        <span className="rounded-full bg-surface-subtle px-3 py-1.5 text-sm text-ink-muted">
                          +{remainingSkills} more
                        </span>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-ink-muted">No major skill gaps detected.</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Score Trend */}
            <Card variant="elevated" className="mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ink">Score Trend</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Track your ATS score over multiple analyses
                </p>
              </div>
              {hasScoreHistory ? (
                <div className="flex h-32 items-end justify-center gap-3">
                  {scoreHistory.map((score, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-primary-500 rounded-t transition-all"
                        style={{ height: `${score}%` }}
                      />
                      <span className="text-xs text-ink-muted">Analysis {index + 1}</span>
                    </div>
                  ))}
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-primary rounded-t transition-all"
                      style={{ height: `${stats.atsScore}%` }}
                    />
                    <span className="text-xs text-ink-muted">Latest</span>
                  </div>
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center">
                  <p className="text-sm text-ink-muted">
                    Your first analysis is complete. Run another analysis to track your score trend.
                  </p>
                </div>
              )}
            </Card>

            {/* Recent Analyses */}
            <Card variant="elevated" className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-ink">Recent Analyses</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => navigate('/analysis-history')}
                >
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-3">
                {recentAnalyses.slice(0, 5).map((analysis, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-surface-subtle/50 px-4 py-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink">
                          {extractJobTitle(analysis.job_description) || 'Analysis'}
                        </div>
                        <div className="text-xs text-ink-muted">
                          {analysis.created_at ? new Date(analysis.created_at).toLocaleDateString() : 'No date'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-ink">{Math.round(analysis.ats_score || 0)}%</div>
                        <div className="text-xs text-ink-muted">ATS Score</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => navigate('/ats-results')}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {recentAnalyses.length === 0 && (
                  <p className="text-sm text-ink-muted text-center py-4">No recent analyses found.</p>
                )}
              </div>
            </Card>

            {/* Analyze New Resume CTA */}
            <Card variant="elevated">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-ink">Analyze New Resume</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Upload a new resume or job description to get a fresh analysis
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigate('/upload-resume')}
                  size="lg"
                >
                  Start New Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </>
        )}
      </MotionPage>
    </AppLayout>
  )
}
