"""
Main FastAPI application for the Authentication service.
Handles user authentication, registration, and token management.
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.auth import router as auth_router
from .database import create_db_and_tables
import json

# Get allowed origins from environment, default to localhost
origins_env = os.getenv("BACKEND_CORS_ORIGINS", '["http://localhost:3000", "http://localhost:8000", "http://localhost:3001"]')
try:
    allowed_origins = json.loads(origins_env)
except json.JSONDecodeError:
    allowed_origins = ["http://localhost:3000", "http://localhost:8000", "http://localhost:3001"]

# Create FastAPI app instance
app = FastAPI(title="Auth API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Event handlers for startup
@app.on_event("startup")
async def startup_event():
    """Initialize database tables on startup"""
    import os
    print(f"AUTH_SECRET_KEY loaded: {'YES' if os.getenv('AUTH_SECRET_KEY') else 'NO'}")
    await create_db_and_tables()

# Include auth routes
app.include_router(auth_router, prefix="/auth", tags=["authentication"])

@app.get("/")
def read_root():
    """Root endpoint for health check"""
    return {"message": "Auth API is running", "service": "authentication"}

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "authentication-api"}