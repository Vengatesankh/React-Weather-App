import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "/React-Weather-App",
  root: ".", // project root
  build: {
    rollupOptions: {
      input: "src/index.html", // explicitly point to index.html
    },
  },
});
