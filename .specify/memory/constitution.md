<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: None renamed, but all were redefined with specific content
Added sections: Technology Stack (Locked), Security & Authentication Rules, Code Quality Standards, Database & Data Integrity Rules, API Design Rules, Frontend Rules, Spec-Kit Workflow Rules, Bonus Features Guidelines, Success Criteria for Phase II
Removed sections: Template placeholders [PRINCIPLE_1_NAME] through [PRINCIPLE_6_NAME], [SECTION_2_NAME], [SECTION_3_NAME]
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ Updated to reflect new constitution
  - .specify/templates/spec-template.md ✅ Updated to reflect new constitution
  - .specify/templates/tasks-template.md ✅ Updated to reflect new constitution
  - .specify/templates/commands/*.md ⚠ pending manual review
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application - Phase II (GIAIC Hackathon) Constitution

## Core Philosophy

### I. Spec-Driven Development (NON-NEGOTIABLE)
Every feature must start with a complete specification document; All code must be generated through Claude Code + Spec-Kit Plus tools; No handwritten code is allowed except for initial setup; Every line of code must be traceable to a specific task ID in the specification.

### II. Claude Code + Spec-Kit Plus Compliance
All development must follow the strict workflow: Constitution → Specify → Plan → Tasks → Implement; Har code changes must be justified through spec-driven process; All deviations from spec require constitutional amendment; Quality > Speed > Features philosophy must be maintained.

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced; Every feature must have acceptance criteria defined before implementation; Independent testability required for each user story.

### IV. Security-First Approach
Authentication and authorization must be implemented before any feature development; User ownership enforcement required for all data operations; JWT tokens must be validated on every request; No session-based auth allowed in backend - only stateless JWT.

### V. Type Safety & Error Handling
Type safety required: TypeScript (frontend) + Pydantic/SQLModel (backend) 100% use; Proper error handling: every endpoint must raise proper HTTPException; Consistent naming: snake_case (Python), camelCase (TypeScript/JS); No console.log/print statements in production code.

### VI. Multi-User Ownership Enforcement
All database records must include user_id field; User ownership must be validated in all API endpoints; Data isolation between users is mandatory; Permission checking required for all CRUD operations.

## Technology Stack (Locked - No Changes Allowed)

Frontend: Next.js 16+ (App Router only), TypeScript, Tailwind CSS
Backend: Python FastAPI, SQLModel (ORM), Neon Serverless PostgreSQL
Authentication: Better Auth with JWT tokens (same secret key for frontend & backend)
Development Workflow: Spec-Kit Plus + Claude Code (no hand-written code)
Monorepo Structure: Mandatory (hackathon-todo root folder)

## Security & Authentication Rules

- Har API endpoint user ownership enforce karega (user_id from JWT + URL match)
- JWT secret key environment variable se aayega: BETTER_AUTH_SECRET
- No session-based auth in backend → only stateless JWT
- 401 Unauthorized agar token invalid ya user_id mismatch
- Har task operation (create/read/update/delete/complete) user_id filter ke saath

## Code Quality Standards

- Type safety: TypeScript (frontend) + Pydantic/SQLModel (backend) 100% use
- Error handling: Har endpoint proper HTTPException raise karega
- Naming: snake_case (Python), camelCase (TypeScript/JS)
- Comments: Har file mein top comment → [Task ID] + [Spec reference]
- No console.log/print statements in production code
- Async/await everywhere possible (FastAPI routes, Next.js data fetching)

## Database & Data Integrity Rules

- Tasks table must have: id, user_id (string), title, description, completed, created_at, updated_at
- user_id → foreign key to Better Auth users table
- Indexes: user_id aur completed pe
- No raw SQL — sirf SQLModel expressions
- Timestamps: automatically set (default_factory=datetime.utcnow)

## API Design Rules

- Base path: /api/
- All endpoints user_id path param ke saath (e.g. /api/{user_id}/tasks)
- Request/Response: Pydantic models (strict validation)
- Pagination, filtering, sorting optional (bonus points ke liye)
- JSON responses only, consistent structure { data, message?, error? }

## Frontend Rules

- Server Components by default
- Client components only interactivity ke liye ('use client')
- API calls → dedicated api client (/lib/api.ts) with JWT interceptor
- Responsive design with Tailwind (mobile-first)
- Loading + error states har jagah

## Spec-Kit Workflow Rules (Strict Enforcement)

1. Constitution → Specify → Plan → Tasks → Implement
2. Claude Code ko har step pe relevant spec file @specs/... se reference karna zaroori
3. New feature ya change → pehle speckit.specify update, phir plan, phir tasks
4. No freestyle coding — sirf approved tasks implement

## Bonus Features Guidelines (Extra Points)

- Reusable Intelligence → Claude subagents with clear tool definitions
- Cloud-Native Blueprints → Agent Skills ke through reusable patterns
- Urdu Support → UI strings aur error messages mein Urdu option
- Voice Commands → Web Speech API integration (Phase II bonus)

## Success Criteria for Phase II

- Multi-user todo app
- Secure JWT authentication
- All 6 REST endpoints working with ownership
- Data persistent in Neon DB
- Responsive Next.js UI
- Spec-driven process ka proof (specs folder + CLAUDE.md files)
- Zero manual code (Claude Code git history se visible)

## Governance

This constitution serves as the supreme law of the project. All development activities must comply with these principles. Any deviation from these rules requires a constitutional amendment process. All pull requests and reviews must verify compliance with these principles. Code complexity must be justified by clear requirements. Use CLAUDE.md for runtime development guidance.

**Version**: 1.1.0 | **Ratified**: 2026-01-09 | **Last Amended**: 2026-01-09