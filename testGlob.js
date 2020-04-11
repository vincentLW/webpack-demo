const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const javascripts = glob.sync("public/**/*.js");
const htmls = glob.sync('public/**/*.html');
let entries = {};
javascripts.filter(function(item){
  return !(item.includes('i18n')||item.includes('common'))
}).forEach(function (item) {
  const lastHashIndex = item.lastIndexOf('.');
  const filePath = item.slice(0, lastHashIndex);
  entries[filePath] = item;
});
debugger
let plugins = [];
htmls.forEach(function (item) {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: item,
      template: item,
    })
  );
});

console.log('javascripts', javascripts);
console.log('htmls', htmls);
console.log('entries', entries);

console.log('xxxx');
