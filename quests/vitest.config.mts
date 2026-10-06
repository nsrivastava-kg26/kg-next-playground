import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Quest checks: automated acceptance criteria for each chapter.
 *   npm run quest            -> all chapters
 *   npm run quest -- ch04    -> one chapter
 */
export default defineConfig({
  root: new URL("..", import.meta.url).pathname,
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "server-only": new URL("../src/test/server-only-stub.ts", import.meta.url).pathname,
    },
  },
  test: {
    environment: "node",
    include: ["quests/checks/**/*.test.ts"],
    env: { REVALIDATE_SECRET: "quest-secret-quest-secret-quest-secret" },
  },
});
