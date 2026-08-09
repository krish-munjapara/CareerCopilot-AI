import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, ArrowRight, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/layout/AppLayout'
import Button from '@/components/ui/Button'
import { dashboardService } from '@/services/dashboard.service'
import { MotionPage } from '@/components/ui/Motion'

export default function UploadJob() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!description.trim()) {
      toast.error('Please enter a job description')
      return
    }

    setUploading(true)
    try {
      await dashboardService.uploadJob(title || 'Target Role', '', description)
      toast.success('Job description saved!')
      navigate('/analysis')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Failed to save job description')
    } finally {
      setUploading(false)
    }
  }

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-4xl space-y-8 pb-12">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Add Job Description
          </h1>
          <p className="mt-2 text-base text-ink-muted sm:text-lg">
            Enter the job description you're applying for.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Job Title Field (Optional) */}
            <div>
              <label htmlFor="job-title" className="mb-2 block text-sm font-semibold text-ink">
                Job Title <span className="font-normal text-ink-subtle">(Optional)</span>
              </label>
              <input
                id="job-title"
                type="text"
                placeholder="e.g. Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-ink shadow-sm transition-all placeholder:text-ink-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            {/* Job Description Textarea */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="job-description" className="block text-sm font-semibold text-ink">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-ink-subtle">
                  {description.length}/5000
                </span>
              </div>
              <textarea
                id="job-description"
                rows={9}
                maxLength={5000}
                placeholder="Paste the job description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full resize-y rounded-xl border border-surface-border bg-white p-4 text-ink shadow-sm transition-all placeholder:text-ink-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 leading-relaxed text-sm sm:text-base"
              />
            </div>

            {/* Save & Continue Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={uploading}
                disabled={uploading || !description.trim()}
                className="w-full sm:w-auto font-semibold shadow-md shadow-glow px-8 py-3 rounded-xl text-base"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save & Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Tip / Information Box */}
        <div className="flex items-start gap-3.5 rounded-2xl border border-primary-100 bg-primary-50/50 p-4 sm:p-5 shadow-sm">
          <Lightbulb className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-ink-muted leading-relaxed">
            <strong className="font-semibold text-ink">Tip:</strong> A detailed job description helps us provide more accurate analysis and recommendations.
          </p>
        </div>
      </MotionPage>
    </AppLayout>
  )
}
