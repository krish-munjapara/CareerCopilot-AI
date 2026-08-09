from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.job import JobCreate, JobResponse
from app.services.job_service import job_service
from app.core.jwt import get_current_active_user
from app.models.user import UserInDB
from app.db.mongodb import mongodb
from bson import ObjectId

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
        # Add user_id to job data
        job_dict = {
            "user_id": str(current_user.id),
            "title": job_data.title,
            "company": job_data.company,
            "description": job_data.description
        }

        # Check if user already has a job and update it, or insert new
        existing_job = await mongodb.database.jobs.find_one({"user_id": str(current_user.id)})
        if existing_job:
            await mongodb.database.jobs.update_one(
                {"user_id": str(current_user.id)},
                {"$set": job_dict}
            )
            job_id = str(existing_job["_id"])
        else:
            result = await mongodb.database.jobs.insert_one(job_dict)
            job_id = str(result.inserted_id)

        return {
            "job_id": job_id,
            "message": "Job Description uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create job description: {str(e)}"
        )


@router.get("/{job_id}", status_code=status.HTTP_200_OK)
async def get_job(job_id: str, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Get job by ID.

    Args:
        job_id: Job ID
        current_user: Authenticated user

    Returns:
        Job data

    Raises:
        HTTPException: If job not found (404)
    """
    try:
        job = await mongodb.database.jobs.find_one({
            "_id": ObjectId(job_id),
            "user_id": str(current_user.id)
        })

        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )

        job["_id"] = str(job["_id"])
        return job
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve job: {str(e)}"
        )
