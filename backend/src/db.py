"""
Database connection and session management for the Todo application.
Uses Neon PostgreSQL with async engine for FastAPI compatibility.
"""
from sqlmodel import create_engine, Session
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os
from typing import AsyncGenerator

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/todo_app")

# For async compatibility, ensure we use an async driver (asyncpg)
# If using PostgreSQL, replace postgresql:// with postgresql+asyncpg://
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Create async engine for FastAPI compatibility
async_engine = create_async_engine(DATABASE_URL)

# Create async session maker
AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=async_engine,
    class_=AsyncSession
)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency to get async database session
    """
    async with AsyncSessionLocal() as session:
        yield session