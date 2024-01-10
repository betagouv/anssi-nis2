import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            "react",
            "react-dom",
            "react-router-dom",
            "react-helmet",
            "react-hook-form",
            "react-markdown",
            "@emotion/react",
            "@emotion/styled",
            "@mui/material",
            "tss-react",
          ],
        },
      },
    },
  },
});
