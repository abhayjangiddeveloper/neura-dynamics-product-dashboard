<!-- Product Management - Vite + React + TS UI -->

# Product Management

A small dashboard-style UI built with **Vite + React + TypeScript**.

**Live (Vercel):** https://value-at-void-assignment.vercel.app

This repo is currently **frontend-only**: screens use **static/mock data** and client-side filtering.

## Quick start

### Prerequisites

- Node.js (recommended: **18+**)
- npm (or a compatible package manager)

### Install & run

```bash
npm install
npm run dev
```

Vite is configured to run on **http://localhost:3000**.

### Useful scripts

```bash
npm run dev      # start dev server (also available as: npm start)
npm run build    # typecheck (tsc) + production build
npm run preview  # preview the production build locally
npm run lint     # eslint
```

## Tech stack

- **React 19** (`react`, `react-dom`)
- **TypeScript**
- **Vite** (dev server + build)
- **React Router** (`react-router-dom`) for client-side routing
- **Zustand** for lightweight state management (filters)
- **clsx** for conditional className composition
- **@uidotdev/usehooks** (installed; usage depends on the screen/components)

### Routing

Routing is defined in `src/router.tsx` using `createBrowserRouter`.

Top-level routes:

- `/` → Dashboard
- `/notification` → Notification
- `/jobs` → Jobs
- `/candidates` → Candidates (nested)
  - `/candidates/registered`
  - `/candidates/short-listed`

There is a route-level error boundary and a catch-all `*` route that renders the Error page.

### Path alias

The project uses an alias so imports like `@/pages/jobs` resolve to `src/pages/jobs`.

- Vite alias: `vite.config.ts`
- TS paths: `tsconfig.json`

## Styling choices

This project uses a mix of:

1. **CSS Modules** for component-scoped styles (e.g. `style.module.css` next to components).
2. **Global CSS** imported once via `src/index.css`, which pulls in:
   - `src/common/style/reset.css` (baseline reset)
   - `src/common/style/colors.css` (CSS variables like `--primary`, `--sidebar-bg`, etc.)
   - `src/common/style/fonts.css` (Gilroy font faces from `/public/fonts`)
   - `src/common/style/style.css` (global defaults; sets `html{font-size:62.5%}` and base background)

Notes:

- The project uses `rem` heavily. With `html { font-size: 62.5% }`, `1rem ≈ 10px`.
- Icons/images are imported as modules and centralized in:
  - `src/utils/iconPath.ts`
  - `src/utils/imagePath.ts`

## Data assumptions (current behavior)

There is **no backend/API integration** in this repo right now.

- Job stats cards and job list data are **static**:
  - `STATIC_STATS_DATA` in `src/utils/constant.ts`
  - `JOB_CARDS_DATA` in `src/utils/constant.ts`
- Filter dropdown options are also **static**:
  - `JOB_PROFILE_OPTIONS`, `EXPERIENCE_OPTIONS`, `EMPLOYMENT_TYPE_OPTIONS`

Filtering is performed client-side on the `Jobs` page:

- Search matches `job_title` case-insensitively.
- Other filters match the corresponding fields (job profile, experience value, employment type).
- “Closed” toggles a boolean filter against `job.is_closed`.

If you later connect an API, the easiest drop-in replacement is to swap `JOB_CARDS_DATA` with data fetched in `src/pages/jobs/index.tsx`, and keep the Zustand store as the UI filter state.

## Component structure overview

High-level composition:

- `src/main.tsx`
  - imports global styles (`src/index.css`)
  - mounts `<App />`
- `src/App.tsx`
  - renders `<Router />`
- `src/router.tsx`
  - creates browser router
  - wraps app routes with `<Layout />`
- `src/layout/index.tsx`
  - responsive shell (mobile top bar + sidebar)
  - `<SideBar />` + `<Outlet />` for routed pages

Reusable UI building blocks in `src/common/`:

- `Button/` — variant/size-aware button
- `IconButton/` — icon-only button
- `Searchbar/` — input with leading search icon
- `Dropdown/` — custom dropdown that renders menu via `Portal/`
- `Portal/` — positions floating UI relative to an anchor element (used by Dropdown)
- `Header/` — page header/title

Pages (`src/pages/`):

- `dashboard/` — placeholder screen
- `notification/` — notification screen
- `jobs/`
  - `index.tsx` — renders header + stats cards + filters + job cards
  - `filters/` — filter controls wired to Zustand store
  - `jobCard/` — job card UI (chips + status chips)
  - `statsCard/` — summary/stat card UI
- `candidates/` — candidates section with nested routes
  - `registered/`, `shortListed/`
- `error/` — lazy-loaded error page

State management:

- `src/stores/jobFilterStore.ts` — Zustand store holding filter state and actions (`reset_filters`, `is_filter_applied`, etc.)

## Deployment notes

This project is configured as a single-page application.

- Live deployment (Vercel): https://value-at-void-assignment.vercel.app

- `vercel.json` rewrites all routes to `/` so React Router routes work on refresh.

# intricaretech-task-1-product-management
