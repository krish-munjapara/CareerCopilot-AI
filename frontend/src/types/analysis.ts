export interface AnalysisData {
  ats_score: number
  semantic_score: number
  skill_coverage: number
  completeness_score?: number
  resume_skills: string[]
  job_skills: string[]
  matched_skills: string[]
  missing_skills: string[]
  extra_skills: string[]
  recommendations: Array<{
    skill?: string
    category?: string
    priority: string
    reason: string
  }>
  model?: string
}

export interface ResumeAnalysisData {
  full_text: string
  pages: number
  email?: string
  phone?: string
  skills: string[]
  education: string[]
  experience: string[]
  projects: string[]
  file_path?: string
}
