# Development

## Setup and database

A Dev Container or Codespaces workspace starts PostgreSQL, applies
migrations, seeds an empty database, and runs `npm run dev` on port 3000.
`npm run db:seed` inserts sample data only when the `User` table is empty, so
later starts keep local changes. To replace that data, run
`npx prisma migrate reset`.

The auto-started app writes logs to `/tmp/next-dev.log`. If
http://localhost:3000 already responds, do not start a second `npm run dev`.

To start the same stack by hand on a host without the Dev Container:

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
