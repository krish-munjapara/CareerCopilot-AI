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
              <p className="mt-4 text-ink-muted">Loading analysis results...</p>
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

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-7xl">
        <PageHeader
          badge="Results"
          title="ATS Analysis Results"
          description="Your resume compatibility score with the job description"
        />

        <StatGrid className="mb-8">
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

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink flex items-center gap-2">
              <Target className="h-5 w-5 text-success-600" />
              Matched Skills
            </h3>
            <SkillChipList skills={atsData.matched_skills} variant="matched" emptyMessage="No matched skills" />
          </Card>
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning-600" />
              Missing Skills
            </h3>
            <SkillChipList skills={atsData.missing_skills} variant="missing" emptyMessage="No missing skills" />
          </Card>
        </div>

        <Card variant="elevated">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
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
      </MotionPage>
    </AppLayout>
  )
}
