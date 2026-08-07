import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [hasAnalysis, setHasAnalysis] = useState(false)
  const [hasResume, setHasResume] = useState(false)
  const [jobTitle, setJobTitle] = useState<string | null>(null)
  const [stats, setStats] = useState({
    atsScore: 0,
    semanticScore: 0,
    skillCoverage: 0,
    missingSkills: 0,
  })

  useEffect(() => {
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
        })
        setHasAnalysis(true)
      } catch {
        setHasAnalysis(false)
      }
    }
  }, [])

  return { hasAnalysis, hasResume, jobTitle, stats }
}
