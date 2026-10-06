import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Raw <img> skips optimisation and causes layout shift. Use next/image.
      "@next/next/no-img-element": "error",
      // Imports read top-down: `@/` aliases, never ../../ ladders.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["../*"], message: "Use the @/ alias instead of parent-relative imports." },
          ],
        },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "e2e/**", "quests/**"],
    rules: { "no-restricted-imports": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
