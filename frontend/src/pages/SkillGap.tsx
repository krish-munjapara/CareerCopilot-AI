import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import { SkillChipList } from '@/components/ui/SkillChip'
import { useAnalysisData } from '@/hooks/useSessionData'
import { Target, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react'
import { MotionPage } from '@/components/ui/Motion'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function SkillGap() {
  const { data: gapData, loading } = useAnalysisData()
  const navigate = useNavigate()

  if (loading) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Target className="mx-auto h-12 w-12 animate-spin text-primary-600" />
              <p className="mt-4 text-ink-muted">Loading skill gap analysis...</p>
            </div>
          </div>
        </MotionPage>
      </AppLayout>
    )
  }

  if (!gapData) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <PageHeader
            badge="Skills"
            title="No Analysis Data"
            description="Upload a resume and job description to see your skill gap analysis"
          />
          <Card variant="elevated" className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-ink-subtle mb-4" />
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
          badge="Skills"
          title="Skill Gap Analysis"
          description="Identify missing skills and understand your coverage against job requirements"
        />

        <Card variant="elevated" className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary-50 p-2.5 text-primary-600">
              <Target className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Skill Coverage</h3>
          </div>
          <ProgressBar
            label="Skills matched"
            value={gapData.matched_skills.length}
            max={gapData.job_skills.length || 1}
            showValue
            color="primary"
            className="mb-6"
          />
          <ProgressBar
            label="Coverage percentage"
            value={gapData.skill_coverage}
            max={100}
            showValue
            color="success"
          />
        </Card>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-success-50 p-2.5 text-success-600">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-ink">Matched Skills</h3>
            </div>
            <SkillChipList skills={gapData.matched_skills} variant="matched" />
          </Card>
          <Card variant="elevated">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-warning-50 p-2.5 text-warning-600">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-ink">Missing Skills</h3>
            </div>
            <SkillChipList skills={gapData.missing_skills} variant="missing" />
          </Card>
        </div>

        <Card variant="elevated">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-secondary-50 p-2.5 text-secondary-600">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Extra Skills</h3>
          </div>
          <p className="mb-4 text-sm text-ink-muted">Skills on your resume not required by this job:</p>
          <SkillChipList skills={gapData.extra_skills} variant="extra" emptyMessage="No extra skills" />
        </Card>
      </MotionPage>
    </AppLayout>
  )
}
