from datetime import datetime
from bson import ObjectId
from app.db.mongodb import mongodb
from app.schemas.job import JobCreate


class JobService:
    """Service for handling job description operations."""
    
    async def create_job(self, job_data: JobCreate) -> dict:
        """
        Create a new job description in MongoDB.
        
        Args:
            job_data: Job creation schema
        
        Returns:
            Dictionary with job_id
        """
        job_dict = {
            "title": job_data.title,
            "company": job_data.company,
            "description": job_data.description,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await mongodb.database.jobs.insert_one(job_dict)
        job_id = str(result.inserted_id)
        
        return {"job_id": job_id}


job_service = JobService()
