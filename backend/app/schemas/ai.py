from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class ATSResponse(BaseModel):
    """Response schema for ATS scoring."""
    overall_score: int = Field(..., ge=0, le=100, description="Overall ATS score (0-100)")
    matched_skills: List[str] = Field(default_factory=list, description="Skills matched with job")
    missing_skills: List[str] = Field(default_factory=list, description="Skills missing from resume")
    matched_keywords: List[str] = Field(default_factory=list, description="Keywords matched")
    missing_keywords: List[str] = Field(default_factory=list, description="Keywords missing")
    recommendations: List[str] = Field(default_factory=list, description="Improvement recommendations")


class ResumeAnalysisResponse(BaseModel):
    """Response schema for resume analysis."""
    full_text: str = Field(..., description="Full extracted resume text")
    pages: int = Field(..., ge=1, description="Total number of pages")
    email: Optional[str] = Field(None, description="Extracted email address")
    phone: Optional[str] = Field(None, description="Extracted phone number")
    skills: List[str] = Field(default_factory=list, description="Extracted skills")
    education: List[str] = Field(default_factory=list, description="Education entries")
    experience: List[str] = Field(default_factory=list, description="Experience entries")
    projects: List[str] = Field(default_factory=list, description="Project entries")


class JobAnalysisResponse(BaseModel):
    """Response schema for job description analysis."""
    job_title: str = Field(..., description="Extracted job title")
    required_skills: List[str] = Field(default_factory=list, description="Required skills")
    preferred_skills: List[str] = Field(default_factory=list, description="Preferred skills")
    experience_required: str = Field(..., description="Experience requirement")
    education_required: str = Field(..., description="Education requirement")
    keywords: List[str] = Field(default_factory=list, description="Important keywords")


class MatchResponse(BaseModel):
    """Response schema for resume-JD matching."""
    match_percentage: int = Field(..., ge=0, le=100, description="Match percentage (0-100)")
    skill_gaps: List[str] = Field(default_factory=list, description="Missing skills")
    strengths: List[str] = Field(default_factory=list, description="Resume strengths")
    coverage: dict = Field(default_factory=dict, description="Detailed coverage breakdown")
    recommendations: List[str] = Field(default_factory=list, description="Match recommendations")


class DashboardResponse(BaseModel):
    """Combined dashboard response."""
    ats_score: ATSResponse = Field(..., description="ATS scoring results")
    resume_analysis: ResumeAnalysisResponse = Field(..., description="Resume analysis")
    job_analysis: JobAnalysisResponse = Field(..., description="Job analysis")
    match: MatchResponse = Field(..., description="Resume-JD match results")


class AnalysisRequest(BaseModel):
    """Request schema for ML-based analysis."""
    resume_text: str = Field(..., description="Full resume text")
    job_description: str = Field(..., description="Full job description")
    resume_data: Dict[str, Any] = Field(default_factory=dict, description="Parsed resume data")


class AnalysisResponse(BaseModel):
    """Response schema for ML-based analysis."""
    ats_score: float = Field(..., ge=0, le=100, description="ATS score (0-100)")
    semantic_score: float = Field(..., ge=0, le=100, description="Semantic similarity score (0-100)")
    skill_coverage: float = Field(..., ge=0, le=100, description="Skill coverage percentage (0-100)")
    completeness_score: float = Field(..., ge=0, le=100, description="Resume completeness score (0-100)")
    resume_skills: List[str] = Field(default_factory=list, description="Skills extracted from resume")
    job_skills: List[str] = Field(default_factory=list, description="Skills extracted from job")
    matched_skills: List[str] = Field(default_factory=list, description="Matched skills")
    missing_skills: List[str] = Field(default_factory=list, description="Missing skills")
    extra_skills: List[str] = Field(default_factory=list, description="Extra skills in resume")
    recommendations: List[Dict[str, Any]] = Field(default_factory=list, description="Generated recommendations")
    model: str = Field(..., description="ML model used for analysis")


class RecommendationItem(BaseModel):
    """Individual recommendation item."""
    skill: Optional[str] = Field(None, description="Related skill if applicable")
    category: Optional[str] = Field(None, description="Recommendation category")
    priority: str = Field(..., description="Priority level (HIGH, MEDIUM, LOW)")
    reason: str = Field(..., description="Reason for recommendation")
