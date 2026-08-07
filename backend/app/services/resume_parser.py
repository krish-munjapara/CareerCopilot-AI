import re
from pathlib import Path
from typing import Dict, List, Optional
import pdfplumber


class ResumeParser:
    """Service for parsing resume PDF files and extracting structured data."""
    
    # Regex patterns for extracting information
    EMAIL_PATTERN = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    PHONE_PATTERN = r'(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}'
    
    # Section headers to identify different sections
    SECTION_PATTERNS = {
        'skills': r'(?:skills|technical\s+skills|core\s+competencies|technologies)',
        'education': r'(?:education|academic\s+background|qualifications)',
        'experience': r'(?:experience|work\s+experience|employment\s+history|professional\s+experience)',
        'projects': r'(?:projects|personal\s+projects|key\s+projects)'
    }
    
    def parse_resume(self, file_path: str) -> Dict:
        """
        Parse a resume PDF file and extract structured information.
        
        Args:
            file_path: Path to the PDF file
        
        Returns:
            Dictionary containing extracted resume data
        
        Raises:
            FileNotFoundError: If file doesn't exist
            ValueError: If file is not a valid PDF or parsing fails
        """
        file_path_obj = Path(file_path)
        
        if not file_path_obj.exists():
            raise FileNotFoundError(f"Resume file not found: {file_path}")
        
        if file_path_obj.suffix.lower() != '.pdf':
            raise ValueError(f"Invalid file type. Expected PDF, got: {file_path_obj.suffix}")
        
        try:
            with pdfplumber.open(file_path) as pdf:
                # Extract text from all pages
                full_text = ""
                pages_text = []
                
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        full_text += page_text + "\n"
                        pages_text.append(page_text)
                
                if not full_text.strip():
                    raise ValueError("No text could be extracted from the PDF")
                
                # Extract information
                result = {
                    "full_text": full_text.strip(),
                    "pages": len(pdf.pages),
                    "email": self._extract_email(full_text),
                    "phone": self._extract_phone(full_text),
                    "skills": self._extract_section(full_text, 'skills'),
                    "education": self._extract_section(full_text, 'education'),
                    "experience": self._extract_section(full_text, 'experience'),
                    "projects": self._extract_section(full_text, 'projects')
                }
                
                return result
                
        except Exception as e:
            if isinstance(e, (FileNotFoundError, ValueError)):
                raise
            raise ValueError(f"Failed to parse PDF: {str(e)}")
    
    def _extract_email(self, text: str) -> Optional[str]:
        """
        Extract email address from text using regex.
        
        Args:
            text: Text to search
        
        Returns:
            First found email or None
        """
        matches = re.findall(self.EMAIL_PATTERN, text, re.IGNORECASE)
        return matches[0] if matches else None
    
    def _extract_phone(self, text: str) -> Optional[str]:
        """
        Extract phone number from text using regex.
        
        Args:
            text: Text to search
        
        Returns:
            First found phone number or None
        """
        matches = re.findall(self.PHONE_PATTERN, text)
        return matches[0] if matches else None
    
    def _extract_section(self, text: str, section_name: str) -> List[str]:
        """
        Extract a specific section from resume text.
        
        Args:
            text: Full resume text
            section_name: Name of section to extract (skills, education, etc.)
        
        Returns:
            List of lines/bullets from the section
        """
        pattern = self.SECTION_PATTERNS.get(section_name.lower())
        if not pattern:
            return []
        
        # Find section start
        section_match = re.search(pattern, text, re.IGNORECASE)
        if not section_match:
            return []
        
        # Get text from section start
        section_start = section_match.start()
        section_text = text[section_start:]
        
        # Find next section header (to know where this section ends)
        lines = section_text.split('\n')
        section_lines = []
        
        for line in lines:
            line_stripped = line.strip()
            
            # Check if this line is a new section header
            is_new_section = False
            for other_section, other_pattern in self.SECTION_PATTERNS.items():
                if other_section != section_name and re.search(other_pattern, line_stripped, re.IGNORECASE):
                    is_new_section = True
                    break
            
            if is_new_section:
                break
            
            # Add non-empty lines
            if line_stripped and not re.match(pattern, line_stripped, re.IGNORECASE):
                section_lines.append(line_stripped)
        
        # Clean up the extracted lines
        cleaned_lines = []
        for line in section_lines:
            # Remove bullet points and special characters
            cleaned = re.sub(r'^[\s\•\-\*\●\○\◆\◇]+', '', line)
            cleaned = cleaned.strip()
            if cleaned:
                cleaned_lines.append(cleaned)
        
        return cleaned_lines[:10]  # Limit to top 10 items per section


resume_parser = ResumeParser()
