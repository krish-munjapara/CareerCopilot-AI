from fastapi import APIRouter, HTTPException, status, Depends
from typing import Optional
from app.schemas.user import UserCreate, UserLogin, GoogleAuthRequest, UserResponse
from app.services.auth_service import auth_service
from app.core.jwt import create_access_token, get_current_active_user
from app.models.user import UserInDB
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """
    Register a new user.
    
    Args:
        user_data: User registration details (full_name, email, password)
    
    Returns:
        Access token and user information
    
    Raises:
        HTTPException: If email already exists (400)
    """
    try:
        user = await auth_service.create_user(user_data)
        access_token = create_access_token(data={"sub": str(user.id)})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "auth_provider": user.auth_provider,
                "profile_picture": user.profile_picture
            }
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(login_data: UserLogin):
    """
    Login a user and return access token.
    
    Args:
        login_data: User login credentials (email, password)
    
    Returns:
        Access token and user information
    
    Raises:
        HTTPException: If credentials are invalid (401)
    """
    try:
        result = await auth_service.login(login_data)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"}
        )


@router.post("/google", status_code=status.HTTP_200_OK)
async def google_auth(google_auth: GoogleAuthRequest):
    """
    Authenticate or register user with Google Sign-In.
    
    Args:
        google_auth: Google authentication request with ID token
    
    Returns:
        Access token and user information
    
    Raises:
        HTTPException: If Google token verification fails (401)
    """
    logger.info("POST /auth/google endpoint called")
    try:
        result = await auth_service.login_with_google(google_auth)
        logger.info("Google authentication successful")
        return result
    except ValueError as e:
        logger.error(f"Google authentication failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"}
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Get current authenticated user information.
    
    Args:
        current_user: Authenticated user from JWT token
    
    Returns:
        User information (excluding sensitive data)
    
    Raises:
        HTTPException: If user not authenticated (401)
        HTTPException: If user is inactive (403)
    """
    return UserResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        role=current_user.role,
        auth_provider=current_user.auth_provider,
        profile_picture=current_user.profile_picture,
        created_at=current_user.created_at
    )


@router.put("/me", response_model=UserResponse)
async def update_user_profile(
    full_name: Optional[str] = None,
    profile_picture: Optional[str] = None,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """
    Update current user's profile information.
    
    Args:
        full_name: New full name (optional)
        profile_picture: New profile picture URL (optional)
        current_user: Authenticated user from JWT token
    
    Returns:
        Updated user information
    
    Raises:
        HTTPException: If user not authenticated (401)
        HTTPException: If update fails (500)
    """
    try:
        from app.db.mongodb import mongodb
        from datetime import datetime
        
        update_data = {"updated_at": datetime.utcnow()}
        if full_name is not None:
            update_data["full_name"] = full_name
        if profile_picture is not None:
            update_data["profile_picture"] = profile_picture
        
        result = await mongodb.database.users.update_one(
            {"_id": current_user.id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update profile"
            )
        
        # Fetch updated user
        updated_user = await mongodb.database.users.find_one({"_id": current_user.id})
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return UserResponse(
            id=updated_user["_id"],
            full_name=updated_user["full_name"],
            email=updated_user["email"],
            role=updated_user["role"],
            auth_provider=updated_user["auth_provider"],
            profile_picture=updated_user.get("profile_picture"),
            created_at=updated_user["created_at"]
        )
    except Exception as e:
        logger.error(f"Profile update failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update profile: {str(e)}"
        )


@router.delete("/me", status_code=status.HTTP_200_OK)
async def delete_user_account(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Delete current user's account and all associated data.
    
    Args:
        current_user: Authenticated user from JWT token
    
    Returns:
        Success message
    
    Raises:
        HTTPException: If user not authenticated (401)
        HTTPException: If deletion fails (500)
    """
    try:
        from app.db.mongodb import mongodb
        
        # Delete user's analyses
        await mongodb.database.analyses.delete_many({"user_id": str(current_user.id)})
        
        # Delete user's resumes
        await mongodb.database.resumes.delete_many({"user_id": str(current_user.id)})
        
        # Delete user's jobs
        await mongodb.database.jobs.delete_many({"user_id": str(current_user.id)})
        
        # Delete user account
        result = await mongodb.database.users.delete_one({"_id": current_user.id})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return {"message": "Account deleted successfully"}
    except Exception as e:
        logger.error(f"Account deletion failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete account: {str(e)}"
        )
