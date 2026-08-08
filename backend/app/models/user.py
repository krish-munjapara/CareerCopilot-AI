from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from pydantic.config import ConfigDict


class Role(str, Enum):
    """User role enumeration for access control."""
    STUDENT = "student"
    ADMIN = "admin"


class AuthProvider(str, Enum):
    """Authentication provider enumeration."""
    EMAIL = "email"
    GOOGLE = "google"


class UserInDB(BaseModel):
    """
    Internal database model representing a user document in MongoDB.
    
    This model contains all fields stored in the database including sensitive data
    like password_hash. It should never be directly exposed to API responses.
    
    Fields:
        id: MongoDB ObjectId (will be converted to string)
        full_name: User's full name
        email: User's email address (unique)
        password_hash: Bcrypt hash of the user's password (null for Google-only accounts)
        role: User's role (student or admin)
        is_active: Account status flag
        auth_provider: Authentication provider (email or google)
        google_sub: Google account unique identifier (for Google auth)
        profile_picture: URL to user's profile picture
        created_at: Timestamp when user was created
        updated_at: Timestamp when user was last updated
        last_login_at: Timestamp of last successful login
    """
    model_config = ConfigDict(populate_by_name=True)
    
    id: str = Field(..., alias="_id")
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password_hash: Optional[str] = None
    role: Role = Role.STUDENT
    is_active: bool = True
    auth_provider: AuthProvider = AuthProvider.EMAIL
    google_sub: Optional[str] = None
    profile_picture: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    last_login_at: Optional[datetime] = None
