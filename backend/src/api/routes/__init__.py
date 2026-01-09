"""
Routes module initialization for the Todo application.
"""
from fastapi import APIRouter
from . import tasks

# Create main router
router = APIRouter()

# Include task routes
router.include_router(tasks.router, prefix="", tags=["tasks"])