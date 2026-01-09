"""
Database setup and initialization for the Todo application.
Handles NeonDB connection and table creation.
"""
from .database_config import AsyncSessionLocal, get_async_session, create_db_and_tables