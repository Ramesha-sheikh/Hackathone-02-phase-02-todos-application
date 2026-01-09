"""
JWT authentication dependencies for the Authentication service.
Handles JWT token verification and user identification.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Dict, Optional
import os
from datetime import datetime, timedelta, timezone
import secrets
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize security scheme
security = HTTPBearer()

# Get secret key from environment - generate a secure fallback if not set
SECRET_KEY = os.getenv("AUTH_SECRET_KEY", "")

# If no secret key is provided, generate a secure random one (for development only)
if not SECRET_KEY:
    logger.warning("AUTH_SECRET_KEY not set in environment. Generating temporary key for development.")
    SECRET_KEY = secrets.token_urlsafe(32)
    logger.info("Generated temporary secret key for development. Set AUTH_SECRET_KEY environment variable for production.")

ALGORITHM = "HS256"

def verify_token(token: str) -> Optional[Dict]:
    """
    Verify JWT token and return payload if valid
    """
    if not SECRET_KEY:
        logger.error("Server configuration error: Missing secret key")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server configuration error: Missing secret key"
        )

    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Check if token is expired
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.now(timezone.utc):
            logger.warning("Token expired")
            return None

        return payload
    except JWTError as e:
        logger.warning(f"Token verification failed: {str(e)}")
        return None

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    """
    Dependency to get current user from JWT token
    """
    token = credentials.credentials

    user_data = verify_token(token)
    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Extract user info from token
    user_id = user_data.get("user_id") or user_data.get("sub")
    email = user_data.get("email")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing user information",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "id": user_id,
        "email": email
    }

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a new access token with expiration
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Default to 1 hour if not specified
        expire = datetime.now(timezone.utc) + timedelta(hours=1)

    to_encode.update({"exp": expire.timestamp()})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt