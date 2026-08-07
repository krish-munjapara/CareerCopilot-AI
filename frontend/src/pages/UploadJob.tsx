import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { dashboardService } from '@/services/dashboard.service'

function UploadJobContent() {
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

    // Check if resume analysis exists
    const resumeAnalysis = sessionStorage.getItem('resumeAnalysis')
    if (!resumeAnalysis) {
      toast.error('Please upload a resume first')
      navigate('/upload-resume')
      return
    }

    setUploading(true)
    try {
      const resumeData = JSON.parse(resumeAnalysis)
      
      // Call the new ML analysis endpoint
      const result = await dashboardService.analyze(
        resumeData.full_text,
        description,
        resumeData
      )
      
      toast.success('Analysis completed successfully!')
      
      // Store analysis result in sessionStorage
      sessionStorage.setItem('analysisData', JSON.stringify(result))
      sessionStorage.setItem('jobTitle', title)
      sessionStorage.setItem('jobCompany', company)
      
      navigate('/ats-results')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Analysis failed')
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Job Description</h1>
            <p className="text-gray-600 mb-8">
              Paste the job description to analyze requirements and match with your resume
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="space-y-6">
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
                  label="Company (Optional)"
                  type="text"
                  placeholder="Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    id="description"
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Paste the complete job description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500">
                    {description.length} / 100 minimum characters
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" loading={uploading} className="flex-1">
                    {uploading ? 'Analyzing...' : 'Analyze Job'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTitle('')
                      setCompany('')
                      setDescription('')
                    }}
                    disabled={uploading}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Tips for best results</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Paste the complete job description including requirements</li>
                <li>• Include skills, experience, and education requirements</li>
                <li>• Longer descriptions provide more accurate analysis</li>
                <li>• Remove any personal information from the description</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function UploadJob() {
  return (
    <ProtectedRoute>
      <UploadJobContent />
    </ProtectedRoute>
  )
}
