import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import TipCard from '@/components/ui/TipCard'
import { dashboardService } from '@/services/dashboard.service'
import { MotionPage } from '@/components/ui/Motion'

export default function UploadJob() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description) {
      toast.error('Please fill in all required fields')
      return
    }

    if (description.length < 100) {
      toast.error('Description must be at least 100 characters')
      return
    }

    const resumeAnalysis = sessionStorage.getItem('resumeAnalysis')
    if (!resumeAnalysis) {
      toast.error('Please upload a resume first')
      navigate('/upload-resume')
      return
    }

    setUploading(true)
    try {
      const resumeData = JSON.parse(resumeAnalysis)

      const result = await dashboardService.analyze(resumeData.full_text, description, resumeData)

      toast.success('Analysis completed!')
      sessionStorage.setItem('analysisData', JSON.stringify(result))
      sessionStorage.setItem('jobTitle', title)
      sessionStorage.setItem('jobCompany', company)

      navigate('/ats-results')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Analysis failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-3xl">
        <PageHeader
          badge="Step 2"
          title="Upload Job Description"
          description="Paste the full job description to run ATS scoring and skill gap analysis against your resume."
        />

        <Card variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <Input
              id="title"
              label="Job Title"
              type="text"
              placeholder="Senior Software Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              id="company"
              label="Company"
              type="text"
              placeholder="Acme Corp (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <TextArea
              id="description"
              label="Job Description"
              rows={12}
              placeholder="Paste the complete job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              hint={`${description.length} characters · 100 minimum`}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" loading={uploading} className="flex-1" size="lg">
                {uploading ? 'Analyzing...' : 'Run Analysis'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle('')
                  setCompany('')
                  setDescription('')
                }}
                disabled={uploading}
                size="lg"
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-6">
          <TipCard
            title="Tips for best results"
            icon={Lightbulb}
            variant="success"
            tips={[
              'Paste the complete job description including requirements',
              'Include skills, experience, and education requirements',
              'Longer descriptions produce more accurate analysis',
              'Remove personal information from the description',
            ]}
          />
        </div>
      </MotionPage>
    </AppLayout>
  )
}
