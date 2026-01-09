"""
User model for the Authentication service.
Represents users in the database.
"""
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class UserBase(SQLModel):
    """Base model for User with common fields"""
    email: str = Field(unique=True, nullable=False, max_length=255)
    name: Optional[str] = Field(default=None, max_length=255)

class User(UserBase, table=True):
    """User model for database storage"""
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    hashed_password: str = Field(nullable=False, max_length=255)

class UserRead(UserBase):
    """Model for returning user data"""
    id: str
    created_at: datetime
    updated_at: datetime

class UserCreate(UserBase):
    """Model for creating new users"""
    password: str

class UserUpdate(SQLModel):
    """Model for updating user fields"""
    name: Optional[str] = Field(default=None, max_length=255)
    email: Optional[str] = Field(default=None, max_length=255)