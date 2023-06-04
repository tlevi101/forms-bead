import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'
// import eslint from "vite-plugin-eslint";
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
    }
  },
  plugins: [react(),viteTsconfigPaths()],
});
