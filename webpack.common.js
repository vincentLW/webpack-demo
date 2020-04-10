const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const javascripts = glob.sync('public/**/*.js');
const htmls = glob.sync('public/**/*.html');
let entries = {};
let plugins = [];
const files = [];
javascripts.forEach(function (item) {
  const lastHashIndex = item.lastIndexOf('.');
  const filePath = './' + item.slice(0, lastHashIndex).replace('public/', '');
  files.push(filePath);
  entries[filePath] = './' + item;
});

plugins.push(new CleanWebpackPlugin());
htmls.forEach(function (item, index) {
  const chuckName = files[index];
  console.log('chuckName', chuckName);

  plugins.push(
    new HtmlWebpackPlugin({
      filename: './' + item.replace('public/', ''),
      template: './' + item,
      chunks: [chuckName],
    })
  );
});

module.exports = {
  entry: entries,
  plugins: plugins,
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
