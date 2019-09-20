const webpack = require("webpack");
const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { getSslCert, getSslKey } = require("./utils");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: "./front-end/index.js",
  output: {
    path: path.resolve(__dirname, "back-end/dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader"
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
};

module.exports = config;
