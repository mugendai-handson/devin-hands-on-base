# Development

## Setup and database

A Dev Container or Codespaces workspace starts PostgreSQL, applies
migrations, seeds an empty database, and runs `npm run dev` on port 3000.
Seed data is added only when the `User` table is empty, so later starts keep
local changes.

To start the same stack by hand:

```bash
cp .env.example .env
npm ci
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

Create a migration after editing `prisma/schema.prisma` with
`npx prisma migrate dev --name change_name`.

## Checks

```bash
npm run lint
npm run lint:design
npm run typecheck
npm run test
npm run build
npm run verify
```

`verify` runs lint, typecheck, Vitest, and build in that order.

## E2E

```bash
npx playwright install chromium
npm run test:e2e
```

The command loads `.env.test`, resets and seeds the `e2e` PostgreSQL schema,
starts Next.js, then runs Playwright. It intentionally remains separate from
`verify`.
