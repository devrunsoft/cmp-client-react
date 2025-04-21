import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Allows external access
    strictPort: true,
    allowedHosts: ["client.app-cmp.com"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      views: "/src/views",
      ui: "/src/components/ui",
      hooks: "/src/hooks",
      utils: "/src/common/utils",
      data: "/src/common/data",
      domain: "/src/common/domain",
      theme: "/src/theme",
      state: "/src/common/state",
      lib: "/src/lib",
      routes: "/src/routes",
      assets: "/src/assets",
      types: "/src/types",
      common: "/src/common",
    },
  },
  define: {
    global: {},
  },
});
