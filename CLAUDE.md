# Claude Code Rules for Todo Full-Stack Web Application

## Project Context
This is a multi-user todo web application built as part of the GIAIC Hackathon Phase II. The project follows strict spec-driven development principles using Claude Code and Spec-Kit Plus.

## Core Development Principles
- All code must be generated through Claude Code + Spec-Kit Plus tools
- No handwritten code is allowed except for initial setup
- Every line of code must be traceable to a specific task ID in the specification
- Quality > Speed > Features philosophy must be maintained

## Technology Stack (Locked)
- Frontend: Next.js 16+ (App Router only), TypeScript, Tailwind CSS
- Backend: Python FastAPI, SQLModel (ORM), Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT tokens
- Development Workflow: Spec-Kit Plus + Claude Code

## Security Requirements
- JWT token validation on all API endpoints
- User ownership enforcement for all data operations
- No session-based authentication in backend
- All data operations must be filtered by user_id

## Code Quality Standards
- Type safety: TypeScript (frontend) + Pydantic/SQLModel (backend) 100% use
- Proper error handling: every endpoint must raise proper HTTPException
- Naming: snake_case (Python), camelCase (TypeScript/JS)
- No console.log/print statements in production code
- Async/await everywhere possible

## Database Requirements
- Tasks table with: id, user_id (string), title, description, completed, created_at, updated_at
- user_id must be foreign key to Better Auth users table
- Indexes on user_id and completed fields
- No raw SQL - only SQLModel expressions

## API Design Rules
- Base path: /api/
- All endpoints must include user_id path parameter
- Request/Response: Pydantic models with strict validation
- JSON responses only with consistent structure

## Development Workflow
1. Follow the sequence: Constitution → Specify → Plan → Tasks → Implement
2. Reference relevant spec file at @specs/... for each step
3. Update specification before implementing new features
4. No freestyle coding - only approved tasks

## Success Criteria for Phase II
- Multi-user todo app with secure JWT authentication
- All 6 REST endpoints working with ownership enforcement
- Data persisted in Neon DB
- Responsive Next.js UI
- Complete spec-driven process proof

## File Organization
- Specifications: /specs/
- Backend: /backend/
- Frontend: /frontend/
- Configuration: /.spec-kit/

This document serves as a reference for development guidelines throughout the project lifecycle.