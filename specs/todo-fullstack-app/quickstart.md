# Quickstart Guide: Todo Full-Stack Web Application

**Feature**: Todo Full-Stack Web Application
**Date**: 2026-01-09
**Status**: Ready for Development

## Overview
This guide provides step-by-step instructions to set up and run the multi-user todo application with JWT authentication and Neon PostgreSQL persistence.

## Prerequisites
- Node.js 18+ (for frontend development)
- Python 3.11+ (for backend development)
- pnpm package manager
- PostgreSQL-compatible database (Neon DB)
- Better Auth account/config

## Environment Setup

### 1. Clone and Initialize Repository
```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install frontend dependencies
cd frontend
pnpm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### 2. Environment Variables
Create `.env` files in both frontend and backend directories:

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_SECURE_COOKIE=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

**Backend (.env)**:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
BETTER_AUTH_SECRET=your-super-secret-jwt-key-here
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=your-neon-db-connection-string
```

## Running the Application

### 1. Database Setup
```bash
# Navigate to backend directory
cd backend

# Run database migrations
python -m alembic upgrade head

# Or initialize the database tables directly
python -c "from src.main import engine, SQLModel; SQLModel.metadata.create_all(engine)"
```

### 2. Running Backend (FastAPI)
```bash
cd backend
uvicorn src.main:app --reload --port 8000
```

### 3. Running Frontend (Next.js)
```bash
cd frontend
pnpm dev
```

## API Endpoints
All API endpoints require JWT authentication in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Task Management Endpoints
- GET `/api/{user_id}/tasks` - Get all tasks for user
- POST `/api/{user_id}/tasks` - Create new task
- GET `/api/{user_id}/tasks/{id}` - Get specific task
- PUT `/api/{user_id}/tasks/{id}` - Update task
- DELETE `/api/{user_id}/tasks/{id}` - Delete task
- PATCH `/api/{user_id}/tasks/{id}/complete` - Toggle task completion

## Development Workflow

### 1. Feature Development
1. Create a new branch: `git checkout -b feature/<feature-name>`
2. Update the `tasks.md` file with specific implementation tasks
3. Implement features following the spec-driven approach
4. Write tests for new functionality
5. Submit pull request for review

### 2. Testing
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
pnpm test
```

## Deployment
1. Set production environment variables
2. Build frontend: `cd frontend && pnpm build`
3. Deploy backend to hosting service
4. Configure domain and SSL certificates
5. Set up CI/CD pipeline

## Troubleshooting
- If JWT authentication fails, verify that `BETTER_AUTH_SECRET` is the same in both frontend and backend
- If database connection fails, verify the `DATABASE_URL` is correct
- For CORS issues, ensure backend allows requests from frontend origin

## Next Steps
1. Complete all tasks in `tasks.md`
2. Implement user authentication with Better Auth
3. Build responsive UI components
4. Add loading and error states
5. Test multi-user functionality and data isolation