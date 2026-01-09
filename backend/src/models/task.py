"""
Data models for the Todo application using SQLModel.
Defines the Task entity with user ownership enforcement.
"""
from sqlmodel import SQLModel, Field, create_engine
from typing import Optional
from datetime import datetime
import uuid

class TaskBase(SQLModel):
    """Base model for Task with common fields"""
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)

class Task(TaskBase, table=True):
    """Task model with all fields for database storage"""
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Foreign key to Better Auth User
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TaskRead(TaskBase):
    """Model for returning task data with ID and timestamps"""
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime

class TaskUpdate(SQLModel):
    """Model for updating task fields"""
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = Field(default=None)

class TaskCreate(TaskBase):
    """Model for creating new tasks - extends base with user_id"""
    user_id: str