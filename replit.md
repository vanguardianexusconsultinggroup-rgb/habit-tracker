# Habit Tracker - Replit Project Guide

## Overview

This is a habit tracking web application built with a modern full-stack architecture. Users can create, track, and manage their daily habits, view progress statistics, and maintain streaks. The application features daily, weekly, and monthly views with a clean Material Design 3 inspired interface.

**Core Purpose**: Help users build better habits through daily tracking, visual progress feedback, and streak maintenance.

**Tech Stack**:
- Frontend: React with TypeScript, Vite, TailwindCSS, shadcn/ui components
- Backend: Express.js with TypeScript
- Database: PostgreSQL with Drizzle ORM
- Authentication: Replit Auth (OpenID Connect)
- State Management: TanStack Query (React Query)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component-Based React Application**
- Uses functional components with hooks (useState, useEffect, custom hooks)
- Component library: shadcn/ui (Radix UI primitives with custom styling)
- Styling: TailwindCSS with custom design system (Material Design 3 principles)
- Routing: Wouter (lightweight client-side routing)
- Type safety: Full TypeScript implementation with shared types

**Key Design Decisions**:
- **Monorepo Structure**: Client and server code separated but share TypeScript types via `shared/` directory
- **Path Aliases**: Uses `@/` for client imports, `@shared/` for shared schemas, simplifying imports
- **shadcn/ui Component System**: Pre-built accessible components that can be customized, configured in `components.json`
- **Dark Mode Support**: Built into theme system with CSS variables for easy theming

**State Management Pattern**:
- TanStack Query for server state (habits, completions, user data)
- Local React state for UI interactions
- Custom hooks (`useAuth`) for authentication state
- Optimistic updates not currently implemented but structure supports it

### Backend Architecture

**Express.js REST API**
- RESTful endpoints for CRUD operations on habits and completions
- Session-based authentication using Replit Auth
- Type-safe request/response handling with shared schemas

**Key Design Decisions**:
- **Storage Abstraction Layer**: `IStorage` interface in `server/storage.ts` defines all database operations, enabling easy swapping of data sources
- **Separate Dev/Prod Entry Points**: `index-dev.ts` includes Vite middleware for HMR, `index-prod.ts` serves static files
- **Middleware Chain**: JSON parsing → raw body capture → request logging → authentication → routes
- **Session Management**: PostgreSQL-backed sessions via `connect-pg-simple` with 1-week TTL

**API Structure**:
```
GET  /api/auth/user - Get current authenticated user
GET  /api/habits - Get all habits with stats for current user  
POST /api/habits - Create new habit
PUT  /api/habits/:id - Update habit name
DELETE /api/habits/:id - Delete habit
POST /api/habits/:id/toggle - Toggle completion for a specific date
GET  /api/habits/:id/completions?start=X&end=Y - Get completions in date range
```

### Data Model & Storage

**Database Schema** (PostgreSQL via Drizzle ORM):

1. **users** - User accounts (managed by Replit Auth)
   - id (UUID primary key)
   - email, firstName, lastName, profileImageUrl
   - createdAt, updatedAt timestamps

2. **habits** - User's habits
   - id (auto-increment primary key)
   - userId (foreign key to users, cascade delete)
   - name (varchar 255)
   - createdAt timestamp

3. **habit_completions** - Daily completion records
   - id (auto-increment primary key)
   - habitId (foreign key to habits, cascade delete)
   - completedDate (date)
   - Unique constraint on (habitId, completedDate)

4. **sessions** - Express session storage
   - sid (primary key)
   - sess (jsonb session data)
   - expire (timestamp with index)

**Key Design Decisions**:
- **Normalized Design**: Separate completions table allows flexible querying and prevents data duplication
- **Cascade Deletes**: When user or habit deleted, related records automatically removed
- **Date-based Tracking**: Uses date strings (YYYY-MM-DD) for completions, simplifying queries and avoiding timezone issues
- **Drizzle ORM**: Type-safe database queries with automatic TypeScript inference from schema

**Calculated Fields**:
- Streak calculation: Computed on-demand by counting consecutive completion days
- Total completions: Counted from habit_completions table
- Progress percentages: Calculated client-side based on completions

### Authentication & Authorization

**Replit Auth Integration** (OpenID Connect):
- Login flow: Redirect to `/api/login` → Replit OAuth → callback → session creation
- User profile automatically synced to local database on login
- Session stored in PostgreSQL with secure HTTP-only cookies
- Middleware: `isAuthenticated` checks session before allowing API access

**Security Measures**:
- CSRF protection via session tokens
- Secure cookies (httpOnly, secure flags)
- All database queries filtered by authenticated userId
- No public endpoints except landing page and auth routes

## External Dependencies

### Third-Party Services

**Replit Auth (OIDC)**
- Purpose: User authentication and session management
- Integration: Via `openid-client` and passport strategy
- Configuration: Requires `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET` environment variables

**Neon Serverless PostgreSQL**
- Purpose: Database hosting
- Integration: Via `@neondatabase/serverless` driver with WebSocket support
- Configuration: Requires `DATABASE_URL` environment variable
- Note: Uses connection pooling for serverless environments

### Key NPM Packages

**Frontend**:
- `@tanstack/react-query` - Server state management and caching
- `wouter` - Lightweight routing (alternative to React Router)
- `date-fns` - Date manipulation and formatting
- `@radix-ui/*` - Headless UI primitives (30+ packages for shadcn/ui)
- `tailwindcss` - Utility-first CSS framework
- `zod` - Runtime type validation

**Backend**:
- `drizzle-orm` - Type-safe ORM with PostgreSQL support
- `express` - Web framework
- `connect-pg-simple` - PostgreSQL session store
- `passport` / `openid-client` - Authentication
- `ws` - WebSocket support for Neon serverless

**Build Tools**:
- `vite` - Frontend build tool and dev server
- `esbuild` - Backend bundler for production
- `tsx` - TypeScript execution for development
- `drizzle-kit` - Database migrations and schema management

### Google Fonts CDN
- Font: Inter (variable weights 100-900)
- Loaded via Google Fonts CDN in `client/index.html`
- Used as primary font family throughout application