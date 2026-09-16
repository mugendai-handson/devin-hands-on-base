# Agent guidance

Issue Tracker Lite is a deliberately small Devin hands-on application. Keep
changes simple, readable, and easy to verify.

## Main directories

- `app/`: routes and Server Actions
- `components/`: application and shadcn/ui components
- `lib/`: Prisma setup, Zod schemas, and small pure functions
- `prisma/`: schema, migrations, and seed data
- `tests/`: Vitest and Playwright tests
- `docs/`: short product and engineering references

## Development

Use the Dev Container or Codespaces. The container starts PostgreSQL, applies
migrations, seeds an empty database, and runs the app on port 3000. Seed
skips when users already exist. Manual setup is described in
`docs/development.md`.

After making changes, run:

```text
npm run verify
```

If the change affects user-visible behavior, also run:

```text
npm run test:e2e
```

Fix all lint, design-system lint, typecheck, test, and build errors before
considering the task complete.

Use theme tokens and existing component variants. Do not restyle shadcn/ui
components from call sites. See `docs/design-system.md` and the other files in
`docs/` for details.
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
