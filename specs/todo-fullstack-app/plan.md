# Implementation Plan: Todo Full-Stack Web Application

**Branch**: `todo-fullstack-app` | **Date**: 2026-01-09 | **Spec**: [link]
**Input**: Feature specification from `/specs/todo-fullstack-app/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a multi-user todo application with JWT authentication using Next.js 16+ frontend, FastAPI backend, and Neon PostgreSQL database. The application will enforce user ownership for all task operations and provide a responsive UI with proper loading/error states.

## Technical Context

**Language/Version**: Python 3.11, TypeScript/JavaScript
**Primary Dependencies**: Next.js 16+, FastAPI, SQLModel, Better Auth, Tailwind CSS
**Storage**: Neon PostgreSQL database
**Testing**: pytest (backend), Jest/Vitest (frontend)
**Target Platform**: Web application (responsive)
**Project Type**: Web application (frontend/backend)
**Performance Goals**: <2 second response times for API operations
**Constraints**: <200ms p95 for API calls, secure JWT token handling
**Scale/Scope**: Multi-user support with data isolation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ Spec-driven development: Following constitution requirements
- ✅ Technology stack: Using locked stack (Next.js 16+, FastAPI, SQLModel, Neon PostgreSQL)
- ✅ Security-first: JWT authentication with user ownership enforcement
- ✅ Type safety: TypeScript frontend, Pydantic/SQLModel backend
- ✅ Multi-user ownership: All data operations enforce user_id validation

## Project Structure

### Documentation (this feature)
```text
specs/todo-fullstack-app/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
```text
backend/
├── src/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   └── task_service.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth.py
│   │       └── tasks.py
│   └── main.py
└── tests/

frontend/
├── src/
│   ├── components/
│   │   ├── __init__.py
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── __init__.py
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── services/
│   │   ├── __init__.py
│   │   └── api.ts
│   ├── lib/
│   │   ├── __init__.py
│   │   └── auth.ts
│   └── app/
│       ├── globals.css
│       └── layout.tsx
└── tests/
```

**Structure Decision**: Web application structure selected with separate backend and frontend directories to accommodate the required Next.js frontend with FastAPI backend.

## Architecture Diagram (Text-based)

```
┌─────────────────┐    HTTP/HTTPS     ┌─────────────────┐
│   Frontend      │ ────────────────▶ │   Backend       │
│  (Next.js App)  │                   │  (FastAPI)      │
│                 │ ◀───────────────  │                 │
│  ┌───────────┐  │    JSON/JWT       │  ┌───────────┐  │
│  │Components │  │                   │  │   API     │  │
│  │(React)    │  │                   │  │Endpoints  │  │
│  └───────────┘  │                   │  └───────────┘  │
│                 │                   │                 │
│  ┌───────────┐  │                   │  ┌───────────┐  │
│  │   Pages   │  │                   │  │  Models   │  │
│  │(Login,Reg)│  │                   │  │(SQLModel) │  │
│  └───────────┘  │                   │  └───────────┘  │
└─────────────────┘                   │                 │
                                      │  ┌───────────┐  │
                                      │  │Services   │  │
                                      │  │(Auth,Tasks)│  │
                                      │  └───────────┘  │
                                      └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │   Database      │
                                        │ (Neon PostgreSQL)
                                        │                 │
                                        │  ┌───────────┐  │
                                        │  │  Users    │  │
                                        │  │(BetterAuth)│  │
                                        │  └───────────┘  │
                                        │                 │
                                        │  ┌───────────┐  │
                                        │  │   Tasks   │  │
                                        │  │(user_id,  │  │
                                        │  │title,desc,│  │
                                        │  │completed) │  │
                                        │  └───────────┘  │
                                        └─────────────────┘
```

## Data Flow

1. User registers/logs in via frontend → JWT token stored in browser
2. Frontend makes authenticated API calls to backend with JWT in headers
3. Backend validates JWT and enforces user_id ownership for all operations
4. Backend interacts with Neon PostgreSQL using SQLModel ORM
5. Backend returns JSON responses to frontend
6. Frontend updates UI based on responses

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Separate backend/frontend | Required by tech stack spec | Monolithic harder to scale and maintain |
| Better Auth integration | Security requirement from constitution | Custom auth more complex and less secure |