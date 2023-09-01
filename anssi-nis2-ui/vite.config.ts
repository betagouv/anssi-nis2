import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
  plugins: [react()],
  publicDir: "public",
  server: {
    host: "0.0.0.0",
  },
});
