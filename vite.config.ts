import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in .env, .env.local, etc.
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      host: "0.0.0.0",
      strictPort: true,
      allowedHosts: [env.VITE_BASE_DOMAIN], 
    },
    plugins: [react()],
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        views: path.resolve(__dirname, "src/views"),
        ui: path.resolve(__dirname, "src/components/ui"),
        hooks: path.resolve(__dirname, "src/hooks"),
        utils: path.resolve(__dirname, "src/common/utils"),
        theme: path.resolve(__dirname, "src/theme"),
        state: path.resolve(__dirname, "src/common/state"),
        lib: path.resolve(__dirname, "src/lib"),
        routes: path.resolve(__dirname, "src/routes"),
        assets: path.resolve(__dirname, "src/assets"),
        types: path.resolve(__dirname, "src/types"),
        data: path.resolve(__dirname, "src/common/data"),
        common: path.resolve(__dirname, "src/common"),
      },
    },
    define: {
      // Optional: expose custom values if needed
      __VITE_BASE_URL__: JSON.stringify(env.VITE_BASE_URL),
    },
  };
});
