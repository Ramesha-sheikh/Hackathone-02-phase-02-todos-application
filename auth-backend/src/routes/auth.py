"""
Authentication routes for the Authentication service.
Handles user registration, login, and token management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Body, Form
from datetime import timedelta
from typing import Optional
from ..models.user import User, UserCreate, UserRead
from ..dependencies import create_access_token
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_async_session
from sqlmodel import select
from passlib.context import CryptContext
import re
import logging
from pydantic import BaseModel

# Model for authentication response
class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserRead

# Initialize password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="", tags=["auth"])

def verify_email(email: str) -> bool:
    """Verify if email format is valid"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)

def validate_password_strength(password: str) -> list:
    """Validate password strength and return list of issues"""
    issues = []
    
    if len(password) < 8:
        issues.append("Password must be at least 8 characters long")
    
    if not re.search(r"[A-Z]", password):
        issues.append("Password must contain at least one uppercase letter")
    
    if not re.search(r"[a-z]", password):
        issues.append("Password must contain at least one lowercase letter")
    
    if not re.search(r"\d", password):
        issues.append("Password must contain at least one digit")
    
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        issues.append("Password must contain at least one special character")
    
    return issues

@router.post("/register", response_model=AuthResponse)
async def register_user(
    user_create: UserCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """
    Register a new user with email and password.
    """
    try:
        # Validate email format
        if not verify_email(user_create.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )

        # Validate password strength
        password_issues = validate_password_strength(user_create.password)
        if password_issues:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Password does not meet requirements: {'; '.join(password_issues)}"
            )

        # Check if user already exists
        existing_user = await session.execute(
            select(User).where(User.email == user_create.email)
        )
        if existing_user.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Hash the password
        hashed_password = hash_password(user_create.password)

        # Create new user
        user = User(
            email=user_create.email,
            name=user_create.name,
            hashed_password=hashed_password
        )

        session.add(user)
        await session.commit()
        await session.refresh(user)

        # Create access token for the newly registered user
        access_token_expires = timedelta(hours=1)  # Same as login
        access_token = create_access_token(
            data={"user_id": user.id, "email": user.email},
            expires_delta=access_token_expires
        )

        logger.info(f"New user registered: {user.email}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "created_at": user.created_at,
                "updated_at": user.updated_at
            }
        }
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Unexpected error during registration: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during registration"
        )

@router.post("/login", response_model=AuthResponse)
async def login_user(
    email: str = Form(...),
    password: str = Form(...),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Authenticate user and return JWT token.
    """
    try:
        # Find user by email
        user_result = await session.execute(
            select(User).where(User.email == email)
        )
        user = user_result.scalar_one_or_none()

        if not user or not verify_password(password, user.hashed_password):
            logger.warning(f"Failed login attempt for email: {email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create access token
        access_token_expires = timedelta(hours=1)  # Shorter token lifetime for security
        access_token = create_access_token(
            data={"user_id": user.id, "email": user.email},
            expires_delta=access_token_expires
        )

        logger.info(f"Successful login for user: {user.email}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "created_at": user.created_at,
                "updated_at": user.updated_at
            }
        }
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during login"
        )

@router.post("/refresh")
async def refresh_token():
    """
    Refresh the access token.
    """
    # In a real implementation, you would implement refresh token functionality
    # This is a placeholder that would be implemented with actual refresh token logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Refresh token functionality not yet implemented"
    )