"""
Settings API endpoint for managing user preferences.
"""
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Optional
from app.core.jwt import get_current_active_user
from app.models.user import UserInDB
from app.db.mongodb import mongodb
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/me", status_code=status.HTTP_200_OK)
async def get_user_settings(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Get current user's settings.
    
    Args:
        current_user: Authenticated user from JWT token
    
    Returns:
        User settings
    
    Raises:
        HTTPException: If user not authenticated (401)
        HTTPException: If retrieval fails (500)
    """
    try:
        settings_doc = await mongodb.database.settings.find_one({"user_id": str(current_user.id)})
        
        if not settings_doc:
            # Return default settings
            return {
                "user_id": str(current_user.id),
                "language": "English",
                "default_target_role": "Software Engineer",
                "default_experience_level": "Fresher",
                "default_job_type": "Full-time",
                "preferred_location": "",
                "notifications": {
                    "email": True,
                    "analysis_completed": True,
                    "new_recommendations": True,
                    "skill_gap_updates": True,
                    "security_alerts": True
                },
                "appearance": {
                    "theme": "light",
                    "compact_mode": False
                }
            }
        
        settings_doc["_id"] = str(settings_doc["_id"])
        return settings_doc
    except Exception as e:
        logger.error(f"Failed to get settings: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get settings: {str(e)}"
        )


@router.put("/me", status_code=status.HTTP_200_OK)
async def update_user_settings(
    settings: dict,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """
    Update current user's settings.
    
    Args:
        settings: Settings to update
        current_user: Authenticated user from JWT token
    
    Returns:
        Updated settings
    
    Raises:
        HTTPException: If user not authenticated (401)
        HTTPException: If update fails (500)
    """
    try:
        settings["user_id"] = str(current_user.id)
        settings["updated_at"] = datetime.utcnow()
        
        # Upsert settings
        await mongodb.database.settings.update_one(
            {"user_id": str(current_user.id)},
            {"$set": settings},
            upsert=True
        )
        
        return await get_user_settings(current_user)
    except Exception as e:
        logger.error(f"Failed to update settings: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update settings: {str(e)}"
        )


@router.delete("/analyses", status_code=status.HTTP_200_OK)
async def clear_analysis_history(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Clear user's analysis history.
    
    Args:
        current_user: Authenticated user from JWT token
    
    Returns:
        Success message
    
    Raises:
        HTTPException: If user not authenticated (401)
        HTTPException: If deletion fails (500)
    """
    try:
        result = await mongodb.database.analyses.delete_many({"user_id": str(current_user.id)})
        
        return {
            "message": f"Deleted {result.deleted_count} analyses",
            "deleted_count": result.deleted_count
        }
    except Exception as e:
        logger.error(f"Failed to clear analysis history: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to clear analysis history: {str(e)}"
        )
