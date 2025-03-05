import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://exam-backend-production-d105.up.railway.app/",
        changeOrigin: true,
        secure: false,
      },
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
});
