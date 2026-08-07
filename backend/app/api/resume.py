from fastapi import APIRouter, UploadFile, HTTPException, status
from app.services.resume_service import resume_service

router = APIRouter()


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_resume(file: UploadFile):
    """
    Upload a resume PDF file.
    
    Args:
        file: PDF file to upload (max 5 MB)
    
    Returns:
        Upload confirmation with filename and metadata
    
    Raises:
        HTTPException: If file validation fails (400)
        HTTPException: If file save fails (500)
    """
    try:
        result = await resume_service.save_file(file)
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
