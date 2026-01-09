# Advanced Todo Application with NeonDB

This is a full-stack Todo application with authentication, user management, and task management features.

## Features

- User authentication (signup/login)
- Create, read, update, and delete tasks
- Task completion tracking
- Responsive UI with modern design
- Secure JWT-based authentication
- NeonDB PostgreSQL database

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- A NeonDB account (free tier available)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd phase-02Todo-Full-Stack-Web-Application
```

### 2. Set up the authentication backend

```bash
cd auth-backend
pip install -r requirements.txt
```

Create a `.env` file in the `auth-backend` directory:

```env
AUTH_SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://your_username:your_password@ep-xxx.us-east-1.aws.neon.tech/todo_auth_db?sslmode=require
```

### 3. Set up the main backend

```bash
cd ../backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```env
TODO_SERVICE_SECRET=your-super-secret-key-here
BETTER_AUTH_SECRET=your-super-secret-key-here
DATABASE_URL=postgresql://your_username:your_password@ep-xx.us-east-1.aws.neon.tech/todo_main_db?sslmode=require
```

**Note**: The secret key must be the same in both backends for JWT tokens to work properly.

### 4. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_AUTH_API_URL=http://localhost:8001
NEXT_PUBLIC_TODO_API_URL=http://localhost:8000
```

### 5. Running the Application

1. Start the auth backend:
```bash
cd auth-backend
python -m uvicorn src.main:app --host 0.0.0.0 --port 8001
```

2. Start the main backend:
```bash
cd backend
python -m uvicorn src.main:app --host 0.0.0.0 --port 8000
```

3. Start the frontend:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## NeonDB Setup

1. Go to [Neon](https://neon.tech/) and create an account
2. Create a new project
3. Get your connection string from the project dashboard
4. Use the connection string in your `.env` files as shown above

## API Endpoints

### Authentication Service (Port 8001)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user
- `GET /health` - Health check

### Todo Service (Port 8000)
- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion
- `GET /health` - Health check

## Architecture

The application follows a microservice architecture:
- Auth Backend: Handles user authentication and JWT token generation
- Main Backend: Handles task management and user data
- Frontend: React/Next.js application with responsive UI

All services communicate via REST APIs and share authentication tokens using a common secret key."# Hackathone-02-phase-02-todos-application" 
