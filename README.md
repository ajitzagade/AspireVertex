# AspireInfraTech Monorepo

Monorepo for **AspireInfraTech** with a React website and Express API for dynamic content.

## Structure

```
├── apps/
│   ├── web/          # Next.js 15 + React + TypeScript + Tailwind CSS
│   └── api/          # Express API (site config, services)
├── packages/
│   └── shared/       # Shared TypeScript types and constants
├── package.json      # npm workspaces root
└── turbo.json        # Turborepo task orchestration
```

## Prerequisites

- Node.js 20+

## Setup

```bash
npm install
npm run build
```

## Development

Run both apps in parallel:

```bash
npm run dev
```

- **Website:** http://localhost:5173
- **API:** http://localhost:3001 (optional; web uses MongoDB + seed fallback)

## Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start web + api in dev mode          |
| `npm run build`   | Build all packages and apps          |
| `npm run typecheck` | Type-check all workspaces          |
| `npm run lint`    | Lint (web app)                       |

## API endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/health`     | Health check       |
| GET    | `/api/site`       | Full site config   |
| GET    | `/api/services`   | Services list      |

Update content in `apps/api/src/data/site.ts` or connect a database later.

## Environment

Copy example env files:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env   # set MONGODB_URI when using a database
```
