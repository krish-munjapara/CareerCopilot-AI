"""
Recommendation engine for generating personalized recommendations based on analysis.
"""
from typing import List, Dict, Tuple


def generate_skill_recommendations(missing_skills: List[str]) -> List[Dict]:
    """
    Generate recommendations for missing skills.
    
    Args:
        missing_skills: List of skills missing from resume
    
    Returns:
        List[Dict]: Recommendations with priority and reason
    """
    recommendations = []
    
    skill_recommendation_map = {
        "AWS": {
            "priority": "HIGH",
            "reason": "AWS is a leading cloud platform. Learn AWS fundamentals, EC2, S3, and Lambda."
        },
        "Azure": {
            "priority": "HIGH",
            "reason": "Azure is a major cloud platform. Focus on Azure services and deployment."
        },
        "GCP": {
            "priority": "HIGH",
            "reason": "Google Cloud Platform is essential for cloud-native applications."
        },
        "Docker": {
            "priority": "HIGH",
            "reason": "Containerization is critical for modern DevOps. Learn Docker basics and containerization."
        },
        "Kubernetes": {
            "priority": "HIGH",
            "reason": "Kubernetes is the industry standard for container orchestration."
        },
        "SQL": {
            "priority": "HIGH",
            "reason": "SQL is fundamental for data manipulation. Practice queries and database design."
        },
        "MongoDB": {
            "priority": "MEDIUM",
            "reason": "NoSQL databases are widely used. Learn MongoDB for flexible data storage."
        },
        "Redis": {
            "priority": "MEDIUM",
            "reason": "Redis is essential for caching and real-time applications."
        },
        "Git": {
            "priority": "HIGH",
            "reason": "Version control is mandatory. Learn Git commands and GitHub workflows."
        },
        "CI/CD": {
            "priority": "HIGH",
            "reason": "Continuous integration/deployment is crucial for modern development."
        },
        "Machine Learning": {
            "priority": "MEDIUM",
            "reason": "ML skills are increasingly valuable. Start with basics and Scikit-learn."
        },
        "Deep Learning": {
            "priority": "MEDIUM",
            "reason": "Deep learning is advanced ML. Learn after mastering ML fundamentals."
        },
        "TensorFlow": {
            "priority": "MEDIUM",
            "reason": "TensorFlow is a leading ML framework. Practice building models."
        },
        "PyTorch": {
            "priority": "MEDIUM",
            "reason": "PyTorch is popular for research and production ML."
        },
        "NLP": {
            "priority": "MEDIUM",
            "reason": "Natural Language Processing is a growing field. Learn text processing."
        },
        "Computer Vision": {
            "priority": "MEDIUM",
            "reason": "Computer Vision applications are expanding. Learn image processing."
        },
        "React": {
            "priority": "MEDIUM",
            "reason": "React is the most popular frontend framework. Learn components and hooks."
        },
        "Angular": {
            "priority": "MEDIUM",
            "reason": "Angular is widely used in enterprise. Learn TypeScript and Angular architecture."
        },
        "Vue": {
            "priority": "LOW",
            "reason": "Vue is a progressive framework. Good alternative to React/Angular."
        },
        "Node.js": {
            "priority": "MEDIUM",
            "reason": "Node.js enables JavaScript backend development. Learn Express and async programming."
        },
        "FastAPI": {
            "priority": "MEDIUM",
            "reason": "FastAPI is modern and fast. Learn async Python and API design."
        },
        "Django": {
            "priority": "MEDIUM",
            "reason": "Django provides full-stack capabilities. Learn ORM and Django REST Framework."
        },
        "Flask": {
            "priority": "LOW",
            "reason": "Flask is lightweight. Good for microservices and simple APIs."
        },
        "Spring Boot": {
            "priority": "MEDIUM",
            "reason": "Spring Boot is standard for Java enterprise applications."
        },
        "REST API": {
            "priority": "HIGH",
            "reason": "REST API design is fundamental. Learn HTTP methods and API best practices."
        },
        "GraphQL": {
            "priority": "LOW",
            "reason": "GraphQL offers flexible queries. Learn schema design and resolvers."
        },
        "Pandas": {
            "priority": "MEDIUM",
            "reason": "Pandas is essential for data manipulation. Learn dataframes and analysis."
        },
        "NumPy": {
            "priority": "MEDIUM",
            "reason": "NumPy is foundational for numerical computing. Learn arrays and operations."
        },
        "Matplotlib": {
            "priority": "LOW",
            "reason": "Matplotlib is standard for plotting. Learn visualization basics."
        },
        "Data Visualization": {
            "priority": "MEDIUM",
            "reason": "Data visualization skills help communicate insights. Learn tools and best practices."
        },
        "Data Analysis": {
            "priority": "MEDIUM",
            "reason": "Data analysis is critical for decision-making. Learn statistical methods."
        },
        "ETL": {
            "priority": "MEDIUM",
            "reason": "ETL processes are vital for data pipelines. Learn data transformation."
        },
        "Power BI": {
            "priority": "LOW",
            "reason": "Power BI is popular for business intelligence. Learn dashboards and reports."
        },
        "Tableau": {
            "priority": "LOW",
            "reason": "Tableau is widely used for visualization. Learn data connection and viz."
        },
        "Excel": {
            "priority": "LOW",
            "reason": "Excel is ubiquitous. Learn advanced formulas and pivot tables."
        },
        "Communication": {
            "priority": "MEDIUM",
            "reason": "Communication skills are essential for collaboration and leadership."
        },
        "Problem Solving": {
            "priority": "HIGH",
            "reason": "Problem-solving is a core technical skill. Practice algorithmic thinking."
        },
        "Leadership": {
            "priority": "LOW",
            "reason": "Leadership skills grow with experience. Seek mentorship opportunities."
        },
        "Teamwork": {
            "priority": "MEDIUM",
            "reason": "Teamwork is critical in software development. Practice collaboration."
        },
        "Collaboration": {
            "priority": "MEDIUM",
            "reason": "Collaboration tools and practices are essential. Learn Git workflows and code review."
        },
        "Adaptability": {
            "priority": "LOW",
            "reason": "Adaptability helps with changing technologies. Stay curious and learn continuously."
        },
    }
    
    for skill in missing_skills:
        if skill in skill_recommendation_map:
            recommendations.append({
                "skill": skill,
                "priority": skill_recommendation_map[skill]["priority"],
                "reason": skill_recommendation_map[skill]["reason"]
            })
        else:
            # Generic recommendation for unknown skills
            recommendations.append({
                "skill": skill,
                "priority": "MEDIUM",
                "reason": f"Consider learning {skill} as it's required by the job."
            })
    
    return recommendations


