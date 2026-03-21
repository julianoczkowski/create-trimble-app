import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    solidPlugin(),
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
