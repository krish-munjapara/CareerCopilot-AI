import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Target, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">CareerCopilot AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Resume Analysis
            <span className="text-primary-600"> for Career Success</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your resume and job description to get instant ATS scoring, 
            skill gap analysis, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ATS Scoring</h3>
            <p className="text-gray-600">
              Get instant ATS compatibility scores with detailed breakdowns
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Skill Gap Analysis</h3>
            <p className="text-gray-600">
              Identify missing skills and get personalized learning paths
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
            <p className="text-gray-600">
              Receive actionable suggestions to improve your resume
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
