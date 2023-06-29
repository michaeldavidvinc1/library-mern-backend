var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

const categoriesRouter = require("./app/api/v1/categories/router");
const bookRouter = require("./app/api/v1/book/router");
const booksRouter = require("./app/api/v1/bookCopy/router");
const imagesRouter = require("./app/api/v1/image/router");
const userRouter = require("./app/api/v1/user/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const memberRouter = require("./app/api/v1/member/router");
const borrowRouter = require("./app/api/v1/borrowiing/router");

//! URL GLOBAL
const handleErrorMiddleware = require("./app/middlewares/handle-error");
const v1 = "/api/v1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, bookRouter);
app.use(`${v1}/cms`, booksRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, userRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, borrowRouter);
app.use(v1, memberRouter);

app.use(handleErrorMiddleware);

module.exports = app;
