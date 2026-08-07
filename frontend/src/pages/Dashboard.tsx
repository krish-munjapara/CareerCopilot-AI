import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import StatCard, { StatGrid } from '@/components/ui/StatCard'
import EmptyState from '@/components/ui/EmptyState'
import Card from '@/components/ui/Card'
import QuickActionCard from '@/components/ui/QuickActionCard'
import { MotionStagger, MotionStaggerItem, MotionPage } from '@/components/ui/Motion'
import { useDashboardStats } from '@/hooks/useSessionData'
import {
  BarChart3,
  Target,
  TrendingUp,
  AlertCircle,
  FileText,
  Briefcase,
  Sparkles,
  Upload,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { hasAnalysis, hasResume, jobTitle, stats } = useDashboardStats()

  const firstName = user?.full_name?.split(' ')[0] ?? 'there'

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-7xl">
        <PageHeader
          badge="Dashboard"
          title={`Welcome back, ${firstName}`}
          description={
            hasAnalysis && jobTitle
              ? `Latest analysis for ${jobTitle}`
              : 'Upload a resume and job description to unlock your career intelligence.'
          }
          actions={
            hasAnalysis ? (
              <Badge variant="success">Analysis ready</Badge>
            ) : (
              <Badge variant="warning">Setup required</Badge>
            )
          }
        />

        {!hasAnalysis ? (
          <EmptyState
            icon={Upload}
            title="No analysis yet"
            description="Complete the two-step flow: upload your resume PDF, then paste a job description. Your ATS scores and recommendations will appear here."
            action={{ label: 'Upload Resume', to: '/upload-resume' }}
            secondaryAction={{ label: 'Upload Job', to: '/upload-job' }}
          />
        ) : (
          <StatGrid className="mb-8">
            <StatCard title="ATS Score" value={stats.atsScore} icon={BarChart3} color="primary" unit="percent" />
            <StatCard
              title="Semantic Match"
              value={stats.semanticScore}
              icon={Target}
              color="secondary"
              unit="percent"
            />
            <StatCard
              title="Skill Coverage"
              value={stats.skillCoverage}
              icon={TrendingUp}
              color="success"
              unit="percent"
            />
            <StatCard
              title="Missing Skills"
              value={stats.missingSkills}
              icon={AlertCircle}
              color="warning"
              unit="count"
            />
          </StatGrid>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink">Your progress</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 rounded-xl bg-surface-subtle/80 p-3 transition-colors hover:bg-surface-subtle">
                <CheckCircle2
                  className={`h-5 w-5 shrink-0 ${hasResume ? 'text-emerald-500' : 'text-ink-subtle'}`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="font-medium text-ink">Resume uploaded</p>
                  <p className="text-sm text-ink-muted">
                    {hasResume ? 'Parsed and ready for matching' : 'Not started'}
                  </p>
                </div>
                {!hasResume && (
                  <Button size="sm" variant="ghost" onClick={() => navigate('/upload-resume')}>
                    Upload
                  </Button>
                )}
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-surface-subtle/80 p-3 transition-colors hover:bg-surface-subtle">
                <CheckCircle2
                  className={`h-5 w-5 shrink-0 ${hasAnalysis ? 'text-emerald-500' : 'text-ink-subtle'}`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="font-medium text-ink">Job analysis</p>
                  <p className="text-sm text-ink-muted">
                    {hasAnalysis ? (jobTitle ? `Completed for ${jobTitle}` : 'Completed') : 'Pending job description'}
                  </p>
                </div>
                {!hasAnalysis && hasResume && (
                  <Button size="sm" variant="ghost" onClick={() => navigate('/upload-job')}>
                    Analyze
                  </Button>
                )}
              </li>
            </ul>
          </Card>

          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink">Quick actions</h3>
            <MotionStagger className="space-y-3">
              <MotionStaggerItem>
                <QuickActionCard
                  title="Upload New Resume"
                  description="Parse and extract skills from your latest PDF"
                  icon={FileText}
                  onClick={() => navigate('/upload-resume')}
                />
              </MotionStaggerItem>
              <MotionStaggerItem>
                <QuickActionCard
                  title="Analyze Job Description"
                  description="Match your resume against a new role"
                  icon={Briefcase}
                  color="secondary"
                  onClick={() => navigate('/upload-job')}
                />
              </MotionStaggerItem>
              {hasAnalysis && (
                <MotionStaggerItem>
                  <QuickActionCard
                    title="View Recommendations"
                    description="Prioritized steps to improve your fit"
                    icon={Sparkles}
                    color="accent"
                    onClick={() => navigate('/recommendations')}
                  />
                </MotionStaggerItem>
              )}
            </MotionStagger>
          </Card>
        </div>

        {hasAnalysis && (
          <Card variant="elevated" className="mt-6 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Ready to improve your score?</h3>
                <p className="mt-1 text-primary-100">View detailed recommendations to close your skill gaps.</p>
              </div>
              <Button
                variant="outline"
                className="border-white/30 bg-white text-primary-700 hover:bg-primary-50"
                onClick={() => navigate('/recommendations')}
              >
                View Recommendations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </MotionPage>
    </AppLayout>
  )
}
