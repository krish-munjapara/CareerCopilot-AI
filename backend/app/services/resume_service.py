import os
import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException, status

# Configuration
UPLOAD_DIR = Path("uploads/resumes")
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_CONTENT_TYPE = "application/pdf"


class ResumeService:
    """Service for handling resume file uploads."""
    
    def __init__(self):
        # Ensure upload directory exists
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    
    def validate_file(self, file: UploadFile) -> None:
        """
        Validate uploaded file.
        
        Args:
            file: The uploaded file to validate
        
        Raises:
            HTTPException: If file validation fails
        """
        # Check content type
        if file.content_type != ALLOWED_CONTENT_TYPE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type. Only PDF files are allowed. Got: {file.content_type}"
            )
        
        # Check file size
        file.file.seek(0, os.SEEK_END)
        file_size = file.file.tell()
        file.file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large. Maximum size is 5 MB. Got: {file_size / (1024 * 1024):.2f} MB"
            )
        
        if file_size == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File is empty"
            )
    
    async def save_file(self, file: UploadFile) -> dict:
        """
        Save uploaded file to disk with unique filename.
        
        Args:
            file: The uploaded file to save
        
        Returns:
            Dictionary with file information
        
        Raises:
            HTTPException: If file save fails
        """
        # Validate file
        self.validate_file(file)
        
        # Generate unique filename
        file_extension = ".pdf"
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        try:
            file.file.seek(0)
            content = await file.read()
            file_path.write_bytes(content)
            
            # Get file size
            file_size =len(content)
            
            return {
                "filename": unique_filename,
                "file_size": file_size,
                "content_type": ALLOWED_CONTENT_TYPE,
                "file_path": str(file_path)
            }
        except Exception as e:
            # Clean up if save fails
            if file_path.exists():
                file_path.unlink()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save file: {str(e)}"
            )


resume_service = ResumeService()
