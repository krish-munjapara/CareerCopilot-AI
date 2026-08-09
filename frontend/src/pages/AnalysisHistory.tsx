import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { MotionPage } from '@/components/ui/Motion'
import { BarChart3, Calendar, ArrowRight, AlertCircle } from 'lucide-react'
import { dashboardService } from '@/services/dashboard.service'

interface Analysis {
  _id: string
  ats_score: number
  semantic_score: number
  skill_coverage: number
  job_description: string
  created_at: string
  missing_skills?: string[]
  recommendations?: any[]
}

export default function AnalysisHistory() {
  const navigate = useNavigate()
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await dashboardService.getAnalysisHistory()
        setAnalyses(response.analyses || [])
      } catch (err) {
        console.error('Failed to fetch analysis history:', err)
        setError('Failed to load analysis history')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const extractJobTitle = (jobDescription: string): string => {
    if (!jobDescription) return 'Unknown Job'
    const lines = jobDescription.split('\n').filter(line => line.trim())
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      if (firstLine.length > 0 && firstLine.length < 100) {
        return firstLine
      }
    }
    return 'Unknown Job'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Strong Match'
    if (score >= 60) return 'Good Match'
    if (score >= 40) return 'Moderate Match'
    return 'Needs Improvement'
  }

  if (loading) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 animate-spin text-primary-600" />
              <p className="mt-4 text-ink-muted">Loading analysis history...</p>
            </div>
          </div>
        </MotionPage>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-4xl">
          <PageHeader
            badge="History"
            title="Analysis History"
            description="View your past resume analyses"
          />
          <Card variant="elevated" className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-ink-subtle mb-4" />
            <p className="text-ink-muted mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </Card>
        </MotionPage>
      </AppLayout>
    )
  }

  if (analyses.length === 0) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-4xl">
          <PageHeader
            badge="History"
            title="Analysis History"
            description="View your past resume analyses"
          />
          <Card variant="elevated" className="text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-ink-subtle mb-4" />
            <h3 className="mb-2 text-lg font-semibold text-ink">No previous analyses yet</h3>
            <p className="text-ink-muted mb-6">
              Analyze your first job match to see your history here.
            </p>
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
      <MotionPage className="mx-auto max-w-4xl">
        <PageHeader
          badge="History"
          title="Analysis History"
          description={`You have ${analyses.length} ${analyses.length === 1 ? 'analysis' : 'analyses'}`}
        />

        <div className="space-y-4">
          {analyses.map((analysis) => (
            <Card key={analysis._id} variant="elevated" className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-white">
                    <BarChart3 className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-ink mb-1 truncate">
                      {extractJobTitle(analysis.job_description)}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-ink-muted">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(analysis.created_at)}
                      </div>
                      <span>•</span>
                      <span>{analysis.missing_skills?.length || 0} missing skills</span>
                      <span>•</span>
                      <span>{analysis.recommendations?.length || 0} recommendations</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-2xl font-bold tabular-nums text-ink">
                      {Math.round(analysis.ats_score)}%
                    </div>
                    <Badge className={getScoreColor(analysis.ats_score)} variant="default">
                      {getScoreLabel(analysis.ats_score)}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                  >
                    View
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </MotionPage>
    </AppLayout>
  )
}
