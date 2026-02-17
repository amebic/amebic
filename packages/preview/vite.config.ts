import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@amebic/core": path.resolve(__dirname, "../core/src"),
      "@amebic/templates": path.resolve(__dirname, "../templates/src"),
      "@amebic/examples": path.resolve(__dirname, "../examples/src"),
      "@amebic/branding": path.resolve(__dirname, "../branding/src"),
    },
  },
  server: {
    port: 5174,
  },
});
