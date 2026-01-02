# el ostadh menu

## Overview

A digital menu application for "el ostadh" - a Tunisian café/restaurant. The app displays menu items organized by categories (chicha, salés, jus, caffé) with prices in Tunisian Dinars (DT). Features include animated menu cards, QR code generation for easy sharing, and an admin interface for adding new menu items.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for menu item entrance animations
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints defined in shared/routes.ts with Zod validation
- **Server Structure**: 
  - `server/index.ts` - Express app setup and middleware
  - `server/routes.ts` - API route handlers
  - `server/storage.ts` - Database abstraction layer
  - `server/db.ts` - Database connection

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - Shared between frontend and backend
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Migrations**: Drizzle Kit with migrations stored in `/migrations`

### Key Design Patterns
1. **Shared Types**: Schema definitions in `shared/` are used by both client and server, ensuring type safety across the stack
2. **API Contract**: Routes defined with Zod schemas for input validation and response typing
3. **Storage Abstraction**: `IStorage` interface allows for easy swapping of data sources
4. **Auto-seeding**: Initial menu items are seeded on first run if database is empty

### Build Process
- Development: `npm run dev` - Uses tsx to run TypeScript directly with Vite HMR
- Production: `npm run build` - esbuild bundles server, Vite bundles client to `dist/`
- Database: `npm run db:push` - Pushes schema changes to database

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via DATABASE_URL environment variable)
- **Connection**: pg (node-postgres) with connection pooling
- **Sessions**: connect-pg-simple for session storage (available but not currently used)

### Third-Party Libraries
- **qrcode.react**: QR code generation for menu sharing
- **lucide-react**: Icon library
- **react-hook-form**: Form handling with zodResolver for validation
- **date-fns**: Date formatting utilities

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)