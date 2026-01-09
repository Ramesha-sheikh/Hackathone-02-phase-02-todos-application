---
description: "Task list for Todo Full-Stack Web Application implementation"
---

# Tasks: Todo Full-Stack Web Application

**Input**: Design documents from `/specs/todo-fullstack-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create backend directory structure (backend/src/{models,services,api})
- [X] T002 [P] Create frontend directory structure (frontend/src/{components,pages,services})
- [X] T003 [P] Initialize Python project with FastAPI, SQLModel, Better Auth dependencies
- [X] T004 [P] Initialize Next.js 16+ project with TypeScript and Tailwind CSS

---
## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Setup database schema and migrations framework in backend/src/models
- [X] T006 [P] Implement authentication/authorization framework with Better Auth
- [X] T007 [P] Setup API routing and middleware structure in backend/src/api/routes
- [X] T008 Create base models/entities that all stories depend on (Task model in backend/src/models/task.py)
- [X] T009 Configure error handling and logging infrastructure in backend/src/main.py
- [X] T010 Setup environment configuration management in both frontend and backend
- [X] T011 Create JWT validation middleware to enforce user ownership

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---
## Phase 3: User Story 1 - User Registration and Login (Priority: P1) 🎯 MVP

**Goal**: Enable users to register and authenticate to access their personal todo lists

**Independent Test**: Can be fully tested by registering a new user, logging in, and receiving a valid JWT token that can be used for subsequent API requests.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T012 [P] [US1] Contract test for auth endpoints in backend/tests/contract/test_auth.py
- [X] T013 [P] [US1] Integration test for user registration flow in backend/tests/integration/test_auth.py

### Implementation for User Story 1

- [X] T014 [P] [US1] Create auth routes in backend/src/api/routes/auth.py
- [X] T015 [P] [US1] Implement login page component in frontend/src/pages/login.tsx
- [X] T016 [US1] Implement register page component in frontend/src/pages/register.tsx
- [X] T017 [US1] Add protected route wrapper in frontend/src/components/ProtectedRoute.tsx
- [X] T018 [US1] Add authentication service in frontend/src/lib/auth.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---
## Phase 4: User Story 2 - Create and Manage Personal Tasks (Priority: P1)

**Goal**: Allow users to create, view, edit, and manage their personal todo items with full CRUD operations

**Independent Test**: Can be fully tested by creating a new task, viewing it, updating it, and deleting it using authenticated API calls.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T019 [P] [US2] Contract test for tasks endpoints in backend/tests/contract/test_tasks.py
- [X] T020 [P] [US2] Integration test for task management flow in backend/tests/integration/test_tasks.py

### Implementation for User Story 2

- [X] T021 [P] [US2] Create Task model in backend/src/models/task.py
- [X] T022 [P] [US2] Create Task service in backend/src/services/task_service.py
- [X] T023 [US2] Implement tasks routes in backend/src/api/routes/tasks.py (GET, POST, PUT, DELETE)
- [X] T024 [P] [US2] Create TaskItem component in frontend/src/components/TaskItem.tsx
- [X] T025 [P] [US2] Create TaskForm component in frontend/src/components/TaskForm.tsx
- [X] T026 [US2] Implement tasks page in frontend/src/pages/index.tsx
- [X] T027 [US2] Add API service for tasks in frontend/src/services/api.ts
- [X] T028 [US2] Add user ownership validation for all task operations

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---
## Phase 5: User Story 3 - Task Completion Toggle (Priority: P2)

**Goal**: Enable users to mark their tasks as complete or incomplete

**Independent Test**: Can be fully tested by creating a task, toggling its completion status, and verifying the status change persists.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [X] T029 [P] [US3] Contract test for task completion endpoint in backend/tests/contract/test_tasks_completion.py
- [X] T030 [P] [US3] Integration test for task completion flow in backend/tests/integration/test_tasks_completion.py

### Implementation for User Story 3

- [X] T031 [P] [US3] Implement PATCH /api/{user_id}/tasks/{id}/complete endpoint in backend/src/api/routes/tasks.py
- [X] T032 [US3] Add completion toggle functionality to TaskItem component in frontend/src/components/TaskItem.tsx
- [X] T033 [US3] Update API service to support completion toggle in frontend/src/services/api.ts

**Checkpoint**: All user stories should now be independently functional

---
## Phase 6: User Story 4 - Responsive UI with Loading States (Priority: P2)

**Goal**: Provide a responsive interface that gives users feedback during operations

**Independent Test**: Can be fully tested by performing various operations and verifying appropriate loading states are shown.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [X] T034 [P] [US4] Unit test for loading states in frontend/tests/unit/test_loading_states.tsx
- [X] T035 [P] [US4] Integration test for error handling in frontend/tests/integration/test_error_handling.tsx

### Implementation for User Story 4

- [X] T036 [P] [US4] Add loading indicators to all API calls in frontend/src/services/api.ts
- [X] T037 [US4] Create LoadingSpinner component in frontend/src/components/LoadingSpinner.tsx
- [X] T038 [US4] Create ErrorMessage component in frontend/src/components/ErrorMessage.tsx
- [X] T039 [US4] Add responsive design classes with Tailwind CSS to all components
- [X] T040 [US4] Implement proper error handling in all API calls

**Checkpoint**: All user stories should now have proper loading and error states

---
## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T041 [P] Documentation updates in docs/
- [X] T042 Code cleanup and refactoring
- [X] T043 Performance optimization across all stories
- [X] T044 [P] Additional unit tests (if requested) in backend/tests/unit/ and frontend/tests/unit/
- [X] T045 Security hardening
- [X] T046 Run quickstart.md validation

---
## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on User Story 1 (auth)
- **User Story 3 (P3)**: Can start after User Story 2 completion - Builds on task functionality
- **User Story 4 (P4)**: Can start after User Story 2 completion - Enhances all existing functionality

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---
## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentication)
4. Complete Phase 4: User Story 2 (Basic Task CRUD)
5. **STOP and VALIDATE**: Test User Stories 1 and 2 together
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo
3. Add User Story 2 → Test with Story 1 → Deploy/Demo (MVP!)
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Auth)
   - Developer B: User Story 2 (Tasks CRUD) - waits for auth completion
   - Developer C: User Story 3 (Completion) - waits for tasks completion
   - Developer D: User Story 4 (UI Polish) - can start after tasks
3. Stories integrate and build upon each other

---
## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence