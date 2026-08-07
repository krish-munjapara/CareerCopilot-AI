import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { SkillChipList } from '@/components/ui/SkillChip'
import { useResumeAnalysisData } from '@/hooks/useSessionData'
import { FileText, Mail, GraduationCap, Briefcase, FolderGit2, AlertCircle, ArrowRight } from 'lucide-react'
import { MotionStagger, MotionStaggerItem, MotionPage } from '@/components/ui/Motion'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

function SectionCard({
  icon: Icon,
  title,
  children,
  color = 'primary',
}: {
  icon: typeof FileText
  title: string
  children: React.ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'warning'
}) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
  }

  return (
    <Card variant="elevated">
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-xl p-2.5 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </Card>
  )
}

export default function ResumeAnalysis() {
  const { data: resumeData, loading } = useResumeAnalysisData()
  const navigate = useNavigate()

  if (loading) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 animate-spin text-primary-600" />
              <p className="mt-4 text-ink-muted">Loading resume analysis...</p>
            </div>
          </div>
        </MotionPage>
      </AppLayout>
    )
  }

  if (!resumeData) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-7xl">
          <PageHeader
            badge="Parsed"
            title="No Resume Data"
            description="Upload a resume to see the structured analysis"
          />
          <Card variant="elevated" className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-ink-subtle mb-4" />
            <p className="text-ink-muted mb-6">No resume data found. Upload your resume to see the analysis.</p>
            <Button onClick={() => navigate('/upload-resume')}>
              Upload Resume
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
          badge="Parsed"
          title="Resume Analysis"
          description="Structured breakdown extracted from your uploaded resume"
        />

        <MotionStagger className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <MotionStaggerItem>
              <SectionCard icon={FileText} title="Document Info" color="primary">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between rounded-lg bg-surface-subtle/50 px-4 py-2">
                    <dt className="text-ink-muted">Pages</dt>
                    <dd className="font-medium text-ink">{resumeData.pages}</dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-surface-subtle/50 px-4 py-2">
                    <dt className="text-ink-muted">Email</dt>
                    <dd className="font-medium text-ink">{resumeData.email || 'Not found'}</dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-surface-subtle/50 px-4 py-2">
                    <dt className="text-ink-muted">Phone</dt>
                    <dd className="font-medium text-ink">{resumeData.phone || 'Not found'}</dd>
                  </div>
                </dl>
              </SectionCard>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <SectionCard icon={Mail} title="Contact" color="secondary">
                <dl className="space-y-3 text-sm">
                  <div className="rounded-lg bg-surface-subtle/50 px-4 py-2">
                    <dt className="mb-1 text-ink-muted">Email</dt>
                    <dd className="font-medium text-ink">{resumeData.email || 'Not detected'}</dd>
                  </div>
                  <div className="rounded-lg bg-surface-subtle/50 px-4 py-2">
                    <dt className="mb-1 text-ink-muted">Phone</dt>
                    <dd className="font-medium text-ink">{resumeData.phone || 'Not detected'}</dd>
                  </div>
                </dl>
              </SectionCard>
            </MotionStaggerItem>
          </div>

          <MotionStaggerItem>
            <SectionCard icon={GraduationCap} title="Education" color="success">
              {resumeData.education.length > 0 ? (
                <ul className="space-y-2">
                  {resumeData.education.map((edu, i) => (
                    <li key={i} className="rounded-xl bg-surface-subtle/80 px-4 py-3 text-sm text-ink transition-colors hover:bg-surface-subtle">
                      {edu}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-subtle">No education section detected</p>
              )}
            </SectionCard>
          </MotionStaggerItem>

          <MotionStaggerItem>
            <SectionCard icon={Briefcase} title="Experience" color="warning">
              {resumeData.experience.length > 0 ? (
                <ul className="space-y-2">
                  {resumeData.experience.map((exp, i) => (
                    <li key={i} className="rounded-xl bg-surface-subtle/80 px-4 py-3 text-sm text-ink transition-colors hover:bg-surface-subtle">
                      {exp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-subtle">No experience section detected</p>
              )}
            </SectionCard>
          </MotionStaggerItem>

          <MotionStaggerItem>
            <SectionCard icon={FolderGit2} title="Projects" color="secondary">
              {resumeData.projects?.length > 0 ? (
                <ul className="space-y-2">
                  {resumeData.projects.map((proj, i) => (
                    <li key={i} className="rounded-xl bg-surface-subtle/80 px-4 py-3 text-sm text-ink transition-colors hover:bg-surface-subtle">
                      {proj}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-subtle">No projects section detected</p>
              )}
            </SectionCard>
          </MotionStaggerItem>

          <MotionStaggerItem>
            <SectionCard icon={FileText} title="Extracted Skills" color="primary">
              <SkillChipList skills={resumeData.skills} variant="neutral" emptyMessage="No skills detected" />
            </SectionCard>
          </MotionStaggerItem>
        </MotionStagger>
      </MotionPage>
    </AppLayout>
  )
}
