from fastapi import APIRouter, UploadFile, HTTPException, status, Depends
from app.services.resume_service import resume_service
from app.core.jwt import get_current_active_user
from app.models.user import UserInDB
from app.db.mongodb import mongodb
from datetime import datetime

router = APIRouter()


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_resume(file: UploadFile, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Upload a resume PDF file.

    Args:
        file: PDF file to upload (max 5 MB)
        current_user: Authenticated user

    Returns:
        Upload confirmation with filename and metadata

    Raises:
        HTTPException: If file validation fails (400)
        HTTPException: If file save fails (500)
    """
    try:
        result = await resume_service.save_file(file)

        # Save resume metadata to MongoDB
        resume_doc = {
            "user_id": str(current_user.id),
            "filename": result["filename"],
            "file_path": result["file_path"],
            "file_size": result["file_size"],
            "content_type": result["content_type"],
            "uploaded_at": datetime.utcnow()
        }

        # Check if user already has a resume and update it, or insert new
        existing_resume = await mongodb.database.resumes.find_one({"user_id": str(current_user.id)})
        if existing_resume:
            await mongodb.database.resumes.update_one(
                {"user_id": str(current_user.id)},
                {"$set": resume_doc}
            )
        else:
            await mongodb.database.resumes.insert_one(resume_doc)

        return {
            "message": "Resume uploaded successfully",
            "filename": result["filename"],
            "file_size": result["file_size"],
            "content_type": result["content_type"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error during upload: {str(e)}"
        )


@router.get("/{resume_id}", status_code=status.HTTP_200_OK)
async def get_resume(resume_id: str, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Get resume by ID.

    Args:
        resume_id: Resume ID
        current_user: Authenticated user

    Returns:
        Resume data

    Raises:
        HTTPException: If resume not found (404)
    """
    try:
        resume = await mongodb.database.resumes.find_one({
            "_id": ObjectId(resume_id),
            "user_id": str(current_user.id)
        })

        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume not found"
            )

        resume["_id"] = str(resume["_id"])
        return resume
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve resume: {str(e)}"
        )
