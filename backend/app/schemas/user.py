from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class Role(str, Enum):
    """User role enumeration for access control."""
    STUDENT = "student"
    ADMIN = "admin"


class AuthProvider(str, Enum):
    """Authentication provider enumeration."""
    EMAIL = "email"
    GOOGLE = "google"


class UserCreate(BaseModel):
    """
    Schema for user registration/creation requests.
    
    This model validates incoming user registration data. It includes only the
    fields needed to create a new user account. The password will be hashed
    before storage in the database.
    
    Fields:
        full_name: User's full name (1-100 characters)
        email: Valid email address (will be unique in database)
        password: Raw password (minimum 8 characters, will be hashed)
    
    Validation:
        - Email format is validated by EmailStr
        - Password must be at least 8 characters
    """
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    
    @field_validator('password')
    @classmethod
    def password_strength(cls, v: str) -> str:
        """Ensure password meets minimum security requirements."""
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v


class UserLogin(BaseModel):
    """
    Schema for user login/authentication requests.
    
    This model validates incoming login credentials. It contains only the
    fields required for authentication - email and password.
    
    Fields:
        email: User's email address
        password: User's password (will be compared against hash)
    """
    email: EmailStr
    password: str


class GoogleAuthRequest(BaseModel):
    """
    Schema for Google authentication requests.
    
    This model validates the Google ID token received from the frontend.
    
    Fields:
        id_token: Google ID token from Google Identity Services
    """
    id_token: str


class UserResponse(BaseModel):
    """
    Schema for user data in API responses.
    
    This model defines what user information is safe to return to clients.
    It excludes sensitive data like password_hash and includes only the
    fields needed for display and identification.
    
    Fields:
        id: User's unique identifier
        full_name: User's full name
        email: User's email address
        role: User's role (student or admin)
        auth_provider: Authentication provider
        profile_picture: URL to profile picture
        created_at: Account creation timestamp
    
    Security:
        - Excludes password_hash
        - Excludes is_active (internal use)
        - Excludes updated_at (internal use)
        - Excludes google_sub (internal use)
    """
    id: str
    full_name: str
    email: EmailStr
    role: Role
    auth_provider: AuthProvider
    profile_picture: Optional[str] = None
    created_at: datetime
