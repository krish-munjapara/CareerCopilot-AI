from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.job import JobCreate, JobResponse
from app.services.job_service import job_service
from app.core.jwt import get_current_active_user
from app.models.user import UserInDB

router = APIRouter()


@router.post("/upload", status_code=status.HTTP_201_CREATED, response_model=JobResponse)
async def upload_job(job_data: JobCreate, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Upload a job description.
    
    Args:
        job_data: Job description details (title, company, description)
        current_user: Authenticated user
    
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
