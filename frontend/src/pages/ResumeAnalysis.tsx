import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import { FileText, Mail, Phone, GraduationCap, Briefcase } from 'lucide-react'

function ResumeAnalysisContent() {
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const analysis = sessionStorage.getItem('resumeAnalysis')
    if (!analysis) {
      navigate('/upload-resume')
      return
    }
    
    setResumeData(JSON.parse(analysis))
    setLoading(false)
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </main>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis</h1>
            <p className="text-gray-600 mb-8">
              Detailed breakdown of your resume content
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <h3 className="text-xl font-semibold">Document Info</h3>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">Pages:</span> {resumeData.pages}</p>
                  <p><span className="font-medium">Email:</span> {resumeData.email || 'Not found'}</p>
                  <p><span className="font-medium">Phone:</span> {resumeData.phone || 'Not found'}</p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <h3 className="text-xl font-semibold">Contact</h3>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {resumeData.email || 'Not detected'}</p>
                  <p><span className="font-medium">Phone:</span> {resumeData.phone || 'Not detected'}</p>
                </div>
              </Card>
            </div>

            <Card className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text.primary-600" />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              {resumeData.education.length > 0 ? (
                <ul className="space-y-2">
                  {resumeData.education.map((edu: string, index: number) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-lg">{edu}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No education section detected</p>
              )}
            </Card>

            <Card className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-semibold">Experience</h3>
              </div>
              {resumeData.experience.length > 0 ? (
                <ul className="space-y-2">
                  {resumeData.experience.map((exp: string, index: number) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-lg">{exp}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No experience section detected</p>
              )}
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-semibold">Extracted Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.length > 0 ? (
                  resumeData.skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills detected</p>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function ResumeAnalysis() {
  return (
    <ProtectedRoute>
      <ResumeAnalysisContent />
    </ProtectedRoute>
  )
}
