# speckit.tasks.md - Phase II Todo App Implementation Tasks

## Task T-001: Monorepo & Spec-Kit Setup
Description: Project root folder aur Spec-Kit basic structure create karo
Files to create/change:
- hackathon-todo/ (root)
- .spec-kit/config.yaml
- specs/overview.md
- specs/features/task-crud.md (basic stub)
- CLAUDE.md (root level)
Acceptance Criteria:
- Folder structure plan.md ke mutabiq ho
- config.yaml mein phases aur dirs define hon

## Task T-002: Environment Setup & Secrets
Description: .env file aur important secrets define karo
Files:
- .env.example
- .gitignore (add .env)
Acceptance Criteria:
- BETTER_AUTH_SECRET
- DATABASE_URL (Neon)
- NEXT_PUBLIC_BETTER_AUTH_URL
- Sab secrets commented with explanation

## Task T-003: Backend - Database Connection & Models
Description: FastAPI backend setup + SQLModel Task model
Files:
- backend/db.py
- backend/models.py
- backend/main.py (basic app)
Acceptance Criteria:
- Task model: id, user_id (str), title, description, completed, created_at, updated_at
- user_id foreign key (string, Better Auth se match)
- Async engine + session
- Timestamps auto set

## Task T-004: JWT Authentication Dependency
Description: FastAPI mein JWT verify karne ka dependency banao
Files:
- backend/dependencies.py
- backend/main.py (add middleware/dependency)
Acceptance Criteria:
- python-jose + PyJWT use
- BETTER_AUTH_SECRET se verify
- current_user dict return (id, email)
- 401 agar token invalid

## Task T-005: Task CRUD API Routes (without ownership check first)
Description: Basic 6 endpoints banao
Files:
- backend/routes/tasks.py
- backend/main.py (include router)
Acceptance Criteria:
- GET /api/{user_id}/tasks
- POST /api/{user_id}/tasks
- GET /api/{user_id}/tasks/{id}
- PUT /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH /api/{user_id}/tasks/{id}/complete
- Pydantic models for request/response

## Task T-006: Enforce User Ownership in API
Description: Har endpoint mein ownership check add karo
Files:
- backend/routes/tasks.py
- backend/dependencies.py
Acceptance Criteria:
- current_user.id == user_id (from path)
- 403 Forbidden agar match na ho
- Har DB query .where(Task.user_id == current_user.id)

## Task T-007: Frontend - Next.js Project Setup
Description: Next.js app create aur basic layout
Files:
- frontend/app/layout.tsx
- frontend/app/page.tsx
- frontend/components/Navbar.tsx
Acceptance Criteria:
- App Router
- Tailwind configured
- Basic responsive layout

## Task T-008: Better Auth Setup in Frontend
Description: Better Auth install aur configure
Files:
- frontend/lib/auth.ts
- frontend/app/login/page.tsx
- frontend/app/signup/page.tsx
Acceptance Criteria:
- JWT enabled
- Token localStorage mein save
- Protected routes (middleware)

## Task T-009: API Client with JWT Interceptor
Description: API calls ke liye reusable client
Files:
- frontend/lib/api.ts
Acceptance Criteria:
- fetch/axios based
- Har request mein Authorization header add
- Base URL env se

## Task T-010: Task List Page
Description: Tasks fetch aur display
Files:
- frontend/app/tasks/page.tsx
- frontend/components/TaskCard.tsx
Acceptance Criteria:
- Server component
- api.getTasks() call
- Loading + error state
- Responsive grid/list

## Task T-011: Create & Edit Task Form
Description: Add new task aur edit form
Files:
- frontend/components/TaskForm.tsx
- frontend/app/tasks/new/page.tsx
- frontend/app/tasks/[id]/edit/page.tsx
Acceptance Criteria:
- Client component ('use client')
- Form validation
- Optimistic UI (optional bonus)

## Task T-012: Delete & Complete Actions
Description: Delete button aur toggle complete
Files:
- frontend/components/TaskActions.tsx
Acceptance Criteria:
- API calls with proper method
- Refresh list after action
- Confirmation dialog for delete

## Task T-013: Final Testing & Polish
Description: End-to-end test + UI polish
Files: Multiple
Acceptance Criteria:
- Login → tasks dikhein
- CRUD sab kaam kare
- Sirf apne tasks dikhein
- Mobile responsive

Yeh 13 tasks pura Phase II cover karte hain.
Har task chhota, testable aur traceable hai.
Next kya karna hai?

Is file ko speckit.tasks.md naam se save karo
Claude Code mein yeh short prompt daal do:

speckit.tasks.md ban gaya hai.
Ab T-001 se shuru kar ke ek ek task implement karo.
Pehle T-001 ke liye poora code generate karo aur files create karo.