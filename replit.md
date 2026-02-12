# Interactive Resume Website for Sanjeev Batchali

## Overview
This project is an interactive resume/portfolio website for Sanjeev Batchali, a finance professional. It's a single-page application (SPA) designed to showcase professional experience, skills, certifications, and contact information with a focus on clean design, professional aesthetics, and responsiveness. The application aims to provide a modern and engaging user experience, similar to high-end corporate career pages.

The project features:
- An animated hero section with rotating taglines.
- Detailed "About Me" and "Achievements" sections.
- Professional experience cards and interactive skills display.
- A dedicated "Blog" section for finance and career articles.
- A "DevTools" section including a comprehensive loan amortization calculator.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework:** React 18 with TypeScript.
- **Build Tool:** Vite for fast development and optimized production builds.
- **Routing:** Wouter for lightweight client-side routing.
- **UI Components:** Shadcn/ui (built on Radix UI) for accessible and customizable elements.
- **Styling:** Tailwind CSS for utility-first styling, custom design tokens, and a custom color system with dark/light mode support.
- **Design System:** Typography using Inter and Space Grotesk, 4-point grid system for spacing, responsive breakpoints (mobile, md, lg).
- **State Management:** React Query for server state management, React hooks for local state.
- **Key Features:** Animated hero section, quantified achievements ticker, smooth scroll navigation, responsive navigation, interactive skills display, professional experience cards, certifications carousel, contact section.
- **Blog Section:** Separate pages for articles with consistent design, category filters, share buttons. Blog posts are stored as markdown files in `client/content/blog/` with YAML frontmatter, loaded at build time via `import.meta.glob`. Decap CMS (formerly Netlify CMS) is integrated at `/admin` for browser-based blog authoring without code changes.
- **DevTools Section:** Includes a "Loan Amortization Calculator" with multiple repayment types, moratorium support, XIRR calculation, visual pie chart (Chart.js), detailed amortization schedule, and Excel export (XLSX library).
- **Performance:** Optimized scrolling, lazy/eager image loading, CSS performance enhancements, lightweight custom dot cursor (no trail effects).
- **CMS:** Decap CMS at `/admin` for blog management. Requires Netlify Identity + Git Gateway enabled on Netlify dashboard. Blog posts stored as markdown in `client/content/blog/`.

### Backend Architecture
- **Server Framework:** Express.js running on Node.js with TypeScript.
- **Functionality:** Primarily serves static files in production. Includes middleware for JSON/URL parsing, request/response logging, and error handling.
- **Build Process:** Frontend built by Vite to `dist/public`; Backend bundled by esbuild to `dist/index.js`.

### Data Storage
- **Database:** Drizzle ORM configured for PostgreSQL with Neon serverless driver.
- **Schema:** Basic user schema (`shared/schema.ts`).
- **Migration:** `drizzle-kit` for database migrations.
- **Storage Interface:** Abstracted storage layer (`server/storage.ts`) with in-memory implementation for development, designed for database swapability.
- **Current State:** Database configured but not actively used by the application for persistence.

## External Dependencies
- **Third-Party Services:** Google Fonts API, Neon Database (@neondatabase/serverless).
- **UI Libraries:** Radix UI, Lucide React (icons), React Icons (Simple Icons).
- **Development Tools:** Replit Plugins (dev only), ESBuild, PostCSS/Autoprefixer.
- **Form & Validation:** React Hook Form, Zod, @hookform/resolvers.
- **Utility Libraries:** clsx, tailwind-merge, class-variance-authority, date-fns, nanoid.
- **Calculator Specific:** xlsx, chart.js, react-chartjs-2.