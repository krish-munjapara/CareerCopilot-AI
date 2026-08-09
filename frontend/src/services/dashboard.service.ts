import api from './api'

export interface ResumeAnalysis {
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

export interface JobAnalysis {
  job_title: string
  required_skills: string[]
  preferred_skills: string[]
  experience_required: string
  education_required: string
  keywords: string[]
}

export interface ATSResponse {
  overall_score: number
  matched_skills: string[]
  missing_skills: string[]
  matched_keywords: string[]
  missing_keywords: string[]
  recommendations: string[]
}

export interface MatchResponse {
  match_percentage: number
  skill_gaps: string[]
  strengths: string[]
  coverage: {
    skills_match: number
    total_required: number
    coverage_percentage: number
  }
  recommendations: string[]
}

export interface DashboardResponse {
  ats_score: ATSResponse
  resume_analysis: ResumeAnalysis
  job_analysis: JobAnalysis
  match: MatchResponse
}

export interface AnalysisRequest {
  resume_text: string
  job_description: string
  resume_data: any
}

export interface AnalysisResponse {
  ats_score: number
  semantic_score: number
  skill_coverage: number
  completeness_score: number
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
  model: string
}

export const dashboardService = {
  async getDashboardStatus(): Promise<any> {
    const response = await api.get('/dashboard/status')
    return response.data
  },

  async analyzeResume(file: File): Promise<ResumeAnalysis> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  async uploadJob(title: string, company: string, description: string): Promise<any> {
    const response = await api.post('/job/upload', { title, company, description })
    return response.data
  },

  async analyzeJob(description: string): Promise<JobAnalysis> {
    const response = await api.post('/dashboard/analyze-job', { description })
    return response.data
  },

  async calculateATS(resumeFilePath: string, jobDescription: string): Promise<ATSResponse> {
    const response = await api.post('/dashboard/calculate-ats', {
      resume_file_path: resumeFilePath,
      job_description: jobDescription,
    })
    return response.data
  },

  async matchResumeJob(resumeFilePath: string, jobData: JobAnalysis): Promise<MatchResponse> {
    const response = await api.post('/dashboard/match', {
      resume_file_path: resumeFilePath,
      job_data: jobData,
    })
    return response.data
  },

  async getDashboard(resumeFilePath: string, jobDescription: string): Promise<DashboardResponse> {
    const response = await api.post('/dashboard/dashboard', {
      resume_file_path: resumeFilePath,
      job_description: jobDescription,
    })
    return response.data
  },

  async analyze(resumeText: string, jobDescription: string, resumeData: any): Promise<AnalysisResponse> {
    const response = await api.post('/analysis/analyze', {
      resume_text: resumeText,
      job_description: jobDescription,
      resume_data: resumeData,
    })
    return response.data
  },

  async saveAnalysis(resumeText: string, jobDescription: string, resumeData: any): Promise<any> {
    const response = await api.post('/analysis/save', {
      resume_text: resumeText,
      job_description: jobDescription,
      resume_data: resumeData,
    })
    return response.data
  },

  async getAnalysisHistory(): Promise<any> {
    const response = await api.get('/analysis/history')
    return response.data
  },
}
