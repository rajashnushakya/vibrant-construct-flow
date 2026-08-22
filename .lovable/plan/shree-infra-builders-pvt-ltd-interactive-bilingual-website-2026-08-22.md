# Shree Infra Builders Pvt Ltd — Interactive Bilingual Website

A minimalist, animation-led marketing site for construction and design services, in English and Nepali with a toggle.

## Brand system

- Deep Blue #004B9C — headers, primary CTAs, accents
- Vibrant Green #039E4D — hover states, badges, animated highlights
- Off-white #F8F9FA (light) and Charcoal #1A1A1A (dark) surfaces
- All values become semantic tokens in the global stylesheet (oklch), plus a dark theme. Type: a confident geometric sans for headings, clean neutral sans for body; Devanagari-capable font loaded for Nepali.

## Pages

- `/` Home — full-screen hero with a generated project image, slow Ken Burns/parallax motion, minimalist headline, single CTA "Explore Our Work"; short highlights strip below.
- `/services` — four services (Residential Construction, Commercial Projects, Interior Design, Renovation & Upgrades) in a tabbed/card interface with hover and switch micro-animations.
- `/portfolio` — filterable gallery (All, Residential, Commercial, Renovation, Interiors) plus an interactive drag Before & After slider for renovation transformations.
- `/about` — brief craftsmanship and quality statement, stats, values.
- `/contact` — multi-step inquiry form (project type → details → contact info) saving to the backend, with floating WhatsApp/call quick-action button using 9841143264.

Shared header with nav, language toggle (EN / नेपाली), and dark-mode toggle; minimal footer.

## Localization

- Lightweight in-app i18n: a `LanguageProvider` with `en` and `ne` dictionaries, `t()` lookup, persisted choice in localStorage, hydration-safe.
- All UI copy, nav, service descriptions, form labels and validation messages translated. Devanagari font applied when Nepali is active.

## Animation

- Motion (Framer Motion) for scroll-triggered fade/slide reveals, tab and filter transitions, and button scale/color micro-interactions.
- CSS smooth scrolling; reduced-motion respected; images lazy-loaded so mobile stays fast.

## Backend (Lovable Cloud)

- Enable Cloud; create an `inquiries` table (name, phone, email, service type, budget, message, preferred language, timestamp) with grants, RLS enabled, an insert-only policy for public submissions, and no public read.
- Form submits through a server function; success/error feedback via toast.

## Technical notes

- TanStack Start file routes; each route gets its own `head()` with unique title/description/OG tags.
- Hero and portfolio imagery generated as AI assets under `src/assets/`, motion applied in CSS/Motion rather than video files.
- Semantic tokens only — no hardcoded color utilities in components.
