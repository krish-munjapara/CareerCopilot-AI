"""
Main AI Engine - Orchestrates the complete AI pipeline.

Responsibilities:
- Coordinate all AI modules
- Manage data flow between modules
- Provide unified interface for AI operations
- Handle error propagation
"""

from typing import Dict, Any
from app.services.resume_parser import resume_parser
from app.services.skill_extractor import skill_extractor
from app.services.job_analyzer import job_analyzer
from app.services.ats_service import ats_service


class AIEngine:
    """
    Main AI Engine that orchestrates the complete AI pipeline.
    
    This class serves as the facade for all AI operations, coordinating
    between skill extraction, job description analysis, ATS scoring,
    matching, and recommendation generation.
    
    Pipeline:
        1. Extract skills from resume
        2. Analyze job description
        3. Calculate ATS score
        4. Match resume to job description
        5. Generate recommendations
    
    Public Methods:
        - analyze_resume(): Complete resume analysis
        - analyze_job(): Complete job description analysis
        - calculate_ats(): ATS compatibility scoring
        - match_resume_job(): Resume-JD matching
        - generate_recommendations(): Career recommendations
    """
    
    def __init__(self):
        """Initialize AI engine with all sub-modules."""
        self.resume_parser = resume_parser
        self.skill_extractor = skill_extractor
        self.job_analyzer = job_analyzer
        self.ats_service = ats_service
    
    def analyze_resume(self, file_path: str) -> Dict[str, Any]:
        """
        Analyze resume PDF and extract structured information.
        
        Args:
            file_path: Path to resume PDF file
        
        Returns:
            Dictionary with extracted resume data including skills,
            education, experience, and other metadata
        """
        # Parse resume PDF
        resume_data = self.resume_parser.parse_resume(file_path)
        
        # Extract and categorize skills
        skills_data = self.skill_extractor.extract_skills(resume_data["full_text"])
        resume_data["skills"] = skills_data["all_skills"]
        
        return resume_data
    
    def analyze_job(self, job_description: str) -> Dict[str, Any]:
        """
        Analyze job description and extract structured information.
        
        Args:
            job_description: Raw job description text
        
        Returns:
            Dictionary with job title, required skills, experience,
            education requirements, and keywords
        """
        return self.job_analyzer.analyze_job_description(job_description)
    
    def calculate_ats(self, resume_data: Dict, job_description: str) -> Dict[str, Any]:
        """
        Calculate ATS compatibility score between resume and job.
        
        Args:
            resume_data: Extracted resume data
            job_description: Raw job description text
        
        Returns:
            Dictionary with overall score, matched/missing skills,
            and detailed scoring breakdown
        """
        return self.ats_service.calculate_ats_score(resume_data, job_description)
    
    def match_resume_job(self, resume_data: Dict, job_data: Dict) -> Dict[str, Any]:
        """
        Match resume to job description with detailed analysis.
        
        Args:
            resume_data: Extracted resume data
            job_data: Analyzed job description data
        
        Returns:
            Dictionary with match score, gaps, strengths,
            and detailed comparison
        """
        # Calculate match percentage based on ATS score
        ats_result = self.ats_service.calculate_ats_score(resume_data, job_data.get("description", ""))
        
        # Identify skill gaps
        job_skills = set(job_data.get("required_skills", []))
        resume_skills = set(resume_data.get("skills", []))
        skill_gaps = sorted(job_skills - resume_skills)
        
        # Identify strengths (skills that match)
        strengths = sorted(job_skills & resume_skills)
        
        # Calculate match percentage
        match_percentage = ats_result["overall_score"]
        
        return {
            "match_percentage": match_percentage,
            "skill_gaps": skill_gaps,
            "strengths": strengths,
            "coverage": {
                "skills_match": len(strengths),
                "total_required": len(job_skills),
                "coverage_percentage": int((len(strengths) / len(job_skills)) * 100) if job_skills else 100
            },
            "recommendations": ats_result["recommendations"]
        }
    
    def generate_recommendations(
        self, resume_data: Dict, job_data: Dict, ats_score: Dict
    ) -> Dict[str, Any]:
        """
        Generate career improvement recommendations.
        
        Args:
            resume_data: Extracted resume data
            job_data: Analyzed job description data
            ats_score: ATS scoring results
        
        Returns:
            Dictionary with skill recommendations, project suggestions,
            and career advice
        """
        missing_skills = ats_score.get("missing_skills", [])
        
        # Skill recommendations
        skill_recommendations = [
            {"skill": skill, "priority": "high" if skill in job_data.get("required_skills", []) else "medium"}
            for skill in missing_skills[:5]
        ]
        
        # Project suggestions based on missing skills
        project_suggestions = []
        if "Python" in missing_skills:
            project_suggestions.append({"name": "Build a REST API with FastAPI", "skills": ["Python", "FastAPI"]})
        if "React" in missing_skills:
            project_suggestions.append({"name": "Create a React Dashboard", "skills": ["React", "JavaScript"]})
        if "Docker" in missing_skills:
            project_suggestions.append({"name": "Containerize an Application", "skills": ["Docker"]})
        
        # Resume tips
        resume_tips = [
            "Quantify your achievements with numbers",
            "Use action verbs in your experience section",
            "Tailor your resume to each job application",
            "Include relevant keywords from job description"
        ]
        
        return {
            "skill_recommendations": skill_recommendations,
            "project_suggestions": project_suggestions,
            "resume_tips": resume_tips,
            "priority": "high" if ats_score["overall_score"] < 60 else "medium"
        }


# Singleton instance
ai_engine = AIEngine()
