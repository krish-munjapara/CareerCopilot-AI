import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, CheckCircle2, Lightbulb, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/layout/AppLayout'
import Button from '@/components/ui/Button'
import { dashboardService, ResumeAnalysis } from '@/services/dashboard.service'
import { MotionPage } from '@/components/ui/Motion'
import { cn } from '@/lib/utils'

export default function UploadResume() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Track uploaded resume state
  const [uploadedResume, setUploadedResume] = useState<{
    name: string
    size?: string
    date?: string
    analysis?: ResumeAnalysis
  } | null>(null)

  // Check if a resume analysis was previously stored in session
  useEffect(() => {
    const stored = sessionStorage.getItem('resumeAnalysis')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUploadedResume({
          name: parsed.file_name || 'Uploaded_Resume.pdf',
          size: 'PDF / DOCX',
          date: 'Recently Uploaded',
          analysis: parsed,
        })
      } catch {
        // ignore parse error
      }
    }
  }, [])

  const validateAndUpload = useCallback(async (file: File) => {
    setError(null)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const acceptedExtensions = ['.pdf', '.docx', '.doc']
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()

    if (file.size > maxSize) {
      const err = `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB)`
      setError(err)
      toast.error(err)
      return
    }

    if (!acceptedExtensions.includes(ext)) {
      const err = 'Invalid file type. Please upload a PDF or DOCX file.'
      setError(err)
      toast.error(err)
      return
    }

    setUploading(true)
    try {
      const analysis = await dashboardService.analyzeResume(file)
      sessionStorage.setItem('resumeAnalysis', JSON.stringify({ ...analysis, file_name: file.name }))

      const fileSizeFormatted = `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      const uploadDateFormatted = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

      setUploadedResume({
        name: file.name,
        size: fileSizeFormatted,
        date: uploadDateFormatted,
        analysis,
      })

      toast.success('Resume uploaded successfully!')
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Failed to upload resume. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setUploading(false)
    }
  }, [])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0])
    }
  }

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-4xl space-y-8 pb-12">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Upload your Resume
          </h1>
          <p className="mt-2 text-base text-ink-muted sm:text-lg">
            Upload your latest resume to get started. We support PDF, DOCX files.
          </p>
        </div>

        {/* Main Upload Card */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn(
            'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white p-8 sm:p-12 text-center transition-all duration-200 shadow-sm',
            dragActive
              ? 'border-primary-500 bg-primary-50/40 scale-[1.01]'
              : 'border-surface-border hover:border-primary-300 hover:shadow-card',
            uploading && 'pointer-events-none opacity-80'
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,.docx,.doc"
            className="sr-only"
            id="resume-upload-input"
          />

          {/* Upload Icon Container */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-inner">
            {uploading ? (
              <RefreshCw className="h-8 w-8 animate-spin text-primary-600" />
            ) : (
              <Upload className="h-8 w-8" />
            )}
          </div>

          {/* Drag & drop text */}
          <h3 className="text-lg font-bold text-ink sm:text-xl">
            {uploading ? 'Analyzing your resume...' : 'Drag & drop your file here'}
          </h3>

          {!uploading && (
            <>
              <p className="my-2 text-sm font-medium text-ink-subtle">or</p>

              {/* Choose File Button */}
              <Button
                variant="primary"
                onClick={() => fileInputRef.current?.click()}
                className="font-semibold shadow-md shadow-glow px-6 py-2.5 rounded-xl"
              >
                Choose File
              </Button>

              {/* Supporting Text */}
              <p className="mt-4 text-xs font-medium text-ink-subtle">
                PDF, DOCX • Max 10MB
              </p>
            </>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs text-red-700 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Uploaded Resume Section */}
        <div>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Uploaded Resume
          </h2>

          {uploadedResume ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:shadow-card">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-ink">
                    {uploadedResume.name}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {uploadedResume.date ? `${uploadedResume.date} • ` : ''}
                    {uploadedResume.size || 'PDF/DOCX'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Uploaded
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/upload-job')}
                  className="font-medium"
                >
                  Continue to Job Description
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-surface-border bg-surface-subtle/30 p-6 text-center text-sm text-ink-subtle">
              No resume uploaded yet. Drag & drop or choose a file above to get started.
            </div>
          )}
        </div>

        {/* Tip / Information Box */}
        <div className="flex items-start gap-3.5 rounded-2xl border border-primary-100 bg-primary-50/50 p-4 sm:p-5 shadow-sm">
          <Lightbulb className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-ink-muted leading-relaxed">
            <strong className="font-semibold text-ink">Tip:</strong> Make sure your resume is updated and matches the job requirements.
          </p>
        </div>
      </MotionPage>
    </AppLayout>
  )
}
