"""
Skill extraction service with comprehensive skill vocabulary and alias normalization.
"""
import re
from typing import List, Set, Dict


# Comprehensive skill vocabulary with categories
SKILL_VOCABULARY = {
    "Programming": [
        "Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", "R",
        "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby", "Perl", "Scala"
    ],
    "Frontend": [
        "React", "Angular", "Vue", "HTML", "CSS", "Tailwind CSS", "Bootstrap",
        "SASS", "LESS", "jQuery", "Next.js", "Nuxt.js", "Redux"
    ],
    "Backend": [
        "FastAPI", "Django", "Flask", "Node.js", "Express", "Spring Boot",
        "REST API", "GraphQL", "ASP.NET", "Laravel", "Rails"
    ],
    "Databases": [
        "SQL", "MySQL", "PostgreSQL", "MongoDB", "Oracle", "Redis",
        "SQLite", "Cassandra", "Elasticsearch", "DynamoDB"
    ],
    "Data": [
        "Excel", "Power BI", "Tableau", "Pandas", "NumPy", "Matplotlib",
        "Data Visualization", "Data Analysis", "ETL", "Spark", "Hadoop"
    ],
    "Machine Learning": [
        "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
        "Scikit-learn", "NLP", "Computer Vision", "OpenCV", "Keras"
    ],
    "Cloud/DevOps": [
        "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Git", "GitHub",
        "CI/CD", "Jenkins", "Terraform", "Ansible", "Linux", "Bash"
    ],
    "Computer Science": [
        "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks",
        "Algorithms", "Data Structures", "System Design"
    ],
    "Soft Skills": [
        "Communication", "Problem Solving", "Leadership", "Teamwork",
        "Collaboration", "Adaptability", "Time Management", "Critical Thinking"
    ]
}

# Alias mapping for normalization
ALIAS_MAP = {
    "sklearn": "Scikit-learn",
    "scikit-learn": "Scikit-learn",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "react.js": "React",
    "reactjs": "React",
    "vue.js": "Vue",
    "vuejs": "Vue",
    "angularjs": "Angular",
    "nodejs": "Node.js",
    "node.js": "Node.js",
    "mongodb": "MongoDB",
    "mysql": "MySQL",
    "postgresql": "PostgreSQL",
    "powerbi": "Power BI",
    "power bi": "Power BI",
    "tableau": "Tableau",
    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",
    "restful api": "REST API",
    "rest api": "REST API",
    "graphql": "GraphQL",
    "aws": "AWS",
    "azure": "Azure",
    "gcp": "GCP",
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "k8s": "Kubernetes",
    "git": "Git",
    "github": "GitHub",
    "gitlab": "GitLab",
    "ci/cd": "CI/CD",
    "cicd": "CI/CD",
    "nlp": "NLP",
    "natural language processing": "NLP",
    "cv": "Computer Vision",
    "computer vision": "Computer Vision",
    "ml": "Machine Learning",
    "machine learning": "Machine Learning",
    "dl": "Deep Learning",
    "deep learning": "Deep Learning",
    "ai": "Artificial Intelligence",
    "artificial intelligence": "Artificial Intelligence",
    "data science": "Data Science",
    "data analysis": "Data Analysis",
    "data visualization": "Data Visualization",
    "etl": "ETL",
    "oop": "OOP",
    "object oriented programming": "OOP",
    "dbms": "DBMS",
    "database management": "DBMS",
    "dsa": "DSA",
    "data structures": "DSA",
    "algorithms": "DSA",
    "os": "Operating Systems",
    "operating systems": "Operating Systems",
    "cn": "Computer Networks",
    "computer networks": "Computer Networks",
}


def normalize_skill(skill: str) -> str:
    """
    Normalize a skill name using alias mapping.
    
    Args:
        skill: Raw skill name
    
    Returns:
        str: Normalized skill name
    """
    skill_lower = skill.lower().strip()
    
    # Check alias map
    if skill_lower in ALIAS_MAP:
        return ALIAS_MAP[skill_lower]
    
    # Check if already in vocabulary (case-insensitive)
    for category_skills in SKILL_VOCABULARY.values():
        for vocab_skill in category_skills:
            if vocab_skill.lower() == skill_lower:
                return vocab_skill
    
    # Return original if no match found
    return skill


def extract_skills(text: str) -> List[str]:
    """
    Extract skills from text using the skill vocabulary.
    
    Args:
        text: Text to extract skills from (resume or job description)
    
    Returns:
        List[str]: List of normalized unique skills found
    """
    if not text:
        return []
    
    text_lower = text.lower()
    found_skills = set()
    
    # Check each skill in vocabulary
    for category_skills in SKILL_VOCABULARY.values():
        for skill in category_skills:
            # Use word boundaries to avoid false positives
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(pattern, text_lower):
                normalized = normalize_skill(skill)
                found_skills.add(normalized)
    
    # Also check aliases
    for alias, normalized in ALIAS_MAP.items():
        pattern = r'\b' + re.escape(alias) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.add(normalized)
    
    return sorted(list(found_skills))


def get_skill_categories() -> Dict[str, List[str]]:
    """
    Get the complete skill vocabulary organized by category.
    
    Returns:
        Dict[str, List[str]]: Skills organized by category
    """
    return SKILL_VOCABULARY.copy()


def match_skills(resume_skills: List[str], job_skills: List[str]) -> Dict[str, List[str]]:
    """
    Match resume skills against job skills.
    
    Args:
        resume_skills: Skills extracted from resume
        job_skills: Skills extracted from job description
    
    Returns:
        Dict with matched_skills, missing_skills, extra_skills
    """
    resume_set = set(resume_skills)
    job_set = set(job_skills)
    
    matched_skills = sorted(list(resume_set & job_set))
    missing_skills = sorted(list(job_set - resume_set))
    extra_skills = sorted(list(resume_set - job_set))
    
    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills
    }


def calculate_skill_coverage(resume_skills: List[str], job_skills: List[str]) -> float:
    """
    Calculate skill coverage percentage.
    
    Args:
        resume_skills: Skills extracted from resume
        job_skills: Skills extracted from job description
    
    Returns:
        float: Coverage percentage (0-100)
    """
    if not job_skills:
        return 0.0
    
    resume_set = set(resume_skills)
    job_set = set(job_skills)
    
    matched = len(resume_set & job_set)
    coverage = (matched / len(job_set)) * 100
    
    return round(coverage, 2)
