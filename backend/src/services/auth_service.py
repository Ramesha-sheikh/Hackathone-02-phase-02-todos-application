"""
Authentication service layer for the Todo application.
Handles business logic for authentication operations.
"""
from typing import Optional, Dict
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os


class AuthService:
    """
    Service class to handle authentication business logic
    """

    SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "")
    ALGORITHM = "HS256"

    @classmethod
    def verify_token(cls, token: str) -> Optional[Dict]:
        """
        Verify JWT token and return payload if valid
        """
        if not cls.SECRET_KEY:
            raise Exception("Server configuration error: Missing secret key")

        try:
            # Decode the token
            payload = jwt.decode(token, cls.SECRET_KEY, algorithms=[cls.ALGORITHM])

            # Check if token is expired
            exp = payload.get("exp")
            if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
                return None

            return payload
        except JWTError:
            return None

    @classmethod
    def create_access_token(cls, data: dict, expires_delta: Optional[timedelta] = None):
        """
        Create a new access token with expiration
        """
        to_encode = data.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            # Default to 7 days if not specified
            expire = datetime.utcnow() + timedelta(days=7)

        to_encode.update({"exp": expire.timestamp()})

        encoded_jwt = jwt.encode(to_encode, cls.SECRET_KEY, algorithm=cls.ALGORITHM)
        return encoded_jwt