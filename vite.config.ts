import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { BRAND_NAME, DESCRIPTION, SITE_URL, TAGLINE } from "./src/config";

const tokens: Record<string, string> = {
  BRAND_NAME,
  TAGLINE,
  DESCRIPTION,
  SITE_URL,
};

/** Injects values from src/config.ts into index.html, and adds a 404.html SPA fallback for GitHub Pages. */
function casperHtml(): Plugin {
  let outDir = "dist";
  return {
    name: "casper-html",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    transformIndexHtml(html) {
      return html.replace(/%([A-Z_]+)%/g, (match, key: string) => tokens[key] ?? match);
    },
    closeBundle() {
      // GitHub Pages serves 404.html for unknown paths, so deep links like /impressum still load the app.
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

// https://mgruen15.github.io/project-casper-website/ is served from a sub path.
// Set VITE_BASE=/ when using a custom domain.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/project-casper-website/",
  plugins: [react(), tailwindcss(), casperHtml()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  build: { target: "es2022", sourcemap: false },
});
