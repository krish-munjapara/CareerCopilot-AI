from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import auth_service
from app.core.jwt import create_access_token

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
                "role": user.role
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
