import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import ScoreCard from '@/components/ui/ScoreCard'
import Card from '@/components/ui/Card'
import { BarChart3, Target, TrendingUp, AlertCircle } from 'lucide-react'

function ATSResultsContent() {
  const navigate = useNavigate()
  const [atsData, setAtsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const analysisData = sessionStorage.getItem('analysisData')
    if (!analysisData) {
      navigate('/upload-job')
      return
    }
    
    const data = JSON.parse(analysisData)
    setAtsData(data)
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ATS Analysis Results</h1>
            <p className="text-gray-600 mb-8">
              Your resume compatibility score with the job description
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <ScoreCard
                title="ATS Score"
                score={Math.round(atsData.ats_score)}
                icon={BarChart3}
                color="primary"
              />
              <ScoreCard
                title="Semantic Match"
                score={Math.round(atsData.semantic_score)}
                icon={Target}
                color="secondary"
              />
              <ScoreCard
                title="Skill Coverage"
                score={Math.round(atsData.skill_coverage)}
                icon={TrendingUp}
                color="success"
              />
              <ScoreCard
                title="Missing Skills"
                score={atsData.missing_skills.length}
                icon={AlertCircle}
                color="warning"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-xl font-semibold mb-4">Matched Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {atsData.matched_skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-4">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {atsData.missing_skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {atsData.recommendations.slice(0, 5).map((rec: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      rec.priority === 'HIGH' ? 'bg-red-100' : rec.priority === 'MEDIUM' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <span className={`text-sm font-medium ${
                        rec.priority === 'HIGH' ? 'text-red-600' : rec.priority === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{rec.reason}</p>
                      {rec.skill && (
                        <span className="text-sm text-gray-500">Related: {rec.skill}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function ATSResults() {
  return (
    <ProtectedRoute>
      <ATSResultsContent />
    </ProtectedRoute>
  )
}
