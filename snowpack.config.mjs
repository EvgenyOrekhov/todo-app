import nodePolyfills from "rollup-plugin-polyfill-node";

/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  extends: "@snowpack/app-scripts-react",

  packageOptions: {
    rollup: {
      plugins: [nodePolyfills()],
    },
  },

  buildOptions: {
    baseUrl: "/todo-app",
  },

  optimize: {
    bundle: true,
    minify: true,
    splitting: true,
    treeshake: true,
    sourcemap: true,
    target: "es2020",
  },
};

export default config;
