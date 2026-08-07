"""
ATS scoring engine with multi-factor scoring.
Combines semantic similarity, skill coverage, and resume completeness.
"""
from typing import Dict, List, Tuple
import numpy as np


def calculate_completeness_score(resume_data: Dict) -> float:
    """
    Calculate resume completeness score based on presence of key sections.
    
    Args:
        resume_data: Dictionary with resume analysis data
    
    Returns:
        float: Completeness score (0-100)
    """
    score = 0.0
    max_score = 100.0
    
    # Check for contact information (20 points)
    if resume_data.get("email"):
        score += 10
    if resume_data.get("phone"):
        score += 10
    
    # Check for education (20 points)
    education = resume_data.get("education", [])
    if education and len(education) > 0:
        score += 20
    
    # Check for skills (20 points)
    skills = resume_data.get("skills", [])
    if skills and len(skills) > 0:
        score += 20
    
    # Check for experience (20 points)
    experience = resume_data.get("experience", [])
    if experience and len(experience) > 0:
        score += 20
    
    # Check for projects (20 points)
    projects = resume_data.get("projects", [])
    if projects and len(projects) > 0:
        score += 20
    
    return min(score, max_score)


def calculate_ats_score(
    semantic_score: float,
    skill_coverage: float,
    completeness_score: float,
    weights: Dict[str, float] = None
) -> Dict[str, float]:
    """
    Calculate ATS score using weighted combination of factors.
    
    Args:
        semantic_score: Semantic similarity percentage (0-100)
        skill_coverage: Skill coverage percentage (0-100)
        completeness_score: Resume completeness score (0-100)
        weights: Optional custom weights (default: semantic=45, skill=40, completeness=15)
    
    Returns:
        Dict with ats_score and component scores
    """
    if weights is None:
        weights = {
            "semantic": 0.45,
            "skill_coverage": 0.40,
            "completeness": 0.15
        }
    
    # Calculate weighted ATS score
    ats_score = (
        semantic_score * weights["semantic"] +
        skill_coverage * weights["skill_coverage"] +
        completeness_score * weights["completeness"]
    )
    
    return {
        "ats_score": round(ats_score, 2),
        "semantic_score": round(semantic_score, 2),
        "skill_coverage": round(skill_coverage, 2),
        "completeness_score": round(completeness_score, 2)
    }


def generate_ats_analysis(
    resume_text: str,
    job_text: str,
    resume_data: Dict,
    resume_embedding: np.ndarray,
    job_embedding: np.ndarray,
    resume_skills: List[str],
    job_skills: List[str]
) -> Dict:
    """
    Generate complete ATS analysis.
    
    Args:
        resume_text: Full resume text
        job_text: Full job description text
        resume_data: Parsed resume data
        resume_embedding: Resume text embedding
        job_embedding: Job description embedding
        resume_skills: Skills extracted from resume
        job_skills: Skills extracted from job description
    
    Returns:
        Dict with complete ATS analysis results
    """
    from .similarity_service import calculate_semantic_match
    from .skill_extractor import match_skills, calculate_skill_coverage
    
    # Calculate semantic similarity
    _, semantic_percentage = calculate_semantic_match(resume_embedding, job_embedding)
    
    # Calculate skill coverage
    skill_coverage = calculate_skill_coverage(resume_skills, job_skills)
    
    # Calculate completeness
    completeness_score = calculate_completeness_score(resume_data)
    
    # Match skills
    skill_match = match_skills(resume_skills, job_skills)
    
    # Calculate ATS score
    ats_result = calculate_ats_score(
        semantic_percentage,
        skill_coverage,
        completeness_score
    )
    
    return {
        **ats_result,
        "matched_skills": skill_match["matched_skills"],
        "missing_skills": skill_match["missing_skills"],
        "extra_skills": skill_match["extra_skills"],
        "resume_skills": resume_skills,
        "job_skills": job_skills
    }
