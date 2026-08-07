import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import UploadArea from '@/components/ui/UploadArea'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import TipCard from '@/components/ui/TipCard'
import { dashboardService } from '@/services/dashboard.service'
import { MotionPage } from '@/components/ui/Motion'

export default function UploadResume() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setUploading(true)
    try {
      const result = await dashboardService.analyzeResume(file)
      toast.success('Resume analyzed successfully!')
      sessionStorage.setItem('resumeAnalysis', JSON.stringify(result))
      navigate('/resume-analysis')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-3xl">
        <PageHeader
          badge="Step 1"
          title="Upload Resume"
          description="Upload your resume PDF to extract skills, experience, and structure for AI matching."
        />

        <Card variant="elevated" className="mb-6">
          <UploadArea
            onFileSelect={setFile}
            accept=".pdf"
            maxSize={5 * 1024 * 1024}
            label="Drop your resume PDF here or click to upload"
            selectedFile={file}
            variant="card"
          />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleUpload} variant="primary" loading={uploading} disabled={!file} className="flex-1" size="lg">
              {uploading ? 'Analyzing...' : 'Analyze Resume'}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setFile(null)} disabled={uploading || !file} size="lg">
              Clear
            </Button>
          </div>
        </Card>

        <TipCard
          title="Tips for better results"
          icon={Lightbulb}
          variant="primary"
          tips={[
            'Use a clean, well-formatted PDF with selectable text',
            'Include clear section headers: Skills, Experience, Education',
            'Avoid scanned images — text-based PDFs parse best',
            'Keep file size under 5 MB',
          ]}
        />
      </MotionPage>
    </AppLayout>
  )
}
