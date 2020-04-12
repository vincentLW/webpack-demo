const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const isDev = process.env.NODE_ENV === "development";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (isDev) {
  //开发环境使用
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  //todo 这里要分开发模式还是生产模式
  const config = require("./webpack.common.js");
  const compiler = webpack(config);
  const webpackHotMiddleware = require("webpack-hot-middleware");

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(compiler));
} else {

  /* 生产环境使用 */
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
