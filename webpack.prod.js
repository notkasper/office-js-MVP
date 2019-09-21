const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "back-end/dist"),
    filename: "[name].[contenthash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Caching"
    })
  ]
});
