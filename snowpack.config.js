module.exports = {
  extends: "@snowpack/app-scripts-react",
  scripts: {},
  plugins: [],
  installOptions: {
    rollup: {
      plugins: [require("rollup-plugin-node-polyfills")()],
    },
  },
};
