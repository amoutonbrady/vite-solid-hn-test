import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import manifest from "rollup-route-manifest";
import path from "path";

export default defineConfig({
  plugins: [
    solid({ ssr: true }),
    {
      name: "html-async",
      enforce: "post",
      transformIndexHtml(html) {
        return html.replace('type="module"', 'type="module" async');
      }
    },
    manifest({
      inline: false,
      merge: false,
      publicPath: "/",
      routes: (file) => {
        file = file.replace(path.join(__dirname, "src"), "").replace(/\.[tj]sx?$/, "");
        if (!file.includes("/pages/")) return "*"; // commons
        return "/" + file.replace("/pages/", "").toLowerCase();
      }
    })
  ],
  build: {
    polyfillDynamicImport: false,
    target: "esnext"
  }
});
