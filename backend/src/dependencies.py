"""
JWT authentication dependencies for the Todo application.
Handles JWT token verification and user identification by validating tokens from auth service.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Dict, Optional
import os
from datetime import datetime, timedelta
import logging
import pathlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize security scheme
security = HTTPBearer()

# Get secret key from environment - this should match the auth service
TODO_SERVICE_SECRET = os.getenv("TODO_SERVICE_SECRET")
BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
AUTH_SECRET_KEY = os.getenv("AUTH_SECRET_KEY")

logger.info(f"Environment variables - TODO_SERVICE_SECRET: {'SET' if TODO_SERVICE_SECRET else 'NOT SET'}")
logger.info(f"Environment variables - BETTER_AUTH_SECRET: {'SET' if BETTER_AUTH_SECRET else 'NOT SET'}")
logger.info(f"Environment variables - AUTH_SECRET_KEY: {'SET' if AUTH_SECRET_KEY else 'NOT SET'}")

# Try loading .env file directly as a fallback
if not (TODO_SERVICE_SECRET or BETTER_AUTH_SECRET or AUTH_SECRET_KEY):
    logger.info("Secret key not found in environment, attempting to load .env file directly...")
    from dotenv import load_dotenv
    import pathlib
    env_path = pathlib.Path(__file__).parent.parent.parent / ".env"  # Go to backend directory
    if env_path.exists():
        load_dotenv(env_path)
        TODO_SERVICE_SECRET = os.getenv("TODO_SERVICE_SECRET")
        BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
        AUTH_SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
        logger.info(f"After loading .env - TODO_SERVICE_SECRET: {'SET' if TODO_SERVICE_SECRET else 'NOT SET'}")

SECRET_KEY = TODO_SERVICE_SECRET or BETTER_AUTH_SECRET or AUTH_SECRET_KEY or ""

if not SECRET_KEY:
    logger.error("CRITICAL: No secret key found! This will cause authentication to fail.")
    logger.error("Make sure your .env file contains TODO_SERVICE_SECRET, BETTER_AUTH_SECRET, or AUTH_SECRET_KEY")
else:
    logger.info(f"Secret key loaded successfully, length: {len(SECRET_KEY)}")
ALGORITHM = "HS256"

def verify_token(token: str) -> Optional[Dict]:
    """
    Verify JWT token from auth service and return payload if valid
    """
    logger.info(f"SECRET_KEY status in verify_token: {'SET' if SECRET_KEY else 'NOT SET'}")
    logger.info(f"SECRET_KEY length: {len(SECRET_KEY) if SECRET_KEY else 0}")

    if not SECRET_KEY:
        logger.error("Server configuration error: Missing secret key for token verification")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server configuration error: Missing secret key for token verification"
        )

    try:
        # Decode the token issued by auth service
        logger.info("Attempting to decode token...")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.info(f"Token decoded successfully: {payload}")

        # Check if token is expired
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.now(timezone.utc):
            logger.warning("Token expired")
            return None

        return payload
    except JWTError as e:
        logger.error(f"Token verification failed: {str(e)}")
        logger.error(f"Token being verified: {token[:20]}..." if token else 'None')
        return None

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    """
    Dependency to get current user from JWT token issued by auth service
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