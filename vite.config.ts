/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), vike()],
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
