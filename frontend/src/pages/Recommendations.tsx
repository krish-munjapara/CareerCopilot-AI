import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import RecommendationCard from '@/components/ui/RecommendationCard'
import Card from '@/components/ui/Card'
import { useAnalysisData } from '@/hooks/useSessionData'
import { Sparkles, ArrowRight, AlertCircle } from 'lucide-react'
import { MotionStagger, MotionStaggerItem, MotionPage } from '@/components/ui/Motion'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

const prioritySections = [
  { key: 'HIGH', label: 'High Priority' },
  { key: 'MEDIUM', label: 'Medium Priority' },
  { key: 'LOW', label: 'Low Priority' },
] as const

export default function Recommendations() {
  const { data, loading } = useAnalysisData()
  const navigate = useNavigate()

  if (loading) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Sparkles className="mx-auto h-12 w-12 animate-spin text-primary-600" />
              <p className="mt-4 text-ink-muted">Loading recommendations...</p>
            </div>
          </div>
        </MotionPage>
      </AppLayout>
    )
  }

  if (!data) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <PageHeader
            badge="AI Insights"
            title="No Analysis Data"
            description="Upload a resume and job description to generate personalized recommendations"
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
          badge="AI Insights"
          title="Recommendations"
          description="Personalized suggestions to improve your resume and career prospects"
        />

        {data.recommendations.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No recommendations yet"
            description="Upload a resume and job description to generate personalized recommendations."
            action={{ label: 'Upload Resume', to: '/upload-resume' }}
          />
        ) : (
          <div className="space-y-8">
            {prioritySections.map(({ key, label }) => {
              const items = data.recommendations.filter((r) => r.priority === key)
              if (items.length === 0) return null
              return (
                <section key={key} aria-labelledby={`rec-${key}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <h2 id={`rec-${key}`} className="text-xl font-semibold text-ink">
                      {label}
                    </h2>
                    <span className="rounded-full bg-surface-subtle px-3 py-1 text-sm font-medium text-ink-muted">
                      {items.length}
                    </span>
                  </div>
                  <MotionStagger className="space-y-4">
                    {items.map((rec, index) => (
                      <MotionStaggerItem key={`${key}-${index}`}>
                        <RecommendationCard
                          title={rec.skill || rec.category || 'Recommendation'}
                          description={rec.reason}
                          type={(rec.category as 'skill' | 'general') || 'general'}
                          priority={rec.priority.toLowerCase() as 'high' | 'medium' | 'low'}
                        />
                      </MotionStaggerItem>
                    ))}
                  </MotionStagger>
                </section>
              )
            })}
          </div>
        )}
      </MotionPage>
    </AppLayout>
  )
}
