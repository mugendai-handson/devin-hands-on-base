import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { plugin as shadcn } from "@shadcn/lint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    plugins: { shadcn },
    settings: {
      shadcn: {
        note: "See docs/design-system.md for repository design rules.",
      },
    },
    rules: {
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          contracts: [
            {
              pattern: "^Button$",
              allow: ["layout"],
              message: {
                spacing: "Use a Button size variant: {{sizes|none defined}}.",
                shape: "Use the Button component shape; do not override it here.",
                color: "Use a Button variant and theme tokens.",
              },
            },
          ],
        },
      ],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": ["error", { allow: ["layout"] }],
      "shadcn/no-inline-styles": "error",
      "shadcn/no-unknown-classes": "warn",
      "shadcn/require-static-classes": "warn",
    },
  },
  {
    files: ["components/ui/**"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/no-arbitrary-values": "off",
      "shadcn/require-static-classes": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "generated/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
