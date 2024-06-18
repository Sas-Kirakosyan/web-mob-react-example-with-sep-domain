import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["/vite-project/src/components/button.tsx"],
    tsc: false,
  },

  plugins: [react()],

  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
});
