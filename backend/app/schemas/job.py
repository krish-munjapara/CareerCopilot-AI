from pydantic import BaseModel, Field, field_validator


class JobCreate(BaseModel):
    """
    Schema for job description creation/upload requests.
    
    This model validates incoming job description data.
    
    Fields:
        title: Job title (required, 1-200 characters)
        company: Company name (optional, max 200 characters)
        description: Job description (required, minimum 100 characters)
    
    Validation:
        - Title is required
        - Description must be at least 100 characters
        - Company is optional
    """
    title: str = Field(..., min_length=1, max_length=200)
    company: str = Field("", max_length=200)
    description: str = Field(..., min_length=100)
    
    @field_validator('description')
    @classmethod
    def description_length(cls, v: str) -> str:
        """Ensure description meets minimum length requirement."""
        if len(v) < 100:
            raise ValueError('Description must be at least 100 characters long')
        return v


class JobResponse(BaseModel):
    """
    Schema for job description API responses.
    
    This model defines what job information is returned after creation.
    
    Fields:
        job_id: Unique identifier for the job
        message: Success message
    """
    job_id: str
    message: str
