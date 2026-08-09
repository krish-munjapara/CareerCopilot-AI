import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { dashboardService } from '@/services/dashboard.service'
import type { AnalysisData, ResumeAnalysisData } from '@/types/analysis'

export function useAnalysisData(redirectTo = '/upload-job') {
  const navigate = useNavigate()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = sessionStorage.getItem('analysisData')
    if (!raw) {
      navigate(redirectTo)
      return
    }
    try {
      setData(JSON.parse(raw) as AnalysisData)
    } catch {
      navigate(redirectTo)
      return
    }
    setLoading(false)
  }, [navigate, redirectTo])

  return { data, loading }
}

export function useResumeAnalysisData(redirectTo = '/upload-resume') {
  const navigate = useNavigate()
  const [data, setData] = useState<ResumeAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = sessionStorage.getItem('resumeAnalysis')
    if (!raw) {
      navigate(redirectTo)
      return
    }
    try {
      setData(JSON.parse(raw) as ResumeAnalysisData)
    } catch {
      navigate(redirectTo)
      return
    }
    setLoading(false)
  }, [navigate, redirectTo])

  return { data, loading }
}

export function useDashboardStats() {
  const { user } = useAuth()
  const [hasAnalysis, setHasAnalysis] = useState(false)
  const [hasResume, setHasResume] = useState(false)
  const [hasJob, setHasJob] = useState(false)
  const [jobTitle, setJobTitle] = useState<string | null>(null)
  const [analysisDate, setAnalysisDate] = useState<string | null>(null)
  const [stats, setStats] = useState({
    atsScore: 0,
    semanticScore: 0,
    skillCoverage: 0,
    missingSkills: 0,
    missingSkillsList: [] as string[],
    matchedSkillsList: [] as string[],
    recommendationsCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || isFetching) {
        setLoading(false)
        return
      }

      setIsFetching(true)

      try {
        // Fetch dashboard status from backend
        const statusResponse = await dashboardService.getDashboardStatus()
        setHasResume(statusResponse.has_resume)
        setHasJob(statusResponse.has_job)
        setHasAnalysis(statusResponse.has_analysis)

        // If user has analysis, fetch detailed analysis data
        if (statusResponse.has_analysis) {
          const historyResponse = await dashboardService.getAnalysisHistory()
          const analyses = historyResponse.analyses || []
          setRecentAnalyses(analyses)

          if (analyses.length > 0) {
            const latestAnalysis = analyses[0]
            setStats({
              atsScore: latestAnalysis.ats_score || 0,
              semanticScore: latestAnalysis.semantic_score || 0,
              skillCoverage: latestAnalysis.skill_coverage || 0,
              missingSkills: latestAnalysis.missing_skills?.length || 0,
              missingSkillsList: latestAnalysis.missing_skills || [],
              matchedSkillsList: latestAnalysis.matched_skills || [],
              recommendationsCount: latestAnalysis.recommendations?.length || 0,
            })
            setJobTitle(extractJobTitle(latestAnalysis.job_description))
            if (latestAnalysis.created_at) {
              setAnalysisDate(new Date(latestAnalysis.created_at).toLocaleDateString())
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        setError('Failed to load dashboard data. Please try again.')
        // Fall back to sessionStorage if backend fails
        const analysisRaw = sessionStorage.getItem('analysisData')
        const resumeRaw = sessionStorage.getItem('resumeAnalysis')
        setHasResume(!!resumeRaw)
        setJobTitle(sessionStorage.getItem('jobTitle'))

        if (analysisRaw) {
          try {
            const data = JSON.parse(analysisRaw) as AnalysisData
            setStats({
              atsScore: data.ats_score,
              semanticScore: data.semantic_score,
              skillCoverage: data.skill_coverage,
              missingSkills: data.missing_skills?.length ?? 0,
              missingSkillsList: data.missing_skills || [],
              matchedSkillsList: data.matched_skills || [],
              recommendationsCount: data.recommendations?.length ?? 0,
            })
            setHasAnalysis(true)
            setError(null)
          } catch {
            setHasAnalysis(false)
          }
        }
      } finally {
        setLoading(false)
        setIsFetching(false)
      }
    }

    fetchDashboardData()
  }, [user])

  return { hasAnalysis, hasResume, hasJob, jobTitle, analysisDate, stats, loading, error, recentAnalyses }
}

// Helper function to extract job title from job description
function extractJobTitle(jobDescription: string): string | null {
  if (!jobDescription) return null
  
  // Simple extraction - look for common job title patterns
  const lines = jobDescription.split('\n').filter(line => line.trim())
  if (lines.length > 0) {
    const firstLine = lines[0].trim()
    // Remove common prefixes
    const title = firstLine
      .replace(/^(job title|position|role|title):\s*/i, '')
      .replace(/^(we are looking for|we're hiring|seeking):\s*/i, '')
      .trim()
    
    if (title.length > 0 && title.length < 100) {
      return title
    }
  }
  
  return null
}
