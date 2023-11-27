import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // test: {
  //   environment: "jsdom",
  //   setupFiles: "./setupTests.ts",
  // },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NIS2Domaine",
    },
  },
  plugins: [react()],
  publicDir: "public",
  // server: {
  //   host: "0.0.0.0",
  // },
});
