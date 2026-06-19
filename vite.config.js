import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: `base` must match your GitHub repo name, with slashes on both sides.
// If your repo is github.com/you/sdv-npc-creator, keep the value below.
// Rename it here if your repo name is different, otherwise the deployed page
// will load blank with 404s on its assets.
export default defineConfig({
  base: "/sdv-npc-creator/",
  plugins: [react()],
});
