# Interactive Resume Website for Sanjeev Batchali

## Overview

This is a modern, interactive resume/portfolio website built for Sanjeev Batchali, a finance professional and Chartered Accountant specializing in transaction advisory, debt restructuring, and data analytics. The application is a single-page application (SPA) featuring smooth scrolling sections that showcase professional experience, skills, certifications, and contact information.

The project follows a full-stack architecture with React frontend and Express backend, though currently the backend serves primarily as a static file server. The application emphasizes clean design, professional aesthetics, and responsive layouts inspired by modern portfolio websites like Linear and Stripe career pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (though primarily single-page with hash navigation)

**UI Component System:**
- **Shadcn/ui** components built on Radix UI primitives for accessible, customizable UI elements
- **Tailwind CSS** for utility-first styling with custom design tokens
- Component library includes: Cards, Buttons, Badges, Navigation, Dialogs, Forms, and more
- Custom color system supporting both light and dark modes with CSS variables

**Design System:**
- Typography using Inter (body) and Space Grotesk (headings) from Google Fonts
- Consistent spacing using Tailwind's 4-point grid system (units: 4, 6, 8, 12, 16)
- Custom color palette with professional blue accents (#3B82F6 range) and success green
- Dark mode primary with light mode support
- Responsive breakpoints: mobile (default), md (768px), lg (1024px)

**State Management:**
- **React Query (@tanstack/react-query)** for server state management and caching
- Local component state with React hooks for UI interactions
- Custom hooks for reusable logic (e.g., `use-mobile`, `use-toast`)

**Key Features:**
- Animated hero section with rotating taglines (2.5s interval) and gradient backdrop on profile photo
- About Me section with personal narrative and hobbies (3 content versions available)
- Quantified achievements ticker with greyscale styling
- Smooth scroll navigation with full-page snap and bidirectional animations
- Responsive navigation bar with mobile hamburger menu and theme toggle
- Interactive skills display with animated scrolling badges (pause on hover)
- Professional experience cards with refined spacing, shadows, and keyword highlighting
- Horizontal scrolling certifications carousel
- Contact section with location, email, LinkedIn, and phone information
- **Blog section** with finance and career articles (separate pages with consistent design)

### Backend Architecture

**Server Framework:**
- **Express.js** running on Node.js with TypeScript
- Middleware for JSON/URL-encoded body parsing
- Custom request/response logging for API routes
- Error handling middleware for consistent error responses

**Development vs Production:**
- Development: Vite dev server integrated as Express middleware for HMR
- Production: Serves pre-built static files from `/dist/public`
- Conditional loading of Replit-specific plugins (cartographer, dev-banner) only in development

**Build Process:**
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js` as ESM module
- Single production entry point: `node dist/index.js`

### Data Storage

**Database Setup:**
- **Drizzle ORM** configured for PostgreSQL with Neon serverless driver
- Schema location: `shared/schema.ts` (currently includes basic user table)
- Migration system via `drizzle-kit` (migrations in `/migrations` directory)

**Storage Interface:**
- Abstracted storage layer (`server/storage.ts`) with interface pattern
- In-memory storage implementation (`MemStorage`) for development/testing
- CRUD methods: `getUser`, `getUserByUsername`, `createUser`
- Designed to be swappable with database-backed implementation

**Current State:**
- Database configured but not actively used by the application
- User schema exists with id, username, and password fields
- Application is currently static with no authentication or data persistence

### External Dependencies

**Third-Party Services:**
- **Google Fonts API** - Serving Inter and Space Grotesk font families
- **Neon Database** - Serverless PostgreSQL (configured via `@neondatabase/serverless`)

**UI Libraries:**
- **Radix UI** - Complete suite of accessible component primitives (17+ packages)
- **Lucide React** - Icon library for UI elements
- **React Icons** - Additional icon sets (specifically using Simple Icons for tech logos)

**Development Tools:**
- **Replit Plugins** - Runtime error modal, cartographer, dev banner (development only)
- **ESBuild** - Fast JavaScript bundler for server code
- **PostCSS/Autoprefixer** - CSS processing pipeline

**Form & Validation:**
- **React Hook Form** - Form state management
- **Zod** - Schema validation (with drizzle-zod integration)
- **@hookform/resolvers** - Zod resolver for React Hook Form

**Utility Libraries:**
- **clsx** & **tailwind-merge** - Conditional className composition
- **class-variance-authority** - Component variant styling system
- **date-fns** - Date manipulation and formatting
- **nanoid** - Unique ID generation

**Assets:**
- Profile image: `attached_assets/Screenshot 2025-10-05 223555_1759684246509.jpg`
- Static assets resolved via Vite alias `@assets`

## Recent Updates (October 2025)

### Enhancements Implemented:
1. **Tagline Animation** - Slowed rotation from 0.5s to 2.5s for better readability
2. **About Me Section** - Added personal narrative with hobbies (F1, web design, badminton, table tennis) and Transaction Advisory focus (IPO, M&A, Turnaround Advisory)
   - Three content versions available in component (Version 1 active with Transaction Advisory emphasis)
3. **Achievements Section** - Redesigned as responsive grid with separate containers:
   - Vertical layout: large numbers on top, descriptive text below
   - Gradient backgrounds with subtle primary color shadows
   - Responsive: 1 column (mobile) → 2 columns (tablet) → 5 columns (desktop)
   - Metrics: 3+ Years Experience, 20+ Financial Models, 3+ Transactions, 30+ Pitch Decks, 20+ Dashboards
4. **Mobile Navigation** - Responsive hamburger menu for tablets and phones
5. **Profile Photo Enhancement** - Gradient backdrop (primary color) behind photo for visual depth
6. **Card Refinements** - Improved spacing and subtle shadows on experience cards
7. **Section Title Consistency** - All section headings standardized to 4xl/5xl/6xl for prominence

### Page Structure:

**Home Page (/):**
- Hero Section (profile photo with gradient, rotating tagline)
- About Me Section + Achievements Ticker
- Experience Section (professional summary + company cards)
- Skills Section (Finance + Tech skill tickers)
- Contact Section (location, email, LinkedIn, phone)

**DevTools Section:**
- DevTools Landing Page (/devtools):
  - Hero section with title and subtitle
  - Grid of tool cards with icons, descriptions, and tags
  - Interactive hover effects with arrow animations
  - Contact section footer
- Loan Amortization Calculator (/devtools/loan-calculator):
  - Professional calculator interface with form inputs and results display
  - Supports multiple repayment types: EMI, Interest-only, Balloon payments
  - Configurable repayment frequencies: Monthly, Quarterly, Half-yearly, Annually
  - Moratorium period support with flexible tenure input (years, months)
  - Fee calculations: Processing fee, Professional fee, Other costs
  - Advanced outputs: Total Principal, Total Interest, Total Fees, Effective Interest Rate (XIRR)
  - Visual pie chart breakdown using Chart.js
  - Detailed amortization schedule table with payment-by-payment breakdown
  - Excel export functionality using XLSX library
  - Indian and International number formatting options
  - Responsive 3-column layout (form, summary, schedule)

**Blog Section:**
- Blog Listing Page (/blog):
  - Hero section with title and description
  - Category filters (All Posts, Finance, Career)
  - Grid of blog post cards with metadata (date, reading time, category)
  - Contact section footer
- Blog Post Pages (/blog/:slug):
  - Back to blog navigation
  - Post header with category, date, reading time
  - Share buttons (LinkedIn, Twitter) with security protections
  - Formatted article content with typography styling
  - Author bio card
  - Related posts section
  - Contact section footer

### Recent Updates (October 2025)

#### Performance & Visual Enhancements (October 9, 2025):
1. **Scrolling Performance** - Changed scroll-snap-type from "mandatory" to "proximity" to eliminate lag while maintaining section alignment
2. **Background Enhancement** - Increased star count from ~50 to ~100 for richer cosmic background effect
3. **Testing** - Verified smooth scrolling and visual improvements through e2e playwright tests
4. **Production Build** - Updated dist/public folder (568KB) with performance optimizations

#### Blog Implementation (October 9, 2025):
1. **Navigation Update** - Replaced "Contact" with "Blog" in main navigation
2. **Real LinkedIn Articles** - Updated blog with 2 real published articles:
   - "What the Markets Told Trump: How Bond Yields and Basis Trades Derailed a Tariff Plan" (April 2025)
   - "AI & ML: Reshaping Corporate Restructuring in India – Lessons from Global Best Practices" (September 2025)
3. **Blog Pages** - Built listing and detail pages with matching portfolio design
4. **Cross-Page Navigation** - Implemented hash-based navigation from blog back to home sections
5. **Security** - Added opener protection to share buttons (prevents reverse tabnabbing)
6. **Contact Accessibility** - Contact section now appears in blog page footers
7. **Blog Images** - Added professional images from Unsplash:
   - Hero images on individual blog post pages (responsive: 300px/400px/500px)
   - Thumbnail images on blog listing cards (192px height)
   - Hover zoom effect on thumbnails
   - Stock market chart for Trump/tariffs article
   - AI/technology image for ML/restructuring article
8. **Production Build** - Created deployment-ready dist/public folder (564KB) with:
   - Favicon (SB branding)
   - CSP headers via _headers file (includes img-src for Unsplash CDN)
   - Netlify routing via netlify.toml
   - Optimized assets and bundles

#### DevTools Implementation (October 9, 2025):
1. **Navigation Update** - Removed Certifications section, added DevTools button to main navigation
2. **DevTools Landing Page** - Created tool showcase page at /devtools:
   - Hero section with "Developer Tools" title
   - Grid layout for tool cards with hover effects
   - Calculator icon and descriptive tags
   - Professional design matching portfolio aesthetic
3. **Loan Amortization Calculator** - Built comprehensive financial calculator at /devtools/loan-calculator:
   - Enhanced React/TypeScript implementation of loan calculator
   - Complete EMI calculation with three repayment types (EMI, Interest-only, Balloon)
   - Support for moratorium periods and multiple repayment frequencies
   - XIRR calculation for effective interest rate
   - Visual pie chart using Chart.js
   - Detailed amortization schedule table
   - Excel export functionality using XLSX library
   - Form validation with error messages
   - Indian and International number formatting
   - Responsive 3-column layout (inputs, summary, schedule)
4. **Dependencies Added** - Installed xlsx, chart.js, react-chartjs-2 for calculator functionality
5. **Home Page Update** - Removed Certifications section from homepage structure
6. **Testing** - Verified end-to-end functionality through Playwright tests
7. **Production Build** - Updated dist/public folder (823KB) with DevTools section