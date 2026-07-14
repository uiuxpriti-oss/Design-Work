import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Relative base so the built asset URLs (JS/CSS) resolve wherever the site
  // is served — both a project sub-path (uiuxpriti-oss.github.io/Design-Work/)
  // and the root custom domain (uiuxpriti.com).
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
