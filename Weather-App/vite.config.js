import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/React-Weather-App",
  root: ".", // project root
  build: {
    rollupOptions: {
      input: "src/index.html", // explicitly point to index.html
    },
  },
});