def generate_semantic_recommendations(semantic_score: float) -> List[Dict]:
    """
    Generate recommendations based on semantic similarity score.
    
    Args:
        semantic_score: Semantic similarity percentage (0-100)
    
    Returns:
        List[Dict]: Semantic recommendations
    """
    recommendations = []
    
    if semantic_score < 50:
        recommendations.append({
            "category": "semantic",
            "priority": "HIGH",
            "reason": "Low semantic match. Align your resume wording and content with job requirements."
        })
    elif semantic_score < 70:
        recommendations.append({
            "category": "semantic",
            "priority": "MEDIUM",
            "reason": "Moderate semantic match. Use keywords from job description in your resume."
        })
    
    return recommendations


def generate_coverage_recommendations(skill_coverage: float) -> List[Dict]:
    """
    Generate recommendations based on skill coverage.
    
    Args:
        skill_coverage: Skill coverage percentage (0-100)
    
    Returns:
        List[Dict]: Coverage recommendations
    """
    recommendations = []
    
    if skill_coverage < 50:
        recommendations.append({
            "category": "coverage",
            "priority": "HIGH",
            "reason": "Low skill coverage. Prioritize learning missing technical skills."
        })
    elif skill_coverage < 75:
        recommendations.append({
            "category": "coverage",
            "priority": "MEDIUM",
            "reason": "Moderate skill coverage. Focus on key missing skills."
        })
    
    return recommendations


def generate_completeness_recommendations(completeness_score: float, resume_data: Dict) -> List[Dict]:
    """
    Generate recommendations based on resume completeness.
    
    Args:
        completeness_score: Completeness score (0-100)
        resume_data: Parsed resume data
    
    Returns:
        List[Dict]: Completeness recommendations
    """
    recommendations = []
    
    if not resume_data.get("email") or not resume_data.get("phone"):
        recommendations.append({
            "category": "completeness",
            "priority": "HIGH",
            "reason": "Add contact information (email and phone) to your resume."
        })
    
    if not resume_data.get("education") or len(resume_data.get("education", [])) == 0:
        recommendations.append({
            "category": "completeness",
            "priority": "HIGH",
            "reason": "Add education details to your resume."
        })
    
    if not resume_data.get("experience") or len(resume_data.get("experience", [])) == 0:
        recommendations.append({
            "category": "completeness",
            "priority": "HIGH",
            "reason": "Add work experience to demonstrate practical skills."
        })
    
    if not resume_data.get("projects") or len(resume_data.get("projects", [])) == 0:
        recommendations.append({
            "category": "completeness",
            "priority": "MEDIUM",
            "reason": "Add relevant projects to showcase your abilities."
        })
    
    if not resume_data.get("skills") or len(resume_data.get("skills", [])) == 0:
        recommendations.append({
            "category": "completeness",
            "priority": "HIGH",
            "reason": "Explicitly list your technical skills in a skills section."
        })
    
    return recommendations


def generate_recommendations(analysis_result: Dict) -> List[Dict]:
    """
    Generate comprehensive recommendations based on complete analysis.
    
    Args:
        analysis_result: Complete ATS analysis result
    
    Returns:
        List[Dict]: All recommendations sorted by priority
    """
    all_recommendations = []
    
    # Skill-based recommendations
    skill_recs = generate_skill_recommendations(analysis_result.get("missing_skills", []))
    all_recommendations.extend(skill_recs)
    
    # Semantic recommendations
    semantic_recs = generate_semantic_recommendations(analysis_result.get("semantic_score", 0))
    all_recommendations.extend(semantic_recs)
    
    # Coverage recommendations
    coverage_recs = generate_coverage_recommendations(analysis_result.get("skill_coverage", 0))
    all_recommendations.extend(coverage_recs)
    
    # Completeness recommendations
    completeness_recs = generate_completeness_recommendations(
        analysis_result.get("completeness_score", 0),
        analysis_result.get("resume_data", {})
    )
    all_recommendations.extend(completeness_recs)
    
    # Sort by priority (HIGH > MEDIUM > LOW)
    priority_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
    all_recommendations.sort(key=lambda x: priority_order.get(x.get("priority", "LOW"), 2))
    
    return all_recommendations
