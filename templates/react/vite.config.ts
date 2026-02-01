import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@trimble-oss/moduswebcomponents/modus-wc/assets/*",
          dest: "modus-wc/assets",
        },
      ],
    }),
  ],
});
