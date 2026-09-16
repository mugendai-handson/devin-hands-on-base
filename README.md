# Issue Tracker Lite

Issue Tracker Lite is a small issue management app for Devin hands-on training.
It is intentionally simple so participants can ask an AI coding agent to make,
test, and review incremental changes.

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Prisma,
PostgreSQL, Zod, Vitest, Playwright, ESLint, and `@shadcn/lint`.
Major dependencies and `package-lock.json` are committed for repeatable labs.

## Setup

The recommended setup is the existing Dev Container or GitHub Codespaces.
It provides Node.js 22, Docker, GitHub CLI, and forwards ports 3000 and 5432.

When the container starts, it installs dependencies, starts PostgreSQL,
applies migrations, seeds an empty database, and starts the app on port 3000.
Open http://localhost:3000 after the preview appears. Dev server logs go to
`/tmp/next-dev.log`. If that port is already serving the app, do not run
`npm run dev` again.

`npm run db:seed` inserts the sample users, projects, and tickets only when
the `User` table is empty. To replace local data, run
`npx prisma migrate reset`.

To start the same stack by hand on a host without the Dev Container:

```bash
cp .env.example .env
npm ci
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

To create a migration after changing the schema:

```bash
npx prisma migrate dev --name describe_your_change
```

## Validation

```bash
npm run lint          # Code quality and design-system rules
npm run lint:design   # Design-system rules only
npm run typecheck
npm run test
npm run build
npm run verify        # lint -> typecheck -> test -> build
```

E2E tests use a separate PostgreSQL schema, reset it, seed it, and run three
Playwright scenarios:

```bash
npx playwright install chromium
npm run test:e2e
```

Pull requests run the same checks in GitHub Actions. E2E is a separate job with
a PostgreSQL service so the main verification flow remains easy to understand.

## Documentation

- [Product scope](docs/product-spec.md)
- [Architecture](docs/architecture.md)
- [Business rules](docs/business-rules.md)
- [Development](docs/development.md)
- [Design system](docs/design-system.md)
