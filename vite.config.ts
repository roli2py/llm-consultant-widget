/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
  }
})
