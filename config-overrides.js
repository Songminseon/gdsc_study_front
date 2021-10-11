const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@Assets": path.resolve(__dirname, "./src/assets"),
    "@Component": path.resolve(__dirname, "./src/components"),
    "@Layout": path.resolve(__dirname, "./src/layout"),
    "@Pages": path.resolve(__dirname, "./src/pages"),
    "@Hooks": path.resolve(__dirname, "./src/hooks"),
  })
);
