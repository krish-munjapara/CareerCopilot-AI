import re
from typing import Dict, List, Set


class SkillExtractor:
    """Service for extracting technical skills from resume text using curated skill dictionary."""
    
    # Curated skill dictionary organized by category
    SKILL_CATEGORIES = {
        "programming_languages": [
            "Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL",
            "Go", "Rust", "Swift", "Kotlin", "Ruby", "PHP", "Scala", "R",
            "MATLAB", "Perl", "Shell", "Bash", "PowerShell"
        ],
        "frameworks": [
            "React", "FastAPI", "Django", "Flask", "Node.js", "Express",
            "Spring Boot", "Angular", "Vue.js", "Next.js", "Nuxt.js",
            "Svelte", "Laravel", "Rails", "ASP.NET", "Flutter", "Django REST"
        ],
        "databases": [
            "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis",
            "Elasticsearch", "Cassandra", "DynamoDB", "Firebase", "Oracle",
            "SQL Server", "MariaDB", "Neo4j", "InfluxDB", "CouchDB"
        ],
        "cloud": [
            "AWS", "Azure", "GCP", "Google Cloud", "Heroku", "DigitalOcean",
            "Vercel", "Netlify", "AWS Lambda", "EC2", "S3", "Lambda"
        ],
        "tools": [
            "Git", "GitHub", "GitLab", "Docker", "Kubernetes", "Postman",
            "VS Code", "Jupyter", "Linux", "Unix", "Nginx", "Apache",
            "Jenkins", "Travis CI", "CircleCI", "Webpack", "Babel"
        ],
        "libraries": [
            "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch",
            "OpenCV", "spaCy", "pdfplumber", "Matplotlib", "Seaborn",
            "Plotly", "Keras", "Theano", "NLTK", "BeautifulSoup", "Requests"
        ],
        "soft_skills": [
            "Communication", "Leadership", "Teamwork", "Problem Solving",
            "Time Management", "Critical Thinking", "Adaptability", "Collaboration",
            "Creativity", "Decision Making", "Conflict Resolution", "Negotiation"
        ]
    }
    
    def __init__(self):
        """Initialize skill extractor with compiled regex patterns for each skill."""
        self.skill_patterns = self._compile_skill_patterns()
    
    def _compile_skill_patterns(self) -> Dict[str, List[tuple]]:
        """
        Compile regex patterns for each skill for efficient matching.
        
        Returns:
            Dictionary mapping category to list of (skill, pattern) tuples
        """
        patterns = {}
        
        for category, skills in self.SKILL_CATEGORIES.items():
            category_patterns = []
            for skill in skills:
                # Create word boundary pattern for case-insensitive matching
                # \b ensures we match whole words only
                pattern = re.compile(r'\b' + re.escape(skill) + r'\b', re.IGNORECASE)
                category_patterns.append((skill, pattern))
            patterns[category] = category_patterns
        
        return patterns
    
    def extract_skills(self, resume_text: str) -> Dict[str, List[str]]:
        """
        Extract skills from resume text and categorize them.
        
        Args:
            resume_text: Complete resume text as string
        
        Returns:
            Dictionary with categorized skills, all sorted alphabetically
        """
        result = {}
        all_skills: Set[str] = set()
        
        for category, patterns in self.skill_patterns.items():
            found_skills: Set[str] = set()
            
            for skill_name, pattern in patterns:
                if pattern.search(resume_text):
                    found_skills.add(skill_name)
                    all_skills.add(skill_name)
            
            # Sort alphabetically and convert to list
            result[category] = sorted(found_skills)
        
        # Add all_skills as sorted list
        result["all_skills"] = sorted(all_skills)
        
        return result
    
    def add_skill(self, category: str, skill: str) -> None:
        """
        Add a new skill to a category dynamically.
        
        Args:
            category: Category to add skill to
            skill: Skill name to add
        """
        if category not in self.SKILL_CATEGORIES:
            self.SKILL_CATEGORIES[category] = []
        
        if skill not in self.SKILL_CATEGORIES[category]:
            self.SKILL_CATEGORIES[category].append(skill)
            # Recompile patterns to include new skill
            self.skill_patterns = self._compile_skill_patterns()
    
    def remove_skill(self, category: str, skill: str) -> None:
        """
        Remove a skill from a category.
        
        Args:
            category: Category to remove skill from
            skill: Skill name to remove
        """
        if category in self.SKILL_CATEGORIES and skill in self.SKILL_CATEGORIES[category]:
            self.SKILL_CATEGORIES[category].remove(skill)
            # Recompile patterns to exclude removed skill
            self.skill_patterns = self._compile_skill_patterns()


skill_extractor = SkillExtractor()
