import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    // 절대경로 import
    alias: {
      "@": "/src",
    },
  },
});
