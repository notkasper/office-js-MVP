const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");
const { getSslCert, getSslKey } = require("./utils");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "back-end/dist"),
    filename: "[name].js"
  },
  devServer: {
    hot: true,
    contentBase: "./dist",
    historyApiFallback: true,
    port: 8080,
    https: {
      key: getSslKey(),
      cert: getSslCert()
    },
    proxy: {
      "/api/**": {
        target: "https://localhost:3000",
        secure: false,
        logLevel: "debug"
      }
    }
  }
});
