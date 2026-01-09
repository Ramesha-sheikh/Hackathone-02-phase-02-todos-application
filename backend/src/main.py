"""
Main FastAPI application for the Todo application.
Sets up the application, middleware, and includes routers.
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router as api_router
from .database import create_db_and_tables
from .dependencies import security
import json

# Get allowed origins from environment, default to localhost
origins_env = os.getenv("BACKEND_CORS_ORIGINS", '["http://localhost:3000", "http://localhost:8000"]')
try:
    allowed_origins = json.loads(origins_env)
except json.JSONDecodeError:
    allowed_origins = ["http://localhost:3000", "http://localhost:8000"]

# Create FastAPI app instance
app = FastAPI(title="Todo API", version="1.0.0")

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
    print(f"TODO_SERVICE_SECRET loaded: {'YES' if os.getenv('TODO_SERVICE_SECRET') else 'NO'}")
    print(f"BETTER_AUTH_SECRET loaded: {'YES' if os.getenv('BETTER_AUTH_SECRET') else 'NO'}")
    print(f"AUTH_SECRET_KEY loaded: {'YES' if os.getenv('AUTH_SECRET_KEY') else 'NO'}")
    await create_db_and_tables()

# Include API routes (includes both auth and task routes)
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    """Root endpoint for health check"""
    return {"message": "Todo API is running"}

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "todo-api"}