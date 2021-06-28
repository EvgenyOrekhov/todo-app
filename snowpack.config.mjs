import nodePolyfills from "rollup-plugin-polyfill-node";

/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  extends: "@snowpack/app-scripts-react",

  packageOptions: {
    rollup: {
      plugins: [nodePolyfills()],
    },
  },
};

export default config;
