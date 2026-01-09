# Task CRUD Operations Feature Specification

## Feature Description
This feature enables users to create, read, update, and delete their personal tasks in the todo application. Each task is associated with a specific user and is accessible only by that user.

## User Stories

### Create Task
As a logged-in user, I want to create a new task so that I can keep track of my responsibilities.

**Acceptance Criteria**:
- User can submit a form with task title (required, 1-200 chars) and description (optional)
- Task is saved to database with user_id matching the authenticated user
- Created task is returned with all relevant fields
- User receives appropriate feedback on success or failure

### Read Tasks
As a logged-in user, I want to view all my tasks so that I can manage my responsibilities.

**Acceptance Criteria**:
- Only tasks belonging to the authenticated user are returned
- Tasks are returned with all relevant fields (id, title, description, completion status, timestamps)
- Response includes appropriate metadata for pagination if needed

### Update Task
As a logged-in user, I want to update my task details so that I can keep my information current.

**Acceptance Criteria**:
- User can update title, description, and other modifiable fields
- Only the task owner can update the task
- Updated task is returned with all relevant fields
- Appropriate validation is applied to input

### Delete Task
As a logged-in user, I want to delete tasks I no longer need so that I can keep my list clean.

**Acceptance Criteria**:
- Only the task owner can delete the task
- Task is removed from database
- Appropriate success/failure response is returned

## Technical Requirements

### Data Model
- Task entity with fields: id, user_id, title, description, completed, created_at, updated_at
- user_id must match the authenticated user
- Title length: 1-200 characters
- Description: optional, up to 1000 characters

### API Endpoints
- POST /api/{user_id}/tasks - Create task
- GET /api/{user_id}/tasks - Get all user's tasks
- GET /api/{user_id}/tasks/{id} - Get specific task
- PUT /api/{user_id}/tasks/{id} - Update task
- DELETE /api/{user_id}/tasks/{id} - Delete task

### Security
- All endpoints require valid JWT authentication
- User ownership validation on every operation
- 403 Forbidden if user attempts to access another user's task