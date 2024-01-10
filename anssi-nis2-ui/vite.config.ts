import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
  plugins: [
    react(),
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          return `export default ${JSON.stringify(code)};`;
        }
      },
    },
  ],
  assetsInclude: ["**/*.md"],
  publicDir: "public",
  server: {
    host: "0.0.0.0",
  },
});
