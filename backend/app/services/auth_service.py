from datetime import datetime
from typing import Optional
from bson import ObjectId
from app.db.mongodb import mongodb
from app.models.user import UserInDB, Role
from app.schemas.user import UserCreate, UserLogin
from app.core.security import verify_password, get_password_hash
from app.core.jwt import create_access_token


class AuthService:
    """Service for handling authentication operations."""
    
    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """
        Retrieve a user by email from the database.
        
        Args:
            email: User's email address
        
        Returns:
            UserInDB if found, None otherwise
        """
        user_doc = await mongodb.database.users.find_one({"email": email})
        if user_doc:
            user_doc["_id"] = str(user_doc["_id"])
            return UserInDB(**user_doc)
        return None
    
    async def create_user(self, user_data: UserCreate) -> UserInDB:
        """
        Create a new user in the database.
        
        Args:
            user_data: User creation schema
        
        Returns:
            Created UserInDB instance
        
        Raises:
            ValueError: If email already exists
        """
        existing_user = await self.get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError("Email already registered")
        
        user_dict = {
            "full_name": user_data.full_name,
            "email": user_data.email,
            "password_hash": get_password_hash(user_data.password),
            "role": Role.STUDENT,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await mongodb.database.users.insert_one(user_dict)
        user_dict["_id"] = str(result.inserted_id)
        
        return UserInDB(**user_dict)
    
    async def authenticate_user(self, login_data: UserLogin) -> Optional[UserInDB]:
        """
        Authenticate a user with email and password.
        
        Args:
            login_data: User login credentials
        
        Returns:
            UserInDB if authentication successful, None otherwise
        """
        user = await self.get_user_by_email(login_data.email)
        if not user:
            return None
        
        if not verify_password(login_data.password, user.password_hash):
            return None
        
        return user
    
    async def login(self, login_data: UserLogin) -> dict:
        """
        Login a user and return access token.
        
        Args:
            login_data: User login credentials
        
        Returns:
            Dictionary with access_token and user info
        
        Raises:
            ValueError: If credentials are invalid
        """
        user = await self.authenticate_user(login_data)
        if not user:
            raise ValueError("Invalid email or password")
        
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


auth_service = AuthService()
