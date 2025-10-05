# Design Guidelines: Interactive Resume Website for Sanjeev Batchali

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern professional portfolios (Linear, Stripe career pages) with emphasis on clean typography, purposeful animations, and professional credibility. The design balances creative presentation with corporate professionalism suitable for finance/consulting industry.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background Base: 220 15% 8%
- Surface Elevated: 220 12% 12%
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 65%
- Accent Primary: 210 100% 55% (Professional Blue - trust/expertise)
- Accent Secondary: 160 70% 45% (Success Green - for ratings/achievements)

**Light Mode:**
- Background Base: 0 0% 98%
- Surface Elevated: 0 0% 100%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%
- Accent Primary: 210 90% 48%
- Accent Secondary: 160 65% 40%

### B. Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - Clean, professional, excellent readability
- Accent: 'Space Grotesk' (Google Fonts) - For headings and emphasis

**Hierarchy:**
- Hero Name (Segment 1): 4xl to 6xl, font-bold, Space Grotesk
- Rotating Tagline: xl to 2xl, font-medium, Inter
- Section Headings: 3xl to 4xl, font-bold, Space Grotesk
- Job Titles: xl to 2xl, font-semibold, Inter
- Body Text: base to lg, font-normal, Inter, line-height relaxed
- Dates/Meta: sm to base, font-medium, text-secondary

### C. Layout System

**Spacing Primitives:** Consistently use Tailwind units of 4, 6, 8, 12, and 16 for margins/padding to maintain rhythm (e.g., p-8, gap-6, mt-12).

**Container Strategy:**
- Max width: max-w-6xl for content sections
- Full-bleed backgrounds with contained content
- Symmetric padding: px-6 (mobile) to px-12 (desktop)

**Grid System:**
- Segment 1: Single column centered layout
- Segment 2: Two-column grid (lg:grid-cols-2) for experience cards
- Segment 3: Horizontal scrolling banner or grid display
- Segment 4: Three-column grid (md:grid-cols-3) for certifications

### D. Component Library

**Navigation:**
- Fixed top navigation with smooth scroll links to segments
- Pill-style indicators for active section
- Subtle backdrop blur on scroll

**Segment 1 - Hero:**
- Split layout: Text left (60%), Image right (40%) on desktop
- Stacked on mobile with image first
- Rotating tagline with fade transition effect
- Profile image: Rounded-lg with subtle shadow and border

**Segment 2 - Experience Cards:**
- Elevated card design with border and shadow
- Company name with prominent font weight
- Timeline with visual separator
- Bullet points with custom marker styling
- Hover state: Subtle lift and glow effect

**Segment 3 - Skills Banner:**
- Horizontal auto-scroll animation (pausable on hover)
- Skill pills with rating visualization (progress bars or filled circles)
- Glassmorphic card backgrounds
- Duplicate content for seamless loop

**Segment 4 - Certification Cards:**
- Icon + Title + Subtitle format
- Minimal borders with accent color highlights
- Year/status badge in corner
- Equal height cards in grid

**Buttons & CTAs:**
- Primary: Solid background with accent color
- Secondary: Outline style with backdrop blur when on images
- Icon integration using Heroicons

### E. Animations

**Purposeful Motion Only:**
- Tagline rotation: Crossfade transition every 0.5s using opacity and transform
- Skills banner: Continuous horizontal scroll at 50px/s
- Section reveals: Fade-up on scroll (50px translate-y)
- Card interactions: Scale 1.02 and shadow increase on hover
- Navigation: Smooth scroll behavior with offset for fixed header

**Performance:**
- Use transform and opacity for animations
- Will-change on animated elements
- Reduce motion support with prefers-reduced-motion

## Images

**Profile Picture:**
- Location: Segment 1 (right side on desktop, top on mobile)
- Style: Professional headshot, rounded corners (rounded-lg or rounded-xl)
- Dimensions: 400x400px minimum, square aspect ratio
- Treatment: Subtle border (2-3px) in accent color, soft shadow

**No Large Hero Image:** This resume site relies on typography and structured content rather than decorative hero imagery. The profile picture serves as the primary visual anchor.

## Accessibility & Responsive Behavior

- Maintain consistent dark mode across all inputs and interactive elements
- Focus states with visible outline in accent color
- ARIA labels for animated content
- Mobile-first breakpoints: base (mobile), md (768px), lg (1024px), xl (1280px)
- Stack all multi-column layouts to single column on mobile
- Touch-friendly tap targets (min 44x44px)

## Key Principles

1. **Professional Credibility**: Clean, sophisticated design that reflects finance/consulting industry standards
2. **Purposeful Animation**: Motion enhances comprehension, doesn't distract
3. **Content Hierarchy**: Clear visual flow guiding users through career journey
4. **Performance First**: Optimized animations and efficient rendering
5. **Memorable Distinction**: Rotating tagline and skill banner create unique personality while maintaining professionalism