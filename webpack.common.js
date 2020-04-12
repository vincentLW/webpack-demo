const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const glob = require("glob");

const javascripts = glob.sync("public/**/*.js");
const htmls = glob.sync("public/**/*.html");
let entries = {};
let plugins = [];
const files = [];

// 排除i18n和commmon的js
javascripts
  .filter(function (item) {
    return !(item.includes("i18n") || item.includes("common"));
  })
  .forEach(function (item) {
    //添加相对路径不然无法识别
    const filePath = "./" + item;
    const lastHashIndex = filePath.lastIndexOf(".");
    // key值需要去掉相对路径
    const desFilePath = filePath
      .slice(0, lastHashIndex)
      .replace("./public/", "");
    entries[desFilePath] = filePath;
    files.push(desFilePath);
  });

/* 添加插件 */
plugins.push(new CleanWebpackPlugin());
plugins.push(
  new CopyWebpackPlugin([{ from: "public/i18n/locals", to: "i18n/locals" }])
);

// 遍历html文件
htmls.forEach(function (item, index) {
  const chuckName = files[index];

  plugins.push(
    new HtmlWebpackPlugin({
      filename: item.replace("public/", ""),
      template: path.resolve(__dirname, item),
      chunks: [chuckName],
    })
  );
});

module.exports = {
  mode: "development",
  entry: entries,
  plugins: plugins,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|lib|libs|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader", // 将 Sass 编译成 CSS
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
            attributes: {
              list: [
                {
                  tag: "img",
                  attribute: "src",
                  type: "src",
                },
              ],
            },
          },
        },
      },
    ],
  },
};
