# Design system

The UI uses shadcn/ui and Tailwind CSS v4 so humans and coding agents can reuse
recognizable components instead of inventing new patterns.

## Rules

- Use theme tokens instead of raw palette colors.
- Avoid arbitrary values and inline styles.
- Prefer existing component variants.
- Do not change a Button's padding, color, or shape at its call site.
- Layout classes are allowed where a page positions a component.

ESLint loads `@shadcn/lint` and discovers components and theme tokens through
`components.json`.

Application errors: `no-restyle`, `no-raw-colors`, `no-arbitrary-values`, and
`no-inline-styles`. Warnings: `no-unknown-classes` and
`require-static-classes`.

Inside `components/ui`, `no-restyle`, `no-arbitrary-values`, and
`require-static-classes` are disabled because the primitives own their styles.
Raw colors and inline styles remain errors.

Run `npm run lint` for all checks or `npm run lint:design` to view only design
system findings.
