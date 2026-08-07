import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import RecommendationCard from '@/components/ui/RecommendationCard'

function RecommendationsContent() {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const analysisData = sessionStorage.getItem('analysisData')
    if (!analysisData) {
      navigate('/upload-job')
      return
    }
    
    const data = JSON.parse(analysisData)
    setRecommendations(data.recommendations)
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Recommendations</h1>
            <p className="text-gray-600 mb-8">
              Personalized suggestions to improve your resume and career prospects
            </p>

            {recommendations.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600">No recommendations available. Upload a resume and job description to generate recommendations.</p>
                </div>
              </Card>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">High Priority</h2>
                  <div className="space-y-4">
                    {recommendations
                      .filter((r) => r.priority === 'HIGH')
                      .map((rec, index) => (
                        <RecommendationCard
                          key={index}
                          title={rec.skill || rec.category || 'Recommendation'}
                          description={rec.reason}
                          type={rec.category || 'general'}
                          priority={rec.priority.toLowerCase()}
                        />
                      ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Medium Priority</h2>
                  <div className="space-y-4">
                    {recommendations
                      .filter((r) => r.priority === 'MEDIUM')
                      .map((rec, index) => (
                        <RecommendationCard
                          key={index}
                          title={rec.skill || rec.category || 'Recommendation'}
                          description={rec.reason}
                          type={rec.category || 'general'}
                          priority={rec.priority.toLowerCase()}
                        />
                      ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Low Priority</h2>
                  <div className="space-y-4">
                    {recommendations
                      .filter((r) => r.priority === 'LOW')
                      .map((rec, index) => (
                        <RecommendationCard
                          key={index}
                          title={rec.skill || rec.category || 'Recommendation'}
                          description={rec.reason}
                          type={rec.category || 'general'}
                          priority={rec.priority.toLowerCase()}
                        />
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function Recommendations() {
  return (
    <ProtectedRoute>
      <RecommendationsContent />
    </ProtectedRoute>
  )
}
