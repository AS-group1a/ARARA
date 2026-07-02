// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { componentTagger } from "lovable-tagger"

export default defineConfig(({ command, mode }) => ({
  /**
   * GitHub Pages custom-domain base
   * DEV  → "/"
   * BUILD → "/" for www.ararahx.com
   */
  base: command === "build" ? "/" : "/",

  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["toner-scales-provisions-wolf.trycloudflare.com"],
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
