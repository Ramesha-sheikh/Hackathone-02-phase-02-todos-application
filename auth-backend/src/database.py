"""
Database configuration for the Authentication service.
Handles database connection settings and initialization.
"""
import os
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from .models.user import User
import logging

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./auth_app.db")

# Use SQLite for local development if no PostgreSQL URL is provided
if not DATABASE_URL.startswith("postgresql+asyncpg://") and not DATABASE_URL.startswith("postgresql://"):
    # For local development, we'll use SQLite
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./auth_app.db")
else:
    # For PostgreSQL (NeonDB), ensure we use asyncpg driver
    if DATABASE_URL.startswith("postgresql://"):
        # Replace with asyncpg driver for NeonDB
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif DATABASE_URL.startswith("postgres://"):
        # Handle older postgres:// format
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)

# Create async engine based on database type
if DATABASE_URL.startswith("sqlite+aiosqlite"):
    # For SQLite, we don't need asyncpg
    async_engine = create_async_engine(
        DATABASE_URL,
        echo=bool(os.getenv("DATABASE_ECHO", "")),  # Set DATABASE_ECHO=1 to enable SQL logging
    )
else:
    # For PostgreSQL (NeonDB), use asyncpg
    async_engine = create_async_engine(
        DATABASE_URL,
        echo=bool(os.getenv("DATABASE_ECHO", "")),  # Set DATABASE_ECHO=1 to enable SQL logging
        pool_size=int(os.getenv("DATABASE_POOL_SIZE", "5")),
        max_overflow=int(os.getenv("DATABASE_MAX_OVERFLOW", "10")),
        pool_pre_ping=True,  # Verify connections before use
        pool_recycle=300,    # Recycle connections every 5 minutes
    )

# Create async session maker
AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False  # Don't expire objects after commit
)

# Import all models to ensure they're registered with SQLModel
def get_models():
    """Return list of all models for database creation"""
    return [User]

# Create all tables
async def create_db_and_tables():
    """Create all database tables"""
    try:
        async with async_engine.begin() as conn:
            # Create tables if they don't exist
            await conn.run_sync(SQLModel.metadata.create_all)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")
        # In production, you might want to handle this differently
        # For now, we'll let the application continue but log the error

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency to get async database session
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()