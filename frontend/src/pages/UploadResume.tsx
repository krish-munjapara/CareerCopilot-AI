import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import UploadArea from '@/components/ui/UploadArea'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { dashboardService } from '@/services/dashboard.service'

function UploadResumeContent() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setUploading(true)
    try {
      const result = await dashboardService.analyzeResume(file)
      toast.success('Resume uploaded successfully!')
      // Store result in sessionStorage for next page
      sessionStorage.setItem('resumeAnalysis', JSON.stringify(result))
      navigate('/resume-analysis')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Resume</h1>
            <p className="text-gray-600 mb-8">
              Upload your resume PDF to get started with AI-powered analysis
            </p>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <UploadArea
                onFileSelect={handleFileSelect}
                accept=".pdf"
                maxSize={5 * 1024 * 1024}
                label="Drop your resume PDF here or click to upload"
              />

              {file && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <Button
                  onClick={handleUpload}
                  loading={uploading}
                  disabled={!file}
                  className="flex-1"
                >
                  {uploading ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFile(null)}
                  disabled={uploading}
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Tips for better results</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use a clean, well-formatted PDF</li>
                <li>• Include clear section headers (Skills, Experience, Education)</li>
                <li>• Ensure text is selectable (not scanned images)</li>
                <li>• Keep file size under 5MB</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function UploadResume() {
  return (
    <ProtectedRoute>
      <UploadResumeContent />
    </ProtectedRoute>
  )
}
