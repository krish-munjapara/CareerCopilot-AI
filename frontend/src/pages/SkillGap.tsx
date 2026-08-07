import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import { Target, TrendingUp, AlertTriangle } from 'lucide-react'

function SkillGapContent() {
  const navigate = useNavigate()
  const [gapData, setGapData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const analysisData = sessionStorage.getItem('analysisData')
    if (!analysisData) {
      navigate('/upload-job')
      return
    }
    
    const data = JSON.parse(analysisData)
    setGapData(data)
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
            <p className="text-gray-600 mb-8">
              Identify missing skills and get learning recommendations
            </p>

            <Card className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-semibold">Skill Coverage</h3>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Skills Matched</span>
                  <span className="text-gray-600">{gapData.matched_skills.length} / {gapData.job_skills.length}</span>
                </div>
                <ProgressBar value={gapData.matched_skills.length} max={gapData.job_skills.length} color="primary" />
              </div>
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Coverage Percentage</span>
                  <span className="text-gray-600">{Math.round(gapData.skill_coverage)}%</span>
                </div>
                <ProgressBar value={gapData.skill_coverage} max={100} color="warning" />
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold">Matched Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gapData.matched_skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl font-semibold">Missing Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gapData.missing_skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-xl font-semibold mb-4">Extra Skills</h3>
              <p className="text-gray-600 mb-4">Skills in your resume not required by this job:</p>
              <div className="flex flex-wrap gap-2">
                {gapData.extra_skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function SkillGap() {
  return (
    <ProtectedRoute>
      <SkillGapContent />
    </ProtectedRoute>
  )
}
