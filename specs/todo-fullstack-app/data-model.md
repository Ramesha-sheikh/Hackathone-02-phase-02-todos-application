# Data Model: Todo Full-Stack Web Application

**Feature**: Todo Full-Stack Web Application
**Date**: 2026-01-09
**Input**: Feature specification and implementation plan

## Entity Relationships

### User Entity (Managed by Better Auth)
- **id**: string (primary key, UUID)
- **email**: string (unique, indexed)
- **name**: string (optional)
- **created_at**: datetime (indexed)
- **updated_at**: datetime

*Note: User entity is managed by Better Auth, but referenced in Task entity via user_id*

### Task Entity
- **id**: integer (primary key, auto-increment)
- **user_id**: string (foreign key to User.id, indexed, required)
- **title**: string (1-200 characters, required)
- **description**: string (optional, max 1000 characters)
- **completed**: boolean (default: false, indexed)
- **created_at**: datetime (indexed, auto-generated)
- **updated_at**: datetime (auto-generated)

## Database Schema (SQLModel)

```python
from sqlmodel import SQLModel, Field, create_engine, Session
from datetime import datetime
from typing import Optional

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Foreign key to Better Auth User
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TaskRead(TaskBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime

class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = Field(default=None)
```

## API Request/Response Models

### Task Creation
**Request**:
```json
{
  "title": "string (1-200 chars)",
  "description": "string (optional)",
  "completed": "boolean (optional, default false)"
}
```

**Response**:
```json
{
  "id": "integer",
  "user_id": "string",
  "title": "string",
  "description": "string or null",
  "completed": "boolean",
  "created_at": "datetime string",
  "updated_at": "datetime string"
}
```

### Task Update
**Request**:
```json
{
  "title": "string (optional, 1-200 chars)",
  "description": "string (optional)",
  "completed": "boolean (optional)"
}
```

**Response**:
```json
{
  "id": "integer",
  "user_id": "string",
  "title": "string",
  "description": "string or null",
  "completed": "boolean",
  "created_at": "datetime string",
  "updated_at": "datetime string"
}
```

## Indexes
- `user_id`: For efficient user-specific queries
- `completed`: For filtering completed vs incomplete tasks
- `created_at`: For chronological ordering

## Constraints
- All tasks must have a valid user_id (foreign key constraint)
- Title length must be between 1-200 characters
- Only the task owner (matching user_id) can modify/delete tasks
- created_at and updated_at are automatically managed by the system

## Data Flow
1. User authenticates and receives JWT token
2. Frontend includes JWT in API request headers
3. Backend validates JWT and extracts user_id
4. Backend verifies user_id matches task's user_id for operations
5. Backend performs requested operation on task
6. Backend returns updated task data