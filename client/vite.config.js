import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const babelPlugins = [];

// eslint-disable-next-line no-undef
if (process.env.MIGHTYMELD) {
  babelPlugins.push("@mightymeld/runtime/babel-plugin-mightymeld");
}
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: babelPlugins,
      },
    }),
  ],
});
