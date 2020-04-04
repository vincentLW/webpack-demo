const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Production"
    })
  ],
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  }
  //添加module解析后不能用 需要摸底
};
