import re
from typing import Dict, List, Set
from app.services.skill_extractor import skill_extractor


class ATSService:
    """Service for calculating ATS compatibility scores between resumes and job descriptions."""
    
    # Important keywords for job descriptions (beyond technical skills)
    KEYWORD_CATEGORIES = {
        "soft_skills": [
            "communication", "leadership", "teamwork", "collaboration",
            "problem solving", "analytical", "critical thinking", "adaptability"
        ],
        "experience_keywords": [
            "years of experience", "experience in", "worked with", "developed",
            "implemented", "managed", "led", "designed", "built", "created"
        ],
        "education_keywords": [
            "bachelor", "master", "phd", "degree", "university", "college",
            "computer science", "engineering", "cs", "bs", "ms", "mba"
        ]
    }
    
    def calculate_ats_score(self, resume_data: dict, job_description: str) -> Dict:
        """
        Calculate ATS compatibility score between resume and job description.
        
        Args:
            resume_data: Parsed resume data from resume_parser
            job_description: Job description text
        
        Returns:
            Dictionary with overall score, matches, and recommendations
        """
        # Extract skills from job description
        job_skills = skill_extractor.extract_skills(job_description)
        job_skill_set = set(job_skills["all_skills"])
        
        # Get resume skills
        resume_skill_set = set(resume_data.get("skills", []))
        
        # Calculate skill match score (40% weight)
        skill_score, matched_skills, missing_skills = self._calculate_skill_match(
            resume_skill_set, job_skill_set
        )
        
        # Calculate keyword match score (30% weight)
        keyword_score, matched_keywords, missing_keywords = self._calculate_keyword_match(
            resume_data.get("full_text", ""), job_description
        )
        
        # Calculate education match score (20% weight)
        education_score = self._calculate_education_match(
            resume_data.get("education", []), job_description
        )
        
        # Calculate experience match score (10% weight)
        experience_score = self._calculate_experience_match(
            resume_data.get("experience", []), job_description
        )
        
        # Calculate overall score
        overall_score = int(
            skill_score * 0.4 +
            keyword_score * 0.3 +
            education_score * 0.2 +
            experience_score * 0.1
        )
        
        # Generate recommendations
        recommendations = self._generate_recommendations(
            missing_skills, missing_keywords, job_description
        )
        
        return {
            "overall_score": overall_score,
            "matched_skills": sorted(matched_skills),
            "missing_skills": sorted(missing_skills),
            "matched_keywords": sorted(matched_keywords),
            "missing_keywords": sorted(missing_keywords),
            "recommendations": recommendations
        }
    
    def _calculate_skill_match(
        self, resume_skills: Set[str], job_skills: Set[str]
    ) -> tuple:
        """
        Calculate skill match percentage.
        
        Args:
            resume_skills: Set of skills from resume
            job_skills: Set of skills from job description
        
        Returns:
            Tuple of (score, matched_skills, missing_skills)
        """
        if not job_skills:
            return 100, set(), set()
        
        matched = resume_skills & job_skills
        missing = job_skills - resume_skills
        
        score = (len(matched) / len(job_skills)) * 100 if job_skills else 100
        
        return score, matched, missing
    
    def _calculate_keyword_match(
        self, resume_text: str, job_description: str
    ) -> tuple:
        """
        Calculate keyword match percentage.
        
        Args:
            resume_text: Full resume text
            job_description: Job description text
        
        Returns:
            Tuple of (score, matched_keywords, missing_keywords)
        """
        resume_text_lower = resume_text.lower()
        job_description_lower = job_description.lower()
        
        all_keywords = set()
        for category, keywords in self.KEYWORD_CATEGORIES.items():
            for keyword in keywords:
                if keyword in job_description_lower:
                    all_keywords.add(keyword)
        
        if not all_keywords:
            return 100, set(), set()
        
        matched = set()
        for keyword in all_keywords:
            if keyword in resume_text_lower:
                matched.add(keyword)
        
        missing = all_keywords - matched
        score = (len(matched) / len(all_keywords)) * 100 if all_keywords else 100
        
        return score, matched, missing
    
    def _calculate_education_match(
        self, resume_education: List[str], job_description: str
    ) -> float:
        """
        Calculate education match score.
        
        Args:
            resume_education: List of education entries from resume
            job_description: Job description text
        
        Returns:
            Education match score (0-100)
        """
        job_desc_lower = job_description.lower()
        resume_text_lower = " ".join(resume_education).lower()
        
        # Check for degree requirements in job description
        degree_requirements = []
        if "bachelor" in job_desc_lower or "bs" in job_desc_lower:
            degree_requirements.append("bachelor")
        if "master" in job_desc_lower or "ms" in job_desc_lower or "mba" in job_desc_lower:
            degree_requirements.append("master")
        if "phd" in job_desc_lower or "doctorate" in job_desc_lower:
            degree_requirements.append("phd")
        
        if not degree_requirements:
            return 100.0  # No specific degree requirements
        
        # Check if resume meets requirements
        matched = 0
        for requirement in degree_requirements:
            if requirement in resume_text_lower:
                matched += 1
        
        score = (matched / len(degree_requirements)) * 100 if degree_requirements else 100
        return score
    
    def _calculate_experience_match(
        self, resume_experience: List[str], job_description: str
    ) -> float:
        """
        Calculate experience match score.
        
        Args:
            resume_experience: List of experience entries from resume
            job_description: Job description text
        
        Returns:
            Experience match score (0-100)
        """
        job_desc_lower = job_description.lower()
        resume_text_lower = " ".join(resume_experience).lower()
        
        # Extract years of experience requirement from job description
        years_match = re.search(r'(\d+)\+?\s*years?', job_desc_lower)
        if years_match:
            required_years = int(years_match.group(1))
            
            # Try to find years in resume experience
            resume_years_match = re.search(r'(\d+)\+?\s*years?', resume_text_lower)
            if resume_years_match:
                resume_years = int(resume_years_match.group(1))
                if resume_years >= required_years:
                    return 100.0
                else:
                    return (resume_years / required_years) * 100
        
        # If no specific years requirement, check for experience keywords
        experience_keywords = ["experience", "worked", "developed", "managed"]
        matched = sum(1 for kw in experience_keywords if kw in resume_text_lower)
        score = (matched / len(experience_keywords)) * 100 if experience_keywords else 100
        
        return score
    
    def _generate_recommendations(
        self, missing_skills: Set[str], missing_keywords: Set[str], job_description: str
    ) -> List[str]:
        """
        Generate improvement recommendations based on gaps.
        
        Args:
            missing_skills: Skills not found in resume
            missing_keywords: Keywords not found in resume
            job_description: Job description for context
        
        Returns:
            List of recommendation strings
        """
        recommendations = []
        
        # Skill recommendations
        if missing_skills:
            top_missing = sorted(missing_skills)[:5]
            for skill in top_missing:
                recommendations.append(f"Add {skill} to your skills section")
        
        # Keyword recommendations
        if missing_keywords:
            top_missing = sorted(missing_keywords)[:3]
            for keyword in top_missing:
                recommendations.append(f"Mention {keyword} in your experience section")
        
        # General recommendations based on job description
        job_desc_lower = job_description.lower()
        
        if "project" in job_desc_lower and len(missing_skills) > 3:
            recommendations.append("Add a project showcasing the required skills")
        
        if "team" in job_desc_lower or "collaboration" in job_desc_lower:
            recommendations.append("Highlight teamwork and collaboration experience")
        
        if "leadership" in job_desc_lower or "lead" in job_desc_lower:
            recommendations.append("Include leadership experience or mentoring")
        
        # Limit recommendations to top 8
        return recommendations[:8]


ats_service = ATSService()
