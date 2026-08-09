import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import StatCard, { StatGrid } from '@/components/ui/StatCard'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { SkillChipList } from '@/components/ui/SkillChip'
import { useAnalysisData } from '@/hooks/useSessionData'
import { BarChart3, Target, TrendingUp, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react'
import { MotionStagger, MotionStaggerItem, MotionPage } from '@/components/ui/Motion'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function ATSResults() {
  const { data: atsData, loading } = useAnalysisData()
  const navigate = useNavigate()

  if (loading) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 animate-spin text-primary-600" />
              <p className="mt-4 text-ink-muted">Analyzing your resume against the job...</p>
            </div>
          </div>
        </MotionPage>
      </AppLayout>
    )
  }

  if (!atsData) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <PageHeader
            badge="Results"
            title="No Analysis Data"
            description="Upload a resume and job description to see your ATS analysis results"
          />
          <Card variant="elevated" className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-ink-subtle mb-4" />
            <p className="text-ink-muted mb-6">No analysis data found. Start by uploading your resume and a job description.</p>
            <Button onClick={() => navigate('/upload-resume')}>
              Start Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        </MotionPage>
      </AppLayout>
    )
  }

  // Determine match quality
  const getMatchQuality = () => {
    if (atsData.ats_score >= 80) {
      return { label: 'Good Match', color: 'text-emerald-600', bgColor: 'bg-emerald-100' }
    } else if (atsData.ats_score >= 60) {
      return { label: 'Fair Match', color: 'text-amber-600', bgColor: '.bg-amber-100' }
    } else {
      return { label: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' }
    }
  }

  const matchQuality = getMatchQuality()

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-7xl">
        <PageHeader
          badge="Results"
          title="ATS Analysis Results"
          description="Your resume compatibility score with the job description"
        />

        <StatGrid className="mb-6">
          <StatCard
            title="ATS Score"
            value={atsData.ats_score}
            icon={BarChart3}
            color="primary"
            unit="percent"
          />
          <StatCard
            title="Semantic Match"
            value={atsData.semantic_score}
            icon={Target}
            color="secondary"
            unit="percent"
          />
          <StatCard
            title="Skill Coverage"
            value={atsData.skill_coverage}
            icon={TrendingUp}
            color="success"
            unit="percent"
          />
          <StatCard
            title="Missing Skills"
            value={atsData.missing_skills.length}
            icon={AlertCircle}
            color="warning"
            unit="count"
          />
        </StatGrid>

        {/* Score interpretation card */}
        <Card variant="elevated" className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Match Score</span>
                <span className="text-sm font-bold text-ink">{atsData.ats_score}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-surface-subtle">
                <div
                  className={`h-3 rounded-full transition-all ${
                    atsData.ats_score >= 80 ? 'bg-emerald-500' : atsData.ats_score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${atsData.ats_score}%` }}
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${matchQuality.bgColor} ${matchQuality.color}`}>
                  {matchQuality.label}
                </span>
                <p className="text-sm text-ink-muted">
                  {atsData.ats_score >= 80
                    ? 'Your resume matches this role well!'
                    : atsData.ats_score >= 60
                    ? 'Your resume has a good match with some room for improvement.'
                    : 'Your resume needs improvement to better match this role.'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <h3 className="mb-3 text-base font-semibold text-ink flex items-center gap-2">
              <Target className="h-5 w-5 text-success-600" />
              Matched Skills
              <span className="ml-auto text-sm font-normal text-ink-muted">{atsData.matched_skills.length} found</span>
            </h3>
            <SkillChipList skills={atsData.matched_skills} variant="matched" emptyMessage="No matched skills" />
          </Card>
          <Card variant="elevated">
            <h3 className="mb-3 text-base font-semibold text-ink flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning-600" />
              Missing Skills
              <span className="ml-auto text-sm font-normal text-ink-muted">{atsData.missing_skills.length} missing</span>
            </h3>
            <SkillChipList skills={atsData.missing_skills} variant="missing" emptyMessage="No missing skills" />
          </Card>
        </div>

        <Card variant="elevated">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              Top Recommendations
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/recommendations')}>
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <MotionStagger className="space-y-4">
            {atsData.recommendations.slice(0, 5).map((rec, index) => (
              <MotionStaggerItem key={`${rec.reason}-${index}`}>
                <div className="flex gap-4 rounded-xl border border-surface-border bg-surface-subtle/40 p-4 transition-all hover:bg-surface-subtle hover:shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-bold shadow-sm">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      {rec.skill && <span className="font-medium text-ink">{rec.skill}</span>}
                      <Badge
                        variant={
                          rec.priority === 'HIGH' ? 'danger' : rec.priority === 'MEDIUM' ? 'warning' : 'success'
                        }
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">{rec.reason}</p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Card>

        {/* CTA card */}
        <Card variant="elevated" className="mt-6 bg-gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Want to improve your score?</h3>
              <p className="mt-1 text-sm text-primary-100">View detailed recommendations to close your skill gaps.</p>
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
      </MotionPage>
    </AppLayout>
  )
}
