from fastapi import APIRouter, HTTPException, status
from app.schemas.job import JobCreate, JobResponse
from app.services.job_service import job_service

router = APIRouter()


@router.post("/upload", status_code=status.HTTP_201_CREATED, response_model=JobResponse)
async def upload_job(job_data: JobCreate):
    """
    Upload a job description.
    
    Args:
        job_data: Job description details (title, company, description)
    
    Returns:
        Job ID and success message
    
    Raises:
        HTTPException: If job creation fails (500)
    """
    try:
        result = await job_service.create_job(job_data)
        return {
            "job_id": result["job_id"],
            "message": "Job Description uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create job description: {str(e)}"
        )
