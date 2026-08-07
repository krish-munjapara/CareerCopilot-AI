import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import ScoreCard from '@/components/ui/ScoreCard'
import Card from '@/components/ui/Card'
import { BarChart3, Target, TrendingUp, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function DashboardContent() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [hasAnalysis, setHasAnalysis] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    atsScore: 0,
    semanticScore: 0,
    skillCoverage: 0,
    missingSkills: 0,
  })

  useEffect(() => {
    const analysisData = sessionStorage.getItem('analysisData')
    if (analysisData) {
      const data = JSON.parse(analysisData)
      setDashboardData({
        atsScore: data.ats_score,
        semanticScore: data.semantic_score,
        skillCoverage: data.skill_coverage,
        missingSkills: data.missing_skills.length,
      })
      setHasAnalysis(true)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.full_name}!
            </h1>
            <p className="text-gray-600">Here's your career analysis overview</p>
          </div>

          {!hasAnalysis ? (
            <Card className="mb-8">
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600 mb-6">Upload a resume and job description to generate your analysis.</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate('/upload-resume')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Upload Resume
                  </button>
                  <button
                    onClick={() => navigate('/upload-job')}
                    className="px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                  >
                    Upload Job Description
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <ScoreCard
                title="ATS Score"
                score={Math.round(dashboardData.atsScore)}
                icon={BarChart3}
                color="primary"
              />
              <ScoreCard
                title="Semantic Match"
                score={Math.round(dashboardData.semanticScore)}
                icon={Target}
                color="secondary"
              />
              <ScoreCard
                title="Skill Coverage"
                score={Math.round(dashboardData.skillCoverage)}
                icon={TrendingUp}
                color="success"
              />
              <ScoreCard
                title="Missing Skills"
                score={dashboardData.missingSkills}
                icon={AlertCircle}
                color="warning"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Resume Analyzed</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Job Description Uploaded</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Skills Updated</p>
                    <p className="text-sm text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/upload-resume')}
                  className="w-full p-4 bg-primary-50 hover:bg-primary-100 rounded-lg text-left transition-colors"
                >
                  <p className="font-medium text-primary-900">Upload New Resume</p>
                  <p className="text-sm text-primary-700">Analyze your latest resume</p>
                </button>
                <button
                  onClick={() => navigate('/upload-job')}
                  className="w-full p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg text-left transition-colors"
                >
                  <p className="font-medium text-secondary-900">Upload Job Description</p>
                  <p className="text-sm text-secondary-700">Match with a new job</p>
                </button>
                <button
                  onClick={() => navigate('/recommendations')}
                  className="w-full p-4 bg-accent-50 hover:bg-accent-100 rounded-lg text-left transition-colors"
                >
                  <p className="font-medium text-accent-900">View Recommendations</p>
                  <p className="text-sm text-accent-700">Get improvement tips</p>
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
