from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserCreate, UserLogin, GoogleAuthRequest, UserResponse
from app.services.auth_service import auth_service
from app.core.jwt import create_access_token, get_current_active_user
from app.models.user import UserInDB

router = APIRouter()


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
    try:
        result = await auth_service.login_with_google(google_auth)
        return result
    except ValueError as e:
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
