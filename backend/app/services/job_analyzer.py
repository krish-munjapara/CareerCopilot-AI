import re
from typing import Dict, List
from app.services.skill_extractor import skill_extractor


class JobAnalyzer:
    """Service for analyzing job descriptions and extracting structured information."""
    
    # Regex patterns for extracting specific information
    EXPERIENCE_PATTERNS = [
        r'(\d+)\+?\s*years?\s*(?:of\s*)?(?:experience|work)',
        r'(\d+)\s*-\s*(\d+)\s*years?\s*(?:of\s*)?(?:experience|work)',
        r'minimum\s*(\d+)\s*years?',
        r'at\s*least\s*(\d+)\s*years?'
    ]
    
    EDUCATION_PATTERNS = [
        r'(?:bachelor\'?s?|bs|b\.s\.)\s*(?:degree\s*)?(?:in\s*)?([a-z\s]+)',
        r'(?:master\'?s?|ms|m\.s\.|mba)\s*(?:degree\s*)?(?:in\s*)?([a-z\s]+)',
        r'(?:phd|doctorate|ph\.d\.)\s*(?:degree\s*)?(?:in\s*)?([a-z\s]+)',
        r'(?:bachelor|master|phd|degree)\s*(?:in\s*)?([a-z\s]+)'
    ]
    
    # Keywords indicating required vs preferred skills
    REQUIRED_KEYWORDS = ['required', 'must have', 'need', 'essential', 'must']
    PREFERRED_KEYWORDS = ['preferred', 'nice to have', 'plus', 'bonus', 'desired']
    
    def analyze_job_description(self, job_description: str) -> Dict:
        """
        Analyze job description and extract structured information.
        
        Args:
            job_description: Raw job description text
        
        Returns:
            Dictionary with extracted job information
        
        Raises:
            ValueError: If job description is empty or invalid
        """
        if not job_description or not job_description.strip():
            raise ValueError("Job description cannot be empty")
        
        # Extract job title
        job_title = self._extract_job_title(job_description)
        
        # Extract skills using skill_extractor
        skills_data = skill_extractor.extract_skills(job_description)
        
        # Categorize skills as required or preferred
        required_skills, preferred_skills = self._categorize_skills(
            job_description, skills_data
        )
        
        # Extract experience requirement
        experience_required = self._extract_experience(job_description)
        
        # Extract education requirement
        education_required = self._extract_education(job_description)
        
        # Extract important keywords
        keywords = self._extract_keywords(job_description)
        
        return {
            "job_title": job_title,
            "required_skills": required_skills,
            "preferred_skills": preferred_skills,
            "experience_required": experience_required,
            "education_required": education_required,
            "keywords": keywords
        }
    
    def _extract_job_title(self, job_description: str) -> str:
        """
        Extract job title from job description.
        
        Args:
            job_description: Job description text
        
        Returns:
            Extracted job title or "Not specified"
        """
        # Common patterns for job title (usually in first few lines)
        lines = job_description.split('\n')
        
        # Check first 5 lines for job title
        for line in lines[:5]:
            line = line.strip()
            # Skip empty lines or very short lines
            if len(line) < 3:
                continue
            
            # Skip common non-title lines
            skip_phrases = ['job description', 'about the role', 'we are looking', 
                          'position:', 'location:', 'salary:', 'type:']
            if any(phrase in line.lower() for phrase in skip_phrases):
                continue
            
            # If line looks like a title (no special characters, reasonable length)
            if len(line) < 100 and not line.endswith(':'):
                return line
        
        return "Not specified"
    
    def _categorize_skills(
        self, job_description: str, skills_data: Dict
    ) -> tuple:
        """
        Categorize skills as required or preferred based on context.
        
        Args:
            job_description: Job description text
            skills_data: Skills data from skill_extractor
        
        Returns:
            Tuple of (required_skills, preferred_skills)
        """
        all_skills = skills_data.get("all_skills", [])
        job_desc_lower = job_description.lower()
        
        required_skills = []
        preferred_skills = []
        
        for skill in all_skills:
            skill_lower = skill.lower()
            
            # Find skill in job description
            skill_pos = job_desc_lower.find(skill_lower)
            if skill_pos == -1:
                continue
            
            # Check context around skill (100 characters before and after)
            context_start = max(0, skill_pos - 100)
            context_end = min(len(job_description), skill_pos + len(skill) + 100)
            context = job_desc_lower[context_start:context_end]
            
            # Check for required indicators
            is_required = any(kw in context for kw in self.REQUIRED_KEYWORDS)
            
            # Check for preferred indicators
            is_preferred = any(kw in context for kw in self.PREFERRED_KEYWORDS)
            
            if is_required:
                required_skills.append(skill)
            elif is_preferred:
                preferred_skills.append(skill)
            else:
                # Default to required if no indicator found
                required_skills.append(skill)
        
        return required_skills, preferred_skills
    
    def _extract_experience(self, job_description: str) -> str:
        """
        Extract experience requirement from job description.
        
        Args:
            job_description: Job description text
        
        Returns:
            Experience requirement string or "Not specified"
        """
        job_desc_lower = job_description.lower()
        
        for pattern in self.EXPERIENCE_PATTERNS:
            match = re.search(pattern, job_desc_lower, re.IGNORECASE)
            if match:
                if match.lastindex == 2:
                    # Range match (e.g., "3-5 years")
                    return f"{match.group(1)}-{match.group(2)} years"
                else:
                    # Single value match (e.g., "5 years")
                    return f"{match.group(1)}+ years"
        
        return "Not specified"
    
    def _extract_education(self, job_description: str) -> str:
        """
        Extract education requirement from job description.
        
        Args:
            job_description: Job description text
        
        Returns:
            Education requirement string or "Not specified"
        """
        job_desc_lower = job_description.lower()
        
        for pattern in self.EDUCATION_PATTERNS:
            match = re.search(pattern, job_desc_lower, re.IGNORECASE)
            if match:
                degree = match.group(0).split('in')[0].strip()
                field = match.group(1).strip() if match.lastindex >= 1 else ""
                
                if field:
                    return f"{degree} in {field}"
                return degree
        
        # Check for general degree mentions
        if any(degree in job_desc_lower for degree in ['bachelor', 'master', 'phd', 'degree']):
            return "Degree required"
        
        return "Not specified"
    
    def _extract_keywords(self, job_description: str) -> List[str]:
        """
        Extract important keywords from job description.
        
        Args:
            job_description: Job description text
        
        Returns:
            List of important keywords
        """
        # Important job-related keywords
        important_keywords = [
            'remote', 'onsite', 'hybrid', 'full-time', 'part-time',
            'contract', 'permanent', 'internship', 'entry-level',
            'senior', 'junior', 'mid-level', 'lead', 'manager',
            'salary', 'compensation', 'benefits', 'perks',
            'startup', 'enterprise', 'fortune', 'team', 'culture',
            'agile', 'scrum', 'kanban', 'devops', 'ci/cd',
            'testing', 'debugging', 'deployment', 'monitoring'
        ]
        
        job_desc_lower = job_description.lower()
        found_keywords = []
        
        for keyword in important_keywords:
            if keyword in job_desc_lower:
                found_keywords.append(keyword)
        
        return found_keywords


job_analyzer = JobAnalyzer()
