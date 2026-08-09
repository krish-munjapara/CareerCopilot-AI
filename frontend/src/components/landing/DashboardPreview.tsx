import Card from '@/components/ui/Card'
import { BarChart3, Target, TrendingUp, Zap } from 'lucide-react'

export default function DashboardPreview() {
  return (
    <Card variant="elevated" className="overflow-hidden border-surface-border bg-surface-subtle">
      <div className="border-b border-surface-border bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-ink">Career Intelligence Dashboard</h3>
          <span className="text-xs text-ink-subtle">Preview</span>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Match Score */}
        <div className="rounded-xl bg-white p-4 border border-surface-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-ink">Resume Match Score</span>
            </div>
            <span className="text-2xl font-bold text-primary-600">87%</span>
          </div>
          <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
            <div className="h-full w-[87%] bg-gradient-primary rounded-full" />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-4 border border-surface-border">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-ink">Matched Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'React', 'Machine Learning', 'SQL'].map((skill) => (
                <span key={skill} className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 border border-surface-border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-ink">Missing Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Docker', 'AWS', 'GraphQL'].map((skill) => (
                <span key={skill} className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Gap */}
        <div className="rounded-xl bg-white p-4 border border-surface-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-ink">Skill Coverage</span>
            <span className="text-sm font-semibold text-ink">72%</span>
          </div>
          <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-primary rounded-full" />
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl bg-white p-4 border border-surface-border">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-ink">AI Recommendations</span>
          </div>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Add Docker and AWS to your skills section
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Highlight your ML project experience
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Include metrics for your React projects
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
