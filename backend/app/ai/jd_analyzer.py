"""
Job Description Analyzer - Analyzes and structures job descriptions.

Responsibilities:
- Extract job title and metadata
- Identify required vs preferred skills
- Extract experience requirements
- Extract education requirements
- Identify important keywords
- Detect job type and level
"""

from typing import Dict, List, Any


class JDAnalyzer:
    """
    Analyzes job descriptions and extracts structured information.
    
    This module processes raw job description text to extract
    key information including job title, requirements, and
    categorizes skills as required or preferred.
    
    Extracted Information:
        - Job Title
        - Required Skills
        - Preferred Skills
        - Experience Requirements
        - Education Requirements
        - Important Keywords
        - Job Type (remote/hybrid/onsite)
        - Experience Level (junior/senior/lead)
    
    Public Methods:
        - analyze_job_description(): Complete job description analysis
        - extract_job_title(): Extract job title from text
        - categorize_skills(): Categorize skills as required/preferred
        - extract_requirements(): Extract experience and education requirements
    """
    
    def __init__(self):
        """Initialize job description analyzer."""
        pass
    
    def analyze_job_description(self, job_description: str) -> Dict[str, Any]:
        """
        Analyze job description and extract structured information.
        
        Args:
            job_description: Raw job description text
        
        Returns:
            Dictionary with extracted job information:
            {
                "job_title": "...",
                "required_skills": [...],
                "preferred_skills": [...],
                "experience_required": "...",
                "education_required": "...",
                "keywords": [...],
                "job_type": "...",
                "experience_level": "..."
            }
        """
        pass
    
    def extract_job_title(self, job_description: str) -> str:
        """
        Extract job title from job description.
        
        Args:
            job_description: Job description text
        
        Returns:
            Extracted job title or "Not specified"
        """
        pass
    
    def categorize_skills(
        self, job_description: str, skills: List[str]
    ) -> tuple:
        """
        Categorize skills as required or preferred based on context.
        
        Args:
            job_description: Job description text
            skills: List of skills found in description
        
        Returns:
            Tuple of (required_skills, preferred_skills)
        """
        pass
    
    def extract_requirements(self, job_description: str) -> Dict[str, str]:
        """
        Extract experience and education requirements.
        
        Args:
            job_description: Job description text
        
        Returns:
            Dictionary with experience_required and education_required
        """
        pass


# Singleton instance
jd_analyzer = JDAnalyzer()
