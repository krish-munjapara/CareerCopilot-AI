from datetime import datetime
from typing import Optional
from bson import ObjectId
from app.db.mongodb import mongodb
from app.models.user import UserInDB, Role, AuthProvider
from app.schemas.user import UserCreate, UserLogin, GoogleAuthRequest
from app.core.security import verify_password, get_password_hash
from app.core.jwt import create_access_token
from jose import jwt
from app.core.config import get_settings
import httpx
import logging

settings = get_settings()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AuthService:
    """Service for handling authentication operations."""
    
    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """
        Retrieve a user by email from the database.
        
        Args:
            email: User's email address (normalized)
        
        Returns:
            UserInDB if found, None otherwise
        """
        normalized_email = email.lower().strip()
        user_doc = await mongodb.database.users.find_one({"email": normalized_email})
        if user_doc:
            user_doc["_id"] = str(user_doc["_id"])
            return UserInDB(**user_doc)
        return None
    
    async def get_user_by_google_sub(self, google_sub: str) -> Optional[UserInDB]:
        """
        Retrieve a user by Google subject identifier.
        
        Args:
            google_sub: Google account unique identifier
        
        Returns:
            UserInDB if found, None otherwise
        """
        user_doc = await mongodb.database.users.find_one({"google_sub": google_sub})
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
        normalized_email = user_data.email.lower().strip()
        existing_user = await self.get_user_by_email(normalized_email)
        if existing_user:
            raise ValueError("Email already registered")
        
        user_dict = {
            "full_name": user_data.full_name,
            "email": normalized_email,
            "password_hash": get_password_hash(user_data.password),
            "role": Role.STUDENT,
            "is_active": True,
            "auth_provider": AuthProvider.EMAIL,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await mongodb.database.users.insert_one(user_dict)
        user_dict["_id"] = str(result.inserted_id)
        
        return UserInDB(**user_dict)
    
    async def create_google_user(self, google_sub: str, email: str, full_name: str, picture: Optional[str] = None) -> UserInDB:
        """
        Create a new user from Google authentication.
        
        Args:
            google_sub: Google account unique identifier
            email: User's email from Google
            full_name: User's full name from Google
            picture: Profile picture URL from Google
        
        Returns:
            Created UserInDB instance
        
        Raises:
            ValueError: If email already exists
        """
        normalized_email = email.lower().strip()
        existing_user = await self.get_user_by_email(normalized_email)
        if existing_user:
            raise ValueError("Email already registered")
        
        user_dict = {
            "full_name": full_name,
            "email": normalized_email,
            "password_hash": None,
            "role": Role.STUDENT,
            "is_active": True,
            "auth_provider": AuthProvider.GOOGLE,
            "google_sub": google_sub,
            "profile_picture": picture,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await mongodb.database.users.insert_one(user_dict)
        user_dict["_id"] = str(result.inserted_id)
        
        return UserInDB(**user_dict)
    
    async def link_google_account(self, user_id: str, google_sub: str, picture: Optional[str] = None) -> UserInDB:
        """
        Link Google account to existing email/password user.
        
        Args:
            user_id: Existing user's ID (string)
            google_sub: Google account unique identifier
            picture: Profile picture URL from Google
        
        Returns:
            Updated UserInDB instance
        
        Raises:
            ValueError: If user not found
        """
        update_data = {
            "google_sub": google_sub,
            "updated_at": datetime.utcnow()
        }
        if picture:
            update_data["profile_picture"] = picture
        
        # Convert string ID to ObjectId for MongoDB query
        try:
            object_id = ObjectId(user_id)
        except Exception:
            logger.error(f"Invalid user ID format: {user_id}")
            raise ValueError("Invalid user ID")
        
        # Update the user document
        result = await mongodb.database.users.update_one(
            {"_id": object_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            logger.error(f"User not found with ID: {user_id}")
            raise ValueError("User not found")
        
        # Fetch the updated user document
        user_doc = await mongodb.database.users.find_one({"_id": object_id})
        if not user_doc:
            logger.error(f"User document not found after update: {user_id}")
            raise ValueError("User not found")
        
        user_doc["_id"] = str(user_doc["_id"])
        return UserInDB(**user_doc)
    
    async def verify_google_token(self, id_token: str) -> dict:
        """
        Verify Google ID token using Google's public keys.
        
        Args:
            id_token: Google ID token from frontend
        
        Returns:
            Decoded token payload if valid
        
        Raises:
            ValueError: If token is invalid or verification fails
        """
        try:
            logger.info("Attempting to verify Google token")
            # Verify token with Google
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}"
                )
                if response.status_code != 200:
                    logger.error(f"Google token verification failed with status {response.status_code}")
                    raise ValueError("Invalid Google token")
                
                token_info = response.json()
                logger.info(f"Token info received for email: {token_info.get('email', 'unknown')}")
                
                # Verify audience matches our client ID
                if token_info.get("aud") != settings.GOOGLE_CLIENT_ID:
                    logger.error(f"Token audience mismatch. Expected: {settings.GOOGLE_CLIENT_ID}, Got: {token_info.get('aud')}")
                    raise ValueError("Invalid token audience")
                
                # Verify issuer
                if token_info.get("iss") not in ["accounts.google.com", "https://accounts.google.com"]:
                    logger.error(f"Invalid token issuer: {token_info.get('iss')}")
                    raise ValueError("Invalid token issuer")
                
                # Verify token is not expired (convert exp from string to float)
                exp = token_info.get("exp")
                if exp:
                    try:
                        exp_float = float(exp)
                        if exp_float < datetime.utcnow().timestamp():
                            logger.error("Token expired")
                            raise ValueError("Token expired")
                    except (ValueError, TypeError):
                        logger.error("Invalid token expiration format")
                        raise ValueError("Invalid token expiration")
                
                # Verify email is present
                email = token_info.get("email")
                if not email:
                    logger.error("Email not present in token")
                    raise ValueError("Email not present in token")
                
                # Verify email is verified by Google
                email_verified = token_info.get("email_verified")
                if not email_verified or email_verified != "true":
                    logger.error("Email not verified by Google")
                    raise ValueError("Email not verified by Google")
                
                logger.info("Google token verified successfully")
                return token_info
        except Exception as e:
            logger.error(f"Google token verification failed: {str(e)}")
            raise ValueError(f"Google token verification failed: {str(e)}")
    
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
        
        if not user.password_hash:
            return None  # Google-only account
        
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
        
        if not user.is_active:
            raise ValueError("Account is inactive")
        
        # Update last login
        try:
            object_id = ObjectId(user.id)
        except Exception:
            logger.error(f"Invalid user ID format: {user.id}")
            raise ValueError("Invalid user ID")
        
        await mongodb.database.users.update_one(
            {"_id": object_id},
            {"$set": {"last_login_at": datetime.utcnow()}}
        )
        
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
    
    async def login_with_google(self, google_auth: GoogleAuthRequest) -> dict:
        """
        Login or register user with Google authentication.
        
        Args:
            google_auth: Google authentication request with ID token
        
        Returns:
            Dictionary with access_token and user info
        
        Raises:
            ValueError: If Google token verification fails
        """
        logger.info("Google login request received")
        
        # Check if ID token is present
        if not google_auth.id_token:
            logger.error("No ID token provided in request")
            raise ValueError("No ID token provided")
        
        logger.info(f"ID token present: True, length: {len(google_auth.id_token)}")
        logger.info(f"Backend GOOGLE_CLIENT_ID configured: {bool(settings.GOOGLE_CLIENT_ID)}")
        if settings.GOOGLE_CLIENT_ID:
            logger.info(f"Backend GOOGLE_CLIENT_ID length: {len(settings.GOOGLE_CLIENT_ID)}")
        
        # Verify Google token
        token_info = await self.verify_google_token(google_auth.id_token)
        
        google_sub = token_info.get("sub")
        email = token_info.get("email")
        full_name = token_info.get("name", "")
        picture = token_info.get("picture")
        
        if not google_sub or not email:
            logger.error("Invalid Google token: missing required fields")
            raise ValueError("Invalid Google token: missing required fields")
        
        logger.info(f"Google email verified: {email}")
        
        # Check if user exists by Google sub
        user = await self.get_user_by_google_sub(google_sub)
        
        if user:
            # Existing Google user - login
            logger.info(f"Existing Google user found: {email}")
            if not user.is_active:
                logger.error("Account is inactive")
                raise ValueError("Account is inactive")
            
            # Update last login
            try:
                object_id = ObjectId(user.id)
            except Exception:
                logger.error(f"Invalid user ID format: {user.id}")
                raise ValueError("Invalid user ID")
            
            await mongodb.database.users.update_one(
                {"_id": object_id},
                {"$set": {"last_login_at": datetime.utcnow()}}
            )
            
            access_token = create_access_token(data={"sub": str(user.id)})
            logger.info("Application JWT generated successfully for existing user")
            
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
        
        # Check if user exists by email (account linking)
        existing_user = await self.get_user_by_email(email)
        if existing_user:
            # Link Google account to existing user
            logger.info(f"Linking Google account to existing email user: {email}")
            user = await self.link_google_account(existing_user.id, google_sub, picture)
            
            if not user.is_active:
                logger.error("Account is inactive")
                raise ValueError("Account is inactive")
            
            # Update last login
            try:
                object_id = ObjectId(user.id)
            except Exception:
                logger.error(f"Invalid user ID format: {user.id}")
                raise ValueError("Invalid user ID")
            
            await mongodb.database.users.update_one(
                {"_id": object_id},
                {"$set": {"last_login_at": datetime.utcnow()}}
            )
            
            access_token = create_access_token(data={"sub": str(user.id)})
            logger.info("Application JWT generated successfully for linked user")
            
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
        
        # New user - create account
        logger.info(f"Creating new Google user: {email}")
        user = await self.create_google_user(google_sub, email, full_name, picture)
        
        access_token = create_access_token(data={"sub": str(user.id)})
        logger.info("Application JWT generated successfully for new user")
        
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


auth_service = AuthService()
