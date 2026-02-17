import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@amebic/core": path.resolve(__dirname, "../core/src"),
      "@amebic/templates": path.resolve(__dirname, "../templates/src"),
      "@amebic/examples": path.resolve(__dirname, "../examples/src"),
    },
  },
  server: {
    port: 5174,
  },
});
