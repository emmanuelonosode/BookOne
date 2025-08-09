# Copilot Instructions for BookOne

## Project Overview

- **Framework:** Next.js (App Router, TypeScript, SSR/ISR)
- **CMS:** Sanity.io (see `lib/sanity.js`)
- **API Integrations:** SheetDB, Nodemailer (for contact/subscribe forms)
- **UI:** React components, Tailwind CSS, Framer Motion (animations)
- **Image Handling:** Next.js `<Image />` with remotePatterns for Sanity CDN

## Caching & Data Fetching

- **ISR/SSG:** Use `export const revalidate = 3600;` in page/server components to enable incremental static regeneration (ISR) and cache Sanity data for 1 hour.
- **API Routes:** Always set `Cache-Control: no-store, no-cache, must-revalidate, private` for sensitive endpoints (e.g., `/api/contact`, `/api/subscribe`).
- **Sanity Fetch:** For static data, prefer `{ cache: 'force-cache' }` in fetch options. For dynamic/user-specific data, use `{ cache: 'no-store' }`.
- **Static Assets:** Static files and images are served with long-term immutable caching (see `next.config.ts` and `middleware.js`).

## Patterns & Conventions

- **Dynamic Imports:** Use `dynamic()` for below-the-fold or non-critical components, with `ssr: true` for SEO.
- **Animation:** Minimize or disable on mobile. Use CSS media queries or a custom hook to control animation.
- **Error Handling:** Avoid `console.log`/`console.error` in production. Use fallback UI or monitoring for errors.
- **Form Handling:** All form submissions (contact, subscribe) are fire-and-forget: respond immediately, process background tasks async.
- **API Security:** Validate all inputs, never cache sensitive POST responses.

## Key Files & Directories

- `app/` — Next.js App Router structure (pages, layouts, API routes)
- `app/api/contact/route.js` — Contact form API (SheetDB + email, no caching)
- `app/api/subscribe/route.js` — Newsletter subscribe API (SheetDB + email, no caching)
- `lib/sanity.js` — Sanity client and image helpers
- `next.config.ts`, `middleware.js` — Caching, security, and image optimization settings
- `app/component/sections/` — Main homepage/section components (AboutUs, Service, Testimonia, etc.)

## Build & Dev

- **Dev:** `npm run dev` (Next.js)
- **Build:** `npm run build` (standalone output for Cloudflare Workers)
- **Preview:** `npm run start`

## Examples

- To add a new statically cached page: `export const revalidate = 3600;` at the top of the file.
- To fetch Sanity data with caching:
  ```js
  const data = await sanity.fetch(query, params, { cache: "force-cache" });
  ```
- To prevent caching in an API route:
  ```js
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  ```

## External Integrations

- **Sanity:** Used for all CMS content. Queries in `lib/queries.js`.
- **SheetDB:** Used for storing form submissions.
- **Nodemailer:** Used for sending transactional emails from API routes.

---

For more details, see `README.md` and referenced files above. When in doubt, follow the patterns in existing files and prefer static caching for all public content.
